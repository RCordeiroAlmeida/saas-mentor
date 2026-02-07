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

export function Header() {

  const [isOpen, setIsOpen] = useState(false);

  const session = false; // Simulação de sessão

  const navItems = [
    { href: "#profissionais", label: "Profissionais", icon: <Brain /> },
    { href: "#contato", label: "Contato", icon: <Headset /> },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="text-white bg-violet-600 hover:bg-violet-100 hover:text-violet-700 duration-500"
        >
          <Link href={item.href}>
            {item.icon}
            {item.label}
          </Link>
        </Button>
      ))}

      {session ? (
        <Link 
          href="/dashboard"
        >
          <Button className="text-white  hover:bg-white hover:text-violet-700 duration-500 md:flex items-center w-full">
            <LayoutDashboard /> Dashboard
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button className="text-white  hover:bg-violet-100 hover:text-violet-700 duration-500 md:flex items-center w-full">
            <LogIn/> Login
          </Button>
        </Link>

      )}
    </> 
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-999 bg-violet-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-w-text.png"
              alt="Mentor Logo"
              width={200}
              height={80}
              
            />
          </div>
        </Link>
        
        {/* Navegação para desktop */}
        <nav className="hidden md:flex items-center text-base gap-4">
          <NavLinks />
        </nav>


        {/* Navegação para mobile */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="bg-violet-600 hover:bg-white   text-white hover:text-violet-700 duration-400"
              variant="ghost"
              size="icon"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px] z-9999">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Veja nossos links</SheetDescription>
            </SheetHeader>

            <div className="grid flex-1 auto-rows-min gap-4 px-4">
              <nav className="flex flex-col gap-4 mt-4">
                <NavLinks />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
