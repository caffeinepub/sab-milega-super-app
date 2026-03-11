import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  FileText,
  HeadphonesIcon,
  LogOut,
  ShoppingBag,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useMyOrders, useMyProfile } from "../hooks/useQueries";

interface Props {
  onBack: () => void;
}

export default function ProfileScreen({ onBack }: Props) {
  const [logoutModal, setLogoutModal] = useState(false);
  const { data: profile } = useMyProfile();
  const { data: orders } = useMyOrders();
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isLoggedIn = !!identity;
  const displayName = profile?.name || (isLoggedIn ? "User" : "Guest");
  const displayPhone = profile?.contact || "Not set";
  const walletBalance = profile?.walletBalance
    ? `₹${Number(profile.walletBalance).toLocaleString("en-IN")}`
    : "₹0";
  const orderCount = orders?.length || 0;

  const handleLogout = () => {
    clear();
    setLogoutModal(false);
    toast.success("Logged out successfully.");
  };

  const menuItems = [
    {
      icon: ShoppingBag,
      label: "My Orders",
      ocid: "profile.orders_button",
      badge: orderCount > 0 ? String(orderCount) : null,
      color: "oklch(45% 0.20 220)",
      bg: "oklch(45% 0.20 220 / 0.1)",
    },
    {
      icon: Building2,
      label: "My Property Listings",
      ocid: "profile.listings_button",
      badge: null,
      color: "oklch(50% 0.22 150)",
      bg: "oklch(50% 0.22 150 / 0.1)",
    },
    {
      icon: FileText,
      label: "My Applications",
      ocid: "profile.applications_button",
      badge: null,
      color: "oklch(45% 0.24 240)",
      bg: "oklch(45% 0.24 240 / 0.1)",
    },
    {
      icon: Wallet,
      label: "Wallet",
      ocid: "profile.wallet_button",
      badge: walletBalance,
      color: "oklch(72% 0.20 55)",
      bg: "oklch(72% 0.20 55 / 0.1)",
    },
    {
      icon: HeadphonesIcon,
      label: "Support",
      ocid: "profile.support_button",
      badge: null,
      color: "oklch(55% 0.18 30)",
      bg: "oklch(55% 0.18 30 / 0.1)",
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="gradient-hero px-4 pt-12 pb-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="text-sm font-body">Back</span>
        </button>

        {/* Profile card */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 ring-2 ring-white/40">
            <AvatarFallback
              className="text-xl font-display font-bold"
              style={{ background: "oklch(72% 0.20 55 / 0.3)", color: "white" }}
            >
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-display font-black text-white">
              {displayName}
            </h2>
            <p className="text-white/70 text-sm font-body">{displayPhone}</p>
            {isLoggedIn && (
              <span
                className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(72% 0.20 55 / 0.3)",
                  color: "oklch(88% 0.12 65)",
                }}
              >
                ● Verified
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-3">
        {!isLoggedIn && (
          <div
            className="bg-card rounded-2xl p-4 shadow-card border-2"
            style={{ borderColor: "oklch(72% 0.20 55 / 0.4)" }}
          >
            <p className="text-sm font-body text-muted-foreground mb-3">
              Login to access your orders, wallet, and more.
            </p>
            <Button
              onClick={() => login()}
              disabled={loginStatus === "logging-in"}
              className="w-full h-11 rounded-xl font-display font-bold"
              style={{ background: "oklch(28% 0.22 280)", color: "white" }}
            >
              {loginStatus === "logging-in"
                ? "Connecting..."
                : "Login with Internet Identity"}
            </Button>
          </div>
        )}

        {/* Menu items */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.ocid}
                data-ocid={item.ocid}
                className="w-full flex items-center gap-3 p-4 active:bg-muted transition-colors"
                style={{
                  borderBottom:
                    i < menuItems.length - 1
                      ? "1px solid oklch(88% 0.03 270)"
                      : "none",
                }}
                onClick={() => toast.info(`${item.label} — Coming soon!`)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="flex-1 text-sm font-display font-semibold text-foreground text-left">
                  {item.label}
                </span>
                {item.badge && (
                  <Badge
                    className="text-xs font-bold rounded-full"
                    style={{
                      background: "oklch(28% 0.22 280 / 0.1)",
                      color: "oklch(28% 0.22 280)",
                    }}
                  >
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* About */}
        <div className="bg-card rounded-2xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-display font-bold text-foreground">
                SAB MILEGA
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Version 1.0.0
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        {isLoggedIn && (
          <Button
            data-ocid="profile.logout_button"
            variant="outline"
            onClick={() => setLogoutModal(true)}
            className="w-full h-11 rounded-xl font-display font-semibold border-2"
            style={{
              borderColor: "oklch(55% 0.22 25 / 0.4)",
              color: "oklch(45% 0.22 25)",
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        )}
      </div>

      {/* Logout Confirmation */}
      <Dialog open={logoutModal} onOpenChange={setLogoutModal}>
        <DialogContent
          className="max-w-[320px] rounded-3xl mx-auto"
          data-ocid="profile.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="font-body text-sm">
              Are you sure you want to logout from SAB MILEGA?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-2">
            <Button
              data-ocid="profile.cancel_button"
              variant="outline"
              onClick={() => setLogoutModal(false)}
              className="flex-1 rounded-xl font-display font-semibold"
            >
              Cancel
            </Button>
            <Button
              data-ocid="profile.confirm_button"
              onClick={handleLogout}
              className="flex-1 rounded-xl font-display font-bold"
              style={{ background: "oklch(55% 0.22 25)", color: "white" }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
