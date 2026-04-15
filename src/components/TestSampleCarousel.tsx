import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Circle,
  ListChecks,
  HelpCircle,
  X,
  Minus,
  Maximize2,
  RotateCcw,
} from "lucide-react";

interface TestSampleCarouselProps {
  onComplete: () => void;
}

const sampleQuestions = [
  {
    id: 1,
    type: "mcq",
    question: "What is the primary purpose of React's useState hook?",
    options: [
      "To manage side effects in components",
      "To add state to functional components",
      "To create context providers",
      "To optimize performance"
    ],
    correctAnswer: 1,
    explanation: "The useState hook allows you to add state to functional components. It returns a state value and a function to update it."
  },
  {
    id: 2,
    type: "multiple-response",
    question: "Which of the following are valid JavaScript data types? (Select all that apply)",
    options: [
      "String",
      "Integer",
      "Boolean",
      "Object",
      "Float"
    ],
    correctAnswers: [0, 2, 3],
    explanation: "JavaScript has primitive types: String, Boolean, Number, BigInt, Symbol, null, and undefined. It also has Object. 'Integer' and 'Float' are not explicit types in JavaScript."
  },
  {
    id: 3,
    type: "true-false",
    question: "In React, props can be modified within a child component.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "Props are read-only in React. A component must never modify its own props. If you need to modify data, use state instead."
  }
];

const TestSampleCarousel: React.FC<TestSampleCarouselProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  const currentQuestion = sampleQuestions[currentIndex];
  const isLastQuestion = currentIndex === sampleQuestions.length - 1;

  // Auto-select answer when question appears
  useEffect(() => {
    if (showCompletionScreen) return;
    
    const timer = setTimeout(() => {
      if (currentQuestion.type === "mcq") {
        setSelectedSingle(currentQuestion.correctAnswer);
      } else if (currentQuestion.type === "multiple-response") {
        setSelectedMultiple(currentQuestion.correctAnswers || []);
      } else if (currentQuestion.type === "true-false") {
        setSelectedSingle(currentQuestion.correctAnswer);
      }
      setShowExplanation(true);
    }, 1500); // Show answer after 1.5 seconds

    return () => clearTimeout(timer);
  }, [currentIndex, showCompletionScreen]);

  // Countdown timer
  useEffect(() => {
    if (showCompletionScreen) return;
    
    if (showExplanation && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isLastQuestion) {
      handleNext();
    } else if (countdown === 0 && isLastQuestion) {
      setShowCompletionScreen(true);
    }
  }, [showExplanation, countdown, isLastQuestion, showCompletionScreen]);

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
      setSelectedSingle(null);
      setSelectedMultiple([]);
      setCountdown(5);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowExplanation(false);
    setSelectedSingle(null);
    setSelectedMultiple([]);
    setCountdown(5);
    setShowCompletionScreen(false);
  };

  const getQuestionTypeInfo = (type: string) => {
    switch (type) {
      case "mcq":
        return { label: "Single Choice", icon: Circle, color: "blue" };
      case "multiple-response":
        return { label: "Multiple Choice", icon: ListChecks, color: "purple" };
      case "true-false":
        return { label: "True or False", icon: HelpCircle, color: "teal" };
      default:
        return { label: "Question", icon: Circle, color: "gray" };
    }
  };

  const typeInfo = getQuestionTypeInfo(currentQuestion.type);
  const TypeIcon = typeInfo.icon;

  // Show Completion Screen
  if (showCompletionScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-teal-100 mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-gray-900 mb-3"
          >
            Sample Demo Complete!
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-md mx-auto"
          >
            You've seen how the test interface works. Now you're ready to start the actual assessment. Good luck!
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <Button
              onClick={handleRestart}
              variant="outline"
              className="h-12 px-6 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              See Sample Again
            </Button>
            <Button
              onClick={onComplete}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center"
        >
          <p className="text-xs text-blue-900">
            <strong>💡 Remember:</strong> In the actual test, questions won't auto-advance. Take your time and answer carefully!
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Show Sample Questions
  return (
    <div className="space-y-4">
      {/* Browser Chrome Window */}
      <div className="rounded-2xl overflow-hidden border-2 border-gray-300 bg-white">
        {/* Browser Top Bar */}
        <div className="bg-gray-200 border-b border-gray-300 px-4 py-3 flex items-center gap-2">
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 ml-4 bg-white rounded-lg px-4 py-1.5 flex items-center gap-2 border border-gray-300">
            <div className="w-3 h-3 text-gray-400">🔒</div>
            <span className="text-xs text-gray-600">rebirth-assessment.com/test/attend</span>
          </div>

          {/* Browser Icons */}
          <div className="flex items-center gap-1 ml-2">
            <Minus className="w-4 h-4 text-gray-500" />
            <Maximize2 className="w-3 h-3 text-gray-500" />
            <X className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Browser Content - Real Test Interface */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
          {/* Background Pattern */}
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

          {/* Header */}
          <div className="relative z-10 border-b border-gray-200 backdrop-blur-xl bg-white/80">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-500/30">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Rebirth
                  </span>
                </div>

                {/* Timer */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">18:45</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">
                  Question {currentIndex + 1} of {sampleQuestions.length}
                </span>
                <span className="text-xs text-gray-600">
                  {Math.round(((currentIndex + 1) / sampleQuestions.length) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / sampleQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="relative z-10 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6">
                  {/* Question Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${typeInfo.color}-100 border border-${typeInfo.color}-200`}>
                      <TypeIcon className={`w-3.5 h-3.5 text-${typeInfo.color}-600`} />
                      <span className={`text-xs text-${typeInfo.color}-700`}>
                        {typeInfo.label}
                      </span>
                    </div>
                    {showExplanation && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 border border-teal-200">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs text-teal-700 font-medium">
                          Next in {countdown}s
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Question Text */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {currentQuestion.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.type === "mcq" && currentQuestion.options && (
                      <RadioGroup value={selectedSingle?.toString()} disabled={true}>
                        {currentQuestion.options.map((option, index) => {
                          const isCorrect = index === currentQuestion.correctAnswer;
                          const isSelected = selectedSingle === index;
                          
                          return (
                            <div key={index}>
                              <RadioGroupItem
                                value={index.toString()}
                                id={`option-${index}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`option-${index}`}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                  showExplanation && isCorrect
                                    ? "border-green-500 bg-green-50"
                                    : isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                <div className="flex-1">
                                  <span className="text-sm text-gray-900">{option}</span>
                                </div>
                                {showExplanation && isCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    )}

                    {currentQuestion.type === "multiple-response" && currentQuestion.options && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                          const isCorrect = currentQuestion.correctAnswers?.includes(index);
                          const isSelected = selectedMultiple.includes(index);
                          
                          return (
                            <div
                              key={index}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                showExplanation && isCorrect
                                  ? "border-green-500 bg-green-50"
                                  : isSelected
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              <Checkbox
                                checked={isSelected}
                                disabled={true}
                                className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                              <div className="flex-1">
                                <span className="text-sm text-gray-900">{option}</span>
                              </div>
                              {showExplanation && isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {currentQuestion.type === "true-false" && currentQuestion.options && (
                      <RadioGroup value={selectedSingle?.toString()} disabled={true} className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => {
                          const isCorrect = index === currentQuestion.correctAnswer;
                          const isSelected = selectedSingle === index;
                          
                          return (
                            <div key={index}>
                              <RadioGroupItem
                                value={index.toString()}
                                id={`bool-${index}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`bool-${index}`}
                                className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                  showExplanation && isCorrect
                                    ? "border-green-500 bg-green-50"
                                    : isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                <span className="text-sm text-gray-900 font-medium">
                                  {option}
                                </span>
                                {showExplanation && isCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Padding */}
          <div className="h-6"></div>
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center"
      >
        <p className="text-xs text-blue-900">
          <strong>💡 Sample Demo:</strong> Watch how the real test works. Questions auto-advance every 5 seconds. Your actual test won't auto-advance!
        </p>
      </motion.div>
    </div>
  );
};

export default TestSampleCarousel;
