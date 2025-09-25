"use client";
// app/signup/components/InterestsStep.tsx
import { FormData } from "../SignupFlow";

interface InterestsStepProps {
  form: FormData;
  onFormChange: (key: string, value: string[]) => void;
  animationClass: string;
}

const interestItems = [
  { name: "Math", imgSrc: "icons/signup/interests/math.png" },
  { name: "Science", imgSrc: "icons/signup/interests/science.png" },
  { name: "History", imgSrc: "icons/signup/interests/history.png" },
  { name: "Medicine", imgSrc: "icons/signup/interests/medicine.png" },
  { name: "Geography", imgSrc: "icons/signup/interests/geography.png" },
  { name: "English", imgSrc: "icons/signup/interests/english.png" },
  { name: "Programming", imgSrc: "icons/signup/interests/programming.png" },
  { name: "Art", imgSrc: "icons/signup/interests/art.png" },
  { name: "Music", imgSrc: "icons/signup/interests/music.png" },
  { name: "Languages", imgSrc: "icons/signup/interests/language.png" },
  { name: "Business", imgSrc: "icons/signup/interests/business.png" },
  { name: "Finance", imgSrc: "icons/signup/interests/finance.png" },
  { name: "Psychology", imgSrc: "icons/signup/interests/psychology.png" },
  { name: "Law", imgSrc: "icons/signup/interests/law.png" },
  { name: "Philosophy", imgSrc: "icons/signup/interests/philosophy.png" },
  { name: "Technology", imgSrc: "icons/signup/interests/technology.png" },
  { name: "Environment", imgSrc: "icons/signup/interests/environment.png" },
  { name: "Space", imgSrc: "icons/signup/interests/space.png" },
  { name: "Sports", imgSrc: "icons/signup/interests/sports.png" },
  { name: "Trivia", imgSrc: "icons/signup/interests/trivia.png" },
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
      <div className="absolute top-1/8 sm:top-1/4">
        <h2 className="text-center text-2xl font-bold">
          What are you interested in?
        </h2>
        <h3 className="text-center text-md text-zinc-500 mb-10">
          Choose atleast 1
        </h3>
        <div className="grid grid-cols-4 gap-3 sm:gap-10 place-items-center mb-32">
          {interestItems.map((item) => {
            const isPressedStyle = form.interests.includes(item.name);

            return (
              <button
                key={item.name}
                onClick={() => toggleInterest(item.name)}
                className={`
                    flex flex-col items-center
                    w-28 h-30 sm:w-36 sm:h-36 
                    pt-4 sm:pt-6 rounded-lg
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
                  className="w-16 mx-auto pb-1"
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
