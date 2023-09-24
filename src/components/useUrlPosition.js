import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const latmap = searchParams.get("lat");
  const lngmap = searchParams.get("lng");

  return { latmap, lngmap };
}
export { useUrlPosition };
