"use client"

import React, { useState } from "react"
import Link from "next/link"
import appwriteService from "@/appwrite/config"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const minPolicyLength = 56
const formSchema = z.object({
  policy: z.string().min(minPolicyLength, {
    message: `Policy must be ${minPolicyLength} characters`,
  }),
})

const Policy = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policy: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    /* console.log(values) */
    try {
      console.log(values)
      setIsLoading(true)
      const response = await axios.post(
        "/api/gomaestro/assetpolicy/accounts",
        values
      )
      console.log("Policy send success:", response.data)
      console.log("response.data =", response.data)
    } catch (error: any) {
      console.log("Policy send failed:", error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto rounded-xl bg-primary-foreground p-10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block max-w-[60px]">
            <img src="/favicon.ico" alt="Logo" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Retrieve policy accounts info
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 space-y-8 p-2"
          >
            <FormField
              control={form.control}
              name="policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter policy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={buttonVariants({ size: "wide", variant: "outline" })}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Policy
