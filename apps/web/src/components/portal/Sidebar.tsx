"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  LogOut,
  CreditCard,
  FileCheck,
  Video
} from "lucide-react";
// Bug fix: removed unused `Settings` import
import { signOut } from "next-auth/react";
import { cn } from "@qlms/ui";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const role = session?.user?.role;

  // Denser look: smaller text, tighter padding
  const linkClass = (path: string) => cn(
    "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
    pathname === path 
      ? "bg-zinc-800 text-white font-medium" 
      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
  );

  return (
    // Bug fix: "hidden md:flex" was conflicting — use "flex" and let the parent handle responsiveness
    <div className="w-64 bg-zinc-950 text-zinc-300 border-r border-zinc-800 flex flex-col h-screen overflow-y-auto shrink-0">
      <div className="p-4 border-b border-zinc-800">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <BookOpen className="h-5 w-5 text-zinc-300" />
          <span>Q.LMS Portal</span>
        </Link>
        <div className="mt-1 text-xs text-zinc-500 uppercase tracking-wider font-semibold">
          {role}
        </div>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-1 px-3">
        {/* SUPER ADMIN LINKS */}
        {role === "SUPERADMIN" && (
          <>
            <Link href="/member-area/superadmin" className={linkClass("/member-area/superadmin")}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link href="/member-area/superadmin/users" className={linkClass("/member-area/superadmin/users")}>
              <Users className="h-4 w-4" /> Manage Users
            </Link>
            <Link href="/member-area/superadmin/courses" className={linkClass("/member-area/superadmin/courses")}>
              <BookOpen className="h-4 w-4" /> Manage Courses
            </Link>
          </>
        )}

        {/* INSTITUTE ADMIN LINKS */}
        {role === "ADMIN" && (
          <>
            <Link href="/member-area/management/admin" className={linkClass("/member-area/management/admin")}>
              <LayoutDashboard className="h-4 w-4" /> Institute Dashboard
            </Link>
            <Link href="/member-area/management/staff" className={linkClass("/member-area/management/staff")}>
              <Users className="h-4 w-4" /> Staff & Students
            </Link>
          </>
        )}

        {/* TEACHER LINKS */}
        {role === "TEACHER" && (
          <>
            <Link href="/member-area/employees/teacher" className={linkClass("/member-area/employees/teacher")}>
              <LayoutDashboard className="h-4 w-4" /> Overview
            </Link>
            <Link href="/member-area/employees/teacher/schedule" className={linkClass("/member-area/employees/teacher/schedule")}>
              <Calendar className="h-4 w-4" /> My Schedule
            </Link>
            <Link href="/member-area/employees/teacher/grading" className={linkClass("/member-area/employees/teacher/grading")}>
              <FileCheck className="h-4 w-4" /> Grading & Evals
            </Link>
          </>
        )}

        {/* STUDENT LINKS */}
        {role === "STUDENT" && (
          <>
            <Link href="/member-area/students/student" className={linkClass("/member-area/students/student")}>
              <LayoutDashboard className="h-4 w-4" /> My Learning
            </Link>
            <Link href="/member-area/students/student/classes" className={linkClass("/member-area/students/student/classes")}>
              <Video className="h-4 w-4" /> Live Classes
            </Link>
            <Link href="/member-area/students/student/grades" className={linkClass("/member-area/students/student/grades")}>
              <GraduationCap className="h-4 w-4" /> Report Card
            </Link>
            <Link href="/member-area/students/student/billing" className={linkClass("/member-area/students/student/billing")}>
              <CreditCard className="h-4 w-4" /> Billing
            </Link>
          </>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
