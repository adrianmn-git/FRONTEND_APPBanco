'use client';
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

type CardProps = {
    id: string,
    userId: string,
    bankAccountId: string,
    cv: string,
    type: string,
    limit: number
};

export default function BankAccount(props: CardProps) {

    return (
        <div className="flex flex-col w-[500px] bg-white rounded-xl p-4 shadow-md border">
            <span className="text-xs text-gray-500 mb-2">{props.bankAccountId}</span>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{props.type}</span>
                <span className="text-xl font-semibold">{props.cv}</span>
            </div>
            <span className="text-sm text-gray-600">Limit: <b>{props.limit}</b></span>
        </div>
    );
}
