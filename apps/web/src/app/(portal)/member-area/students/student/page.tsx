"use client";

import { trpc } from "@/lib/trpc/client";
import { BookOpen, Video, GraduationCap, Award } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const { data: user, isLoading } = trpc.user.me.useQuery();
  const { data: upcomingSessions } = trpc.session.getMyUpcoming.useQuery();

  if (isLoading) return <div className="p-4 text-sm">Loading student profile...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-sm text-zinc-500 mt-1">Ready to continue your learning journey?</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Courses", value: "2", icon: BookOpen },
          { label: "Attendance", value: "98%", icon: Award },
          { label: "Current Level", value: "Interm.", icon: GraduationCap },
          { label: "Upcoming Classes", value: upcomingSessions?.length || 0, icon: Video },
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
              <h2 className="text-sm font-semibold text-zinc-800">Your Next Class</h2>
            </div>
            {upcomingSessions && upcomingSessions.length > 0 ? (
              <div className="p-6 flex flex-col items-center justify-center text-center flex-1">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{upcomingSessions[0].title || upcomingSessions[0].course?.title || "Class Session"}</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {new Date(upcomingSessions[0].scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-zinc-400 mt-2">with {(upcomingSessions[0] as { teacher?: { name?: string | null } }).teacher?.name}</p>
                <a 
                  href={upcomingSessions[0].zoomUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md text-sm transition-colors text-center"
                >
                  Join Zoom Room
                </a>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-center flex-1 text-zinc-500">
                <p className="text-sm">You have no upcoming classes scheduled.</p>
              </div>
            )}
          </div>
        </div>

        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
              <h2 className="text-sm font-semibold text-zinc-800">My Courses</h2>
              <Link href="/courses" className="text-xs text-blue-600 font-medium hover:underline">Browse More</Link>
            </div>
            <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
              {[
                { title: "Advanced Tajweed Mastery", progress: 65, nextLesson: "Makharij Al-Huroof" },
                { title: "Quran Memorization (Juz Amma)", progress: 30, nextLesson: "Surah Al-Ghashiyah" }
              ].map((course, i) => (
                <div key={i} className="border border-zinc-200 rounded-lg p-4 flex flex-col">
                  <h3 className="font-semibold text-zinc-900">{course.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">Next: {course.nextLesson}</p>
                  
                  <div className="mt-auto pt-4">
                    <div className="flex justify-between text-xs text-zinc-500 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
