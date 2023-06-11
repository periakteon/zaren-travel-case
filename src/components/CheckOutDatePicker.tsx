import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { datePickerCheckOutAtom } from "@/stores/dateAtoms";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

export default function CheckOutDatePicker() {
  const [dateCheckOut, setDateCheckOut] = useAtom(datePickerCheckOutAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateCheckOut && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateCheckOut ? (
            format(dateCheckOut, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateCheckOut}
          onSelect={setDateCheckOut}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
