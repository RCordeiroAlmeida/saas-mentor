"use client"

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-service";
import { Service } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/formatcurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
    services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {

    async function handleDeleteService(serviceId: string){
        const response = await deleteService({serviceId: serviceId})

        if(response.error){
            toast(response.error)
            return
        }

        toast.success(response.data)
    }

    async function handleEditService(service: Service){
        setEditingService(service);
        setIsDialogOpen(true);


    }


    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [editingService, setEditingService] = useState<null | Service>(null);

    const avgPrice = services.length
        ? services.reduce((sum, s) => sum + s.price, 0) / services.length / 100
        : 0;

    const maxDuration = services.length
        ? Math.max(...services.map(s => s.duration ?? 0))
        : 0;

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <section className="max-w-3xl mx-auto px-6 py-12">

                {/* HEADER */}
                <div className="flex items-end justify-between mb-10 gap-4">
                    <div>
                        <h1 className="font-['Cormorant_Garamond'] text-4xl font-light text-noite leading-tight">
                            Meus <em className="italic text-orquidea">serviços</em>
                        </h1>
                    </div>

                    <DialogTrigger asChild>
                        <Button className="flex-shrink-0 flex items-center gap-2 bg-orquidea hover:bg-orquidea/85 text-white rounded-xl px-5 py-2.5 text-sm font-medium shadow-[0_4px_14px_rgba(107,79,160,0.3)] hover:shadow-[0_6px_20px_rgba(107,79,160,0.4)] hover:-translate-y-px transition-all duration-200">
                            <Plus className="w-4 h-4" />
                            Novo serviço
                        </Button>
                    </DialogTrigger>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-lavanda/15">
                        <p className="text-xs tracking-widest uppercase text-sage font-normal mb-1.5">Total</p>
                        <p className="font-['Cormorant_Garamond'] text-3xl font-semibold text-orquidea leading-none">
                            {services.length}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-lavanda/15">
                        <p className="text-xs tracking-widest uppercase text-sage font-normal mb-1.5">Ticket médio</p>
                        <p className="font-['Cormorant_Garamond'] text-3xl font-semibold text-noite leading-none">
                            {services.length ? formatCurrency(avgPrice) : "—"}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-lavanda/15">
                        <p className="text-xs tracking-widest uppercase text-sage font-normal mb-1.5">Mais longo</p>
                        <p className="font-['Cormorant_Garamond'] text-3xl font-semibold text-sage leading-none">
                            {maxDuration ? `${maxDuration} min` : "—"}
                        </p>
                    </div>
                </div>

                {/* LIST LABEL */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs tracking-widest uppercase text-sage font-normal">Cadastrados</span>
                    <div className="flex-1 h-px bg-lavanda-light" />
                </div>

                {/* SERVICES */}
                {services.length === 0 ? (

                    /* EMPTY STATE */
                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-lavanda">
                        <div className="w-14 h-14 bg-lavanda-light rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-6 h-6 text-orquidea" />
                        </div>
                        <h3 className="font-['Cormorant_Garamond'] text-2xl font-normal text-noite mb-2">
                            Nenhum serviço ainda
                        </h3>
                        <p className="text-sm text-orquidea font-light mb-6">
                            Adicione seus serviços para começar a receber agendamentos.
                        </p>
                        <DialogTrigger asChild>
                            <Button className="bg-orquidea hover:bg-orquidea/85 text-white rounded-xl px-6">
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar serviço
                            </Button>
                        </DialogTrigger>
                    </div>

                ) : (

                    <div className="flex flex-col gap-2.5">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-2xl px-6 py-4 flex items-center gap-5 shadow-sm border border-lavanda/10 hover:shadow-md hover:-translate-y-0.5 hover:border-lavanda/30 transition-all duration-200"
                            >
                                {/* Index */}
                                <span className="font-['Cormorant_Garamond'] text-lg font-light text-lavanda opacity-60 w-6 text-center flex-shrink-0">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Dot */}
                                <div className="w-2 h-2 rounded-full bg-sage flex-shrink-0" />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-noite truncate">{service.name}</p>
                                    {service.duration && (
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3 text-sage" />
                                            <span className="text-xs text-sage">{service.duration} min</span>
                                        </div>
                                    )}
                                </div>

                                {/* Price badge */}
                                <span className="bg-lavanda-light text-orquidea text-xs font-medium px-3 py-1 rounded-full flex-shrink-0">
                                    {formatCurrency(service.price / 100)}
                                </span>

                                {/* Actions */}
                                <div className="flex gap-1.5 flex-shrink-0">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleEditService(service)}
                                        className="w-8 h-8 rounded-xl text-orquidea border-lavanda hover:bg-lavanda-light hover:border-orquidea transition-colors"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDeleteService(service.id)}
                                        className="w-8 h-8 rounded-xl text-red-500 border-red-500 hover:bg-red-100 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </section>

            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                    setIsDialogOpen(false);
                    setEditingService(null)
                }}
            >
                <DialogService
                    closeModal={() => {
                        setIsDialogOpen(false);
                        setEditingService(null)
                    }}
                    serviceId={editingService ? editingService.id : undefined}
                    initialValues={editingService ? {
                        name: editingService.name,
                        price: (editingService.price /100).toFixed(2).replace(".", ","),
                        hours: Math.floor(editingService.duration / 60).toString(
                        ),
                        minutes: (editingService.duration % 60).toString(),
                    } : undefined }
                />
            </DialogContent>
        </Dialog>
    )
}