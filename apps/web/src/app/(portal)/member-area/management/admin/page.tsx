"use client";

import { trpc } from "@/lib/trpc/client";
import { Users, UserCheck, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

export default function InstituteAdminDashboard() {
  const { isLoading } = trpc.user.me.useQuery();

  if (isLoading) return <div className="p-4 text-sm">Loading institute admin profile...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Institute Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage staff, students, and schedules for your institute.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "My Students", value: "342", icon: Users },
          { label: "My Teachers", value: "12", icon: UserCheck },
          { label: "Classes Today", value: "48", icon: Calendar },
          { label: "Active Courses", value: "8", icon: BookOpen },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{kpi.value}</p>
            </div>
            <div className="p-2 bg-zinc-50 rounded-md">
              <kpi.icon className="h-4 w-4 text-zinc-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institute Staff */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h2 className="text-sm font-semibold text-zinc-800">Institute Staff</h2>
            <Link href="/member-area/management/staff" className="text-xs text-blue-600 font-medium hover:underline">Manage</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-50 text-zinc-500 text-xs border-b border-zinc-200">
                <tr>
                  <th className="px-4 py-2 font-medium">Teacher</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Classes Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {/* Mock Data */}
                {[
                  { name: "Ustadh Ali", status: "Online", classes: 4 },
                  { name: "Ustadha Noor", status: "Offline", classes: 0 },
                  { name: "Shaykh Omar", status: "In Class", classes: 6 },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50">
                    <td className="px-4 py-2 text-zinc-900 font-medium">{row.name}</td>
                    <td className="px-4 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center w-max gap-1 ${
                        row.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 
                        row.status === 'In Class' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Offline' ? 'bg-zinc-400' : row.status === 'In Class' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-zinc-500 text-xs">{row.classes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Requests */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h2 className="text-sm font-semibold text-zinc-800">Recent Support Requests</h2>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-zinc-100 text-sm">
              {[
                { message: "Ahmed requires a schedule change for next week", time: "2 hours ago" },
                { message: "Parent inquiry regarding Hifz progress report", time: "4 hours ago" },
                { message: "Teacher missed class, student requested makeup", time: "1 day ago" },
              ].map((log, i) => (
                <li key={i} className="px-4 py-3 flex flex-col justify-center hover:bg-zinc-50">
                  <span className="text-zinc-700 text-xs font-medium">{log.message}</span>
                  <span className="text-zinc-400 text-[10px] mt-0.5">{log.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
