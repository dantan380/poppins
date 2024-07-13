import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
 } from "./ui/popover";
import { useReportKids } from "../context/ReportContext";
import familyFetcher from "../utils/dataFetcher/familyFetcher";

 const FormSchema = z.object({
  date: z.date({
    required_error: "A report date is required.",
  }),
});

 export const DatePickerForm = () => {
  const { setKidsInReport } = useReportKids();
  const [message, setMessage] = useState("");

  const fetchKidsInReport = async (inputDate) => {
    const formattedDate = format(inputDate, "yyyy-MM-dd");
    const result = await familyFetcher.getCheckedInWithDate(formattedDate);

    if (result.success) {
      setKidsInReport(result.checkedInChildrenDocs)
    } else if (result.error) {
      setMessage("There is no report for the selected date.")
    }
    setMessage("");
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Date:", data.date);
    fetchKidsInReport(data.date);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Report Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => 
                      date > new Date() || date < new Date ("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a date for the report.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">Generate Check-In Report</Button>
      </form>
      {message && <p>{message}</p>}
    </Form>
  )
 };