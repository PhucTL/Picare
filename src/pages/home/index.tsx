import { useNavigate } from "react-router-dom";
import Banners from "./banners";
import SearchBar from "../../components/search-bar";
import Category from "./category";
import FlashSales from "./flash-sales";
import MedicineSection from "./thuoc";
import HorizontalDivider from "@/components/horizontal-divider";
import BrandCategory from "./brand-category";
import ExclusiveSection from "./exclusive";
import Banners2 from "./banners2";
const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full bg-section overflow-x-hidden">
      <div className="bg-background pt-2">
        <SearchBar onClick={() => navigate("/search")} />
        <Banners />
      </div>
      <div className="bg-background space-y-2 pt-2">
        <Category />
      </div>
      <div className="bg-background space-y-2">
        <BrandCategory />
      </div>
      <ExclusiveSection />
      <Banners2 />
      <HorizontalDivider />
      <div className="bg-background space-y-2 pt-2">
        <FlashSales />
      </div>
      <HorizontalDivider />
      {/* <MedicineSection /> */}
    </div>
  );
};

export default HomePage;
