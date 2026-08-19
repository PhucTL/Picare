import * as ProductService from "@/service/productService";
import * as CollectionService from "@/service/collectionService";
import * as LocationService from "@/service/locationService";
import { Product } from "@/interfaces/Product";
import { CustomCollection } from "@/interfaces/Collection";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  Country,
  District,
  Location,
  Province,
  Ward,
} from "@/interfaces/Checkout";
import { OrderListItem } from "@/interfaces/Order";
import { getDetailOrder, getOrdersByPhone } from "@/service/orderService";

function useDefaultFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>
) {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<T>({
    queryKey,
    queryFn,
    ...options,
  });

  return { data, isLoading, isError, error, refetch, isFetching };
}

export function useProductLimit(limit: number) {
  return useDefaultFetch<Product[]>(["productsL", limit], async () =>
    ProductService.getProductByLimit(limit)
  );
}

export function useProductAll() {
  return useDefaultFetch<Product[]>(["productsA"], async () =>
    ProductService.getProductByLimit(200)
  );
}

export function useProductByCollection(collectionId: string) {
  return useDefaultFetch<Product[]>(["products", collectionId], async () =>
    ProductService.getProductListByCollectionId(collectionId)
  );
}

export function useCollections() {
  return useDefaultFetch<CustomCollection[]>(["collections"], async () =>
    CollectionService.getListOfCollection()
  );
}

export function useProductDetail(productId: string) {
  return useDefaultFetch<Product>(["detail", productId], async () =>
    ProductService.getProductById(productId)
  );
}
export function useLocationAll() {
  return useDefaultFetch<Country[]>(["locations"], async () =>
    LocationService.getAllCountry()
  );
}
export function useCountryById(countryId: string) {
  return useDefaultFetch<Country>(["country-detail", countryId], async () =>
    LocationService.getCountryById(countryId)
  );
}
export function useProvinceById(countryId: string) {
  return useDefaultFetch<Province[]>(["provinces", countryId], async () =>
    LocationService.getProvinceById(countryId)
  );
}
export function useDistrictById(provinceId: string) {
  return useDefaultFetch<District[]>(["districts", provinceId], async () =>
    LocationService.getDistrictById(provinceId)
  );
}
export function useWardById(districtId: string) {
  return useDefaultFetch<Ward[]>(["district-detail", districtId], async () =>
    LocationService.getWardById(districtId)
  );
}
export function useOrdersByPhone(phone: string) {
  return useDefaultFetch<OrderListItem[]>(["orders", phone], async () =>
    getOrdersByPhone(phone)
  );
}
export function useDetailOrder(orderId: string) {
  return useDefaultFetch<OrderListItem>(["order-detail", orderId], async () =>
    getDetailOrder(orderId)
  );
}
export function useSmartCollections() {
  return useDefaultFetch<CustomCollection[]>(["smart-collections"], async () =>
    CollectionService.getListOfSmartCollection()
  );
}
