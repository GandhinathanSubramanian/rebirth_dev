import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Upload, X, Sparkles, Check, Download, RefreshCw, Info, Plus, ChevronDown, ChevronUp, Award, Heart, Briefcase, Languages, ChevronLeft } from "lucide-react";
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
import { Button } from "./ui/button";

interface ResumeAnalyzerProps {
  onNavigate: (page: string, email?: string, tab?: string, showSuccess?: boolean) => void;
}

export default function ResumeAnalyzer({ onNavigate }: ResumeAnalyzerProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing your resume...");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceMode, setEnhanceMode] = useState<"paste" | "add-details">("paste");
  const [pastedText, setPastedText] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isFinalUpdate, setIsFinalUpdate] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // Form data for Add Details
  const [certifications, setCertifications] = useState([{ name: "", issuer: "", date: "" }]);
  const [hobbies, setHobbies] = useState([{ name: "" }]);
  const [projects, setProjects] = useState([{ name: "", description: "", url: "" }]);
  const [languages, setLanguages] = useState([{ language: "", proficiency: "" }]);

  const loadingMessages = [
    "Analyzing your resume...",
    "Extracting key information...",
    "Evaluating your experience...",
    "Checking formatting...",
    "Generating insights..."
  ];

  // Handle loading message rotation
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        const nextIndex = (prev + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    // Complete after 10 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isLoading]);

  // Check if form is valid (only check for uploaded file)
  const isFormValid = uploadedFile !== null;

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setUploadedFile(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setUploadedFile(file);
    }
  };

  // Remove uploaded file
  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  // Handle form submission
  const handleStartAnalyzing = () => {
    console.log("Starting resume analyzing with:", { uploadedFile });
    setIsLoading(true);
    setMessageIndex(0);
    setLoadingMessage(loadingMessages[0]);
  };

  // Handle download
  const handleDownload = () => {
    console.log("Downloading resume...");
  };

  // Handle re-upload
  const handleReUpload = () => {
    setIsComplete(false);
    setUploadedFile(null);
  };

  // Handle paste as text
  const handlePasteAsText = () => {
    setEnhanceMode("paste");
    setIsEnhancing(true);
  };

  // Handle add details
  const handleAddDetails = () => {
    setEnhanceMode("add-details");
    setIsEnhancing(true);
  };

  // Handle update resume
  const handleUpdateResume = () => {
    console.log("Updating resume...");
    setIsUpdating(true);

    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsUpdating(false);
      setIsEnhancing(false);
      setIsUpdated(true);
    }, 3000);
  };

  // Handle final update with job role
  const handleFinalUpdate = () => {
    console.log("Final update with job role:", selectedJobRole, jobDescription);
    setIsUpdating(true);

    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsUpdating(false);
      setIsFinalUpdate(true);
    }, 3000);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - 50% */}
      <div className="w-1/2 bg-white p-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500">
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
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Rebirth
            </span>
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 rounded-full group flex items-center gap-2.5">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">John Doe</p>
                    <p className="text-xs text-slate-500">End User</p>
                  </div>
                  <Avatar className="w-9 h-9 ring-2 ring-slate-200/60 cursor-pointer group-hover:ring-blue-400/50 transition-all duration-200">
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

        {/* Divider */}
        <div className="border-t border-slate-200 mb-8"></div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key="import-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Title */}
                <h1 className="text-xl font-bold text-slate-900 mb-3">
                  Upload Your Resume
                </h1>

                {/* Subtext */}
                <p className="text-sm text-slate-600 mb-10">
                  Upload your existing resume to get AI-powered insights, skill analysis, and improvement suggestions.
                </p>

                {/* File Upload */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5">
                    <Upload className="w-4 h-4 text-teal-600" />
                    Upload Resume (PDF)
                  </label>

                  {!uploadedFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-teal-400 hover:bg-teal-50/30"
                        } ${isDragging
                          ? "border-teal-400 bg-teal-50/30"
                          : "border-slate-200 bg-slate-50"
                        }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={isLoading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6 text-teal-600" strokeWidth={2} />
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-1">
                          Drop your resume here or{" "}
                          <span className="text-teal-600">browse</span>
                        </p>
                        <p className="text-xs text-slate-500">
                          Supports PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-3.5 bg-teal-50 border border-teal-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      {!isLoading && (
                        <button
                          onClick={handleRemoveFile}
                          className="p-1.5 hover:bg-red-100 rounded-md transition-colors group"
                        >
                          <X className="w-4 h-4 text-slate-400 group-hover:text-red-600" strokeWidth={2} />
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Analyze Resume Button */}
                <Button
                  onClick={handleStartAnalyzing}
                  disabled={!isFormValid || isLoading}
                  className={`w-full py-7 rounded-lg font-semibold text-base transition-all ${isFormValid && !isLoading
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Analyzing...
                    </span>
                  ) : isFormValid ? (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Analyze Resume
                    </span>
                  ) : (
                    "Upload Resume to Continue"
                  )}
                </Button>

                {/* Back Link */}
                {!isLoading && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => onNavigate("feature-selection")}
                      className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
                    >
                      ← Back to Feature Selection
                    </button>
                  </div>
                )}
              </motion.div>

            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      Analysis Results
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">AI-powered insights for your resume</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReUpload}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all text-sm font-medium border border-slate-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 hide-scrollbar">

                  {/* Score & Role Match Row */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Resume Score */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex items-center gap-5">
                      <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                          <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="213.6" strokeDashoffset="53.4" className="text-blue-600 transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-xl font-extrabold text-slate-900">75%</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Good Fit!</h3>
                        <p className="text-xs text-slate-600 leading-snug">Overall score indicates strong potential. Optimize further to pass ATS systems.</p>
                      </div>
                    </div>

                    {/* Role Match */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-teal-600" />
                        Role Match
                      </h3>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-700 truncate mr-2">Senior SWE</span>
                        <span className="font-bold text-teal-600">82% Match</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-full w-[82%] rounded-full transition-all duration-1000 ease-out"></div>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Missing Skills */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 ">
                      <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                        Key Strengths
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          Clear career progression
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          Quantifiable impact metrics
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          Modern tech stack featured
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          Strong leadership & mentorship
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          Demonstrated technical problem solving
                        </li>
                      </ul>
                    </div>

                    {/* Missing Skills */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 ">
                      <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-600" strokeWidth={3} />
                        Missing Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["System Design", "WebPack", "CI/CD", "AWS", "GraphQL"].map(skill => (
                          <span key={skill} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-md ">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-3 font-medium">Add these if you possess the experience.</p>
                    </div>
                  </div>

                  {/* Resume Improvements */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 ">
                    <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      Areas for Improvement
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-100  flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <span className="text-amber-700 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-amber-900 mb-1">Enhance Summary Section</h4>
                          <p className="text-sm text-slate-600">Your professional summary lacks specific achievements. Highlight your unique value proposition to make a stronger first impression.</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-100  flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <span className="text-amber-700 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-amber-900 mb-1">Formatting Inconsistencies</h4>
                          <p className="text-sm text-slate-600">We detected mixed bullet styles in the Experience section which might confuse ATS parsers.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Tips */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 text-slate-800 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-blue-600" />
                      Smart Tip
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Tailoring your resume for each job application increases interview chances by 40%. Use our Generator to create targeted variations instantly!
                    </p>
                  </div>


                  <div className="pt-6 border-t border-slate-100">
                    <Button
                      onClick={() => onNavigate("dashboard", undefined, "home")}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/10"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Section - 50% */}
      <div className="w-1/2 bg-gradient-to-br from-blue-50 via-white to-teal-50/30 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isLoading && !isComplete && !isUpdating && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex items-center justify-center p-12"
            >
              <div className="text-center max-w-md">
                {/* AI Icon */}
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  AI-Powered Resume Analyzer
                </h2>

                {/* Subtext */}
                <p className="text-slate-600 leading-relaxed">
                  Let our intelligent system analyze your resume, identify strengths and weaknesses, and provide personalized recommendations to help you stand out to employers.
                </p>
              </div>
            </motion.div>
          )}

          {(isLoading || isUpdating) && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex items-center justify-center p-12"
            >
              <div className="text-center">
                {/* Animated Loader */}
                <div className="relative mb-8">
                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 mx-auto"
                  >
                    <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-600 border-r-teal-500"></div>
                  </motion.div>

                  {/* Inner sparkles icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-10 h-10 text-blue-600" strokeWidth={2} />
                    </motion.div>
                  </div>
                </div>

                {/* Loading Message */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={isUpdating ? "updating" : loadingMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-semibold text-slate-900"
                  >
                    {isUpdating ? "Updating Your Analysis" : loadingMessage}
                  </motion.p>
                </AnimatePresence>

                <p className="text-sm text-slate-500 mt-3">
                  {isUpdating ? "Processing your information..." : "This will only take a moment"}
                </p>
              </div>
            </motion.div>
          )}


          {isComplete && !isUpdating && (
            <motion.div
              key="resume-details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="h-full flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Resume Details</h2>
                  <p className="text-sm text-slate-500">Information extracted from your upload</p>
                </div>
              </div>
              {/* Resume Preview Card */}
              <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-y-auto">
                <div className="p-8">
                  {/* Header Section with Image */}
                  <div className="flex items-start gap-6 pb-8 mb-8 border-b border-slate-100">
                    <div className="flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Profile"
                        className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">John Doe</h1>
                      <p className="text-lg text-slate-600 mb-4">Senior Software Engineer</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span>john.doe@email.com</span><span>•</span>
                        <span>+1 (555) 123-4567</span><span>•</span>
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                  {/* Professional Summary */}
                  <div className="pb-8 mb-8 border-b border-slate-100">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Professional Summary</h2>
                    <p className="text-slate-700 leading-relaxed">
                      Experienced software engineer with 8+ years of expertise in full-stack development,
                      cloud architecture, and team leadership. Proven track record of delivering scalable
                      solutions and driving technical innovation in fast-paced environments.
                    </p>
                  </div>
                  {/* Experience */}
                  <div className="pb-8 mb-8 border-b border-slate-100">
                    <h2 className="text-lg font-medium text-slate-900 mb-5">Experience</h2>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">Senior Software Engineer</h3>
                            <p className="text-sm text-slate-600">Tech Corp Inc.</p>
                          </div>
                          <span className="text-sm text-slate-500">2020 - Present</span>
                        </div>
                        <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                          <li>Led development of microservices architecture serving 1M+ users</li>
                          <li>Reduced system latency by 40% through optimization initiatives</li>
                          <li>Mentored team of 5 junior developers</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">Software Engineer</h3>
                            <p className="text-sm text-slate-600">StartUp XYZ</p>
                          </div>
                          <span className="text-sm text-slate-500">2018 - 2020</span>
                        </div>
                        <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                          <li>Built RESTful APIs using Node.js and Express</li>
                          <li>Implemented CI/CD pipelines with Jenkins</li>
                          <li>Collaborated with cross-functional teams</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Education */}
                  <div className="pb-8 mb-8 border-b border-slate-100">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Education</h2>
                    <div>
                      <h3 className="font-semibold text-slate-900">Bachelor of Science in Computer Science</h3>
                      <p className="text-sm text-slate-600">University of Technology</p>
                      <p className="text-sm text-slate-500">2014 - 2018</p>
                    </div>
                  </div>
                  {/* Skills */}
                  <div>
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
