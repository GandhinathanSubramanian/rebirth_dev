import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import QuestionPage from "./QuestionPage";
import TestSampleCarousel from "./TestSampleCarousel"; // OLD AUTO VIDEO FLOW - HIDDEN
import TestSampleManual from "./TestSampleManual"; // NEW MANUAL FLOW
import AssessmentOverviewStep from "./AssessmentOverviewStep";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Camera,
  Mic,
  Headphones,
  Wifi,
  AlertCircle,
  Sparkles,
  Shield,
  FileCheck,
  UserCheck,
  Settings,
  Target,
  Zap,
  Award,
  Lock,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AttendAssessmentProps {
  assessmentName?: string;
  onBack?: () => void;
  onNavigateToView?: () => void;
  previewMode?: boolean;
}

const AttendAssessment: React.FC<AttendAssessmentProps> = ({
  assessmentName = "Frontend Developer Assessment",
  onBack,
  onNavigateToView,
  previewMode = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(previewMode);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    privacyAccepted: false,
    englishFluent: "",
    requiresSupport: "",
    honestyName: "",
  });

  const steps = [
    { id: 1, title: "Welcome", icon: UserCheck },
    { id: 2, title: "Overview", icon: Target },
    { id: 3, title: "Setup", icon: Settings },
    { id: 4, title: "Agreement", icon: Shield },
    { id: 5, title: "Test Sample", icon: Eye },
  ];

  const progress = (currentStep / 5) * 100;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartAssessment = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowQuestions(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleAssessmentComplete = () => {
    onBack?.();
  };

  const handleLogoClick = () => {
    onNavigateToView?.();
  };

  // Show Question Page
  if (showQuestions) {
    return (
      <QuestionPage 
        onComplete={handleAssessmentComplete} 
        onLogoClick={handleLogoClick}
        previewMode={previewMode}
        onBackToLibrary={previewMode ? onBack : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-teal-100/50"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Glowing Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Modern Header with Glassmorphism */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-gray-200 backdrop-blur-xl bg-white/80"
        >
          <div className="w-full px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogoClick}
                className="flex items-center gap-2"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-500/30">
                  <svg
                    className="w-5 h-5 text-white"
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
              </motion.button>

              {/* User Info */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-semibold text-white">
                    JD
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-600">
                    john.doe@example.com
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Modern Progress Bar */}
        <div className="max-w-7xl mx-auto px-8 py-5 mt-5">
          <div className="relative">
            {/* Progress Background */}
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-gradient-to-br from-teal-500 to-teal-400 shadow-lg shadow-teal-500/30"
                          : isActive
                          ? "bg-gradient-to-br from-blue-500 to-blue-400 shadow-lg shadow-blue-500/30"
                          : "bg-white border-2 border-gray-200"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon
                          className={`w-5 h-5 ${
                            isActive ? "text-white" : "text-gray-400"
                          }`}
                        />
                      )}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-blue-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p
                        className={`text-xs font-medium ${
                          isActive || isCompleted ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400">Step {step.id}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-5xl mx-auto px-8 pb-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Welcome & Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200 p-8 w-full max-w-2xl">
                  <div className="space-y-6">
                    {/* Header */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-center space-y-2"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs text-blue-700">
                          Let's get started
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Welcome to Your Assessment
                      </h2>
                      <p className="text-sm text-gray-600">
                        Let's begin by verifying your details
                      </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700 text-xs">
                            First Name *
                          </Label>
                          <Input
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                            className="h-11 bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700 text-xs">
                            Last Name *
                          </Label>
                          <Input
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                            className="h-11 bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 text-xs">
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="h-11 bg-gray-50 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:bg-white"
                        />
                      </div>

                      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacyAccepted}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              privacyAccepted: checked as boolean,
                            })
                          }
                          className="mt-0.5 border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <Label
                          htmlFor="privacy"
                          className="text-xs text-gray-700 cursor-pointer leading-relaxed"
                        >
                          I have read and accepted the privacy policy and
                          candidate terms
                        </Label>
                      </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-center pt-2"
                    >
                      <Button
                        onClick={handleNext}
                        className="h-10 px-8 text-sm bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30 transition-all"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Assessment Overview */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200 p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 border border-teal-200 mb-2">
                        <Target className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs text-teal-700">
                          Assessment Details
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Hello {formData.firstName}! 👋
                      </h2>
                      <p className="text-sm text-gray-600 max-w-3xl">
                        Ready to showcase your skills? This assessment will help
                        you stand out from the crowd. Let's dive into what to
                        expect.
                      </p>
                    </motion.div>

                    {/* Assessment Steps */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <AssessmentOverviewStep />
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3 pt-2"
                    >
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="h-10 px-6 text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 h-10 text-sm bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30"
                      >
                        Continue to Setup
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Assessment Setup */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200 p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 border border-purple-200 mb-2">
                        <Settings className="w-3.5 h-3.5 text-purple-600" />
                        <span className="text-xs text-purple-700">
                          Personalize Your Experience
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Assessment Setup
                      </h2>
                      <p className="text-sm text-gray-600">
                        Help us customize the assessment for your needs
                      </p>
                    </motion.div>

                    {/* Questions */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      {/* English Fluency */}
                      <div className="space-y-3">
                        <Label className="text-gray-900 text-sm block">
                          Are you fluent in English?
                        </Label>
                        <RadioGroup
                          value={formData.englishFluent}
                          onValueChange={(value) =>
                            setFormData({ ...formData, englishFluent: value })
                          }
                          className="grid grid-cols-2 gap-3"
                        >
                          <div>
                            <RadioGroupItem
                              value="yes"
                              id="english-yes"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="english-yes"
                              className="flex items-center gap-2 p-4 rounded-xl border-2 border-gray-300 bg-white cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-all hover:border-blue-400 hover:shadow-lg"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm text-gray-900 font-medium">
                                Yes, I'm fluent
                              </span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="no"
                              id="english-no"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="english-no"
                              className="flex items-center gap-2 p-4 rounded-xl border-2 border-gray-300 bg-white cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-all hover:border-blue-400 hover:shadow-lg"
                            >
                              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm text-gray-900 font-medium">
                                No, I'm not fluent
                              </span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Accessibility Support */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-gray-900 text-sm block mb-2">
                            Do you require accessibility support?
                          </Label>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            For conditions affecting memory, concentration (ADHD, dyslexia, autism), we can provide accommodations. If you don't need adjustments, select "No".
                          </p>
                        </div>
                        <RadioGroup
                          value={formData.requiresSupport}
                          onValueChange={(value) =>
                            setFormData({ ...formData, requiresSupport: value })
                          }
                          className="grid grid-cols-2 gap-3"
                        >
                          <div>
                            <RadioGroupItem
                              value="yes"
                              id="support-yes"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="support-yes"
                              className="flex items-center gap-2 p-4 rounded-xl border-2 border-gray-300 bg-white cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-all hover:border-blue-400 hover:shadow-lg"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm text-gray-900 font-medium">
                                Yes, I need support
                              </span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="no"
                              id="support-no"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="support-no"
                              className="flex items-center gap-2 p-4 rounded-xl border-2 border-gray-300 bg-white cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-all hover:border-blue-400 hover:shadow-lg"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm text-gray-900 font-medium">
                                No, I don't need support
                              </span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3 pt-2"
                    >
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="h-10 px-6 text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 h-10 text-sm bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30"
                      >
                        Continue to Agreement
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Honesty Agreement */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200 p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2 text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs text-emerald-700">
                          Final Step
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Assessment Integrity Agreement
                      </h2>
                      <p className="text-sm text-gray-600">
                        Please carefully review and agree to our assessment guidelines
                      </p>
                    </motion.div>

                    {/* Agreement Content */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="max-w-4xl mx-auto"
                    >
                      <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 max-h-[380px] overflow-y-auto custom-scrollbar">
                        <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
                          <p className="text-xs leading-relaxed">
                            By participating in this assessment, I acknowledge and agree to the following terms and conditions governing the evaluation process. This agreement is designed to ensure fairness, integrity, and equal opportunity for all candidates.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Assessment Integrity:</strong> I agree to complete all tasks independently and without unauthorized assistance. This assessment is designed to evaluate my genuine skills, knowledge, and abilities. I understand that the work submitted must be entirely my own and reflect my true capabilities. I will not seek help from other individuals, whether in person, via phone, through messaging apps, or any other communication method during the assessment period.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Authorized Tools and Resources:</strong> I will not use AI assistants (such as ChatGPT, Claude, Copilot, or similar tools), external search engines for direct answers, online forums, or any automated tools that provide solutions to assessment questions. Permitted tools include basic calculators for mathematical computations, pen and paper for notes and working through problems, official documentation if explicitly allowed, and standard development environments and code editors.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Monitoring and Proctoring Consent:</strong> I understand and consent that this assessment may be monitored to ensure fairness and integrity for all candidates. Monitoring methods may include periodic screenshots of my screen, webcam snapshots to verify my identity and ensure I am alone, and tracking of browser activity and tab switches. I agree to position myself in a well-lit environment where my face is clearly visible if webcam monitoring is enabled. I will not leave the assessment area or have other individuals present during the test.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Honest Representation:</strong> All information I have provided and will provide during this assessment is accurate, truthful, and represents my own work. I have not and will not misrepresent my skills, experience, or qualifications. I understand that any form of dishonest conduct, including plagiarism, cheating, or misrepresentation, may result in immediate disqualification from the hiring process and potential termination if already employed.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Confidentiality and Non-Disclosure:</strong> I agree to keep all assessment content strictly confidential. I will not share, copy, reproduce, or discuss any questions, tasks, or materials from this assessment with anyone, including other candidates, online forums, social media, or any public platforms. I understand that assessment materials are proprietary and protected by intellectual property laws. Unauthorized sharing or distribution may result in legal action.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Technical Requirements:</strong> I confirm that I am taking this assessment in a quiet, private location free from distractions and interruptions. I have tested and verified that my internet connection is stable, my webcam and microphone are functioning properly (if required), and my computer meets all technical requirements. I understand that technical difficulties on my end may affect my ability to complete the assessment and agree to notify the administrator immediately if I experience any issues.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Fair Assessment Practices:</strong> I understand that all candidates are evaluated using the same criteria and standards. I agree to complete the assessment within the allotted time frame and will not attempt to circumvent time limits or access restrictions. I acknowledge that attempts to manipulate the assessment system, including but not limited to hacking, using unauthorized software, or exploiting technical vulnerabilities, will result in immediate disqualification and may be reported to relevant authorities.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Data Privacy and Usage:</strong> I consent to the collection and processing of my assessment data, including responses, timing information, and monitoring data (if applicable) for evaluation purposes. I understand this data will be used solely for assessing my candidacy and will be handled in accordance with applicable privacy laws. My personal information will not be shared with third parties except as required by law or as necessary for the hiring process.
                          </p>
                          
                          <p className="text-xs leading-relaxed">
                            <strong>Acknowledgment:</strong> By providing my electronic signature below, I acknowledge that I have read, understood, and agree to comply with all the terms and conditions outlined in this Integrity Agreement. I understand that violation of any of these terms may result in disqualification from the current opportunity and potential exclusion from future opportunities with the organization. I certify that I am the person whose name appears on this assessment and that I will complete this assessment to the best of my abilities with honesty and integrity.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Signature */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-2xl mx-auto space-y-3"
                    >
                      <div className="space-y-2">
                        <Label className="text-gray-900 text-sm">
                          Electronic Signature *
                        </Label>
                        <p className="text-xs text-gray-600">
                          Type your full name below to acknowledge and agree to all the terms and conditions stated above. Your electronic signature has the same legal validity as a handwritten signature.
                        </p>
                      </div>
                      <Input
                        placeholder="Enter your full legal name"
                        value={formData.honestyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            honestyName: e.target.value,
                          })
                        }
                        className="h-12 bg-white border-2 border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500 text-center"
                      />
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 justify-center">
                        <Lock className="w-3 h-3" />
                        <span>Your signature is encrypted and securely stored</span>
                      </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3 pt-2"
                    >
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="h-10 px-6 text-sm border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 h-10 text-sm bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30"
                      >
                        I Agree - Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Test Sample */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200 p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2 text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-2">
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs text-emerald-700">
                          Sample Question
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Test Sample
                      </h2>
                      <p className="text-sm text-gray-600">
                        Review a sample question to get a feel for the assessment
                      </p>
                    </motion.div>

                    {/* Sample Question */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <TestSampleManual 
                        onComplete={handleStartAssessment} 
                        assessmentName="Front End Developer Role"
                        totalAssessmentQuestions={20}
                      />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              {/* Animated Logo */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <svg
                  className="w-10 h-10 text-white"
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
              </motion.div>

              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-semibold text-white mb-3"
              >
                Preparing Your Assessment
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-blue-100 text-sm mb-8"
              >
                Setting up your test environment...
              </motion.p>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="w-3 h-3 rounded-full bg-white"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AttendAssessment;