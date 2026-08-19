import HorizontalDivider from "@/components/horizontal-divider";
import { ProductCard } from "@/components/product-card";
import { ProductItemSkeleton } from "@/components/skeleton";
import { useProductByCollection } from "@/hooks/hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProductListPage() {
  const { id } = useParams();
  const [selectedVendor, setSelectedVendor] = useState(null);

  if (!id) {
    return <div>Error: Collection ID is missing.</div>;
  }

  const { data: products, isLoading } = useProductByCollection(id);

  const getStaticImages = (handle: string) => {
    switch (handle) {
      case "la-roche-posay":
        return "https://logos-world.net/wp-content/uploads/2023/01/La-Roche-Posay-Logo.png";
      case "sebamed":
        return "https://skincareshop.com.bd/wp-content/uploads/2021/06/Sebamed.png.webp";
      case "eclat-du-teint":
        return "https://cdn.imweb.me/upload/S202205244b74c2603a468/8e5ddb3ae9c72.png";
      case "juve-heal":
        return "https://www.vmcdn.ca/f/files/griceconnect/images/corporate-logos/___logo_juveintegratedmedicineandwellness_1500x600.jpg;w=640";
      case "dr-ciccarelli-1":
        return "https://ciccarelli.it/cdn/brandscontainer/Igienizzante-Ciccarelli-logo.png";
      case "pax-moly":
        return "https://i0.wp.com/www.hamroshringar.com/wp-content/uploads/2021/11/pax-moly-logo.jpg?fit=600%2C400&ssl=1";
      case "eucerin":
        return "https://1000logos.net/wp-content/uploads/2020/04/Eucerin-Logo.jpg";
      case "fcl":
        return "https://www.shutterstock.com/image-vector/fcl-logo-design-template-strong-600nw-2459192921.jpg";
      case "aknicare":
        return "https://flexsolver-nsc-prod.s3.ap-southeast-1.amazonaws.com/15cb9f02-09b6-4636-8b32-38b10f5ae267-Aknicare%20Logo%20%28300x115%29.png";
      case "provag":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFwv7iiX3K2d5ypyur0TJv6iVDT8TOL0AKkAdr41py1ZAWYMXjhLwwy-fXFHf__uAvbUc&usqp=CAU";
      case "latopic":
        return "https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/193_LATOPIC_252x252_bb5a0274fa.png";
      case "topicrem":
        return "https://cdn11.bigcommerce.com/s-5jmsth2jtm/images/stencil/original/topicrem_logo_1651156150__96498.original.png";
      case "neoretin":
        return "https://www.cantabrialabs.com/wp-content/uploads/2019/09/neoretin-discrom-control.png";
      case "neostrata":
        return "https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/7/AmazonStores/ATVPDKIKX0DER/33ca4aab29a59377ef567b8064a521e4.w3000.h1600.jpg";
      case "ellips":
        return "https://m.media-amazon.com/images/S/aplus-media-library-service-media/aad7d98e-14af-47af-acc5-7b0c7ccb879f.__CR0,0,970,300_PT0_SX970_V1___.jpg";
      case "saforelle":
        return "https://epharmadora.com/files/vendors/01eb7a159da0cf65d715a6ee7e5fad63.jpg";
      case "vichy":
        return "https://1000logos.net/wp-content/uploads/2021/04/Vichy-logo.png";
      case "easydew":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7LRPPFN0x6IRtWODKCXAZlvbwcUE1Cyahpw&s";
      case "skinceuticals":
        return "https://skintelligencepartners.com/wp-content/uploads/2018/09/SkinCeuticals-Logo-Cosmedic-Online-e1586272527991.png";
      case "swiss-image":
        return "https://logos-world.net/wp-content/uploads/2023/02/Swiss-International-Air-Lines-Logo.png";
      default:
        return "";
    }
  };
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

  const filteredData = sortedData?.filter(
    (product) =>
      product.variants[0].price !== 0 &&
      (!selectedVendor || product.vendor === selectedVendor)
  );

  const vendors = [...new Set(products?.map((product) => product.vendor))];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 px-4 py-2 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((key) => (
          <ProductItemSkeleton key={key} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex overflow-x-auto px-4 py-2 space-x-2 items-center">
        <button
          className={`px-4 py-2 rounded-xl border w-[90px] text-center whitespace-nowrap ${
            !selectedVendor ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => setSelectedVendor(null)}
        >
          All
        </button>
        {vendors.map((vendor) => (
          <button
            key={vendor}
            className={`px-4 py-2 rounded-xl border w-[150px] text-center whitespace-nowrap ${
              selectedVendor === vendor ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setSelectedVendor(vendor)}
          >
            {vendor}
          </button>
        ))}
      </div>

      <HorizontalDivider />
      <div className="grid grid-cols-2 px-4 py-2 gap-1">
        {filteredData?.map((product) => (
          <ProductCard
            key={product.id}
            category={product.vendor}
            image={product?.images?.[0]?.src || ""}
            defaultPrice={product?.variants?.[0]?.price}
            title={product.title}
            id={product.id}
            salePrice={product?.variants?.[0]?.compare_at_price}
          />
        ))}
      </div>
    </>
  );
}
