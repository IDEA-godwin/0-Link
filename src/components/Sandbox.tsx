export default function Sandbox() {
   return (
      <section id="try-it-out" className="bg-background py-24 sm:py-32 relative overflow-hidden">
         <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

               {/* Left side: Text Content */}
               <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                  <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-widest">Interactive Simulator</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                     Try It Out
                  </p>
                  <p className="mt-6 text-lg leading-8 text-foreground/80 font-sans">
                     Experience the 0-Link USSD interface directly in your browser. Use the interactive simulator to dial <span className="font-mono bg-foreground/10 px-2 py-1 rounded text-accent">*384*7342#</span> and explore the seamless bridge to decentralized finance.
                  </p>

                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-foreground/70 font-sans mx-auto lg:mx-0 text-left">
                     <div className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                           <svg className="absolute left-1 top-1 h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                           </svg>
                           Real-time USSD Simulation.
                        </dt>
                        <dd className="inline pl-2">Test out our menus navigating through different options seamlessly.</dd>
                     </div>
                     <div className="relative pl-9">
                        <dt className="inline font-semibold text-foreground">
                           <svg className="absolute left-1 top-1 h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                           </svg>
                           Interactive Environment.
                        </dt>
                        <dd className="inline pl-2">See how transactions are handled just as they would be on an offline mobile device.</dd>
                     </div>
                  </dl>
               </div>

               {/* Right side: Iframe Simulator */}
               <div className="w-full flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[360px] aspect-[9/19] rounded-[3rem] p-3 border-8 border-slate-900 dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-900 group transition-all duration-500 hover:shadow-cyan-500/20">

                     {/* Phone Edge / Bezel */}
                     <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 dark:bg-slate-800 flex justify-center items-end pb-2 z-10 w-40 mx-auto rounded-b-3xl">
                        <div className="w-16 h-1.5 bg-slate-800 dark:bg-slate-700 rounded-full"></div>
                     </div>

                     {/* The generic Simulator Iframe */}
                     <div className="bg-white w-full h-full rounded-[2.2rem] overflow-hidden relative">
                        <iframe
                           src="https://developers.africastalking.com/simulator"
                           className="absolute top-0 left-0 w-full h-full border-0"
                           title="Africa's Talking USSD Simulator"
                           sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                     </div>

                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}

