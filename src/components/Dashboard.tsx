import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Bell,
  Home,
  FileText,
  Users,
  BookOpen,
  ClipboardCheck,
  Plus,
  Clock,
  CheckCircle2,
  Calendar,
  Eye,
  ChevronRight,
  ArrowUpRight,
  MoreHorizontal,
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import CreateTest from "./CreateTest";
import CreateAssessment from "./CreateAssessment";
import ViewAssessment from "./ViewAssessment";
import Candidates from "./Candidates";
import TestDetails from "./TestDetails";
import TestDetailsModal from "./TestDetailsModal";
import TestViewEdit from "./TestViewEdit";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface DashboardProps {
  onNavigate: (page: string) => void;
  initialTab?: string;
  showSuccessPopup?: boolean;
  onCloseSuccessPopup?: () => void;
}

export function Dashboard({
  onNavigate,
  initialTab = "home",
  showSuccessPopup = false,
  onCloseSuccessPopup,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showCreateAssessment, setShowCreateAssessment] =
    useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<any>(null);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [viewingTest, setViewingTest] = useState<any>(null);

  // Test Library filter collapsible states
  const [sourcesOpen, setSourcesOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [focusTypeOpen, setFocusTypeOpen] = useState(true);
  const [formatOpen, setFormatOpen] = useState(true);
  const [jobRolesOpen, setJobRolesOpen] = useState(true);

  // Check if we need to show ViewAssessment based on activeTab
  const showViewAssessment = activeTab === "view-assessment";

  // Mock data for stats
  const stats = [
    {
      title: "Active Assessments",
      value: "12",
      icon: FileText,
    },
    {
      title: "Active Candidates",
      value: "48",
      icon: Users,
    },
    {
      title: "Completed",
      value: "156",
      icon: CheckCircle2,
    },
    {
      title: "Not Started",
      value: "24",
      icon: Clock,
    },
  ];

  // Mock data for active assessments
  const activeAssessments = [
    {
      id: 1,
      title: "Frontend Developer Assessment",
      candidates: 12,
      completed: 8,
      dueDate: "Dec 15, 2024",
      status: "Active",
    },
    {
      id: 2,
      title: "Data Analyst Skills Test",
      candidates: 8,
      completed: 5,
      dueDate: "Dec 20, 2024",
      status: "Active",
    },
    {
      id: 3,
      title: "UX Designer Portfolio Review",
      candidates: 15,
      completed: 12,
      dueDate: "Dec 18, 2024",
      status: "Active",
    },
  ];

  // Mock data for active candidates
  const activeCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      assessment: "Frontend Developer Assessment",
      status: "In Progress",
      submittedAt: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjQ4Mzg5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      assessment: "Backend Engineer Challenge",
      status: "In Progress",
      submittedAt: "5 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI0ODgxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      assessment: "UX Designer Portfolio Review",
      status: "Completed",
      submittedAt: "1 day ago",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjI0MTAzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@email.com",
      assessment: "Data Analyst Skills Test",
      status: "In Progress",
      submittedAt: "3 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  // Mock data for tests
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAssessmentPage, setCurrentAssessmentPage] =
    useState(1);
  const itemsPerPage = 4;

  const allTests = [
    {
      id: 1,
      name: "JavaScript Fundamentals",
      status: "Active",
      questionCount: 25,
      attempts: 142,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "React Advanced Concepts",
      status: "Active",
      questionCount: 30,
      attempts: 87,
      lastActivity: "5 hours ago",
    },
    {
      id: 3,
      name: "CSS & Tailwind Mastery",
      status: "Draft",
      questionCount: 20,
      attempts: 0,
      lastActivity: "1 day ago",
    },
    {
      id: 4,
      name: "Node.js Backend Development",
      status: "Active",
      questionCount: 35,
      attempts: 156,
      lastActivity: "3 hours ago",
    },
    {
      id: 5,
      name: "TypeScript Essentials",
      status: "Active",
      questionCount: 22,
      attempts: 203,
      lastActivity: "6 hours ago",
    },
    {
      id: 6,
      name: "Python Data Structures",
      status: "Draft",
      questionCount: 18,
      attempts: 0,
      lastActivity: "3 days ago",
    },
  ];

  const totalPages = Math.ceil(allTests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tests = allTests.slice(startIndex, endIndex);

  // Mock data for assessments
  const allAssessments = [
    {
      id: 1,
      name: "Senior Frontend Developer Assessment",
      status: "Active",
      lastActivity: "1 hour ago",
      dateCreated: "Nov 1, 2024",
      expires: "Dec 15, 2024",
    },
    {
      id: 2,
      name: "Backend Engineer Technical Interview",
      status: "Active",
      lastActivity: "3 hours ago",
      dateCreated: "Oct 28, 2024",
      expires: "Dec 20, 2024",
    },
    {
      id: 3,
      name: "UX/UI Designer Portfolio Review",
      status: "Draft",
      lastActivity: "2 days ago",
      dateCreated: "Oct 25, 2024",
      expires: "Jan 10, 2025",
    },
    {
      id: 4,
      name: "Full Stack Developer Challenge",
      status: "Active",
      lastActivity: "5 hours ago",
      dateCreated: "Oct 20, 2024",
      expires: "Dec 18, 2024",
    },
    {
      id: 5,
      name: "Data Analyst Skills Assessment",
      status: "Active",
      lastActivity: "1 day ago",
      dateCreated: "Oct 15, 2024",
      expires: "Dec 25, 2024",
    },
    {
      id: 6,
      name: "Product Manager Interview Round",
      status: "Archived",
      lastActivity: "1 week ago",
      dateCreated: "Sep 30, 2024",
      expires: "Nov 30, 2024",
    },
  ];

  const totalAssessmentPages = Math.ceil(
    allAssessments.length / itemsPerPage,
  );
  const startAssessmentIndex =
    (currentAssessmentPage - 1) * itemsPerPage;
  const endAssessmentIndex =
    startAssessmentIndex + itemsPerPage;
  const assessments = allAssessments.slice(
    startAssessmentIndex,
    endAssessmentIndex,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-0";
      case "Draft":
        return "bg-amber-50 text-amber-700 border-0";
      case "Archived":
        return "bg-slate-100 text-slate-600 border-0";
      default:
        return "bg-slate-100 text-slate-600 border-0";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  // HIDDEN FOR NOW - Using modal instead
  // if (showTestDetails) {
  //   return (
  //     <TestDetails
  //       onBack={() => {
  //         setShowTestDetails(false);
  //         setSelectedTest(null);
  //       }}
  //       testData={selectedTest}
  //     />
  //   );
  // }

  if (showViewAssessment) {
    return (
      <ViewAssessment
        onBack={() => {
          setActiveTab("assessments");
          setSelectedAssessment(null);
        }}
        assessmentData={selectedAssessment}
        onAttendAssessment={() =>
          onNavigate("attend-assessment")
        }
      />
    );
  }

  if (showCreateAssessment) {
    return (
      <CreateAssessment
        onBack={() => setShowCreateAssessment(false)}
        onNavigateToAssessments={() => {
          setShowCreateAssessment(false);
          setActiveTab("assessments");
        }}
      />
    );
  }

  if (showCreateTest) {
    return (
      <CreateTest
        onBack={() => setShowCreateTest(false)}
        onNavigateToMyTests={() => {
          setShowCreateTest(false);
          setActiveTab("tests");
        }}
      />
    );
  }

  if (viewingTest) {
    return (
      <TestViewEdit
        test={viewingTest}
        onBack={() => setViewingTest(null)}
        onPreview={() => {
          setViewingTest(null);
          onNavigate("attend-assessment-preview");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white border-b border-slate-200 sticky top-0 z-50 overflow-hidden"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-teal-500/[0.02] pointer-events-none" />

        {/* Decorative dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500">
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                <svg
                  className="relative w-6 h-6 text-white drop-shadow-sm"
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
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600 bg-clip-text text-transparent tracking-tight">
                  Rebirth
                </h1>
                <p className="text-xs text-slate-500 leading-none mt-0.5">
                  Smart Assessment Platform
                </p>
              </div>
            </div>

            {/* Navigation - Centered */}
            <nav className="flex items-center gap-1 flex-1 justify-center">
              {[
                { icon: Home, label: "Home", value: "home" },
                {
                  icon: FileText,
                  label: "Assessments",
                  value: "assessments",
                },
                {
                  icon: Users,
                  label: "Candidates",
                  value: "candidates",
                },
                {
                  icon: BookOpen,
                  label: "Test Library",
                  value: "library",
                },
                {
                  icon: ClipboardCheck,
                  label: "My Tests",
                  value: "tests",
                },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all ${
                    activeTab === item.value
                      ? "bg-slate-50 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                  {activeTab === item.value && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Badge
                onClick={() => onNavigate("attend-assessment")}
                className="h-8 px-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white cursor-pointer flex items-center gap-1.5 transition-all duration-200"
              >
                <Users className="w-3.5 h-3.5" />
                User Preview
              </Badge>

              <button className="relative h-8 px-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 group flex items-center">
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full animate-pulse"></span>
              </button>

              <div className="flex items-center gap-3 h-8 pl-3 px-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    John Doe
                  </p>
                  <p className="text-xs text-slate-500">
                    HR Manager
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 rounded-full group">
                      <Avatar className="w-8 h-8 ring-2 ring-slate-200/60 cursor-pointer group-hover:ring-blue-400 transition-all duration-200">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-500 text-white text-sm">
                          JD
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-2"
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        John Doe
                      </p>
                      <p className="text-xs text-slate-500">
                        john.doe@company.com
                      </p>
                    </div>
                    <DropdownMenuItem
                      className="gap-2 py-2.5 cursor-pointer"
                      onClick={() => onNavigate("user-profile")}
                    >
                      <Users className="w-4 h-4" />
                      <span>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2 py-2.5 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={() => onNavigate("welcome")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {activeTab === "home" ? (
            <>
              {/* Welcome Banner */}
              <motion.div variants={itemVariants}>
                <Card className="relative overflow-hidden bg-white border-slate-200/60">
                  {/* Modern wave background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-cyan-500/5" />
                  <svg
                    className="absolute bottom-0 left-0 w-full h-32 opacity-20"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="waveGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="50%"
                          stopColor="#14b8a6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#waveGradient)"
                      d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                  </svg>

                  <div className="relative p-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                        Welcome back, John 👋
                      </h2>
                      <p className="text-slate-600">
                        Here's what's happening with your
                        assessments today.
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        setShowCreateAssessment(true)
                      }
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Assessment
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => {
                  const iconColors = [
                    {
                      bg: "bg-blue-50",
                      text: "text-blue-600",
                      gradient:
                        "from-blue-500/10 to-teal-500/10",
                    },
                    {
                      bg: "bg-teal-50",
                      text: "text-teal-600",
                      gradient:
                        "from-teal-500/10 to-cyan-500/10",
                    },
                    {
                      bg: "bg-green-50",
                      text: "text-green-600",
                      gradient:
                        "from-green-500/10 to-emerald-500/10",
                    },
                    {
                      bg: "bg-amber-50",
                      text: "text-amber-600",
                      gradient:
                        "from-amber-500/10 to-orange-500/10",
                    },
                  ];
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-6 bg-white border-slate-200/60 relative overflow-hidden group hover:shadow-md transition-all">
                        <div
                          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${iconColors[index].gradient} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`}
                        />
                        <div className="flex items-center gap-4 relative">
                          <div
                            className={`w-12 h-12 rounded-lg ${iconColors[index].bg} flex items-center justify-center flex-shrink-0`}
                          >
                            <stat.icon
                              className={`w-6 h-6 ${iconColors[index].text}`}
                            />
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">
                              {stat.title}
                            </p>
                            <p className="text-2xl font-semibold text-slate-900">
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Assessments */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2"
                >
                  <Card className="bg-white border-slate-200/60 h-full flex flex-col">
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            Active Assessments
                          </h3>
                          <p className="text-sm text-slate-500 mt-0.5">
                            Your recent assessments
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-600 bg-slate-50 hover:bg-white"
                        >
                          View all
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="px-6 pb-6 flex-1">
                      <div className="space-y-4">
                        {activeAssessments.map((assessment) => (
                          <div
                            key={assessment.id}
                            className="group p-4 rounded-lg border border-slate-200/60 hover:border-slate-300 hover:bg-slate-50/50 transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                  {assessment.title}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                  <span className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    {assessment.candidates}{" "}
                                    candidates
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {assessment.completed}{" "}
                                    completed
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {assessment.dueDate}
                                  </span>
                                </div>
                              </div>
                              <Badge
                                variant="secondary"
                                className="bg-green-50 text-green-700 hover:bg-green-50 border-0 self-center"
                              >
                                {assessment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-white border-slate-200/60 h-full flex flex-col">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="font-semibold text-slate-900">
                        Quick Actions
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Common tasks
                      </p>
                    </div>
                    <div className="px-6 pb-6 flex-1">
                      <div className="space-y-2">
                        {[
                          {
                            icon: Plus,
                            label: "Create Assessment",
                            onClick: () =>
                              setShowCreateAssessment(true),
                          },
                          {
                            icon: FileText,
                            label: "Create Test",
                            onClick: () =>
                              setShowCreateTest(true),
                          },
                          {
                            icon: ClipboardCheck,
                            label: "My Tests",
                            onClick: () =>
                              setActiveTab("tests"),
                          },
                          {
                            icon: Users,
                            label: "View Assessment",
                            onClick: () =>
                              setActiveTab("assessments"),
                          },
                        ].map((action, index) => (
                          <button
                            key={index}
                            onClick={action.onClick}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                <action.icon className="w-4 h-4 text-slate-600" />
                              </div>
                              <span className="text-sm font-medium text-slate-900">
                                {action.label}
                              </span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Active Candidates Table */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white border-slate-200/60">
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Active Candidates
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                          Recent candidate activity
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 bg-slate-50 hover:bg-white"
                      >
                        View all
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div
                    className="overflow-x-auto hide-scrollbar"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left pt-3 pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th className="text-left pt-3 pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Assessment
                          </th>
                          <th className="text-left pt-3 pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-left pt-3 pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Updated
                          </th>
                          <th className="text-right pt-3 pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeCandidates.map((candidate) => (
                          <tr
                            key={candidate.id}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="py-5 px-6">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10 ring-2 ring-slate-100">
                                  <AvatarImage
                                    src={candidate.avatar}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                                    {candidate.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-slate-900">
                                    {candidate.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {candidate.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm font-medium text-slate-900">
                                {candidate.assessment}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <Badge
                                variant="secondary"
                                className={
                                  candidate.status ===
                                  "Completed"
                                    ? "bg-green-50 text-green-700 hover:bg-green-50 border-0"
                                    : "bg-blue-50 text-blue-700 hover:bg-blue-50 border-0"
                                }
                              >
                                {candidate.status}
                              </Badge>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {candidate.submittedAt}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <MoreHorizontal className="w-4 h-4 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            </>
          ) : activeTab === "assessments" ? (
            <>
              {/* Assessments Banner */}
              <motion.div variants={itemVariants}>
                <Card className="relative overflow-hidden bg-white border-slate-200/60">
                  {/* Modern wave background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-cyan-500/5" />
                  <svg
                    className="absolute bottom-0 left-0 w-full h-32 opacity-20"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="waveGradientAssessments"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="50%"
                          stopColor="#14b8a6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#waveGradientAssessments)"
                      d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                  </svg>

                  <div className="relative p-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                        Assessments
                      </h2>
                      <p className="text-slate-600">
                        Create and manage candidate assessments
                        with complete evaluation workflows.
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        setShowCreateAssessment(true)
                      }
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Assessment
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Search and Filter */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white border-slate-200/60 overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Search Box */}
                      <div className="col-span-12 lg:col-span-7">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            placeholder="Search assessments by name..."
                            className="h-12 pl-12 pr-4 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-3">
                        {/* Status Filter */}
                        <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">
                              Filter by status
                            </span>
                          </div>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        </div>

                        {/* Sort Filter */}
                        <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">
                              Sort by
                            </span>
                          </div>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Assessments Table */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white border-slate-200/60">
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          All Assessments
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                          Manage your assessment library
                        </p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="overflow-x-auto hide-scrollbar"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Last Activity
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Date Created
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Expires
                          </th>
                          <th className="text-right pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {assessments.map((assessment) => (
                          <tr
                            key={assessment.id}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="py-5 px-6">
                              <p className="text-sm font-medium text-slate-900">
                                {assessment.name}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <Badge
                                variant="secondary"
                                className={getStatusColor(
                                  assessment.status,
                                )}
                              >
                                {assessment.status}
                              </Badge>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {assessment.lastActivity}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {assessment.dateCreated}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {assessment.expires}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => {
                                    setSelectedAssessment(
                                      assessment,
                                    );
                                    setActiveTab(
                                      "view-assessment",
                                    );
                                  }}
                                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                  <Eye className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <MoreHorizontal className="w-4 h-4 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="border-t border-slate-100 px-6 py-4 bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-600">
                        Showing {startAssessmentIndex + 1} to{" "}
                        {Math.min(
                          endAssessmentIndex,
                          allAssessments.length,
                        )}{" "}
                        of {allAssessments.length} assessments
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentAssessmentPage((prev) =>
                              Math.max(prev - 1, 1),
                            )
                          }
                          disabled={currentAssessmentPage === 1}
                          className="border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: totalAssessmentPages },
                            (_, i) => i + 1,
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={
                                currentAssessmentPage === page
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setCurrentAssessmentPage(page)
                              }
                              className={
                                currentAssessmentPage === page
                                  ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentAssessmentPage((prev) =>
                              Math.min(
                                prev + 1,
                                totalAssessmentPages,
                              ),
                            )
                          }
                          disabled={
                            currentAssessmentPage ===
                            totalAssessmentPages
                          }
                          className="border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </>
          ) : activeTab === "candidates" ? (
            <Candidates />
          ) : activeTab === "tests" ? (
            <>
              {/* My Tests Banner */}
              <motion.div variants={itemVariants}>
                <Card className="relative overflow-hidden bg-white border-slate-200/60">
                  {/* Modern wave background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-cyan-500/5" />
                  <svg
                    className="absolute bottom-0 left-0 w-full h-32 opacity-20"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="waveGradientTests"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="50%"
                          stopColor="#14b8a6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#waveGradientTests)"
                      d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                  </svg>

                  <div className="relative p-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                        My Tests
                      </h2>
                      <p className="text-slate-600">
                        Create, manage, and organize all your
                        assessment tests in one place.
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowCreateTest(true)}
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Test
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Search and Filter */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white border-slate-200/60 overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Search Box */}
                      <div className="col-span-12 lg:col-span-7">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            placeholder="Search tests by name..."
                            className="h-12 pl-12 pr-4 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-3">
                        {/* Status Filter */}
                        <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">
                              Filter by status
                            </span>
                          </div>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        </div>

                        {/* Sort Filter */}
                        <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">
                              Sort by
                            </span>
                          </div>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Tests Table */}
              <motion.div variants={itemVariants}>
                <Card className="bg-white border-slate-200/60">
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          All Tests
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                          Manage your test library
                        </p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="overflow-x-auto hide-scrollbar"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Test Name
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Questions
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Test Attempts
                          </th>
                          <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Last Activity
                          </th>
                          <th className="text-right pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {tests.map((test) => (
                          <tr
                            key={test.id}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="py-5 px-6">
                              <p className="text-sm font-medium text-slate-900">
                                {test.name}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <Badge
                                variant="secondary"
                                className={getStatusColor(
                                  test.status,
                                )}
                              >
                                {test.status}
                              </Badge>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {test.questionCount}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {test.attempts}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <p className="text-sm text-slate-600">
                                {test.lastActivity}
                              </p>
                            </td>
                            <td className="py-5 px-6">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() =>
                                    setViewingTest(test)
                                  }
                                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                  <Edit className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <MoreHorizontal className="w-4 h-4 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="border-t border-slate-100 px-6 py-4 bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-600">
                        Showing {startIndex + 1} to{" "}
                        {Math.min(endIndex, allTests.length)} of{" "}
                        {allTests.length} tests
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.max(prev - 1, 1),
                            )
                          }
                          disabled={currentPage === 1}
                          className="border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                          ).map((page) => (
                            <Button
                              key={page}
                              variant={
                                currentPage === page
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setCurrentPage(page)
                              }
                              className={
                                currentPage === page
                                  ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-sm"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages),
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </>
          ) : activeTab === "library" ? (
            <>
              {/* Test Library Banner */}
              <motion.div variants={itemVariants}>
                <Card className="relative overflow-hidden bg-white border-slate-200/60">
                  {/* Modern wave background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-cyan-500/5" />
                  <svg
                    className="absolute bottom-0 left-0 w-full h-32 opacity-20"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="waveGradientLibrary"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="50%"
                          stopColor="#14b8a6"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#waveGradientLibrary)"
                      d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                  </svg>

                  <div className="relative p-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                        Test Library
                      </h2>
                      <p className="text-slate-600">
                        Discover and preview assessment tests
                        from our curated library.
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        setShowCreateAssessment(true)
                      }
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Assessment
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Test Library Content */}
              <motion.div variants={itemVariants}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Filters Sidebar */}
                  <div className="lg:col-span-1">
                    <Card className="relative p-5 bg-gradient-to-br from-white via-blue-50/20 to-teal-50/20 border-slate-200/60 sticky top-24 backdrop-blur-sm overflow-hidden">
                      {/* Subtle decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/10 to-transparent rounded-full -mr-16 -mt-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100/10 to-transparent rounded-full -ml-12 -mb-12" />

                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-slate-900 font-medium">
                            Filters
                          </h3>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 px-2 py-0.5"
                          >
                            0
                          </Badge>
                        </div>

                        {/* Search */}
                        <div className="mb-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 z-10" />
                            <Input
                              placeholder="Search tests..."
                              className="pl-9 bg-white/70 backdrop-blur-sm border-slate-200 focus:border-blue-300 focus:ring-blue-200 h-9"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 -mt-3">
                        {/* Sources */}
                        <Collapsible
                          open={sourcesOpen}
                          onOpenChange={setSourcesOpen}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors group">
                            <span className="text-sm font-medium">
                              Sources
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${sourcesOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-2 pb-3 pt-1 space-y-2">
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Rebirth
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              My company
                            </label>
                          </CollapsibleContent>
                        </Collapsible>

                        <div className="h-px bg-slate-200/60 my-1 mx-auto w-3/4" />

                        {/* Duration */}
                        <Collapsible
                          open={durationOpen}
                          onOpenChange={setDurationOpen}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors group">
                            <span className="text-sm font-medium">
                              Duration
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${durationOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-2 pb-3 pt-1 space-y-2">
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              15-30 mins
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              30-45 mins
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              45+ mins
                            </label>
                          </CollapsibleContent>
                        </Collapsible>

                        <div className="h-px bg-slate-200/60 my-1 mx-auto w-3/4" />

                        {/* Test Focus Type */}
                        <Collapsible
                          open={focusTypeOpen}
                          onOpenChange={setFocusTypeOpen}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors group">
                            <span className="text-sm font-medium">
                              Test Focus Type
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${focusTypeOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-2 pb-3 pt-1 space-y-2">
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Programming skills
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Problem Solving
                            </label>
                          </CollapsibleContent>
                        </Collapsible>

                        <div className="h-px bg-slate-200/60 my-1 mx-auto w-3/4" />

                        {/* Test Format */}
                        <Collapsible
                          open={formatOpen}
                          onOpenChange={setFormatOpen}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors group">
                            <span className="text-sm font-medium">
                              Test Format
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${formatOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-2 pb-3 pt-1 space-y-2">
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Multiple-choice
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              MCQ
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Mixed
                            </label>
                          </CollapsibleContent>
                        </Collapsible>

                        <div className="h-px bg-slate-200 my-1" />

                        {/* Job Roles */}
                        <Collapsible
                          open={jobRolesOpen}
                          onOpenChange={setJobRolesOpen}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2.5 px-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors group">
                            <span className="text-sm font-medium">
                              Job Roles
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${jobRolesOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-2 pb-3 pt-1 space-y-2">
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Backend Development
                            </label>
                            <label className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors py-1">
                              <input
                                type="checkbox"
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              Frontend Development
                            </label>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </Card>
                  </div>

                  {/* Test Cards Grid */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Header */}
                    <div>
                      <h2 className="text-slate-900 text-xl mb-1">
                        Tests
                      </h2>
                      <p className="text-slate-600 text-sm">
                        4 tests found
                      </p>
                    </div>

                    {/* Test Cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Backend Development",
                          summary:
                            "Backend Development Summary",
                          instructions: "Complete all questions within the time limit. Ensure you have a stable internet connection.",
                          type: "Software skills",
                          tags: [
                            {
                              label: "Programming skills",
                              variant: "default",
                            },
                            {
                              label: "Advanced",
                              variant: "secondary",
                            },
                          ],
                          duration: 20,
                          questions: 2,
                          format: "MCQ",
                          language: "English",
                          level: "Advanced",
                          coveredSkills: ["Node.js", "Express.js", "Database Design", "REST APIs"],
                          relevantFor: ["Backend Developer", "Full Stack Developer"],
                        },
                        {
                          title: "Frontend Developer",
                          summary: "Frontend Developer Summary",
                          instructions: "Answer all questions carefully. You can review your answers before final submission.",
                          type: "Software skills",
                          tags: [
                            {
                              label: "Programming skills",
                              variant: "default",
                            },
                            {
                              label: "Beginner",
                              variant: "secondary",
                            },
                          ],
                          duration: 20,
                          questions: 1,
                          format: "Multiple-choice",
                          language: "English",
                          level: "Beginner",
                          coveredSkills: ["HTML", "CSS", "JavaScript Basics"],
                          relevantFor: ["Frontend Developer", "Junior Developer"],
                        },
                        {
                          title: "Full Stack Development",
                          summary:
                            "Complete full stack development assessment covering both frontend and backend technologies",
                          instructions: "This is a comprehensive test covering both frontend and backend concepts. Manage your time wisely.",
                          type: "Software skills",
                          tags: [
                            {
                              label: "Programming skills",
                              variant: "default",
                            },
                            {
                              label: "Intermediate",
                              variant: "secondary",
                            },
                          ],
                          duration: 45,
                          questions: 8,
                          format: "Mixed",
                          language: "English",
                          level: "Intermediate",
                          coveredSkills: ["React", "Node.js", "Database", "API Integration", "Authentication"],
                          relevantFor: ["Full Stack Developer", "Software Engineer"],
                        },
                        {
                          title: "React Fundamentals",
                          summary:
                            "Test your knowledge of React core concepts, hooks, and component lifecycle",
                          instructions: "Focus on React core concepts including hooks, state management, and component patterns.",
                          type: "Software skills",
                          tags: [
                            {
                              label: "Programming skills",
                              variant: "default",
                            },
                            {
                              label: "Beginner",
                              variant: "secondary",
                            },
                          ],
                          duration: 15,
                          questions: 5,
                          format: "Multiple-choice",
                          language: "English",
                          level: "Beginner",
                          coveredSkills: ["React Hooks", "Component Lifecycle", "State Management", "Props"],
                          relevantFor: ["Frontend Developer", "React Developer"],
                        },
                      ].map((test, index) => (
                        <Card
                          key={index}
                          className="group relative p-6 bg-white border-slate-200/60 hover:shadow-lg hover:border-blue-200 transition-all duration-300 h-full overflow-hidden"
                        >
                          {/* Corner gradient effects on hover */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/0 to-teal-500/0 group-hover:from-blue-500/10 group-hover:to-teal-500/10 rounded-bl-full transition-all duration-500 -mr-12 -mt-12" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/0 to-blue-500/0 group-hover:from-teal-500/10 group-hover:to-blue-500/10 rounded-tr-full transition-all duration-500 -ml-12 -mb-12" />

                          <div className="relative flex flex-col h-full">
                            {/* Header */}
                            <div className="mb-4">
                              <h3 className="text-slate-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                                {test.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {test.tags.map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant={tag.variant as any}
                                    className={
                                      tag.variant === "default"
                                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                        : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                                    }
                                  >
                                    {tag.label}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-slate-600 text-sm">
                                {test.summary}
                              </p>
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {test.duration} mins
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-4 h-4" />
                                <span>
                                  {test.questions} questions
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4" />
                                <span>{test.format}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-200">
                              <Button
                                variant="outline"
                                className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 gap-2"
                                onClick={() =>
                                  onNavigate(
                                    "attend-assessment-preview",
                                  )
                                }
                              >
                                <Eye className="w-4 h-4" />
                                Preview
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 gap-2"
                                onClick={() => {
                                  setSelectedTest(test);
                                  setShowTestDetails(true);
                                }}
                              >
                                <BookOpen className="w-4 h-4" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : null}
        </motion.div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-2xl"
          >
            <div className="text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="relative w-28 h-28 mx-auto mb-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full animate-pulse" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-14 h-14 text-teal-500" />
                </div>
              </motion.div>

              {/* Success Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  Assessment Submitted!
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Thank you for completing the assessment. Your
                  responses have been successfully recorded and
                  submitted for review.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <p className="text-2xl font-semibold text-blue-600">
                    5
                  </p>
                  <p className="text-xs text-blue-900 mt-1">
                    Questions
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
                  <p className="text-2xl font-semibold text-teal-600">
                    12:34
                  </p>
                  <p className="text-xs text-teal-900 mt-1">
                    Time Taken
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                  <p className="text-2xl font-semibold text-purple-600">
                    100%
                  </p>
                  <p className="text-xs text-purple-900 mt-1">
                    Complete
                  </p>
                </div>
              </motion.div>

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6"
              >
                <p className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">
                    What's next?
                  </span>
                  <br />
                  You will receive an email notification once
                  your assessment has been reviewed by our team.
                </p>
              </motion.div>

              {/* Back to Assessment Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onCloseSuccessPopup}
                className="text-center text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              >
                Back to Assessment
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Test Details Modal */}
      <TestDetailsModal
        isOpen={showTestDetails}
        onClose={() => {
          setShowTestDetails(false);
          setSelectedTest(null);
        }}
        testData={selectedTest || {}}
      />
    </div>
  );
}