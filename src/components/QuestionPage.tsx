import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckSquare,
  ListChecks,
  FileText,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";

interface Question {
  id: number;
  type: "mcq" | "multiple-response" | "true-false" | "short-text";
  question: string;
  options?: string[];
}

interface QuestionPageProps {
  onComplete?: () => void;
  onLogoClick?: () => void;
  previewMode?: boolean;
  onBackToLibrary?: () => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ onComplete, onLogoClick, previewMode = false, onBackToLibrary }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes total

  const questions: Question[] = [
    {
      id: 1,
      type: "mcq",
      question:
        "What is the primary purpose of React's useEffect hook in functional components?",
      options: [
        "To manage component state",
        "To perform side effects in functional components",
        "To create custom hooks",
        "To optimize rendering performance",
      ],
    },
    {
      id: 2,
      type: "multiple-response",
      question:
        "Which of the following are valid JavaScript data types? (Select all that apply)",
      options: [
        "String",
        "Integer",
        "Boolean",
        "Undefined",
        "Float",
        "Symbol",
      ],
    },
    {
      id: 3,
      type: "true-false",
      question:
        "In JavaScript, 'null' and 'undefined' are exactly the same and can be used interchangeably.",
      options: ["True", "False"],
    },
    {
      id: 4,
      type: "short-text",
      question:
        "Explain the difference between 'let', 'const', and 'var' in JavaScript.",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMCQAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleMultipleResponseAnswer = (option: string, checked: boolean) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    if (checked) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...currentAnswers, option],
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentAnswers.filter((a: string) => a !== option),
      });
    }
  };

  const handleTextAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    onComplete?.();
  };

  const isQuestionAnswered = (questionId: number) => {
    const answer = answers[questionId];
    return answer !== undefined && answer !== "" && answer !== null && 
           (Array.isArray(answer) ? answer.length > 0 : true);
  };

  const allQuestionsAnswered = questions.every((q) =>
    isQuestionAnswered(q.id)
  );

  const getQuestionTypeInfo = (type: string) => {
    switch (type) {
      case "mcq":
        return { label: "Single Choice", icon: Circle, color: "blue" };
      case "multiple-response":
        return { label: "Multiple Choice", icon: ListChecks, color: "purple" };
      case "true-false":
        return { label: "True or False", icon: HelpCircle, color: "teal" };
      case "short-text":
        return { label: "Short Answer", icon: FileText, color: "orange" };
      default:
        return { label: "Question", icon: Circle, color: "gray" };
    }
  };

  const typeInfo = getQuestionTypeInfo(currentQuestion.type);
  const TypeIcon = typeInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-xl bg-white/90"
      >
        <div className="px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <button 
              onClick={onLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-500/30">
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
              <div>
                <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Rebirth
                </span>
                <p className="text-xs text-gray-500">Assessment Platform</p>
              </div>
            </button>

            {/* Assessment Title */}
            <div className="text-center">
              <h1 className="font-semibold text-gray-900">
                Frontend Developer Assessment
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {previewMode ? "Preview Mode" : "John Doe"}
              </p>
            </div>

            {/* Timer or Back to Library Button */}
            {previewMode ? (
              <Button
                variant="outline"
                onClick={onBackToLibrary}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Test Library
              </Button>
            ) : (
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="text-right">
                  <p className="text-xs text-gray-600">Time Remaining</p>
                  <p className="font-semibold text-gray-900">
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 py-12 px-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-semibold text-gray-900">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/90 backdrop-blur-xl border-gray-200 overflow-hidden">
                {/* Question Header */}
                <div className="p-6 pb-4 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                      <span className="text-xl font-semibold text-white">
                        {currentQuestionIndex + 1}
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-${typeInfo.color}-100 border border-${typeInfo.color}-200`}>
                          <TypeIcon className={`w-3.5 h-3.5 text-${typeInfo.color}-600`} />
                          <span className={`text-xs font-medium text-${typeInfo.color}-700`}>
                            {typeInfo.label}
                          </span>
                        </div>
                        {isQuestionAnswered(currentQuestion.id) && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100 border border-teal-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            <span className="text-xs font-medium text-teal-700">
                              Answered
                            </span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                        {currentQuestion.question}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-8">
                  {/* Multiple Choice (MCQ) */}
                  {currentQuestion.type === "mcq" && (
                    <RadioGroup
                      value={answers[currentQuestion.id]}
                      onValueChange={handleMCQAnswer}
                      className="space-y-4"
                    >
                      {currentQuestion.options?.map((option, index) => (
                        <div key={index}>
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex items-center gap-4 p-5 rounded-xl border-2 border-gray-300 bg-white cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-gradient-to-r peer-data-[state=checked]:from-blue-50 peer-data-[state=checked]:to-teal-50 peer-data-[state=checked]:shadow-lg transition-all hover:border-blue-400 hover:shadow-md group"
                          >
                            <div className="relative w-6 h-6 rounded-full border-2 border-gray-400 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500 flex items-center justify-center transition-all group-hover:border-blue-500">
                              {answers[currentQuestion.id] === option && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-3 h-3 rounded-full bg-white"
                                />
                              )}
                            </div>
                            <span className="text-gray-900 flex-1">
                              {option}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {/* Multiple Response */}
                  {currentQuestion.type === "multiple-response" && (
                    <div className="space-y-4">
                      <div className="mb-4 p-4 rounded-xl bg-purple-50 border border-purple-200 flex items-start gap-2">
                        <ListChecks className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-purple-900">
                          Select all answers that apply. You can choose multiple
                          options.
                        </p>
                      </div>
                      {currentQuestion.options?.map((option, index) => {
                        const isChecked = (
                          answers[currentQuestion.id] || []
                        ).includes(option);
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                              isChecked
                                ? "border-purple-500 bg-gradient-to-r from-purple-50 to-purple-100 shadow-lg"
                                : "border-gray-300 bg-white hover:border-purple-400 hover:shadow-md"
                            }`}
                            onClick={() =>
                              handleMultipleResponseAnswer(option, !isChecked)
                            }
                          >
                            <Checkbox
                              id={`multi-option-${index}`}
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleMultipleResponseAnswer(
                                  option,
                                  checked as boolean
                                )
                              }
                              className="border-gray-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-6 h-6"
                            />
                            <Label
                              htmlFor={`multi-option-${index}`}
                              className="text-gray-900 flex-1 cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* True or False */}
                  {currentQuestion.type === "true-false" && (
                    <div className="grid grid-cols-2 gap-4">
                      {currentQuestion.options?.map((option, index) => {
                        const isSelected = answers[currentQuestion.id] === option;
                        const isTrue = option === "True";
                        return (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleMCQAnswer(option)}
                            className={`p-5 rounded-xl border-2 transition-all ${
                              isSelected
                                ? isTrue
                                  ? "border-teal-500 bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg"
                                  : "border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-lg"
                                : "border-gray-300 bg-white hover:border-teal-400 hover:shadow-md"
                            }`}
                          >
                            <div className="text-center">
                              <div
                                className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                                  isSelected
                                    ? isTrue
                                      ? "bg-gradient-to-br from-teal-500 to-teal-400 shadow-md shadow-teal-500/30"
                                      : "bg-gradient-to-br from-red-500 to-red-400 shadow-md shadow-red-500/30"
                                    : "bg-gray-100"
                                }`}
                              >
                                {isTrue ? (
                                  <CheckCircle2
                                    className={`w-6 h-6 ${
                                      isSelected ? "text-white" : "text-gray-400"
                                    }`}
                                  />
                                ) : (
                                  <svg
                                    className={`w-6 h-6 ${
                                      isSelected ? "text-white" : "text-gray-400"
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span
                                className={`text-lg font-semibold ${
                                  isSelected
                                    ? isTrue
                                      ? "text-teal-900"
                                      : "text-red-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {option}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* Short Text */}
                  {currentQuestion.type === "short-text" && (
                    <div className="space-y-4">
                      <div className="mb-4 p-4 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-2">
                        <FileText className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-orange-900">
                          Provide a concise answer in your own words. Aim for 2-3
                          sentences.
                        </p>
                      </div>
                      <Textarea
                        placeholder="Type your answer here..."
                        value={answers[currentQuestion.id] || ""}
                        onChange={(e) => handleTextAnswer(e.target.value)}
                        className="min-h-[200px] bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500 focus:bg-white resize-none text-gray-900 p-5 rounded-xl"
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {(answers[currentQuestion.id] || "").length} characters
                        </span>
                        <span className="text-gray-400">
                          Recommended: 50-200 characters
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Footer */}
                <div className="p-8 pt-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="h-12 px-8 border-gray-300 text-gray-700 hover:bg-white disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous
                    </Button>

                    <div className="flex-1" />

                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className="h-12 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg shadow-blue-500/30"
                      >
                        Next Question
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        className="h-12 px-8 bg-gradient-to-r from-teal-600 to-blue-500 hover:from-teal-700 hover:to-blue-600 text-white shadow-lg shadow-teal-500/30"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Submit Assessment
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Question Navigation Dots */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {questions.map((q, index) => {
                  const isActive = index === currentQuestionIndex;
                  const isAnswered = isQuestionAnswered(q.id);
                  
                  return (
                    <motion.button
                      key={q.id}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`relative rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "w-12 h-3.5 bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg shadow-blue-500/40"
                          : isAnswered
                          ? "w-3.5 h-3.5 bg-teal-500 shadow-md hover:shadow-lg"
                          : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400 shadow-sm hover:shadow-md"
                      }`}
                      title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
                    >
                      {isAnswered && !isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>


    </div>
  );
};

export default QuestionPage;
