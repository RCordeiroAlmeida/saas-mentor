"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Banknote, ChevronLeft, ChevronRight, Folder, LayoutDashboard, List, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LogoTexto from "../../../public/logo-w-text.png"
import LogoBranco from "../../../public/logo-mentor.png"


export function SideBarDashboard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            <aside className={clsx(
                "flex flex-col border-r border-lavanda/20 bg-gradient-to-b from-orquidea to-noite transition-all duration-500 h-full shadow-xl",
                {
                    "w-20 p-2": isCollapsed,
                    "w-64 p-5": !isCollapsed,
                    "hidden md:flex md:fixed": true
                }
            )}>

                {/* Logo */}
                <div className={clsx("relative w-full flex items-center justify-center transition-all duration-500", {
                    "h-16 mb-2": isCollapsed,
                    "h-20 mb-4": !isCollapsed
                })}>
                    <div className={clsx("absolute transition-all duration-500 ease-in-out", {
                        "opacity-100 scale-100": !isCollapsed,
                        "opacity-0 scale-75 pointer-events-none": isCollapsed
                    })}>
                        <Image
                            src={LogoTexto}
                            alt="Logo"
                            width={160}
                            height={50}
                            className="object-contain drop-shadow-lg"
                        />
                    </div>

                    <div className={clsx("absolute transition-all duration-500 ease-in-out transform", {
                        "opacity-0 scale-50": !isCollapsed,
                        "opacity-100 scale-100": isCollapsed
                    })}>
                        <Image
                            src={LogoBranco}
                            alt="Logo branco"
                            width={40}
                            height={40}
                            className="object-contain drop-shadow-lg"
                        />
                    </div>
                </div>

                {/* Collapse button */}
                <Button
                    className={clsx(
                        "text-white transition-all duration-300 backdrop-blur-sm border border-white/15 rounded-xl bg-white/10 hover:bg-white/20",
                        {
                            "self-center mb-2": isCollapsed,
                            "self-end mb-6": !isCollapsed
                        }
                    )}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>

                {/* Nav */}
                <nav className={clsx("flex flex-col overflow-hidden transition-all duration-500", {
                    "gap-1": isCollapsed,
                    "gap-1.5": !isCollapsed
                })}>
                    {!isCollapsed && (
                        <span className="text-xs text-white/40 font-normal tracking-widest uppercase px-3 py-2">
                            Painel
                        </span>
                    )}

                    <SideBarLink href="/dashboard" label="Dashboard" icon={<LayoutDashboard className="h-5 w-5" />} pathname={pathname} isCollapsed={isCollapsed} />
                    <SideBarLink href="/dashboard/services" label="Serviços" icon={<Folder className="h-5 w-5" />} pathname={pathname} isCollapsed={isCollapsed} />

                    {!isCollapsed && (
                        <span className="text-xs text-white/40 font-normal tracking-widest uppercase px-3 py-2 mt-3">
                            Configurações
                        </span>
                    )}

                    <SideBarLink href="/dashboard/profile" label="Perfil" icon={<Settings className="h-5 w-5" />} pathname={pathname} isCollapsed={isCollapsed} />
                    <SideBarLink href="/dashboard/plans" label="Planos" icon={<Banknote className="h-5 w-5" />} pathname={pathname} isCollapsed={isCollapsed} />
                </nav>

                {/* Bottom accent */}
                {!isCollapsed && (
                    <div className="mt-auto pt-6">
                        <div className="h-px bg-white/10 mb-4" />
                        <p className="text-xs text-white/30 font-['Cormorant_Garamond'] italic text-center tracking-wide">
                            Mentor
                        </p>
                    </div>
                )}
            </aside>

            {/* Main content */}
            <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
                "md:ml-20": isCollapsed,
                "md:ml-64": !isCollapsed
            })}>

                {/* Mobile header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-lavanda/20 z-10 sticky top-0 bg-gradient-to-r from-orquidea to-noite shadow-lg">
                    <Sheet>
                        <div className="flex items-center gap-4">
                            <SheetTrigger asChild>
                                <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl transition-all duration-300">
                                    <List className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <h1 className="font-['Cormorant_Garamond'] text-lg font-light text-white tracking-widest italic">
                                Mentor
                            </h1>
                        </div>

                        <SheetContent className="sm:max-w-xs bg-gradient-to-b from-orquidea to-noite border-r border-lavanda/20 shadow-xl">
                            <SheetHeader className="border-b border-white/10 pb-5 mb-5">
                                <div className="flex items-center justify-center mb-3">
                                    <Image src={LogoBranco} alt="Logo" width={40} height={40} className="object-contain" />
                                </div>
                                <SheetTitle className="text-center font-['Cormorant_Garamond'] text-xl font-light text-white">
                                    Menu de Navegação
                                </SheetTitle>
                                <SheetDescription className="text-center text-white/40 text-xs tracking-wide">
                                    Acesse todas as funcionalidades
                                </SheetDescription>
                            </SheetHeader>

                            <nav className="flex flex-col gap-4 px-2">
                                <div>
                                    <p className="text-xs text-white/40 font-normal uppercase tracking-widest px-3 py-2 mb-1">
                                        Painel
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                        <SideBarLink href="/dashboard" label="Dashboard" icon={<LayoutDashboard className="h-5 w-5" />} pathname={pathname} isCollapsed={false} />
                                        <SideBarLink href="/dashboard/services" label="Serviços" icon={<Folder className="h-5 w-5" />} pathname={pathname} isCollapsed={false} />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-white/40 font-normal uppercase tracking-widest px-3 py-2 mb-1">
                                        Configurações
                                    </p>
                                    <div className="flex flex-col gap-1.5">
                                        <SideBarLink href="/dashboard/profile" label="Perfil" icon={<Settings className="h-5 w-5" />} pathname={pathname} isCollapsed={false} />
                                        <SideBarLink href="/dashboard/plans" label="Planos" icon={<Banknote className="h-5 w-5" />} pathname={pathname} isCollapsed={false} />
                                    </div>
                                </div>
                            </nav>

                            <div className="absolute bottom-6 left-0 right-0 text-center">
                                <p className="text-xs text-white/20 font-['Cormorant_Garamond'] italic tracking-wide">
                                    Mentor
                                </p>
                            </div>
                        </SheetContent>
                    </Sheet>
                </header>

                <main className="flex-1 py-4 px-2 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

interface SideBarLinkProps {
    href: string
    icon: React.ReactNode
    label: string
    pathname: string
    isCollapsed: boolean
}

function SideBarLink({ href, icon, label, pathname, isCollapsed }: SideBarLinkProps) {
    const isActive = pathname === href

    return (
        <Link href={href}>
            <div className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium",
                {
                    "bg-white/15 text-white shadow-sm border border-white/20 backdrop-blur-sm": isActive,
                    "text-white/60 hover:bg-white/8 hover:text-white/90": !isActive,
                    "justify-center": isCollapsed,
                }
            )}>
                <span className={clsx("flex-shrink-0 transition-colors", {
                    "text-sage": isActive,
                    "text-white/60": !isActive
                })}>
                    {icon}
                </span>
                {!isCollapsed && (
                    <span className="text-sm truncate">{label}</span>
                )}
                {isActive && !isCollapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                )}
            </div>
        </Link>
    )
}