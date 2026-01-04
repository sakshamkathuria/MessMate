import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SignUpModal = () => {
  const { setShowSignUp, setShowSignIn, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
      );
      return;
    }

    try {
      await signup(name, email, password);
      // no-op
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#fdfaf5] w-full max-w-md rounded-2xl p-8 relative">
        
        {/* Close */}
        <button
          onClick={() => setShowSignUp(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-center mb-8">
          Create Account
        </h2>

        {/* Name */}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your Name"
            className="w-full mt-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            list="recent-emails"
            className="w-full mt-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
          Sign Up
        </button>
        </form>

        {/* Switch */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => {
              setShowSignUp(false);
              setShowSignIn(true);
            }}
            className="text-orange-500 font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
