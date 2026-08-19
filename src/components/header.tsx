import { useAtomValue, useSetAtom } from "jotai";
import {
  UIMatch,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { categoriesStateUpwrapped } from "@/state";
import headerLogoImage from "@/static/picare.webp";
import { BackIcon } from "./vectors";
import { useMemo } from "react";
import { useRouteHandle } from "@/hooks";
import { voucherState } from "@/context/checkoutState";
import { useSmartCollections } from "@/hooks/hooks";

export default function Header() {
  const { data: collections } = useSmartCollections();
  const filteredCollections = collections?.filter(
    (collection) => collection?.published_scope === "global"
  );
  const setVoucher = useSetAtom(voucherState);

  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ filteredCollections, params: match.params });
      } else {
        return handle.title;
      }
    }
  }, [handle, filteredCollections]);

  const showBack = location.key !== "default" && handle?.back !== false;
  const handleBack = () => {
    setVoucher(undefined);
    navigate(-1);
  };
  if (handle?.logo) {
    return (
      <div className="h-[40px] w-full flex items-center px-4 py-2">
        <img src={headerLogoImage} className="max-h-full flex-none" />
      </div>
    );
  }

  return (
    <div className="h-12 w-full flex items-center pl-2 pr-[106px] py-2 space-x-1">
      {showBack && (
        <div className="p-2 cursor-pointer" onClick={handleBack}>
          <BackIcon />
        </div>
      )}
      <div className="text-xl font-medium truncate">{title}</div>
    </div>
  );
}
