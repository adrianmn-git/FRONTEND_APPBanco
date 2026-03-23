'use client';
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

type BankAccountProps = {
    id: string;
    userId: string,
    amount: number;
    currency: string;
    limit: number;
    type: string;
    interest: number;
};

export default function BankAccount(props: BankAccountProps) {

    const currencySymbol = { EUR: "€", JPY: "¥", USD: "$", GBP: "£", AUD: "AU$" }[props.currency] ?? "";

    return (
        <div className="flex flex-col w-[500px] bg-white rounded-xl p-4 shadow-md border">
            <span className="text-xs text-gray-500 mb-2">{props.id}</span>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{props.amount} {currencySymbol}</span>
                <span className="text-xl font-semibold">{props.currency}</span>
            </div>
            <span className="text-sm text-gray-600">Limit: <b>{props.limit}</b></span>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span><b>{props.type}</b></span>
                <span>Interes: <b>{props.interest}</b></span>
            </div>
        </div>
    );
}
