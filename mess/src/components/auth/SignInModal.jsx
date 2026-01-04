import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";
import toast from "react-hot-toast";


const SignInModal = () => {
  const { setShowSignIn, setShowSignUp, login } = useAuth();
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

    try {
      await login(email, password);
      // no-op

      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#fdfaf5] w-full max-w-md rounded-2xl p-8 relative">
        
        {/* Close */}
        <button
          onClick={() => setShowSignIn(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          Welcome Back
        </h2>

        <div className="flex items-center justify-center gap-2 px-8 py-1 rounded-2xl border border-orange-200 bg-orange-50 text-gray-500 text-lg font-medium transition mb-4">
          <User size={14} className="text-gray-400" />
          <span>Student</span>
        </div>

        {/* Email */}
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="text-sm font-medium">Email</label>
         <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mt-1 px-4 py-3 rounded-xl 
                    border border-gray-300
                    bg-[#faf7f2]
                    focus:outline-none focus:ring-2 focus:ring-orange-400
                    autofill:bg-[#faf7f2]
                    [&:-webkit-autofill]:bg-[#faf7f2]
                    [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#faf7f2]
                    [&:-webkit-autofill]:text-black"
        />
        
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
        </div>
        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="off"
            className="w-full mt-1 px-4 py-3 rounded-xl 
                      border border-gray-300
                      bg-[#faf7f2]
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                      autofill:bg-[#faf7f2]
                      [&:-webkit-autofill]:bg-[#faf7f2]
                      [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#faf7f2]
                      [&:-webkit-autofill]:text-black"
          />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
         </div>

        {/* Button */}
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold" >
          Sign In
        </button>
        </form>

        {/* Switch */}
        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => {
              setShowSignIn(false);
              setShowSignUp(true);
              
            }}
            className="text-orange-500 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
