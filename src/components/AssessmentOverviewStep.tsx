import { useState } from "react";
import { motion } from "motion/react";
import { Clock, FileCheck, Award, Zap, ChevronDown, ChevronUp, Sparkles, Settings, Camera, Headphones, Wifi } from "lucide-react";

interface QuestionTest {
  name: string;
  questionCount: number;
  duration: number; // in minutes
}

interface AssessmentOverviewStepProps {
  assessmentName?: string;
  questionTests?: QuestionTest[];
}

const AssessmentOverviewStep: React.FC<AssessmentOverviewStepProps> = ({
  assessmentName = "React Developer Assessment",
  questionTests = [
    { name: "React Advanced Concepts", questionCount: 15, duration: 12 },
    { name: "JavaScript ES6+", questionCount: 20, duration: 15 },
    { name: "State Management", questionCount: 12, duration: 10 },
    { name: "Performance Optimization", questionCount: 8, duration: 8 },
    { name: "Testing & Debugging", questionCount: 10, duration: 9 },
  ],
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const totalTime = questionTests.reduce((acc, test) => acc + test.duration, 0);
  const totalQuestions = questionTests.reduce((acc, test) => acc + test.questionCount, 0);
  
  const displayTests = showAll ? questionTests : questionTests.slice(0, 3);
  const remainingCount = questionTests.length - 3;
  const hasMore = questionTests.length > 3;

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Left Column - Question Details (3 columns width) */}
      <div className="col-span-3 space-y-4">
        {/* Assessment Header */}
        <div className="p-5 rounded-lg bg-white border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {assessmentName}
                </h3>
                <p className="text-xs text-gray-600">
                  {questionTests.length} test section{questionTests.length > 1 ? 's' : ''} • {totalQuestions} total questions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">{totalTime} min</span>
            </div>
          </div>
        </div>

        {/* Question Test Cards */}
        <div className="space-y-3">
          {displayTests.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-700">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{test.name}</h4>
                    <p className="text-xs text-gray-600">{test.questionCount} questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-medium">{test.duration} min</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Show More/Less Button */}
          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Show {remainingCount} More Test{remainingCount > 1 ? 's' : ''}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Additional Questions Card */}
        <div className="p-4 rounded-lg bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Additional Questions</h4>
                <p className="text-xs text-gray-600">1 question • For better evaluation</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-700">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-medium">3 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results & Instructions */}
      <div className="col-span-2 space-y-4">
        {/* Get Results Card */}
        <div className="p-5 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Get Results</h4>
              <p className="text-xs text-gray-600">
                Receive your assessment results via email notification
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant feedback</span>
            </div>
          </div>
        </div>

        {/* Navigation Tips */}
        <div className="p-4 rounded-lg bg-white border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Navigation Tips
          </h4>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600 mt-0.5">●</span>
              <span>Complete in one go or take breaks between tests</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 mt-0.5">●</span>
              <span>Timer shown per test and question</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 mt-0.5">●</span>
              <span>Use pen, paper, calculator</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 mt-0.5">●</span>
              <span>Avoid AI tools and external help</span>
            </li>
          </ul>
        </div>

        {/* Technical Setup */}
        <div className="p-4 rounded-lg bg-white border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-teal-600" />
            Technical Setup
          </h4>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex gap-2">
              <Camera className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>Camera & microphone enabled</span>
            </li>
            <li className="flex gap-2">
              <Headphones className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>Speakers/headphones ready</span>
            </li>
            <li className="flex gap-2">
              <Wifi className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
              <span>Stable internet required</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssessmentOverviewStep;