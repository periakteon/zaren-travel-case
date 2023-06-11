import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const responseSchema = z.object({
  data: z.object({
    expiresOn: z.string(),
    filterParams: z.object({
      price: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    items: z.array(
      z.object({
        country: z.object({
          name: z.string(),
        }),
        city: z.object({
          name: z.string(),
        }),
        description: z.object({
          text: z.string(),
        }),
        themes: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
          }),
        ),
        facilities: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
          }),
        ),
        offers: z.array(
          z.object({
            price: z.object({
              price: z.number(),
              currency: z.string(),
            }),
          }),
        ),
        stars: z.number(),
        thumbnailFull: z.string(),
        name: z.string(),
        boardGroups: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
          }),
        ),
      })
    ),
  }),
});

const searchHotels = async (checkIn: string | undefined, checkOut: string | undefined, arrivalLocationId: string, nationality: string | undefined) => {
  const url = "https://api.zarentravel.net/api/v1/zaren-travel/hotel/search";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: 1,
      pageSize: 12,
      sortBy: 4,
      checkAllotment: true,
      checkStopSale: true,
      getOnlyDiscountedPrice: false,
      getOnlyBestOffers: true,
      night: 1,
      occupants: [
        {
          adults: 1,
          children: [],
          infants: 0,
        },
      ],
      checkIn: checkIn,
      checkOut: checkOut,
      arrivalLocationId: arrivalLocationId,
      nationality: nationality,
      currency: "USD",
      culture: "en-US",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hotel list");
  }

  const data = await response.json();
  const parsedData = responseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Failed to parse hotel list");
  }

  return parsedData.data.data;
};

export default function useHotelSearch(checkIn: string | undefined, checkOut: string | undefined, arrivalLocationId: string, nationality: string | undefined) {
  return useQuery(["hotelSearch", checkIn, checkOut, arrivalLocationId, nationality], () => searchHotels(checkIn, checkOut, arrivalLocationId, nationality), {
    enabled: true,
    retry: 3,
    retryDelay: 1000,
  });
}
