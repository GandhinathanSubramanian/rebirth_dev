import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Languages, Award, Code, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

interface TestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testData: {
    title: string;
    summary: string;
    instructions?: string;
    type?: string;
    duration: number;
    language?: string;
    level?: string;
    coveredSkills?: string[];
    relevantFor?: string[];
    tags?: { label: string; variant: string }[];
  };
}

const TestDetailsModal: React.FC<TestDetailsModalProps> = ({
  isOpen,
  onClose,
  testData,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 p-6">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    {testData.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30 text-xs px-3 py-1.5 h-auto backdrop-blur-sm"
                    >
                      Preview sample questions
                    </Button>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-4"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Summary
                  </h3>
                  <p className="text-slate-700">{testData.summary}</p>
                </div>

                {/* Instructions */}
                {testData.instructions && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Instructions
                    </h3>
                    <p className="text-slate-700">{testData.instructions}</p>
                  </div>
                )}

                {/* Key Details Grid */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  {/* Type */}
                  {testData.type && (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Code className="w-4 h-4" />
                        <span className="text-xs">Type</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {testData.type}
                      </span>
                    </div>
                  )}

                  {/* Time */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Time</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">
                      {testData.duration} mins
                    </span>
                  </div>

                  {/* Language */}
                  {testData.language && (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Languages className="w-4 h-4" />
                        <span className="text-xs">Language</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {testData.language}
                      </span>
                    </div>
                  )}

                  {/* Level */}
                  {testData.level && (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Award className="w-4 h-4" />
                        <span className="text-xs">Level</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {testData.level}
                      </span>
                    </div>
                  )}
                </div>

                {/* Covered Skills */}
                {testData.coveredSkills && testData.coveredSkills.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Covered Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {testData.coveredSkills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-slate-700"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* This test is relevant for */}
                {testData.relevantFor && testData.relevantFor.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      This test is relevant for
                    </h3>
                    <p className="text-slate-700">
                      {testData.relevantFor.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-4 bg-slate-50">
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Close
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                >
                  Create Assessment
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestDetailsModal;