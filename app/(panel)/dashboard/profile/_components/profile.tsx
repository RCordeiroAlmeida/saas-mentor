"use client"
import { useState } from "react"
import { ProfileFormData, useProfileForm } from "./profile-form"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import ImgPerfil from '@/public/psicologa.jpg'
import { Clock, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Prisma } from "@/generated/prisma/client";
import { updateProfile } from "../_actions/update-profile"
import { toast } from "sonner";
import { formatPhone } from "@/utils/formatPhone"
import {signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";


type UserWithSubscription = Prisma.UserGetPayload<{
    include: {
        subscription: true;
    }
}>;

interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {

    const router = useRouter()

    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const { update } = useSession();


    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    });

    function generateTimeSlots(): string[] {
        const hours: string[] = [];
        for (let i = 8; i <= 20; i++) {
            for (let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, '0');
                const minute = (j * 30).toString().padStart(2, '0');
                hours.push(`${hour}:${minute}`);
            }
        }
        return hours;
    }

    const hours = generateTimeSlots();

    function toggleHour(hour: string) {
        setSelectedHours((prev) =>
            prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort()
        );
    }

    function timeZones() {
        return Intl.supportedValuesOf('timeZone').filter((zone) =>
            zone.startsWith("America/Sao_Paulo") ||
            zone.startsWith("America/Fortaleza") ||
            zone.startsWith("America/Recife") ||
            zone.startsWith("America/Bahia") ||
            zone.startsWith("America/Belem") ||
            zone.startsWith("America/Manaus") ||
            zone.startsWith("America/Cuiaba") ||
            zone.startsWith("America/Boa_Vista") ||
            zone.startsWith("America/Rio_Branco")
        );
    }

    async function onSubmit(values: ProfileFormData) {
        const response = await updateProfile({
            name: values.name,
            address: values.address,
            phone: values.phone,
            status: values.status === "active" ? true : false,
            timeZone: values.timeZone,
            times: selectedHours || [],
        });

        if (response.error) {
            toast.error(response.error, { richColors: true });
            return;
        }

        toast.success(response.data);
    }

    async function handleLogout(){
        await signOut();
        await update();
        router.replace("/");
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="shadow-lg overflow-hidden pt-0 border border-lavanda/20">

                        {/* ── Header image ── */}
                        <div className="relative h-80 md:h-120">
                            <Image
                                src={user.image ? user.image : ImgPerfil}
                                alt="Foto do usuário"
                                fill
                                quality={100}
                                className="object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-noite/60 via-noite/20 to-transparent" />

                            <div className="flex">
                                <div className="absolute left-6 bottom-5 text-white">
                                    <h3 className="text-2xl font-['Cormorant_Garamond'] font-light drop-shadow">
                                        {form.getValues("name") || "Nome do profissional"}
                                    </h3>
                                    <p className="text-sm opacity-70 tracking-wide">Psicólogo(a) clínico(a)</p>
                                </div>

                                <Pencil className="absolute right-6 bottom-5 h-5 w-5 text-white opacity-70 cursor-pointer hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        {/* ── Form fields ── */}
                        <CardContent className="pt-8 space-y-6 bg-white">

                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs tracking-widest uppercase text-gray-500 font-normal">
                                    Informações do perfil
                                </span>
                                <div className="flex-1 h-px bg-lavanda-light" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                                Nome completo
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Digite o nome completo"
                                                    className="rounded-xl border-lavanda/40 bg-nevoa placeholder:text-gray-400 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                                Endereço
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Digite o endereço"
                                                    className="rounded-xl border-lavanda/40 bg-nevoa placeholder:text-gray-400 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                                Telefone
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="(00) 12345-6789"
                                                    onChange={(e) => {
                                                        const formattedPhone = formatPhone(e.target.value);
                                                        field.onChange(formattedPhone);
                                                    }}
                                                    className="rounded-xl border-lavanda/40 bg-nevoa placeholder:text-gray-400 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Horários */}
                                <div className="space-y-2">
                                    <Label className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                        Horários da clínica
                                    </Label>

                                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between rounded-xl border-lavanda/40 bg-nevoa text-gray-600 hover:bg-lavanda-light hover:border-orquidea hover:text-orquidea transition-colors"
                                            >
                                                Gerenciar horários de atendimento
                                                <Clock className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <div className="p-1">
                                                <DialogHeader className="mb-6">
                                                    <p className="text-xs tracking-widest uppercase text-gray-500 font-normal mb-1">
                                                        Mentor · Perfil
                                                    </p>
                                                    <DialogTitle className="font-['Cormorant_Garamond'] text-3xl font-light text-noite leading-tight">
                                                        Horários de <em className="italic text-orquidea">atendimento</em>
                                                    </DialogTitle>
                                                    <DialogDescription className="text-sm text-gray-500 font-light">
                                                        Clique nos horários para alternar entre disponível e indisponível.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="h-px bg-lavanda-light mb-5" />

                                                <div className="grid grid-cols-5 gap-2">
                                                    {hours.map((hour) => (
                                                        <Button
                                                            key={hour}
                                                            variant="outline"
                                                            type="button"
                                                            className={cn(
                                                                "h-10 rounded-xl text-sm transition-all",
                                                                selectedHours.includes(hour)
                                                                    ? "border-2 border-orquidea bg-lavanda-light text-orquidea font-medium"
                                                                    : "border-lavanda/30 text-gray-500 hover:border-lavanda hover:bg-nevoa"
                                                            )}
                                                            onClick={() => toggleHour(hour)}
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>

                                                <div className="h-px bg-lavanda-light mt-5 mb-4" />

                                                <Button
                                                    className="w-full rounded-xl bg-orquidea hover:bg-orquidea/85 text-white font-medium shadow-[0_4px_14px_rgba(107,79,160,0.3)] transition-all"
                                                    onClick={() => setDialogIsOpen(false)}
                                                >
                                                    Confirmar horários
                                                    {selectedHours.length > 0 && (
                                                        <span className="ml-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                                                            {selectedHours.length} selecionados
                                                        </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                                Status
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value ? "active" : "inactive"}>
                                                    <SelectTrigger className="rounded-xl border-lavanda/40 bg-nevoa focus:ring-orquidea/30 focus:border-orquidea transition-colors">
                                                        <SelectValue placeholder="Selecione o status da clínica" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">✦ Ativo — Clínica aberta</SelectItem>
                                                        <SelectItem value="inactive">○ Inativo — Clínica fechada</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                                Fuso Horário
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="rounded-xl border-lavanda/40 bg-nevoa focus:ring-orquidea/30 focus:border-orquidea transition-colors">
                                                        <SelectValue placeholder="Selecione o fuso horário" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones().map((zone) => (
                                                            <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </CardContent>

                        <CardFooter className="bg-white border-t border-lavanda-light px-6 py-4">
                            <Button
                                type="submit"
                                className="ml-auto rounded-xl bg-orquidea hover:bg-orquidea/85 text-white font-medium px-8 shadow-[0_4px_14px_rgba(107,79,160,0.3)] hover:shadow-[0_6px_20px_rgba(107,79,160,0.4)] hover:-translate-y-px transition-all"
                            >
                                Salvar alterações
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <section className="mt-4">
                <Button
                    variant="destructive"
                    onClick={handleLogout}
                >
                    Sair
                </Button>
            </section>
            
        </div>
    )
}