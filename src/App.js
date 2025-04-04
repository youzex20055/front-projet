import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import Home from "./components/HOME";
import { Shirts } from "./components/Shirts";
import { Accessories } from "./components/Accessories";
import Search from "./pages/search/Search";
import Auth from "./pages/auth/Auth";
import PaymentForm from './pages/payment/PaymentForm';

function App() {
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/shirts" element={<Shirts />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/payment" element={<PaymentForm />} />

        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  );
}

export default App;