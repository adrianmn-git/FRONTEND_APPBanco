'use client'

import { useEffect, useState } from "react";
import { HttpClient } from "@/libs/HttpClient";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import React, { } from "react";
import { useRouter } from "next/navigation";
import { TokenManager } from "@/libs/TokenManager";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [formData, setFormData] = useState<{
    email: string,
    name: string,
    password: string,
  }>({
    email: '',
    name: '',
    password: '',
  })

  const router = useRouter()

  async function register(email: string, name: string, password: string) {
    let id = uuidv4().toString();
    const response = await HttpClient(
      `http://localhost:5004/api/register/${id}`,
      'POST',
      JSON.stringify({
        email,
        name,
        password
      })
    );

    if (response.status === 200) {
      router.push('/login_page')
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await register(formData.email, formData.name, formData.password)
  }

  useEffect(() => {
    const token = TokenManager.get()
    if (token) router.push('/home_page')
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <TextField type="text" value={formData.email} sx={{ minWidth: 300 }} label="Email" color="info" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <TextField type="text" value={formData.name} sx={{ minWidth: 300 }} label="Name" color="info" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <TextField type="password" value={formData.password} sx={{ minWidth: 300 }} label="Password" color="info" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <Button type="submit" sx={{ backgroundColor: '#ff4081', color: 'white', borderRadius: '25px', padding: '10px', textTransform: 'none', fontWeight: 'bold', marginTop: '30px' }} fullWidth> Register </Button>
        </form>
        <Button onClick={() => router.push('/login_page')} className="text-pink-500 mt-12 text-sm font-medium hover:underline" fullWidth > LOGIN </Button>
      </div>
    </div>
  );
}
