'use client'

import { useEffect, useState } from "react";
import { HttpClient } from "@/libs/HttpClient";
import { TokenManager } from "@/libs/TokenManager";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import React, { } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

    const [formData, setFormData] = useState<{
        email: string,
        password: string,
    }>({
        email: '',
        password: ''
    })

    const router = useRouter()

    async function login(email: string, password: string) {
        const response = await HttpClient(
            'http://localhost:5004/api/login',
            'POST',
            JSON.stringify({
                email,
                password
            })
        );

        if (response.status === 200) {
            const r = await response.json();
            TokenManager.set(r.token);
            router.push('/home_page')
        }
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        await login(formData.email, formData.password)
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">LOGIN</h1>
                <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
                    <TextField type="text" label="Email" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                    <TextField type="password" label="Contrasenya" variant="outlined" fullWidth onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                    <Button type="submit" sx={{ backgroundColor: '#ff4081', color: 'white', borderRadius: '25px', padding: '10px', textTransform: 'none', fontWeight: 'bold', marginTop: '30px' }} fullWidth>
                        Login
                    </Button>
                </form>
                <Button onClick={() => router.push('/')} className="text-pink-500 mt-12 text-sm font-medium hover:underline" fullWidth> Registrar </Button>
            </div>
        </div>
    );
}
