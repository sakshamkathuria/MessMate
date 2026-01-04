import {UtensilsCrossed,Coffee,Soup,Utensils,IndianRupee,Receipt,Wallet,LogOut,} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";


const Billing = () => {
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  // previous months pending (exclude this month's due)
  const prevPending = Math.max(
    (billing?.pendingAll ?? 0) - (billing?.summary?.total ?? 0),
    0
  );

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const fetchBilling = async () => {
      try {
        const res = await api.get("/billing/me", {
          params: { month, year },
        });
        setBilling(res.data);
      } catch (err) {
        toast.error("Failed to load billing data");
      } finally {
        setLoading(false);
      }
    };

    fetchBilling();
  }, []);

  return (
    <div className="bg-[#faf7f2]">
      {/* Page Content */}
      <div className="max-w-[86rem] mx-auto px-6 py-7">
        {loading && (
          <p className="text-center text-gray-500">
            Loading billing details...
          </p>
        )}

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-1">
          Your meal expenses for {new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          
          {/* Breakfast */}
          <div className="p-6 rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white flex items-center justify-between">
            <div>
              <p className="text-gray-600">Breakfast</p>
              <h2 className="text-2xl font-bold mt-1">
                {billing?.summary?.breakfast?.count || 0} meals
              </h2>
              <p className="text-gray-500">
                ₹{billing?.summary?.breakfast?.amount || 0}
              </p>
            </div>
            <Coffee size={28} className="text-yellow-500" />
          </div>

          {/* Lunch */}
          <div className="p-6 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white flex items-center justify-between">
            <div>
              <p className="text-gray-600">Lunch</p>
              <h2 className="text-2xl font-bold mt-1">
                {billing?.summary?.lunch?.count || 0} meals
              </h2>
              <p className="text-gray-500">
                ₹{billing?.summary?.lunch?.amount || 0}
              </p>
            </div>
            <Soup size={28} className="text-orange-500" />
          </div>

          {/* Dinner */}
          <div className="p-6 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white flex items-center justify-between">
            <div>
              <p className="text-gray-600">Dinner</p>
              <h2 className="text-2xl font-bold mt-1">
                {billing?.summary?.dinner?.count || 0} meals
              </h2>
              <p className="text-gray-500">
                ₹{billing?.summary?.dinner?.amount || 0}
              </p>
            </div>
            <Utensils size={28} className="text-green-500" />
          </div>

          {/* Total Due */}
          <div className="p-6 rounded-2xl border border-gray-300 bg-[#faf9f8] flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Due</p>
              <h2 className="text-3xl font-bold text-orange-500 mt-1">
                ₹{billing?.summary?.total || 0}
              </h2>
            </div>
            <IndianRupee size={28} className="text-orange-500" />
          </div>
        </div>

        {/* Meal Prices */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 ">
            <Wallet size={18} />
            <div className="-mt-1 block">Meal Prices</div>
          </h2>
          <div className="flex flex-wrap gap-4 font-bold">
            <span className="px-4 py-2 rounded-full bg-gray-100">
              Breakfast: ₹{billing?.prices?.breakfast ?? 0}
            </span>
            <span className="px-4 py-2 rounded-full bg-gray-100">
              Lunch: ₹{billing?.prices?.lunch ?? 0}
            </span>
            <span className="px-4 py-2 rounded-full bg-gray-100">
              Dinner: ₹{billing?.prices?.dinner ?? 0}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-300">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Receipt size={18} />
            <div className="-mt block">Detailed Breakdown</div>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Breakfast (₹30)</th>
                  <th className="pb-3">Lunch (₹50)</th>
                  <th className="pb-3">Dinner (₹50)</th>
                  <th className="pb-3 text-right">Day Total</th>
                </tr>
              </thead>
              <tbody>
                {billing?.breakdown?.map((row) => (
                  <tr key={row.date} className="border-b last:border-none">
                    <td className="py-4">{row.date}</td>
                    <td className="py-4">
                      {row.breakfast ? `₹${row.breakfast}` : "-"}
                    </td>
                    <td className="py-4">
                      {row.lunch ? `₹${row.lunch}` : "-"}
                    </td>
                    <td className="py-4">
                      {row.dinner ? `₹${row.dinner}` : "-"}
                    </td>
                    <td className="py-4 text-right font-semibold">
                      ₹{row.dayTotal || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-300">
          <h3 className="text-lg font-semibold mb-3">Outstanding Balance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Previous Months Pending</p>
              <div className="text-2xl font-bold text-red-600">₹{prevPending}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">All-time Pending</p>
              <div className="text-2xl font-bold text-orange-500">₹{billing?.pendingAll ?? 0}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>
              <div className="text-2xl font-bold">₹{billing?.totalPaidAll ?? 0}</div>
            </div>
          </div>

          {billing?.payments && billing.payments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Payment History</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billing.payments.map((p) => (
                      <tr key={p._id} className="border-b">
                        <td className="py-2">{new Date(p.paidAt).toLocaleDateString()}</td>
                        <td className="py-2">₹{p.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <button
          className="px-6 py-3 rounded-xl bg-orange-500 text-white font-medium justify-center flex mx-auto mt-6"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Billing;
