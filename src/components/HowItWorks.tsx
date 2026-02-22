export default function HowItWorks() {
   const steps = [
      {
         name: '1. Dial.',
         description: 'Access the system from any feature phone using a simple USSD code. No internet connection or smartphone required. The dial-tone is your gateway.',
         icon: (
            <svg className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
         ),
      },
      {
         name: '2. Transact.',
         description: 'Navigate through intuitive, text-based menus to send funds, check balances, or execute smart contract operations seamlessly.',
         icon: (
            <svg className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
         ),
      },
      {
         name: '3. Verify.',
         description: 'Transactions are secured offline and posted to the blockchain. 0G AI verifies intent and execution, establishing an unbroken chain of trust.',
         icon: (
            <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
         ),
      },
   ]

   return (
      <section id="how-it-works" className="bg-background py-24 sm:py-32 relative overflow-hidden">
         {/* Decorative background element */}
         <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 transform-gpu blur-3xl opacity-30 pointer-events-none" aria-hidden="true">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#00F5FF] to-[#2C3E50] opacity-20"></div>
         </div>

         <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-2xl lg:text-center">
               <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-widest">Simplifying Complexity</h2>
               <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                  How It Works
               </p>
               <p className="mt-6 text-lg leading-8 text-foreground/80 font-sans">
                  Three simple steps to bridge the gap between legacy telecommunications and decentralized finance.
               </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
               <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                  {steps.map((step, index) => (
                     <div
                        key={step.name}
                        className="flex flex-col relative group rounded-2xl border border-foreground/10 bg-foreground/5 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 hover:bg-foreground/10"
                     >
                        <dt className="flex items-center gap-x-3 text-xl font-bold leading-7 text-foreground">
                           <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl transition-colors duration-300 ${index === 2 ? 'bg-accent/20 group-hover:bg-accent/30' : 'bg-foreground/10 group-hover:bg-foreground/20'}`}>
                              {step.icon}
                           </div>
                           {step.name}
                        </dt>
                        <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-foreground/70 font-sans">
                           <p className="flex-auto text-balance">{step.description}</p>
                        </dd>

                        {/* Connecting Line (Only visible on large screens between cards) */}
                        {index < 2 && (
                           <div className="hidden lg:block absolute top-14 -right-4 w-8 h-0.5 bg-gradient-to-r from-foreground/20 to-transparent z-0"></div>
                        )}
                     </div>
                  ))}
               </dl>
            </div>
         </div>
      </section>
   )
}
