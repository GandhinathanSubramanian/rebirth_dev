import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import {
  CheckCircle2,
  Circle,
  ListChecks,
  CheckSquare,
  ToggleLeft,
  Type,
  ArrowRight,
  Rocket,
} from "lucide-react";

interface TestSampleManualProps {
  onComplete: () => void;
  assessmentName?: string;
  totalAssessmentQuestions?: number;
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
  },
  {
    id: 3,
    type: "true-false",
    question: "In React, props can be modified within a child component.",
    options: ["True", "False"],
  }
];

const TestSampleManual: React.FC<TestSampleManualProps> = ({ onComplete, assessmentName = "Aptitude", totalAssessmentQuestions = 3 }) => {
  const [currentStep, setCurrentStep] = useState<"intro" | "questions" | "completion">("intro");
  const [countdown, setCountdown] = useState(6);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  // Intro countdown
  useEffect(() => {
    if (currentStep === "intro" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentStep === "intro" && countdown === 0) {
      setCurrentStep("questions");
    }
  }, [countdown, currentStep]);

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1;

  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setCurrentStep("completion");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multiple-response") {
      return answer && answer.length > 0;
    }
    return answer !== undefined && answer !== null;
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "mcq":
        return <Circle className="w-4 h-4" />;
      case "multiple-response":
        return <CheckSquare className="w-4 h-4" />;
      case "true-false":
        return <ToggleLeft className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* Step 1: Intro Screen */}
        {currentStep === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white border-slate-200 p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    This is the next test:
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {assessmentName}
                  </div>
                </div>

                {/* Tabs/Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 bg-blue-100"
                  >
                    Practice questions
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700"
                  >
                    {totalAssessmentQuestions} Assessment questions
                  </Button>
                </div>

                {/* Description */}
                <div className="text-slate-700">
                  <p>
                    You will first see <span className="font-semibold">3 questions</span> for this test to get a sense of what
                    to expect. After that, your actual tests will begin.
                  </p>
                </div>

                {/* Questions Overview */}
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    Questions Overview:
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Practice Questions - Light Blue Background */}
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold border-2 border-blue-300"
                      >
                        {num}
                      </div>
                    ))}
                    
                    {/* Separator */}
                    <div className="text-slate-400 font-semibold">+</div>
                    
                    {/* Assessment Questions Count */}
                    <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-300">
                      {totalAssessmentQuestions} more
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-900 mb-3">
                    Practice questions will start in{" "}
                    <span className="text-blue-600 font-bold">{countdown} seconds</span>
                  </p>
                  <p className="text-xs text-slate-600">
                    Please stay on this screen. The timer for your next test has
                    started and cannot be paused. The timer continues even when
                    you close the browser.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Questions */}
        {currentStep === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white border-slate-200 p-8 max-w-3xl mx-auto">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                      {getQuestionIcon(currentQuestion.type)}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Sample Question</p>
                      <p className="font-semibold text-slate-900">
                        Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sampleQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          idx === currentQuestionIndex
                            ? "bg-blue-600 text-white"
                            : idx < currentQuestionIndex
                            ? "bg-green-100 text-green-700 border-2 border-green-300"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {idx < currentQuestionIndex ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {currentQuestion.question}
                  </h3>

                  {/* MCQ */}
                  {currentQuestion.type === "mcq" && (
                    <RadioGroup
                      value={answers[currentQuestion.id]?.toString()}
                      onValueChange={(value) => handleAnswerChange(parseInt(value))}
                    >
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              answers[currentQuestion.id] === idx
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                            onClick={() => handleAnswerChange(idx)}
                          >
                            <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                            <Label
                              htmlFor={`option-${idx}`}
                              className="flex-1 cursor-pointer text-slate-700"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {/* Multiple Response */}
                  {currentQuestion.type === "multiple-response" && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, idx) => {
                        const selected = answers[currentQuestion.id] || [];
                        const isChecked = selected.includes(idx);
                        
                        return (
                          <div
                            key={idx}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              isChecked
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                            onClick={() => {
                              const newSelected = isChecked
                                ? selected.filter((i: number) => i !== idx)
                                : [...selected, idx];
                              handleAnswerChange(newSelected);
                            }}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => {}}
                              id={`option-${idx}`}
                            />
                            <Label
                              htmlFor={`option-${idx}`}
                              className="flex-1 cursor-pointer text-slate-700"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* True/False */}
                  {currentQuestion.type === "true-false" && (
                    <RadioGroup
                      value={answers[currentQuestion.id]?.toString()}
                      onValueChange={(value) => handleAnswerChange(parseInt(value))}
                    >
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              answers[currentQuestion.id] === idx
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                            onClick={() => handleAnswerChange(idx)}
                          >
                            <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                            <Label
                              htmlFor={`option-${idx}`}
                              className="flex-1 cursor-pointer text-slate-700"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end pt-6 border-t border-slate-200">
                  <Button
                    onClick={handleNext}
                    disabled={!isAnswered()}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLastQuestion ? "Submit" : "Next Question"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Completion Screen */}
        {currentStep === "completion" && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200 p-8 max-w-lg mx-auto text-center">
              <div className="space-y-5">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    Get Ready for Final Assessment
                  </h2>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    You've completed the sample questions. Now it's time to begin
                    your actual assessment. Good luck!
                  </p>
                </motion.div>

                {/* Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={onComplete}
                    size="default"
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6"
                  >
                    Start Final Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestSampleManual;