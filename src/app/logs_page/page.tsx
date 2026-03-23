'use client'

import { useEffect, useState } from "react";
import { HttpClient } from "@/libs/HttpClient";
import { Button } from "@mui/material";
import React, { } from "react";
import { useRouter } from "next/navigation";
import { TokenManager } from "@/libs/TokenManager";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SearchIcon from '@mui/icons-material/Search';

import Log from "@/components/Log"

export default function Home() {

    const [formData, setFormData] = useState<{
        entityId: string,
    }>({
        entityId: '',
    })
    const [bankAccountList, setBankAccountList] = useState<any[]>([]);
    const [logList, setLogList] = useState<any[]>([]);

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

    async function getLogs(entityId: string) {
        let entityType = "ACCOUNT"
        const params = new URLSearchParams({ entityType, entityId }).toString() // HE BUSCADO COMO PASAR POR QUERY EL ENTITYTYPE Y ENTITY ID
        const response = await HttpClient(
            `http://localhost:5004/api/logs?${params}`,
            'GET',
        );

        if (response.status === 200) {
            const r = await response.json()
            setLogList(r)
        }
    }

    useEffect(() => {
        const token = TokenManager.get()
        if (!token) router.push('/login_page')
        if (token) getBankAccounts()
    }, [])

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        await getLogs(formData.entityId)
    }

    console.log(logList)

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-24">
            <div className="w-[1000px] bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <form onSubmit={onSubmit} className="flex flex-row justify-between gap-12">
                    <Select value={formData.entityId} sx={{ minWidth: 800, borderRadius: 25 }} onChange={(e) => setFormData({ ...formData, entityId: e.target.value })}>
                        {bankAccountList.map((account) => (
                            <MenuItem key={account.id} value={account.id}>
                                {account.id}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        type="submit"
                        sx={{
                            backgroundColor: '#ff4081',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '10px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            minWidth: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        fullWidth
                    >
                        <SearchIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Button>
                </form>
            </div>
            {logList.length != 0 && (
                <div className="w-[1000px] bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center mt-12">
                    <List className="w-full">
                        {logList.map((log, index) => (
                            <ListItem key={index}>
                                <Log
                                    id={log.id}
                                    entityType={log.entityType}
                                    entityId={log.entityId}
                                    type={log.type}
                                    amount={log.amount}
                                    createdAt={log.createdAt}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
}
