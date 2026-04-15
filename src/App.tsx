import FeatureSelection from "./components/FeatureSelection";
import ResumeBuilderImport from "./components/ResumeBuilderImport";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import { useState } from "react";
import { Header } from "./components/Header";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { CreateAccount } from "./components/CreateAccount";
import { SignIn } from "./components/SignIn";
import { SignInPassword } from "./components/SignInPassword";
import { ConfirmationCode } from "./components/ConfirmationCode";
import { Dashboard } from "./components/Dashboard";
import AttendAssessment from "./components/AttendAssessment";
import UserProfile from "./components/UserProfile";
import ProfileSetup from "./components/ProfileSetup";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("welcome");
  const [userProfileSource, setUserProfileSource] = useState<string>("dashboard");
  const [userEmail, setUserEmail] = useState<string>("");
  const [dashboardTab, setDashboardTab] = useState<string>("home");
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const handleNavigation = (page: string, email?: string, tab?: string, showSuccess?: boolean) => {
    // Track source when navigating to user-profile
    if (page === "user-profile") {
      setUserProfileSource(currentPage);
    }
    setCurrentPage(page);
    if (email) {
      setUserEmail(email);
    }
    if (tab) {
      setDashboardTab(tab);
    }
    if (showSuccess !== undefined) {
      setShowSuccessPopup(showSuccess);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setDashboardTab("view-assessment");
  };

  const handleNavigateToView = () => {
    setShowSuccessPopup(false);
    setCurrentPage("dashboard");
    setDashboardTab("view-assessment");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "feature-selection":
        return <FeatureSelection onNavigate={handleNavigation} />;
      case "resume-builder-import":
        return <ResumeBuilderImport onNavigate={handleNavigation} />;
      case "resume-analyzer":
        return <ResumeAnalyzer onNavigate={handleNavigation} />;
      case "dashboard":
        return (
          <Dashboard 
            onNavigate={handleNavigation} 
            initialTab={dashboardTab} 
            showSuccessPopup={showSuccessPopup}
            onCloseSuccessPopup={handleCloseSuccessPopup}
          />
        );
      case "user-profile":
        return (
          <UserProfile 
            onBack={() => handleNavigation(userProfileSource === "feature-selection" ? "feature-selection" : "dashboard")} 
          />
        );
      case "profile-setup":
        return (
          <ProfileSetup 
            onBack={() => handleNavigation("welcome")} 
          />
        );
      case "attend-assessment":
        return (
          <AttendAssessment 
            onBack={() => handleNavigation("dashboard", undefined, "assessments", true)} 
            onNavigateToView={handleNavigateToView}
          />
        );
      case "attend-assessment-preview":
        return (
          <AttendAssessment 
            previewMode={true}
            onBack={() => handleNavigation("dashboard", undefined, "library")} 
            onNavigateToView={handleNavigateToView}
          />
        );
      case "create":
        return <CreateAccount onNavigate={handleNavigation} />;
      case "signin":
        return <SignIn onNavigate={handleNavigation} />;
      case "password":
        return <SignInPassword email={userEmail} onNavigate={handleNavigation} />;
      case "confirmation":
        return <ConfirmationCode email={userEmail} onNavigate={handleNavigation} />;
      case "welcome":
      default:
        return (
          <div className="h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/50 to-teal-50/40 relative overflow-hidden">
            <Header onNavigate={handleNavigation} />
            <WelcomeScreen onNavigate={handleNavigation} />
          </div>
        );
    }
  };

  return (
    <>
      {renderPage()}
      
      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}