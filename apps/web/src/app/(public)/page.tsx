// ──────────────────────────────────────────────
// Home page — public marketing landing
// ──────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-16">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Learn the{" "}
          <span className="text-[hsl(147,58%,26%)]">Holy Quran</span>
          {" "}with Expert Teachers
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of students worldwide in mastering Quran Reading,
          Tajweed, Hifz, Arabic Language, and Islamic Studies with certified
          scholars.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="/courses"
            className="inline-flex items-center justify-center rounded-lg bg-[#1B6B3A] px-8 py-3 text-lg font-semibold text-white hover:bg-[#155c30] transition-colors"
          >
            Start Free Trial
          </a>
          <a
            href="/courses"
            className="inline-flex items-center justify-center rounded-lg border-2 border-[#1B6B3A] px-8 py-3 text-lg font-semibold text-[#1B6B3A] hover:bg-[#1B6B3A]/5 transition-colors"
          >
            View Courses
          </a>
        </div>
      </section>

      {/* Trust Bar Placeholder */}
      <section className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-8 border-y border-border">
          {[
            { value: "2,500+", label: "Students" },
            { value: "30+", label: "Countries" },
            { value: "50+", label: "Teachers" },
            { value: "8+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-[#1B6B3A]">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder message */}
      <p className="text-sm text-muted-foreground text-center">
        🚧 Full home page with all sections will be built in Phase 2.1
      </p>
    </div>
  );
}
