import React from "react";
import { Button } from "@/components/ui/button";
import { BadgeEuro } from "lucide-react";

function Navsuperiore({ onOpenModal }) {
  return (
    <nav className="p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center pl-10 pr-10">
        <div className="flex flex-row gap-2">
      <BadgeEuro className="mt-1"/>
        <h1 className="text-2xl font-bold">Budgy</h1>
        </div>
        <Button onClick={onOpenModal}>Aggiungi Transazione</Button>
      </div>
    </nav>
  );
}

export default Navsuperiore;
