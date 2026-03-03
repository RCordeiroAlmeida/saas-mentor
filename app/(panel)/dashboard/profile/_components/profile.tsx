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


type UserWithSubscription = Prisma.UserGetPayload<{
    include:{
        subscription: true;
    }
}>;
    
interface ProfileContentProps {
    user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {


    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const form = useProfileForm({
        name: user.name,
        address: user.address,
        phone: user.phone,
        status: user.status,
        timeZone: user.timeZone
    });

    function generateTimeSlots(): string[] {
        const hours: string[] = [];
        for(let i=8; i<=20; i++){
            for(let j=0; j<2; j++){
                const hour = i.toString().padStart(2, '0');
                const minute = (j*30).toString().padStart(2, '0');

                hours.push(`${hour}:${minute}`);
            }
            
        }

        return hours;
    }

    const hours = generateTimeSlots();
    // console.log(hours);

    function toggleHour(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort());
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
            zone.startsWith("America/Boa_Vista")||
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

        if(response.error){
            toast.error(response.error, {
                richColors: true,
            });
            return;
        }

        toast.success(response.data);

    }

    return(
        <div className="mx-auto max-w-5xl px-4 py-8">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow-lg overflow-hidden pt-0">

                {/* ── Header image ── */}
                <div className="relative h-80 md:h-120">
                    <Image
                        src={user.image ? user.image : ImgPerfil}
                        alt="Foto do usuário"
                        fill
                        quality={100}
                        className=" object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="flex">
                        <div className="absolute left-6 bottom-5 text-white">
                            <h3 className="text-2xl font-bold drop-shadow ">
                                {form.getValues("name") || "Nome do profissional"}
                            </h3>
                            <p className="text-sm opacity-80">Psicólogo(a) clínico(a)</p>
                        </div>

                        <Pencil className="absolute right-6 bottom-5 h-5 w-5 text-white opacity-80 cursor-pointer hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* ── Form fields ── */}
                <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Nome completo</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome completo"/>
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Endereço</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o endereço"/>
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Telefone</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                        placeholder="(00) 12345-6789" onChange={ (e) =>{
                                            const formattedPhone = formatPhone(e.target.value);
                                            field.onChange(formattedPhone);
                                        }} />
                                    </FormControl>
                                    
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <Label className="font-semibold">
                                Horarios da clínica
                            </Label>

                            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full justify-between" variant="outline">
                                        Gerenciar horários de atendimento
                                        <Clock className="mr-2" />
                                    </Button>
                                </DialogTrigger>


                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Horários de atendimento</DialogTitle>
                                        <DialogDescription>
                                            Configure os horários disponíveis para atendimento. 
                                        </DialogDescription>
                                    </DialogHeader>

                                    <section className="py-4">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Clique nos horários abaixo para alternar entre disponível e indisponível. 
                                        </p>

                                        <div className="grid grid-cols-5 gap-2">
                                            {hours.map((hour) => (
                                                <Button
                                                    key={hour}
                                                    variant="outline"
                                                    className={cn('h-10', selectedHours.includes(hour) && 'border-2 border-violet-500 text-primary')}
                                                    onClick={() => toggleHour(hour)}
                                                >
                                                    {hour}
                                                </Button>
                                            ))}
                                        </div>
                                    </section>

                                    <Button className=" bg-violet-500 hover:bg-violet-600  duration-400 text-white" onClick={() => setDialogIsOpen(false) }>Fechar</Button>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="font-semibold">Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={
                                            field.value ? "active" : "inactive"
                                        }>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o status da clínica" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Ativo (Clínica aberta)</SelectItem>
                                                <SelectItem value="inactive">Inativo (Clínica fechada)</SelectItem>
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
                                <FormItem >
                                    <FormLabel className="font-semibold">Fuso Horário</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={
                                            field.value
                                        }>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o fuso horário da clínica" />
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

                <CardFooter>
                    <Button type="submit" className="ml-auto bg-violet-500 hover:bg-violet-600  duration-400 text-white">
                        Salvar alterações
                    </Button>
                </CardFooter>
            </Card>
        </form>
    </Form>
</div>
    )
}