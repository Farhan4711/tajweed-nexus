import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="w-full border-t border-border bg-background py-12 md:py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold tracking-tighter text-islamic-green">
              Q.LMS
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            A premium online platform dedicated to teaching the Holy Quran with authentic Tajweed, directly connecting students with certified scholars globally.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/courses" className="hover:text-foreground">Courses</Link></li>
            <li><Link href="/teachers" className="hover:text-foreground">Teachers</Link></li>
            <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-4 col-span-2 md:col-span-4 lg:col-span-1">
          <h4 className="text-sm font-semibold">Subscribe</h4>
          <p className="text-sm text-muted-foreground">
            Get updates on new courses and features.
          </p>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button className="h-9 items-center justify-center rounded-md bg-islamic-green px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-islamic-green-dark">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Q.LMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
