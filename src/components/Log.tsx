'use client';
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';

type LogProps = {
    id: string,
    entityType: string,
    entityId: string,
    type: string,
    amount: number,
    createdAt: string
};

export default function Log(props: LogProps) {

    return (
        <div className="flex flex-col w-full bg-white p-2 border-b-2 border-b-[#ff4081] 
                hover:bg-gray-100 hover:shadow-md transition-all duration-200">
            <span className="text-sm font-semibold"> <b>Operació:</b> {props.type} </span>
            <div className="flex justify-between items-center text-gray-600 mt-1">
                <span className="text-sm"> {props.createdAt} </span>
                <span className="text-lg font-semibold"> {props.amount} </span>
            </div>
        </div>
    );
}
