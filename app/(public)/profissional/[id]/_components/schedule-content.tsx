"use client";

import Image from "next/image";
import imgTeste from "@/public/logo-colorido.png";
import { MapPin } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";
import { useAppointmentForm, AppointmentFormData } from "./schedule-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/formatPhone";
import { DateTimePicker } from "./date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type userWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  professional: userWithServiceAndSubscription;
}

export function ScheduleContent({ professional }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;

  async function handleRegisterAppointment(formData: AppointmentFormData){
    console.log(formData)
  }


  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-orquidea" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center ">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white mb-8">
              <Image
                src={professional.image ? professional.image : imgTeste}
                alt="Foto do profissional"
                className="object-cover"
                fill
              />
            </div>

            <h1 className="text-2xl font-bold mb-2">{professional.name}</h1>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>
                {professional.address
                  ? professional.address
                  : "Endereço não informado"}
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Formulario de agendamento */}
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="mx-2 space-y-6 bg-white p-6 border rounded-md shadow-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-semibold">Nome completo:</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-semibold">Email:</FormLabel>
                <FormControl>
                  <Input id="email" placeholder="Digite seu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-semibold">Telefone:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    placeholder="(01) 2345-6789"
                    onChange={(e) => {
                      const formattedValue = formatPhone(e.target.value);

                      field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-1">
                <FormLabel className="font-semibold">Data do agendamento:</FormLabel>
                <FormControl>
                  <DateTimePicker
                    initialDate={new Date()}
                    className="w-full rounded border p-2"
                    onChange={(date) => {
                        if(date){
                            field.onChange(date)
                        }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold">Selecione um serviço:</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione um serviço"/>
                    </SelectTrigger>
                    <SelectContent>

                        {/* Trazendo os serviços ativos do profissional */}
                        {professional.services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                                {service.name} ( {Math.floor(service.duration /60)}h {service.duration % 60}min )
                            </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {professional.status ? (
            <Button 
            type="submit"
            className="bg-orquidea text-white"
            // monitora se os campos estão preenchidos
            disabled={!watch("name") || !watch("email") || !watch("phone") || !watch("date")}
          >
            Agendar
          </Button>
          ) : (
            <p>Clínica fechada temporariamente</p>
          )}

        </form>
      </Form>
    </div>
  );
}
