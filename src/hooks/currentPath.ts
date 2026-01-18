import { useLocation } from "react-router-dom";

export const useCurrentPath = (): string => {
  const location = useLocation();

  const strippedPath = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;

  return strippedPath.toUpperCase();
};
