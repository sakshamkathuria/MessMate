import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FloatingFood from "./FloatingFood";
import { UtensilsCrossed } from "lucide-react";

const HeroSection = ({ onTodaySpecial }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <FloatingFood />
      <div className="-translate-y-12 md:-translate-y-16 mt-12 md:mt-16 mx-auto max-w-3xl">
        <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-medium mb-6 inline-flex items-center gap-2">
        <UtensilsCrossed size={20} className="text-orange-500" />
        <span>Your Daily Mess Companion</span>
        </span>


        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Delicious Meals,
            <br />
            <span className="text-orange-500">Delivered</span>{" "}
            <span className="text-green-600">Daily</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
            Track your meals, manage attendance, and never miss a delicious bite.
            Your complete mess management solution.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
            <button
            onClick={() => (user?.role === "admin" ? navigate("/admin/menu") : navigate("/menu"))}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-base font-semibold shadow-md"
          >
            View Full Menu
          </button>

        <button
            onClick={onTodaySpecial}
            className="border border-gray-300 px-6 py-3 rounded-xl text-base font-semibold bg-white hover:bg-gray-50"
        >
            Today’s Specials
        </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
