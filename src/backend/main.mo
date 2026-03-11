import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type EnquiryType = {
    #realEstate : { #buy; #sell; #rent; #farmhouse; #land };
    #education : { #guidance; #legal; #career };
    #webDesign : { #websiteDev; #businessPromo; #socialMedia };
    #interiorDecor : { #pvcPanel; #ceiling; #homeInterior };
    #investmentPlanning : { #property; #business; #startup; #fundManagement };
  };

  type Enquiry = {
    id : Nat;
    userId : Principal;
    enquiryType : EnquiryType;
    message : Text;
    contactInfo : Text;
    timestamp : Time.Time;
  };

  type PropertyType = { #buy; #sell; #rent; #farmhouse; #land };

  type PropertyListing = {
    id : Nat;
    owner : Principal;
    title : Text;
    propertyType : PropertyType;
    location : Text;
    budget : Nat;
    areaSize : Nat;
    description : Text;
    contact : Text;
    status : { #active; #sold; #rented };
  };

  type ProductCategory = { #home; #electronics; #fashion; #local };

  type Product = {
    id : Nat;
    title : Text;
    category : ProductCategory;
    price : Nat;
    description : Text;
    imageUrl : Text;
    stock : Nat;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type OrderStatus = { #pending; #completed; #cancelled };

  type Order = {
    id : Nat;
    userId : Principal;
    items : [CartItem];
    total : Nat;
    status : OrderStatus;
    timestamp : Time.Time;
  };

  type ConsultationType = { #investmentPlanning; #webDesign };

  type BookingStatus = { #scheduled; #completed; #cancelled };

  type ConsultationBooking = {
    id : Nat;
    userId : Principal;
    serviceType : ConsultationType;
    userName : Text;
    contact : Text;
    preferredDate : Text;
    notes : Text;
    status : BookingStatus;
  };

  public type UserProfile = {
    name : Text;
    contact : Text;
    walletBalance : Nat;
  };

  // State
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let enquiries = Map.empty<Nat, Enquiry>();
  let properties = Map.empty<Nat, PropertyListing>();
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let bookings = Map.empty<Nat, ConsultationBooking>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCarts = Map.empty<Principal, [CartItem]>();

  var nextEnquiryId = 0;
  var nextPropertyId = 0;
  var nextProductId = 0;
  var nextOrderId = 0;
  var nextBookingId = 0;

  module PropertyListing {
    public func compareByBudget(a : PropertyListing, b : PropertyListing) : Order.Order {
      Nat.compare(a.budget, b.budget);
    };
  };

  module Product {
    public func compareByPrice(a : Product, b : Product) : Order.Order {
      Nat.compare(a.price, b.price);
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (profile.name.size() < 3 or profile.name.size() > 50) {
      Runtime.trap("Name length must be between 3 and 50 characters");
    };
    if (profile.contact.size() > 20) {
      Runtime.trap("Contact must be at most 20 characters");
    };
    userProfiles.add(caller, profile);
  };

  // Enquiries
  public shared ({ caller }) func submitEnquiry(
    enquiryType : EnquiryType,
    message : Text,
    contactInfo : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit enquiries");
    };
    let enquiry : Enquiry = {
      id = nextEnquiryId;
      userId = caller;
      enquiryType;
      message;
      contactInfo;
      timestamp = Time.now();
    };
    enquiries.add(nextEnquiryId, enquiry);
    nextEnquiryId += 1;
    enquiry.id;
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all enquiries");
    };
    enquiries.values().toArray();
  };

  public query ({ caller }) func getMyEnquiries() : async [Enquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their enquiries");
    };
    enquiries.values().toArray().filter(func(e : Enquiry) : Bool { e.userId == caller });
  };

  // Property Listings
  public shared ({ caller }) func addPropertyListing(
    title : Text,
    propertyType : PropertyType,
    location : Text,
    budget : Nat,
    areaSize : Nat,
    description : Text,
    contact : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add property listings");
    };
    let listing : PropertyListing = {
      id = nextPropertyId;
      owner = caller;
      title;
      propertyType;
      location;
      budget;
      areaSize;
      description;
      contact;
      status = #active;
    };
    properties.add(nextPropertyId, listing);
    nextPropertyId += 1;
    listing.id;
  };

  public shared ({ caller }) func updatePropertyStatus(
    propertyId : Nat,
    newStatus : { #active; #sold; #rented }
  ) : async () {
    switch (properties.get(propertyId)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) {
        if (property.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the owner or admin can update property status");
        };
        properties.add(
          propertyId,
          { property with status = newStatus }
        );
      };
    };
  };

  public query ({ caller }) func getAllPropertyListings() : async [PropertyListing] {
    properties.values().toArray();
  };

  public query ({ caller }) func getMyPropertyListings() : async [PropertyListing] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their property listings");
    };
    properties.values().toArray().filter(func(p : PropertyListing) : Bool { p.owner == caller });
  };

  public query ({ caller }) func getFilteredPropertiesByBudget(minBudget : Nat, maxBudget : Nat) : async [PropertyListing] {
    properties.values().toArray().filter(func(p) { p.budget >= minBudget and p.budget <= maxBudget });
  };

  public query ({ caller }) func getSortedPropertiesByBudget(ascOrder : Bool) : async [PropertyListing] {
    let propertyArray = properties.values().toArray();
    if (ascOrder) {
      propertyArray.sort(PropertyListing.compareByBudget);
    } else {
      propertyArray.sort(PropertyListing.compareByBudget).reverse();
    };
  };

  // E-commerce - Products
  public shared ({ caller }) func addProduct(
    title : Text,
    category : ProductCategory,
    price : Nat,
    description : Text,
    imageUrl : Text,
    stock : Nat
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id = nextProductId;
      title;
      category;
      price;
      description;
      imageUrl;
      stock;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProductStock(productId : Nat, newStock : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update product stock");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(
          productId,
          { product with stock = newStock }
        );
      };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getFilteredProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query ({ caller }) func getSortedProductsByPrice(ascOrder : Bool) : async [Product] {
    let productArray = products.values().toArray();
    if (ascOrder) {
      productArray.sort(Product.compareByPrice);
    } else {
      productArray.sort(Product.compareByPrice).reverse();
    };
  };

  // E-commerce - Shopping Cart
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (product.stock < quantity) {
          Runtime.trap("Insufficient stock");
        };
        let currentCart = switch (userCarts.get(caller)) {
          case (null) { [] };
          case (?cart) { cart };
        };
        let newItem : CartItem = { productId; quantity };
        let updatedCart = currentCart.concat([newItem]);
        userCarts.add(caller, updatedCart);
      };
    };
  };

  public query ({ caller }) func getMyCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their cart");
    };
    switch (userCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func clearMyCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear their cart");
    };
    userCarts.add(caller, []);
  };

  // E-commerce - Orders
  public shared ({ caller }) func createOrder() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };
    let cart = switch (userCarts.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?c) { 
        if (c.size() == 0) {
          Runtime.trap("Cart is empty");
        };
        c;
      };
    };

    var total : Nat = 0;
    for (item in cart.vals()) {
      switch (products.get(item.productId)) {
        case (null) { Runtime.trap("Product not found in cart") };
        case (?product) {
          if (product.stock < item.quantity) {
            Runtime.trap("Insufficient stock for product: " # product.title);
          };
          total += product.price * item.quantity;
        };
      };
    };

    let order : Order = {
      id = nextOrderId;
      userId = caller;
      items = cart;
      total;
      status = #pending;
      timestamp = Time.now();
    };
    orders.add(nextOrderId, order);
    nextOrderId += 1;

    // Clear cart after order
    userCarts.add(caller, []);

    order.id;
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their orders");
    };
    orders.values().toArray().filter(func(o : Order) : Bool { o.userId == caller });
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, newStatus : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        orders.add(
          orderId,
          { order with status = newStatus }
        );
      };
    };
  };

  // Consultation Bookings
  public shared ({ caller }) func bookConsultation(
    serviceType : ConsultationType,
    userName : Text,
    contact : Text,
    preferredDate : Text,
    notes : Text
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can book consultations");
    };
    let booking : ConsultationBooking = {
      id = nextBookingId;
      userId = caller;
      serviceType;
      userName;
      contact;
      preferredDate;
      notes;
      status = #scheduled;
    };
    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
    booking.id;
  };

  public query ({ caller }) func getAllBookings() : async [ConsultationBooking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray();
  };

  public query ({ caller }) func getMyBookings() : async [ConsultationBooking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their bookings");
    };
    bookings.values().toArray().filter(func(b : ConsultationBooking) : Bool { b.userId == caller });
  };

  public shared ({ caller }) func updateBookingStatus(
    bookingId : Nat,
    newStatus : BookingStatus
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) {
        bookings.add(
          bookingId,
          { booking with status = newStatus }
        );
      };
    };
  };
};
