'use client'

import { useEffect, useState } from "react";
import { HttpClient } from "@/libs/HttpClient";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import React, { } from "react";
import { useRouter } from "next/navigation";
import { TokenManager } from "@/libs/TokenManager";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

    const [formData, setFormData] = useState<{
        currencyId: string,
        type: string,
    }>({
        currencyId: '',
        type: '',
    })

    const router = useRouter()

    async function postbankaccount(currencyId: string, type: string) {
        let id = uuidv4().toString();
        const response = await HttpClient(
            `http://localhost:5004/api/bank-accounts/${id}`,
            'POST',
            JSON.stringify({
                currencyId,
                type
            })
        );

        if (response.status === 201) {
            router.push('/home_page')
        }
    }

    useEffect(() => {
        const token = TokenManager.get()
        if (!token) router.push('/login_page')
    }, [])

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        await postbankaccount(formData.currencyId, formData.type)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">CREAR COMPTE BANCARI</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <Select value={formData.currencyId} sx={{ minWidth: 200 }} label="Currency ID" color="info" onChange={(e) => setFormData({ ...formData, currencyId: e.target.value })}>
                        <MenuItem value={"JPY"}>JYP</MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"GPB"}>GPB</MenuItem>
                        <MenuItem value={"AUD"}>AUD</MenuItem>
                        <MenuItem value={"EUR"}>EUR</MenuItem>
                    </Select>
                    <Select value={formData.type} sx={{ minWidth: 200 }} label="Type" color="info" onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value={"NORMAL"}>NORMAL</MenuItem>
                        <MenuItem value={"SAVINGS"}>SAVINGS</MenuItem>
                    </Select>
                    <Button type="submit" sx={{ backgroundColor: '#ff4081', color: 'white', borderRadius: '25px', padding: '10px', textTransform: 'none', fontWeight: 'bold', marginTop: '30px' }} fullWidth> Crear compte </Button>
                </form>
            </div>
        </div>
    );
}
