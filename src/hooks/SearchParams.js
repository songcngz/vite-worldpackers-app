import { useSearchParams } from "react-router-dom";

function SearchParams() {
  const [state] = useSearchParams();
  const lat = state.get("lat");
  const lng = state.get("lng");
  return [lat, lng];
}

export default SearchParams;
