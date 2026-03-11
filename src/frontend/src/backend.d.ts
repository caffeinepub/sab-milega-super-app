import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export type EnquiryType = {
    __kind__: "realEstate";
    realEstate: Variant_buy_land_rent_sell_farmhouse;
} | {
    __kind__: "webDesign";
    webDesign: Variant_websiteDev_businessPromo_socialMedia;
} | {
    __kind__: "education";
    education: Variant_legal_career_guidance;
} | {
    __kind__: "investmentPlanning";
    investmentPlanning: Variant_startup_business_property_fundManagement;
} | {
    __kind__: "interiorDecor";
    interiorDecor: Variant_pvcPanel_ceiling_homeInterior;
};
export interface PropertyListing {
    id: bigint;
    status: Variant_rented_active_sold;
    title: string;
    contact: string;
    propertyType: PropertyType;
    owner: Principal;
    description: string;
    areaSize: bigint;
    budget: bigint;
    location: string;
}
export interface Enquiry {
    id: bigint;
    contactInfo: string;
    enquiryType: EnquiryType;
    userId: Principal;
    message: string;
    timestamp: Time;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    total: bigint;
    userId: Principal;
    timestamp: Time;
    items: Array<CartItem>;
}
export interface ConsultationBooking {
    id: bigint;
    status: BookingStatus;
    userName: string;
    serviceType: ConsultationType;
    contact: string;
    userId: Principal;
    preferredDate: string;
    notes: string;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    title: string;
    description: string;
    stock: bigint;
    imageUrl: string;
    category: ProductCategory;
    price: bigint;
}
export interface UserProfile {
    contact: string;
    name: string;
    walletBalance: bigint;
}
export enum BookingStatus {
    scheduled = "scheduled",
    cancelled = "cancelled",
    completed = "completed"
}
export enum ConsultationType {
    webDesign = "webDesign",
    investmentPlanning = "investmentPlanning"
}
export enum OrderStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed"
}
export enum ProductCategory {
    home = "home",
    local = "local",
    fashion = "fashion",
    electronics = "electronics"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_buy_land_rent_sell_farmhouse {
    buy = "buy",
    land = "land",
    rent = "rent",
    sell = "sell",
    farmhouse = "farmhouse"
}
export enum Variant_legal_career_guidance {
    legal = "legal",
    career = "career",
    guidance = "guidance"
}
export enum Variant_pvcPanel_ceiling_homeInterior {
    pvcPanel = "pvcPanel",
    ceiling = "ceiling",
    homeInterior = "homeInterior"
}
export enum Variant_rented_active_sold {
    rented = "rented",
    active = "active",
    sold = "sold"
}
export enum Variant_startup_business_property_fundManagement {
    startup = "startup",
    business = "business",
    property = "property",
    fundManagement = "fundManagement"
}
export enum Variant_websiteDev_businessPromo_socialMedia {
    websiteDev = "websiteDev",
    businessPromo = "businessPromo",
    socialMedia = "socialMedia"
}
export interface backendInterface {
    addProduct(title: string, category: ProductCategory, price: bigint, description: string, imageUrl: string, stock: bigint): Promise<bigint>;
    addPropertyListing(title: string, propertyType: PropertyType, location: string, budget: bigint, areaSize: bigint, description: string, contact: string): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookConsultation(serviceType: ConsultationType, userName: string, contact: string, preferredDate: string, notes: string): Promise<bigint>;
    clearMyCart(): Promise<void>;
    createOrder(): Promise<bigint>;
    getAllBookings(): Promise<Array<ConsultationBooking>>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllPropertyListings(): Promise<Array<PropertyListing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFilteredProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getFilteredPropertiesByBudget(minBudget: bigint, maxBudget: bigint): Promise<Array<PropertyListing>>;
    getMyBookings(): Promise<Array<ConsultationBooking>>;
    getMyCart(): Promise<Array<CartItem>>;
    getMyEnquiries(): Promise<Array<Enquiry>>;
    getMyOrders(): Promise<Array<Order>>;
    getMyPropertyListings(): Promise<Array<PropertyListing>>;
    getSortedProductsByPrice(ascOrder: boolean): Promise<Array<Product>>;
    getSortedPropertiesByBudget(ascOrder: boolean): Promise<Array<PropertyListing>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitEnquiry(enquiryType: EnquiryType, message: string, contactInfo: string): Promise<bigint>;
    updateBookingStatus(bookingId: bigint, newStatus: BookingStatus): Promise<void>;
    updateOrderStatus(orderId: bigint, newStatus: OrderStatus): Promise<void>;
    updateProductStock(productId: bigint, newStock: bigint): Promise<void>;
    updatePropertyStatus(propertyId: bigint, newStatus: Variant_rented_active_sold): Promise<void>;
}
