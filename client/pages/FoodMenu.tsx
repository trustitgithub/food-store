import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const foodItems: FoodItem[] = [
  { id: 1, name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken", price: 280, image: "https://images.pexels.com/photos/16068669/pexels-photo-16068669.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 2, name: "Paneer Tikka", description: "Grilled paneer cubes with spices", price: 220, image: "https://images.pexels.com/photos/34541595/pexels-photo-34541595.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 3, name: "Biryani", description: "Fragrant rice with meat and spices", price: 320, image: "https://images.pexels.com/photos/4910316/pexels-photo-4910316.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 4, name: "Samosa", description: "Crispy triangular pastry with spiced filling", price: 60, image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 5, name: "Tandoori Chicken", description: "Marinated chicken cooked in tandoor", price: 300, image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 6, name: "Palak Paneer", description: "Spinach curry with soft paneer", price: 240, image: "https://images.pexels.com/photos/8625813/pexels-photo-8625813.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 7, name: "Chole Bhature", description: "Fried bread with chickpea curry", price: 140, image: "https://images.pexels.com/photos/6275095/pexels-photo-6275095.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 8, name: "Masala Dosa", description: "Crispy crepe with spiced potato filling", price: 100, image: "https://images.pexels.com/photos/14831547/pexels-photo-14831547.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 9, name: "Chicken Tikka Masala", description: "Tender chicken in creamy tomato sauce", price: 290, image: "https://images.pexels.com/photos/11682503/pexels-photo-11682503.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 10, name: "Aloo Gobi", description: "Potato and cauliflower stir fry", price: 120, image: "https://images.pexels.com/photos/33643313/pexels-photo-33643313.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 11, name: "Rogan Josh", description: "Aromatic meat curry with yogurt", price: 310, image: "https://images.pexels.com/photos/34616638/pexels-photo-34616638.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 12, name: "Chana Masala", description: "Spiced chickpea curry", price: 130, image: "https://images.pexels.com/photos/29066704/pexels-photo-29066704.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 13, name: "Seekh Kebab", description: "Minced meat on skewers", price: 250, image: "https://images.pexels.com/photos/34557890/pexels-photo-34557890.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 14, name: "Raita", description: "Yogurt with cucumber and spices", price: 50, image: "https://images.pexels.com/photos/8625813/pexels-photo-8625813.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 15, name: "Naan Bread", description: "Soft oven-baked bread", price: 40, image: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 16, name: "Garlic Naan", description: "Naan with garlic and butter", price: 60, image: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 17, name: "Dal Makhani", description: "Creamy lentil curry", price: 180, image: "https://images.pexels.com/photos/28674561/pexels-photo-28674561.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 18, name: "Shrimp Curry", description: "Tender shrimp in spiced sauce", price: 350, image: "https://images.pexels.com/photos/16068669/pexels-photo-16068669.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 19, name: "Vegetable Korma", description: "Mixed vegetables in creamy sauce", price: 200, image: "https://images.pexels.com/photos/29066704/pexels-photo-29066704.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 20, name: "Fish Fry", description: "Crispy fried fish with spices", price: 320, image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 21, name: "Idli", description: "Steamed rice and lentil cakes", price: 50, image: "https://images.pexels.com/photos/14831547/pexels-photo-14831547.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 22, name: "Sambar", description: "Spiced lentil and vegetable stew", price: 70, image: "https://images.pexels.com/photos/28674561/pexels-photo-28674561.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 23, name: "Coconut Curry", description: "Coconut-based creamy curry", price: 250, image: "https://images.pexels.com/photos/8625813/pexels-photo-8625813.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 24, name: "Lamb Vindaloo", description: "Hot and spicy lamb curry", price: 340, image: "https://images.pexels.com/photos/34616638/pexels-photo-34616638.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 25, name: "Mint Chutney", description: "Fresh mint and coriander paste", price: 30, image: "https://images.pexels.com/photos/29066704/pexels-photo-29066704.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 26, name: "Pakora", description: "Vegetable fritters in batter", price: 80, image: "https://images.pexels.com/photos/34557890/pexels-photo-34557890.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 27, name: "Kebab Roll", description: "Kebab wrapped in flatbread", price: 150, image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 28, name: "Khichdi", description: "Rice and lentil comfort food", price: 100, image: "https://images.pexels.com/photos/4910316/pexels-photo-4910316.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 29, name: "Nihari", description: "Slow-cooked meat stew", price: 300, image: "https://images.pexels.com/photos/34616638/pexels-photo-34616638.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 30, name: "Falafel", description: "Fried chickpea fritters", price: 120, image: "https://images.pexels.com/photos/34557890/pexels-photo-34557890.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 31, name: "Phaal Curry", description: "Extremely hot spiced curry", price: 280, image: "https://images.pexels.com/photos/11682503/pexels-photo-11682503.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 32, name: "Mutton Curry", description: "Tender mutton in spiced gravy", price: 350, image: "https://images.pexels.com/photos/34616638/pexels-photo-34616638.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 33, name: "Pulao", description: "Fragrant rice with vegetables", price: 180, image: "https://images.pexels.com/photos/4910316/pexels-photo-4910316.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 34, name: "Tandoori Shrimp", description: "Spiced grilled shrimp", price: 380, image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 35, name: "Pani Puri", description: "Crispy shells with spiced water", price: 70, image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 36, name: "Bhel Puri", description: "Mix of puffed rice and veggies", price: 60, image: "https://images.pexels.com/photos/29066704/pexels-photo-29066704.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 37, name: "Chicken Shami Kabab", description: "Minced chicken kebabs", price: 220, image: "https://images.pexels.com/photos/34557890/pexels-photo-34557890.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 38, name: "Chikhalwali Naan", description: "Stuffed naan with meat", price: 100, image: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 39, name: "Methi Paratha", description: "Flatbread with fenugreek leaves", price: 70, image: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 40, name: "Baingan Bharta", description: "Roasted eggplant curry", price: 140, image: "https://images.pexels.com/photos/8625813/pexels-photo-8625813.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 41, name: "Hakka Noodles", description: "Indo-Chinese stir-fried noodles", price: 140, image: "https://images.pexels.com/photos/16068669/pexels-photo-16068669.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 42, name: "Chicken Hakka Noodles", description: "Noodles with chicken", price: 200, image: "https://images.pexels.com/photos/16068669/pexels-photo-16068669.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 43, name: "Momos", description: "Steamed dumplings with filling", price: 100, image: "https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 44, name: "Chicken Momos", description: "Dumplings with chicken filling", price: 150, image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 45, name: "Spring Rolls", description: "Fried rolls with vegetable filling", price: 90, image: "https://images.pexels.com/photos/34557890/pexels-photo-34557890.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 46, name: "Chicken Spring Rolls", description: "Rolls with chicken and vegetables", price: 140, image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 47, name: "Goat Cheese Curry", description: "Paneer in tomato sauce", price: 260, image: "https://images.pexels.com/photos/34541595/pexels-photo-34541595.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 48, name: "Keema Pav", description: "Spiced minced meat with bread", price: 180, image: "https://images.pexels.com/photos/34616638/pexels-photo-34616638.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
  { id: 49, name: "Mushroom Matar", description: "Mushroom and pea curry", price: 180, image: "https://images.pexels.com/photos/8625813/pexels-photo-8625813.jpeg?w=400&h=400&fit=crop", category: "Veg" },
  { id: 50, name: "Prawn Biryani", description: "Biryani with fresh prawns", price: 400, image: "https://images.pexels.com/photos/4910316/pexels-photo-4910316.jpeg?w=400&h=400&fit=crop", category: "Non-Veg" },
];

interface CartItem extends FoodItem {
  quantity: number;
}

export default function FoodMenu() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: FoodItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity }
            : cartItem
        )
      );
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Please add items to your cart");
      return;
    }
    localStorage.setItem("order", JSON.stringify(cart));
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cart Button (Sticky) */}
      <div className="sticky top-16 right-4 z-40 flex justify-end p-4">
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative btn-primary flex items-center gap-2 md:hidden"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Search
                </h3>
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input w-full"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === null
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setSelectedCategory("Veg")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === "Veg"
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    🥗 Vegetarian
                  </button>
                  <button
                    onClick={() => setSelectedCategory("Non-Veg")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === "Non-Veg"
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    🍗 Non-Vegetarian
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong>{filteredItems.length}</strong> delicious items available
                </p>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Our Menu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="food-card"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="food-card-image"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop";
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="food-badge">
                        {item.category === "Veg" ? "🥗" : "🍗"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="price-tag">₹{item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-secondary text-secondary-foreground p-2 rounded-lg hover:bg-secondary/90 transition-all transform hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          ></div>
          <CartPanel
            cart={cart}
            totalPrice={totalPrice}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onCheckout={handleCheckout}
            onClose={() => setShowCart(false)}
          />
        </div>
      )}

      {/* Cart Panel (Desktop) */}
      <div className="hidden lg:block fixed right-0 top-0 h-screen w-96 bg-card border-l border-border shadow-xl z-30 overflow-y-auto">
        <CartPanel
          cart={cart}
          totalPrice={totalPrice}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      </div>
    </div>
  );
}

function CartPanel({
  cart,
  totalPrice,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  onClose,
}: {
  cart: CartItem[];
  totalPrice: number;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}) {
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-muted rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-5xl mb-4">🛒</span>
          <p className="text-muted-foreground">Your cart is empty</p>
          <p className="text-sm text-muted-foreground mt-2">
            Add delicious dishes to get started
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ₹{item.price} each
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-background rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-6 space-y-4 bg-muted/30">
            <div className="flex items-center justify-between text-lg font-bold text-foreground">
              <span>Total:</span>
              <span className="price-tag">₹{totalPrice}</span>
            </div>
            <button
              onClick={onCheckout}
              className="btn-primary w-full"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
