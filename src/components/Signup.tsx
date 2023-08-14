"use client"

import React, { useState } from "react"
import Link from "next/link"
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import * as z from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const notify = () => toast("This account already exist!")

const minUserNameLength = 2
const maxUserNameLength = 30
const minPasswordLength = 8
const maxPasswordLength = 30

const formSchema = z
  .object({
    username: z
      .string()
      .min(minUserNameLength, {
        message: `Username must be at least ${minUserNameLength} characters`,
      })
      .max(maxUserNameLength, {
        message: `Username can't be more than ${maxPasswordLength} characters`,
      }),
    email: z.string().email(),
    password: z
      .string()
      .min(minPasswordLength, {
        message: `Password must be at least ${minPasswordLength} characters`,
      })
      .max(maxPasswordLength, {
        message: `Password can't be more than ${maxPasswordLength} characters`,
      }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  })

const Signup = () => {
  const [error, setError] = useState("")
  const { setAuthStatus } = useAuth()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      // Check if user exist before trying create
      const userData = await appwriteService.createUserAccount(values)
      if (userData) {
        console.log("userData", userData)
        setAuthStatus(true)
        toast.success("Signup successful!")
      }
    } catch (error: any) {
      setError(error.message)
      if (error.message.includes("Email already used")) {
        toast.error("Email already exists")
      } else {
        toast.error("An error occurred")
      }
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
          Sign up to create an account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 space-y-8 p-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Displayname</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a displayname" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public displayname
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the email you want to sign up with
                  </FormDescription>
                  <FormMessage />
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
                      placeholder="Choose a password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We recommend using a password generator/manager
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Repeat your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Repeat your password</FormDescription>
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
            <p className="mt-2 text-center text-base text-gray-600">
              Already have an account?&nbsp;
              <Link
                href="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Signup
