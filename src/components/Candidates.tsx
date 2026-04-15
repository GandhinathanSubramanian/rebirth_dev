import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
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
import CandidateDetail from "./CandidateDetail";

interface Candidate {
  id: number;
  name: string;
  email: string;
  assessments: string[];
  jobTitle: string;
  status: "Applied" | "In Progress" | "Completed" | "Rejected";
  appliedDate: string;
}

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAssessment, setFilterAssessment] = useState("all");
  const [filterJobTitle, setFilterJobTitle] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock data
  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      assessments: ["Frontend Developer Test", "React Assessment"],
      jobTitle: "Frontend Developer",
      status: "Completed",
      appliedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      assessments: ["Backend Developer Test"],
      jobTitle: "Backend Developer",
      status: "In Progress",
      appliedDate: "2024-01-18",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      assessments: ["UI/UX Designer Test", "Design Thinking Assessment", "Figma Skills Test"],
      jobTitle: "UI/UX Designer",
      status: "Completed",
      appliedDate: "2024-01-20",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      assessments: ["Data Science Assessment"],
      jobTitle: "Data Scientist",
      status: "Applied",
      appliedDate: "2024-01-22",
    },
    {
      id: 5,
      name: "Jessica Brown",
      email: "jessica.brown@email.com",
      assessments: ["Product Manager Test"],
      jobTitle: "Product Manager",
      status: "Rejected",
      appliedDate: "2024-01-10",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Applied":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "In Progress":
        return <Clock className="w-3.5 h-3.5" />;
      case "Applied":
        return <FileText className="w-3.5 h-3.5" />;
      case "Rejected":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssessment =
      filterAssessment === "all" ||
      candidate.assessments.some((a) => a.includes(filterAssessment));
    const matchesJobTitle =
      filterJobTitle === "all" || candidate.jobTitle === filterJobTitle;
    const matchesStatus =
      filterStatus === "all" || candidate.status === filterStatus;

    return matchesSearch && matchesAssessment && matchesJobTitle && matchesStatus;
  });

  return (
    <>
      {selectedCandidate ? (
        <CandidateDetail
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      ) : (
    <div className="space-y-6">
      {/* Welcome Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="relative overflow-hidden bg-white border-slate-200/60">
          {/* Modern wave background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-cyan-500/5" />
          <svg
            className="absolute bottom-0 left-0 w-full h-32 opacity-20"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradientCandidates" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradientCandidates)"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          
          <div className="relative p-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                Candidates
              </h2>
              <p className="text-slate-600">
                Track and manage all candidates who have applied for positions and completed assessments
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl px-6 py-4 border border-blue-100">
              <div className="text-xs text-blue-600 mb-1">Total Candidates</div>
              <div className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{candidates.length}</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-white border-slate-200/60 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4">
              {/* Search Box - Full Width on Small, Half on Large */}
              <div className="col-span-12 lg:col-span-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search candidates by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 pl-12 pr-4 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-3">
                {/* Assessment Filter */}
                <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Assessment</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>

                {/* Job Title Filter */}
                <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Job Title</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>

                {/* Status Filter */}
                <div className="h-12 px-4 border border-slate-200 rounded-lg bg-slate-50/50 flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">Status</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Candidates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="bg-white border-slate-200/60">
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-900">
                  All Candidates
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Track candidate applications and assessments
                </p>
              </div>
              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Assessments
                  </th>
                  <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="text-left pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right pb-3 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <Briefcase className="w-12 h-12 mb-3 text-slate-300" />
                        <p className="font-medium text-slate-700">No candidates found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Candidate Name */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center text-blue-700 font-medium text-sm border border-blue-200/50 flex-shrink-0">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 truncate mb-0.5">
                              {candidate.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {candidate.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Assessment Count */}
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-gradient-to-br from-blue-100 to-teal-100 border border-blue-200/60 text-blue-700 font-semibold text-xs">
                          {candidate.assessments.length}
                        </span>
                      </td>

                      {/* Assessment Names */}
                      <td className="py-5 px-6">
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.assessments.slice(0, 2).map((assessment, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-200/60"
                              style={{ fontSize: '11px' }}
                            >
                              {assessment}
                            </span>
                          ))}
                          {candidate.assessments.length > 2 && (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 border border-blue-200/60 font-medium"
                              style={{ fontSize: '11px' }}
                            >
                              +{candidate.assessments.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Job Title */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="font-medium truncate">{candidate.jobTitle}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(
                            candidate.status
                          )}`}
                        >
                          {getStatusIcon(candidate.status)}
                          {candidate.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedCandidate(candidate)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Results Count */}
          {filteredCandidates.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-4 bg-white">
              <p className="text-sm text-slate-600">
                Showing <span className="font-medium text-slate-900">{filteredCandidates.length}</span> of{" "}
                <span className="font-medium text-slate-900">{candidates.length}</span> candidates
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
      )}
    </>
  );
}