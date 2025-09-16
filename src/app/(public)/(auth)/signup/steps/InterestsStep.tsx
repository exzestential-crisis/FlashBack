"use client";
// app/signup/components/InterestsStep.tsx
import { FormData } from "../SignupFlow";

interface InterestsStepProps {
  form: FormData;
  onFormChange: (key: string, value: string[]) => void;
  animationClass: string;
}

const interestItems = [
  { name: "Math", imgSrc: "http://placehold.co/100" },
  { name: "Science", imgSrc: "http://placehold.co/100" },
  { name: "History", imgSrc: "http://placehold.co/100" },
  { name: "Medicine", imgSrc: "http://placehold.co/100" },
  { name: "Geography", imgSrc: "http://placehold.co/100" },
  { name: "English", imgSrc: "http://placehold.co/100" },
  { name: "Programming", imgSrc: "http://placehold.co/100" },
  { name: "Art", imgSrc: "http://placehold.co/100" },
  { name: "Music", imgSrc: "http://placehold.co/100" },
  { name: "Languages", imgSrc: "http://placehold.co/100" },
  { name: "Business", imgSrc: "http://placehold.co/100" },
  { name: "Finance", imgSrc: "http://placehold.co/100" },
  { name: "Psychology", imgSrc: "http://placehold.co/100" },
  { name: "Law", imgSrc: "http://placehold.co/100" },
  { name: "Philosophy", imgSrc: "http://placehold.co/100" },
  { name: "Technology", imgSrc: "http://placehold.co/100" },
  { name: "Environment", imgSrc: "http://placehold.co/100" },
  { name: "Space", imgSrc: "http://placehold.co/100" },
  { name: "Sports", imgSrc: "http://placehold.co/100" },
  { name: "Trivia", imgSrc: "http://placehold.co/100" },
];

export default function InterestsStep({
  form,
  onFormChange,
  animationClass,
}: InterestsStepProps) {
  const toggleInterest = (interest: string) => {
    const interests = form.interests.includes(interest)
      ? form.interests.filter((i) => i !== interest)
      : [...form.interests, interest];

    onFormChange("interests", interests);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen w-full transition ${animationClass}`}
    >
      <div className="absolute top-1/4">
        <h2 className="text-center text-2xl font-bold">
          What are you interested in?
        </h2>
        <h3 className="text-center text-md text-zinc-500 mb-10">
          Choose atleast 1
        </h3>
        <div className="grid grid-cols-4 gap-14 place-items-center mb-32">
          {interestItems.map((item) => {
            const isPressedStyle = form.interests.includes(item.name);

            return (
              <button
                key={item.name}
                onClick={() => toggleInterest(item.name)}
                className={`
                    flex flex-col items-center
                    w-32 h-32 pt-6 rounded-lg
                    text-sm text-slate-900 dark:text-white
                    focus:outline-none focus:ring-0

                    transition-transform
                    ${
                      isPressedStyle
                        ? `
                          bg-zinc-100 dark:bg-zinc-800
                          shadow-[0_-6px_0_theme('colors.zinc.200')] dark:shadow-[0_-6px_0_theme('colors.zinc.900')]
                          translate-y-2`
                        : `
                          border-4 border-zinc-100 dark:border-zinc-800

                          bg-white dark:bg-zinc-600
                          shadow-[0_6px_0_theme('colors.zinc.100')] dark:shadow-[0_6px_0_theme('colors.zinc.800')]
                          hover:bg-zinc-100 hover:border-zinc-200 hover:shadow-[0_6px_0_theme('colors.zinc.200')] hover:translate-y-[1px] 
                        dark:hover:bg-zinc-700 dark:hover:border-zinc-800 dark:hover:shadow-[0_6px_0_theme('colors.zinc.800')]                            `
                    }
                  `}
              >
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-14 mx-auto pb-1"
                />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
