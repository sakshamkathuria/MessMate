import { UtensilsCrossed, Calendar, TrendingUp, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance/me");
        setAttendance(res.data.attendance);
      } catch (err) {
        toast.error("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="bg-[#faf7f2] px-6 py-24 pt-10 pb-16">
      <div className="max-w-[84rem] mx-auto space-y-10">

        {/* Greeting Banner */}
        <div className="bg-orange-400 text-white rounded-xl px-8 py-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Good Afternoon, {user?.name}! 👋
          </h1>
          <p className="mt-2 text-orange-100">
            Here's your meal overview for this month
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Meals */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Meals</p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <div className="bg-orange-100 text-orange-500 p-3 rounded-lg">
              <UtensilsCrossed size={22} />
            </div>
          </div>

          {/* Days Tracked */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Days Tracked</p>
              <p className="text-3xl font-bold mt-1">1</p>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <Calendar size={22} />
            </div>
          </div>

          {/* Avg Meals / Day */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Avg Meals / Day</p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <TrendingUp size={22} />
            </div>
          </div>

        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-2xl border p-6 mt-10">
          <h2 className="text-xl font-bold mb-4">
            Attendance History
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading attendance...</p>
          ) : attendance.length === 0 ? (
            <p className="text-gray-500">No attendance records yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b text-gray-500">
                  <tr>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-center">Breakfast</th>
                    <th className="pb-3 text-center">Lunch</th>
                    <th className="pb-3 text-center">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a) => (
                    <tr key={a._id} className="border-b last:border-none">
                      <td className="py-3">{a.date}</td>
                      <td className="py-3 text-center">
                        {a.breakfast ? "✅" : "❌"}
                      </td>
                      <td className="py-3 text-center">
                        {a.lunch ? "✅" : "❌"}
                      </td>
                      <td className="py-3 text-center">
                        {a.dinner ? "✅" : "❌"}
                      </td>
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

export default Dashboard;
