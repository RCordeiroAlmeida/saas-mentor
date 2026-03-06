"use client"

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


export function DialogService(){
    const form = useDialogServiceForm()

    async function onSubmit(values: DialogServiceFormData) {
        const priceInCents = convertRealToCents(values.price);

        
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {

        let { value } = event.target;
        value = value.replace(/\D/g, "");

        if(value){
            value = (parseInt(value, 10) / 100).toFixed(2);
            value = value.replace(".", ",");

            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        event.target.value = value;

        form.setValue("price", value);
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Preencha os campos abaixo para criar um novo serviço.
                </DialogDescription>
            </DialogHeader>

           
           <Form {...form}>
                <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Nome do serviço</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ex: Terapia individual" className="placeholder:italic"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )} />
                    
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Valor</FormLabel>
                                    <FormControl>
                                        <Input {...field} onChange={changeCurrency} placeholder="Ex: 120,00" className="placeholder:italic"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )} />
                    </div>

                    <div>
                        <p className="font-semibold">Tempo de duração do serviço</p>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="hours"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Horas:</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="1" min="0" type="number"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                            )} />

                            <FormField
                                control={form.control}
                                name="minutes"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel className="font-semibold">Minutos:</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="0" min="0" max="59" type="number"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                            )} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full font-semibold text-white">Criar serviço</Button>
                </form>
           </Form>
        </>
    )
}