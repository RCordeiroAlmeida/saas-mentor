"use client"

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DialogService(){
    return (
        <>
            <DialogHeader>
                <DialogTitle>Novo Serviço</DialogTitle>
                <DialogDescription>
                    Preencha os campos abaixo para criar um novo serviço.
                </DialogDescription>
            </DialogHeader>

            <div>
                <h1>
                    Conteúdo do modal
                </h1>
            </div>
        </>
    )
}