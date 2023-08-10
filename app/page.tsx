import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {/* Unlock the Virtual World with our Toolkit:
          <br className="hidden sm:inline" />
          Your Ultimate Destination for{" "}
          <span className="text-blue-500">
            <Link
              href={siteConfig.links.smartplaces}
              target="_blank"
              rel="noreferrer"
            >
              Smart Places
            </Link>
          </span>{" "}
          Land Plot Insights! */}
          Welcome to <span className="text-blue-500">Smart Places Toolkit</span>
        </h1>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Imagine a world where hexagonal plots of digital land span the
            globe, each one a unique gem, minted on the Cardano blockchain.
          </p>
          <p className="mt-4">
            Now, picture yourself at the forefront of this digital frontier,
            equipped with tools that illuminate the virtual landscape in ways
            you&apos;ve never thought possible. That&apos;s exactly what Smart
            Places Toolkit offers – a comprehensive platform to explore,
            analyze, and manage these digital plots. 🌍🔍
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-8 md:text-3xl">
          📊 Real-time Insights at Your Fingertips
        </h2>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Stay ahead of the curve with our real-time statistics. Discover how
            many land plots have been minted in the past hour, day, week, month,
            3 months, 6 months, and year - both globally and tailored to your
            interests. Whether you&apos;re an investor, enthusiast, or curious
            explorer, Smart Places Toolkit empowers you with up-to-the-minute
            insights that keep you informed.
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-8 md:text-3xl">
          🌎 Dive into Global Diversity
        </h2>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Embark on a journey through a myriad of countries and places that
            make up this virtual universe. Uncover the number of land plots
            minted in each country and explore the unique landscapes they
            represent. Dive deeper into individual places to see the richness of
            this digital tapestry and witness the creativity of the community.
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-8 md:text-3xl">
          🗺️ Connect with Coordinates
        </h2>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Ever wondered what lies beyond the coordinates of a digital land
            plot? Smart Places Toolkit seamlessly integrates with the Google
            Maps API to paint a vivid picture of each hexagonal wonder. Immerse
            yourself in photos, reviews, and points of interest, right from the
            comfort of your screen. Whether you&apos;re planning an adventure or
            satisfying your curiosity, Smart Places Toolkit has you covered.
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-8 md:text-3xl">
          🚀 Personalized Insights Await:
        </h2>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Take control of your journey by connecting your blockchain wallet or
            providing a wallet address. Uncover tailored statistics that reflect
            your contributions and interests. Dive into your individual impact
            and explore your influence on the digital world.
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-8 md:text-3xl">
          🧠 AI-Powered Management
        </h2>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Smart Places Toolkit doesn&apos;t stop at insights - it&apos;s also
            your AI-powered assistant for managing land plot descriptions and
            activities. Watch as the app transforms raw data into compelling
            narratives, showcasing the stories behind each digital gem. Immerse
            yourself in the virtual culture and community thriving on these
            hexagonal plots.
          </p>
        </div>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Smart Places Toolkit isn&apos;t just an app; it&apos;s a portal to a
            dynamic, ever-evolving world. Are you ready to unravel the mysteries
            of the blockchain-based landscape? Join us on Smart Places Toolkit
            and embark on a journey that blends technology, exploration, and
            community like never before.
          </p>
        </div>
        <div className="max-w-[700px] text-lg text-muted-foreground">
          <p className="mt-4">
            Adventure awaits – start exploring with Smart Places Toolkit today!
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.signup}
          /* target="_blank" */
          rel="noreferrer"
          className={buttonVariants()}
        >
          Sign Up
        </Link>
        <Link
          href={siteConfig.links.smartplaces}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Visit the Smart Places project
        </Link>
      </div>
    </section>
  )
}
