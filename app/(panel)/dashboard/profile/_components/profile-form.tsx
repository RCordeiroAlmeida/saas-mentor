import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type UseFormProps } from 'react-hook-form'
import { z } from 'zod'

// a small set of time zones that make sense for this app – expand as needed
export const TIME_ZONES = [
  'America/Sao_Paulo',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney',
] as const;

const profileSchema = z.object({
    name: z.string().min(1, {message: "O nome é obrigatório"}),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timeZone: z.enum(TIME_ZONES, { errorMap: () => ({ message: "Selecione um Fuso horário" }) })
})

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm(props?: UseFormProps<ProfileFormData>){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues:{
            name: "",
            address: "",
            phone: "",
            status: "ATIVO",
            timeZone: TIME_ZONES[0],
            ...(props?.defaultValues ?? {}),
        },
        ...props,
    })
}