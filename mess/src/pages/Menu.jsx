import { useEffect, useState } from "react";
import MenuPreviewCard from "../components/menu/MenuPreviewCard";
import { Coffee, Sun, Moon } from "lucide-react";
import api from "../api/axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Menu = () => {
  const [activeDay, setActiveDay] = useState("Monday");
  const [menu, setMenu] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const todayName = new Date().toLocaleString("en-US", { weekday: "long" });
  

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/menu", { params: { day: activeDay } });
        setMenu(res.data.menu || { breakfast: [], lunch: [], dinner: [] });
      } catch (err) {
        console.error("Failed to fetch menu", err);
        setError(err);
        setMenu({ breakfast: [], lunch: [], dinner: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [activeDay]);

  return (
    <div className="bg-[#faf7f2] px-6 py-15">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Weekly Menu
        </h1>
        <p className="text-gray-600 mt-2">
          Explore our delicious meals for the week
        </p>
      </div>

      {/* Day Selector */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-[#f7f3ed] px-3 py-3 rounded-3xl shadow-sm">
            
            <div className="flex gap-3 overflow-x-auto scrollbar-hide md:justify-center">
              {days.map((day) => {
                const isActive = activeDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "text-gray-600 hover:text-orange-500"
                      }`}
                  >
                    {day}

                    {day === todayName && (
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                          ${
                            isActive
                              ? "bg-white text-orange-500"
                              : "bg-orange-100 text-orange-500"
                          }`}
                      >
                        Today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      {/* Meal Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <MenuPreviewCard
          title="Breakfast"
          icon={<Coffee size={18} />}
          time="7:30 AM – 9:30 AM"
          headerBg="bg-yellow-100"
          headerTextColor="text-gray-800"
        >
          {loading ? (
            <p>Loading...</p>
          ) : menu?.breakfast?.length > 0 ? (
            menu.breakfast.map((item) => <p key={item}>{item}</p>)
          ) : (
            <p className="text-gray-500">No items added yet</p>
          )}
        </MenuPreviewCard>

        <MenuPreviewCard
          title="Lunch"
          icon={<Sun size={18} />}
          time="12:30 PM – 2:30 PM"
          headerBg="bg-orange-100"
          headerTextColor="text-orange-600"
        >
          {loading ? (
            <p>Loading...</p>
          ) : menu?.lunch?.length > 0 ? (
            menu.lunch.map((item) => <p key={item}>{item}</p>)
          ) : (
            <p className="text-gray-500">No items added yet</p>
          )}
        </MenuPreviewCard>

        <MenuPreviewCard
          title="Dinner"
          icon={<Moon size={18} />}
          time="7:30 PM – 9:30 PM"
          headerBg="bg-green-100"
          headerTextColor="text-green-600"
        >
          {loading ? (
            <p>Loading...</p>
          ) : menu?.dinner?.length > 0 ? (
            menu.dinner.map((item) => <p key={item}>{item}</p>)
          ) : (
            <p className="text-gray-500">No items added yet</p>
          )}
        </MenuPreviewCard>

      </div>
    </div>
  );
};

export default Menu;
