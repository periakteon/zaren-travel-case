import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { toast } from "react-toastify";

export interface ParsedListQuery extends ParsedUrlQuery {
  hotel: string;
}

export default function HotelList() {
  const router = useRouter();
  const query = router.query as ParsedListQuery;
  const location = query["hotel"];
  const locationId = query["locationId"];

  router.query;
  return (
    <div>
      <h1>Hotel List</h1>
    </div>
  );
}
