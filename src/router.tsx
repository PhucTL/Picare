import Layout from "@/components/layout";
import CartPage from "@/pages/cart";
import ProductListPage from "@/pages/catalog/product-list";
import CategoryListPage from "@/pages/catalog";
import ProductDetailPage from "@/pages/catalog/product-detail";
import HomePage from "@/pages/home";
import ProfilePage from "@/pages/profile/index";
import SearchPage from "@/pages/search";
import CheckoutPage from "./pages/checkout";
import { PolicyPage } from "@/pages/profile/policy";
import { createBrowserRouter } from "react-router-dom";
import { getBasePath } from "@/utils/zma";
import SaleProductListPage from "./pages/catalog/sale-list";
import CheckoutLayout from "./components/checkout-layout";
import InfomationPage from "./pages/checkout/infomation";
import LocationPage from "./pages/checkout/location";
import ScanQrPage from "./pages/payment/scan-qr";
import CashSuccessPage from "./pages/payment/cash-success";
import AuthorizePage from "./pages/authorize";
import OrderPage from "./pages/order";
import OrderDetail from "./pages/order/detail";
import { IntroducePage } from "@/pages/profile/introduce";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          handle: {
            logo: true,
            scrollRestoration: 0,
          },
        },
        {
          path: "/categories",
          element: <CategoryListPage />,
          handle: {
            title: "Danh mục sản phẩm",
            back: true,
          },
        },
        {
          path: "/cart",
          element: <CartPage />,
          handle: {
            title: "Giỏ hàng",
          },
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          handle: {
            title: "Trang cá nhân",
          },
        },
        {
          path: "/flash-sales",
          element: <SaleProductListPage />,
          handle: {
            title: "Sản phẩm Sales",
          },
        },
        {
          path: "/category/:id",
          element: <ProductListPage />,
          handle: {
            title: ({ filteredCollections, params }) => {
              const collection = filteredCollections?.find(
                (c) => String(c.id) === params.id
              );
              return collection ? collection.title : "Danh mục sản phẩm";
            },
          },
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
          handle: {
            scrollRestoration: 0,
            title: "Chi tiết sản phẩm",
          },
        },
        {
          path: "/search",
          element: <SearchPage />,
          handle: {
            title: "Tìm kiếm",
          },
        },
        {
          path: "/policy",
          element: <PolicyPage />,
          handle: {
            title: "Chính sách và điều khoản",
          },
        },
        {
          path: "/introduce",
          element: <IntroducePage />,
          handle: {
            title: "Giới thiệu",
          },
        },
      ],
    },
    {
      path: "/orders",
      element: <CheckoutLayout />,
      children: [
        {
          path: "/orders",
          element: <OrderPage />,
          handle: {
            scrollRestoration: 0,
            title: "Lịch sử mua hàng",
          },
        },
        {
          path: "/orders/detail/:orderId",
          element: <OrderDetail />,
          handle: {
            title: "Chi tiết đơn hàng",
          },
        },
      ],
    },
    {
      path: "/checkout",
      element: <CheckoutLayout />,
      children: [
        {
          path: "/checkout",
          element: <CheckoutPage />,
          handle: {
            title: "Xác nhận đơn hàng",
          },
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
          handle: {
            title: "Xác nhận đơn hàng",
          },
        },
        {
          path: "/checkout/info",
          element: <InfomationPage />,
          handle: {
            title: "Thông tin cá nhân",
          },
        },
        {
          path: "/checkout/location",
          element: <LocationPage />,
          handle: {
            title: "Địa chỉ giao hàng",
            scrollRestoration: 0,
          },
        },
      ],
    },
    {
      path: "/order-success",
      element: <CashSuccessPage />,
    },
    {
      path: "/scan-qr",
      element: <ScanQrPage />,
    },
    {
      path: "/authorize",
      element: <AuthorizePage />,
    },
  ],
  { basename: getBasePath() }
);

export default router;
