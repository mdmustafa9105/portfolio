import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  color: any;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, color }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Use environment variables for credentials, fallback to default if not set
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'password';

    if (username === validUsername && password === validPassword) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1C1C1C] rounded-2xl p-8 shadow-lg border border-gray-800">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className={`w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 ${color.ring}`}
              aria-label="Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
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
          {error && <p className="text-red-500 text-sm text-center" role="alert">{error}</p>}
          <div>
            <button
              type="submit"
              className={`${color.bg} text-black font-semibold w-full px-8 py-4 rounded-full hover:bg-opacity-80 transition-all duration-300 mt-2`}
            >
              Log In
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-500">
          <a href="#/" className="hover:text-white transition-colors duration-300">← Back to Portfolio</a>
        </p>
      </div>
    </div>
  );
};

export default Login;