"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"



console.log(auth);

const formSchema = z.object({
    
   serviceId: z.string().min(1, "O id do serviço é obrigatório")
})

type FormSchema = z.infer<typeof formSchema>

export async function deleteService(formData: FormSchema){
    
    const session = await auth();
    
    if(!session?.user?.id){
        return {
            error: "Falha ao deletar serviço: usuário não logado"
        }
    }

    const schema = formSchema.safeParse(formData);

    if(!schema.success){
        return {
            error: schema.error.issues[0].message
        }
    }

    try{
        // Lógica para deletr o servço
        await prisma.service.update({
            where:{
                id: formData.serviceId,
                userId: session?.user?.id,
            },

            data:{
                status: false
            }
        })

        revalidatePath("/dashboard/services")

        return{
            data: "Serviço deletado"
        }

    }catch(err){
        // console.log(err)
        return{
            error: "falha ao deletar o serviço"
        }
            
    }

}

