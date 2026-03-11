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
import { ArrowLeft, Grid, Home, Layers } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Variant_pvcPanel_ceiling_homeInterior } from "../backend";
import { useSubmitEnquiry } from "../hooks/useQueries";

const services = [
  {
    icon: Layers,
    title: "PVC Wall Panel",
    value: Variant_pvcPanel_ceiling_homeInterior.pvcPanel,
    description:
      "Premium PVC wall panels for a modern look. Durable, waterproof, and easy to install.",
    img: "/assets/generated/interior-1.dim_400x250.jpg",
    color: "from-amber-500 to-orange-600",
    tags: ["Waterproof", "Easy Install", "10yr Warranty"],
  },
  {
    icon: Grid,
    title: "False Ceiling",
    value: Variant_pvcPanel_ceiling_homeInterior.ceiling,
    description:
      "Elegant false ceiling designs including gypsum, POP, and wooden finishes with lighting integration.",
    img: "/assets/generated/interior-1.dim_400x250.jpg",
    color: "from-rose-500 to-pink-600",
    tags: ["Gypsum/POP", "LED Integration", "Custom Design"],
  },
  {
    icon: Home,
    title: "Home Interior Design",
    value: Variant_pvcPanel_ceiling_homeInterior.homeInterior,
    description:
      "Complete home interior solutions — from living room to bedroom, we design your dream home.",
    img: "/assets/generated/interior-1.dim_400x250.jpg",
    color: "from-indigo-500 to-purple-600",
    tags: ["3D Design", "End-to-End", "Budget Plans"],
  },
];

interface Props {
  onBack: () => void;
}

export default function InteriorDecorScreen({ onBack }: Props) {
  const [bookModal, setBookModal] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    message: "",
  });
  const submitEnquiry = useSubmitEnquiry();

  const openBook = (svc: (typeof services)[0]) => {
    setSelectedService(svc);
    setBookModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedService) return;
    try {
      await submitEnquiry.mutateAsync({
        enquiryType: {
          __kind__: "interiorDecor",
          interiorDecor: selectedService.value,
        },
        message: `Address: ${form.address}. Preferred Date: ${form.date}. ${form.message}`,
        contactInfo: form.phone,
      });
      toast.success("Service booked! Our team will call you to confirm.");
      setBookModal(false);
      setForm({ name: "", phone: "", address: "", date: "", message: "" });
    } catch {
      toast.error("Please login to book service.");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="gradient-card-interior px-4 pt-12 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="text-sm font-body">Back</span>
        </button>
        <h1 className="text-2xl font-display font-black text-white">
          Interior Decor
        </h1>
        <p className="text-white/70 text-sm font-body mt-0.5">
          Transform Your Living Space
        </p>
      </div>

      <div className="flex-1 px-4 py-5 space-y-4">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.value}
              className="bg-card rounded-2xl shadow-card overflow-hidden"
            >
              <div className="relative h-40">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${svc.color.replace("from-", "from-").replace("to-", "to-")} opacity-60`}
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base">
                    {svc.title}
                  </h3>
                </div>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold text-white bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  {svc.description}
                </p>
                <Button
                  data-ocid={`interiordecor.book_button.${i + 1}`}
                  onClick={() => openBook(svc)}
                  className="w-full mt-3 h-10 rounded-xl font-display font-bold"
                  style={{ background: "oklch(28% 0.22 280)", color: "white" }}
                >
                  Book Service
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={bookModal} onOpenChange={setBookModal}>
        <DialogContent
          className="max-w-[380px] rounded-3xl mx-auto"
          data-ocid="interiordecor.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Book Service
            </DialogTitle>
          </DialogHeader>
          {selectedService && (
            <p className="text-sm text-muted-foreground -mt-2">
              {selectedService.title}
            </p>
          )}
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold">Your Name</Label>
              <Input
                data-ocid="interiordecor.name.input"
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
                data-ocid="interiordecor.phone.input"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Address</Label>
              <Input
                data-ocid="interiordecor.address.input"
                placeholder="Your address"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Preferred Date</Label>
              <Input
                data-ocid="interiordecor.date.input"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Additional Notes</Label>
              <Textarea
                data-ocid="interiordecor.message.textarea"
                placeholder="Any specific requirements..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="mt-1 rounded-xl"
                rows={2}
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                data-ocid="interiordecor.cancel_button"
                onClick={() => setBookModal(false)}
                className="flex-1 rounded-xl font-display font-semibold"
              >
                Cancel
              </Button>
              <Button
                data-ocid="interiordecor.submit_button"
                onClick={handleSubmit}
                disabled={submitEnquiry.isPending}
                className="flex-1 rounded-xl font-display font-bold"
                style={{ background: "oklch(28% 0.22 280)", color: "white" }}
              >
                {submitEnquiry.isPending ? "Booking..." : "Book Now"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
