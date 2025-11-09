import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

interface ContactFormData {
  email: string;
  phone: string;
}

export default function ContactForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    localStorage.setItem("userContact", JSON.stringify(data));
    setSubmitted(true);
    setTimeout(() => {
      navigate("/menu");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        {/* Card */}
        <div className="relative bg-card rounded-2xl shadow-2xl p-8 md:p-10 border border-border/50">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-block p-3 bg-primary/20 rounded-full mb-4 animate-scale-in">
              <span className="text-4xl">🍽️</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              FoodHub
            </h1>
            <p className="text-muted-foreground">
              Welcome to the best Indian food experience
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 animate-scale-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-xl font-semibold text-foreground mb-2">
                Welcome!
              </p>
              <p className="text-muted-foreground">
                Redirecting you to our menu...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-primary pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="form-input pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-primary pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="form-input pl-10"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9\s+\-()]{10,}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full mt-8 flex items-center justify-center gap-2 group"
              >
                <span>Continue to Menu</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl mb-2">🍛</div>
                  <p className="text-xs text-muted-foreground">50+ Dishes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="text-xs text-muted-foreground">Best Quality</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <p className="text-xs text-muted-foreground">Fast Delivery</p>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer text */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Your contact details are secure and private
        </p>
      </div>
    </div>
  );
}
