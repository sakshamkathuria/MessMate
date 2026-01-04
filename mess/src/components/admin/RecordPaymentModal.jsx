import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const RecordPaymentModal = ({ student, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      await api.post("/payments/record", {
        studentId: student.studentId,
        amount: Number(amount),
      });

      toast.success("Payment recorded");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          Record Payment
        </h2>

        <p className="text-gray-600 mb-2">
          Student: <span className="font-medium">{student.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-orange-500 text-white
                         disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
