import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const sections = [
  {
    title: "Core Features",
    items: [
      "Smart Flashcards",
      "Spaced Repetition",
      "Personalized Study Paths",
      "Progress Tracking",
      "Study Modes (Write, Match, Test)",
      "Audio & Image Support",
      "Offline Access",
      "Flashback for Exams",
    ],
  },
  {
    title: "Resources",
    items: [
      "Help Center",
      "Study Tips Blog",
      "Flashcard Templates",
      "User Guide",
      "FAQs",
    ],
  },
  {
    title: "Company / Info",
    items: [
      "About Us",
      "Careers",
      "Press",
      "Terms of Service",
      "Privacy Policy",
    ],
  },
];

const appStores = [
  {
    name: "Playstore",
    icon: <IoLogoGooglePlaystore className="inline mr-2" />,
  },
  { name: "App Store", icon: <FaApple className="inline mr-2" /> },
];

const socialLinks = [
  { name: "Facebook", icon: <FaFacebookSquare className="inline mr-2" /> },
  { name: "Instagram", icon: <FaInstagram className="inline mr-2" /> },
  { name: "X", icon: <FaTwitter className="inline mr-2" /> },
];

const countries = [
  "Singapore",
  "Indonesia",
  "Thailand",
  "Malaysia",
  "Vietnam",
  "Philippines",
  "Brazil",
  "México",
  "Colombia",
  "Chile",
  "Taiwan",
];

export default function Footer() {
  return (
    <div className="footer text-sm sm:text-base dark:bg-zinc-800 dark:text-gray-200">
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly px-5 md:px-10 py-10 gap-10">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-start w-full sm:w-auto"
          >
            <p className="text-lg sm:text-xl font-semibold pb-2">
              {section.title}
            </p>
            {section.items.map((item) => (
              <p key={item} className="py-1 sm:py-2">
                {item}
              </p>
            ))}
          </div>
        ))}

        {/* App Download & Social */}
        <div className="flex flex-col items-start w-full sm:w-auto">
          <p className="text-lg sm:text-xl font-semibold pb-2">App Download</p>
          <div className="flex items-start space-x-4 flex-wrap">
            <img
              src="/logos/Rickrolling_QR_code.png"
              alt="QrCode"
              className="h-20"
            />
            <div className="flex flex-col justify-start space-y-2">
              {appStores.map((store) => (
                <p
                  key={store.name}
                  className="bg-gray-300 dark:bg-zinc-600 px-2 py-1 flex items-center rounded"
                >
                  {store.icon}
                  {store.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start pt-6 sm:pt-10">
            <p className="text-lg sm:text-xl font-semibold pb-2">Follow Us</p>
            <div className="flex flex-col space-y-2">
              {socialLinks.map((social) => (
                <p key={social.name} className="flex items-center">
                  {social.icon}
                  {social.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-300 mx-5 md:mx-20" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 py-5 md:py-10 text-center flex-wrap">
        <p>© 2024 FlashBack. All Rights Reserved.</p>
        <p>
          Checkout:{" "}
          <a
            href="https://github.com/exzestential/FlashBack"
            className="underline text-blue-600"
          >
            github.com/exzestential/FlashBack
          </a>
        </p>
        <p className="flex flex-wrap gap-2 justify-center">
          Country &amp; Region:
          {countries.map((c) => (
            <span key={c} className="underline">
              {c}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
