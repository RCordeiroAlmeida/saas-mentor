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


export function SideBarDashboard( {children}: {children: React.ReactNode}){
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            <aside className={clsx("flex flex-col border-r bg-gradient-to-b from-violet-600 to-violet-700 transition-all duration-500 h-full shadow-xl", {
                "w-20 p-2": isCollapsed,
                "w-64 p-5": !isCollapsed,
                "hidden md:flex md:fixed": true
            })}>

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
                <Button className={clsx('text-white transition-all duration-400 backdrop-blur-sm border border-white/20 rounded-lg', {
                    'bg-white/20 hover:bg-white/30 self-center mb-2': isCollapsed,
                    'bg-white/20 hover:bg-white/30 self-end mb-4': !isCollapsed
                })} onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? <ChevronRight className="h-5 w-5"/> : <ChevronLeft className="h-5 w-5"/>}
                </Button>

                <nav className={clsx("flex flex-col overflow-hidden transition-all duration-500 mt-6", {
                    "gap-1": isCollapsed,
                    "gap-2": !isCollapsed
                })}>
                    {!isCollapsed && (
                        <span className="text-xs text-white/70 font-bold tracking-widest uppercase px-3 py-2">
                            Painel 
                        </span>
                    )}

                    <SideBarLink
                        href="/dashboard"
                        label="Dashboard"
                        icon={<LayoutDashboard className="h-6 w-6"/>}
                        pathname={pathname}
                        isCollapsed={isCollapsed}
                    ></SideBarLink>

                    <SideBarLink
                        href="/dashboard/services"
                        label="Serviços"
                        icon={<Folder className="h-6 w-6"/>}
                        pathname={pathname}
                        isCollapsed={isCollapsed}
                    ></SideBarLink>

                    {!isCollapsed && (
                        <span className="text-xs text-white/70 font-bold tracking-widest uppercase px-3 py-2 mt-2">
                            Configurações 
                        </span>
                    )}

                    <SideBarLink
                        href="/dashboard/profile"
                        label="Perfil"
                        icon={<Settings className="h-6 w-6"/>}
                        pathname={pathname}
                        isCollapsed={isCollapsed}
                    ></SideBarLink>

                    <SideBarLink
                        href="/dashboard/plans"
                        label="Planos"
                        icon={<Banknote className="h-6 w-6"/>}
                        pathname={pathname}
                        isCollapsed={isCollapsed}
                    ></SideBarLink>
                </nav>

            </aside>

            <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
                "md:ml-20": isCollapsed,
                "md:ml-64": !isCollapsed
            })}>
                <header className="md:hidden flex items-center justify-between p-4 border-b-2 border-white/20 z-10 sticky top-0 bg-gradient-to-r from-violet-600 to-violet-700 shadow-lg">
                    <Sheet>
                        <div className="flex items-center gap-4">
                            <SheetTrigger asChild>
                                <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg transition-all duration-300">
                                    <List className="h-5 w-5"/>
                                </Button>
                            </SheetTrigger>

                            <h1 className="text-base font-bold text-white tracking-wide">Mentor</h1>
                        </div>

                        <SheetContent className="sm:max-w-xs bg-gradient-to-b from-violet-600 to-violet-700 shadow-lg">
                            <SheetHeader className="border-b pb-4 mb-4">
                                <div className="flex items-center justify-center mb-2">
                                    <Image
                                        src={LogoBranco}
                                        alt="Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </div>
                                <SheetTitle className="text-center text-white/70">Menu de Navegação</SheetTitle>
                                <SheetDescription className="text-center text-white/70">Acesse todas as funcionalidades</SheetDescription>
                            </SheetHeader>

                            <nav className="flex flex-col gap-4 px-4 ">
                                <div>
                                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest px-2 py-2 mb-2">
                                        Painel
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <SideBarLink
                                            href="/dashboard"
                                            label="Dashboard"
                                            icon={<LayoutDashboard className="h-5 w-5"/>}
                                            pathname={pathname}
                                            isCollapsed={false}
                                        ></SideBarLink>

                                        <SideBarLink
                                            href="/dashboard/services"
                                            label="Serviços"
                                            icon={<Folder className="h-5 w-5"/>}
                                            pathname={pathname}
                                            isCollapsed={false}
                                        ></SideBarLink>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest px-2 py-2 mb-2">
                                        Configurações
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <SideBarLink
                                            href="/dashboard/profile"
                                            label="Perfil"
                                            icon={<Settings className="h-5 w-5"/>}
                                            pathname={pathname}
                                            isCollapsed={false}
                                        ></SideBarLink>

                                        <SideBarLink
                                            href="/dashboard/plans"
                                            label="Planos"
                                            icon={<Banknote className="h-5 w-5"/>}
                                            pathname={pathname}
                                            isCollapsed={false}
                                        ></SideBarLink>
                                    </div>
                                </div>
                            </nav>
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
    href: string,
    icon: React.ReactNode,
    label: string,
    pathname: string,
    isCollapsed: boolean
}

function SideBarLink({href, icon, label, pathname, isCollapsed}: SideBarLinkProps){
    return(
        <Link
            href={href}
        >
            <div className={clsx("flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium", {
                "text-white bg-white/20 shadow-md backdrop-blur-sm border border-white/30": pathname === href,
                "text-white/80 hover:bg-white/10 hover:text-white": pathname !== href,
            })} >
                <span className="w-6 h-6 flex-shrink-0">{icon}</span>
                {!isCollapsed && <span className="text-sm truncate">{label}</span>}
            </div>
        </Link>
    )
}