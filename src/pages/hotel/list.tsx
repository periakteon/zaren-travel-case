import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useHotelSearch from "@/hooks/useHotelList";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { z } from "zod";

export interface ParsedListQuery extends ParsedUrlQuery {
  hotel: string;
  arrivalLocationId: string;
  checkIn: string | undefined;
  checkOut: string | undefined;
  nationality: string | undefined;
}

export default function HotelList() {
  const router = useRouter();
  const query = router.query as ParsedListQuery;
  const location = query["hotel"];
  const arrivalLocationId = query["arrivalLocationId"];
  const checkIn = query["checkIn"];
  const checkOut = query["checkOut"];
  const nationality = query["nationality"];

  const { isLoading, error, data } = useHotelSearch(
    checkIn,
    checkOut,
    arrivalLocationId,
    nationality,
  );

  console.log("REACT QUERY", data);

  return (
    <div className="flex flex-col">
      <h1>Hotel List</h1>
      {isLoading && (
        <div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      )}
      {data?.items.map((item, id) => (
        <div key={id} className="">
          <h2>Şehir: {item.city.name}</h2>
          <p>Ülke: {item.country.name}</p>
          <img
            src={
              item.thumbnailFull === ""
                ? "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
                : item.thumbnailFull
            }
            width={200}
            height={200}
            alt="Hotel Photo"
          />
          <h1 className="text-3xl">{item.name}</h1>
          <p>{item.description.text}</p>
          <p>
            {item.offers.map((offer) => {
              if (offer.price.price && offer.price.currency) {
                return `Total Price: ${offer.price.price} ${offer.price.currency}`;
              }
              return null;
            })}
          </p>
          <p>{item.stars}</p>
          <p className="m-5 flex">
            {item.themes.map((theme, index) => (
              <Badge
                key={index}
                className={`border border-amber-600 text-amber-800 bg-amber-50 hover:bg-amber-100 dark:hover:bg-amber-900 dark:text-amber-400 dark:bg-amber-950 ${index !== item.themes.length - 1 ? "mr-2" : ""
                  }`}
              >
                {theme.name}
              </Badge>
            ))}
          </p>
          <p className="m-5 flex">
            {item.boardGroups.map((boardGroup, index) => (
              <Badge
                key={index}
                className={`border border-lime-600 text-lime-600 bg-green-50 hover:bg-green-100 dark:hover:bg-lime-900 dark:text-lime-500 dark:bg-lime-950 ${index !== item.boardGroups.length - 1 ? "mr-2" : ""
                  }`}
              >
                {boardGroup.name}
              </Badge>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
