import Link from 'next/link';

export default function Hero() {
   return (
      <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
         <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00F5FF] to-[#0A84FF] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
         </div>

         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">

               {/* Text Content */}
               <div className="lg:pr-8 lg:pt-4">
                  <div className="lg:max-w-lg">
                     <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                        0-Link: The Bridge from Dial-Tone to Decentralization.
                     </h1>
                     <p className="mt-6 text-lg leading-8 text-foreground/80 font-sans">
                        Empowering the offline world with verifiable AI. Access the 0G Labs ecosystem from any feature phone—no internet, no data, no barriers.
                     </p>
                     <div className="mt-10 flex items-center gap-x-6">
                        <Link
                           href="#sandbox"
                           className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#111827] shadow-sm hover:bg-[#00D0D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-all duration-300 hover:scale-105"
                        >
                           Explore the 0G-Offline Bridge
                        </Link>
                        <Link
                           href="/roadmap"
                           className="text-sm font-semibold leading-6 text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-2"
                        >
                           View the Roadmap <span aria-hidden="true">→</span>
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Image/Graphic Content */}
               <div className="relative flex items-center justify-center lg:justify-end">
                  <div className="relative w-full max-w-lg rounded-2xl bg-foreground/5 p-4 ring-1 ring-foreground/10 backdrop-blur-3xl sm:p-8 hover:ring-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,245,255,0.2)]">
                     {/* Dummy Phone / USSD graphic representation */}
                     <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col justify-between shadow-2xl overflow-hidden relative border border-gray-700">
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-accent/20 to-transparent opacity-50"></div>

                        {/* Screen Header */}
                        <div className="flex justify-between items-center text-accent text-xs font-mono">
                           <span>ussd_active</span>
                           <span>10:41 AM</span>
                        </div>

                        {/* USSD Dialog */}
                        <div className="flex-1 flex flex-col justify-center space-y-4 font-mono z-10">
                           <div className="bg-gray-100 rounded text-gray-900 p-4 text-sm font-medium">
                              Welcome to 0-Link
                              <br /><br />
                              1. Send Funds
                              <br />
                              2. Check Balance
                              <br />
                              3. AI Verification
                              <br /><br />
                              Enter option:
                           </div>
                        </div>

                        {/* Dialpad mockup */}
                        <div className="grid grid-cols-3 gap-2 mt-6">
                           {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
                              <div key={key} className="h-10 bg-gray-800 rounded-md flex items-center justify-center text-gray-400 font-medium border border-gray-700 shadow-inner">
                                 {key}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}
