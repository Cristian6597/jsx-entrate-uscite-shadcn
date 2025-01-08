import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine, ArrowUpFromLine, Pen, Trash2 } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

function Entrate({ entries, removeEntry }) {
  return (
    <div className="w-1/2">
      <div className="flex flex-row gap-2">
        <ArrowUpFromLine className="mt-1 text-green-500" />
        {/* <ArrowDownToLine className="mt-1 text-green-500"/> */}
        <h2 className="text-2xl font-bold mb-4">Entrate</h2>
      </div>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
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
              <TableCell className="text-center">{entry.location}</TableCell>
              <TableCell className="text-right text-green-500">{entry.spesa.toFixed(2)} €</TableCell>
              <TableCell>
                <div className="flex flex-row size-10 mt-3 gap-1">
                  <Pen className="text-blue-500 hover:text-blue-600"/>
                  <Trash2 className="text-red-500 hover:text-red-600" onClick={() => removeEntry(entry.id)} />
                </div>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default Entrate;
