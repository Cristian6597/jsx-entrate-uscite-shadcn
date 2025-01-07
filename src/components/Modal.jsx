import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Modal({ open, onClose, onAddEntry }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [spesa, setSpesa] = useState("");
  const [data, setData] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form");
    const newEntry = {
      id: Date.now().toString(36),
      title,
      location,
      spesa: `${parseFloat(spesa).toFixed(2)}€`,
      data,
    };
    console.log("New entry:", newEntry);
    onAddEntry(newEntry);
    setTitle("");
    setLocation("");
    setSpesa("");
    setData("");
  };

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black/70 items-center justify-center flex z-50">
      <div className="modalContainer">
        <div className="modalRight">
          <div className="content">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Inserisci Uscita/Entrata</CardTitle>
                <CardDescription>
                  Con un solo click organizza al meglio le tue entrate e le tue uscite
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Titolo</Label>
                      <Input 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Inserire il titolo" 
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="location">Luogo</Label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Inserire il luogo" 
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="spesa">Importo</Label>
                      <Input 
                        id="spesa" 
                        type="number" 
                        step="0.01" 
                        value={spesa}
                        onChange={(e) => setSpesa(e.target.value)}
                        placeholder="Inserire l'importo (es. -50.00 o 100.00)" 
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="data">Data</Label>
                      <Input 
                        id="data" 
                        type="date" 
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <CardFooter className="flex justify-between mt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Annulla</Button>
                    <Button type="submit">Aggiungi</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;


