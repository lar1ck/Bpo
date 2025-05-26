// import React, { useState } from 'react';

// const LoginPage: React.FC = () => {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     // TODO: Add API call for login authentication here
//     try {
//       // Example: await loginApi(form.username, form.password);
//       alert(`Logged in as ${form.username}`);
//     } catch {
//       setError('Failed to login. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-3xl mb-6">Login</h1>
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
