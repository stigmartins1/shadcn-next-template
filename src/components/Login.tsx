"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const { setAuthStatus } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const session = await appwriteService.login(formData)
      if (session) {
        setAuthStatus(true)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl bg-gray-200/50 p-10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">
            <img src="/favicon.ico" alt="Logo" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don&apos;t have an account yet?&nbsp;
          <Link
            href="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={login} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  id="password"
                  required
                />
                <button
                  className="absolute inset-y-0 right-0 w-16"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-700/70"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
