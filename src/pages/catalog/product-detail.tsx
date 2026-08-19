import Button from "@/components/button";
import HorizontalDivider from "@/components/horizontal-divider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Description } from "@/components/description";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "@/utils/format";
import ShareButton from "./share-buttont";
import toast from "react-hot-toast";
import { ProductCard } from "@/components/product-card";
import { DetailPageSkeleton } from "@/components/skeleton";
import { useAtomValue, useSetAtom } from "jotai";
import { limitProductState } from "@/context/productState";
import { useProductDetail, useProductLimit } from "@/hooks/hooks";
import { shuffleArray } from "@/utils/random";
import { cartState } from "@/context/cartState";
import { addToCart } from "@/service/cartService";
import ErrorLostConnection from "@/components/lost-connection";
export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const setCart = useSetAtom(cartState);
  const limit = useAtomValue(limitProductState);
  if (!id) {
    return <div>Error: Product ID is missing.</div>;
  }
  const { data: detail, isLoading, isError, isFetching } = useProductDetail(id);
  const { data: products } = useProductLimit(limit);
  const relatedProducts = products
    ?.filter((product) => String(product.id) !== id)
    ?.sort((a, b) => {
      const currentId = Number(id);
      const diffA = Math.abs(Number(a.id) - currentId);
      const diffB = Math.abs(Number(b.id) - currentId);
      return diffA - diffB;
    });

  const limitRelatedProducts = shuffleArray(relatedProducts || []).slice(0, 6);
  const images = detail?.images || [];
  const price = detail?.variants?.[0].price;
  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading || isFetching) {
    return (
      <>
        <DetailPageSkeleton />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <ErrorLostConnection />
      </>
    );
  }
  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="w-full px-4">
          <div className="py-2">
            <Slider {...slickSettings}>
              {images?.map((image, index) => (
                <img
                  src={image.src}
                  alt={`Product Image ${index + 1}`}
                  key={image.id}
                />
              ))}
            </Slider>
          </div>
          <div className="text-xl font-medium text-primary">
            {formatPrice(price || NaN)}
          </div>
          <div className="text-sm mt-1 font-bold mb-3">{detail?.title}</div>
          <div className="py-2">
            {detail && <ShareButton product={detail} />}
          </div>
        </div>
        <div className="bg-section h-2 w-full"></div>
        <p className="px-[20px] my-[15px] font-bold">Mô tả sản phẩm</p>
        {detail && <Description htmlContent={detail?.body_html} />}
        <p className="my-[20px]"></p>
        <div className="bg-section h-2 w-full"></div>
        <div className="font-medium py-2 px-4">
          <div className="pt-2 pb-2.5">Sản phẩm khác</div>
        </div>
        <div className="grid grid-cols-2 px-4 py-2 gap-1">
          {limitRelatedProducts?.map((product) => (
            <ProductCard
              key={product.id}
              category={product.vendor}
              image={product.images?.[0]?.src || ""}
              defaultPrice={product.variants[0].price}
              title={product.title}
              id={product.id}
            />
          ))}
        </div>
      </div>

      <HorizontalDivider />
      <div className="flex-none text-white grid grid-cols-2 gap-2 py-3 px-4">
        <Button
          large
          onClick={() => {
            if (detail) {
              addToCart(detail, 1, setCart); // Add 1 quantity of the product
              toast.success("Đã thêm vào giỏ hàng");
            } else {
              toast.error("Sản phẩm không tồn tại.");
            }
          }}
        >
          Thêm vào giỏ
        </Button>

        <Button
          large
          primary
          onClick={() => {
            if (detail) {
              addToCart(detail, 1, setCart);
              navigate("/cart");
            } else {
              toast.error("Sản phẩm không tồn tại.");
            }
          }}
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
