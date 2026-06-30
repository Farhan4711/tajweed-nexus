"use client";

import { trpc } from "@/lib/trpc/client";
import { Clock, Star, Users, Video } from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const { data: user, isLoading } = trpc.user.me.useQuery();
  const { data: upcomingSessions } = trpc.session.getMyUpcoming.useQuery();

  if (isLoading) return <div className="p-4 text-sm">Loading teacher profile...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Assalamu Alaikum, {user?.name?.split(' ')[0]}</h1>
          <p className="text-sm text-zinc-500 mt-1">Here is your teaching schedule and overview for today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Hours Taught", value: "142", icon: Clock },
          { label: "Active Students", value: "28", icon: Users },
          { label: "Avg. Rating", value: "4.9", icon: Star },
          { label: "Classes Today", value: upcomingSessions?.length || 0, icon: Video },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Class - Prominent */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50/50">
              <h2 className="text-sm font-semibold text-zinc-800">Up Next</h2>
            </div>
            {upcomingSessions && upcomingSessions.length > 0 ? (
              <div className="p-6 flex flex-col items-center justify-center text-center flex-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{upcomingSessions[0].title || "Tajweed Class"}</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {new Date(upcomingSessions[0].scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <a 
                  href={upcomingSessions[0].zoomUrl || "#"} 
                  target="_blank" 
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm transition-colors"
                >
                  Join Zoom Room
                </a>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-center flex-1 text-zinc-500">
                <p className="text-sm">No more classes today.</p>
              </div>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
              <h2 className="text-sm font-semibold text-zinc-800">Upcoming Schedule</h2>
              <Link href="/member-area/employees/teacher/schedule" className="text-xs text-blue-600 font-medium hover:underline">Full Schedule</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-50 text-zinc-500 text-xs border-b border-zinc-200">
                  <tr>
                    <th className="px-4 py-2 font-medium">Time</th>
                    <th className="px-4 py-2 font-medium">Course / Title</th>
                    <th className="px-4 py-2 font-medium">Duration</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {upcomingSessions?.slice(1, 6).map((session) => (
                    <tr key={session.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-2 text-zinc-900 font-medium">
                        {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-2 text-zinc-700">{session.title || "Class"}</td>
                      <td className="px-4 py-2 text-zinc-500 text-xs">{session.duration} min</td>
                      <td className="px-4 py-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {session.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!upcomingSessions || upcomingSessions.length <= 1 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-zinc-500 text-sm">
                        No upcoming sessions to display.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
