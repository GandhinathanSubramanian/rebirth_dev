import { useState } from "react";
import { motion } from "motion/react";
import { Upload, Building2, Globe, Phone, ArrowLeft, Check, User, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface ProfileSetupProps {
  onBack?: () => void;
}

export default function ProfileSetup({ onBack }: ProfileSetupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    organizationName: "",
    organizationWebsite: "",
    organizationLogo: null as File | null,
    organizationDescription: "",
    publicLibraryAccess: false,
    termsAccepted: false,
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, organizationLogo: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.termsAccepted) {
      alert("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(37_99_235_/_0.05)_1px,transparent_0)] [background-size:40px_40px] pointer-events-none"></div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/80 backdrop-blur-sm border-b border-slate-200/60"
      >
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 shadow-lg shadow-blue-500/30">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                <svg
                  className="relative w-6 h-6 text-white drop-shadow-sm"
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
              <div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600 bg-clip-text text-transparent tracking-tight">
                  Rebirth
                </h1>
                <p className="text-xs text-slate-500 leading-none mt-0.5">
                  Smart Assessment Platform
                </p>
              </div>
            </div>

            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-semibold text-slate-900 mb-3">
            Complete Your Profile
          </h2>
          <p className="text-slate-600">
            Help us personalize your experience by completing your profile information
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-200/60 overflow-hidden"
        >
          {/* Form Content */}
          <div className="p-10">
            <div className="space-y-10">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Personal Information</h3>
                    <p className="text-xs text-slate-500">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="jobTitle"
                      placeholder="HR Manager"
                      value={formData.jobTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                    <div className="flex gap-2">
                      <div className="relative w-32">
                        <div className="flex items-center justify-between h-12 px-3 border border-slate-200 rounded-md bg-white cursor-pointer hover:border-blue-500 transition-colors">
                          <span className="text-sm text-slate-700">🇮🇳 +91</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                      <Input
                        id="phone"
                        placeholder="9876543210"
                        className="flex-1 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200" />

              {/* Organization Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Organization Details</h3>
                    <p className="text-xs text-slate-500">Information about your company</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">
                      Organization Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="orgName"
                      placeholder="Acme Corporation"
                      value={formData.organizationName}
                      onChange={(e) =>
                        setFormData({ ...formData, organizationName: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgWebsite">Organization Website</Label>
                    <Input
                      id="orgWebsite"
                      placeholder="https://yourcompany.com"
                      value={formData.organizationWebsite}
                      onChange={(e) =>
                        setFormData({ ...formData, organizationWebsite: e.target.value })
                      }
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label>Organization Logo</Label>
                    <div className="relative">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group"
                      >
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-slate-400 mt-1.5">
                          PNG, JPG or GIF (max. 10MB)
                        </p>
                        {formData.organizationLogo && (
                          <div className="mt-3 px-4 py-1.5 bg-green-50 border border-green-200 rounded-full">
                            <p className="text-xs text-green-700 font-medium flex items-center gap-1.5">
                              <Check className="w-3 h-3" />
                              {formData.organizationLogo.name}
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="orgDesc">Organization Description</Label>
                    <Textarea
                      id="orgDesc"
                      placeholder="Brief description of your organization and its goals..."
                      value={formData.organizationDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organizationDescription: e.target.value,
                        })
                      }
                      className="h-44 resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200" />

              {/* Regional Settings */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-teal-50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Regional Settings</h3>
                    <p className="text-xs text-slate-500">Configure your location preferences</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <div className="flex items-center justify-between h-12 px-3 border border-slate-200 rounded-md bg-white cursor-pointer hover:border-blue-500 transition-colors">
                        <span className="text-sm text-slate-700">English (US)</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <div className="flex items-center justify-between h-12 px-3 border border-slate-200 rounded-md bg-white cursor-pointer hover:border-blue-500 transition-colors">
                        <span className="text-sm text-slate-700">India (IST) - UTC+05:30</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <div className="flex items-center justify-between h-12 px-3 border border-slate-200 rounded-md bg-white cursor-pointer hover:border-blue-500 transition-colors">
                        <span className="text-sm text-slate-700">🇮🇳 India</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200" />

              {/* Preferences & Agreement */}
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-teal-50/50 border border-blue-200/60 rounded-xl space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="library"
                      checked={formData.publicLibraryAccess}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          publicLibraryAccess: checked === true,
                        })
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="library"
                        className="font-medium text-slate-900 cursor-pointer"
                      >
                        Enable Public Test Library Access
                      </Label>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                        Allow members of your organization to access and use shared assessment templates from the public library
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200" />

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          termsAccepted: checked === true,
                        })
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor="terms"
                      className="font-medium text-slate-900 cursor-pointer flex-1"
                    >
                      I agree to the{" "}
                      <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>{" "}
                      and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
                      <span className="text-red-500"> *</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-10 py-6 bg-gradient-to-r from-slate-50 to-blue-50/30 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <span className="text-red-500">*</span>
              <span>Required fields must be filled</span>
            </p>
            <Button
              onClick={handleSubmit}
              disabled={!formData.termsAccepted}
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-10 py-6 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:shadow-none"
            >
              Complete Setup & Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}