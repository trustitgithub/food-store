import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Calendar, User, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  date: string;
  userEmail: string;
  userPhone: string;
}

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [userContact, setUserContact] = useState<any>(null);

  useEffect(() => {
    const contact = JSON.parse(localStorage.getItem("userContact") || "{}");
    setUserContact(contact);

    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    setOrders(orderHistory);
  }, []);

  if (!userContact?.email) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Please Login First
          </h1>
          <p className="text-muted-foreground mb-8">
            You need to login to view your order history
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </button>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Order History
            </h1>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>{userContact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>{userContact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Orders Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Start exploring our menu!
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>Browse Menu</span>
              →
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold">
                        ORDER ID
                      </p>
                      <p className="text-lg font-bold text-foreground font-mono">
                        {order.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        DATE
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground font-semibold">
                        TOTAL
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{order.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-3">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
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
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="bg-muted/20 px-6 py-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Delivered
                  </div>
                  <button
                    onClick={() => navigate("/menu")}
                    className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
                  >
                    Order Again →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
