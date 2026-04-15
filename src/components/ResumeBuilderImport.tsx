import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Upload, X, Linkedin, Sparkles, Check, Download, RefreshCw, Info, Plus, ChevronDown, ChevronUp, Award, Heart, Briefcase, Languages } from "lucide-react";
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

interface ResumeBuilderImportProps {
  onNavigate: (page: string, email?: string, tab?: string, showSuccess?: boolean) => void;
}

export default function ResumeBuilderImport({ onNavigate }: ResumeBuilderImportProps) {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Fetching your profile...");
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
    "Fetching your profile...",
    "Analyzing your experience...",
    "Generating professional summary...",
    "Building your base resume...",
    "Finalizing your resume..."
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

  // Validate LinkedIn URL
  const isValidLinkedinUrl = (url: string) => {
    const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9-]+\/?$/;
    return linkedinPattern.test(url.trim());
  };

  // Check if form is valid
  const isFormValid = isValidLinkedinUrl(linkedinUrl) || uploadedFile !== null;

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
  const handleStartBuilding = () => {
    console.log("Starting resume building with:", { linkedinUrl, uploadedFile });
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
    setLinkedinUrl("");
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
                  Import Your Profile
                </h1>

                {/* Subtext */}
                <p className="text-sm text-slate-600 mb-10">
                  Get started by importing your LinkedIn profile or uploading your existing resume. We'll help you create something amazing.
                </p>

                {/* LinkedIn URL Input */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {isValidLinkedinUrl(linkedinUrl) && !isLoading && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    We'll import your profile information to kickstart your resume
                  </p>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white text-xs font-medium text-slate-500">OR</span>
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2.5">
                    <Upload className="w-4 h-4 text-teal-600" />
                    Upload Existing Resume
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

                {/* Start Building Button */}
                <Button
                  onClick={handleStartBuilding}
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
                      Processing...
                    </span>
                  ) : isFormValid ? (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Start Building Your Resume
                    </span>
                  ) : (
                    "Enter LinkedIn URL or Upload Resume"
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
            ) : !isEnhancing ? (
              <motion.div
                key="resume-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Title and Attached Input Display */}
                <div className="flex flex-col gap-4 mb-6">
                  {/* Title based on input type */}
                  <h2 className="text-base font-medium text-slate-900">
                    {uploadedFile ? "Your Attached PDF" : "Your Attached Link"}
                  </h2>

                  {/* Attached Input Display */}
                  {uploadedFile ? (
                    <div className="flex items-center justify-between p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white border border-teal-200 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-teal-600" strokeWidth={2} />
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
                      <button
                        onClick={handleReUpload}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Change
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white border border-blue-200 rounded-lg flex items-center justify-center">
                          <Linkedin className="w-5 h-5 text-blue-600" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-500 mb-0.5">LinkedIn Profile</p>
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {linkedinUrl}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleReUpload}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Change
                      </button>
                    </div>
                  )}
                </div>

                {/* Information Box */}
                <div className={`bg-gradient-to-br ${isFinalUpdate ? 'from-green-50 via-emerald-50/30 to-green-50/20 border-green-200' : 'from-blue-50 via-white to-teal-50/30 border-blue-100'} border rounded-xl p-4 mb-6`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${isFinalUpdate ? 'from-green-600 to-emerald-500' : 'from-blue-600 to-teal-500'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {isFinalUpdate ? (
                        <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                      ) : (
                        <Info className="w-5 h-5 text-white" strokeWidth={2} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 leading-relaxed mb-2">
                        Based on your {uploadedFile ? "uploaded file" : "LinkedIn profile"}, we've generated your resume.
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isFinalUpdate ? "100%" : (isUpdated ? "90%" : "70%") }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{isFinalUpdate ? "100%" : (isUpdated ? "90%" : "70%")}</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {isFinalUpdate
                          ? "Perfect! Your resume is 100% complete."
                          : (isUpdated
                            ? "Great progress! Your resume is 90% complete."
                            : "Your resume is 70% complete. Add more details to make it stand out:")}
                      </p>
                      {!isUpdated && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["Certifications", "Hobbies", "Projects", "Languages"].map((item) => (
                            <span
                              key={item}
                              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>



                {/* Success Message and Dashboard Button - Only show at 100% */}
                {isFinalUpdate && (
                  <div className="mb-6">
                    <p className="text-sm text-slate-700 leading-relaxed mb-4 text-center">
                      Your resume is perfectly ready! You can view it anytime in your profile and update it whenever needed using Rebirth AI.
                    </p>
                    <button
                      onClick={() => onNavigate('dashboard', undefined, 'home')}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all"
                    >
                      <Sparkles className="w-5 h-5" />
                      Go to Dashboard
                    </button>
                  </div>
                )}


                {/* Job Role Selection - Only show if updated but not final */}
                {isUpdated && !isFinalUpdate && (
                  <div className="bg-gradient-to-br from-yellow-50 via-amber-50/30 to-yellow-50/20 border border-yellow-200 rounded-xl p-5 mb-6">
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      We've built your resume using your basic details. To make it more tailored and impactful, please select your preferred job role or paste a job description below. This helps us optimize your resume to be 100% complete.
                    </p>
                    {/* Job Role Badges */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-600 mb-2">Select Job Role</label>
                      <div className="flex flex-wrap gap-2">
                        {["Developer", "Designer", "Analyst", "Manager", "Engineer", "Consultant"].map((role) => (
                          <button
                            key={role}
                            onClick={() => setSelectedJobRole(role)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedJobRole === role
                              ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white"
                              : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                              }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Job Description Input */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-600 mb-2">Or Paste Job Description</label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here to tailor your resume..."
                        className="w-full h-32 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    {/* Update Resume Button */}
                    <button
                      onClick={handleFinalUpdate}
                      disabled={!selectedJobRole && !jobDescription}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Update Resume
                    </button>
                  </div>
                )}

                {/* Action Buttons - Only show if not updated */}
                {!isUpdated && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePasteAsText}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700 rounded-lg font-medium transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      Paste as Text
                    </button>
                    <button
                      onClick={handleAddDetails}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Details
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="enhance-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Title with Badge Dropdown */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-medium text-slate-900">
                      Enhance Your Resume
                    </h1>

                    {/* Badge-style Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-all">
                          <span>{enhanceMode === "paste" ? "Paste as Text" : "Add Details"}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => setEnhanceMode("paste")}
                          className="cursor-pointer"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Paste as Text
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEnhanceMode("add-details")}
                          className="cursor-pointer"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Subtext */}
                  <p className="text-sm text-slate-500">
                    Add more information to make your resume complete and professional.
                  </p>
                </div>

                {/* Conditional Content Based on Mode */}
                <AnimatePresence mode="wait">
                  {enhanceMode === "paste" ? (
                    <motion.div
                      key="paste-mode"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Textarea */}
                      <div className="relative mb-6">
                        <textarea
                          value={pastedText}
                          onChange={(e) => setPastedText(e.target.value)}
                          placeholder="Enter or paste your text here"
                          rows={14}
                          className="w-full px-4 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                          {pastedText.length} characters
                        </div>
                      </div>

                      {/* Update Resume Button */}
                      <Button
                        onClick={handleUpdateResume}
                        disabled={!pastedText.trim()}
                        className={`w-full py-7 rounded-lg font-semibold text-base transition-all ${pastedText.trim()
                          ? "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                      >
                        Update Resume
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add-details-mode"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Accordion Sections */}
                      <div className="space-y-3">
                        {/* Certifications Accordion */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedSection(expandedSection === "certifications" ? null : "certifications")}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                                <Award className="w-5 h-5 text-blue-600" />
                              </div>
                              <span className="font-medium text-slate-900">Certifications</span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedSection === "certifications" ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedSection === "certifications" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                                  {certifications.map((cert, index) => (
                                    <div key={index} className="space-y-2">
                                      <input
                                        type="text"
                                        value={cert.name}
                                        onChange={(e) => {
                                          const newCerts = [...certifications];
                                          newCerts[index].name = e.target.value;
                                          setCertifications(newCerts);
                                        }}
                                        placeholder="Certification Name"
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                        <input
                                          type="text"
                                          value={cert.issuer}
                                          onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].issuer = e.target.value;
                                            setCertifications(newCerts);
                                          }}
                                          placeholder="Issuer"
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                        />
                                        <input
                                          type="text"
                                          value={cert.date}
                                          onChange={(e) => {
                                            const newCerts = [...certifications];
                                            newCerts[index].date = e.target.value;
                                            setCertifications(newCerts);
                                          }}
                                          placeholder="Date (e.g., Jan 2024)"
                                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => setCertifications([...certifications, { name: "", issuer: "", date: "" }])}
                                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add Certification
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Hobbies Accordion */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedSection(expandedSection === "hobbies" ? null : "hobbies")}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-pink-600" />
                              </div>
                              <span className="font-medium text-slate-900">Hobbies</span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedSection === "hobbies" ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedSection === "hobbies" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
                                  {hobbies.map((hobby, index) => (
                                    <input
                                      key={index}
                                      type="text"
                                      value={hobby.name}
                                      onChange={(e) => {
                                        const newHobbies = [...hobbies];
                                        newHobbies[index].name = e.target.value;
                                        setHobbies(newHobbies);
                                      }}
                                      placeholder="Hobby name"
                                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                    />
                                  ))}
                                  <button
                                    onClick={() => setHobbies([...hobbies, { name: "" }])}
                                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add Hobby
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Projects Accordion */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedSection(expandedSection === "projects" ? null : "projects")}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-purple-600" />
                              </div>
                              <span className="font-medium text-slate-900">Projects</span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedSection === "projects" ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedSection === "projects" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                                  {projects.map((project, index) => (
                                    <div key={index} className="space-y-2">
                                      <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) => {
                                          const newProjects = [...projects];
                                          newProjects[index].name = e.target.value;
                                          setProjects(newProjects);
                                        }}
                                        placeholder="Project Name"
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                      />
                                      <input
                                        type="text"
                                        value={project.description}
                                        onChange={(e) => {
                                          const newProjects = [...projects];
                                          newProjects[index].description = e.target.value;
                                          setProjects(newProjects);
                                        }}
                                        placeholder="Description"
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                      />
                                      <input
                                        type="text"
                                        value={project.url}
                                        onChange={(e) => {
                                          const newProjects = [...projects];
                                          newProjects[index].url = e.target.value;
                                          setProjects(newProjects);
                                        }}
                                        placeholder="Project URL (optional)"
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                      />
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => setProjects([...projects, { name: "", description: "", url: "" }])}
                                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add Project
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Languages Accordion */}
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedSection(expandedSection === "languages" ? null : "languages")}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                                <Languages className="w-5 h-5 text-emerald-600" />
                              </div>
                              <span className="font-medium text-slate-900">Languages</span>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedSection === "languages" ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedSection === "languages" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                                  {languages.map((lang, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-2">
                                      <input
                                        type="text"
                                        value={lang.language}
                                        onChange={(e) => {
                                          const newLangs = [...languages];
                                          newLangs[index].language = e.target.value;
                                          setLanguages(newLangs);
                                        }}
                                        placeholder="Language"
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                      />
                                      <input
                                        type="text"
                                        value={lang.proficiency}
                                        onChange={(e) => {
                                          const newLangs = [...languages];
                                          newLangs[index].proficiency = e.target.value;
                                          setLanguages(newLangs);
                                        }}
                                        placeholder="Proficiency"
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-sm text-slate-900 placeholder:text-slate-400"
                                      />
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => setLanguages([...languages, { language: "", proficiency: "" }])}
                                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add Language
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Update Resume Button */}
                      <Button
                        onClick={handleUpdateResume}
                        className="w-full py-7 rounded-lg font-semibold text-base transition-all bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white mt-6"
                      >
                        Update Resume
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="w-px bg-gradient-to-b from-blue-400/10 via-blue-400/30 to-blue-400/10"></div>

      {/* Right Section - 50% */}
      <div className="w-1/2 bg-gradient-to-br from-blue-50 via-white to-teal-50/30">
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
                  AI-Powered Resume Builder
                </h2>

                {/* Subtext */}
                <p className="text-slate-600 leading-relaxed">
                  Let our intelligent system help you craft the perfect resume. We'll analyze your profile, suggest improvements, and ensure your resume stands out to employers.
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
                    {isUpdating ? "Updating Your Resume" : loadingMessage}
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
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col p-6"
            >
              {/* Top Section */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">John Doe</h2>
                  <p className="text-sm text-slate-500">Software Engineer</p>
                </div>
                <Button
                  onClick={handleDownload}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 border border-blue-200"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </div>

              {/* Resume Preview Card */}
              <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-y-auto">
                <div className="p-8">
                  {/* Header Section with Image */}
                  <div className="flex items-start gap-6 pb-8 mb-8 border-b border-slate-100">
                    {/* User Image */}
                    <div className="flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Profile"
                        className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">John Doe</h1>
                      <p className="text-lg text-slate-600 mb-4">Senior Software Engineer</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span>john.doe@email.com</span>
                        <span>•</span>
                        <span>+1 (555) 123-4567</span>
                        <span>•</span>
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

                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-slate-900">Senior Software Engineer</h3>
                          <p className="text-slate-600">Tech Company Inc.</p>
                        </div>
                        <span className="text-sm text-slate-500">2020 - Present</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-700 space-y-1.5 ml-2">
                        <li>Led development of microservices architecture serving 1M+ users</li>
                        <li>Improved system performance by 40% through optimization</li>
                        <li>Mentored team of 5 junior developers</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-slate-900">Software Engineer</h3>
                          <p className="text-slate-600">StartupHub</p>
                        </div>
                        <span className="text-sm text-slate-500">2017 - 2020</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-700 space-y-1.5 ml-2">
                        <li>Developed RESTful APIs and responsive web applications</li>
                        <li>Collaborated with cross-functional teams on product features</li>
                        <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                      </ul>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="pb-8 mb-8 border-b border-slate-100">
                    <h2 className="text-lg font-medium text-slate-900 mb-5">Education</h2>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">Bachelor of Science in Computer Science</h3>
                        <p className="text-slate-600">University of Technology</p>
                      </div>
                      <span className="text-sm text-slate-500">2013 - 2017</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="pb-2">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
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