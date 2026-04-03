import React, { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

interface LoginProps {
  color: any;
}

const Login: React.FC<LoginProps> = ({ color }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdminUser = (userEmail: string | null): boolean => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    if (!adminEmail) return true; // No restriction set
    return adminEmail
      .split(",")
      .map((e: string) => e.trim())
      .includes(userEmail ?? "");
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!isAdminUser(result.user.email)) {
        await auth.signOut();
        setError("Access denied. This account is not authorized as admin.");
      }
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message ?? "Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!isAdminUser(result.user.email)) {
        await auth.signOut();
        setError("Access denied. This account is not authorized as admin.");
      }
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1C1C1C] rounded-2xl p-8 shadow-lg border border-gray-800">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Admin Login
        </h2>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 mb-6 disabled:opacity-50"
          aria-label="Sign in with Google"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.2-2.7-.5-4z"
            />
            <path
              fill="#34A853"
              d="M6.3 14.7l7 5.1C15 16.1 19.1 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.6 5.1 29.6 3 24 3c-7.6 0-14.2 4.3-17.7 10.7z"
              opacity=".9"
            />
            <path
              fill="#FBBC05"
              d="M24 45c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4C29.9 35.9 27.1 37 24 37c-5.8 0-10.7-3.9-12.4-9.3l-7 5.4C8.1 40.5 15.4 45 24 45z"
              opacity=".9"
            />
            <path
              fill="#EA4335"
              d="M44.5 20H24v8.5h11.8c-.8 2.6-2.5 4.8-4.8 6.3l6.6 5.4C41.5 36.8 45 31 45 24c0-1.3-.2-2.7-.5-4z"
              opacity=".9"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#1C1C1C] text-gray-500">
              or sign in with email
            </span>
          </div>
        </div>

        {/* Email / Password form */}
        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className={`w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 ${color.ring}`}
              aria-label="Email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className={`w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 ${color.ring}`}
              aria-label="Password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`${color.bg} text-black font-semibold w-full px-8 py-4 rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50`}
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          <a
            href="#/"
            className="hover:text-white transition-colors duration-300"
          >
            ← Back to Portfolio
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
