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
        bankAccountId: string,
        limit: number,
    }>({
        bankAccountId: '',
        limit: 0,
    })
    const [bankAccountList, setBankAccountList] = useState<any[]>([]);

    const router = useRouter()

    async function getBankAccounts() {
        const response = await HttpClient(
            'http://localhost:5004/api/bank-accounts',
            'GET',
        );

        if (response.status === 200) {
            const r = await response.json();
            setBankAccountList(r)
        }
    }

    async function patchLimit(bankAccountId: string, limit: number) {
        const response = await HttpClient(
            `http://localhost:5004/api/bank-accounts/limit/${bankAccountId}`,
            'PATCH',
            JSON.stringify({
                limit
            })
        );

        if (response.status === 204) {
            router.push('/home_page')
        }
    }

    useEffect(() => {
        const token = TokenManager.get()
        if (!token) router.push('/login_page')
        if (token) getBankAccounts()
    }, [])

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        await patchLimit(formData.bankAccountId, formData.limit)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">ACTUALITZAR LIMIT</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <Select value={formData.bankAccountId} sx={{ minWidth: 200 }} onChange={(e) => setFormData({ ...formData, bankAccountId: e.target.value })}>
                        {bankAccountList.map((account) => (
                            <MenuItem key={account.id} value={account.id}>
                                {account.id}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField type="number" value={formData.limit} sx={{ minWidth: 300 }} label="Limit" color="info" onChange={(e) => setFormData({ ...formData, limit: parseFloat(e.target.value) })} />
                    <Button type="submit" sx={{ backgroundColor: '#ff4081', color: 'white', borderRadius: '25px', padding: '10px', textTransform: 'none', fontWeight: 'bold', marginTop: '30px' }} fullWidth> Actualitzar </Button>
                </form>
            </div>
        </div>
    );
}
