import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Executives from "./pages/Executives";
import Staff from "./pages/Staff";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import Scholarships from "./pages/Scholarships";
import Courses from "./pages/Courses";
import Shop from "./pages/Shop";
import Journeys from "./pages/Journeys";
import { TraceProvider } from "./components/TraceConnector";
import BottomNav from "./components/layout/BottomNav";
import { PWAProvider } from "./hooks/usePWA";
import { ThemeProvider } from "./hooks/useTheme";
import { MoreMenuProvider } from "./hooks/useMoreMenu";
import AppSplash from "./components/AppSplash";
import { seedDemoVendor } from "./lib/auth";

function App() {
  // Seeds a demo vendor account (demo@aces.com / demo1234) into
  // localStorage on first load, so /vendor-dashboard is explorable
  // immediately without anyone needing to register first — this is a
  // mock-auth demo aid, not something a production build should ship
  // with real user data.
  useEffect(() => {
    seedDemoVendor();
  }, []);

  return (
    <ThemeProvider>
      <PWAProvider>
        <TraceProvider>
          <MoreMenuProvider>
            <AppSplash />
            <div className="relative min-h-screen bg-circuit-navy">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/executives" element={<Executives />} />
                  <Route path="/department" element={<Staff />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                  <Route path="/scholarships" element={<Scholarships />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/journeys" element={<Journeys />} />
                </Routes>
              </AnimatePresence>
              <BottomNav />
            </div>
          </MoreMenuProvider>
        </TraceProvider>
      </PWAProvider>
    </ThemeProvider>
  );
}

export default App;
