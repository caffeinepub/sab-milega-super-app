import { Grid3X3, Home, ShoppingCart, User } from "lucide-react";
import type { NavTab } from "../App";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const tabs: {
  id: NavTab;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: Grid3X3 },
  { id: "cart", label: "Shop", icon: ShoppingCart },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40"
      style={{
        background: "oklch(100% 0 0 / 0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid oklch(88% 0.03 270)",
        boxShadow: "0 -4px 24px oklch(25% 0.18 270 / 0.08)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-2 safe-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              data-ocid={`nav.${tab.id}.tab`}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 min-w-[60px]"
              style={{
                color: isActive ? "oklch(28% 0.22 280)" : "oklch(55% 0.05 270)",
                background: isActive
                  ? "oklch(28% 0.22 280 / 0.08)"
                  : "transparent",
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-display font-semibold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
