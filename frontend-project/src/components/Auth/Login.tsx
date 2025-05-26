import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default Login;
