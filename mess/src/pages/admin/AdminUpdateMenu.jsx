import { useState } from "react";
import { Coffee, Sun, Moon, Plus, Trash2 } from "lucide-react";
import MenuPreviewCard from "../../components/menu/MenuPreviewCard";
import api from "../../api/axios";
import toast from "react-hot-toast";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AdminUpdateMenu = () => {
  const [activeDay, setActiveDay] = useState("Sunday");

  const [menu, setMenu] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const [input, setInput] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  const saveMenu = async () => {
    try {
      await api.post("/menu", {
        day: activeDay,
        breakfast: menu.breakfast,
        lunch: menu.lunch,
        dinner: menu.dinner,
      });

      toast.success("Menu updated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update menu"
      );
    }
  };

  const addItem = (meal) => {
    if (!input[meal].trim()) return;
    setMenu((prev) => ({
      ...prev,
      [meal]: [...prev[meal], input[meal]],
    }));
    setInput((prev) => ({ ...prev, [meal]: "" }));
  };

  const removeItem = (meal, index) => {
    setMenu((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== index),
    }));
  };


  return (
    <div className="bg-[#faf7f2] px-6 pt-10 pb-16">
      <div className="max-w-[84rem] mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Update Menu</h1>
          <p className="text-gray-600 mt-1">
            Manage the weekly meal menu
          </p>
        </div>

        {/* Day Selector */}
        <div className="bg-[#f7f3ed] max-w-3xl mx-auto rounded-full px-4 py-3 flex gap-2 justify-center">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  activeDay === day
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Breakfast */}
          <MenuPreviewCard
            title="Breakfast"
            icon={<Coffee size={18} />}
            headerBg="bg-yellow-100"
            headerTextColor="text-gray-800"
          >
            <MealContent
              items={menu.breakfast}
              value={input.breakfast}
              onChange={(v) =>
                setInput({ ...input, breakfast: v })
              }
              onAdd={() => addItem("breakfast")}
              onDelete={(i) => removeItem("breakfast", i)}
            />
          </MenuPreviewCard>

          {/* Lunch */}
          <MenuPreviewCard
            title="Lunch"
            icon={<Sun size={18} />}
            headerBg="bg-orange-100"
            headerTextColor="text-orange-600"
          >
            <MealContent
              items={menu.lunch}
              value={input.lunch}
              onChange={(v) =>
                setInput({ ...input, lunch: v })
              }
              onAdd={() => addItem("lunch")}
              onDelete={(i) => removeItem("lunch", i)}
            />
          </MenuPreviewCard>

          {/* Dinner */}
          <MenuPreviewCard
            title="Dinner"
            icon={<Moon size={18} />}
            headerBg="bg-green-100"
            headerTextColor="text-green-600"
          >
            <MealContent
              items={menu.dinner}
              value={input.dinner}
              onChange={(v) =>
                setInput({ ...input, dinner: v })
              }
              onAdd={() => addItem("dinner")}
              onDelete={(i) => removeItem("dinner", i)}
            />
          </MenuPreviewCard>

        </div>
        <button
          onClick={saveMenu}
          className="px-6 py-3 rounded-xl bg-orange-500 text-white font-medium justify-center flex mx-auto"
        >
          Save Menu
        </button>
      </div>
    </div>
  );
};

export default AdminUpdateMenu;

/* ---------- Reusable Inner Content ---------- */

const MealContent = ({
  items,
  value,
  onChange,
  onAdd,
  onDelete,
}) => {
  return (
    <div className="space-y-4">

      {/* Items */}
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm text-center ">
          No items yet
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-gray-300"
            >
              <span>{item}</span>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Item */}
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 outline-none"
        />
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};
