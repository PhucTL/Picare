import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { useCollections, useSmartCollections } from "@/hooks/hooks";
import { useEffect } from "react";
import brand from "@/static/larocheposay.png";
export default function Category() {
  const {
    data: collections,
    isError,
    isLoading,
    isFetching,
  } = useSmartCollections();

  const excludeHandle = [
    "eclat-du-teint",
    "la-roche-posay",
    "sebamed",
    "juve-heal",
    "dr-ciccarelli-1",
    "pax-moly",
    "eucerin",
    "fcl",
    "aknicare",
    "provag",
    "latopic",
    "topicrem",
    "neoretin",
    "neostrata",
    "ellips",
    "saforelle",
    "vichy",
    "easydew",
    "skinceuticals",
    "swiss-image",
  ];
  const priorityBrands = ["easydew", "eucerin", "sebamed"];

  const filteredCollections = collections?.filter(
    (collection) =>
      collection?.published_scope === "global" &&
      collection.products_count !== 0 &&
      excludeHandle.includes(collection.handle)
  );
  const sortedCollections = filteredCollections?.sort((a, b) => {
    const aPriority = priorityBrands.includes(a.handle) ? 0 : 1;
    const bPriority = priorityBrands.includes(b.handle) ? 0 : 1;
    return aPriority - bPriority;
  });
  const distributorBrand = collections?.find(
    (collection) => collection.handle === "thuong-hieu-phan-phoi"
  );
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
  return (
    <Section
      title="Danh mục nhãn hàng"
      viewMoreTo={
        distributorBrand ? `/category/${distributorBrand.id}` : "/categories"
      }
    >
      <div className="pt-2.5 pb-4 flex space-x-6 overflow-x-auto px-4">
        {sortedCollections?.map((collection) => (
          <TransitionLink
            key={collection.id}
            className="flex flex-col items-center space-y-2 flex-none basis-[70px] overflow-hidden cursor-pointer"
            to={`/category/${collection.id}`}
          >
            <div className="w-[150px] h-[60px] flex items-center justify-center ">
              <img
                src={getStaticImages(collection.handle)}
                className=" w-[70px] h-[40px] object-cover rounded-lg border border-black/15 p-1"
                alt={collection.title}
              />
            </div>
          </TransitionLink>
        ))}
      </div>
    </Section>
  );
}
