"use client"

import React, { useState } from "react"
import Link from "next/link"
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const Login = () => {
  const [error, setError] = useState("")
  const { setAuthStatus } = useAuth()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    /* console.log(values) */
    try {
      const session = await appwriteService.login(values)
      if (session) {
        setAuthStatus(true)
      }
    } catch (error: any) {
      setError(error.message)
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
          Sign in to your account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 space-y-8 p-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={buttonVariants({ size: "wide", variant: "outline" })}
              type="submit"
            >
              Login
            </Button>
            <p className="mt-2 text-center text-base text-gray-600">
              Don&apos;t have an account yet?&nbsp;
              <Link
                href="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <p className="mt-2 text-center text-base text-gray-600">
              <Link
                href="/forgotpassword"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
