"use client";

import { useSession } from "next-auth/react";
import { Search, Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@qlms/ui";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full h-8 pl-9 pr-3 text-sm bg-zinc-100 border-transparent rounded-md focus:border-zinc-300 focus:bg-white focus:ring-0 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-zinc-500 hover:text-zinc-900 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-zinc-500 hover:text-zinc-900">
          <Settings className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-zinc-200 mx-1"></div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-zinc-900 leading-none">{session?.user?.name}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{session?.user?.email}</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.avatar || undefined} />
            <AvatarFallback className="text-xs bg-zinc-100 text-zinc-600">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
