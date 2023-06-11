import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { datePickerCheckInAtom } from "@/stores/dateAtoms";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

export default function CheckInDatePicker() {
  const [dateCheckIn, setDateCheckIn] = useAtom(datePickerCheckInAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !dateCheckIn && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateCheckIn ? format(dateCheckIn, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateCheckIn}
          onSelect={setDateCheckIn}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
