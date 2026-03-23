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
        destinationBankAccountId: string,
        amount: number,
    }>({
        destinationBankAccountId: '',
        amount: 0,
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

    async function postOperation(destinationBankAccountId: string, amount: number) {
        let id = uuidv4().toString();
        let type = "DEPOSIT"
        const response = await HttpClient(
            `http://localhost:5004/api/operations/${id}`,
            'POST',
            JSON.stringify({
                destinationBankAccountId,
                amount,
                type,
            })
        );

        if (response.status === 201) {
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
        await postOperation(formData.destinationBankAccountId, formData.amount)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">DEPOSITAR</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <Select value={formData.destinationBankAccountId} sx={{ minWidth: 200 }} onChange={(e) => setFormData({ ...formData, destinationBankAccountId: e.target.value })}>
                        {bankAccountList.map((account) => (
                            <MenuItem key={account.id} value={account.id}>
                                {account.id}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField type="number" value={formData.amount} sx={{ minWidth: 300 }} label="Quantitat" color="info" onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })} />
                    <Button type="submit" sx={{ backgroundColor: '#ff4081', color: 'white', borderRadius: '25px', padding: '10px', textTransform: 'none', fontWeight: 'bold', marginTop: '30px' }} fullWidth> Depositar </Button>
                </form>
            </div>
        </div>
    );
}
