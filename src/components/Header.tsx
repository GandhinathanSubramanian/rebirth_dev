import { Button } from "./ui/button";
import { motion } from "motion/react";

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-8 py-5 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-500/30">
          <svg
            className="w-6 h-6 text-white"
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
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          onClick={() => onNavigate("signin")}
        >
          Login
        </Button>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30"
          onClick={() => onNavigate("create")}
        >
          Create Account
        </Button>
        <Button 
          variant="outline"
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={() => onNavigate("profile-setup")}
        >
          Setup Profile
        </Button>
      </div>
    </motion.header>
  );
}