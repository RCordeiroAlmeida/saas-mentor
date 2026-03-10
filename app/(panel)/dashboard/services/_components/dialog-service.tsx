"use client"

import { useState } from "react"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogServiceFormData, useDialogServiceForm } from "./dialog-service-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { convertRealToCents } from "@/utils/convertCurrency"
import { createNewService } from "../_actions/create-service"
import { toast } from "sonner"
import { updateService } from "../_actions/update-service"

interface DialogServiceProps {
    closeModal: () => void;
    serviceId?: string;
    initialValues?: {
        
        name: string,
        price: string,
        hours: string,
        minutes: string,
    }
}

export function DialogService({ closeModal, initialValues, serviceId}: DialogServiceProps) {
    const form = useDialogServiceForm({initialValues: initialValues})
    const [loading, setLoading] = useState(false)

    async function onSubmit(values: DialogServiceFormData) {
        setLoading(true)
        const priceInCents = convertRealToCents(values.price);
        const hours = parseInt(values.hours) || 0;
        const minutes = parseInt(values.minutes) || 0;
        const duration = (hours * 60) + minutes;

        if(serviceId){
            await editServiceById({
                serviceId: serviceId,
                name: values.name,
                priceInCents: priceInCents,
                duration: duration
            })

            return;
        }

        const response = await createNewService({
            name: values.name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false);

        if (response.error) {
            toast.error(response.error)
            return;
        }

        toast.success("Serviço cadastrado com sucesso");
        handleCloseModal();
    }

    async function editServiceById({serviceId, name, priceInCents, duration}: {serviceId: string, name: string, priceInCents: number, duration: number}){
        const response = await updateService({
            serviceId: serviceId,
            name: name,
            price: priceInCents,
            duration: duration
        })

        setLoading(false);

        if(response.error){
            toast.error(response.error)
            return;
        }

        toast.success(response.data)
        handleCloseModal();

    }

    function handleCloseModal() {
        form.reset();
        closeModal();
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
        let { value } = event.target;
        value = value.replace(/\D/g, "");

        if (value) {
            value = (parseInt(value, 10) / 100).toFixed(2);
            value = value.replace(".", ",");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        event.target.value = value;
        form.setValue("price", value);
    }

    return (
        <div className="p-1">
            <DialogHeader className="mb-6">
                <p className="text-xs tracking-widest uppercase text-gray-500 font-normal mb-1">
                    Mentor · Serviços
                </p>
                <DialogTitle className="font-['Cormorant_Garamond'] text-3xl font-light text-noite leading-tight">
                    Novo <em className="italic text-orquidea">serviço</em>
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500 font-light">
                    Preencha os campos abaixo para cadastrar um novo serviço.
                </DialogDescription>
            </DialogHeader>

            <div className="h-px bg-lavanda-light mb-6" />

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

                    {/* Nome */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                    Nome do serviço
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Ex: Terapia individual"
                                        className="rounded-xl border-lavanda/40 bg-nevoa placeholder:italic placeholder:text-gray-500/50 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Valor */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs tracking-widest uppercase text-gray-500 font-medium">
                                    Valor
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium pointer-events-none">
                                            R$
                                        </span>
                                        <Input
                                            {...field}
                                            onChange={changeCurrency}
                                            placeholder="0,00"
                                            className="pl-10 rounded-xl border-lavanda/40 bg-nevoa placeholder:italic placeholder:text-gray-500/50 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Duração */}
                    <div>
                        <p className="text-xs tracking-widest uppercase text-gray-500 font-medium mb-2">
                            Duração
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-gray-500 font-normal">Horas</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    placeholder="0"
                                                    min="0"
                                                    type="number"
                                                    className="rounded-xl border-lavanda/40 bg-nevoa pr-10 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                                />
                                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">h</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="minutes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-gray-500 font-normal">Minutos</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    placeholder="0"
                                                    min="0"
                                                    max="59"
                                                    type="number"
                                                    className="rounded-xl border-lavanda/40 bg-nevoa pr-10 focus-visible:ring-orquidea/30 focus-visible:border-orquidea transition-colors"
                                                />
                                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">min</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="h-px bg-lavanda-light" />

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                            className="flex-1 rounded-xl border-lavanda text-gray-500 hover:bg-lavanda-light hover:border-orquidea hover:text-orquidea transition-colors"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl bg-orquidea hover:bg-orquidea/85 text-white font-medium shadow-[0_4px_14px_rgba(107,79,160,0.3)] hover:shadow-[0_6px_20px_rgba(107,79,160,0.4)] transition-all"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Cadastrando...
                                </span>
                            ) : serviceId ? "Atualizar serviço" : "Cadastrar"}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    )
}