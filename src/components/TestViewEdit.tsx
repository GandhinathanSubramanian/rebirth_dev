import { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  X, 
  Eye, 
  FileText, 
  HelpCircle, 
  Save,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  GripVertical,
  RefreshCw,
  Edit2,
  Trash2,
  Clock,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Plus,
  Archive,
  Search,
  Filter,
  ListChecks,
  CheckSquare,
  ToggleLeft,
  Type,
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";

interface TestViewEditProps {
  test: any;
  onBack: () => void;
  onPreview?: () => void;
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

export default function TestViewEdit({ test, onBack, onPreview }: TestViewEditProps) {
  const [activeTab, setActiveTab] = useState<"landing" | "questions">("landing");
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [predefinedInstructions, setPredefinedInstructions] = useState(getRandomInstructions(5));
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editingQuestionData, setEditingQuestionData] = useState<any>(null);
  const [currentSkillsetId, setCurrentSkillsetId] = useState<number | null>(null);
  
  // Mock filled data based on test
  const [formData, setFormData] = useState({
    testName: test.name || "JavaScript Fundamentals",
    testSummary: "Comprehensive assessment of JavaScript programming skills including ES6+ features, async programming, and best practices.",
    testRelevantFor: "Software Developer, Frontend Engineer",
    testLanguage: "english",
    questionType: "multiple-choice",
    testType: "programming",
    difficultyLevel: "intermediate",
    source: "rebirth",
    testInstructions: "Do not refresh the page during the test\nEach question carries equal marks\nTime limit applies to this assessment\nNo external resources are allowed\nAnswer all questions to the best of your ability",
  });

  const [skillsets, setSkillsets] = useState([
    {
      id: 1,
      name: "JavaScript Basics",
      isOpen: true,
      showQuestionTypeSelector: false,
      questions: [
        {
          id: "1",
          questionName: "What is the output of console.log(typeof null)?",
          type: "Single Choice",
          options: ["null", "object", "undefined", "number"],
          correctAnswer: 1,
          timeLimit: "2",
          isPreview: false,
        },
        {
          id: "2",
          questionName: "JavaScript is a statically typed language.",
          type: "True or False",
          options: ["True", "False"],
          correctAnswer: 1,
          timeLimit: "1",
          isPreview: false,
        },
      ]
    }
  ]);

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
    return total;
  };

  const tabs = [
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

  const handleRefreshInstructions = () => {
    setPredefinedInstructions(getRandomInstructions(5));
  };

  const handleEditQuestion = (skillsetId: number, question: any) => {
    setCurrentSkillsetId(skillsetId);
    setEditingQuestionData({
      ...question,
      options: question.options || ["", "", "", ""],
    });
    setIsEditingQuestion(true);
  };

  const handleCancelEdit = () => {
    setIsEditingQuestion(false);
    setEditingQuestionData(null);
    setCurrentSkillsetId(null);
  };

  const handleSaveQuestion = () => {
    // Save logic here
    setIsEditingQuestion(false);
    setEditingQuestionData(null);
    setCurrentSkillsetId(null);
  };

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

  const deleteQuestion = (skillsetId: number, questionId: string) => {
    setSkillsets(skillsets.map(skill => 
      skill.id === skillsetId 
        ? { ...skill, questions: skill.questions.filter(q => q.id !== questionId) }
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
              onClick={onBack}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 border border-slate-200/60 flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                {formData.testName}
              </h1>
              <p className="text-xs text-slate-500">
                Edit and configure your assessment
              </p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all px-6"
          >
            Publish Test
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

            {/* Stats Section */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50/50 rounded-xl p-4 border border-blue-100/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Questions</span>
                <span className="text-sm font-semibold text-slate-900">{getTotalQuestions()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Duration</span>
                <span className="text-sm font-semibold text-slate-900">{getTotalDuration()} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form (10 columns) - Scrollable */}
        <div className="col-span-10 p-8 space-y-6 overflow-y-auto">
          {/* Landing Tab Content */}
          {activeTab === "landing" && (
            <>
              {/* Info Card */}
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
                            Edit your test
                          </h3>
                          <p className="text-sm text-amber-800 leading-relaxed">
                            Update test details, instructions, and configuration. Click Save to save your changes.
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
                {/* Card Header */}
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Test Details</h3>
                    <p className="text-sm text-slate-600">Configure your test settings and information</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {onPreview && (
                      <Button
                        variant="outline"
                        onClick={onPreview}
                        className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    )}
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all"
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
                                className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-move group"
                              >
                                <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                                <span className="text-sm text-slate-700">{instruction}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-3 text-center">
                            Drag and drop to add instructions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Questions Tab Content */}
          {activeTab === "questions" && (
            <>
              {/* Question Edit UI */}
              {isEditingQuestion && editingQuestionData && (
                <>
                  {/* Edit Your Question Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Edit Your Question</h3>
                        <p className="text-sm text-slate-600">Update question details, options, and set the correct answer</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveQuestion}
                          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
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
                      {/* Left 6 - Question Name */}
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
                            value={editingQuestionData.questionName}
                            onChange={(e) => setEditingQuestionData({ ...editingQuestionData, questionName: e.target.value })}
                            className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] bg-slate-50/30 focus:bg-white transition-colors resize-none"
                          />
                        </div>
                      </div>

                      {/* Right 6 - Answer Options & Time */}
                      <div className="col-span-6 space-y-4">
                        {/* Answer Options based on question type */}
                        {editingQuestionData.type === "Single Choice" && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <Label className="text-slate-900">Answer Options</Label>
                              <span className="text-xs text-slate-500">Select the correct answer</span>
                            </div>
                            <div className="space-y-3">
                              {editingQuestionData.options.map((option: string, index: number) => (
                                <div key={index} className="flex items-center gap-3">
                                  <input
                                    type="radio"
                                    name="correct-option"
                                    checked={editingQuestionData.correctAnswer === index}
                                    onChange={() => setEditingQuestionData({ ...editingQuestionData, correctAnswer: index })}
                                    className="w-4 h-4 text-blue-600 cursor-pointer"
                                    title="Mark as correct answer"
                                  />
                                  <Input 
                                    placeholder={`Option ${index + 1}`} 
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...editingQuestionData.options];
                                      newOptions[index] = e.target.value;
                                      setEditingQuestionData({ ...editingQuestionData, options: newOptions });
                                    }}
                                    className="flex-1" 
                                  />
                                  <button 
                                    onClick={() => {
                                      if (editingQuestionData.options.length > 2) {
                                        const newOptions = editingQuestionData.options.filter((_: any, i: number) => i !== index);
                                        setEditingQuestionData({ ...editingQuestionData, options: newOptions });
                                      }
                                    }}
                                    disabled={editingQuestionData.options.length <= 2}
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
                              onClick={() => {
                                setEditingQuestionData({
                                  ...editingQuestionData,
                                  options: [...editingQuestionData.options, ""]
                                });
                              }}
                              className="w-full mt-3 border-dashed hover:border-blue-400 hover:bg-blue-50/50"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Option
                            </Button>
                          </div>
                        )}

                        {editingQuestionData.type === "True or False" && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <Label className="text-slate-900">Answer Options</Label>
                              <span className="text-xs text-slate-500">Select the correct answer</span>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="correct-option"
                                  checked={editingQuestionData.correctAnswer === 0}
                                  onChange={() => setEditingQuestionData({ ...editingQuestionData, correctAnswer: 0 })}
                                  className="w-4 h-4 text-blue-600 cursor-pointer"
                                />
                                <div className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50">
                                  True
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="correct-option"
                                  checked={editingQuestionData.correctAnswer === 1}
                                  onChange={() => setEditingQuestionData({ ...editingQuestionData, correctAnswer: 1 })}
                                  className="w-4 h-4 text-blue-600 cursor-pointer"
                                />
                                <div className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50">
                                  False
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {editingQuestionData.type === "Short Text" && (
                          <div>
                            <Label className="text-slate-900 mb-3 block">Answer Type</Label>
                            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 text-sm text-slate-600">
                              This question requires a text-based answer from the candidate. No options needed.
                            </div>
                          </div>
                        )}

                        {/* Time Limit */}
                        <div className="space-y-3 pt-4">
                          <Label htmlFor="timeLimit" className="text-slate-700 text-sm font-medium">
                            Time Limit (minutes) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="timeLimit"
                            type="number"
                            placeholder="Enter time in minutes"
                            value={editingQuestionData.timeLimit}
                            onChange={(e) => setEditingQuestionData({ ...editingQuestionData, timeLimit: e.target.value })}
                            className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Search and Filters */}
              {!isEditingQuestion && (
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
              )}

              {/* Skillset Boxes - Hide when editing question */}
              {!isEditingQuestion && skillsets.map((skillset) => (
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
                        <span className="text-sm text-slate-700">
                          {skillset.questions.reduce((total, q) => total + parseInt(q.timeLimit || "0"), 0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileQuestion className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">{skillset.questions.length}</span>
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
                                <Edit2 
                                  className="w-4 h-4" 
                                  onClick={() => handleEditQuestion(skillset.id, question)}
                                />
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

                      {/* Add Question Button - Show only when not showing selector */}
                      {!skillset.showQuestionTypeSelector && (
                        <button
                          className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white/60 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
                        >
                          <Plus className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Add Question</span>
                        </button>
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
        </div>
      </div>
    </div>
  );
}