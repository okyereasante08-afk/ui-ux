import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import Executives from "./pages/Executives";
import Staff from "./pages/Staff";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Marketplace from "./pages/Marketplace";
import Scholarships from "./pages/Scholarships";
import Courses from "./pages/Courses";
import Shop from "./pages/Shop";
import ClubDetail from "./pages/ClubDetail";
import EventDetail from "./pages/EventDetail";
import { TraceProvider } from "./components/TraceConnector";
import BottomNav from "./components/layout/BottomNav";
import { PWAProvider } from "./hooks/usePWA";
import { ThemeProvider } from "./hooks/useTheme";
import { MoreMenuProvider } from "./hooks/useMoreMenu";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";

function App() {
  return (
    <ThemeProvider>
      <PWAProvider>
        <TraceProvider>
          <MoreMenuProvider>
            <div className="relative min-h-screen bg-background">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/executives" element={<Executives />} />
                  <Route path="/department" element={<Staff />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/scholarships" element={<Scholarships />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/clubs/:slug" element={<ClubDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                  <Route path="/events/:slug" element={<EventDetail />} />
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