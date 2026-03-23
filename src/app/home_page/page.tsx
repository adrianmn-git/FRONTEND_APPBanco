'use client'

import { useEffect, useState } from "react";
import { HttpClient } from "@/libs/HttpClient";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import React, { } from "react";
import { useRouter } from "next/navigation";
import { TokenManager } from "@/libs/TokenManager";
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import UpdateIcon from '@mui/icons-material/Update';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import BankAccount from "@/components/BankAccount";
import Card from "@/components/Card"

type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  isAdmin: boolean
}

type BankAccount = {
  id: string,
  userId: string,
  currencyId: string,
  type: string,
  limit: number,
  amount: number,
  interest: number
}

type Card = {
  id: string,
  userId: string,
  bankAccountId: string,
  cv: string,
  type: string,
  limit: number
}

export default function Home() {

  const [user, setUser] = useState<User>()
  const [bankAccountList, setBankAccountList] = useState<BankAccount[]>([]);
  const [cardList, setCardList] = useState<Card[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = TokenManager.get()
    if (!token) router.push('/login_page')
    if (token) {
      getBankAccounts();
      getCards();
    }
  }, [])

  useEffect(() => {
    if (bankAccountList.length > 0 && bankAccountList[0].userId) {
      getUserById(bankAccountList[0].userId.toString());
    }
  }, [bankAccountList]);

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
  
  async function getCards() {
    const response = await HttpClient(
      'http://localhost:5004/api/cards',
      'GET',
    );

    if (response.status === 200) {
      const r = await response.json();
      setCardList(r)
    }
  }

  async function getUserById(userId: string) {
    const response = await HttpClient(
      `http://localhost:5004/api/users/${userId}`,
      'GET',
    );

    if (response.status === 200) {
      const r = await response.json();
      setUser(r)
    }
  }

  async function postBankAccount(e: React.FormEvent) {
    e.preventDefault()
    router.push('/bankaccountpost_page')
  }

  async function postCard(e: React.FormEvent) {
    e.preventDefault()
    router.push('/cardpost_page')
  }

  async function postOperationWithdraw(e: React.FormEvent) {
    e.preventDefault()
    router.push('/withdraw_page')
  }

  async function postOperationDeposit(e: React.FormEvent) {
    e.preventDefault()
    router.push('/deposit_page')
  }

  async function postOperationTransfer(e: React.FormEvent) {
    e.preventDefault()
    router.push('/transfer_page')
  }

  async function patchLimit(e: React.FormEvent) {
    e.preventDefault()
    router.push('/patchlimit_page')
  }

  async function getLogs(e: React.FormEvent) {
    e.preventDefault()
    router.push('logs_page')
  }

  async function goLoginOrRegister(goLogin: boolean) {
    TokenManager.set(null)
    if (goLogin) {
      router.push('/login_page')
    } else {
      router.push('/')
    }
  }

  return (
    <div>
      <div className="w-full h-40 p-16 items-center justify-items-center bg-[#ff4081]">
        <h1 className="text-5xl mx-16 mb-24 font-bold text-white">TBFBINMW</h1>
      </div>
      <div className="items-center justify-items-center p-8 pt-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-row w-[1000px] bg-[#f5f5f5] rounded-2xl p-4 gap-2 row-start-2 items-center sm:items-start">
          <Button sx={{ fontWeight: 700, color: 'white', backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }} onClick={() => goLoginOrRegister(true)}>
            Login
            <LoginRoundedIcon sx={{ color: 'white', fontSize: 20 }}></LoginRoundedIcon>
          </Button>
          <Button sx={{ fontWeight: 700, color: 'white', backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }} onClick={() => goLoginOrRegister(false)}>
            Registre
            <LogoutRoundedIcon sx={{ color: 'white', fontSize: 20 }}></LogoutRoundedIcon>
          </Button>
          <Button sx={{ fontWeight: 700, color: 'white', backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }} onClick={getLogs}>
            Logs
            <ManageSearchRoundedIcon sx={{ color: 'white', fontSize: 20 }}></ManageSearchRoundedIcon>
          </Button>
          {user && (
            <div className="w-full h-full bg-white ml-10 rounded-lg p-1 px-4">
              <span className="text-2xl">Hola, <b className="ml-3">{user?.name}</b> / <b>{user?.email}</b></span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-[1000px] bg-[#f5f5f5] rounded-2xl p-4 gap-8 mt-8 row-start-2 items-center sm:items-start">
          <div className="flex flex-row justify-between items-center w-full p-4">
            <h3 className="text-2xl font-bold"> Comptes Bancaris </h3>
            <Button sx={{ fontWeight: 700, color: 'white', borderRadius: 25, backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }} onClick={postBankAccount}>
              Afegir
              <AddCircleRoundedIcon sx={{ color: 'white', fontSize: 20 }}></AddCircleRoundedIcon>
            </Button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Divider sx={{ width: '90%' }}></Divider>
          </div>
          <div className="">
            {bankAccountList.length != 0 ?
              <div className="flex bg-[#d1ffe9] border-gray-200 border-2 rounded-lg">
                <List className="w-full grid grid-cols-2 gap-4">
                  {bankAccountList.map((account, index) => (
                    <ListItem key={index} className="p-2">
                      <BankAccount
                        id={account.id}
                        userId={account.userId}
                        amount={account.amount}
                        currency={account.currencyId}
                        limit={account.limit}
                        type={account.type}
                        interest={account.interest}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              :
              <div className="flex justify-center items-center">
                <span>No hi han comptes bancaris associades a aquest usuari</span>
              </div>
            }
          </div>
          <div className="w-full flex justify-center items-center">
            <Divider sx={{ width: '90%' }}></Divider>
          </div>
          <div className="flex flex-row justify-center items-center w-full px-4 pb-2 gap-4">
            <Button sx={{ fontWeight: 700, color: 'white', borderRadius: 25, backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={postOperationTransfer}
            >
              Transferencia
              <CompareArrowsIcon sx={{ color: 'white', fontSize: 20 }} />
            </Button>

            <Button sx={{ fontWeight: 700, color: 'white', borderRadius: 25, backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={postOperationDeposit}
            >
              Depositar
              <AttachMoneyIcon sx={{ color: 'white', fontSize: 20 }} />
            </Button>

            <Button sx={{ fontWeight: 700, color: 'white', borderRadius: 25, backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={postOperationWithdraw}
            >
              Retirar
              <MoneyOffIcon sx={{ color: 'white', fontSize: 20 }} />
            </Button>

            <Button sx={{ fontWeight: 700, color: 'white', borderRadius: 25, backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={patchLimit}
            >
              Actualitzar limit
              <UpdateIcon sx={{ color: 'white', fontSize: 20 }} />
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-[1000px] bg-[#f5f5f5] rounded-2xl p-4 gap-8 mt-8 row-start-2 items-center sm:items-start">
          <div className="flex flex-row justify-between items-center w-full p-4">
            <h3 className="text-2xl font-bold"> Tarjetes </h3>
            <Button sx={{ fontWeight: 700, color: 'white', borderRadius: 25, backgroundColor: '#ff4081', paddingX: 4, display: 'flex', alignItems: 'center', gap: 1 }} onClick={postCard}>
              Afegir
              <AddCircleRoundedIcon sx={{ color: 'white', fontSize: 20 }}></AddCircleRoundedIcon>
            </Button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Divider sx={{ width: '90%' }}></Divider>
          </div>
          <div className="">
            {cardList.length != 0 ?
              <div className="flex bg-[#d1ffe9] border-gray-200 border-2 rounded-lg">
                <List className="w-full grid grid-cols-2 gap-4">
                  {cardList.map((card, index) => (
                    <ListItem key={index} className="p-0">
                      <Card
                        id={card.id}
                        userId={card.userId}
                        bankAccountId={card.bankAccountId}
                        cv={card.cv}
                        type={card.type}
                        limit={card.limit}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              :
              <div className="flex text-center justify-center items-center">
                <span>No hi han tarjetes associades a cap compte bancari d'aquest usuari</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
