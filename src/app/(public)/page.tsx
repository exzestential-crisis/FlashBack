// src/app/page.tsx
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { AnimatedButton, LightButton } from "@/components/ui";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />

      {/* Body */}
      <div className="relative flex flex-col min-h-screen justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="flex flex-col lg:grid lg:grid-cols-3 w-full max-w-6xl">
            {/* Mascot */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start lg:ps-10 mb-8 lg:mb-0">
              <img
                src="http://placehold.co/500"
                alt="Mascot"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] object-contain"
              />
            </div>

            {/* Introduction */}
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-10 px-4">
                FlashBack helps you master anything, anytime,
                <br className="hidden sm:block" />
                one digital card at a time.
              </h2>
              <div className="w-full space-y-4 max-w-xs sm:max-w-sm lg:w-60">
                <Link href="/signup">
                  <AnimatedButton
                    text="Get Started"
                    fullWidth
                    style="my-2 sm:my-4"
                  />
                </Link>
                <Link href="/login">
                  <LightButton
                    text="I already have an account"
                    fullWidth
                    style="my-2 sm:my-4"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Body - Feature Links */}
        <div className="hidden sm:block absolute bottom-0 w-full left-0 right-0">
          <div className="flex justify-center items-center px-4">
            <div className="grid grid-cols-4 gap-4 sm:gap-8 lg:gap-20 justify-items-center py-6 sm:py-8 lg:py-10 w-full max-w-4xl">
              <p className="cursor-pointer text-xs sm:text-sm lg:text-base text-center">
                Flashcards
              </p>
              <p className="cursor-pointer text-xs sm:text-sm lg:text-base text-center">
                Study Mode
              </p>
              <p className="cursor-pointer text-xs sm:text-sm lg:text-base text-center">
                Quizzes
              </p>
              <p className="cursor-pointer text-xs sm:text-sm lg:text-base text-center">
                Match Mode
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Blocks */}
      <div className="value-blocks-container px-4 sm:px-6 lg:px-8">
        {/* Study Smarter */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 py-10 sm:py-16 lg:py-20 max-w-6xl mx-auto">
          <div className="lg:col-span-2 flex justify-center lg:justify-end mb-6 lg:mb-0">
            <img
              src="http://placehold.co/500"
              alt="Brain"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] object-contain"
            />
          </div>
          <div className="lg:col-span-3 h-full flex items-center justify-center">
            <div className="text-center lg:text-left">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3">
                Study smarter, not harder.
              </h4>
              <h5 className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400">
                Master topics with intelligent flashcards that adapt to how well
                <br className="hidden lg:block" />
                you know the material—so you focus where it matters most.
              </h5>
            </div>
          </div>
        </div>

        {/* Review Fast */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 py-10 sm:py-16 lg:py-20 max-w-6xl mx-auto">
          <div className="lg:col-span-3 h-full flex items-center justify-center mb-6 lg:mb-0">
            <div className="text-center lg:text-left">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3">
                Review in minutes, retain for life.
              </h4>
              <h5 className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400">
                Whether you've got 5 minutes or 50, Flashback helps you lock in
                <br className="hidden lg:block" />
                knowledge with fast, focused review sessions.
              </h5>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <img
              src="http://placehold.co/500"
              alt="Clock"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Access Anywhere */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 py-10 sm:py-16 lg:py-20 max-w-6xl mx-auto">
          <div className="lg:col-span-2 flex justify-center lg:justify-end mb-6 lg:mb-0">
            <img
              src="http://placehold.co/500"
              alt="Access"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px] object-contain"
            />
          </div>
          <div className="lg:col-span-3 h-full flex items-center justify-center">
            <div className="text-center lg:text-left">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3">
                Your memory, on demand.
              </h4>
              <h5 className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400">
                Access your flashcards anytime, anywhere. Perfect for cramming
                <br className="hidden lg:block" />
                before class or brushing up while in line for coffee.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
