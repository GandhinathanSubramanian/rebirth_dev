import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  FileText,
  HelpCircle,
  Users,
  Settings,
  Eye,
  ChevronRight,
  Plus,
  Trash2,
  X,
  Type,
  CheckSquare,
  ToggleLeft,
  MessageSquare,
  Calendar,
  Save,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";

interface CreateAssessmentProps {
  onBack: () => void;
  onNavigateToAssessments?: () => void;
}

export default function CreateAssessment({
  onBack,
  onNavigateToAssessments,
}: CreateAssessmentProps) {
  const [activeTab, setActiveTab] = useState<
    "details" | "tests" | "configuration"
  >("details");
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishType, setPublishType] = useState<"draft" | "publish">(
    "publish",
  );

  // Test Libraries State
  const [testLibraries, setTestLibraries] = useState<any[]>([]);
  const [additionalQuestions, setAdditionalQuestions] = useState<any[]>([]);
  const [isQuestionTypeDialogOpen, setIsQuestionTypeDialogOpen] =
    useState(false);
  const [formData, setFormData] = useState({
    assessmentName: "",
    jobTitle: "",
    description: "",
    department: "",
    level: "",
    workType: "",
    location: "",
  });

  // Configuration State
  const [configData, setConfigData] = useState({
    totalTimeLimit: "18",
    attemptsAllowed: "1",
    passingScore: "70",
    questionOrder: "sequential",
  });
  const [candidateDeadline, setCandidateDeadline] = useState<Date | undefined>(
    undefined,
  );
  const [assessmentExpiration, setAssessmentExpiration] = useState<
    Date | undefined
  >(undefined);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const tabs = [
    {
      id: "details" as const,
      label: "Assessment Details",
      icon: FileText,
      description: "Basic assessment information",
    },
    {
      id: "tests" as const,
      label: "Test and Questions",
      icon: HelpCircle,
      description: "Add tests and questions",
    },
    {
      id: "configuration" as const,
      label: "Configuration",
      icon: Settings,
      description: "Assessment settings",
    },
  ];

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  // Add Test Library
  const addTestLibrary = () => {
    const newLibrary = {
      id: Date.now(),
      testLibrary: "",
      questionCount: "0",
      selectionMethod: "random",
      extraTime: "0",
    };
    setTestLibraries([...testLibraries, newLibrary]);
  };

  // Delete Test Library
  const deleteTestLibrary = (id: number) => {
    setTestLibraries(testLibraries.filter((lib) => lib.id !== id));
  };

  // Update Test Library
  const updateTestLibrary = (id: number, field: string, value: string) => {
    setTestLibraries(
      testLibraries.map((lib) =>
        lib.id === id ? { ...lib, [field]: value } : lib,
      ),
    );
  };

  // Add Additional Question
  const addAdditionalQuestion = () => {
    setIsQuestionTypeDialogOpen(true);
  };

  // Add Question with Type
  const addQuestionWithType = (type: string) => {
    const newQuestion = {
      id: Date.now(),
      question: "",
      type: type,
      required: false,
    };
    setAdditionalQuestions([...additionalQuestions, newQuestion]);
    setIsQuestionTypeDialogOpen(false);
  };

  // Delete Additional Question
  const deleteAdditionalQuestion = (id: number) => {
    setAdditionalQuestions(additionalQuestions.filter((q) => q.id !== id));
  };

  // Add Team Member
  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      member: "",
      role: "",
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  // Delete Team Member
  const deleteTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  // Update Team Member
  const updateTeamMember = (id: number, field: string, value: string) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    );
  };

  // Handle Save as Draft
  const handleSaveAsDraft = async () => {
    setPublishType("draft");
    setPublishSuccess(true);
    setShowPublishDialog(true);
    // Auto-close after 3 seconds and navigate to Assessment list
    setTimeout(() => {
      setShowPublishDialog(false);
      setPublishSuccess(false);
      if (onNavigateToAssessments) {
        onNavigateToAssessments();
      }
    }, 3000);
  };

  // Handle Publish Assessment
  const handlePublishAssessment = async () => {
    setPublishType("publish");
    setPublishSuccess(true);
    setShowPublishDialog(true);
    // Auto-close after 3 seconds and navigate to Assessment list
    setTimeout(() => {
      setShowPublishDialog(false);
      setPublishSuccess(false);
      if (onNavigateToAssessments) {
        onNavigateToAssessments();
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">
      {/* Header - Sticky */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-400/40 sticky top-0 z-20">
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 border border-slate-200/60 flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                {formData.assessmentName || "New Assessment"}
              </h1>
              <p className="text-xs text-slate-500">
                Create and configure your assessment
              </p>
            </div>
          </div>
          <Button
            onClick={handlePublishAssessment}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all px-6"
          >
            Publish Assessment
          </Button>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="grid grid-cols-12">
        {/* Left Section - Navigation (2 columns) - Sticky */}
        <div className="col-span-2 bg-gradient-to-br from-white to-slate-50/50 border-r border-dashed border-slate-400/40 min-h-[calc(100vh-89px)] sticky top-[89px] self-start">
          <div className="p-6 h-[calc(100vh-89px)] flex flex-col justify-between">
            {/* Tabs Section */}
            <div className="flex flex-col space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl transition-all relative overflow-hidden group ${
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white"
                        : "bg-white hover:bg-slate-50 border border-slate-200/60 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAssessmentTab"
                        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <div className="relative flex items-start gap-3">
                      <div
                        className={`mt-0.5 ${isActive ? "text-white" : "text-blue-600"}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium text-sm mb-1 ${isActive ? "text-white" : "text-slate-900"}`}
                        >
                          {tab.label}
                        </div>
                        <div
                          className={`text-xs leading-relaxed ${isActive ? "text-blue-100" : "text-slate-500"}`}
                        >
                          {tab.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Help Section - Bottom of sidebar */}
            <div className="flex flex-col">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-amber-900 mb-1">
                      Need Help?
                    </p>
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      Learn how to create effective assessments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Content (10 columns) */}
        <div className="col-span-10 p-8">
          {activeTab === "details" && (
            <>
              {/* Form Card */}
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                {/* Card Header with Title and Buttons */}
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Assessment Details
                    </h3>
                    <p className="text-sm text-slate-600">
                      Configure your assessment settings and information
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="pt-5 px-8 pb-8">
                  <div className="grid grid-cols-12 gap-8">
                    {/* Left Column - 7 cols */}
                    <div className="col-span-7 space-y-6">
                      {/* Assessment Name */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="assessmentName"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Assessment Name{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="assessmentName"
                          placeholder="e.g., Senior Frontend Developer Assessment"
                          value={formData.assessmentName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              assessmentName: e.target.value,
                            })
                          }
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                        />
                      </div>

                      {/* Job Title */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="jobTitle"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Job Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="jobTitle"
                          placeholder="e.g., Senior Frontend Developer"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobTitle: e.target.value,
                            })
                          }
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="description"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Provide a brief description of the assessment and what it evaluates..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[130px] bg-slate-50/30 focus:bg-white transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Right Column - 5 cols */}
                    <div className="col-span-5 space-y-6">
                      {/* Department */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="department"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Department
                        </Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) =>
                            setFormData({ ...formData, department: value })
                          }
                        >
                          <SelectTrigger
                            id="department"
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30"
                          >
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">
                              Operations
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Level */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="level"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Level
                        </Label>
                        <Select
                          value={formData.level}
                          onValueChange={(value) =>
                            setFormData({ ...formData, level: value })
                          }
                        >
                          <SelectTrigger
                            id="level"
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30"
                          >
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mid">Mid-Level</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="principal">Principal</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Work Type */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="workType"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Work Type
                        </Label>
                        <Select
                          value={formData.workType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, workType: value })
                          }
                        >
                          <SelectTrigger
                            id="workType"
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30"
                          >
                            <SelectValue placeholder="Select work type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="onsite">On-site</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Location */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="location"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Location
                        </Label>
                        <Input
                          id="location"
                          placeholder="e.g., San Francisco, CA"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "tests" && (
            <>
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Test and Questions
                    </h3>
                    <p className="text-sm text-slate-600">
                      Add tests and questions to evaluate candidates
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
                <div className="pt-4 px-8 pb-8">
                  {/* Light Background Parent Box */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 space-y-8">
                    {/* Add Test Library Section */}
                    <div>
                      <h3 className="font-medium text-slate-900 mb-4">
                        Add test library
                      </h3>

                      {/* Test Library Items */}
                      <div className="space-y-4 mb-4">
                        {testLibraries.map((library, index) => (
                          <motion.div
                            key={library.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 border border-slate-200/60"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-5">
                              <h4 className="font-medium text-slate-700">
                                Test Library #{index + 1} (0 mins)
                              </h4>
                              <button
                                onClick={() => deleteTestLibrary(library.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                              >
                                <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                              </button>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              {/* Test Library */}
                              <div className="space-y-2">
                                <Label className="text-slate-700 text-sm font-medium">
                                  Test Library{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                  value={library.testLibrary}
                                  onValueChange={(value) =>
                                    updateTestLibrary(
                                      library.id,
                                      "testLibrary",
                                      value,
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-12 py-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                                    <SelectValue placeholder="Select test library" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="frontend">
                                      Frontend Developer Test
                                    </SelectItem>
                                    <SelectItem value="backend">
                                      Backend Developer Test
                                    </SelectItem>
                                    <SelectItem value="fullstack">
                                      Full Stack Test
                                    </SelectItem>
                                    <SelectItem value="react">
                                      React Specialist Test
                                    </SelectItem>
                                    <SelectItem value="nodejs">
                                      Node.js Test
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Question Count */}
                              <div className="space-y-2">
                                <Label className="text-slate-700 text-sm font-medium">
                                  Question Count (Max: 10){" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="10"
                                  value={library.questionCount}
                                  onChange={(e) =>
                                    updateTestLibrary(
                                      library.id,
                                      "questionCount",
                                      e.target.value,
                                    )
                                  }
                                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                                />
                              </div>

                              {/* Selection Method */}
                              <div className="space-y-2">
                                <Label className="text-slate-700 text-sm font-medium">
                                  Selection Method{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                  value={library.selectionMethod}
                                  onValueChange={(value) =>
                                    updateTestLibrary(
                                      library.id,
                                      "selectionMethod",
                                      value,
                                    )
                                  }
                                >
                                  <SelectTrigger className="h-12 py-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="random">
                                      Random Selection
                                    </SelectItem>
                                    <SelectItem value="sequential">
                                      Sequential
                                    </SelectItem>
                                    <SelectItem value="difficulty">
                                      By Difficulty
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Extra Time */}
                              <div className="space-y-2">
                                <Label className="text-slate-700 text-sm font-medium">
                                  Extra Time (minutes)
                                </Label>
                                <Input
                                  type="number"
                                  min="0"
                                  value={library.extraTime}
                                  onChange={(e) =>
                                    updateTestLibrary(
                                      library.id,
                                      "extraTime",
                                      e.target.value,
                                    )
                                  }
                                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Add Test Library Button */}
                      <button
                        onClick={addTestLibrary}
                        className="w-full border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-xl p-4 hover:bg-purple-50/20 transition-all group"
                      >
                        <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                          <Plus className="w-5 h-5" />
                          <span>Add Test Library</span>
                        </div>
                      </button>
                    </div>

                    {/* Additional Questions Section */}
                    <div>
                      <div className="mb-4">
                        <h3 className="font-medium text-slate-900">
                          Additional Questions
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Pre-screening questions (max 5)
                        </p>
                      </div>

                      {/* Additional Questions Items */}
                      <div className="space-y-4 mb-4">
                        {additionalQuestions.map((question, index) => (
                          <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 border border-slate-200/60"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <Label className="text-slate-700 text-sm font-medium mb-2 block">
                                  Question #{index + 1}
                                </Label>
                                <Input
                                  placeholder="Enter your pre-screening question..."
                                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                                />
                              </div>
                              <button
                                onClick={() =>
                                  deleteAdditionalQuestion(question.id)
                                }
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group mt-6"
                              >
                                <X className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Add Additional Question Button */}
                      <button
                        onClick={addAdditionalQuestion}
                        disabled={additionalQuestions.length >= 5}
                        className="w-full border-2 border-dashed border-purple-300 hover:border-purple-400 rounded-xl p-4 hover:bg-purple-50/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                      >
                        <div className="flex items-center justify-center gap-2 text-purple-600 font-medium">
                          <Plus className="w-5 h-5" />
                          <span>Add Additional Question</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "configuration" && (
            <>
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Configuration
                    </h3>
                    <p className="text-sm text-slate-600">
                      Configure assessment settings and preferences
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleSaveAsDraft}
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                  </div>
                </div>
                <div className="pt-4 px-8 pb-8">
                  <div className="space-y-6">
                    {/* Timing & Attempts Section */}
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6">
                      <div className="mb-6">
                        <h3 className="font-medium text-slate-900 mb-1">
                          Timing & Attempts
                        </h3>
                        <p className="text-sm text-slate-500">
                          Configure time limits and attempt settings
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Total Time Limit */}
                        <div className="space-y-2">
                          <Label className="text-slate-700 text-sm font-medium">
                            Total Time Limit (minutes)
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={configData.totalTimeLimit}
                            onChange={(e) =>
                              setConfigData({
                                ...configData,
                                totalTimeLimit: e.target.value,
                              })
                            }
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                          />
                        </div>

                        {/* Attempts Allowed */}
                        <div className="space-y-2">
                          <Label className="text-slate-700 text-sm font-medium">
                            Attempts Allowed
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            value={configData.attemptsAllowed}
                            onChange={(e) =>
                              setConfigData({
                                ...configData,
                                attemptsAllowed: e.target.value,
                              })
                            }
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                          />
                        </div>

                        {/* Passing Score */}
                        <div className="space-y-2">
                          <Label className="text-slate-700 text-sm font-medium">
                            Passing Score (%)
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={configData.passingScore}
                            onChange={(e) =>
                              setConfigData({
                                ...configData,
                                passingScore: e.target.value,
                              })
                            }
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                          />
                        </div>

                        {/* Question Order */}
                        <div className="space-y-2">
                          <Label className="text-slate-700 text-sm font-medium">
                            Question Order
                          </Label>
                          <Select
                            value={configData.questionOrder}
                            onValueChange={(value) =>
                              setConfigData({
                                ...configData,
                                questionOrder: value,
                              })
                            }
                          >
                            <SelectTrigger className="h-12 py-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sequential">
                                Sequential
                              </SelectItem>
                              <SelectItem value="random">Random</SelectItem>
                              <SelectItem value="difficulty">
                                By Difficulty
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Deadline & Expiration Cards */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Candidate Deadline Card */}
                      <div className="bg-white rounded-xl p-6 border border-slate-200/60">
                        <div className="mb-4">
                          <h3 className="font-medium text-slate-900 mb-1">
                            Candidate Deadline
                          </h3>
                          <p className="text-sm text-slate-500">
                            Set deadline for invited candidates
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-700 text-sm font-medium">
                            Deadline Date
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="h-12 w-full flex items-center justify-between px-3 py-1 text-sm border border-slate-200 rounded-md bg-slate-50/30 hover:bg-white transition-colors focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-[3px]">
                                <span
                                  className={
                                    candidateDeadline
                                      ? "text-slate-900"
                                      : "text-slate-400"
                                  }
                                >
                                  {candidateDeadline
                                    ? format(candidateDeadline, "PPP")
                                    : "Pick a date"}
                                </span>
                                <Calendar className="w-4 h-4 text-slate-400" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <CalendarComponent
                                mode="single"
                                selected={candidateDeadline}
                                onSelect={setCandidateDeadline}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {/* Assessment Expiration Card */}
                      <div className="bg-white rounded-xl p-6 border border-slate-200/60">
                        <div className="mb-4">
                          <h3 className="font-medium text-slate-900 mb-1">
                            Assessment Expiration
                          </h3>
                          <p className="text-sm text-slate-500">
                            Set expiration for share link users
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-700 text-sm font-medium">
                            Expiration Date{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="h-12 w-full flex items-center justify-between px-3 py-1 text-sm border border-slate-200 rounded-md bg-slate-50/30 hover:bg-white transition-colors focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-[3px]">
                                <span
                                  className={
                                    assessmentExpiration
                                      ? "text-slate-900"
                                      : "text-slate-400"
                                  }
                                >
                                  {assessmentExpiration
                                    ? format(assessmentExpiration, "PPP")
                                    : "Pick a date"}
                                </span>
                                <Calendar className="w-4 h-4 text-slate-400" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <CalendarComponent
                                mode="single"
                                selected={assessmentExpiration}
                                onSelect={setAssessmentExpiration}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "team" && (
            <>
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Team and Publishing
                    </h3>
                    <p className="text-sm text-slate-600">
                      Assign team members and publish the assessment
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-6">
                  {/* Team Access Section */}
                  <div className="bg-white rounded-xl border border-slate-200/60 p-6">
                    <div className="mb-6">
                      <h3 className="font-medium text-slate-900 mb-1">
                        Team Access
                      </h3>
                      <p className="text-sm text-slate-500">
                        Manage who can access this assessment
                      </p>
                    </div>

                    {/* Team Members List */}
                    <div className="space-y-4">
                      {teamMembers.map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-4"
                        >
                          {/* Select Member */}
                          <div className="flex-1">
                            <Select
                              value={member.member}
                              onValueChange={(value) =>
                                updateTeamMember(member.id, "member", value)
                              }
                            >
                              <SelectTrigger className="h-12 py-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                                <SelectValue placeholder="Select member" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ramesh.subramanian+2006">
                                  ramesh.subramanian+2006
                                </SelectItem>
                                <SelectItem value="john.doe@example.com">
                                  john.doe@example.com
                                </SelectItem>
                                <SelectItem value="jane.smith@example.com">
                                  jane.smith@example.com
                                </SelectItem>
                                <SelectItem value="mike.johnson@example.com">
                                  mike.johnson@example.com
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Role */}
                          <div className="flex-1">
                            <Select
                              value={member.role}
                              onValueChange={(value) =>
                                updateTeamMember(member.id, "role", value)
                              }
                            >
                              <SelectTrigger className="h-12 py-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteTeamMember(member.id)}
                            className="p-3 hover:bg-red-50 rounded-lg transition-colors group"
                          >
                            <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                          </button>
                        </motion.div>
                      ))}

                      {/* Add Team Member Button */}
                      <button
                        onClick={addTeamMember}
                        className="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 hover:bg-blue-50/20 transition-all group"
                      >
                        <div className="flex items-center justify-center gap-2 text-slate-500 group-hover:text-blue-600 font-medium transition-colors">
                          <Plus className="w-5 h-5" />
                          <span>Add Team Member</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Buttons */}
                  <div className="flex items-center justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleSaveAsDraft}
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Question Type Dialog */}
      <Dialog
        open={isQuestionTypeDialogOpen}
        onOpenChange={setIsQuestionTypeDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                  Select Question Type
                </DialogTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Choose the type of question you want to add
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* Short Text */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addQuestionWithType("text")}
              className="p-6 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-blue-100 transition-all">
                <Type className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Short Text</h4>
              <p className="text-sm text-slate-600">
                Single line text response
              </p>
            </motion.button>

            {/* Multiple Choice */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addQuestionWithType("multiple-choice")}
              className="p-6 rounded-xl border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center mb-4 group-hover:from-teal-200 group-hover:to-teal-100 transition-all">
                <CheckSquare className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Multiple Choice
              </h4>
              <p className="text-sm text-slate-600">Select one from options</p>
            </motion.button>

            {/* Yes/No */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addQuestionWithType("yes-no")}
              className="p-6 rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mb-4 group-hover:from-purple-200 group-hover:to-purple-100 transition-all">
                <ToggleLeft className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Yes/No</h4>
              <p className="text-sm text-slate-600">Binary choice question</p>
            </motion.button>

            {/* Long Form */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addQuestionWithType("long-form")}
              className="p-6 rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-4 group-hover:from-amber-200 group-hover:to-amber-100 transition-all">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Long Form</h4>
              <p className="text-sm text-slate-600">Paragraph text response</p>
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent className="max-w-lg p-0 overflow-hidden border-0">
          <div className="relative overflow-hidden">
            {/* Animated Background - Very Light Green */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-emerald-50/30 to-white">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)",
                }}
              />
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative p-12 text-center"
            >
              {/* Success Icon with Particles */}
              <div className="relative inline-block mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto flex items-center justify-center shadow-lg shadow-green-100/50"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                {/* Animated Ring */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="absolute inset-0 rounded-full border-4 border-green-300/30"
                />
              </div>

              {/* Success Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  {publishType === "draft"
                    ? "Assessment Saved as Draft!"
                    : "Assessment Published Successfully!"}
                </h3>
                <p className="text-slate-600">
                  {publishType === "draft"
                    ? "Your assessment has been saved and can be completed later."
                    : "Your assessment is now ready and published."}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
