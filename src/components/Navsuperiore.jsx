import { Button } from "@/components/ui/button";
import { BadgeEuro } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Navsuperiore({ onOpenModal }) {
  const [date, setDate] = React.useState(null);
  return (
    <nav className="p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center pl-10 pr-10">
        <div className="flex flex-row gap-2">
          <BadgeEuro className="mt-1" />
          <h1 className="text-2xl font-bold">Budgy</h1>
        </div>
        <div className="flex flex-row gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button className="mt-auto" onClick={onOpenModal}>
            Aggiungi Transazione
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}

export default Navsuperiore;
