// src/pages/admin/ManageShelves.tsx
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Loader2, SaveAll, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define shelf type to match backend
interface Shelf {
  id?: number;
  name: string;
  location: string;
}

export default function ManageShelves() {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingShelf, setEditingShelf] = useState<Shelf | null>(null);
  const [newShelf, setNewShelf] = useState<Shelf>({ name: "", location: "" });
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    fetchShelves();
  }, []);

  const fetchShelves = async () => {
    setIsLoading(true);
    try {
      // This would connect to your real API
      // const response = await fetch('http://localhost:8000/shelves', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const data = await response.json();

      // For demo:
      const demoShelves: Shelf[] = [
        { id: 1, name: "Shelf A", location: "Laboratory Room 101" },
        { id: 2, name: "Shelf B", location: "Laboratory Room 101" },
        {
          id: 3,
          name: "Concentrated Chemicals Shelf",
          location: "Secured Storage Room",
        },
        { id: 4, name: "Shelf C", location: "Laboratory Room 102" },
        { id: 5, name: "Fume Hood", location: "Laboratory Room 101" },
        { id: 6, name: "Shelf D", location: "Storage Room" },
        { id: 7, name: "Shelf E", location: "Laboratory Room 103" },
      ];
      setShelves(demoShelves);
    } catch (err) {
      setError("Failed to fetch shelves");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddShelf = async () => {
    if (!newShelf.name || !newShelf.location) {
      setError("Name and location are required");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app:
      // const response = await fetch('http://localhost:8000/shelves', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(newShelf)
      // });
      // const data = await response.json();
      // setShelves([...shelves, data]);

      // For demo:
      const demoNewShelf = { ...newShelf, id: shelves.length + 1 };
      setShelves([...shelves, demoNewShelf]);
      setNewShelf({ name: "", location: "" });
      setShowAddForm(false);
      setError("");
    } catch (err) {
      setError("Failed to add shelf");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartEdit = (shelf: Shelf) => {
    setEditingShelf(shelf);
  };

  const handleCancelEdit = () => {
    setEditingShelf(null);
  };

  const handleUpdateShelf = async () => {
    if (!editingShelf || !editingShelf.name || !editingShelf.location) {
      setError("Name and location are required");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app:
      // const response = await fetch(`http://localhost:8000/shelves/${editingShelf.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(editingShelf)
      // });
      // const data = await response.json();

      // For demo:
      const updatedShelves = shelves.map((shelf) =>
        shelf.id === editingShelf.id ? editingShelf : shelf
      );
      setShelves(updatedShelves);
      setEditingShelf(null);
      setError("");
    } catch (err) {
      setError("Failed to update shelf");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteShelf = async (shelfId: number | undefined) => {
    if (!shelfId) return;

    setIsLoading(true);
    try {
      // In a real app:
      // await fetch(`http://localhost:8000/shelves/${shelfId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      // For demo:
      const updatedShelves = shelves.filter((shelf) => shelf.id !== shelfId);
      setShelves(updatedShelves);
      setDeleteError(null);
    } catch (err) {
      setDeleteError("Failed to delete shelf");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Shelves</h1>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            disabled={isLoading}
          >
            {!showAddForm ? (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add New Shelf
              </>
            ) : (
              <>
                <X className="mr-2 h-4 w-4" /> Cancel
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {deleteError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{deleteError}</AlertDescription>
          </Alert>
        )}

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Shelf</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Shelf Name"
                    value={newShelf.name}
                    onChange={(e) =>
                      setNewShelf({ ...newShelf, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Location"
                    value={newShelf.location}
                    onChange={(e) =>
                      setNewShelf({ ...newShelf, location: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleAddShelf} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Add Shelf
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading && !shelves.length ? (
            <div className="col-span-full flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            shelves.map((shelf) => (
              <Card key={shelf.id} className="overflow-hidden">
                <CardContent className="p-6">
                  {editingShelf && editingShelf.id === shelf.id ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Shelf Name"
                        value={editingShelf.name}
                        onChange={(e) =>
                          setEditingShelf({
                            ...editingShelf,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Location"
                        value={editingShelf.location}
                        onChange={(e) =>
                          setEditingShelf({
                            ...editingShelf,
                            location: e.target.value,
                          })
                        }
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleUpdateShelf}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <SaveAll className="mr-2 h-4 w-4" />
                          )}
                          Save
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <h3 className="font-medium">{shelf.name}</h3>
                        <p className="text-sm text-gray-500">
                          {shelf.location}
                        </p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleStartEdit(shelf)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteShelf(shelf.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-red-500" />
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {!isLoading && shelves.length === 0 && (
          <div className="text-center p-12">
            <p className="text-gray-500">
              No shelves found. Add your first shelf!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
