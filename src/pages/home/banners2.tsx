import Carousel from "@/components/carousel";
import { useAtomValue } from "jotai";
import banner2pic1 from "@/static/banner2pic1.png";
import banner2pic2 from "@/static/banner2pic2.png";
import banner2pic3 from "@/static/banner2pic3.png";

export default function Banners2() {
  const banners = [banner2pic1, banner2pic2, banner2pic3];

  return (
    <Carousel
      slides={banners.map((banner) => (
        <img className="w-full rounded" src={banner} />
      ))}
    />
  );
}
