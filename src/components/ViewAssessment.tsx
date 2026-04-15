import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Users,
  UserPlus,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Calendar,
  Eye,
  MoreHorizontal,
  FileText,
  Timer,
  Award,
  TrendingUp,
  Copy,
  Send,
  ChevronDown,
  List,
  Grid3x3,
  X,
  Plus,
  ChevronUp,
  Target,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";

interface ViewAssessmentProps {
  onBack: () => void;
  assessmentData?: any;
  onAttendAssessment?: () => void;
}

export default function ViewAssessment({
  onBack,
  assessmentData,
  onAttendAssessment,
}: ViewAssessmentProps) {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hiringStageFilter, setHiringStageFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentCandidate, setCurrentCandidate] = useState({ firstName: "", lastName: "", email: "" });
  const [addedCandidates, setAddedCandidates] = useState<Array<{ id: number; firstName: string; lastName: string; email: string }>>([]);
  const [expandedCandidateId, setExpandedCandidateId] = useState<number | null>(null);

  // Mock assessment data with proper defaults
  const defaultAssessment = {
    id: 1,
    name: "Senior Frontend Developer Assessment",
    description: "2 Test",
    totalCandidates: 24,
    completed: 8,
    inProgress: 6,
    notStarted: 10,
    tests: [
      { id: 1, name: "React Advanced Concepts", questions: 15 },
      { id: 2, name: "JavaScript ES6+", questions: 20 },
    ],
  };

  const assessment = {
    ...defaultAssessment,
    ...assessmentData,
    tests: assessmentData?.tests || defaultAssessment.tests,
  };

  // Mock candidates data
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      status: "Completed",
      hiringStage: "interview",
      invitedDate: "Nov 1, 2025",
      startedDate: "Nov 6, 2025, 07:38 PM",
      completedDate: "Nov 6, 2025, 07:40 PM",
      timeSpent: "1m 48s",
      score: 92,
      duration: "45 mins",
    },
    {
      id: 2,
      name: "Ramesh S",
      email: "ramesh.s@example.com",
      status: "Not Started",
      hiringStage: null,
      invitedDate: "Nov 4, 2025",
      duration: "45 mins",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInviteCandidate = () => {
    console.log("Inviting candidates:", addedCandidates);
    setShowInviteDialog(false);
    setAddedCandidates([]);
    setCurrentCandidate({ firstName: "", lastName: "", email: "" });
  };

  const addCandidate = () => {
    if (currentCandidate.firstName && currentCandidate.lastName && currentCandidate.email) {
      const newId = addedCandidates.length > 0 ? Math.max(...addedCandidates.map(c => c.id)) + 1 : 1;
      setAddedCandidates([...addedCandidates, { id: newId, ...currentCandidate }]);
      setCurrentCandidate({ firstName: "", lastName: "", email: "" });
    }
  };

  const removeCandidate = (id: number) => {
    setAddedCandidates(addedCandidates.filter(c => c.id !== id));
  };

  const updateCurrentCandidate = (field: "firstName" | "lastName" | "email", value: string) => {
    setCurrentCandidate({ ...currentCandidate, [field]: value });
  };

  const stats = [
    {
      label: "Total",
      value: assessment.totalCandidates,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Completed",
      value: assessment.completed,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "In Progress",
      value: assessment.inProgress,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      label: "Not Started",
      value: assessment.notStarted,
      icon: XCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          icon: CheckCircle2,
        };
      case "In Progress":
        return {
          color: "text-blue-700 bg-blue-50 border-blue-200",
          icon: Clock,
        };
      case "Not Started":
        return {
          color: "text-amber-700 bg-amber-50 border-amber-200",
          icon: XCircle,
        };
      default:
        return {
          color: "text-slate-600 bg-slate-50 border-slate-200",
          icon: Users,
        };
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header - Sticky */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 flex-shrink-0 sticky top-0 z-10"
      >
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  {assessment.name}
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {assessment.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button
                onClick={() => setShowInviteDialog(true)}
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
              >
                <UserPlus className="w-4 h-4" />
                Invite Candidate
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 h-full"
        >
          {/* Left Sidebar - 3 columns - Sticky with internal scroll */}
          <div className="col-span-3 border-r border-slate-300/70 border-dashed bg-gradient-to-b from-slate-50 to-blue-50/20 overflow-y-auto">
            <div className="space-y-5 p-8">
            {/* Stats Cards */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-slate-200/60 p-5 flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-slate-700">
                  Overview
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border ${stat.bg} ${stat.border} text-center space-y-2`}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <span className={`text-xl font-semibold ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Search */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-slate-200/60 p-5 flex flex-col gap-4">
                <Label className="text-sm font-semibold text-slate-700">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-slate-50 border-slate-200"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border-slate-200/60 p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-700">
                    Filters
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {/* Status Filter */}
                  <div>
                    <Label className="text-xs text-slate-600 mb-2 block">
                      Status
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-slate-50 border-slate-200 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Hiring Stage Filter */}
                  <div>
                    <Label className="text-xs text-slate-600 mb-2 block">
                      Hiring Stage
                    </Label>
                    <Select
                      value={hiringStageFilter}
                      onValueChange={setHiringStageFilter}
                    >
                      <SelectTrigger className="bg-slate-50 border-slate-200 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="screening">Initial Screening</SelectItem>
                        <SelectItem value="interview">Not Yet Evaluated</SelectItem>
                        <SelectItem value="final">Final Round</SelectItem>
                        <SelectItem value="offer">Offer Extended</SelectItem>
                        <SelectItem value="not-evaluated">Not Evaluated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4 text-slate-600 border-slate-200 hover:bg-slate-50"
                  onClick={() => {
                    setStatusFilter("all");
                    setHiringStageFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            </motion.div>

            {/* Assessment Info */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200/60 p-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Assessment Tests
                    </h3>
                    <p className="text-xs text-slate-600">
                      {(assessment.tests || []).length} tests included
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {(assessment.tests || []).map((test: any) => (
                    <div
                      key={test.id}
                      className="bg-white/70 rounded-lg p-2.5 border border-blue-200/50"
                    >
                      <p className="text-xs font-medium text-slate-800">
                        {test.name}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {test.questions} questions
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
            </div>
          </div>

          {/* Right Content - 9 columns - Scrollable */}
          <div className="col-span-9 bg-slate-50 overflow-y-auto">
            <div className="space-y-6 p-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Candidates
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {candidates.length} candidates in this assessment
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-9 w-9 ${
                      viewMode === "list"
                        ? "bg-blue-50 border-blue-500 text-blue-600 hover:bg-blue-100"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-9 w-9 ${
                      viewMode === "grid"
                        ? "bg-blue-50 border-blue-500 text-blue-600 hover:bg-blue-100"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Candidate List */}
            <div className="space-y-4">
              {candidates.map((candidate) => {
                const statusConfig = getStatusConfig(candidate.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div key={candidate.id} variants={itemVariants}>
                    <Card 
                      className="bg-white border-slate-200/60 p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-300 to-violet-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-violet-700 text-lg font-medium">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header Row */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-slate-900 mb-1">
                                {candidate.name}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3.5 h-3.5" />
                                  {candidate.email}
                                </div>
                                <Separator
                                  orientation="vertical"
                                  className="h-4"
                                />
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  Invited {candidate.invitedDate}
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${statusConfig.color} border flex items-center gap-1.5`}
                            >
                              <StatusIcon className="w-3.5 h-3.5" />
                              {candidate.status}
                            </Badge>
                          </div>

                          {/* Status Details */}
                          {candidate.status === "Completed" && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <p className="text-sm font-semibold text-emerald-800">
                                  Assessment Completed
                                </p>
                              </div>
                              <div className="grid grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-emerald-700 font-medium mb-1">
                                    Started
                                  </p>
                                  <p className="text-xs text-emerald-600">
                                    {candidate.startedDate}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-emerald-700 font-medium mb-1">
                                    Completed
                                  </p>
                                  <p className="text-xs text-emerald-600">
                                    {candidate.completedDate}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-emerald-700 font-medium mb-1">
                                    Time Spent
                                  </p>
                                  <p className="text-xs text-emerald-600">
                                    {candidate.timeSpent}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-emerald-700 font-medium mb-1">
                                    Score
                                  </p>
                                  <p className="text-xs text-emerald-600 font-semibold">
                                    {candidate.score}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {candidate.status === "Not Started" && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <XCircle className="w-4 h-4 text-amber-600" />
                                <p className="text-sm font-semibold text-amber-900">
                                  Assessment Not Started
                                </p>
                              </div>
                              <p className="text-xs text-amber-700">
                                Candidate has been invited but hasn't started the
                                assessment yet. Duration: {candidate.duration}
                              </p>
                            </div>
                          )}

                          {/* Actions Row */}
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <Label className="text-xs text-slate-600 mb-1.5 block">
                                Hiring Stage
                              </Label>
                              <Select
                                defaultValue={
                                  candidate.hiringStage || "not-evaluated"
                                }
                              >
                                <SelectTrigger className="bg-slate-50 border-slate-200 h-9 text-sm">
                                  <SelectValue placeholder="Not yet evaluated" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not-evaluated">
                                    Not yet evaluated
                                  </SelectItem>
                                  <SelectItem value="screening">
                                    Initial Screening
                                  </SelectItem>
                                  <SelectItem value="interview">
                                    Not Yet Evaluated
                                  </SelectItem>
                                  <SelectItem value="final">Final Round</SelectItem>
                                  <SelectItem value="offer">
                                    Offer Extended
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {candidate.status === "Completed" && (
                              <div className="flex items-end mt-3">
                                {expandedCandidateId === candidate.id ? (
                                  <Button
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      // Close Details - Just close the accordion
                                      setExpandedCandidateId(null);
                                    }}
                                    className="border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 h-10"
                                  >
                                    <ChevronUp className="w-4 h-4" />
                                    Close Details
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      // View Details - Expand accordion
                                      setExpandedCandidateId(candidate.id);
                                    }}
                                    className="border-slate-200 text-slate-700 hover:bg-slate-50 gap-2 h-10"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Expandable Assessment Results */}
                          {candidate.status === "Completed" &&
                            expandedCandidateId === candidate.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6 pt-6 border-t border-slate-200"
                              >
                                <div className="space-y-6">
                                  {/* Header */}
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-semibold text-slate-900">
                                        Assessment Results
                                      </h4>
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        Detailed performance breakdown
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <div className="flex items-baseline gap-1.5">
                                        <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                          {candidate.score}%
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        Overall Score
                                      </p>
                                    </div>
                                  </div>

                                  {/* Overview Cards */}
                                  <div className="grid grid-cols-4 gap-3">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/60">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                          <BookOpen className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <p className="text-xs text-blue-700">
                                          Questions
                                        </p>
                                      </div>
                                      <p className="font-semibold text-blue-900">
                                        3/3
                                      </p>
                                      <p className="text-xs text-blue-600 mt-0.5">
                                        Answered
                                      </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl p-4 border border-teal-200/60">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                                          <Target className="w-4 h-4 text-teal-600" />
                                        </div>
                                        <p className="text-xs text-teal-700">
                                          Correct
                                        </p>
                                      </div>
                                      <p className="font-semibold text-teal-900">
                                        2/3
                                      </p>
                                      <p className="text-xs text-teal-600 mt-0.5">
                                        Accuracy
                                      </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl p-4 border border-violet-200/60">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                          <Timer className="w-4 h-4 text-violet-600" />
                                        </div>
                                        <p className="text-xs text-violet-700">
                                          Time Spent
                                        </p>
                                      </div>
                                      <p className="font-semibold text-violet-900">
                                        {candidate.timeSpent}
                                      </p>
                                      <p className="text-xs text-violet-600 mt-0.5">
                                        Total
                                      </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200/60">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                          <Award className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <p className="text-xs text-amber-700">
                                          Average
                                        </p>
                                      </div>
                                      <p className="font-semibold text-amber-900">
                                        {candidate.score}%
                                      </p>
                                      <p className="text-xs text-amber-600 mt-0.5">
                                        Score
                                      </p>
                                    </div>
                                  </div>

                                  {/* Test Performance */}
                                  <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-slate-900">
                                      Test Performance
                                    </h5>
                                    <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                          <p className="text-sm font-medium text-slate-900 mb-1">
                                            Front end developer job
                                          </p>
                                          <p className="text-xs text-slate-500">
                                            2 questions • 50% accuracy
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                                            <span className="text-sm font-semibold text-orange-700">
                                              50%
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Bonus Questions */}
                                  <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-blue-50 rounded-xl p-5 border border-purple-200">
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <Award className="w-4 h-4 text-purple-600" />
                                      </div>
                                      <div>
                                        <h5 className="text-sm font-semibold text-purple-900">
                                          Bonus Questions
                                        </h5>
                                        <p className="text-xs text-purple-600">
                                          Additional assessment
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-3 gap-3">
                                      <div className="bg-white/60 rounded-lg p-3 text-center">
                                        <p className="text-xs text-purple-700 mb-1">
                                          Questions
                                        </p>
                                        <p className="text-sm font-semibold text-purple-900">
                                          1/1
                                        </p>
                                      </div>
                                      <div className="bg-white/60 rounded-lg p-3 text-center">
                                        <p className="text-xs text-purple-700 mb-1">
                                          Correct
                                        </p>
                                        <p className="text-sm font-semibold text-purple-900">
                                          1/1
                                        </p>
                                      </div>
                                      <div className="bg-white/60 rounded-lg p-3 text-center">
                                        <p className="text-xs text-purple-700 mb-1">
                                          Time
                                        </p>
                                        <p className="text-sm font-semibold text-purple-900">
                                          14s
                                        </p>
                                      </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-purple-700">
                                            Accuracy
                                          </span>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-200">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                                          <span className="text-sm font-semibold text-teal-700">
                                            100%
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Skills Performance */}
                                  <div className="space-y-3">
                                    <h5 className="text-sm font-semibold text-slate-900">
                                      Skills Performance
                                    </h5>
                                    <div className="bg-white rounded-xl p-5 border border-slate-200">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">
                                              FE
                                            </span>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-slate-900">
                                              Front End
                                            </p>
                                            <p className="text-xs text-slate-500">
                                              Development skill
                                            </p>
                                          </div>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                                          <span className="text-sm font-semibold text-orange-700">
                                            50%
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State for more candidates */}
            {candidates.length < 3 && (
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-blue-50/50 border-blue-300 border-dashed p-12 hover:border-blue-400 hover:bg-blue-50/70 transition-all cursor-pointer"
                  onClick={() => setShowInviteDialog(true)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1.5">
                      Add Candidates
                    </h3>
                    <p className="text-sm text-slate-600 mb-5">
                      Invite more candidates to this assessment
                    </p>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowInviteDialog(true);
                      }}
                      className="gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                    >
                      <UserPlus className="w-4 h-4" />
                      Invite Candidate
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              Invite Candidates
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-600 pt-1">
              Add candidate details to send assessment invitations. You can add multiple candidates at once.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Input Form */}
            <div className="p-4 bg-white rounded-lg border-2 border-blue-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-xs text-slate-600 mb-1.5 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={currentCandidate.firstName}
                    onChange={(e) => updateCurrentCandidate("firstName", e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-xs text-slate-600 mb-1.5 block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={currentCandidate.lastName}
                    onChange={(e) => updateCurrentCandidate("lastName", e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-xs text-slate-600 mb-1.5 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="candidate@example.com"
                  value={currentCandidate.email}
                  onChange={(e) => updateCurrentCandidate("email", e.target.value)}
                  className="bg-slate-50 border-slate-200"
                />
              </div>
              
              {/* Add Candidate Button */}
              <Button
                type="button"
                onClick={addCandidate}
                disabled={!currentCandidate.firstName || !currentCandidate.lastName || !currentCandidate.email}
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add Candidate
              </Button>
            </div>
            
            {/* Added Candidates List */}
            {addedCandidates.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-slate-700">
                    Added Candidates ({addedCandidates.length})
                  </h4>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                
                <div className="space-y-2">
                  {addedCandidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-200 flex items-center justify-between group hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">
                            {candidate.firstName} {candidate.lastName}
                          </p>
                          <p className="text-xs text-slate-600 truncate">
                            {candidate.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCandidate(candidate.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-white rounded-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowInviteDialog(false);
                setAddedCandidates([]);
                setCurrentCandidate({ firstName: "", lastName: "", email: "" });
              }}
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInviteCandidate}
              disabled={addedCandidates.length === 0}
              className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send {addedCandidates.length} {addedCandidates.length === 1 ? "Invitation" : "Invitations"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
