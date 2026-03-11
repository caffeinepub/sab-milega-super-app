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
  Briefcase,
  Building2,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConsultationType } from "../backend";
import { useBookConsultation } from "../hooks/useQueries";

const options = [
  {
    icon: Building2,
    title: "Property Investment",
    description:
      "Expert guidance on real estate investments — residential, commercial, and land acquisition strategies.",
    roi: "12-18% ROI",
    risk: "Low-Medium",
    color: "from-blue-600 to-indigo-700",
  },
  {
    icon: Briefcase,
    title: "Business Investment",
    description:
      "Strategic business investment consultation for scaling existing ventures or entering new markets.",
    roi: "20-35% ROI",
    risk: "Medium",
    color: "from-emerald-600 to-teal-700",
  },
  {
    icon: Rocket,
    title: "Startup Guidance",
    description:
      "End-to-end startup advisory from idea validation to funding — connect with the right investors.",
    roi: "High Potential",
    risk: "High",
    color: "from-orange-500 to-rose-600",
  },
  {
    icon: TrendingUp,
    title: "Fund Management",
    description:
      "Professional portfolio and mutual fund management to grow your wealth steadily over time.",
    roi: "10-22% ROI",
    risk: "Low",
    color: "from-purple-600 to-violet-700",
  },
];

interface Props {
  onBack: () => void;
}

export default function InvestmentScreen({ onBack }: Props) {
  const [consultModal, setConsultModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    (typeof options)[0] | null
  >(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    amount: "",
    date: "",
    message: "",
  });
  const bookConsultation = useBookConsultation();

  const openConsult = (opt: (typeof options)[0]) => {
    setSelectedOption(opt);
    setConsultModal(true);
  };

  const handleSubmit = async () => {
    try {
      await bookConsultation.mutateAsync({
        serviceType: ConsultationType.investmentPlanning,
        userName: form.name,
        contact: form.phone,
        preferredDate: form.date,
        notes: `Investment type: ${selectedOption?.title}. Amount: ${form.amount}. ${form.message}`,
      });
      toast.success("Consultation booked! Our advisor will contact you soon.");
      setConsultModal(false);
      setForm({ name: "", phone: "", amount: "", date: "", message: "" });
    } catch {
      toast.error("Please login to book consultation.");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="gradient-card-investment px-4 pt-12 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="text-sm font-body">Back</span>
        </button>
        <h1 className="text-2xl font-display font-black text-white">
          Investment Planning
        </h1>
        <p className="text-white/70 text-sm font-body mt-0.5">
          Grow Your Wealth Smartly
        </p>
      </div>

      <div className="flex-1 px-4 py-5 space-y-4">
        {options.map((opt, i) => {
          const Icon = opt.icon;
          return (
            <div
              key={opt.title}
              className={`rounded-2xl shadow-card overflow-hidden bg-gradient-to-br ${opt.color}`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base">
                        {opt.title}
                      </h3>
                      <div className="flex gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                          {opt.roi}
                        </span>
                        <span className="text-[10px] font-bold text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                          Risk: {opt.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/80 mt-3 font-body">
                  {opt.description}
                </p>
                <Button
                  data-ocid={`investment.consult_button.${i + 1}`}
                  onClick={() => openConsult(opt)}
                  className="w-full mt-4 h-10 rounded-xl font-display font-bold bg-white/20 text-white border border-white/30 hover:bg-white/30"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={consultModal} onOpenChange={setConsultModal}>
        <DialogContent
          className="max-w-[380px] rounded-3xl mx-auto"
          data-ocid="investment.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Book Consultation
            </DialogTitle>
          </DialogHeader>
          {selectedOption && (
            <p className="text-sm text-muted-foreground -mt-2">
              {selectedOption.title}
            </p>
          )}
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold">Your Name</Label>
              <Input
                data-ocid="investment.name.input"
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
                data-ocid="investment.phone.input"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">
                Investment Amount Range
              </Label>
              <Input
                data-ocid="investment.amount.input"
                placeholder="e.g. ₹5L - ₹25L"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Preferred Date</Label>
              <Input
                data-ocid="investment.date.input"
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Notes</Label>
              <Textarea
                data-ocid="investment.message.textarea"
                placeholder="Any specific goals or questions?"
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
                data-ocid="investment.cancel_button"
                onClick={() => setConsultModal(false)}
                className="flex-1 rounded-xl font-display font-semibold"
              >
                Cancel
              </Button>
              <Button
                data-ocid="investment.submit_button"
                onClick={handleSubmit}
                disabled={bookConsultation.isPending}
                className="flex-1 rounded-xl font-display font-bold"
                style={{ background: "oklch(28% 0.22 280)", color: "white" }}
              >
                {bookConsultation.isPending ? "Booking..." : "Confirm"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
