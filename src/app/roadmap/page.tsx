import React from "react";

export default function Roadmap() {
   const phases = [
      {
         title: "Phase 1: Foundation",
         status: "Completed",
         items: [
            "Core USSD Integration",
            "Smart Contract MVP",
            "Basic Authentication Flow",
         ],
         color: "border-cyan-400",
         bg: "bg-cyan-400",
      },
      {
         title: "Phase 2: AI Verification",
         status: "In Progress",
         items: [
            "0G AI Intent Verification Offline",
            "Secure Signing Enclaves",
            "Beta Testing with Initial Users",
         ],
         color: "border-blue-500",
         bg: "bg-blue-500",
      },
      {
         title: "Phase 3: Decentralization",
         status: "Upcoming",
         items: [
            "0-Link Ecosystem Token Launch",
            "Node Operator Onboarding",
            "Full Mainnet Release",
         ],
         color: "border-indigo-500",
         bg: "bg-indigo-500",
      },
      {
         title: "Phase 4: Expansion",
         status: "Future",
         items: [
            "Global Telco Partnerships",
            "Developer SDK & API Release",
            "Third-party dApp Integrations",
         ],
         color: "border-emerald-500",
         bg: "bg-emerald-500",
      },
   ];

   return (
      <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center py-24 px-6 sm:px-12 relative overflow-hidden">
         <div className="max-w-3xl w-full mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
               The Journey Ahead
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans max-w-2xl mx-auto">
               Our roadmap outlines the path from connecting feature phones to establishing a fully decentralized, globally accessible financial network.
            </p>
         </div>

         <div className="max-w-4xl w-full mx-auto relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-indigo-500 to-emerald-500 transform md:-translate-x-1/2 opacity-30 rounded-full hidden sm:block"></div>

            <div className="space-y-12 relative">
               {phases.map((phase, index) => (
                  <div
                     key={phase.title}
                     className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                  >
                     {/* Timeline marker */}
                     <div className="hidden sm:flex absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 z-10 items-center justify-center shadow-lg transition-transform hover:scale-125 duration-300 ${phase.color}" style={{ borderColor: 'currentColor' }}>
                        <div className={`w-2 h-2 rounded-full ${phase.bg}`}></div>
                     </div>

                     <div className={`w-full md:w-[45%] pl-12 sm:pl-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}>
                        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                           <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${phase.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                 phase.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                              }`}>
                              {phase.status}
                           </div>
                           <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                              {phase.title}
                           </h3>
                           <ul className={`space-y-2 text-slate-600 dark:text-slate-400 font-sans ${index % 2 === 0 ? "" : "md:inline-block md:text-right"}`}>
                              {phase.items.map((item, i) => (
                                 <li key={i} className="flex items-start gap-2">
                                    <span className="text-cyan-500 mt-1 flex-shrink-0">
                                       {phase.status === 'Completed' ? (
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                       ) : (
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path></svg>
                                       )}
                                    </span>
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     {/* Empty space for alternating layout */}
                     <div className="hidden md:block w-[45%]"></div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
