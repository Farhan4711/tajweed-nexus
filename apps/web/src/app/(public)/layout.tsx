// ──────────────────────────────────────────────
// Public site route group — marketing pages
// ──────────────────────────────────────────────

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header and Footer will be added in Phase 1.5 / 2.6 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
