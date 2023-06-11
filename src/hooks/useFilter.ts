import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const responseSchema = z.object({
  data: z.object({
    expiresOn: z.string(),
    filterParams: z
      .object({
        price: z.object({
          min: z.number(),
          max: z.number(),
        }),
        ratings: z.array(z.number()),
        stars: z.array(z.number()),
      })
      .nullable(),
    items: z.array(
      z.object({
        country: z.object({
          name: z.string(),
        }),
        city: z.object({
          name: z.string(),
        }),
        address: z.string(),
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
      }),
    ),
  }),
});

export type FilterParams = {
  amenities: string[];
  types: string[];
  range: number[];
  ratings: string[];
  stars: string[];
};

const hotelFilter = async (
  cacheKey: string | undefined,
  filterParams: FilterParams,
  page: string | undefined,
  pageSize: string | undefined,
) => {
  const url =
    "https://api.zarentravel.net/api/v1/zaren-travel/hotel/search-filter";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cacheKey,
      filterParams,
      page,
      pageSize,
      sortBy: 4,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch filter");
  }

  const data = await response.json();
  const parsedData = responseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Failed to parse filter response");
  }

  return parsedData.data.data;
};

export default function useHotelFilter(
  cacheKey: string | undefined,
  filterParams: FilterParams,
  page: string | undefined,
  pageSize: string | undefined,
) {
  return useQuery(
    ["hotelFilter", cacheKey, filterParams, page, pageSize],
    () => hotelFilter(cacheKey, filterParams, page, pageSize),
    {
      enabled: !!cacheKey,
      retry: 3,
      retryDelay: 1000,
    },
  );
}
