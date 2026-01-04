import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MenuPreviewCard from "../menu/MenuPreviewCard";

const TodayMenuSection = forwardRef(({ todayMenu, day, loading, error }, ref) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSeeFull = () => {
    if (user?.role === "admin") navigate("/admin/menu");
    else navigate("/menu");
  };

  return (
    <section
      ref={ref}
      className="py-24 flex flex-col items-center justify-center px-6 bg-[#f9f6f1]"
    >
      {/* Title */}
      <span className="mb-3 bg-gray-100 px-4 py-1 rounded-full text-sm font-medium">
        {day ? `${day}’s Menu` : "Today's Menu"}
      </span>

      <h2 className="text-3xl font-bold mb-12">
        {loading ? "Loading today's menu..." : "Today’s Delicious Meals"}
      </h2>

      {error && (
        <p className="text-red-600 mb-4">Failed to load menu.</p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        <MenuPreviewCard
          title="Breakfast"
          icon="☕"
          headerBg="bg-yellow-100"
          headerTextColor="text-gray-800"
        >
          {todayMenu?.breakfast?.length > 0 ? (
            todayMenu.breakfast.map((item) => (
              <p key={item} className="text-gray-700">
                {item}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No items added yet</p>
          )}
        </MenuPreviewCard>

        <MenuPreviewCard
          title="Lunch"
          icon="☀️"
          headerBg="bg-orange-100"
          headerTextColor="text-orange-600"
        >
          {todayMenu?.lunch?.length > 0 ? (
            todayMenu.lunch.map((item) => (
              <p key={item} className="text-gray-700">
                {item}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No items added yet</p>
          )}
        </MenuPreviewCard>

        <MenuPreviewCard
          title="Dinner"
          icon="🌙"
          headerBg="bg-green-100"
          headerTextColor="text-green-600"
        >
          {todayMenu?.dinner?.length > 0 ? (
            todayMenu.dinner.map((item) => (
              <p key={item} className="text-gray-700">
                {item}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No items added yet</p>
          )}
        </MenuPreviewCard>

      </div>

      {/* CTA */}
      <button
        onClick={handleSeeFull}
        className="mt-12 border border-gray-300 px-8 py-3 rounded-xl bg-white hover:bg-gray-50 font-semibold"
      >
        See Full Week Menu
      </button>
    </section>
  );
});

export default TodayMenuSection;
