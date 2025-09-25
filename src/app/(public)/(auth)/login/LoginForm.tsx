// "use client";

// import { ArrowBack } from "@/components/ui";
// import { useHandleEnterPress } from "@/hooks/ui/useHandleEnterPress";
// import { useRouter } from "next/navigation";
// import { useRef, useState } from "react";

// export default function Login() {
//   // data
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const passwordRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = async () => {
//     alert(`Email: ${email}, Password: ${password}`);
//   };

//   const handleEmailEnter = useHandleEnterPress<HTMLInputElement>({
//     onSubmit: handleSubmit,
//     nextRef: passwordRef,
//     enableWhen: email.trim().length > 0,
//   });

//   const handlePasswordEnter = useHandleEnterPress({
//     onSubmit: handleSubmit,
//     enableWhen: password.trim().length > 0,
//   });

//   return (
//     <div className="relative bg-sky-200 dark:bg-slate-900 min-h-screen w-full">
//       {/* Back Button */}
//       <div className="p-4 sm:p-6 md:p-8 lg:p-10">
//         <ArrowBack defaultBack />
//       </div>

//       {/* Login Form Container */}
//       <div className="flex flex-col justify-center items-center w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
//         {/* Title */}
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-slate-900 dark:text-white">
//           Login
//         </h1>

//         {/* Form Container */}
//         <div className="w-full max-w-xs sm:max-w-sm">
//           <form onKeyDown={handleKeyPress} className="w-full">
//             <div className="flex flex-col gap-4 w-full">
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 variant="blue"
//                 required
//                 disabled={isLoading}
//               />

//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 variant="blue"
//                 showPasswordToggle
//                 required
//                 disabled={isLoading}
//               />

//               <div className="flex justify-center mt-2">
//                 <AnimatedButton
//                   text={isLoading ? "Logging in..." : "Login"}
//                   onClick={handleSubmit}
//                   style="w-full sm:w-60"
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             {/* Social Login */}
//             <div className="w-full mt-4">
//               <div className="grid grid-cols-7 items-center gap-4 p-4 mt-2 text-black/40 dark:text-zinc-400">
//                 <hr className="col-span-3" />
//                 <p className="text-center text-sm">or</p>
//                 <hr className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 <LightButton
//                   text="Facebook"
//                   img={Facebook}
//                   imgClass="h-4 sm:h-5 rounded-full me-2"
//                   variant="colored"
//                   fullWidth
//                   disabled={isLoading}
//                   onClick={() => handleSocialLogin("facebook")}
//                 />
//                 <LightButton
//                   text="Google"
//                   img={Google}
//                   imgClass="h-4 sm:h-5 rounded-full me-2"
//                   variant="colored"
//                   fullWidth
//                   disabled={isLoading}
//                   onClick={() => handleSocialLogin("google")}
//                 />
//               </div>
//             </div>
//           </form>

//           {/* Terms and Privacy */}
//           <div className="flex flex-col gap-3 sm:gap-4 text-center mt-6 sm:mt-8 text-black/40 dark:text-zinc-400 py-4">
//             <p className="text-xs sm:text-sm leading-relaxed">
//               By signing in to FlashBack, you agree to our Terms and Privacy
//               Policy.
//             </p>
//             <p className="text-xs sm:text-sm leading-relaxed">
//               This site is protected by reCAPTCHA Enterprise and the Google
//               Privacy Policy and Terms of Service apply.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
