"use client"

import * as React from "react"
import axios from "axios"
import { RxCaretSort, RxCheck, RxPlusCircled } from "react-icons/rx"
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const fetcher = (url: any) => axios.get(url).then((res) => res.data)
// Default count is 100 per page
const PAGES = 1
const getKeyPolicyAccounts: SWRInfiniteKeyLoader = (
  pageIndex,
  previousPageData
) => {
  console.log("pageIndex =", pageIndex)
  // reached the end
  if (previousPageData && previousPageData.next_cursor === null) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/gomaestro/assetpolicy/accounts`

  // add the cursor to the API endpoint
  return `/api/gomaestro/assetpolicy/accounts?cursor=${previousPageData.next_cursor}`
}

const wallets = [
  {
    label: "Personal Wallets",
    accounts: [
      {
        label: "All My Wallets",
        value: [],
      },
      {
        label: "Individual Wallet",
        value: "",
      },
    ],
  },
  {
    label: "All Plot Wallets",
    accounts: [],
  },
]

type Account = (typeof wallets)[number]["accounts"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface WalletsProps extends PopoverTriggerProps {}

export default function Wallets({ className }: WalletsProps) {
  const {
    data: pages,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(getKeyPolicyAccounts, fetcher, {
    initialSize: PAGES,
    revalidateIfStale: true,
  })
  const [open, setOpen] = React.useState(false)
  const [showNewAccountDialog, setShowNewAccountDialog] = React.useState(false)
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(
    wallets[0].accounts[0]
  )
  let walletCount = 0
  if (pages) {
    pages.map((page) => {
      page.data.map((account: any) => {
        walletCount++
        wallets[1].accounts.push({
          label: account.account,
          value: account.account,
        })
      })
    })
  }

  return (
    <Dialog open={showNewAccountDialog} onOpenChange={setShowNewAccountDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a wallet"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedAccount.value}.png`}
                alt={selectedAccount.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedAccount.label}
            <RxCaretSort className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search for wallet..." />
              <CommandEmpty>No wallet found.</CommandEmpty>
              {wallets.map((wallet) => (
                <CommandGroup
                  key={wallet.label}
                  heading={wallet.label + " (" + walletCount + ")"}
                >
                  {wallet.accounts.map((wallet) => (
                    <CommandItem
                      key={wallet.value}
                      onSelect={() => {
                        setSelectedAccount(wallet)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${wallet.value}.png`}
                          alt={wallet.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {wallet.label}
                      <RxCheck
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedAccount.value === wallet.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewAccountDialog(true)
                    }}
                  >
                    <RxPlusCircled className="mr-2 h-5 w-5" />
                    Create Account
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create wallet</DialogTitle>
          <DialogDescription>
            Add a new wallet to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Account name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewAccountDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
