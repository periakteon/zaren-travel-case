import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import flags from "@/lib/flags";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useState } from "react";

export function Nationality({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
  };

  console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {value
            ? `${flags.find((f) => f.code === value)?.flag} ${
                flags.find((f) => f.code === value)?.name
              }`
            : "Select nationality..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search nationality..." />
          <CommandEmpty>No nationality found.</CommandEmpty>
          <CommandGroup className={cn("w-full h-72 overflow-y-scroll")}>
            {flags.map((f) => (
              <CommandItem key={f.code} onSelect={() => handleSelect(f.code)}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === f.code ? "opacity-100" : "opacity-0",
                  )}
                />
                {f.flag} {f.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
