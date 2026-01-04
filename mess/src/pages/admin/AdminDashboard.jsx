import {ShieldCheck,Users,UtensilsCrossed,TrendingUp,IndianRupee,UserCheck,ClipboardList,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecordPaymentModal from "../../components/admin/RecordPaymentModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState([]);
  const totalStudents = billing.length;
  const revenueThisMonth = billing.reduce((sum, s) => sum + (s.totalPaid || 0), 0);
  const totalPending = billing.reduce((sum, s) => sum + (s.pending || 0), 0);
  const paidStudents = billing.filter((s) => (s.pending || 0) <= 0).length;
  const attendanceRate = totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0;
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchBilling = async () => {
    const res = await api.get("/admin/billing-summary");
    setBilling(res.data.data);
  };

  useEffect(() => {
    fetchBilling();
  }, []);

  useEffect(() => {
    api.get("/admin/billing-summary").then((res) => {
      setBilling(res.data.data);
    });
  }, []);

  useEffect(() => {
    const fetchAttendanceSummary = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const res = await api.get("/attendance/summary", { params: { date: today } });
        setAttendanceSummary(res.data.summary);
      } catch (err) {
        console.error("Failed to fetch attendance summary", err);
        setAttendanceSummary(null);
      }
    };

    fetchAttendanceSummary();
  }, []);

  return (
    <div className="bg-[#faf7f2] py-24 px-6 pt-10 pb-16">
      <div className="max-w-[84rem] mx-auto space-y-10">

        {/* Hero Banner */}
        <div className="rounded-2xl px-10 py-10 bg-gradient-to-r from-green-700 to-green-400 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            Admin Dashboard
            <ShieldCheck className="w-7 h-7 text-blue-200" />
          </h1>
          <p className="mt-2 text-green-100">
            Manage your mess operations efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Students */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Students</p>
              <h2 className="text-3xl font-bold mt-1">{totalStudents}</h2>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Users className="text-orange-500" />
            </div>
          </div>

          {/* Meals Today */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Meals Today</p>
              <h2 className="text-3xl font-bold mt-1">{attendanceSummary ? attendanceSummary.totalPresent : "—"}</h2>
              
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <UtensilsCrossed className="text-green-600" />
            </div>
          </div>

          {/* Attendance Rate (approx. from billing paid status) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Attendance Rate</p>
              <h2 className="text-3xl font-bold mt-1">{attendanceRate}%</h2>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <TrendingUp className="text-yellow-600" />
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue Collected</p>
              <h2 className="text-3xl font-bold text-orange-500 mt-1">₹{revenueThisMonth}</h2>
              <p className="text-sm text-gray-500 mt-1">Pending: ₹{totalPending}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <IndianRupee className="text-orange-500" />
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Mark Attendance */}
            <button
              onClick={() => navigate("/admin/attendance")}
              className="flex items-center gap-5 p-6 rounded-xl border border-dashed border-gray-300 hover:bg-gray-50 transition"
            >
              <div className="p-4 rounded-lg bg-orange-100">
                <UserCheck className="text-orange-500" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  Mark Attendance
                </h3>
                <p className="text-gray-500 text-sm">
                  Record student meal attendance
                </p>
              </div>
            </button>

            {/* Update Menu */}
            <button
              onClick={() => navigate("/admin/menu")}
              className="flex items-center gap-5 p-6 rounded-xl border border-dashed border-gray-300 hover:bg-gray-50 transition"
            >
              <div className="p-4 rounded-lg bg-green-100">
                <ClipboardList className="text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">
                  Update Menu
                </h3>
                <p className="text-gray-500 text-sm">
                  Manage weekly meal menu
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Billing summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Summary</h2>
          {billing && billing.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th className="px-3 py-2">Student</th>
                    <th className="px-3 py-2">Total Due</th>
                    <th className="px-3 py-2">Total Paid</th>
                    <th className="px-3 py-2">Pending</th>
                    <th className="px-3 py-2">Last Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.map((s) => (
                    <tr key={s._id || s.name} className="border-t">
                      <td className="px-3 py-2">{s.name}</td>
                      <td className="px-3 py-2">₹{s.totalDue}</td>
                      <td className="px-3 py-2">₹{s.totalPaid}</td>
                      <td className="px-3 py-2 text-red-600">₹{s.pending}</td>
                      <td className="px-3 py-2">{s.lastPaidAt ? new Date(s.lastPaidAt).toLocaleDateString() : "—"}</td>
                      <td className="py-3">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="px-3 py-1 rounded-lg bg-orange-100 text-orange-600
                                    hover:bg-orange-200 text-sm"
                        >
                          Record Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No billing data available.</p>
          )}
        </div>
      </div>
      {selectedStudent && (
        <RecordPaymentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSuccess={fetchBilling}
        />
      )}

    </div>
  );
};

export default AdminDashboard;
