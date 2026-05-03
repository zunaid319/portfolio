import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Message sent successfully", {
      description: "I'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <section className="py-24 bg-black relative" id="contact">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Let's <span className="text-primary italic">Create.</span></h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Have a project in mind? Looking for career advice? Let's discuss how we can work together.
            </p>

            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <SiFiverr className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <SiUpwork className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900/50 p-8 border border-white/5"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-400 uppercase tracking-wider text-xs">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 h-12 text-lg placeholder:text-neutral-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-400 uppercase tracking-wider text-xs">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" className="bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 h-12 text-lg placeholder:text-neutral-700" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-400 uppercase tracking-wider text-xs">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 min-h-[120px] text-lg resize-none placeholder:text-neutral-700" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none h-14 text-sm font-bold uppercase tracking-widest transition-colors duration-300">
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
