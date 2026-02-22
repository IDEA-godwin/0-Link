"use client";
import { useState } from 'react';

export default function Sandbox() {
   const [ussdInput, setUssdInput] = useState('');
   const [screen, setScreen] = useState('home'); // home, send, confirming, success

   const handleDial = (e: React.FormEvent) => {
      e.preventDefault();
      if (ussdInput === '*123#') {
         setScreen('menu');
      } else if (screen === 'menu' && ussdInput === '1') {
         setScreen('send_amount');
      } else if (screen === 'send_amount') {
         setScreen('success');
      }
      setUssdInput('');
   };

   return (
      <section id="try-it-out" className="bg-background py-24 sm:py-32">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                  Try It Out
               </h2>
               <p className="mt-6 text-lg leading-8 text-foreground/80 font-sans">
                  Experience the 0-Link USSD interface directly in your browser. Dial <span className="font-mono bg-foreground/10 px-2 py-1 rounded text-accent">*123#</span> to get started.
               </p>
            </div>

            <div className="flex justify-center items-center">
               {/* Iframe wrapper simulating the phone */}
               <div className="relative w-full max-w-[320px] aspect-[9/19] bg-gray-900 rounded-[3rem] p-4 shadow-2xl border-4 border-gray-800">
                  {/* Phone Screen */}
                  <div className="bg-gray-100 w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col pt-8 relative">
                     <div className="absolute top-0 inset-x-0 h-6 bg-black flex justify-center items-end pb-1">
                        <div className="w-16 h-4 bg-gray-900 rounded-b-xl"></div>
                     </div>

                     <div className="flex-1 p-6 font-mono text-sm flex flex-col bg-white">
                        {screen === 'home' && (
                           <div className="flex-1 flex flex-col justify-center">
                              <p className="text-center text-gray-400">Dial a USSD code</p>
                           </div>
                        )}

                        {screen === 'menu' && (
                           <div className="flex-1 text-gray-900">
                              <p className="font-bold mb-4">0-Link Menu</p>
                              <p>1. Send 0G Tokens</p>
                              <p>2. View Balance</p>
                              <p>3. AI Identity</p>
                              <p className="mt-4 text-xs text-gray-500">Reply with option:</p>
                           </div>
                        )}

                        {screen === 'send_amount' && (
                           <div className="flex-1 text-gray-900">
                              <p className="font-bold mb-4">Send Funds</p>
                              <p>Enter amount to send:</p>
                           </div>
                        )}

                        {screen === 'success' && (
                           <div className="flex-1 text-gray-900 flex flex-col items-center justify-center text-center">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                 </svg>
                              </div>
                              <p className="font-bold">Transaction Successful</p>
                              <p className="text-xs text-gray-500 mt-2">Verified by 0G AI</p>
                              <button onClick={() => setScreen('home')} className="mt-6 text-accent font-bold text-xs underline">Back to Default</button>
                           </div>
                        )}

                        {/* Input area */}
                        <form onSubmit={handleDial} className="mt-auto border-t border-gray-200 pt-4 flex gap-2">
                           <input
                              type="text"
                              value={ussdInput}
                              onChange={(e) => setUssdInput(e.target.value)}
                              placeholder={screen === 'home' ? "*123#" : "Enter..."}
                              className="flex-1 bg-gray-100 rounded px-3 py-2 outline-none border border-gray-300 focus:border-accent font-mono text-sm text-gray-900"
                              autoFocus
                           />
                           <button type="submit" className="bg-foreground text-background font-bold px-4 py-2 rounded uppercase text-xs hover:bg-black">
                              {screen === 'home' ? 'Dial' : 'Send'}
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
