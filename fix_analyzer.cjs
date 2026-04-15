const fs = require('fs');

let code = fs.readFileSync('src/components/ResumeAnalyzer.tsx', 'utf8');

const startLeft = ') : !isEnhancing ? (';
const endLeftIndex = code.indexOf('          </AnimatePresence>', code.indexOf(startLeft));

const leftSideReplacement = `
            ) : (
              <motion.div
                key="resume-details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                     <h2 className="text-xl font-bold text-slate-900">Resume Details</h2>
                     <p className="text-sm text-slate-500">Information extracted from your upload</p>
                  </div>
                </div>
                {/* Resume Preview Card */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-y-auto">
                  <div className="p-8">
                    {/* Header Section with Image */}
                    <div className="flex items-start gap-6 pb-8 mb-8 border-b border-slate-100">
                      <div className="flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjQ4NjE2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Profile"
                          className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100"
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">John Doe</h1>
                        <p className="text-lg text-slate-600 mb-4">Senior Software Engineer</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <span>john.doe@email.com</span><span>•</span>
                          <span>+1 (555) 123-4567</span><span>•</span>
                          <span>San Francisco, CA</span>
                        </div>
                      </div>
                    </div>
                    {/* Professional Summary */}
                    <div className="pb-8 mb-8 border-b border-slate-100">
                      <h2 className="text-lg font-medium text-slate-900 mb-4">Professional Summary</h2>
                      <p className="text-slate-700 leading-relaxed">
                        Experienced software engineer with 8+ years of expertise in full-stack development, 
                        cloud architecture, and team leadership. Proven track record of delivering scalable 
                        solutions and driving technical innovation in fast-paced environments.
                      </p>
                    </div>
                    {/* Experience */}
                    <div className="pb-8 mb-8 border-b border-slate-100">
                      <h2 className="text-lg font-medium text-slate-900 mb-5">Experience</h2>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900">Senior Software Engineer</h3>
                              <p className="text-sm text-slate-600">Tech Corp Inc.</p>
                            </div>
                            <span className="text-sm text-slate-500">2020 - Present</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                            <li>Led development of microservices architecture serving 1M+ users</li>
                            <li>Reduced system latency by 40% through optimization initiatives</li>
                            <li>Mentored team of 5 junior developers</li>
                          </ul>
                        </div>
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900">Software Engineer</h3>
                              <p className="text-sm text-slate-600">StartUp XYZ</p>
                            </div>
                            <span className="text-sm text-slate-500">2018 - 2020</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                            <li>Built RESTful APIs using Node.js and Express</li>
                            <li>Implemented CI/CD pipelines with Jenkins</li>
                            <li>Collaborated with cross-functional teams</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Education */}
                    <div className="pb-8 mb-8 border-b border-slate-100">
                      <h2 className="text-lg font-medium text-slate-900 mb-4">Education</h2>
                      <div>
                        <h3 className="font-semibold text-slate-900">Bachelor of Science in Computer Science</h3>
                        <p className="text-sm text-slate-600">University of Technology</p>
                        <p className="text-sm text-slate-500">2014 - 2018</p>
                      </div>
                    </div>
                    {/* Skills */}
                    <div>
                      <h2 className="text-lg font-medium text-slate-900 mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"].map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
`;

const rightSideReplacement = `
          {isComplete && !isUpdating && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Analysis Results
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">AI-powered insights for your resume</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleDownload}
                    className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 flex items-center gap-2 border border-slate-200 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    onClick={() => onNavigate("dashboard")}
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 shadow-sm transition-all"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 hide-scrollbar">
                
                {/* Score & Role Match Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Resume Score */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5 shadow-sm">
                    <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                        <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="213.6" strokeDashoffset="53.4" className="text-blue-600 transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-xl font-extrabold text-slate-900">75%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Good Fit!</h3>
                      <p className="text-xs text-slate-600 leading-snug">Overall score indicates strong potential. Optimize further to pass ATS systems.</p>
                    </div>
                  </div>

                  {/* Role Match */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-teal-600" />
                      Role Match
                    </h3>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700 truncate mr-2">Senior SWE</span>
                      <span className="font-bold text-teal-600">82% Match</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-full w-[82%] rounded-full transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>
                </div>

                {/* Strengths & Missing Skills */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                      Key Strengths
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-emerald-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        Clear career progression
                      </li>
                      <li className="flex items-start gap-2 text-sm text-emerald-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        Quantifiable impact metrics
                      </li>
                      <li className="flex items-start gap-2 text-sm text-emerald-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        Modern tech stack featured
                      </li>
                    </ul>
                  </div>

                  {/* Missing Skills */}
                  <div className="bg-rose-50/60 rounded-2xl border border-rose-100 p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-rose-900 mb-4 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-600" strokeWidth={3} />
                      Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["System Design", "WebPack", "CI/CD", "AWS", "GraphQL"].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-white border border-rose-200 text-rose-700 text-xs font-semibold rounded-md shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-rose-600/80 mt-3 font-medium">Add these if you possess the experience.</p>
                  </div>
                </div>

                {/* Resume Improvements */}
                <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <span className="text-amber-700 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-900 mb-1">Enhance Summary Section</h4>
                        <p className="text-sm text-amber-800/80">Your professional summary lacks specific achievements. Highlight your unique value proposition to make a stronger first impression.</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <span className="text-amber-700 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-900 mb-1">Formatting Inconsistencies</h4>
                        <p className="text-sm text-amber-800/80">We detected mixed bullet styles in the Experience section which might confuse ATS parsers.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions & Smart Tips */}
                <div className="grid grid-cols-5 gap-6">
                  <div className="col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider text-slate-500">Quick Actions</h3>
                    <div className="space-y-2.5">
                      <button className="w-full flex items-center justify-between px-4 py-3.5 bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 rounded-xl text-sm font-semibold">
                        <span className="flex items-center gap-2"><Sparkles className="w-4 h-4"/> Auto-rewrite Summary</span>
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-3.5 bg-teal-50 hover:bg-teal-100 transition-colors text-teal-800 rounded-xl text-sm font-semibold">
                        <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4"/> Optimize Missing Skills</span>
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <Info className="w-32 h-32" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 relative z-10 flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      Smart Tip
                    </h3>
                    <p className="text-xs text-indigo-50/90 leading-relaxed relative z-10">
                      Tailoring your resume for each job application increases interview chances by 40%. Use our Generator to create targeted variations instantly!
                    </p>
                  </div>
                </div>
                
                {/* Bottom spacing */}
                <div className="h-4"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
`;

const codeStart = code.substring(0, code.indexOf(startLeft));
const codeMiddle = code.substring(endLeftIndex, code.indexOf('{isComplete && !isUpdating && ('));
const rightRenderEndIndex = code.indexOf('</AnimatePresence>', code.indexOf('{isComplete && !isUpdating && ('));
const codeEnd = code.substring(rightRenderEndIndex);

const finalCode = codeStart + leftSideReplacement + codeMiddle + rightSideReplacement + codeEnd;

fs.writeFileSync('src/components/ResumeAnalyzer.tsx', finalCode);
console.log('Script ran successfully');
