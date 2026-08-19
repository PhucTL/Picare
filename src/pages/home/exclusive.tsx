import { ProductItemSkeleton } from "@/components/skeleton";
import { useProductByCollection } from "@/hooks/hooks";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";
import Slider from "react-slick"; // Import Slick Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from "@/components/product-card"; // Ensure you have this component
import { Link } from "react-router-dom";

export default function ExclusiveSection() {
  const { data: products, isLoading } = useProductByCollection("1004317089");

  const sortedData = products?.sort((a, b) => {
    if (
      a.variants[0].compare_at_price > 0 &&
      b.variants[0].compare_at_price <= 0
    ) {
      return -1;
    } else if (
      a.variants[0].compare_at_price <= 0 &&
      b.variants[0].compare_at_price > 0
    ) {
      return 1;
    } else {
      return 0;
    }
  });

  const limitProducts = sortedData?.slice(0, 8);

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 px-4 py-2 gap-4">
        {[0, 1, 2, 3, 4, 5, 6].map((key) => (
          <ProductItemSkeleton key={key} />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex flex-col bg-[#b8e986]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <IoDiamondOutline size={22} className="text-black" />
          <p className="text-[18px] font-semibold text-black">
            Sản phẩm độc quyền
          </p>
        </div>
        <Link
          to="/category/1004317089"
          className="flex items-center cursor-pointer"
        >
          <p className="text-sm text-black">Xem tất cả</p>
          <MdOutlineNavigateNext size={18} className="text-black" />
        </Link>
      </div>

      {/* Slick Slider */}
      <div className="py-4">
        {" "}
        {/* Added padding above products */}
        <Slider {...settings}>
          {limitProducts?.map((product) => (
            <div key={product.id} className="px-2 py-2">
              {" "}
              {/* Added py-2 for each item */}
              <ProductCard
                category={product.vendor}
                image={product?.images?.[0]?.src || ""}
                defaultPrice={product?.variants?.[0]?.price}
                title={product.title}
                id={product.id}
                salePrice={product?.variants?.[0]?.compare_at_price}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
