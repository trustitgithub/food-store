import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ThankYou() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setOrder(parsedOrder);
      const total = parsedOrder.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);

      const userContact = JSON.parse(localStorage.getItem("userContact") || "{}");
      const orderId = `FH${Math.floor(Math.random() * 1000000)}`;
      const newOrder = {
        id: orderId,
        items: parsedOrder,
        totalPrice: total,
        date: new Date().toISOString(),
        userEmail: userContact.email,
        userPhone: userContact.phone,
      };

      const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      orderHistory.unshift(newOrder);
      localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
      localStorage.removeItem("order");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-64px)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative w-full max-w-2xl">
          <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 border border-border/50 animate-scale-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-primary to-secondary p-6 rounded-full">
                  <CheckCircle className="w-16 h-16 text-white animate-scale-in" />
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Thank You! 🎉
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Your delicious order has been placed successfully
              </p>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <p className="text-sm font-semibold text-primary">
                  Order confirmation sent to your email
                </p>
              </div>
            </div>

            {order.length > 0 && (
              <div className="bg-muted/50 rounded-2xl p-6 md:p-8 mb-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {order.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="price-tag">₹{item.price * item.quantity}</p>
                        <p className="text-xs text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-border pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      Grand Total
                    </span>
                    <div className="text-right">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        ₹{totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold text-foreground mb-1">
                  Delivery Time
                </h3>
                <p className="text-sm text-muted-foreground">30-45 minutes</p>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">📍</div>
                <h3 className="font-semibold text-foreground mb-1">
                  Tracking
                </h3>
                <p className="text-sm text-muted-foreground">Track your order</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold text-foreground mb-1">
                  Support
                </h3>
                <p className="text-sm text-muted-foreground">24/7 Available</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">✓</span>
                <p className="text-foreground">Fresh, authentic Indian cuisine prepared by expert chefs</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">✓</span>
                <p className="text-foreground">Hygienically packaged for your safety</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="text-xl">✓</span>
                <p className="text-foreground">Hot and fresh delivery guaranteed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/menu")}
                className="btn-secondary flex items-center justify-center gap-2 group"
              >
                <span>Order More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/")}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Have a referral code?
              </p>
              <p className="font-semibold text-foreground">
                Get ₹50 off on your next order with code <span className="text-primary">TASTY50</span>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Order ID: <span className="font-mono font-bold text-foreground">#FH{Math.floor(Math.random() * 100000)}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              A confirmation email has been sent to your email address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
