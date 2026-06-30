"use client";

import { trpc } from "@/lib/trpc/client";
import { Users, BookOpen, DollarSign } from "lucide-react";
import Link from "next/link";

export default function SuperAdminDashboard() {
  const { isLoading: isUserLoading } = trpc.user.me.useQuery();

  if (isUserLoading) return <div className="p-4 text-sm">Loading super admin profile...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Super Admin Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Platform overview and management modules.</p>
        </div>
      </div>

      {/* KPI Cards - Dense layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "1,240", icon: Users, trend: "+12%" },
          { label: "Active Teachers", value: "48", icon: Users, trend: "+3%" },
          { label: "Total Revenue", value: "$42,500", icon: DollarSign, trend: "+8%" },
          { label: "Active Courses", value: "15", icon: BookOpen, trend: "0%" },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{kpi.value}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="p-2 bg-zinc-50 rounded-md">
                <kpi.icon className="h-4 w-4 text-zinc-600" />
              </div>
              <span className={`text-[10px] font-medium mt-2 ${kpi.trend.startsWith("+") ? "text-emerald-600" : "text-zinc-500"}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users Table */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h2 className="text-sm font-semibold text-zinc-800">Recent Signups</h2>
            <Link href="/member-area/superadmin/users" className="text-xs text-blue-600 font-medium hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-50 text-zinc-500 text-xs border-b border-zinc-200">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Role</th>
                  <th className="px-4 py-2 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {/* Mock Data */}
                {[
                  { name: "Ahmed Ali", role: "STUDENT", date: "Today" },
                  { name: "Fatima Noor", role: "TEACHER", date: "Yesterday" },
                  { name: "Omar Farooq", role: "STUDENT", date: "2 days ago" },
                  { name: "Aisha Khan", role: "STUDENT", date: "2 days ago" },
                  { name: "Zayd bin Tariq", role: "TEACHER", date: "3 days ago" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50">
                    <td className="px-4 py-2 text-zinc-900 font-medium">{row.name}</td>
                    <td className="px-4 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.role === 'TEACHER' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {row.role}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-zinc-500 text-xs">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
            <h2 className="text-sm font-semibold text-zinc-800">System Activity</h2>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-zinc-100 text-sm">
              {[
                { message: "New course 'Tajweed 101' published", time: "1 hour ago" },
                { message: "Teacher 'Fatima Noor' submitted documents for approval", time: "3 hours ago" },
                { message: "Stripe payout processed successfully", time: "5 hours ago" },
                { message: "Database backup completed", time: "12 hours ago" },
                { message: "User 'Ahmed Ali' upgraded to Pro plan", time: "1 day ago" },
              ].map((log, i) => (
                <li key={i} className="px-4 py-2.5 flex justify-between items-center hover:bg-zinc-50">
                  <span className="text-zinc-700 text-xs">{log.message}</span>
                  <span className="text-zinc-400 text-[10px]">{log.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
