import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Building2, 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  Upload, 
  Save, 
  Plus,
  Pencil,
  Trash2,
  ArrowLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
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
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface UserProfileProps {
  onBack: () => void;
}

export default function UserProfile({ onBack }: UserProfileProps) {
  const [activeSection, setActiveSection] = useState<"profile" | "company" | "team">("profile");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  // Profile State
  const [profileData, setProfileData] = useState({
    firstName: "Ramesh",
    lastName: "Subramanian",
    phone: "+1 (555) 123-4567",
    language: "english",
    email: "ramesh.subramanian@rebirth.com"
  });

  // Company State
  const [companyData, setCompanyData] = useState({
    companyName: "Rebirth Technologies",
    country: "united-states",
    logo: ""
  });

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@rebirth.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@rebirth.com", role: "Editor" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@rebirth.com", role: "Viewer" },
  ]);

  // New User State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: ""
  });

  const handleSaveProfile = () => {
    // Save profile logic
    console.log("Profile saved:", profileData);
  };

  const handleSaveCompany = () => {
    // Save company logic
    console.log("Company saved:", companyData);
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const newMember = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewUser({ name: "", email: "", role: "" });
      setIsAddUserDialogOpen(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const sections = [
    {
      id: "profile" as const,
      label: "My Profile",
      icon: User,
      description: "Personal information",
    },
    {
      id: "company" as const,
      label: "My Company",
      icon: Building2,
      description: "Company details",
    },
    {
      id: "team" as const,
      label: "Team Management",
      icon: Users,
      description: "Manage team members",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/20">
      {/* Header - Sticky */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-400/40 sticky top-0 z-20">
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 border border-slate-200/60 flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                User Profile
              </h1>
              <p className="text-xs text-slate-500">
                Manage your profile and company settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12">
        {/* Left Section - Navigation (2 columns) - Sticky */}
        <div className="col-span-2 bg-gradient-to-br from-white to-slate-50/50 border-r border-dashed border-slate-400/40 min-h-[calc(100vh-89px)] sticky top-[89px] self-start">
          <div className="p-6">
            <div className="flex flex-col space-y-3">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl transition-all relative overflow-hidden group ${
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white"
                        : "bg-white hover:bg-slate-50 border border-slate-200/60 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProfileSection"
                        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative flex items-start gap-3">
                      <div className={`mt-0.5 ${isActive ? "text-white" : "text-blue-600"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm mb-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                          {section.label}
                        </div>
                        <div className={`text-xs leading-relaxed ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                          {section.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Section - Content (10 columns) */}
        <div className="col-span-10 p-8">
          {/* My Profile Section */}
          {activeSection === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">My Profile</h3>
                    <p className="text-sm text-slate-600">Update your personal information and preferences</p>
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-slate-700 text-sm font-medium">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-slate-700 text-sm font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-slate-700 text-sm font-medium">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="h-12 pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="space-y-3">
                      <Label htmlFor="language" className="text-slate-700 text-sm font-medium">
                        Language
                      </Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
                        <Select
                          value={profileData.language}
                          onValueChange={(value) => setProfileData({ ...profileData, language: value })}
                        >
                          <SelectTrigger id="language" className="h-12 pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Email - Full Width */}
                    <div className="col-span-2 space-y-3">
                      <Label htmlFor="email" className="text-slate-700 text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="h-12 pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* My Company Section */}
          {activeSection === "company" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">My Company</h3>
                    <p className="text-sm text-slate-600">Manage your company information and branding</p>
                  </div>
                  <Button
                    onClick={handleSaveCompany}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column - Company Details */}
                    <div className="space-y-6">
                      {/* Company Name */}
                      <div className="space-y-3">
                        <Label htmlFor="companyName" className="text-slate-700 text-sm font-medium">
                          Company Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            id="companyName"
                            value={companyData.companyName}
                            onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                            className="h-12 pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div className="space-y-3">
                        <Label htmlFor="country" className="text-slate-700 text-sm font-medium">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
                          <Select
                            value={companyData.country}
                            onValueChange={(value) => setCompanyData({ ...companyData, country: value })}
                          >
                            <SelectTrigger id="country" className="h-12 pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="united-states">United States</SelectItem>
                              <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                              <SelectItem value="canada">Canada</SelectItem>
                              <SelectItem value="australia">Australia</SelectItem>
                              <SelectItem value="germany">Germany</SelectItem>
                              <SelectItem value="france">France</SelectItem>
                              <SelectItem value="india">India</SelectItem>
                              <SelectItem value="japan">Japan</SelectItem>
                              <SelectItem value="singapore">Singapore</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Logo Upload */}
                    <div className="space-y-3">
                      <Label className="text-slate-700 text-sm font-medium">
                        Company Logo
                      </Label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 bg-gradient-to-br from-slate-50 to-blue-50/30 hover:border-blue-400 transition-all group cursor-pointer">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-teal-50 flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-teal-100 transition-all">
                            <Upload className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-slate-900 mb-1">Upload Company Logo</h4>
                          <p className="text-sm text-slate-500 mb-4">
                            PNG, JPG up to 5MB
                          </p>
                          <Button
                            variant="outline"
                            className="border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400"
                          >
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Team Management Section */}
          {activeSection === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-slate-200/60 overflow-hidden">
                <div className="px-8 py-5 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5 border-b border-blue-200/40 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Team Management</h3>
                    <p className="text-sm text-slate-600">Invite and manage team members with different roles</p>
                  </div>
                  <Button
                    onClick={() => setIsAddUserDialogOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <div className="p-8">
                  <div className="border border-slate-200/60 rounded-xl overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50/30 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30">
                          <TableHead className="font-semibold text-slate-700 h-14 pl-6">Name</TableHead>
                          <TableHead className="font-semibold text-slate-700 h-14">Email</TableHead>
                          <TableHead className="font-semibold text-slate-700 h-14">Role</TableHead>
                          <TableHead className="font-semibold text-slate-700 text-right h-14 pr-6">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers.map((member, index) => (
                          <TableRow key={member.id} className="hover:bg-slate-50/50 h-20">
                            <TableCell className="font-medium text-slate-900 pl-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center text-blue-700 font-medium text-sm border border-blue-200/50">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {member.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-600">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {member.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                member.role === "Admin" 
                                  ? "bg-purple-100 text-purple-700" 
                                  : member.role === "Editor"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-slate-100 text-slate-700"
                              }`}>
                                {member.role}
                              </span>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 w-9 p-0 hover:bg-blue-50 text-slate-600 hover:text-blue-600"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteUser(member.id)}
                                  className="h-9 w-9 p-0 hover:bg-red-50 text-slate-600 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Empty State */}
                  {teamMembers.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="font-medium text-slate-900 mb-1">No team members yet</h3>
                      <p className="text-sm text-slate-500 mb-4">Get started by adding your first team member</p>
                      <Button
                        onClick={() => setIsAddUserDialogOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-900">
              Add Team Member
            </DialogTitle>
            <p className="text-sm text-slate-600 mt-1">
              Invite a new team member to your workspace
            </p>
          </DialogHeader>

          <div className="space-y-5 mt-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="newUserName" className="text-slate-700 text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="newUserName"
                placeholder="e.g., John Doe"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="newUserEmail" className="text-slate-700 text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="newUserEmail"
                  type="email"
                  placeholder="e.g., john.doe@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="h-12 pl-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="newUserRole" className="text-slate-700 text-sm font-medium">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger id="newUserRole" className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddUserDialogOpen(false)}
                className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}