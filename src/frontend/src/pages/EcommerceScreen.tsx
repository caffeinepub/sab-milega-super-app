import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "../backend";
import {
  useAddToCart,
  useAllProducts,
  useCreateOrder,
  useMyCart,
} from "../hooks/useQueries";

const categories = [
  { label: "All", value: null },
  { label: "Home", value: ProductCategory.home },
  { label: "Electronics", value: ProductCategory.electronics },
  { label: "Fashion", value: ProductCategory.fashion },
  { label: "Local Store", value: ProductCategory.local },
];

const sampleProducts = [
  {
    id: 1n,
    title: 'Smart LED TV 55"',
    price: 32999n,
    category: ProductCategory.electronics,
    description: "4K Ultra HD Smart TV",
    imageUrl: "/assets/generated/product-electronics.dim_400x300.jpg",
    stock: 10n,
  },
  {
    id: 2n,
    title: "Designer Banarasi Saree",
    price: 2499n,
    category: ProductCategory.fashion,
    description: "Pure silk hand-woven saree",
    imageUrl: "/assets/generated/product-fashion.dim_400x300.jpg",
    stock: 25n,
  },
  {
    id: 3n,
    title: "Wireless Earbuds Pro",
    price: 1999n,
    category: ProductCategory.electronics,
    description: "Active noise cancellation",
    imageUrl: "/assets/generated/product-electronics.dim_400x300.jpg",
    stock: 50n,
  },
  {
    id: 4n,
    title: "Ethnic Kurta Set",
    price: 1299n,
    category: ProductCategory.fashion,
    description: "Cotton blend men's kurta",
    imageUrl: "/assets/generated/product-fashion.dim_400x300.jpg",
    stock: 40n,
  },
  {
    id: 5n,
    title: "Air Purifier Pro",
    price: 8999n,
    category: ProductCategory.home,
    description: "HEPA filter, covers 600 sq.ft",
    imageUrl: "/assets/generated/product-electronics.dim_400x300.jpg",
    stock: 15n,
  },
  {
    id: 6n,
    title: "Handloom Bedsheet",
    price: 899n,
    category: ProductCategory.home,
    description: "100% cotton double bedsheet",
    imageUrl: "/assets/generated/product-fashion.dim_400x300.jpg",
    stock: 80n,
  },
];

interface CartState {
  [productId: string]: number;
}

interface Props {
  onBack: () => void;
}

export default function EcommerceScreen({ onBack }: Props) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(
    null,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [localCart, setLocalCart] = useState<CartState>({});

  const { data: backendProducts } = useAllProducts();
  const addToCart = useAddToCart();
  const { data: backendCart } = useMyCart();
  const createOrder = useCreateOrder();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : sampleProducts;

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const cartItemCount =
    Object.values(localCart).reduce((a, b) => a + b, 0) +
    (backendCart ? backendCart.reduce((a, b) => a + Number(b.quantity), 0) : 0);

  const handleAddToCart = async (productId: bigint) => {
    const key = String(productId);
    setLocalCart((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    try {
      await addToCart.mutateAsync({ productId, quantity: 1n });
    } catch {
      // silently fail — local cart still works
    }
    toast.success("Added to cart!");
  };

  const handleBuyNow = async (productId: bigint) => {
    await handleAddToCart(productId);
    setCartOpen(true);
  };

  const handleUpdateLocalCart = (key: string, delta: number) => {
    setLocalCart((prev) => {
      const next = { ...prev };
      const newVal = (next[key] || 0) + delta;
      if (newVal <= 0) delete next[key];
      else next[key] = newVal;
      return next;
    });
  };

  const handlePlaceOrder = async () => {
    try {
      await createOrder.mutateAsync();
      setLocalCart({});
      toast.success("Order placed successfully! 🎉");
      setCartOpen(false);
    } catch {
      toast.error("Please login to place order.");
    }
  };

  const cartProducts = Object.entries(localCart)
    .map(([id, qty]) => ({
      product: products.find((p) => String(p.id) === id),
      qty,
    }))
    .filter((item) => item.product != null);

  const cartTotal = cartProducts.reduce(
    (sum, item) => sum + Number(item.product!.price) * item.qty,
    0,
  );

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="gradient-card-ecommerce px-4 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-white/80"
          >
            <ArrowLeft className="w-5 h-5" />{" "}
            <span className="text-sm font-body">Back</span>
          </button>
          <button
            type="button"
            data-ocid="ecommerce.cart_button"
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {cartItemCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] font-bold rounded-full"
                style={{ background: "oklch(72% 0.20 55)", color: "white" }}
              >
                {cartItemCount}
              </Badge>
            )}
          </button>
        </div>
        <h1 className="text-2xl font-display font-black text-white mt-3">
          E-commerce
        </h1>
        <p className="text-white/70 text-sm font-body mt-0.5">
          Shop Everything You Need
        </p>
      </div>

      {/* Category tabs */}
      <div className="px-4 py-3 bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              type="button"
              key={String(cat.value)}
              data-ocid="ecommerce.category.tab"
              onClick={() => setActiveCategory(cat.value)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all"
              style={{
                background:
                  activeCategory === cat.value
                    ? "oklch(28% 0.22 280)"
                    : "oklch(94% 0.01 270)",
                color:
                  activeCategory === cat.value
                    ? "white"
                    : "oklch(40% 0.08 270)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, i) => (
            <div
              key={String(product.id)}
              className="bg-card rounded-2xl shadow-card overflow-hidden"
            >
              <div className="h-36 bg-muted">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2.5">
                <p className="text-xs font-display font-bold text-foreground leading-snug line-clamp-2">
                  {product.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star
                    className="w-2.5 h-2.5 fill-current"
                    style={{ color: "oklch(72% 0.20 55)" }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    4.{(i % 3) + 5}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">
                    {String(product.stock)} left
                  </span>
                </div>
                <p
                  className="font-display font-black text-sm mt-1"
                  style={{ color: "oklch(28% 0.22 280)" }}
                >
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
                <div className="flex gap-1.5 mt-2">
                  <Button
                    data-ocid={`ecommerce.addtocart_button.${i + 1}`}
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToCart(product.id)}
                    className="flex-1 h-8 text-[10px] rounded-lg font-display font-bold border-2 px-1"
                    style={{
                      borderColor: "oklch(28% 0.22 280)",
                      color: "oklch(28% 0.22 280)",
                    }}
                  >
                    + Cart
                  </Button>
                  <Button
                    data-ocid={`ecommerce.buynow_button.${i + 1}`}
                    size="sm"
                    onClick={() => handleBuyNow(product.id)}
                    className="flex-1 h-8 text-[10px] rounded-lg font-display font-bold px-1"
                    style={{
                      background: "oklch(28% 0.22 280)",
                      color: "white",
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl max-h-[80vh]"
          data-ocid="ecommerce.sheet"
        >
          <SheetHeader>
            <SheetTitle className="font-display font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> My Cart ({cartItemCount}{" "}
              items)
            </SheetTitle>
          </SheetHeader>

          {cartProducts.length === 0 ? (
            <div
              data-ocid="ecommerce.cart.empty_state"
              className="py-12 text-center"
            >
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-muted-foreground font-body text-sm">
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3 overflow-y-auto max-h-[45vh]">
              {cartProducts.map(
                ({ product, qty }, i) =>
                  product && (
                    <div
                      key={String(product.id)}
                      data-ocid={`ecommerce.cart.item.${i + 1}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-bold truncate">
                          {product.title}
                        </p>
                        <p
                          className="text-sm font-black"
                          style={{ color: "oklch(28% 0.22 280)" }}
                        >
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateLocalCart(String(product.id), -1)
                          }
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                        >
                          {qty === 1 ? (
                            <Trash2 className="w-3 h-3 text-destructive" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </button>
                        <span className="text-sm font-bold w-4 text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateLocalCart(String(product.id), 1)
                          }
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}

          {cartProducts.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-bold text-foreground">
                  Total
                </span>
                <span
                  className="text-xl font-display font-black"
                  style={{ color: "oklch(28% 0.22 280)" }}
                >
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <Button
                data-ocid="ecommerce.place_order_button"
                className="w-full h-12 rounded-2xl font-display font-bold text-base"
                style={{ background: "oklch(28% 0.22 280)", color: "white" }}
                onClick={handlePlaceOrder}
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? "Placing Order..." : "Place Order 🎉"}
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
