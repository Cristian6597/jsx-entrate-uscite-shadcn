import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpFromLine, Bell, Pen, Trash2, Check, X } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Label } from "@radix-ui/react-label";

function Entrate({ entries, removeEntry }) {
  const [empty, setEmpty] = useState(false);
  const [editRowId, setEditRowId] = useState(null); // Stato per tracciare la riga in modifica
  const [editedLocation, setEditedLocation] = useState(""); // Stato per il valore dell'input

  // Verifica se la lista entries è vuota e aggiorna lo stato 'empty' di conseguenza
  useEffect(() => {
    setEmpty(entries.length === 0); // Controlla se è vuoto
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
        <ArrowUpFromLine className="mt-1 text-green-500" />
        <h2 className="text-2xl font-bold mb-4">Entrate</h2>
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        {!empty && (
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-[120px]">Data</TableHead>
                <TableHead className="text-center">Luogo</TableHead>
                <TableHead className="text-right w-[200px]">Entrata</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-left font-medium">
                    {entry.data}
                  </TableCell>
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
                  <TableCell className="text-right flex justify-end items-center gap-2">
                    <span className="text-green-500">
                      {entry.spesa.toFixed(2)} €
                    </span>

                    <>
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
                            className="text-red-500 hover:text-red-600 cursor-pointer scale-75"
                            onClick={() => removeEntry(entry.id)}
                          />
                        </>
                      )}
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {empty && (
          <div className="flex flex-col justify-center items-center h-full text-2xl">
            <Bell className="text-yellow-500 scale-150" />
            <p>Lista vuota</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default Entrate;
