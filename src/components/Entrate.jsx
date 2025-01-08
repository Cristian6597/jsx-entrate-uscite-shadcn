import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpFromLine, Bell, Pen, Trash2 } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function Entrate({ entries, removeEntry }) {
  const [empty, setEmpty] = useState(false);

  // Verifica se la lista entries è vuota e aggiorna lo stato 'empty' di conseguenza
  useEffect(() => {
    setEmpty(entries.length === 0); //Controlla se è vuoto
  }, [entries]); // Questo effetto viene eseguito ogni volta che la lista entries cambia

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
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="text-center">Location</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.data}</TableCell>
                  <TableCell className="text-center">
                    {entry.location}
                  </TableCell>
                  <TableCell className="text-right text-green-500">
                    {entry.spesa.toFixed(2)} €
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row size-10 mt-3 gap-1">
                      <Pen className="text-blue-500 hover:text-blue-600" />
                      <Trash2
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeEntry(entry.id)} // Chiama la funzione di rimozione
                      />
                    </div>
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
