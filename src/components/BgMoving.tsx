import { motion } from "motion/react";

export default function BgMoving() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Left Side Decorative Elements */}
      <div className="absolute left-0 top-0 w-1/2 h-full">
        {/* Large Gradient Orb - Top Left */}
        <motion.div
          className="absolute -left-20 top-20 w-96 h-96 bg-gradient-to-br from-blue-500/8 to-teal-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium Gradient Orb - Left */}
        <motion.div
          className="absolute left-10 top-1/3 w-72 h-72 bg-gradient-to-br from-blue-600/6 to-blue-400/6 rounded-full blur-2xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Small Gradient Orb - Bottom Left */}
        <motion.div
          className="absolute -left-10 bottom-32 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Circle - Left */}
        <motion.div
          className="absolute left-1/4 top-1/2 w-3 h-3 bg-blue-400/15 rounded-full"
          animate={{
            y: [0, -100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Circle - Left 2 */}
        <motion.div
          className="absolute left-1/3 top-2/3 w-2 h-2 bg-teal-400/20 rounded-full"
          animate={{
            y: [0, -80, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Right Side Decorative Elements */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        {/* Large Gradient Orb - Top Right */}
        <motion.div
          className="absolute -right-24 top-32 w-80 h-80 bg-gradient-to-bl from-teal-500/8 to-blue-600/8 rounded-full blur-3xl"
          animate={{
            x: [0, -35, 0],
            y: [0, 45, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Medium Gradient Orb - Right */}
        <motion.div
          className="absolute right-16 top-1/2 w-96 h-96 bg-gradient-to-bl from-blue-500/6 to-teal-600/6 rounded-full blur-3xl"
          animate={{
            x: [0, 25, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Small Gradient Orb - Bottom Right */}
        <motion.div
          className="absolute -right-16 bottom-20 w-72 h-72 bg-gradient-to-bl from-teal-400/8 to-blue-500/8 rounded-full blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 35, 0],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Floating Circle - Right */}
        <motion.div
          className="absolute right-1/4 top-1/3 w-4 h-4 bg-teal-500/15 rounded-full"
          animate={{
            y: [0, -90, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Floating Circle - Right 2 */}
        <motion.div
          className="absolute right-1/3 top-3/4 w-3 h-3 bg-blue-500/20 rounded-full"
          animate={{
            y: [0, -70, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Circle - Right 3 */}
        <motion.div
          className="absolute right-1/4 bottom-1/4 w-2 h-2 bg-teal-400/25 rounded-full"
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Center Decorative Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Subtle Center Glow */}
        <motion.div
          className="w-[600px] h-[600px] bg-gradient-to-br from-blue-500/4 via-teal-500/4 to-blue-600/4 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Particle Effects - Floating Dots */}
      <motion.div
        className="absolute left-1/4 top-1/4 w-1.5 h-1.5 bg-blue-400/25 rounded-full"
        animate={{
          y: [0, -150, 0],
          x: [0, 30, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-1/3 top-1/2 w-1.5 h-1.5 bg-teal-400/25 rounded-full"
        animate={{
          y: [0, -120, 0],
          x: [0, -25, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute left-1/3 bottom-1/3 w-1 h-1 bg-blue-500/30 rounded-full"
        animate={{
          y: [0, -100, 0],
          x: [0, 20, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      <motion.div
        className="absolute right-1/4 bottom-1/2 w-1 h-1 bg-teal-500/30 rounded-full"
        animate={{
          y: [0, -130, 0],
          x: [0, -35, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
    </div>
  );
}