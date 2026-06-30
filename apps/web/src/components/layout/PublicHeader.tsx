"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@qlms/ui";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@qlms/ui";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Teachers", href: "/teachers" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function PublicHeader() {
  const { status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter text-islamic-green">
            Q.LMS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth / CTA */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoading && !isLoggedIn && (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-sm font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-islamic-green hover:bg-islamic-green-dark">
                  Start Free Trial
                </Button>
              </Link>
            </>
          )}
          {!isLoading && isLoggedIn && (
            <Link href="/member-area">
              <Button className="bg-islamic-green hover:bg-islamic-green-dark">
                Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-2 py-1 text-lg font-medium hover:text-islamic-green"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                  {!isLoading && !isLoggedIn && (
                    <>
                      <Link href="/login" className="w-full">
                        <Button variant="outline" className="w-full">Log in</Button>
                      </Link>
                      <Link href="/register" className="w-full">
                        <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark">Start Free Trial</Button>
                      </Link>
                    </>
                  )}
                  {!isLoading && isLoggedIn && (
                    <Link href="/member-area" className="w-full">
                      <Button className="w-full bg-islamic-green hover:bg-islamic-green-dark">Dashboard</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
