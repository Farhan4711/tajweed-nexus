"use client";

import { trpc } from "@/lib/trpc/client";

export default function SuperAdminDashboard() {
  const { data: user, isLoading, error } = trpc.user.me.useQuery();

  if (isLoading) return <div className="p-8">Loading super admin profile...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Full dashboard with KPI cards, charts, and management modules will be built in Phase 4.1.
      </p>

      <div className="bg-card p-6 rounded-xl border shadow-sm mt-8">
        <h2 className="text-xl font-semibold mb-4">Phase 1.4 Verification (tRPC)</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold">{user?.role}</span></p>
          <p><strong>Database ID:</strong> <span className="font-mono text-xs">{user?.id}</span></p>
        </div>
      </div>
    </div>
  );
}
