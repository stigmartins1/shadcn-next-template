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

const minAccountLength = 56
const formSchema = z.object({
  account: z.string().min(minAccountLength, {
    message: `Account must be ${minAccountLength} characters`,
  }),
})

const AccountAssets = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
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
        "/api/gomaestro/accounts/assets",
        values
      )
      console.log("Account send success:", response.data)
      //console.log("response.data =", response.data)
    } catch (error: any) {
      console.log("Account send failed:", error.message)
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
          Account assets
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 space-y-8 p-2"
          >
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account" {...field} />
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

export default AccountAssets
