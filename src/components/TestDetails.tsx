import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Clock,
  FileText,
  Eye,
  Trash2,
  Edit,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  Plus,
  Save,
  X,
  RotateCcw,
  User,
  Calendar,
  CalendarClock,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface Question {
  id: number;
  name: string;
  type: "Multiple Choice" | "Multiple Response" | "True or False" | "Short Text";
  options?: string[];
  correctAnswer?: string | string[];
  timeLimit?: string;
}

interface SkillSet {
  id: number;
  name: string;
  questions: Question[];
}

interface TestDetailsProps {
  onBack: () => void;
  testData?: any;
}

export default function TestDetails({ onBack, testData }: TestDetailsProps) {
  const [selectedSkillSet, setSelectedSkillSet] = useState<number | null>(1);
  const [expandedSkillSets, setExpandedSkillSets] = useState<number[]>([1]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedOptions, setEditedOptions] = useState<string[]>([]);
  const [editedTimeLimit, setEditedTimeLimit] = useState("");
  const [showRevertOption, setShowRevertOption] = useState(false);
  const [previousState, setPreviousState] = useState<any>(null);

  // Mock data for the test
  const testInfo = {
    name: testData?.name || "React Advanced Concepts",
    status: testData?.status || "Active",
    questionCount: testData?.questionCount || 25,
    duration: testData?.duration || "45 min",
    type: testData?.type || "Technical",
    difficulty: testData?.difficulty || "Advanced",
  };

  // Mock skill sets with questions
  const skillSets: SkillSet[] = [
    {
      id: 1,
      name: "React Fundamentals",
      questions: [
        {
          id: 101,
          name: "What is JSX?",
          type: "Multiple Choice",
          options: [
            "JavaScript XML",
            "JavaScript Extension",
            "Java Syntax Extension",
            "None of the above",
          ],
          correctAnswer: "JavaScript XML",
          timeLimit: "2",
        },
        {
          id: 102,
          name: "Explain useState hook",
          type: "Short Text",
          timeLimit: "5",
        },
        {
          id: 103,
          name: "React is a framework",
          type: "True or False",
          correctAnswer: "False",
          timeLimit: "1",
        },
        {
          id: 104,
          name: "What is Virtual DOM?",
          type: "Multiple Choice",
          options: [
            "A copy of the real DOM",
            "A programming concept",
            "A lightweight representation of the DOM",
            "None of the above",
          ],
          correctAnswer: "A lightweight representation of the DOM",
          timeLimit: "2",
        },
        {
          id: 105,
          name: "Props are immutable",
          type: "True or False",
          correctAnswer: "True",
          timeLimit: "1",
        },
        {
          id: 106,
          name: "Explain component composition",
          type: "Short Text",
          timeLimit: "5",
        },
      ],
    },
    {
      id: 2,
      name: "State Management",
      questions: [
        {
          id: 201,
          name: "What are Redux principles?",
          type: "Multiple Response",
          options: [
            "Single source of truth",
            "State is read-only",
            "Changes are made with pure functions",
            "State can be mutated directly",
          ],
          correctAnswer: ["Single source of truth", "State is read-only", "Changes are made with pure functions"],
          timeLimit: "3",
        },
        {
          id: 202,
          name: "Context API vs Redux",
          type: "Short Text",
          timeLimit: "5",
        },
      ],
    },
    {
      id: 3,
      name: "React Hooks",
      questions: [
        {
          id: 301,
          name: "When to use useEffect?",
          type: "Multiple Choice",
          options: [
            "For side effects",
            "For state management",
            "For routing",
            "For styling",
          ],
          correctAnswer: "For side effects",
          timeLimit: "2",
        },
        {
          id: 302,
          name: "Explain useCallback",
          type: "Short Text",
          timeLimit: "5",
        },
        {
          id: 303,
          name: "useEffect runs after render",
          type: "True or False",
          correctAnswer: "True",
          timeLimit: "1",
        },
      ],
    },
    {
      id: 4,
      name: "Component Lifecycle",
      questions: [
        {
          id: 401,
          name: "Class component lifecycle methods",
          type: "Multiple Response",
          options: [
            "componentDidMount",
            "componentWillUpdate",
            "componentDidUpdate",
            "componentWillUnmount",
          ],
          correctAnswer: ["componentDidMount", "componentDidUpdate", "componentWillUnmount"],
          timeLimit: "3",
        },
      ],
    },
    {
      id: 5,
      name: "Performance Optimization",
      questions: [
        {
          id: 501,
          name: "What is React.memo?",
          type: "Multiple Choice",
          options: [
            "Higher-order component for memoization",
            "A hook for memory management",
            "A routing component",
            "None of the above",
          ],
          correctAnswer: "Higher-order component for memoization",
          timeLimit: "2",
        },
        {
          id: 502,
          name: "Explain code splitting",
          type: "Short Text",
          timeLimit: "5",
        },
      ],
    },
  ];

  const toggleSkillSet = (id: number) => {
    setExpandedSkillSets((prev) =>
      prev.includes(id) ? prev.filter((setId) => setId !== id) : [...prev, id]
    );
  };

  const handleQuestionSelect = (question: Question, skillSetId: number) => {
    setSelectedQuestion(question);
    setSelectedSkillSet(skillSetId);
    setIsEditMode(false);
    setShowRevertOption(false);
  };

  // Set initial selected question
  if (!selectedQuestion && skillSets[0]?.questions[0]) {
    setSelectedQuestion(skillSets[0].questions[0]);
  }

  const handleEditClick = () => {
    if (!isEditMode) {
      // Entering edit mode
      setPreviousState({
        options: selectedQuestion?.options || [],
        timeLimit: selectedQuestion?.timeLimit || "2",
      });
      setEditedOptions(selectedQuestion?.options || []);
      setEditedTimeLimit(selectedQuestion?.timeLimit || "2");
    }
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    // Save logic here
    setIsEditMode(false);
    setShowRevertOption(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedOptions([]);
    setEditedTimeLimit("");
  };

  const handleRevertChanges = () => {
    // Revert to previous state logic
    setShowRevertOption(false);
  };

  const handleAddOption = () => {
    setEditedOptions([...editedOptions, ""]);
  };

  const handleDeleteOption = (index: number) => {
    setEditedOptions(editedOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...editedOptions];
    newOptions[index] = value;
    setEditedOptions(newOptions);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Multiple Choice":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Multiple Response":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "True or False":
        return "bg-green-50 text-green-700 border-green-200";
      case "Short Text":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Multiple Choice":
        return "●";
      case "Multiple Response":
        return "☑";
      case "True or False":
        return "✓";
      case "Short Text":
        return "✎";
      default:
        return "●";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border-b border-slate-200/60 sticky top-0 z-10"
      >
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold text-slate-900">
                  {testInfo.name}
                </h1>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {testInfo.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {testInfo.difficulty}
                  </Badge>
                </div>
                {/* Creator and Date Information */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Created by <span className="font-medium text-slate-700">Sarah Johnson</span></span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Created on <span className="font-medium text-slate-700">Nov 15, 2024</span></span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5">
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>Last edited <span className="font-medium text-slate-700">Nov 20, 2024</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Test Info Stats */}
              <div className="flex items-center gap-6 px-6 py-2 bg-slate-50 rounded-lg border border-slate-200/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">{testInfo.questionCount}</span> Questions
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-300" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">{testInfo.duration}</span>
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-300" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">
                    Type: <span className="font-semibold text-slate-900">{testInfo.type}</span>
                  </span>
                </div>
              </div>

              {/* Preview Button */}
              <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm">
                <Play className="w-4 h-4 mr-2" />
                Preview Test
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full h-[calc(100vh-73px)] overflow-hidden">
        <div className="grid grid-cols-12 h-full">
          {/* Left Side - Skill Sets (4 columns) */}
          <div className="col-span-4 bg-white border-r border-dashed border-slate-300 h-full overflow-y-auto">
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900">Skill Sets</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {skillSets.length} categories • {skillSets.reduce((acc, set) => acc + set.questions.length, 0)} questions
                  </p>
                </div>

                <div className="space-y-3">
                  {skillSets.map((skillSet) => {
                    const isExpanded = expandedSkillSets.includes(skillSet.id);
                    const isSelected = selectedSkillSet === skillSet.id;

                    return (
                      <div key={skillSet.id}>
                        {/* Skill Set Card */}
                        <div
                          className={`group relative rounded-lg border transition-all ${
                            isSelected
                              ? "bg-gradient-to-r from-blue-50/50 to-teal-50/50 border-blue-200"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                          }`}
                        >
                          <button
                            onClick={() => toggleSkillSet(skillSet.id)}
                            className="w-full p-3 flex items-center justify-between text-left"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                              )}
                              <span className={`font-medium truncate ${isSelected ? "text-blue-700" : "text-slate-900"}`}>
                                {skillSet.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  isSelected
                                    ? "bg-blue-100 text-blue-700 border-blue-300"
                                    : "bg-slate-100 text-slate-600 border-slate-200"
                                }`}
                              >
                                {skillSet.questions.length}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="p-1.5 hover:bg-blue-50 rounded transition-all cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="p-1.5 hover:bg-red-50 rounded transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Expanded Questions List */}
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-slate-200 bg-slate-50/50"
                            >
                              <div className="p-2 space-y-2">
                                {skillSet.questions.map((question) => {
                                  const isQuestionSelected = selectedQuestion?.id === question.id;
                                  
                                  return (
                                    <button
                                      key={question.id}
                                      onClick={() => handleQuestionSelect(question, skillSet.id)}
                                      className={`group/question w-full flex items-center gap-2 p-2 rounded-md text-left transition-all ${
                                        isQuestionSelected
                                          ? "bg-blue-100 text-blue-900"
                                          : "hover:bg-white hover:shadow-sm"
                                      }`}
                                    >
                                      <span
                                        className={`text-xs flex-shrink-0 ${
                                          isQuestionSelected ? "text-blue-600" : "text-slate-400"
                                        }`}
                                      >
                                        {getTypeIcon(question.type)}
                                      </span>
                                      <span
                                        className={`text-sm flex-1 min-w-0 truncate ${
                                          isQuestionSelected ? "font-medium" : "text-slate-700"
                                        }`}
                                      >
                                        {question.name}
                                      </span>
                                      <div className="flex items-center gap-1 opacity-0 group-hover/question:opacity-100 transition-opacity">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuestionSelect(question, skillSet.id);
                                          }}
                                          className="p-1 hover:bg-blue-100 rounded transition-colors"
                                        >
                                          <Eye className="w-3 h-3 text-blue-600" />
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                          className="p-1 hover:bg-red-100 rounded transition-colors"
                                        >
                                          <Trash2 className="w-3 h-3 text-red-500" />
                                        </button>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Question Details (8 columns) */}
          <div className="col-span-8 h-full overflow-y-auto">
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {selectedQuestion ? (
                  <Card className="bg-white border-slate-200/60">
                    {/* Question Header */}
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={`${getTypeColor(selectedQuestion.type)} text-xs`}
                            >
                              {selectedQuestion.type}
                            </Badge>
                            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                              {skillSets.find((s) => s.id === selectedSkillSet)?.name}
                            </Badge>
                          </div>
                          <h2 className="text-xl font-semibold text-slate-900 mt-1">
                            {selectedQuestion.name}
                          </h2>
                        </div>
                        <div className="flex items-center gap-2">
                          {isEditMode ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="border-slate-200 text-slate-700 hover:bg-slate-50"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleSaveChanges}
                                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleEditClick}
                              className="border-slate-200 text-slate-700 hover:bg-slate-50"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Question
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Question Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          Question ID: #{selectedQuestion.id}
                        </span>
                      </div>

                      {/* Revert Option */}
                      {showRevertOption && !isEditMode && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between"
                        >
                          <span className="text-sm text-amber-800">Changes saved successfully!</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRevertChanges}
                            className="border-amber-300 text-amber-700 hover:bg-amber-100"
                          >
                            <RotateCcw className="w-3 h-3 mr-2" />
                            Revert Last Changes
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    {/* Question Content */}
                    <div className="px-6 pb-6">
                      {/* Question Type Specific Content */}
                      {(selectedQuestion.type === "Multiple Choice" ||
                        selectedQuestion.type === "Multiple Response") && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-700 mb-2">Answer Options</h3>
                            <div className="space-y-2">
                              {isEditMode ? (
                                <>
                                  {editedOptions.map((option, index) => {
                                    const isCorrect = Array.isArray(selectedQuestion.correctAnswer)
                                      ? selectedQuestion.correctAnswer.includes(option)
                                      : selectedQuestion.correctAnswer === option;

                                    return (
                                      <div
                                        key={index}
                                        className={`p-4 rounded-lg border-2 transition-all relative ${
                                          isCorrect
                                            ? "bg-green-50 border-green-200"
                                            : "bg-slate-50 border-slate-200"
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                                              isCorrect
                                                ? "bg-green-200 text-green-700"
                                                : "bg-slate-200 text-slate-600"
                                            }`}
                                          >
                                            {String.fromCharCode(65 + index)}
                                          </div>
                                          <Input
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="flex-1"
                                          />
                                          <button
                                            onClick={() => handleDeleteOption(index)}
                                            className="p-1.5 hover:bg-red-100 rounded transition-colors"
                                          >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <Button
                                    variant="outline"
                                    onClick={handleAddOption}
                                    className="w-full border-dashed border-2 border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-700"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Option
                                  </Button>
                                </>
                              ) : (
                                selectedQuestion.options?.map((option, index) => {
                                  const isCorrect = Array.isArray(selectedQuestion.correctAnswer)
                                    ? selectedQuestion.correctAnswer.includes(option)
                                    : selectedQuestion.correctAnswer === option;

                                  return (
                                    <div
                                      key={index}
                                      className={`p-4 rounded-lg border-2 transition-all ${
                                        isCorrect
                                          ? "bg-green-50 border-green-200"
                                          : "bg-slate-50 border-slate-200"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                            isCorrect
                                              ? "bg-green-200 text-green-700"
                                              : "bg-slate-200 text-slate-600"
                                          }`}
                                        >
                                          {String.fromCharCode(65 + index)}
                                        </div>
                                        <span
                                          className={`flex-1 ${
                                            isCorrect ? "text-green-900 font-medium" : "text-slate-700"
                                          }`}
                                        >
                                          {option}
                                        </span>
                                        {isCorrect && (
                                          <Badge className="bg-green-600 text-white hover:bg-green-600">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Correct Answer
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* Additional Settings */}
                          <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Question Settings</h3>
                            {isEditMode ? (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-700">Time Limit:</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      value={editedTimeLimit}
                                      onChange={(e) => setEditedTimeLimit(e.target.value)}
                                      className="w-20 h-9 text-center font-medium"
                                    />
                                    <span className="text-sm font-medium text-slate-600">minutes</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-teal-50/50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <Clock className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">Time Limit</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-2xl font-bold text-slate-900">{selectedQuestion.timeLimit}</span>
                                    <span className="text-sm font-medium text-slate-500">min</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedQuestion.type === "True or False" && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Answer Options</h3>
                            <div className="space-y-2">
                              {["True", "False"].map((option) => {
                                const isCorrect = selectedQuestion.correctAnswer === option;

                                return (
                                  <div
                                    key={option}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                      isCorrect
                                        ? "bg-green-50 border-green-200"
                                        : "bg-slate-50 border-slate-200"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                          isCorrect
                                            ? "bg-green-200 text-green-700"
                                            : "bg-slate-200 text-slate-600"
                                        }`}
                                      >
                                        {option === "True" ? "T" : "F"}
                                      </div>
                                      <span
                                        className={`flex-1 ${
                                          isCorrect ? "text-green-900 font-medium" : "text-slate-700"
                                        }`}
                                      >
                                        {option}
                                      </span>
                                      {isCorrect && (
                                        <Badge className="bg-green-600 text-white hover:bg-green-600">
                                          <CheckCircle2 className="w-3 h-3 mr-1" />
                                          Correct Answer
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Additional Settings */}
                          <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Question Settings</h3>
                            {isEditMode ? (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-700">Time Limit:</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      value={editedTimeLimit}
                                      onChange={(e) => setEditedTimeLimit(e.target.value)}
                                      className="w-20 h-9 text-center font-medium"
                                    />
                                    <span className="text-sm font-medium text-slate-600">minutes</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-teal-50/50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <Clock className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">Time Limit</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-2xl font-bold text-slate-900">{selectedQuestion.timeLimit}</span>
                                    <span className="text-sm font-medium text-slate-500">min</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedQuestion.type === "Short Text" && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Answer Format</h3>
                            <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                              <p className="text-sm text-slate-600 mb-2">
                                Candidates will provide a text-based answer to this question.
                              </p>
                              <div className="mt-4 p-4 bg-white rounded border border-slate-200">
                                <p className="text-xs text-slate-500 mb-2">Sample Answer Area:</p>
                                <div className="min-h-[100px] p-3 bg-slate-50 rounded border border-dashed border-slate-300 text-slate-400 text-sm">
                                  Candidate's answer will appear here...
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Settings */}
                          <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Question Settings</h3>
                            {isEditMode ? (
                              <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-700">Time Limit:</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      value={editedTimeLimit}
                                      onChange={(e) => setEditedTimeLimit(e.target.value)}
                                      className="w-20 h-9 text-center font-medium"
                                    />
                                    <span className="text-sm font-medium text-slate-600">minutes</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-teal-50/50 rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <Clock className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">Time Limit</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-2xl font-bold text-slate-900">{selectedQuestion.timeLimit}</span>
                                    <span className="text-sm font-medium text-slate-500">min</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ) : (
                  <Card className="bg-white border-slate-200/60 p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <FileText className="w-16 h-16 text-slate-300 mb-4" />
                      <h3 className="font-semibold text-slate-900 mb-2">No Question Selected</h3>
                      <p className="text-slate-500 text-sm">
                        Select a question from the skill sets on the left to view details
                      </p>
                    </div>
                  </Card>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}