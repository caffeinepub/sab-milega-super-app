import { motion } from "motion/react";

export default function SplashScreen() {
  return (
    <div
      data-ocid="splash.loading_state"
      className="fixed inset-0 gradient-hero flex flex-col items-center justify-center z-50"
    >
      {/* Decorative circles */}
      <div className="absolute top-20 left-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-32 right-8 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
      <div
        className="absolute top-1/3 right-12 w-20 h-20 rounded-full"
        style={{ background: "oklch(72% 0.20 55 / 0.15)" }}
      />

      <motion.div
        className="flex flex-col items-center gap-6 px-8"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Logo icon */}
        <motion.div
          className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-glow"
          style={{
            background: "oklch(72% 0.20 55 / 0.25)",
            border: "2px solid oklch(72% 0.20 55 / 0.6)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px oklch(72% 0.20 55 / 0.3)",
              "0 0 40px oklch(72% 0.20 55 / 0.6)",
              "0 0 20px oklch(72% 0.20 55 / 0.3)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <span className="text-5xl">✦</span>
        </motion.div>

        {/* App name */}
        <div className="text-center">
          <motion.h1
            className="text-5xl font-display font-black text-white tracking-tight leading-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            SAB MILEGA
          </motion.h1>
          <motion.p
            className="mt-3 text-sm font-body font-medium tracking-widest uppercase"
            style={{ color: "oklch(85% 0.15 65)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Everything You Need
          </motion.p>
          <motion.p
            className="text-sm font-body font-medium tracking-widest uppercase"
            style={{ color: "oklch(85% 0.15 65)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            All in One Place
          </motion.p>
        </div>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-dot-1" />
          <span className="w-2 h-2 rounded-full bg-white animate-dot-2" />
          <span className="w-2 h-2 rounded-full bg-white animate-dot-3" />
        </motion.div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        className="absolute bottom-16 text-white/50 text-xs font-body tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        sabmilega.in
      </motion.p>
    </div>
  );
}
