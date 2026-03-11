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
import { ArrowLeft, Globe, Megaphone, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Variant_websiteDev_businessPromo_socialMedia } from "../backend";
import { useSubmitEnquiry } from "../hooks/useQueries";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    value: Variant_websiteDev_businessPromo_socialMedia.websiteDev,
    description:
      "Custom website development with modern tech stack. Responsive, fast, and SEO optimized.",
    features: [
      "Custom Design",
      "Mobile Responsive",
      "SEO Optimized",
      "Fast Loading",
      "CMS Integration",
      "1 Year Support",
    ],
    color: "from-blue-600 to-cyan-500",
    price: "Starting ₹15,000",
  },
  {
    icon: Megaphone,
    title: "Business Promotion",
    value: Variant_websiteDev_businessPromo_socialMedia.businessPromo,
    description:
      "Grow your business with targeted online promotions and digital marketing campaigns.",
    features: [
      "Google Ads",
      "Facebook Ads",
      "Email Marketing",
      "Content Creation",
      "Analytics",
      "Monthly Reports",
    ],
    color: "from-orange-500 to-pink-500",
    price: "Starting ₹8,000/mo",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    value: Variant_websiteDev_businessPromo_socialMedia.socialMedia,
    description:
      "Build brand awareness and engage your audience with strategic social media management.",
    features: [
      "Profile Setup",
      "Daily Posts",
      "Story Creation",
      "Reel Production",
      "Community Mgmt",
      "Growth Hacking",
    ],
    color: "from-purple-500 to-pink-600",
    price: "Starting ₹5,000/mo",
  },
];

interface Props {
  onBack: () => void;
}

export default function WebDesignScreen({ onBack }: Props) {
  const [quoteModal, setQuoteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    budget: "",
    message: "",
  });
  const submitEnquiry = useSubmitEnquiry();

  const openQuote = (svc: (typeof services)[0]) => {
    setSelectedService(svc);
    setQuoteModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedService) return;
    try {
      await submitEnquiry.mutateAsync({
        enquiryType: {
          __kind__: "webDesign",
          webDesign: selectedService.value,
        },
        message: `Budget: ${form.budget}. ${form.message}`,
        contactInfo: form.phone,
      });
      toast.success(
        "Quote request sent! We'll get back to you within 24 hours.",
      );
      setQuoteModal(false);
      setForm({ name: "", phone: "", budget: "", message: "" });
    } catch {
      toast.error("Please login to request a quote.");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="gradient-card-webdesign px-4 pt-12 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="text-sm font-body">Back</span>
        </button>
        <h1 className="text-2xl font-display font-black text-white">
          Web Design
        </h1>
        <p className="text-white/70 text-sm font-body mt-0.5">
          Digital Solutions for Your Business
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
              <div className={`bg-gradient-to-r ${svc.color} p-4`}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">
                      {svc.title}
                    </h3>
                    <span className="text-xs text-white/80 font-body">
                      {svc.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  {svc.description}
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-1.5">
                  {svc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-foreground"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "oklch(72% 0.20 55)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  data-ocid={`webdesign.quote_button.${i + 1}`}
                  onClick={() => openQuote(svc)}
                  className="w-full mt-4 h-10 rounded-xl font-display font-bold"
                  style={{ background: "oklch(28% 0.22 280)", color: "white" }}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={quoteModal} onOpenChange={setQuoteModal}>
        <DialogContent
          className="max-w-[380px] rounded-3xl mx-auto"
          data-ocid="webdesign.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Get a Quote
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
                data-ocid="webdesign.name.input"
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
                data-ocid="webdesign.phone.input"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Budget Range</Label>
              <Input
                data-ocid="webdesign.budget.input"
                placeholder="e.g. ₹10,000 - ₹25,000"
                value={form.budget}
                onChange={(e) =>
                  setForm((f) => ({ ...f, budget: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Project Details</Label>
              <Textarea
                data-ocid="webdesign.message.textarea"
                placeholder="Describe your project..."
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
                data-ocid="webdesign.cancel_button"
                onClick={() => setQuoteModal(false)}
                className="flex-1 rounded-xl font-display font-semibold"
              >
                Cancel
              </Button>
              <Button
                data-ocid="webdesign.submit_button"
                onClick={handleSubmit}
                disabled={submitEnquiry.isPending}
                className="flex-1 rounded-xl font-display font-bold"
                style={{ background: "oklch(28% 0.22 280)", color: "white" }}
              >
                {submitEnquiry.isPending ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
