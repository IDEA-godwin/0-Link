import Link from "next/link";
import React from "react";

export default function Header() {
   return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border-b border-gray-200/50 dark:border-gray-800/50">
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                  0
               </div>
               <span className="font-heading font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                  -Link
               </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-medium">
               <Link
                  href="/#how-it-works"
                  className="text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
               >
                  How it Works
               </Link>
               <Link
                  href="/#how-we-do-it"
                  className="text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
               >
                  How We Do It
               </Link>
               <Link
                  href="/#try-it-out"
                  className="text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
               >
                  Try it Out
               </Link>
               <Link
                  href="/roadmap"
                  className="text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
               >
                  Roadmap
               </Link>

               <Link
                  href="/#try-it-out"
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-105 transition-transform shadow-md font-semibold text-sm"
               >
                  Get Started
               </Link>
            </nav>
         </div>
      </header>
   );
}
