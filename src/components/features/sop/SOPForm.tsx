"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { SOP, SOPInput } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const sopFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }).max(50),
  revisionDate: z.date({ required_error: "Revision date is required." }),
});

type SOPFormValues = z.infer<typeof sopFormSchema>;

interface SOPFormProps {
  sop?: SOP;
  onSubmit: (data: SOPInput) => void;
  isSubmitting?: boolean;
}

export function SOPForm({ sop, onSubmit, isSubmitting }: SOPFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: Partial<SOPFormValues> = sop
    ? {
        title: sop.title,
        description: sop.description,
        category: sop.category,
        revisionDate: new Date(sop.revisionDate),
      }
    : {
        title: "",
        description: "",
        category: "",
        revisionDate: new Date(),
      };

  const form = useForm<SOPFormValues>({
    resolver: zodResolver(sopFormSchema),
    defaultValues,
  });

  function handleFormSubmit(data: SOPFormValues) {
    const sopInput: SOPInput = {
      ...data,
      revisionDate: data.revisionDate.toISOString(),
    };
    onSubmit(sopInput);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SOP Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Guest Check-in Procedure" {...field} />
              </FormControl>
              <FormDescription>A clear and concise title for the SOP.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description / Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed steps and information for this SOP..."
                  className="min-h-[150px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>The main content of the Standard Operating Procedure.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Front Office, Housekeeping" {...field} />
              </FormControl>
              <FormDescription>Categorize this SOP for better organization.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="revisionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Revision Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01") 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The date this SOP was last revised or created.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (sop ? "Saving..." : "Creating...") : (sop ? "Save Changes" : "Create SOP")}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
