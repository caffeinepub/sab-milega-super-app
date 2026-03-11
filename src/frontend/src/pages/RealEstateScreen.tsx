import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Ruler,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Variant_buy_land_rent_sell_farmhouse } from "../backend";
import { useAllPropertyListings, useSubmitEnquiry } from "../hooks/useQueries";

const propertyTypes = [
  { label: "Buy", value: Variant_buy_land_rent_sell_farmhouse.buy },
  { label: "Sell", value: Variant_buy_land_rent_sell_farmhouse.sell },
  { label: "Rent", value: Variant_buy_land_rent_sell_farmhouse.rent },
  { label: "Farmhouse", value: Variant_buy_land_rent_sell_farmhouse.farmhouse },
  { label: "Land", value: Variant_buy_land_rent_sell_farmhouse.land },
];

const sampleProperties = [
  {
    id: 0n,
    title: "Farm Bungalow",
    location: "Ayodhya Road, Near Sagar Institute, Rasauli, Barabanki, UP",
    budget: 11500000n,
    areaSize: 5000n,
    pricePerSqft: 2300,
    description:
      "Beautiful farm bungalow with lush green gardens, scenic lake view, fountain, wooden cottage, and landscaped walkways. A serene getaway near Sagar Institute on Ayodhya Road, Rasauli, Barabanki, UP.",
    contact: "+91-9876543210",
    images: [
      "/assets/uploads/IMG-20260228-WA0002-1.jpg",
      "/assets/uploads/IMG-20260228-WA0005-2.jpg",
      "/assets/uploads/IMG-20260228-WA0004-3.jpg",
      "/assets/uploads/IMG-20260228-WA0003-4.jpg",
      "/assets/uploads/IMG-20260228-WA0006-5.jpg",
    ],
  },
  {
    id: 1n,
    title: "Residential Plot",
    location:
      "Amausi Airport, Near Shahid Path, Transport Nagar Metro Station, Lucknow, UP",
    budget: 2199000n,
    areaSize: 1000n,
    pricePerSqft: 2199,
    description:
      "Prime residential plot near Amausi Airport on Shahid Path, close to Transport Nagar Metro Station, Lucknow. Excellent connectivity and investment opportunity in a rapidly developing area.",
    contact: "+91-9455432182",
    images: [
      "/assets/uploads/IMG-20241114-WA0006-1.jpg",
      "/assets/uploads/IMG-20241114-WA0010-2.jpg",
      "/assets/uploads/IMG-20241114-WA0007-3.jpg",
      "/assets/uploads/IMG-20241114-WA0009-4.jpg",
    ],
  },
  {
    id: 2n,
    title: "Luxury 3BHK Flat",
    location: "Sector 62, Noida",
    budget: 8500000n,
    areaSize: 1450n,
    pricePerSqft: 0,
    description:
      "Beautifully designed 3BHK with modular kitchen and gym access.",
    contact: "+91-9876543210",
    images: ["/assets/generated/property-1.dim_400x250.jpg"],
  },
  {
    id: 3n,
    title: "Premium Villa with Garden",
    location: "DLF Phase 2, Gurgaon",
    budget: 24000000n,
    areaSize: 3200n,
    pricePerSqft: 0,
    description: "Spacious villa with private garden, pool, and 4 bedrooms.",
    contact: "+91-9871234567",
    images: ["/assets/generated/property-2.dim_400x250.jpg"],
  },
  {
    id: 4n,
    title: "Modern 2BHK Apartment",
    location: "Andheri West, Mumbai",
    budget: 12000000n,
    areaSize: 950n,
    pricePerSqft: 0,
    description: "Contemporary 2BHK in prime location with sea views.",
    contact: "+91-9823456789",
    images: ["/assets/generated/property-1.dim_400x250.jpg"],
  },
];

function PropertyCard({
  prop,
  index,
  onEnquiry,
}: {
  prop: (typeof sampleProperties)[0];
  index: number;
  onEnquiry: (p: (typeof sampleProperties)[0]) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = prop.images;

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="h-52 bg-muted relative">
        <img
          src={images[imgIndex]}
          alt={prop.title}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setImgIndex((i) => (i - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              type="button"
              onClick={() => setImgIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((img, di) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImgIndex(di)}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    background:
                      di === imgIndex ? "white" : "rgba(255,255,255,0.5)",
                  }}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <div
            className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
            style={{ background: "oklch(72% 0.20 55)" }}
          >
            ₹{(Number(prop.budget) / 100000).toFixed(1)}L
          </div>
          {prop.pricePerSqft > 0 && (
            <div
              className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ background: "oklch(45% 0.18 145)" }}
            >
              ₹{prop.pricePerSqft.toLocaleString()}/sq.ft
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-base">
          {prop.title}
        </h3>
        <div className="flex items-start gap-1 text-sm text-muted-foreground mt-0.5">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span className="text-xs">{prop.location}</span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Ruler className="w-3 h-3" /> {String(prop.areaSize)} sq.ft
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" /> {prop.contact}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
          {prop.description}
        </p>
        <Button
          data-ocid={`realestate.contact_button.${index + 1}`}
          onClick={() => onEnquiry(prop)}
          className="w-full mt-3 h-10 rounded-xl font-display font-bold"
          style={{ background: "oklch(28% 0.22 280)", color: "white" }}
        >
          Contact Agent / Owner
        </Button>
      </div>
    </div>
  );
}

interface Props {
  onBack: () => void;
}

export default function RealEstateScreen({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState(
    Variant_buy_land_rent_sell_farmhouse.buy,
  );
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<
    (typeof sampleProperties)[0] | null
  >(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [locationFilter, setLocationFilter] = useState("");

  const { data: backendProps } = useAllPropertyListings();
  const submitEnquiry = useSubmitEnquiry();

  const properties =
    backendProps && backendProps.length > 0
      ? backendProps.map((p) => ({
          ...p,
          pricePerSqft: 0,
          images: ["/assets/generated/property-1.dim_400x250.jpg"],
        }))
      : sampleProperties;

  const filtered = locationFilter
    ? properties.filter((p) =>
        p.location.toLowerCase().includes(locationFilter.toLowerCase()),
      )
    : properties;

  const openEnquiry = (prop: (typeof sampleProperties)[0]) => {
    setSelectedProperty(prop);
    setEnquiryModal(true);
  };

  const handleSubmit = async () => {
    try {
      await submitEnquiry.mutateAsync({
        enquiryType: { __kind__: "realEstate", realEstate: activeTab },
        message: form.message || `Interested in: ${selectedProperty?.title}`,
        contactInfo: form.phone,
      });
      toast.success("Enquiry submitted! Our agent will contact you soon.");
      setEnquiryModal(false);
      setForm({ name: "", phone: "", message: "" });
    } catch {
      toast.error("Please login to submit enquiry.");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="gradient-hero px-4 pt-12 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="text-sm font-body">Back</span>
        </button>
        <h1 className="text-2xl font-display font-black text-white">
          Real Estate
        </h1>
        <p className="text-white/70 text-sm font-body mt-0.5">
          Buy, Sell & Rent Properties
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {propertyTypes.map((pt) => (
            <button
              type="button"
              key={pt.value}
              data-ocid="realestate.tab"
              onClick={() => setActiveTab(pt.value)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all"
              style={{
                background:
                  activeTab === pt.value
                    ? "oklch(28% 0.22 280)"
                    : "oklch(94% 0.01 270)",
                color: activeTab === pt.value ? "white" : "oklch(40% 0.08 270)",
              }}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-8 h-9 text-sm rounded-xl"
            />
          </div>
          <Input
            placeholder="Budget"
            className="flex-1 h-9 text-sm rounded-xl"
          />
          <div className="relative flex-1">
            <Ruler className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input placeholder="Area" className="pl-8 h-9 text-sm rounded-xl" />
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {filtered.map((prop, i) => (
          <PropertyCard
            key={String(prop.id)}
            prop={prop as (typeof sampleProperties)[0]}
            index={i}
            onEnquiry={openEnquiry}
          />
        ))}
      </div>

      {/* Enquiry Modal */}
      <Dialog open={enquiryModal} onOpenChange={setEnquiryModal}>
        <DialogContent
          className="max-w-[380px] rounded-3xl mx-auto"
          data-ocid="realestate.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Property Enquiry
            </DialogTitle>
          </DialogHeader>
          {selectedProperty && (
            <p className="text-sm text-muted-foreground -mt-2">
              {selectedProperty.title}
            </p>
          )}
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold">Your Name</Label>
              <Input
                data-ocid="realestate.name.input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Phone Number</Label>
              <Input
                data-ocid="realestate.phone.input"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Message</Label>
              <Textarea
                data-ocid="realestate.message.textarea"
                placeholder="Your enquiry..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="mt-1 rounded-xl"
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                data-ocid="realestate.cancel_button"
                onClick={() => setEnquiryModal(false)}
                className="flex-1 rounded-xl font-display font-semibold"
              >
                Cancel
              </Button>
              <Button
                data-ocid="realestate.submit_button"
                onClick={handleSubmit}
                disabled={submitEnquiry.isPending}
                className="flex-1 rounded-xl font-display font-bold"
                style={{ background: "oklch(28% 0.22 280)", color: "white" }}
              >
                {submitEnquiry.isPending ? "Sending..." : "Submit"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
