import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

const FRAME_DURATION = 1800

const frames = [
  "/runner/frame-01.png",
  "/runner/frame-02.png",
  "/runner/frame-03.png",
  "/runner/frame-04.png",
  "/runner/frame-05.png",
  "/runner/frame-06.png",
]

export default function RunnerAnimation() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % frames.length)
    }, FRAME_DURATION)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[40vw]">

      {/* image */}
      <div className="relative w-full h-[70vh] overflow-hidden">

        {/* scan line — runs top → bottom each frame */}
        <motion.div
          key={`scan-${index}`}
          className="absolute left-0 right-0 h-px bg-crimson/50 z-20 pointer-events-none"
          initial={{ top: "0%", opacity: 1 }}
          animate={{ top: "100%", opacity: 0 }}
          transition={{ duration: FRAME_DURATION / 1000 * 0.8, ease: "linear" }}
        />

        {/* frame image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={frames[index]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

      </div>

    </div>
  )
}
