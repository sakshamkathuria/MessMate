import { useState,useEffect, useRef } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

import {
  Calendar,
  CheckSquare,
  XSquare,
  ChevronDown,
  Save,
} from "lucide-react";

const meals = ["all", "breakfast", "lunch", "dinner"];

const AdminAttendance = () => {
  const [date, setDate] = useState("2025-12-29");
  const [mealType, setMealType] = useState("all");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);



  const [attendance, setAttendance] = useState(
    students.reduce((acc, s) => {
      acc[s.id] = { breakfast: false, lunch: false, dinner: false };
      return acc;
    }, {})
  );

  const visibleMeals =
    mealType === "all" ? ["breakfast", "lunch", "dinner"] : [mealType];

  const toggle = (studentId, meal) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [meal]: !prev[studentId][meal],
      },
    }));
  };

  const saveAttendance = async () => {
    try {
      const records = students.map((s) => ({
        studentId: s._id,
        breakfast: attendance[s._id]?.breakfast || false,
        lunch: attendance[s._id]?.lunch || false,
        dinner: attendance[s._id]?.dinner || false,
      }));

      await api.post("/attendance", {
        date,
        records,
      });

      toast.success("Attendance saved successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save attendance"
      );
    }
  };

  const markAll = () => {
    setAttendance((prev) => {
      const updated = { ...prev };
      students.forEach((s) => {
        visibleMeals.forEach((m) => (updated[s.id][m] = true));
      });
      return updated;
    });
  };

  const clearAll = () => {
    setAttendance((prev) => {
      const updated = { ...prev };
      students.forEach((s) => {
        visibleMeals.forEach((m) => (updated[s.id][m] = false));
      });
      return updated;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/attendance/students");
        setStudents(res.data.students);

        // initialize attendance state
        const initial = {};
        res.data.students.forEach((s) => {
          initial[s._id] = {
            breakfast: false,
            lunch: false,
            dinner: false,
          };
        });
        setAttendance(initial);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load students");
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);


  return (
    <div className="bg-[#faf7f2] py-24 px-6 pt-10 pb-16">
      <div className="max-w-[84rem] mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Mark Attendance</h1>
          <p className="text-gray-600 mt-1">
            Record meal attendance for students
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-wrap justify-between gap-6">
          <div className="flex flex-wrap gap-6 items-end">

            {/* Date */}
            <div>
              <label className="text-sm font-medium">Date</label>

              <div
                className="flex items-center gap-2 
                          bg-[#faf7f2] px-4 py-2 rounded-xl 
                          border border-gray-300 mt-1
                          focus-within:ring-2 focus-within:ring-orange-400"
              >
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent outline-none w-full text-gray-700"
                />
              </div>
            </div>

            {/* Meal Type Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="text-sm font-medium">Meal Type</label>

              {/* Trigger */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-44 
                          bg-[#faf7f2] px-4 py-2 rounded-xl 
                          border border-gray-300 mt-1"
              >
                <span className="capitalize">
                  {mealType === "all" ? "All Meals" : mealType}
                </span>
                <ChevronDown size={16} />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute z-20 mt-2 w-full 
                                bg-[#faf7f2] rounded-xl 
                                shadow-lg border border-gray-200 
                                p-2 space-y-1">
                  {meals.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMealType(m);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg 
                                  capitalize flex items-center gap-2 transition
                        ${
                          mealType === m
                            ? "hover:bg-green-600"
                            : "px-8 hover:bg-green-600"
                        }`}
                    >
                      {mealType === m && <span>✓</span>}
                      {m === "all" ? "All Meals" : m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <button
              onClick={markAll}
              className="px-4 py-2 rounded-xl 
             bg-[#faf7f2] border border-gray-300
             hover:bg-green-600 hover:text-white
             transition flex items-center gap-2"
            >
              <CheckSquare size={16} />
              Mark All Present
            </button>

            <button
              onClick={clearAll}
              className="px-4 py-2 rounded-xl 
             bg-[#faf7f2] border border-gray-300
             hover:bg-red-500 hover:text-white
             transition flex items-center gap-2"
            >
              <XSquare size={16} />
              Clear All
            </button>
          </div>

          <button onClick={saveAttendance} className="px-6 py-1 rounded-xl bg-orange-500 text-white font-medium flex items-center gap-2 h-10 mt-6">
            <Save size={16} />
            Save Attendance
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border p-6">
        <h2 className="text-xl font-bold mb-6">
          Students ({students.length})
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 py-8">
            Loading students...
          </p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No students found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="pb-3 text-left">Name</th>
                  <th className="pb-3 text-left">Email</th>
                  {visibleMeals.map((m) => (
                    <th key={m} className="pb-3 text-center capitalize">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="border-b last:border-none">
                    <td className="py-4 font-medium">{s.name}</td>
                    <td className="py-4 text-gray-600">{s.email}</td>

                    {visibleMeals.map((m) => (
                      <td key={m} className="py-4 text-center">
                        <button
                          onClick={() => toggle(s._id, m)}
                          className={`w-5 h-5 rounded-full border-2
                            ${
                              attendance[s._id]?.[m]
                                ? "bg-orange-500 border-orange-500"
                                : "border-orange-400"
                            }`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      </div>
    </div>
  );
};

export default AdminAttendance;
