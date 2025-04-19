import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const chemicals = [
  { name: "Acetone", formula: "C3H6O", location: "Shelf A", bottle: "1" },
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
  // Generated using ChatGPT dont bother reporting mistakes.
];


function formatFormula(formula: string) {
  return formula.split("").map((char, index) => {
    if (!isNaN(Number(char))) {
      return (
        <sub key={index} className="text-xs">
          {char}
        </sub>
      );
    }
    if (char === "+") {
      return (
        <sup key={index} className="text-xs">
          {char}
        </sup>
      );
    }
    return char;
  });
}

export default function Chemicals() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const scrollableDiv = document.querySelector(".scrollable-cards");
    if (scrollableDiv) {
      scrollableDiv.scrollTop = 0;
    }
  }, [search]);

  const filteredChemicals = chemicals.filter((chemical) =>
    chemical.name.toLowerCase().includes(search.toLowerCase()) ||
    chemical.formula.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      {/* Search Bar */}
      <div className="w-full mb-4 sticky top-4 bg-gray-100 z-10">
        <Input
          type="text"
          placeholder="Search chemicals or formulas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all pr-10"
        />
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
        </span>
      </div>

      {/* Scrollable Cards */}
      <div className="flex flex-col gap-4 overflow-y-auto flex-grow scrollable-cards">
        {filteredChemicals.map((chemical, index) => (
          <Card 
          key={index} 
          className="p-4 shadow-md bg-white rounded-xl cursor-pointer" 
          //onClick={() => router.push(`/chemical/${encodeURIComponent(chemical.name)}`)}
        >
          <CardContent>
            <h2 className="text-lg font-semibold">{chemical.name}</h2>
            <p className="text-sm text-gray-600">Formula: {chemical.formula}</p>
            <p className="text-sm text-gray-600">Location: {chemical.location}</p>
            <p className="text-sm text-gray-600">Bottle No: {chemical.bottle}</p>
          </CardContent>
        </Card>
        ))}
      </div>
    </div>
  );
}
