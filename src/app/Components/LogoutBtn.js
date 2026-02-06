'use client';
import { LogOut } from "lucide-react";

const LogoutBtn = ({handleClick}) => {
    return <button onClick={() => handleClick()} aria-label="logout" className="mr-3 hover:cursor-pointer"><LogOut /></button>
}

export default LogoutBtn;