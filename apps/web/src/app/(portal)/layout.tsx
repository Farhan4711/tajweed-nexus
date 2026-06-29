// ──────────────────────────────────────────────
// Portal route group — all dashboard routes (auth-gated)
// ──────────────────────────────────────────────

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will be added in Phase 1.5 */}
      <div className="flex flex-1 flex-col">
        {/* Topbar will be added in Phase 1.5 */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
