import { ParsedListQuery } from "./hotel/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useLocations from "@/hooks/useLocations";
import { ChevronsUpDown } from "lucide-react";
import { MapPin } from "lucide-react";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useState } from "react";

export default function HotelSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { isLoading, error, data } = useLocations(query);
  const router = useRouter();

  return (
    <div className="w-1/3 flex justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[400px] justify-between text-left"
          >
            {open ? "Select hotel..." : query ? query : "Select hotel..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0 max-h-96 overflow-y-scroll">
          <Input
            placeholder="Search hotel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {data?.items.map((item, idx) => (
            <div
              onClick={() => {
                setQuery(item.title);
                setOpen(false);

                const query: ParsedListQuery = {
                  hotel: item.title,
                  locationId: item.value,
                };
                //TEST
                router.push(`/hotel/list?${queryString.stringify(query)}`);
              }}
              className="px-2 py-1 hover:cursor-pointer hover:bg-gray-300"
              key={idx}
            >
              <div className="flex flex-row">
              <MapPin className="mr-2 mt-1" size={16} />{item.title}
              </div>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
