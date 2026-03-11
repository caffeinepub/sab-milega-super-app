import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ConsultationType,
  EnquiryType,
  ProductCategory,
} from "../backend";
import { Variant_buy_land_rent_sell_farmhouse } from "../backend";
import { useActor } from "./useActor";

export { Variant_buy_land_rent_sell_farmhouse };

export function useAllPropertyListings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPropertyListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: ProductCategory | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === null) return actor.getAllProducts();
      return actor.getFilteredProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyCart() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myCart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      enquiryType: EnquiryType;
      message: string;
      contactInfo: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitEnquiry(
        params.enquiryType,
        params.message,
        params.contactInfo,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myEnquiries"] }),
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addToCart(params.productId, params.quantity);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myCart"] }),
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.createOrder();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myCart"] });
      qc.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.clearMyCart();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myCart"] }),
  });
}

export function useBookConsultation() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      serviceType: ConsultationType;
      userName: string;
      contact: string;
      preferredDate: string;
      notes: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookConsultation(
        params.serviceType,
        params.userName,
        params.contact,
        params.preferredDate,
        params.notes,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myBookings"] }),
  });
}
