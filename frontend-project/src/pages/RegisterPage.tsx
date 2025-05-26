// import React, { useState } from 'react';

// const RegisterPage: React.FC = () => {
//   const [form, setForm] = useState({ username: '', email: '', password: '' });
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     // TODO: Add API call for user registration here
//     try {
//       // Example: await registerApi(form.username, form.email, form.password);
//       alert(`Registered user: ${form.username}`);
//     } catch {
//       setError('Failed to register. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-3xl mb-6">Register</h1>
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
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
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
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;
