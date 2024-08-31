// pages/login.js
"use client"
import { useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import cityPalace from "./../../public/images/city-palace.jpg";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/login', { // Adjust the URL as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      debugger

      const { session: { access_token, user } } = data;
      
      // Save the token to local storage
      localStorage.setItem('access_token', access_token);

      // Save user details to local storage or state
      localStorage.setItem('user_details', JSON.stringify(user));

      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="mt-40 flex justify-center h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${cityPalace.src})` }}>
      <div className='m-4 p-8 bg-white opacity-70 rounded-lg'>
        <div className='my-5 px-2'>
          <h1>Login</h1>
        </div>
        <div className='my-5'>
          <form className='space-y-10' onSubmit={handleLogin}>
            <input
              className='w-full bg-white p-2 border border-gray-400'
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className='w-full bg-white p-2 border border-gray-400'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className='border bg-black rounded-lg text-white p-2' type="submit">Login</button>
          </form>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
