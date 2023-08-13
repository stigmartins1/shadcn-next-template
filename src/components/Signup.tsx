"use client"

import React, { useState } from "react"
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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

const minUserNameLength = 2
const maxUserNameLength = 30
const minPasswordLength = 5
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
  const [showPassword, setShowPassword] = useState(false)
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
    /* console.log(values) */
    try {
      const userData = await appwriteService.createUserAccount(values)
      if (userData) {
        console.log("userData", userData)
        setAuthStatus(true)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
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
              <FormDescription>This is your public displayname</FormDescription>
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
                Enter a password with at least 1 uppercase and 1 special
                character
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Signup
