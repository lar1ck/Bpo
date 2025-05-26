import React, { useState } from 'react';
import { register } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, password });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      let errorMessage = 'Registration failed';

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}
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
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Register
      </button>
    </form>
  );
};

export default Register;
