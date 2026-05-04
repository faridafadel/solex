import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatbotWidget from "./components/ChatbotWidget";
import HashScrollHandler from "./components/HashScrollHandler";
import Nav from "./components/Nav";
import { CartProvider } from "./context/CartContext.jsx";
import { ReviewsProvider } from "./context/ReviewsContext.jsx";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import FaqsPage from "./pages/FaqsPage";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import PaymentPolicyPage from "./pages/PaymentPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ReviewsProvider>
          <HashScrollHandler />
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productSlug" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/payment-policy" element={<PaymentPolicyPage />} />
          </Routes>
          <ChatbotWidget />
        </ReviewsProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
