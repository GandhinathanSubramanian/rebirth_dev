import { motion } from "motion/react";
import { FileText, ScanSearch, Sparkles, ArrowRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import BgMoving from "./BgMoving";

interface FeatureSelectionProps {
  onNavigate: (page: string) => void;
}

export default function FeatureSelection({ onNavigate }: FeatureSelectionProps) {
  const handleFeatureSelect = (feature: string) => {
    console.log(`Selected feature: ${feature}`);
    // Navigate to specific feature pages
    if (feature === "resume-builder") {
      onNavigate("resume-builder-import");
    } else if (feature === "resume-analyzer") {
      onNavigate("resume-analyzer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-teal-50/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="opacity-40">
        <BgMoving />
      </div>

      {/* Dot Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(37_99_235_/_0.05)_1px,transparent_0)] [background-size:40px_40px] pointer-events-none z-0"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-12 pt-10 pb-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Rebirth
          </span>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 rounded-full group flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">End User</p>
                </div>
                <Avatar className="w-10 h-10 ring-2 ring-slate-200/60 cursor-pointer group-hover:ring-blue-400/50 transition-all duration-200">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">john.doe@email.com</p>
              </div>
              <DropdownMenuItem
                onClick={() => onNavigate("user-profile")}
                className="cursor-pointer"
              >
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onNavigate("welcome")}
                className="cursor-pointer text-red-600"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20">
        <div className="max-w-5xl w-full">
          {/* Icon Box, Title, and Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            {/* Icon Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
                {/* Icon Container */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500">
                  <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Select the tool that best suits your needs. Build professional
              resumes or analyze existing ones with AI-powered insights.
            </motion.p>
          </motion.div>

          {/* Feature Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Resume Builder Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              onClick={() => handleFeatureSelect("resume-builder")}
              className="group relative cursor-pointer"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-teal-400/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>

              {/* Card Content */}
              <div className="relative h-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 group-hover:shadow-md group-hover:shadow-blue-400/10 transition-all duration-500 group-hover:-translate-y-1">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FileText className="w-8 h-8 text-blue-600" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  Resume Builder
                </h3>

                {/* Subtext */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Import your LinkedIn profile or start fresh. Create a professional resume tailored to your target job role.
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

            {/* Resume Analyzer Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              onClick={() => handleFeatureSelect("resume-analyzer")}
              className="group relative cursor-pointer"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400/30 to-blue-400/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>

              {/* Card Content */}
              <div className="relative h-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 group-hover:shadow-md group-hover:shadow-teal-400/10 transition-all duration-500 group-hover:-translate-y-1">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ScanSearch className="w-8 h-8 text-teal-600" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                  Resume Analyzer
                </h3>

                {/* Subtext */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Upload your resume to get insights on your profile, skills, and job match. Improve your chances instantly.
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-teal-600 font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => onNavigate("dashboard")}
              className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors underline decoration-slate-300 hover:decoration-slate-500"
            >
              Skip for Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}