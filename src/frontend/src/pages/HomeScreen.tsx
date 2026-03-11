import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  MapPin,
  Search,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Screen } from "../App";

const services = [
  {
    id: "realestate" as Screen,
    icon: "🏡",
    label: "Real Estate",
    color: "gradient-card-realestate",
  },
  {
    id: "education" as Screen,
    icon: "🎓",
    label: "Education",
    color: "gradient-card-education",
  },
  {
    id: "webdesign" as Screen,
    icon: "💻",
    label: "Web Design",
    color: "gradient-card-webdesign",
  },
  {
    id: "interiordecor" as Screen,
    icon: "🏠",
    label: "Interior Decor",
    color: "gradient-card-interior",
  },
  {
    id: "investment" as Screen,
    icon: "📈",
    label: "Investment",
    color: "gradient-card-investment",
  },
  {
    id: "ecommerce" as Screen,
    icon: "🛒",
    label: "E-commerce",
    color: "gradient-card-ecommerce",
  },
];

const featuredProperties = [
  {
    title: "Luxury 3BHK Flat",
    location: "Sector 62, Noida",
    price: "₹85 Lakh",
    tag: "Featured",
    img: "/assets/generated/property-1.dim_400x250.jpg",
  },
  {
    title: "Premium Villa",
    location: "DLF Phase 2, Gurgaon",
    price: "₹2.4 Crore",
    tag: "Hot Deal",
    img: "/assets/generated/property-2.dim_400x250.jpg",
  },
  {
    title: "Modern 2BHK",
    location: "Andheri West, Mumbai",
    price: "₹1.2 Crore",
    tag: "New",
    img: "/assets/generated/property-1.dim_400x250.jpg",
  },
];

const featuredColleges = [
  {
    title: "Delhi University",
    location: "North Campus, Delhi",
    tag: "Admission Open",
    img: "/assets/generated/college-1.dim_400x250.jpg",
  },
  {
    title: "IIT Roorkee",
    location: "Roorkee, Uttarakhand",
    tag: "B.Tech 2025",
    img: "/assets/generated/college-1.dim_400x250.jpg",
  },
  {
    title: "Amity University",
    location: "Noida, UP",
    tag: "MBA Open",
    img: "/assets/generated/college-1.dim_400x250.jpg",
  },
];

const trendingProducts = [
  {
    title: 'Smart LED TV 55"',
    price: "₹32,999",
    rating: 4.5,
    img: "/assets/generated/product-electronics.dim_400x300.jpg",
  },
  {
    title: "Designer Saree",
    price: "₹2,499",
    rating: 4.8,
    img: "/assets/generated/product-fashion.dim_400x300.jpg",
  },
  {
    title: "Air Purifier Pro",
    price: "₹8,999",
    rating: 4.3,
    img: "/assets/generated/product-electronics.dim_400x300.jpg",
  },
];

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="gradient-hero px-4 pt-14 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/70 text-sm font-body">Namaste 👋</p>
            <h1 className="text-2xl font-display font-black text-white tracking-tight">
              SAB MILEGA
            </h1>
          </div>
          <button
            type="button"
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "oklch(100% 0 0 / 0.15)" }}
          >
            <Bell className="w-5 h-5 text-white" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "oklch(72% 0.20 55)" }}
            />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "oklch(55% 0.05 270)" }}
          />
          <Input
            data-ocid="home.search_input"
            placeholder="Aap kya dhundh rahe hain?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-white border-0 rounded-2xl font-body text-sm"
            style={{ boxShadow: "0 4px 20px oklch(20% 0.20 280 / 0.25)" }}
          />
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-6 pb-4">
        {/* Services Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-display font-bold text-foreground">
              Our Services
            </h2>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "oklch(28% 0.22 280)" }}
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {services.map((svc, i) => (
              <motion.button
                key={svc.id}
                data-ocid={`home.service.item.${i + 1}`}
                onClick={() => onNavigate(svc.id)}
                className={`${svc.color} rounded-2xl p-3 flex flex-col items-center gap-2 shadow-card active:scale-95 transition-transform`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <span className="text-2xl">{svc.icon}</span>
                <span className="text-white text-xs font-display font-semibold text-center leading-tight">
                  {svc.label}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured Properties */}
        <FeaturedSection
          title="Featured Properties"
          onViewAll={() => onNavigate("realestate")}
        >
          {featuredProperties.map((p) => (
            <PropertyCard
              key={p.title}
              {...p}
              onClick={() => onNavigate("realestate")}
            />
          ))}
        </FeaturedSection>

        {/* Admission Open */}
        <FeaturedSection
          title="Admission Open Colleges"
          onViewAll={() => onNavigate("education")}
        >
          {featuredColleges.map((c) => (
            <CollegeCard
              key={c.title}
              {...c}
              onClick={() => onNavigate("education")}
            />
          ))}
        </FeaturedSection>

        {/* Trending Products */}
        <FeaturedSection
          title="Trending Products"
          onViewAll={() => onNavigate("ecommerce")}
        >
          {trendingProducts.map((p) => (
            <ProductFeaturedCard
              key={p.title}
              {...p}
              onClick={() => onNavigate("ecommerce")}
            />
          ))}
        </FeaturedSection>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeaturedSection({
  title,
  children,
  onViewAll,
}: { title: string; children: React.ReactNode; onViewAll: () => void }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-display font-bold text-foreground">
          {title}
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-semibold"
          style={{ color: "oklch(28% 0.22 280)" }}
        >
          See All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
        {children}
      </div>
    </section>
  );
}

function PropertyCard({
  title,
  location,
  price,
  tag,
  img,
  onClick,
}: {
  title: string;
  location: string;
  price: string;
  tag: string;
  img: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 w-44 rounded-2xl overflow-hidden shadow-card bg-card text-left active:scale-95 transition-transform"
    >
      <div className="relative h-24 bg-muted">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <span
          className="absolute top-2 left-2 text-[10px] font-display font-bold text-white px-2 py-0.5 rounded-full"
          style={{ background: "oklch(72% 0.20 55)" }}
        >
          {tag}
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-xs font-display font-bold text-foreground leading-snug">
          {title}
        </p>
        <p className="flex items-center gap-0.5 text-[10px] text-muted-foreground mt-0.5">
          <MapPin className="w-2.5 h-2.5" /> {location}
        </p>
        <p
          className="text-sm font-display font-black mt-1"
          style={{ color: "oklch(28% 0.22 280)" }}
        >
          {price}
        </p>
      </div>
    </button>
  );
}

function CollegeCard({
  title,
  location,
  tag,
  img,
  onClick,
}: {
  title: string;
  location: string;
  tag: string;
  img: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 w-44 rounded-2xl overflow-hidden shadow-card bg-card text-left active:scale-95 transition-transform"
    >
      <div className="relative h-24 bg-muted">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 text-[10px] font-display font-bold text-white px-2 py-0.5 rounded-full bg-emerald-500">
          {tag}
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-xs font-display font-bold text-foreground">
          {title}
        </p>
        <p className="flex items-center gap-0.5 text-[10px] text-muted-foreground mt-0.5">
          <MapPin className="w-2.5 h-2.5" /> {location}
        </p>
      </div>
    </button>
  );
}

function ProductFeaturedCard({
  title,
  price,
  rating,
  img,
  onClick,
}: {
  title: string;
  price: string;
  rating: number;
  img: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 w-40 rounded-2xl overflow-hidden shadow-card bg-card text-left active:scale-95 transition-transform"
    >
      <div className="h-24 bg-muted">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-2.5">
        <p className="text-xs font-display font-bold text-foreground leading-snug">
          {title}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star
            className="w-2.5 h-2.5 fill-current"
            style={{ color: "oklch(72% 0.20 55)" }}
          />
          <span className="text-[10px] text-muted-foreground">{rating}</span>
        </div>
        <p
          className="text-sm font-display font-black mt-1"
          style={{ color: "oklch(28% 0.22 280)" }}
        >
          {price}
        </p>
      </div>
    </button>
  );
}
