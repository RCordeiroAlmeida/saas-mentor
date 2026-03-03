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
    timeZone: z.string().min(1, {message: "O fuso horário é obrigatório"})
})

interface UseProfileFormProps{
    name: string | null;
    address: string | null;
    phone: string | null;
    status: boolean;
    timeZone: string | null;
}

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({name, address, phone, status, timeZone}: UseProfileFormProps){
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues:{
            name: name || "",
            address: address || "",
            phone: phone || "",
            status: status ? "active" : "inactive",
            timeZone: timeZone || "",
        },
    })
}