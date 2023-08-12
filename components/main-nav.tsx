"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

const useMediaQuery = (width: any) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    if (media.addEventListener) {
      media.addEventListener("change", updateTarget)
    } else {
      // compatibility for browser that dont have addEventListener
      media.addListener(updateTarget)
    }
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }
    if (media.removeEventListener) {
      return () => media.removeEventListener("change", updateTarget)
    } else {
      // compatibility for browser that dont have removeEventListener
      return () => media.removeListener(updateTarget)
    }
  }, [updateTarget, width])

  return targetReached
}

export function MainNav({ items }: MainNavProps) {
  const isBreakpoint = useMediaQuery(500)
  console.log("isBreakpoint =", isBreakpoint)
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-2 w-2" />
        <span className="inline-block font-bold">
          {/* {isBreakpoint ? siteConfig.shortname : siteConfig.name} */}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
