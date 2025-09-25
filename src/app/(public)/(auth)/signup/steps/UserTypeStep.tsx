"use client";
// app/signup/components/UserTypeStep.tsx
import { FormData } from "../SignupFlow";

interface UserTypeStepProps {
  form: FormData;
  onFormChange: (key: string, value: string) => void;
  animationClass: string;
}

const userType = [
  {
    name: "Teacher",
    imgSrc: "icons/signup/usertype/teacher.png",
  },
  {
    name: "Student",
    imgSrc: "icons/signup/usertype/student.png",
  },
  {
    name: "Other",
    imgSrc: "icons/signup/usertype/man.png",
  },
];

export default function UserTypeStep({
  form,
  onFormChange,
  animationClass,
}: UserTypeStepProps) {
  return (
    <div
      className={`flex flex-col items-center min-h-screen w-full transition ${animationClass}`}
    >
      <div className="absolute top-1/8 sm:top-1/4">
        <h2 className="text-center text-2xl font-bold mb-10">I am a ...</h2>

        {/* User type mapping */}
        <div className="grid sm:grid-cols-3 gap-10 **:sm:gap-20">
          {userType.map((type) => (
            <button
              key={type.name}
              onClick={() => onFormChange("user_type", type.name)}
              className={`
                flex flex-col items-center
                w-60 h-46 sm:w-60 pt-4 sm:pt-10 pb-8 rounded-lg
                text-sm text-slate-900 dark:text-white
                focus:outline-none focus:ring-0
                
                transition
                ${
                  form.user_type === type.name
                    ? `
                      bg-zinc-100 dark:bg-zinc-800
                      shadow-[0_-6px_0_theme('colors.zinc.200')] dark:shadow-[0_-6px_0_theme('colors.zinc.900')]
                      translate-y-2`
                    : `
                      border-4 border-zinc-100 dark:border-zinc-800

                      bg-white dark:bg-zinc-600
                      shadow-[0_6px_0_theme('colors.zinc.100')] dark:shadow-[0_6px_0_theme('colors.zinc.800')]
                      hover:bg-zinc-100 hover:border-zinc-200 hover:shadow-[0_6px_0_theme('colors.zinc.200')] hover:translate-y-[1px] 
                      dark:hover:bg-zinc-700 dark:hover:border-zinc-800 dark:hover:shadow-[0_6px_0_theme('colors.zinc.800')]
                      

                      transition-transform 
                      focus:outline-none focus-visible:outline-none active:outline-none
                      focus:translate-y-2 
                    `
                }
              `}
            >
              <img
                src={type.imgSrc}
                alt={type.name}
                className="pb-3 h-30 sm:h-40 "
              />
              <span className="text-xl">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
