import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import SplashScreen from "./components/SplashScreen";
import EcommerceScreen from "./pages/EcommerceScreen";
import EducationScreen from "./pages/EducationScreen";
import HomeScreen from "./pages/HomeScreen";
import InteriorDecorScreen from "./pages/InteriorDecorScreen";
import InvestmentScreen from "./pages/InvestmentScreen";
import ProfileScreen from "./pages/ProfileScreen";
import RealEstateScreen from "./pages/RealEstateScreen";
import WebDesignScreen from "./pages/WebDesignScreen";

export type Screen =
  | "home"
  | "realestate"
  | "education"
  | "webdesign"
  | "interiordecor"
  | "investment"
  | "ecommerce"
  | "profile";

export type NavTab = "home" | "services" | "cart" | "profile";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    if (screen === "home") setActiveTab("home");
    else if (screen === "ecommerce") setActiveTab("cart");
    else if (screen === "profile") setActiveTab("profile");
    else setActiveTab("services");
  };

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "home") setCurrentScreen("home");
    else if (tab === "cart") setCurrentScreen("ecommerce");
    else if (tab === "profile") setCurrentScreen("profile");
    else setCurrentScreen("home"); // services shows home with service grid
  };

  if (showSplash) return <SplashScreen />;

  const renderScreen = () => {
    switch (currentScreen) {
      case "realestate":
        return <RealEstateScreen onBack={() => navigate("home")} />;
      case "education":
        return <EducationScreen onBack={() => navigate("home")} />;
      case "webdesign":
        return <WebDesignScreen onBack={() => navigate("home")} />;
      case "interiordecor":
        return <InteriorDecorScreen onBack={() => navigate("home")} />;
      case "investment":
        return <InvestmentScreen onBack={() => navigate("home")} />;
      case "ecommerce":
        return <EcommerceScreen onBack={() => navigate("home")} />;
      case "profile":
        return <ProfileScreen onBack={() => navigate("home")} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  const showBottomNav = true;

  return (
    <div className="bg-muted min-h-dvh flex items-start justify-center">
      <div className="phone-frame bg-background flex flex-col w-full">
        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: showBottomNav ? "72px" : 0 }}
        >
          {renderScreen()}
        </main>
        {showBottomNav && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
