import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const LocationResponseSchema = z.object({
  data: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        value: z.string(),
        description: z.string().nullable(),
        type: z.number(),
      }),
    ),
  }),
});

const getLocations = async (query: string) => {
  const response = await fetch(
    "https://api.zarentravel.net/api/v1/zaren-travel/hotel/location",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        culture: "tr-TR",
        query,
        locationType: 2,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data = await response.json();
  const parsedData = await LocationResponseSchema.safeParseAsync(data);

  if (!parsedData.success) {
    throw new Error("Failed to parse locations");
  }

  return parsedData.data.data;
};

export default function useLocations(query: string) {
  return useQuery(["locations", query], () => getLocations(query), {
    enabled: !!query,
    retry: 3,
    retryDelay: 1000,
  });
}
