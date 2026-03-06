"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Brain, Headset, LayoutDashboard, LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { handleRegister } from '../_actions/login'

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#profissionais", label: "Profissionais", icon: <Brain className="w-4 h-4" /> },
    { href: "#contato", label: "Contato", icon: <Headset className="w-4 h-4" /> },
  ];

  async function handleLogin() {
    await handleRegister("github")
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300 px-1"
        >
          {item.icon}
          {item.label}
        </Link>
      ))}

      {status === 'loading' ? null : session ? (
        <Link href="/dashboard">
          <Button className="rounded-full bg-sage hover:bg-sage/85 text-noite font-medium text-sm px-5 shadow-[0_4px_14px_rgba(120,191,160,0.3)] transition-all duration-300">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleLogin}
          className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 text-sm px-5 transition-all duration-300"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-noite/80 backdrop-blur-xl border-b border-white/8" />

      <div className="relative container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="font-['Cormorant_Garamond'] text-xl font-light text-white tracking-widest hover:text-lavanda transition-colors">
            Mentor
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Mobile trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[260px] bg-noite border-l border-white/10"
          >
            <SheetHeader className="border-b border-white/10 pb-5 mb-6">
              <SheetTitle className="font-['Cormorant_Garamond'] text-xl font-light text-white text-left">
                Mentor
              </SheetTitle>
              <SheetDescription className="text-xs text-white/40 tracking-widest uppercase text-left">
                Navegação
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-3 px-1">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}