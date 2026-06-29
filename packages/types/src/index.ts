// ──────────────────────────────────────────────
// Q.LMS Shared Types
// ──────────────────────────────────────────────

/** User roles in the platform */
export type UserRole = "SUPERADMIN" | "ADMIN" | "TEACHER" | "STUDENT";

/** Course types offered */
export type CourseType =
  | "QURAN_READING"
  | "TAJWEED"
  | "HIFZ"
  | "ARABIC_LANGUAGE"
  | "ISLAMIC_STUDIES";

/** Course difficulty levels */
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

/** Enrollment status */
export type EnrollmentStatus =
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "CANCELLED";

/** Class session status */
export type SessionStatus =
  | "SCHEDULED"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED";

/** Attendance status */
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

/** Evaluation types for Quran courses */
export type EvaluationType = "READING" | "TARTEEL" | "HIFZ";

/** Arabic grading system */
export type ArabicGrade = "MUMTAZ" | "JAYYID_JIDDAN" | "JAYYID" | "MAQBOOL";

/** Arabic grade display labels */
export const ARABIC_GRADE_LABELS: Record<ArabicGrade, { en: string; ar: string }> = {
  MUMTAZ: { en: "Excellent", ar: "ممتاز" },
  JAYYID_JIDDAN: { en: "Very Good", ar: "جيد جداً" },
  JAYYID: { en: "Good", ar: "جيد" },
  MAQBOOL: { en: "Acceptable", ar: "مقبول" },
};

/** Payment status */
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

/** Notification channels */
export type NotificationChannel = "EMAIL" | "SMS" | "PUSH" | "IN_APP";

/** Blog post categories */
export type BlogCategory =
  | "QURAN_LEARNING_TIPS"
  | "ISLAMIC_ARTICLES"
  | "TEACHER_SPOTLIGHT"
  | "STUDENT_STORIES"
  | "NEWS";

/** Navigation item for portals */
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
  roles?: UserRole[];
}
