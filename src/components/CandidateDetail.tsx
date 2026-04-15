import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Star,
  Download,
  Send,
  XCircle,
  CheckCircle2,
  Timer,
  FileText,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  X,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

interface CandidateDetailProps {
  candidate: {
    id: number;
    name: string;
    email: string;
    assessments: string[];
    jobTitle: string;
    status: string;
  };
  onClose: () => void;
}

export default function CandidateDetail({ candidate, onClose }: CandidateDetailProps) {
  const [hiringStage, setHiringStage] = useState("evaluated");
  const [expandedTests, setExpandedTests] = useState<string[]>(["Full Stack Development"]);

  const toggleTest = (testName: string) => {
    setExpandedTests(prev => 
      prev.includes(testName) 
        ? prev.filter(t => t !== testName)
        : [...prev, testName]
    );
  };

  // Mock assessment data
  const assessmentData = {
    assessment: "Full Stack Development",
    rating: 5,
    invitedDate: "October 10, 2025",
    startedDate: "October 10, 2025",
    completedDate: "October 10, 2025",
    extraTime: "No extra time was granted to this candidate",
    source: "General public link",
    overallScore: {
      percentage: 100,
      grade: "Outstanding",
      timeSpent: "21 min",
      questionsAnswered: "8/5",
    },
    tests: [
      {
        name: "Full Stack Development",
        score: 100,
        maxScore: 100,
        timeSpent: "10 min",
        totalTime: "40 min",
        questions: 5,
        correctAnswers: 5,
        wrongAnswers: 0,
        customQuestions: [
          {
            name: "Explain your approach to building scalable web applications",
            score: 20,
            maxScore: 20,
            timeSpent: "3 min",
          },
          {
            name: "Describe your experience with React state management",
            score: 18,
            maxScore: 20,
            timeSpent: "2.5 min",
          },
        ],
      },
      {
        name: "Additional Questions",
        score: 50,
        maxScore: 100,
        timeSpent: "11 min",
        totalTime: "40 min",
        questions: 3,
        correctAnswers: 2,
        wrongAnswers: 1,
        customQuestions: [
          {
            name: "What is your experience with backend technologies?",
            score: 15,
            maxScore: 20,
            timeSpent: "4 min",
          },
        ],
      },
    ],
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 70) return "from-blue-500 to-cyan-500";
    if (score >= 50) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-white border-slate-200/60 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-slate-100 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center text-blue-700 font-medium border border-blue-200/50">
                  {getInitials(candidate.name)}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{candidate.name}</h2>
                  <p className="text-sm text-slate-500">{candidate.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300">
                <Send className="w-4 h-4" />
                Email
              </Button>
              <Button variant="outline" size="sm" className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300">
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - 4 columns */}
        <motion.div
          className="col-span-12 lg:col-span-4 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Single Combined Card */}
          <Card className="bg-white border-slate-200/60 p-6">
            <div className="space-y-8">
              {/* Assessment Info */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Assessment: {assessmentData.assessment}
                </h3>
                <div className="flex gap-1">
                  {[...Array(assessmentData.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Hiring Stage */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Hiring stage</h4>
                <Select value={hiringStage} onValueChange={setHiringStage}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="evaluated">Evaluated</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Invited */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">Invited</p>
                  <p className="text-sm font-medium text-slate-900">
                    {assessmentData.invitedDate}
                  </p>
                </div>
              </div>

              {/* Started */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">Started</p>
                  <p className="text-sm font-medium text-slate-900">
                    {assessmentData.startedDate}
                  </p>
                </div>
              </div>

              {/* Completed */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">Completed</p>
                  <p className="text-sm font-medium text-slate-900">
                    {assessmentData.completedDate}
                  </p>
                </div>
              </div>

              {/* Extra Time Breakdown */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">
                  Extra time breakdown
                </h4>
                <p className="text-sm text-slate-600">{assessmentData.extraTime}</p>
              </div>

              {/* Source */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Source</h4>
                <p className="text-sm text-slate-600">{assessmentData.source}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Content - 8 columns */}
        <motion.div
          className="col-span-12 lg:col-span-8 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Overall Score Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-teal-500 border-0 p-8 text-white">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Overall Score</h3>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  Completed
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Percentage Score */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 opacity-80" />
                    <p className="text-sm opacity-90">Percentage</p>
                  </div>
                  <p className="text-3xl font-bold">{assessmentData.overallScore.percentage}%</p>
                  <p className="text-xs opacity-80 mt-1">5/5</p>
                </div>

                {/* Raw Score */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 opacity-80" />
                    <p className="text-sm opacity-90">Raw Score</p>
                  </div>
                  <p className="text-3xl font-bold">{assessmentData.overallScore.percentage}%</p>
                  <p className="text-xs opacity-80 mt-1">{assessmentData.overallScore.grade}</p>
                </div>

                {/* Questions Answered */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 opacity-80" />
                    <p className="text-sm opacity-90">Questions</p>
                  </div>
                  <p className="text-3xl font-bold">{assessmentData.overallScore.questionsAnswered.split('/')[0]}</p>
                  <p className="text-xs opacity-80 mt-1">Answered</p>
                </div>

                {/* Time Spent */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-4 h-4 opacity-80" />
                    <p className="text-sm opacity-90">Time Spent</p>
                  </div>
                  <p className="text-3xl font-bold">{assessmentData.overallScore.timeSpent}</p>
                  <p className="text-xs opacity-80 mt-1">Total Time</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Test Breakdown Section */}
          <Card className="bg-white border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-200/60">
              <h3 className="font-semibold text-slate-900">Test Breakdown</h3>
              <p className="text-sm text-slate-500 mt-1">
                Detailed performance across all test sections
              </p>
            </div>

            <div className="divide-y divide-slate-200/60">
              {assessmentData.tests.map((test, index) => {
                const isExpanded = expandedTests.includes(test.name);
                const scorePercentage = (test.score / test.maxScore) * 100;

                return (
                  <div key={index}>
                    {/* Test Header */}
                    <button
                      onClick={() => toggleTest(test.name)}
                      className="w-full p-6 hover:bg-slate-50/50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-slate-900">{test.name}</h4>
                            <Badge 
                              variant="outline" 
                              className={`${getScoreColor(scorePercentage)} border-current`}
                            >
                              {scorePercentage}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{test.questions} questions</span>
                            {test.customQuestions && test.customQuestions.length > 0 && (
                              <>
                                <span>•</span>
                                <span>{test.customQuestions.length} custom question{test.customQuestions.length > 1 ? 's' : ''}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-semibold text-slate-900">
                              {test.score} <span className="text-sm text-slate-500">/ {test.maxScore}</span>
                            </p>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 bg-slate-50/30"
                      >
                        <div className="grid grid-cols-3 gap-4 pt-4">
                          <div className="bg-white rounded-lg p-4 border border-slate-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <p className="text-xs text-slate-500">Time Spent</p>
                            </div>
                            <p className="text-xl font-semibold text-slate-900">
                              {test.timeSpent}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">of {test.totalTime}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-green-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <Check className="w-4 h-4 text-green-600" />
                              <p className="text-xs text-slate-500">Correct</p>
                            </div>
                            <p className="text-xl font-semibold text-green-600">
                              {test.correctAnswers}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">answers</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-red-200/60">
                            <div className="flex items-center gap-2 mb-2">
                              <X className="w-4 h-4 text-red-600" />
                              <p className="text-xs text-slate-500">Wrong</p>
                            </div>
                            <p className="text-xl font-semibold text-red-600">
                              {test.wrongAnswers}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">answers</p>
                          </div>
                        </div>

                        {/* Custom Questions */}
                        {test.customQuestions && test.customQuestions.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Custom Questions</h4>
                            <div className="space-y-3">
                              {test.customQuestions.map((customQuestion, i) => (
                                <div key={i} className="bg-white rounded-lg p-4 border border-slate-200/60">
                                  <div className="flex items-center justify-between gap-4">
                                    {/* Left side - Question */}
                                    <div className="flex-1">
                                      <p className="text-sm text-slate-900 leading-relaxed">
                                        {customQuestion.name}
                                      </p>
                                    </div>
                                    
                                    {/* Right side - Score and Time */}
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                      <div className="text-right">
                                        <p className="text-xs text-slate-500 mb-1">Score</p>
                                        <p className="text-base font-semibold text-blue-600">
                                          {customQuestion.score}<span className="text-slate-400 font-normal">/{customQuestion.maxScore}</span>
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-xs text-slate-500 mb-1">Time</p>
                                        <p className="text-base font-semibold text-teal-600">
                                          {customQuestion.timeSpent}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}