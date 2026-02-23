export default function HowWeDoIt() {
   return (
      <section id="how-we-do-it" className="bg-background py-24 sm:py-32 relative text-foreground overflow-hidden">
         <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00F5FF] to-[#0A84FF] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
         </div>

         <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-2xl lg:text-center">
               <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-widest">Under the Hood</h2>
               <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                  System Architecture
               </p>
               <p className="mt-6 text-lg leading-8 text-foreground/80 font-sans">
                  A seamless bridge consisting of telco integrations, secure signing enclaves, and verifiable AI working in harmony.
               </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
               <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-4 sm:p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50"></div>

                  {/* Architecture Flow Diagram */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-center justify-items-center py-8">

                     {/* Node 1 */}
                     <div className="flex flex-col items-center text-center space-y-4 w-full group">
                        <div className="h-20 w-20 rounded-full border-2 border-foreground/20 bg-foreground/5 flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
                           <svg className="h-8 w-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                           </svg>
                        </div>
                        <div>
                           <h3 className="font-bold text-sm">Feature Phone</h3>
                           <p className="text-xs text-foreground/60 mt-1">USSD Interface</p>
                        </div>
                     </div>

                     {/* Arrow 1 */}
                     <div className="hidden md:flex w-full items-center justify-center text-accent/50 group-hover:text-accent">
                        <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </div>
                     <div className="md:hidden flex w-full items-center justify-center text-accent/50 rotate-90 my-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </div>

                     {/* Node 2 */}
                     <div className="flex flex-col items-center text-center space-y-4 w-full group">
                        <div className="h-20 w-20 rounded-2xl border-2 border-foreground/20 bg-foreground/5 flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
                           <svg className="h-8 w-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                           </svg>
                        </div>
                        <div>
                           <h3 className="font-bold text-sm">0-Link Gateway</h3>
                           <p className="text-xs text-foreground/60 mt-1">Telco API & KMS</p>
                        </div>
                     </div>

                     {/* Arrow 2 */}
                     <div className="hidden md:flex w-full items-center justify-center text-accent/50 group-hover:text-accent">
                        <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </div>
                     <div className="md:hidden flex w-full items-center justify-center text-accent/50 rotate-90 my-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </div>

                     {/* Node 3 */}
                     <div className="flex flex-col items-center text-center space-y-4 w-full group">
                        <div className="h-24 w-24 rounded-lg outline outline-2 outline-offset-4 outline-accent/50 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent relative">
                           <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent animate-ping"></div>
                           <div className="flex items-center justify-center h-full">
                              <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                           </div>
                        </div>
                        <div>
                           <h3 className="font-bold text-sm text-accent">0G AI Verification</h3>
                           <p className="text-xs text-foreground/60 mt-1">Proof Generation & On-chain</p>
                        </div>
                     </div>

                  </div>
               </div>

               <div className="mt-12 text-center text-sm font-sans text-foreground/60 max-w-2xl mx-auto">
                  <p>Every USSD command is securely translated, signed via key management enclaves, and verified by 0G AI before touching the decentralized network. Ensuring full decentralization while abstracting all technical complexity.</p>
               </div>
            </div>
         </div>
      </section>
   )
}
