import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import FilterBar from "@/components/FilterBar"
import ChemicalCard from "@/components/ChemicalCard"
import EmptyState from "@/components/EmptyState"
import { LayoutGrid, Table } from "lucide-react"

const chemicals = [
  { name: "Acetone", formula: "C3H6O", location: "Shelf A", bottle: "A001" },
  { name: "Ethanol", formula: "C2H5OH", location: "Shelf B", bottle: "2" },
  { name: "Sulfuric Acid", formula: "H2SO4", location: "Concentrated Chemicals Shelf", bottle: "3" },
  { name: "Sodium Hydroxide", formula: "NaOH", location: "Shelf C", bottle: "4" },
  { name: "Hydrochloric Acid", formula: "HCl", location: "Fume Hood", bottle: "5" },
  { name: "Ammonia", formula: "NH3", location: "Shelf D", bottle: "6" },
  { name: "Methanol", formula: "CH3OH", location: "Shelf E", bottle: "7" },
  { name: "Benzene", formula: "C6H6", location: "Shelf F", bottle: "8" },
  { name: "Toluene", formula: "C7H8", location: "Shelf G", bottle: "9" },
  { name: "Phenol", formula: "C6H5OH", location: "Shelf A", bottle: "10" },
  { name: "Chloroform", formula: "CHCl3", location: "Shelf B", bottle: "11" },
  { name: "Formaldehyde", formula: "CH2O", location: "Shelf C", bottle: "12" },
  { name: "Acetic Acid", formula: "C2H4O2", location: "Shelf D", bottle: "13" },
  { name: "Nitric Acid", formula: "HNO3", location: "Fume Hood", bottle: "14" },
  { name: "Potassium Hydroxide", formula: "KOH", location: "Shelf E", bottle: "15" },
  { name: "Calcium Carbonate", formula: "CaCO3", location: "Shelf F", bottle: "16" },
  { name: "Magnesium Sulfate", formula: "MgSO4", location: "Shelf G", bottle: "17" },
  { name: "Sodium Chloride", formula: "NaCl", location: "Shelf A", bottle: "18" },
  { name: "Copper Sulfate", formula: "CuSO4", location: "Shelf B", bottle: "19" },
  { name: "Silver Nitrate", formula: "AgNO3", location: "Concentrated Chemicals Shelf", bottle: "20" },
  { name: "Silver Nitrate", formula: "AgNO3", location: "Custom Shelf", bottle: "20" },
];

function formatFormula(formula: string) {
  return formula.split("").map((char, index) => {
    if (!isNaN(Number(char))) {
      return (
        <sub key={index} className="text-xs">
          {char}
        </sub>
      )
    }
    if (char === "+") {
      return (
        <sup key={index} className="text-xs">
          {char}
        </sup>
      )
    }
    return char
  })
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [loggedIn, setLoggedIn] = useState(true)
  const [viewMode, setViewMode] = useState("card") // New state for view mode

  const filteredChemicals = chemicals.filter((chemical) =>
    (chemical.name.toLowerCase().includes(search.toLowerCase()) ||
     chemical.formula.toLowerCase().includes(search.toLowerCase())) &&
    (selectedLocation ? chemical.location === selectedLocation : true)
  )

  const uniqueLocations = [...new Set(chemicals.map(c => c.location))]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar loggedIn={loggedIn} />
      <div className="max-w-7xl w-full mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center">
            <div className="flex-grow">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <div className="bg-white rounded-lg shadow-sm flex p-1 ml-4">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded ${viewMode === 'card' ? 'bg-blue-100 text-blue-600' : ''}`}
                title="Card view"
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : ''}`}
                title="Table view"
              >
                <Table size={20} />
              </button>
            </div>
          </div>
          <div>
            <FilterBar uniqueLocations={uniqueLocations} handleFilter={setSelectedLocation} />
          </div>
        </div>
        
        {filteredChemicals.length === 0 ? (
          <EmptyState />
        ) : viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChemicals.map((chemical, index) => (
              <ChemicalCard key={index} chemical={chemical} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formula</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bottle</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChemicals.map((chemical, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{chemical.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatFormula(chemical.formula)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{chemical.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{chemical.bottle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}