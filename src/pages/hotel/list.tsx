import SkeletonLoading from "@/components/SkeletonLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useHotelSearch from "@/hooks/useHotelList";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

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
    <div className="flex flex-col lg:flex-row dark:bg-slate-900">
      {/* Sol Taraftaki Bölüm */}
      <div className="w-full lg:w-1/4 bg-gray-50 p-4 rounded-lg dark:bg-slate-950 shadow-lg h-full">
        <h2 className="text-lg font-semibold mb-4 md:h-36">Filtreler</h2>
        {/* Filtrelerin içeriği buraya gelebilir */}
      </div>

      {/* Sağ Taraftaki Bölüm */}
      <div className="w-full lg:w-full p-4">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Select your accommodation in {location}
        </h1>
        <h3 className="text-center">Among {data?.items.length} hotels</h3>
        <div className="grid grid-cols-1 gap-4 mt-10">
          {isLoading && (
            <>
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </>
          )}
          {/* Hotel Bilgileri Sağ Bölüm */}
          {data?.items.map((item, id) => (
            <>
              <div
                key={id}
                className="flex flex-col bg-gray-50 dark:bg-slate-950 rounded-lg shadow-lg p-4"
              >
                <>
                  <div className="flex flex-row justify-start mb-4">
                    <div className="w-full">
                      <img
                        src={
                          item.thumbnailFull === ""
                            ? "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
                            : item.thumbnailFull
                        }
                        width={300}
                        height={300}
                        className="w-full rounded-lg mb-4"
                        alt="Hotel Photo"
                      />
                    </div>
                    <div className="flex flex-col ml-4 w-full">
                      <h3 className="text-xl font-semibold mb-2 dark:text-primary">
                        {item.name}
                      </h3>
                      <div className="mb-2">
                        {Array.from({ length: item.stars }, (_, index) => (
                          <span key={index} className="text-yellow-500">
                            ⭐
                          </span>
                        ))}
                      </div>
                      <div className="text-gray-700 mb-2 hover:underline dark:text-primary">
                        {item.address}
                      </div>
                      <div className="flex flex-wrap">
                        {item.themes.map((theme, index) => (
                          <Badge
                            key={index}
                            className={`border border-amber-600 text-amber-800 bg-amber-50 hover:bg-amber-100 dark:hover:bg-amber-900 dark:text-amber-400 dark:bg-amber-950 mr-2 mb-2`}
                          >
                            {theme.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap">
                        {item.boardGroups.map((boardGroup, index) => (
                          <Badge
                            key={index}
                            className={`border border-lime-600 text-lime-600 bg-green-50 hover:bg-green-100 dark:hover:bg-lime-900 dark:text-lime-500 dark:bg-lime-950 mr-2 mb-2`}
                          >
                            {boardGroup.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-gray-700 mb-2 text-right w-full">
                      <div className="text-3xl dark:text-primary">
                        {item.offers.map((offer) => {
                          if (offer.price.price && offer.price.currency) {
                            return `${offer.price.price} ${offer.price.currency}`;
                          }
                          return null;
                        })}
                      </div>
                      <div className="w-full dark:text-muted-foreground">
                        Total price
                      </div>
                    </div>
                  </div>
                </>
                <div className="text-gray-700 dark:text-primary">
                  {item.description.text}
                </div>
                <div className="text-end mt-4">
                  <Button>See rooms</Button>
                </div>
              </div>
              <Separator className="my-4" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
