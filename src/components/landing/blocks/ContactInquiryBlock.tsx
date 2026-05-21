"use client";

import React from "react";
import { motion } from "motion/react";
import * as z from "zod";
import type { ContactInquiry as ContactInquiryType } from "@/payload-types";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionReveal } from "@/components/ui/section-reveal";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { BrandText } from "../layout/brand-formatter";
import Eyebrow from "../layout/eyebrow";
import { GenericForm } from "../layout/generic-form";
import { sendInquiryAction } from "@/app/actions";
import { toast } from "sonner";

// Zod schema matching standard enterprise B2B inquiries
const inquiryFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  workEmail: z.string().email("A valid work email is required."),
  company: z.string().min(2, "Company name is required."),
  inquiryDetails: z.string().min(10, "Please provide a brief description of your needs."),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const ContactInquiryBlock: React.FC<ContactInquiryType> = ({
  eyebrow,
  heading,
  description,
  contactMethods,
  formHeading,
  formDescription,
}) => {
  const handleFormSubmit = async (values: InquiryFormValues) => {
    try {
      const result = await sendInquiryAction(values);
      if (result.success) {
        toast.success("Inquiry submitted successfully! We will get back to you shortly.");
      } else {
        toast.error(result.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section className="relative bg-tasto-white text-tasto-black py-16 lg:py-24 z-10">
      <SectionReveal className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          {/* LEFT COLUMN: Contact Information & Methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:col-span-5 items-center md:items-start text-center md:text-start"
          >
            {eyebrow && (
              <motion.div variants={itemVariants}>
                <Eyebrow variant="blue" className="mb-6">
                  {eyebrow}
                </Eyebrow>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <SectionHeading variant="light" as="h2">
                <BrandText text={heading} />
              </SectionHeading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SectionDescription variant="light" className="mt-6 mb-12">
                <BrandText text={description} />
              </SectionDescription>
            </motion.div>

            <div className="flex flex-col gap-4">
              {contactMethods?.map((method, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl border border-tasto-black/5 bg-white/60 p-6 transition-all duration-300 hover:border-tasto-blue/30 hover:bg-white hover:shadow-xs"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tasto-blue/5 text-tasto-blue transition-colors group-hover:bg-tasto-blue/10">
                      <LucideIcon name={method.icon} className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium text-tasto-black/60 mb-1">
                        {method.title}
                      </h4>
                      <p className="text-lg font-semibold text-tasto-black mb-2">{method.value}</p>
                      {method.description && (
                        <p className="text-sm text-tasto-black/40 leading-relaxed">
                          {method.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Inquiry Form Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative lg:sticky lg:top-24 lg:self-start"
          >
            {/* Ambient Backglow for Form Focus */}
            <div className="absolute -inset-4 rounded-[3rem] bg-tasto-blue/5 blur-3xl" />

            <div className="flex flex-col text-center md:text-start relative overflow-hidden rounded-[2rem] border border-tasto-black/5 bg-white/80 p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
              {/* Form Headers */}
              <div className="mb-10">
                <h3 className="text-3xl font-semibold text-tasto-black mb-3">{formHeading}</h3>
                <div className="text-tasto-black/60 text-sm md:text-base leading-relaxed">
                  <BrandText text={formDescription} />
                </div>
              </div>

              {/* Typed Form Integration */}
              <GenericForm<InquiryFormValues>
                title={""}
                schema={inquiryFormSchema}
                defaultValues={{
                  fullName: "",
                  workEmail: "",
                  company: "",
                  inquiryDetails: "",
                }}
                fields={[
                  { name: "fullName", label: "Full Name", placeholder: "e.g. Jane Doe" },
                  {
                    name: "workEmail",
                    label: "Work Email",
                    type: "email",
                    placeholder: "jane@company.com",
                  },
                  { name: "company", label: "Company Name", placeholder: "Organization name" },
                  {
                    name: "inquiryDetails",
                    label: "Inquiry Details",
                    type: "textarea",
                    placeholder: "How can we help transform your operations?",
                  },
                ]}
                submitText="Request Walkthrough"
                onSubmit={handleFormSubmit}
                theme="light"
              />
            </div>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
};
