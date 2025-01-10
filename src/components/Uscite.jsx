import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine, Bell, Pen, Trash2, Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";

function Uscite({ entries, removeEntry, updateEntry }) {
  const [empty, setEmpty] = useState(false);
  const [editRowId, setEditRowId] = useState(null); // Stato per tracciare la riga in modifica
  const [editedLocation, setEditedLocation] = useState(""); // Stato per il valore dell'input

  useEffect(() => {
    setEmpty(entries.length === 0);
  }, [entries]);

  const handleEdit = (id, currentLocation) => {
    setEditRowId(id);
    setEditedLocation(currentLocation); // Prepopola l'input con il valore attuale
  };

  const handleSave = (id) => {
    updateEntry(id, { location: editedLocation }); // Aggiorna l'entry tramite prop
    setEditRowId(null); // Esci dalla modalità modifica
  };

  const handleCancel = () => {
    setEditRowId(null); // Esci dalla modalità modifica senza salvare
    setEditedLocation("");
  };

  return (
    <div className="w-1/2">
      <div className="flex flex-row gap-2">
        <ArrowDownToLine className="mt-1 text-red-500" />
        <h2 className="text-2xl font-bold mb-4">Uscite</h2>
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        {!empty && (
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-[120px]">Data</TableHead>
                <TableHead className="text-center">Luogo</TableHead>
                <TableHead className="text-right w-[200px]">Uscita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  {/* Data allineata a sinistra */}
                  <TableCell className="text-left font-medium">
                    {entry.data}
                  </TableCell>

                  {/* Input o luogo centrato */}
                  <TableCell className="text-center">
                    {editRowId === entry.id ? (
                      <input
                        type="text"
                        value={editedLocation}
                        onChange={(e) => setEditedLocation(e.target.value)}
                        className="border rounded px-2 py-1 w-full max-w-[150px] mx-auto"
                      />
                    ) : (
                      <Label className="block">{entry.location}</Label>
                    )}
                  </TableCell>

                  {/* Amount e icone allineati a destra */}
                  <TableCell className="text-right flex justify-end items-center gap-2">
                    <span className="text-red-500">
                      {entry.spesa.toFixed(2)} €
                    </span>
                    {editRowId === entry.id ? (
                      <>
                        <Check
                          className="text-green-500 hover:text-green-600 cursor-pointer scale-75"
                          onClick={() => handleSave(entry.id)}
                        />
                        <X
                          className="text-red-500 hover:text-red-600 cursor-pointer scale-75"
                          onClick={handleCancel}
                        />
                      </>
                    ) : (
                      <>
                        <Pen
                          className="text-blue-500 hover:text-blue-600 cursor-pointer scale-75"
                          onClick={() => handleEdit(entry.id, entry.location)}
                        />
                        <Trash2
                          className="text-red-500 hover:text-red-600 cursor-pointer  scale-75"
                          onClick={() => removeEntry(entry.id)}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {empty && (
          <div className="flex flex-col justify-center items-center min-h-[400px] text-2xl">
            <Bell className="text-yellow-500 scale-150" />
            <p>Lista vuota</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default Uscite;
