import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, X, Eye, FileText, HelpCircle, Save, Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, GripVertical, RefreshCw, Search, Filter, Plus, Loader2, Edit2, Trash2, Clock, FileQuestion, ChevronDown, ChevronUp, ChevronLeft, ListChecks, CheckSquare, ToggleLeft, Type, Archive } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent } from "./ui/dialog";
import { Check } from "lucide-react";
import { Switch } from "./ui/switch";

interface CreateTestProps {
  onBack: () => void;
  onNavigateToMyTests?: () => void;
}

const allInstructions = [
  "Do not refresh the page during the test",
  "Each question carries equal marks",
  "Time limit applies to this assessment",
  "No external resources are allowed",
  "Answer all questions to the best of your ability",
  "Read each question carefully before answering",
  "You can navigate between questions freely",
  "Submit your test before the deadline",
  "Ensure stable internet connection throughout",
  "Contact support if you face technical issues",
];

const getRandomInstructions = (count: number) => {
  const shuffled = [...allInstructions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function CreateTest({ onBack, onNavigateToMyTests }: CreateTestProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "landing" | "questions">("overview");
  const [showInfoCard, setShowInfoCard] = useState(true);
  const [predefinedInstructions, setPredefinedInstructions] = useState(getRandomInstructions(5));
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [skillsets, setSkillsets] = useState<Array<{ 
    id: number; 
    name: string; 
    isOpen: boolean; 
    showQuestionTypeSelector: boolean;
    questions: Array<{
      id: string;
      questionName: string;
      type: string;
      options: string[];
      correctAnswer: number;
      timeLimit: string;
      isPreview?: boolean;
    }>;
  }>>([]);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [creatingQuestionType, setCreatingQuestionType] = useState("");
  const [currentSkillsetId, setCurrentSkillsetId] = useState<number | null>(null);
  const [questionFormData, setQuestionFormData] = useState({
    questionName: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    correctAnswers: [] as number[], // For multiple response
    timeLimit: "",
  });
  const [formData, setFormData] = useState({
    testName: "",
    testSummary: "",
    testRelevantFor: "",
    testLanguage: "",
    questionType: "",
    testType: "",
    difficultyLevel: "",
    source: "rebirth",
    testInstructions: "",
  });
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [extraDuration, setExtraDuration] = useState("");
  const [previewQuestionId, setPreviewQuestionId] = useState("");

  const handleRefreshInstructions = () => {
    setPredefinedInstructions(getRandomInstructions(5));
  };

  const getTotalQuestions = () => {
    return skillsets.reduce((total, skillset) => total + skillset.questions.length, 0);
  };

  const getTotalDuration = () => {
    let total = 0;
    skillsets.forEach(skillset => {
      skillset.questions.forEach(q => {
        total += parseInt(q.timeLimit) || 0;
      });
    });
    if (extraDuration) {
      total += parseInt(extraDuration);
    }
    return total;
  };

  // Check if all required fields are filled
  const isSaveEnabled = 
    formData.testName.trim() !== "" &&
    formData.testLanguage.trim() !== "" &&
    formData.questionType.trim() !== "" &&
    formData.testType.trim() !== "" &&
    formData.difficultyLevel.trim() !== "";

  const isPublishEnabled = 
    formData.testName.trim() !== "" && 
    skillsets.length > 0 && 
    getTotalQuestions() > 0;

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSaved(true);
    setActiveTab("questions");
  };

  const handlePublishClick = () => {
    setShowPublishDialog(true);
  };

  const handlePublish = async () => {
    // Directly show success popup
    setPublishSuccess(true);
    // Reset after 3 seconds and navigate to My Tests
    setTimeout(() => {
      setShowPublishDialog(false);
      setPublishSuccess(false);
      setExtraDuration("");
      setPreviewQuestionId("");
      if (onNavigateToMyTests) {
        onNavigateToMyTests();
      }
    }, 3000);
  };

  const tabs = [
    {
      id: "overview" as const,
      label: "Overview",
      icon: Eye,
      description: "Test overview and statistics",
    },
    {
      id: "landing" as const,
      label: "Landing Page",
      icon: FileText,
      description: "Test configuration and details",
    },
    {
      id: "questions" as const,
      label: "Questions",
      icon: HelpCircle,
      description: "Add and manage test questions",
    },
  ];

  const handleDragStart = (e: React.DragEvent, instruction: string) => {
    e.dataTransfer.setData("text/plain", instruction);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const instruction = e.dataTransfer.getData("text/plain");
    const currentText = formData.testInstructions;
    const newText = currentText ? `${currentText}\n${instruction}` : instruction;
    setFormData({ ...formData, testInstructions: newText });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const addSkillset = () => {
    const newSkillset = {
      id: Date.now(),
      name: "Skill test",
      isOpen: true,
      showQuestionTypeSelector: false,
      questions: [],
    };
    setSkillsets([...skillsets, newSkillset]);
  };

  const toggleSkillset = (id: number) => {
    setSkillsets(skillsets.map(skill => 
      skill.id === id ? { ...skill, isOpen: !skill.isOpen } : skill
    ));
  };

  const deleteSkillset = (id: number) => {
    setSkillsets(skillsets.filter(skill => skill.id !== id));
  };

  const showQuestionTypeSelector = (id: number) => {
    setSkillsets(skillsets.map(skill => 
      skill.id === id ? { ...skill, showQuestionTypeSelector: true } : skill
    ));
  };

  const hideQuestionTypeSelector = (id: number) => {
    setSkillsets(skillsets.map(skill => 
      skill.id === id ? { ...skill, showQuestionTypeSelector: false } : skill
    ));
  };

  const handleQuestionTypeSelect = (skillsetId: number, questionType: string) => {
    setCurrentSkillsetId(skillsetId);
    setCreatingQuestionType(questionType);
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setIsCreatingQuestion(true);
    }, 1500);
  };

  const cancelQuestionCreation = () => {
    setIsCreatingQuestion(false);
    setCreatingQuestionType("");
    setCurrentSkillsetId(null);
    setQuestionFormData({
      questionName: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      correctAnswers: [],
      timeLimit: "",
    });
  };

  const addOption = () => {
    setQuestionFormData({
      ...questionFormData,
      options: [...questionFormData.options, ""],
    });
  };

  const deleteOption = (index: number) => {
    if (questionFormData.options.length > 2) {
      const newOptions = questionFormData.options.filter((_, i) => i !== index);
      setQuestionFormData({
        ...questionFormData,
        options: newOptions,
        correctAnswer: questionFormData.correctAnswer >= newOptions.length ? 0 : questionFormData.correctAnswer,
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...questionFormData.options];
    newOptions[index] = value;
    setQuestionFormData({
      ...questionFormData,
      options: newOptions,
    });
  };

  const toggleCorrectAnswer = (index: number) => {
    const newCorrectAnswers = questionFormData.correctAnswers.includes(index)
      ? questionFormData.correctAnswers.filter(i => i !== index)
      : [...questionFormData.correctAnswers, index];
    setQuestionFormData({
      ...questionFormData,
      correctAnswers: newCorrectAnswers,
    });
  };

  const handleSaveQuestion = () => {
    if (!currentSkillsetId || !questionFormData.questionName || !questionFormData.timeLimit) {
      return;
    }

    const skillset = skillsets.find(s => s.id === currentSkillsetId);
    if (!skillset) return;

    const questionNumber = skillset.questions.length + 1;
    const newQuestion = {
      id: `Q${questionNumber.toString().padStart(2, '0')}`,
      questionName: questionFormData.questionName,
      type: creatingQuestionType,
      options: questionFormData.options.filter(opt => opt.trim() !== ""),
      correctAnswer: questionFormData.correctAnswer,
      timeLimit: questionFormData.timeLimit,
    };

    setSkillsets(skillsets.map(skill => 
      skill.id === currentSkillsetId 
        ? { ...skill, questions: [...skill.questions, newQuestion], showQuestionTypeSelector: false }
        : skill
    ));

    cancelQuestionCreation();
  };

  const deleteQuestion = (skillsetId: number, questionId: string) => {
    setSkillsets(skillsets.map(skill => 
      skill.id === skillsetId 
        ? { ...skill, questions: skill.questions.filter(q => q.id !== questionId) }
        : skill
    ));
  };

  const togglePreview = (skillsetId: number, questionId: string) => {
    setSkillsets(skillsets.map(skill => 
      skill.id === skillsetId 
        ? { 
            ...skill, 
            questions: skill.questions.map(q => 
              q.id === questionId ? { ...q, isPreview: !q.isPreview } : q
            ) 
          }
        : skill
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">
      {/* Header - Sticky */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-400/40 sticky top-0 z-20">
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={isCreatingQuestion ? cancelQuestionCreation : onBack}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 border border-slate-200/60 flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                {isCreatingQuestion 
                  ? (formData.testName || "Untitled Test")
                  : (isSaved ? formData.testName : "New Test")
                }
              </h1>
              <p className="text-xs text-slate-500">
                {isCreatingQuestion
                  ? (skillsets.find(s => s.id === currentSkillsetId)?.name || "Skill test")
                  : (isSaved ? "Add and manage test questions" : "Create and configure your assessment")
                }
              </p>
            </div>
          </div>
          {isCreatingQuestion ? (
            <Select value={creatingQuestionType} onValueChange={setCreatingQuestionType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Multiple Choice">
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4" />
                    <span>Multiple Choice</span>
                  </div>
                </SelectItem>
                <SelectItem value="Multiple Response">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" />
                    <span>Multiple Response</span>
                  </div>
                </SelectItem>
                <SelectItem value="True or False">
                  <div className="flex items-center gap-2">
                    <ToggleLeft className="w-4 h-4" />
                    <span>True or False</span>
                  </div>
                </SelectItem>
                <SelectItem value="Short Text">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span>Short Text</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Button
              onClick={handlePublishClick}
              disabled={!isPublishEnabled}
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all px-6"
            >
              Publish Test
            </Button>
          )}
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="grid grid-cols-12">
        {/* Left Section - Navigation (2 columns) - Sticky - Hidden when creating question */}
        {!isCreatingQuestion && (
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
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative flex items-start gap-3">
                      <div className={`mt-0.5 ${isActive ? "text-white" : "text-blue-600"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm mb-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                          {tab.label}
                        </div>
                        <div className={`text-xs leading-relaxed ${isActive ? "text-blue-100" : "text-slate-500"}`}>
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
                    <p className="text-xs font-medium text-amber-900 mb-1">Need Help?</p>
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                      Learn how to create effective assessments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Right Section - Form (10 columns or 12 if creating question) - Scrollable */}
        <div className={`${isCreatingQuestion ? "col-span-12" : "col-span-10"} p-8 space-y-6 overflow-y-auto`}>
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
              <div className="text-center">
                {/* Animated Loading Circle */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-20 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-white"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  </div>
                </div>
                
                {/* Loading Text */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Saving Test Details</h3>
                <p className="text-slate-600 mb-4">Please wait while we save your test configuration...</p>
                
                {/* Progress Dots */}
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-600"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-600"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-600"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Question Creation UI */}
          {!isLoading && isCreatingQuestion && activeTab === "questions" && (
            <>
              {/* Create Your Question Card */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Create Your Question</h3>
                    <p className="text-sm text-slate-600">Add question details, options, and set the correct answer</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={cancelQuestionCreation}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveQuestion}
                      disabled={!questionFormData.questionName || !questionFormData.timeLimit}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Question
                    </Button>
                  </div>
                </div>
              </div>

              {/* White Background Box */}
              <div className="bg-white rounded-xl p-6 border border-slate-200/60">
                {/* Grid Layout - 6/6 */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Left 6 - Question Name with Rich Text Editor */}
                  <div className="col-span-6 space-y-4">
                  <div className="space-y-3">
                    <Label className="text-slate-700 text-sm font-medium">
                      Question Name
                    </Label>
                    
                    {/* Rich Text Toolbar */}
                    <div className="flex items-center gap-1 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Bold">
                        <Bold className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Italic">
                        <Italic className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Underline">
                        <Underline className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Strikethrough">
                        <Strikethrough className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 mx-1"></div>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Bulleted List">
                        <List className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Numbered List">
                        <ListOrdered className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 mx-1"></div>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Align Left">
                        <AlignLeft className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Align Center">
                        <AlignCenter className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Align Right">
                        <AlignRight className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 mx-1"></div>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Insert Image">
                        <ImageIcon className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>

                    {/* Editor Text Area */}
                    <Textarea
                      placeholder="Type your question here..."
                      value={questionFormData.questionName}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, questionName: e.target.value })}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] bg-slate-50/30 focus:bg-white transition-colors resize-none"
                    />

                    {/* React Questions */}
                    <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FileQuestion className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-slate-900">React Questions</span>
                        </div>
                        <button className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors">
                          <RefreshCw className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <button 
                          onClick={() => setQuestionFormData({ ...questionFormData, questionName: "What is the difference between useState and useEffect in React?" })}
                          className="w-full text-left flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm text-slate-700">What is the difference between useState and useEffect in React?</span>
                        </button>
                        <button 
                          onClick={() => setQuestionFormData({ ...questionFormData, questionName: "Explain the concept of Virtual DOM in React" })}
                          className="w-full text-left flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm text-slate-700">Explain the concept of Virtual DOM in React</span>
                        </button>
                        <button 
                          onClick={() => setQuestionFormData({ ...questionFormData, questionName: "How does React Context API work?" })}
                          className="w-full text-left flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm text-slate-700">How does React Context API work?</span>
                        </button>
                        <button 
                          onClick={() => setQuestionFormData({ ...questionFormData, questionName: "What are React Hooks and why are they important?" })}
                          className="w-full text-left flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm text-slate-700">What are React Hooks and why are they important?</span>
                        </button>
                        <button 
                          onClick={() => setQuestionFormData({ ...questionFormData, questionName: "Describe the component lifecycle in React" })}
                          className="w-full text-left flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                        >
                          <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                          <span className="text-sm text-slate-700">Describe the component lifecycle in React</span>
                        </button>
                      </div>
                      
                      <p className="text-xs text-slate-500 text-center">
                        Click on any question to use it
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right 6 - Answer Options */}
                <div className="col-span-6 space-y-4">
                  {/* Multiple Choice */}
                  {creatingQuestionType === "Multiple Choice" && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-slate-900">Answer Options</Label>
                        <span className="text-xs text-slate-500">Select the correct answer</span>
                      </div>
                      <div className="space-y-3">
                        {questionFormData.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="correct-option"
                              checked={questionFormData.correctAnswer === index}
                              onChange={() => setQuestionFormData({ ...questionFormData, correctAnswer: index })}
                              className="w-4 h-4 text-blue-600 cursor-pointer"
                              title="Mark as correct answer"
                            />
                            <Input 
                              placeholder={`Option ${index + 1}`} 
                              value={option}
                              onChange={(e) => updateOption(index, e.target.value)}
                              className="flex-1" 
                            />
                            <button 
                              onClick={() => deleteOption(index)}
                              disabled={questionFormData.options.length <= 2}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Delete option"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={addOption}
                        className="w-full mt-3 border-dashed hover:border-blue-400 hover:bg-blue-50/50"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  )}

                  {/* Multiple Response */}
                  {creatingQuestionType === "Multiple Response" && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-slate-900">Answer Options</Label>
                        <span className="text-xs text-slate-500">Select all correct answers</span>
                      </div>
                      <div className="space-y-3">
                        {questionFormData.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Checkbox
                              checked={questionFormData.correctAnswers.includes(index)}
                              onCheckedChange={() => toggleCorrectAnswer(index)}
                              className="w-4 h-4"
                            />
                            <Input 
                              placeholder={`Option ${index + 1}`} 
                              value={option}
                              onChange={(e) => updateOption(index, e.target.value)}
                              className="flex-1" 
                            />
                            <button 
                              onClick={() => deleteOption(index)}
                              disabled={questionFormData.options.length <= 2}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Delete option"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={addOption}
                        className="w-full mt-3 border-dashed hover:border-blue-400 hover:bg-blue-50/50"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  )}

                  {/* True or False */}
                  {creatingQuestionType === "True or False" && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-slate-900">Answer Options</Label>
                        <span className="text-xs text-slate-500">Select the correct answer</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="true-false-option"
                            checked={questionFormData.correctAnswer === 0}
                            onChange={() => setQuestionFormData({ ...questionFormData, correctAnswer: 0 })}
                            className="w-4 h-4 text-blue-600 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <div className="flex-1 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                            <span className="font-medium text-green-700">True</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="true-false-option"
                            checked={questionFormData.correctAnswer === 1}
                            onChange={() => setQuestionFormData({ ...questionFormData, correctAnswer: 1 })}
                            className="w-4 h-4 text-blue-600 cursor-pointer"
                            title="Mark as correct answer"
                          />
                          <div className="flex-1 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                            <span className="font-medium text-red-700">False</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Short Text */}
                  {creatingQuestionType === "Short Text" && (
                    <div>
                      <div className="mb-3">
                        <Label className="text-slate-900">Expected Answer (Optional)</Label>
                        <p className="text-xs text-slate-500 mt-1">Provide a sample answer or leave blank for manual review</p>
                      </div>
                      <Textarea
                        placeholder="Type the expected answer here..."
                        value={questionFormData.options[0] || ""}
                        onChange={(e) => updateOption(0, e.target.value)}
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[150px] bg-slate-50/30 focus:bg-white transition-colors resize-none"
                      />
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700">
                          <strong>Note:</strong> This question type requires manual evaluation. Candidate responses will be displayed for HR review.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="time-to-answer" className="text-slate-900 mb-2 block">
                      Time to Answer (minutes)
                    </Label>
                    <Input
                      id="time-to-answer"
                      type="number"
                      placeholder="e.g., 5"
                      min="1"
                      value={questionFormData.timeLimit}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, timeLimit: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
            </div>
            </>
          )}

          {/* Questions Tab Content */}
          {!isLoading && !isCreatingQuestion && activeTab === "questions" && isSaved && (
            <>
              {/* Search and Filters */}
              <div className="flex items-center gap-3 mb-6">
                {/* Search Bar - 60% */}
                <div className="relative" style={{ width: '60%' }}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search questions..."
                    className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                  />
                </div>

                {/* Filter 1 - Question Type - 20% */}
                <div className="relative" style={{ width: '20%' }}>
                  <Input
                    placeholder="Question Type"
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white pr-10 cursor-pointer"
                    readOnly
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Filter 2 - Question Status - 20% */}
                <div className="relative" style={{ width: '20%' }}>
                  <Input
                    placeholder="Question Status"
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-white pr-10 cursor-pointer"
                    readOnly
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Skillset Boxes */}
              {skillsets.map((skillset) => (
                <motion.div
                  key={skillset.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl overflow-hidden"
                  style={{ padding: "20px" }}
                >
                  {/* Skillset Header */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Left Side - Name and Icons */}
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-slate-900">{skillset.name}</h3>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-white/60 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4 text-slate-600" />
                        </button>
                        <button 
                          onClick={() => deleteSkillset(skillset.id)}
                          className="p-1.5 hover:bg-white/60 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Right Side - Timer, Count, Chevron */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileQuestion className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">0</span>
                      </div>
                      <button
                        onClick={() => toggleSkillset(skillset.id)}
                        className="p-1.5 hover:bg-white/60 rounded-md transition-colors"
                      >
                        {skillset.isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Content */}
                  {skillset.isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Display Saved Questions */}
                      {skillset.questions.map((question) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-semibold text-blue-700">{question.id}</span>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-slate-900 mb-1 line-clamp-1">{question.questionName}</h4>
                                  <div className="flex items-center gap-3 text-xs text-slate-600">
                                    <span className="flex items-center gap-1">
                                      <FileQuestion className="w-3.5 h-3.5" />
                                      {question.type}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      {question.timeLimit} min
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              {/* Status and Sample Question Section */}
                              <div className="flex items-center gap-4 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                                {/* Status Toggle */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-slate-700">Status:</span>
                                  <Switch
                                    checked={question.isActive !== false}
                                    onCheckedChange={() => {/* toggle active status */}}
                                    className="scale-90 data-[state=checked]:bg-slate-400"
                                  />
                                </div>
                                
                                <div className="w-px h-5 bg-slate-300"></div>
                                
                                {/* Sample Question Toggle */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-slate-700">Sample:</span>
                                  <Switch
                                    checked={question.isPreview || false}
                                    onCheckedChange={() => togglePreview(skillset.id, question.id)}
                                    className="scale-90 data-[state=checked]:bg-slate-400"
                                  />
                                </div>
                              </div>
                              
                              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-slate-500 hover:text-blue-600">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-amber-50 rounded-lg transition-colors text-slate-500 hover:text-amber-600">
                                <Archive className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteQuestion(skillset.id, question.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-500 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      <Button 
                        onClick={() => showQuestionTypeSelector(skillset.id)}
                        className="w-full h-12 bg-white hover:bg-slate-50 text-slate-700 border-2 border-dashed border-slate-300 hover:border-blue-400 justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </Button>

                      {/* Question Type Selector */}
                      {skillset.showQuestionTypeSelector && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-slate-200 rounded-lg p-5"
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-medium text-slate-900 mb-1">Select Question Type</h4>
                              <p className="text-sm text-slate-600">Choose the type of question you want to add</p>
                            </div>
                            <button
                              onClick={() => hideQuestionTypeSelector(skillset.id)}
                              className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                            >
                              <X className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>

                          {/* Question Type Options */}
                          <div className="flex flex-wrap gap-3">
                            <button 
                              onClick={() => handleQuestionTypeSelect(skillset.id, "Multiple Choice")}
                              className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors border border-blue-200"
                            >
                              <ListChecks className="w-4 h-4" />
                              <span className="text-sm font-medium">Multiple Choice</span>
                            </button>
                            <button 
                              onClick={() => handleQuestionTypeSelect(skillset.id, "Multiple Response")}
                              className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg transition-colors border border-teal-200"
                            >
                              <CheckSquare className="w-4 h-4" />
                              <span className="text-sm font-medium">Multiple Response</span>
                            </button>
                            <button 
                              onClick={() => handleQuestionTypeSelect(skillset.id, "True or False")}
                              className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors border border-purple-200"
                            >
                              <ToggleLeft className="w-4 h-4" />
                              <span className="text-sm font-medium">True or False</span>
                            </button>
                            <button 
                              onClick={() => handleQuestionTypeSelect(skillset.id, "Short Text")}
                              className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors border border-slate-200"
                            >
                              <Type className="w-4 h-4" />
                              <span className="text-sm font-medium">Short Text</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Add Skillset Box */}
              <div 
                onClick={addSkillset}
                className="border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-teal-200 transition-all flex-shrink-0">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-0.5">Add Skillset</h4>
                    <p className="text-sm text-slate-600">Click to add a new skillset to this test</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Questions Tab Empty State - When Landing Page Not Saved */}
          {!isLoading && !isCreatingQuestion && activeTab === "questions" && !isSaved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <Card className="max-w-md w-full bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-200/60 shadow-none">
                <div className="p-10 text-center">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center"
                  >
                    <FileText className="w-10 h-10 text-blue-600" />
                  </motion.div>

                  {/* Message */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Complete Landing Page First
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Please fill out and save the test details in the Landing Page tab before adding questions.
                  </p>

                  {/* Action Button */}
                  <Button
                    onClick={() => setActiveTab("landing")}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6 gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Go to Landing Page
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Overview Cards Grid */}
              <div className="grid grid-cols-4 gap-4">
                {/* Status Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white border-slate-200/60 overflow-hidden hover:shadow-lg hover:border-blue-300/50 transition-all cursor-pointer h-full">
                    <div className="p-6">
                      <h3 className="text-sm text-slate-600 mb-3">Status</h3>
                      <div className="inline-flex items-center px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full">
                        <span className="text-sm font-medium">Draft</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Last Update Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white border-slate-200/60 overflow-hidden hover:shadow-lg hover:border-blue-300/50 transition-all cursor-pointer h-full">
                    <div className="p-6">
                      <h3 className="text-sm text-slate-600 mb-3">Last update</h3>
                      <p className="text-slate-900">
                        {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </Card>
                </motion.div>

                {/* Question Bank Size Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white border-slate-200/60 overflow-hidden hover:shadow-lg hover:border-blue-300/50 transition-all cursor-pointer h-full">
                    <div className="p-6">
                      <h3 className="text-sm text-slate-600 mb-3">Question bank size</h3>
                      <p className="text-2xl font-semibold text-slate-900">{getTotalQuestions()}</p>
                    </div>
                  </Card>
                </motion.div>

                {/* Test Taken Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white border-slate-200/60 overflow-hidden hover:shadow-lg hover:border-blue-300/50 transition-all cursor-pointer h-full">
                    <div className="p-6">
                      <h3 className="text-sm text-slate-600 mb-3">Test taken</h3>
                      <p className="text-2xl font-semibold text-slate-900">0</p>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}

          {/* Landing Tab Content */}
          {!isLoading && activeTab === "landing" && (
            <>
              {/* Info Card - Light Background, No Shadow */}
              {showInfoCard && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50/30 border-amber-200/60">
                <div className="p-6 flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">
                        Create your own test
                      </h3>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        Use this page to name your test and add (optional) additional information that would be helpful to you and others in your company using this test. Click Save to save your test and enable the other tabs in the left-hand navigation.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInfoCard(false)}
                    className="p-2 hover:bg-amber-100/50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-amber-700" />
                  </button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Form Card */}
          <Card className="bg-white border-slate-200/60 overflow-hidden">
            {/* Card Header with Title and Buttons */}
            <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Test Details</h3>
                <p className="text-sm text-slate-600">Configure your test settings and information</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={!isSaveEnabled}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Save
                </Button>
              </div>
            </div>

            {/* Form Content */}
            <div className="pt-5 px-8 pb-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Left Column - 7 cols */}
                <div className="col-span-7 space-y-6">
                  {/* Test Name */}
                  <div className="space-y-3">
                    <Label htmlFor="testName" className="text-slate-700 text-sm font-medium">
                      Test Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="testName"
                      placeholder="e.g., Frontend Developer Assessment"
                      value={formData.testName}
                      onChange={(e) =>
                        setFormData({ ...formData, testName: e.target.value })
                      }
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Test Summary */}
                  <div className="space-y-3">
                    <Label htmlFor="testSummary" className="text-slate-700 text-sm font-medium">
                      Test Summary
                    </Label>
                    <Textarea
                      id="testSummary"
                      placeholder="Provide a brief description of what this test evaluates..."
                      value={formData.testSummary}
                      onChange={(e) =>
                        setFormData({ ...formData, testSummary: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[130px] bg-slate-50/30 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Test Relevant For */}
                  <div className="space-y-3">
                    <Label htmlFor="testRelevantFor" className="text-slate-700 text-sm font-medium">
                      Test Relevant For
                    </Label>
                    <Input
                      id="testRelevantFor"
                      placeholder="e.g., Frontend Developers, Senior Engineers, UI/UX Designers"
                      value={formData.testRelevantFor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          testRelevantFor: e.target.value,
                        })
                      }
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Test Language */}
                  <div className="space-y-3">
                    <Label htmlFor="testLanguage" className="text-slate-700 text-sm font-medium">
                      Test Language
                    </Label>
                    <Select
                      value={formData.testLanguage}
                      onValueChange={(value) =>
                        setFormData({ ...formData, testLanguage: value })
                      }
                    >
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Question Type */}
                  <div className="space-y-3">
                    <Label htmlFor="questionType" className="text-slate-700 text-sm font-medium">
                      Question Type
                    </Label>
                    <Select
                      value={formData.questionType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, questionType: value })
                      }
                    >
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textual">Textual</SelectItem>
                        <SelectItem value="mcq">MCQ</SelectItem>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="questionnaire">Questionnaire</SelectItem>
                        <SelectItem value="typing">Typing</SelectItem>
                        <SelectItem value="simulation">Simulation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column - 5 cols */}
                <div className="col-span-5 space-y-6">
                  {/* Test Type */}
                  <div className="space-y-3">
                    <Label htmlFor="testType" className="text-slate-700 text-sm font-medium">
                      Test Type
                    </Label>
                    <Select
                      value={formData.testType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, testType: value })
                      }
                    >
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming Skills</SelectItem>
                        <SelectItem value="software">Software Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Level */}
                  <div className="space-y-3">
                    <Label htmlFor="difficultyLevel" className="text-slate-700 text-sm font-medium">
                      Difficulty Level
                    </Label>
                    <Select
                      value={formData.difficultyLevel}
                      onValueChange={(value) =>
                        setFormData({ ...formData, difficultyLevel: value })
                      }
                    >
                      <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Source */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 text-sm font-medium">Source</Label>
                    <RadioGroup
                      value={formData.source}
                      onValueChange={(value) =>
                        setFormData({ ...formData, source: value })
                      }
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/30 hover:bg-white hover:border-blue-300 transition-all cursor-pointer">
                        <RadioGroupItem
                          value="rebirth"
                          id="rebirth"
                          className="border-slate-300 text-blue-600"
                        />
                        <Label
                          htmlFor="rebirth"
                          className="text-slate-700 font-normal cursor-pointer flex-1"
                        >
                          Rebirth Library
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3.5 rounded-lg border border-slate-200 bg-slate-50/30 hover:bg-white hover:border-blue-300 transition-all cursor-pointer">
                        <RadioGroupItem
                          value="company"
                          id="company"
                          className="border-slate-300 text-blue-600"
                        />
                        <Label
                          htmlFor="company"
                          className="text-slate-700 font-normal cursor-pointer flex-1"
                        >
                          Company Custom
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Test Instructions - Rich Text Editor */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 text-sm font-medium">
                      Test Instructions
                    </Label>
                    
                    {/* Rich Text Toolbar */}
                    <div className="flex items-center gap-1 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Bold">
                        <Bold className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Italic">
                        <Italic className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Underline">
                        <Underline className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Strikethrough">
                        <Strikethrough className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 mx-1"></div>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Bulleted List">
                        <List className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Numbered List">
                        <ListOrdered className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 mx-1"></div>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Align Left">
                        <AlignLeft className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Align Center">
                        <AlignCenter className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Align Right">
                        <AlignRight className="w-4 h-4 text-slate-600" />
                      </button>
                      <div className="w-px h-6 bg-slate-300 mx-1"></div>
                      <button className="p-2 hover:bg-white rounded transition-colors" title="Insert Image">
                        <ImageIcon className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>

                    {/* Editor Text Area */}
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="relative"
                    >
                      <Textarea
                        id="testInstructions"
                        placeholder="Add special instructions or guidelines for candidates taking this test..."
                        value={formData.testInstructions}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testInstructions: e.target.value,
                          })
                        }
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[180px] bg-slate-50/30 focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    {/* Predefined Instructions */}
                    <div className="mt-4 p-4 bg-blue-50/30 border border-blue-200/40 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <h4 className="text-sm font-medium text-slate-700">Predefined Instructions</h4>
                        </div>
                        <button
                          onClick={handleRefreshInstructions}
                          className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Refresh instructions"
                        >
                          <RefreshCw className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {predefinedInstructions.map((instruction, index) => (
                          <div
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, instruction)}
                            className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50/20 transition-all group"
                          >
                            <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-500 flex-shrink-0" />
                            <span className="text-xs text-slate-700 flex-1">{instruction}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-3">
                        Drag and drop these instructions into the editor above
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
            </>
          )}
        </div>
      </div>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent className="max-w-lg p-0 overflow-hidden border-0">
          {!publishSuccess ? (
            <div className="relative">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
                <h2 className="text-xl font-semibold mb-1">Publish Test</h2>
                <p className="text-blue-100 text-sm">Review your test details before publishing</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Test Details */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-600">Test Name</span>
                    <span className="text-sm font-medium text-slate-900 text-right max-w-[60%]">{formData.testName || "Untitled Test"}</span>
                  </div>
                  
                  <div className="flex items-start justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-600">Total Skillsets</span>
                    <span className="text-sm font-medium text-slate-900">{skillsets.length}</span>
                  </div>

                  <div className="flex items-start justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-600">Total Questions</span>
                    <span className="text-sm font-medium text-slate-900">{getTotalQuestions()}</span>
                  </div>

                  <div className="flex items-start justify-between py-3 border-b border-slate-200">
                    <span className="text-sm text-slate-600">Total Duration</span>
                    <span className="text-sm font-medium text-slate-900">{getTotalDuration()} minutes</span>
                  </div>
                </div>

                {/* Extra Duration */}
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Set Extra Duration (Optional)</Label>
                  <Select value={extraDuration} onValueChange={setExtraDuration}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select additional time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">+5 minutes</SelectItem>
                      <SelectItem value="10">+10 minutes</SelectItem>
                      <SelectItem value="15">+15 minutes</SelectItem>
                      <SelectItem value="20">+20 minutes</SelectItem>
                      <SelectItem value="30">+30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">Additional time will be added to the total test duration</p>
                </div>

                {/* Preview Question ID */}
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Enter Question ID for Preview Question</Label>
                  <Input
                    value={previewQuestionId}
                    onChange={(e) => setPreviewQuestionId(e.target.value)}
                    placeholder="Enter question ID"
                    className="w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500">Specify which question to show as a preview</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPublishDialog(false);
                      setExtraDuration("");
                      setPreviewQuestionId("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePublish}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  >
                    Create Test
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="relative overflow-hidden">
              {/* Animated Background - Very Light Green */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-emerald-50/30 to-white">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)"
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
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
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
                    Test Published Successfully!
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Your test is now ready for participants.
                  </p>
                  
                  {/* Additional Info */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">Redirecting to My Tests...</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
