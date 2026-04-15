import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2, Users, FileText, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface WelcomeScreenProps {
  onNavigate: (page: string) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
      {/* Main Content */}
      <motion.div
        className="max-w-6xl w-full text-center space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Badge */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200/60">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-sm text-blue-700">Welcome to the future of hiring</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600 bg-clip-text text-transparent">
              Rebirth
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your smart way to assess, interview, and hire the best candidates.
            Streamline your recruitment process with powerful tools designed for modern HR teams.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-10 py-6 text-lg group transition-all shadow-lg shadow-blue-500/40"
            onClick={() => onNavigate("dashboard")}
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Feature Cards - Single Row - Moved down 4px */}
        <div className="grid grid-cols-4 gap-5 pt-6 max-w-5xl mx-auto mt-1">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-blue-500/10 group"
          >
            <div className="flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Easy Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Create custom tests in minutes</p>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all hover:shadow-xl hover:shadow-teal-500/10 group"
          >
            <div className="flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Candidate Hub</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Manage all applicants efficiently</p>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-blue-500/10 group"
          >
            <div className="flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">Smart Reports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Get detailed analytics instantly</p>
            </div>
          </motion.div>

          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all hover:shadow-xl hover:shadow-teal-500/10 group"
          >
            <div className="flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">AI Insights</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Data-driven hiring decisions</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-1/3 -right-20 w-96 h-96 bg-teal-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
        ></motion.div>
      </div>

      {/* Wave Pattern at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
      >
        <svg className="w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="url(#wave-gradient)" 
            fillOpacity="0.12" 
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(37_99_235_/_0.08)_1px,transparent_0)] [background-size:40px_40px] pointer-events-none"></div>
    </div>
  );
}
