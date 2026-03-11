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
import { ArrowLeft, BookOpen, Compass, Scale } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Variant_legal_career_guidance } from "../backend";
import { useSubmitEnquiry } from "../hooks/useQueries";

const services = [
  {
    icon: BookOpen,
    title: "Educational Guidance",
    value: Variant_legal_career_guidance.guidance,
    description:
      "Expert counselling for school and college admissions. Get personalized guidance for the right educational path.",
    features: [
      "School Admission Help",
      "College Selection",
      "Course Guidance",
      "Scholarship Info",
    ],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Scale,
    title: "Legal Consultant",
    value: Variant_legal_career_guidance.legal,
    description:
      "Professional legal advice for education-related matters including visa, documentation, and disputes.",
    features: [
      "Visa Documentation",
      "Education Disputes",
      "Contract Review",
      "Legal Advisory",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Compass,
    title: "Career Counselling",
    value: Variant_legal_career_guidance.career,
    description:
      "Discover your true potential with expert career counselling and roadmap planning for your future.",
    features: [
      "Aptitude Testing",
      "Career Mapping",
      "Interview Prep",
      "Resume Building",
    ],
    color: "from-purple-500 to-violet-600",
  },
];

interface Props {
  onBack: () => void;
}

export default function EducationScreen({ onBack }: Props) {
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const submitEnquiry = useSubmitEnquiry();

  const openEnquiry = (svc: (typeof services)[0]) => {
    setSelectedService(svc);
    setEnquiryModal(true);
  };

  const handleSubmit = async () => {
    if (!selectedService) return;
    try {
      await submitEnquiry.mutateAsync({
        enquiryType: {
          __kind__: "education",
          education: selectedService.value,
        },
        message: form.message,
        contactInfo: form.phone,
      });
      toast.success("Enquiry sent! We will contact you shortly.");
      setEnquiryModal(false);
      setForm({ name: "", phone: "", message: "" });
    } catch {
      toast.error("Please login to submit enquiry.");
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="gradient-card-education px-4 pt-12 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="text-sm font-body">Back</span>
        </button>
        <h1 className="text-2xl font-display font-black text-white">
          Education
        </h1>
        <p className="text-white/70 text-sm font-body mt-0.5">
          Guidance • Legal • Career
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
              <div
                className={`bg-gradient-to-r ${svc.color} p-4 flex items-center gap-3`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  {svc.title}
                </h3>
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
                        style={{ background: "oklch(28% 0.22 280)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button
                    data-ocid={`education.apply_button.${i + 1}`}
                    onClick={() => openEnquiry(svc)}
                    className="flex-1 h-10 rounded-xl font-display font-bold"
                    style={{
                      background: "oklch(28% 0.22 280)",
                      color: "white",
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button
                    data-ocid={`education.enquiry_button.${i + 1}`}
                    variant="outline"
                    onClick={() => openEnquiry(svc)}
                    className="flex-1 h-10 rounded-xl font-display font-semibold border-2"
                    style={{
                      borderColor: "oklch(28% 0.22 280)",
                      color: "oklch(28% 0.22 280)",
                    }}
                  >
                    Enquiry
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={enquiryModal} onOpenChange={setEnquiryModal}>
        <DialogContent
          className="max-w-[380px] rounded-3xl mx-auto"
          data-ocid="education.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Education Enquiry
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
                data-ocid="education.name.input"
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
                data-ocid="education.phone.input"
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
                data-ocid="education.message.textarea"
                placeholder="Tell us about your requirements..."
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
                data-ocid="education.cancel_button"
                onClick={() => setEnquiryModal(false)}
                className="flex-1 rounded-xl font-display font-semibold"
              >
                Cancel
              </Button>
              <Button
                data-ocid="education.submit_button"
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
