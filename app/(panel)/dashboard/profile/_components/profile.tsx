"use client"

import { useProfileForm, TIME_ZONES } from "./profile-form"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
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

import ImgPerfil from '@/public/psicologa.jpg'

export function ProfileContent(){

    const form = useProfileForm();

    const onSubmit = (data: any) => {
        // TODO: replace console.log with API call
        console.log("submitted profile:", data);
    };

    return(
        <div className="mx-auto max-w-5xl px-4 py-12">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow-lg overflow-hidden pt-0">

                {/* ── Header image ── */}
                <div className="relative h-120">
                    <Image
                        src={ImgPerfil}
                        alt="Foto do usuário"
                        fill
                        className=" object-cover object-[50%_35%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute left-6 bottom-5 text-white">
                        <h3 className="text-2xl font-bold drop-shadow">
                            {form.getValues("name") || "Nome do profissional"}
                        </h3>
                        <p className="text-sm opacity-80">Psicólogo(a) clínico(a)</p>
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
                                        <Input {...field} placeholder="Digite o telefone"/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
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
                    </div>
                </CardContent>

                <CardFooter>
                    <Button type="submit" className="ml-auto">
                        Salvar alterações
                    </Button>
                </CardFooter>
            </Card>
        </form>
    </Form>
</div>
    )
}