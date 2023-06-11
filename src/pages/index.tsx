import { ParsedListQuery } from "./hotel/list";
import CheckInDatePicker from "@/components/CheckInDatePicker";
import CheckOutDatePicker from "@/components/CheckOutDatePicker";
import { Nationality } from "@/components/Nationality";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useLocations from "@/hooks/useLocations";
import {
  datePickerCheckInAtom,
  datePickerCheckOutAtom,
} from "@/stores/dateAtoms";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { ChevronsUpDown } from "lucide-react";
import { MapPin } from "lucide-react";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useState } from "react";

export default function HotelSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dateCheckIn] = useAtom(datePickerCheckInAtom);
  const [dateCheckOut] = useAtom(datePickerCheckOutAtom);
  const [nationality, setNationality] = useState("TR");
  const router = useRouter();
  const { isLoading, error, data } = useLocations(query);

  const formattedCheckInDate = dateCheckIn
    ? format(dateCheckIn, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    : undefined;
  const formattedCheckOutDate = dateCheckOut
    ? format(dateCheckOut, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    : undefined;

  const handleSearch = () => {
    const selectedLocation = data?.items.find((item) => item.title === query);
    if (selectedLocation) {
      const queryObj: ParsedListQuery = {
        checkIn: formattedCheckInDate,
        checkOut: formattedCheckOutDate,
        hotel: selectedLocation.title,
        arrivalLocationId: selectedLocation.value,
        page: "1",
        pageSize: "10",
        nationality,
      };
      console.log(queryObj);
      router.push(`/hotel/list?${queryString.stringify(queryObj)}`);
    }
  };

  return (
    <main className="w-full">
      <div className="flex justify-center mb-2">
        <span>Search for hotel:</span>
      </div>
      <div className="flex w-full h-16 justify-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between text-left flex flex-start"
            >
              {open ? (
                <>
                  <MapPin className="mr-2" size={20} strokeWidth={2} />
                  <span>Search hotel...</span>
                </>
              ) : query ? (
                <>
                  <MapPin className="mr-2" size={20} />
                  <span>{query}</span>
                </>
              ) : (
                <>
                  <MapPin className="mr-2" size={20} strokeWidth={2} />
                  <span>Search hotel...</span>
                </>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0 max-h-96 overflow-y-scroll">
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
                }}
                className="px-2 py-1 text-sm hover:cursor-pointer hover:bg-accent"
                key={idx}
              >
                <div className="flex flex-row">
                  <MapPin className="mr-2 mt-1" size={16} strokeWidth={2} />{" "}
                  {item.title}
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-center flex-col">
        <div className="flex justify-center mb-2">
          <span>Select nationality:</span>
        </div>
        <div className="flex justify-center mb-2">
          <Nationality value={nationality} setValue={setNationality} />
        </div>
        <div className="flex justify-center mb-2">
          <span>Select check-in date:</span>
        </div>
        <div className="flex justify-center mb-2">
          <CheckInDatePicker />
        </div>
      </div>
      <div className="flex justify-center flex-col mt-4">
        <div className="flex justify-center mb-2">
          <span>Select check-out date:</span>
        </div>
        <div className="flex justify-center mb-2">
          <CheckOutDatePicker />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button className="w-[280px]" onClick={handleSearch}>
          Ara
        </Button>
      </div>
    </main>
  );
}
