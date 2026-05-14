import SelectedSystems from "../components/sections/SelectedSystems"
import OperationalScale from "../components/sections/OperationalScale"
import Reveal from "../components/ui/Reveal"
import EngineeringNotes from "../components/sections/EngineeringNotes"
import Reflections from "../components/sections/Reflections"
import SystemIndex from "../components/ui/SystemIndex"
import CurrentWork from "../components/sections/CurrentWork"
import Contact from "../components/sections/Contact"

export default function Home() {
  return (
    <main className="relative min-h-screen px-4 sm:px-8 py-10 sm:py-20">
       <div
         className="
         pointer-events-none
         absolute inset-0 overflow-hidden
         opacity-[0.06]
         "
       >
         <svg
           className="w-full h-full"
           xmlns="http://www.w3.org/2000/svg"
         >
           <line x1="10%" y1="20%" x2="40%" y2="35%" stroke="white" strokeWidth="1" />
           <line x1="40%" y1="35%" x2="75%" y2="15%" stroke="white" strokeWidth="1" />
           <circle cx="40%" cy="35%" r="4" fill="#C1121F" />
           <circle cx="75%" cy="15%" r="4" fill="#C1121F" />
         </svg>
       </div>
 
       <div className="max-w-7xl mx-auto relative z-10">
 
         {/* top telemetry */}
 
       <Reveal>
 
         <div className="flex items-center justify-between mb-10">
 
           {/* left */}
 
           <div className="flex items-center gap-3">
 
             <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
 
             <p className="text-xs tracking-[0.35em] uppercase text-crimson">
               SYSTEM STATUS — OPERATIONAL
             </p>
 
           </div>
 
           {/* right */}
 
           <div className="flex items-center gap-4 sm:gap-8">
 
             <a
               href="/Sai_Ritwik_Reddy_Resume.pdf"
               target="_blank"
               rel="noreferrer"
               className="
               text-xs uppercase tracking-[0.28em]
               text-mutedWhite
               hover:text-crimson
               transition-colors duration-500
               "
             >
               Resume
             </a>
 
             <a
               href="https://www.linkedin.com/in/ritwik23/"
               target="_blank"
               rel="noreferrer"
               className="
               text-xs uppercase tracking-[0.28em]
               text-mutedWhite
               hover:text-crimson
               transition-colors duration-500
               "
             >
               LinkedIn
             </a>
 
             <a
               href="mailto:ritwikreddy615@gmail.com"
               className="
               hidden sm:block
               text-xs uppercase tracking-[0.28em]
               text-mutedWhite
               hover:text-crimson
               transition-colors duration-500
               "
             >
               ritwikreddy615@gmail.com
             </a>
 
           </div>
 
         </div>
 
       </Reveal>
 
         {/* hero */}
 
         <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
           <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-16 items-center">
 
             {/* left hero content */}
 
             <div className="space-y-10">
 
               <Reveal delay={0.1}>
                 <div>
                   <p className="text-sm uppercase tracking-[0.35em] text-mutedWhite mb-6">
                     Cloud Infrastructure & Platform Engineering
                   </p>
 
                   <h1 className="text-[3.5rem] sm:text-7xl md:text-[10rem] leading-[0.9] tracking-tight font-semibold">
                     Sai
                     <br />
 
                     <span className="text-crimson">
                       Ritwik
                     </span>
 
                     <br />
                     Reddy
                   </h1>
                 </div>
               </Reveal>
 
               <Reveal delay={0.2}>
                 <div className="max-w-2xl space-y-6">
                   <p className="text-xl md:text-3xl leading-relaxed text-softWhite">
                     I build systems that reduce
                     <span className="text-crimson"> operational chaos.</span>
                   </p>
 
                   <p className="text-lg leading-relaxed text-mutedWhite">
                     Automation-first infrastructure across AWS and Azure —
                     designed for reliability, governance, and enterprise-scale operations.
                   </p>
                 </div>
               </Reveal>
 
               {/* hero metrics */}
 
             </div>
 
             {/* right hero index */}

             <SystemIndex />
 
           </div>

         </section>
 
         <OperationalScale />
         <SelectedSystems />
         <EngineeringNotes />
         <Reflections />
         <CurrentWork />
         <Contact />
 
       </div>
 
    </main>
  )
}