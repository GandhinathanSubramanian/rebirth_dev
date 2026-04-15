const fs = require('fs');
let code = fs.readFileSync('src/components/ResumeAnalyzer.tsx', 'utf8');

// The Left Section has `key="resume-details"`
const resumeDetailsStart = code.indexOf(`              <motion.div\n                key="resume-details"`);
// End is before `            )}` or `          </AnimatePresence>`
const resumeDetailsEnd = code.indexOf(`              </motion.div>\n            )}\n          </AnimatePresence>`);

const leftContent = code.substring(resumeDetailsStart, resumeDetailsEnd + `              </motion.div>\n`.length);

// The Right Section has `key="result"`
const resultStart = code.indexOf(`            <motion.div\n              key="result"`);
const resultEnd = code.indexOf(`            </motion.div>\n          )}\n        </AnimatePresence>`);

let rightContent = code.substring(resultStart, resultEnd + `            </motion.div>\n`.length);

// Now we need to modify the Analysis UI (which is rightContent) to be minimal, clean, no shadows, soft colors.
let cleanAnalysis = rightContent;
// Soften overall shadows
cleanAnalysis = cleanAnalysis.replace(/shadow-sm/g, '');
cleanAnalysis = cleanAnalysis.replace(/shadow-md/g, '');

// Clean Score box
cleanAnalysis = cleanAnalysis.replace('className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5 "', 'className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex items-center gap-5"');

// Clean Role Match box
cleanAnalysis = cleanAnalysis.replace('className="bg-white rounded-2xl border border-slate-200 p-6  flex flex-col justify-center"', 'className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center"');

// Clean Strengths
cleanAnalysis = cleanAnalysis.replace('bg-emerald-50/60 rounded-2xl border border-emerald-100', 'bg-slate-50 rounded-2xl border border-slate-100');
cleanAnalysis = cleanAnalysis.replace('text-emerald-900', 'text-slate-800');
cleanAnalysis = cleanAnalysis.replace(/text-emerald-800/g, 'text-slate-600');
cleanAnalysis = cleanAnalysis.replace(/bg-emerald-500/g, 'bg-emerald-400');

// Clean Missing Skills
cleanAnalysis = cleanAnalysis.replace('bg-rose-50/60 rounded-2xl border border-rose-100', 'bg-slate-50 rounded-2xl border border-slate-100');
cleanAnalysis = cleanAnalysis.replace('text-rose-900', 'text-slate-800');
cleanAnalysis = cleanAnalysis.replace('text-rose-600/80', 'text-slate-500');
cleanAnalysis = cleanAnalysis.replace(/border-rose-200 text-rose-700/g, 'border-slate-200 text-slate-600');

// Clean Improvements
cleanAnalysis = cleanAnalysis.replace('bg-amber-50/60 rounded-2xl border border-amber-200', 'bg-slate-50 rounded-2xl border border-slate-100');
cleanAnalysis = cleanAnalysis.replace('text-amber-900', 'text-slate-800');
cleanAnalysis = cleanAnalysis.replace(/text-amber-800\/80/g, 'text-slate-600');
cleanAnalysis = cleanAnalysis.replace(/border-amber-100/g, 'border-slate-100');
cleanAnalysis = cleanAnalysis.replace(/bg-amber-100 text-amber-700/g, 'bg-slate-100 text-slate-600');

// Clean Quick Actions
cleanAnalysis = cleanAnalysis.replace('bg-white rounded-2xl border border-slate-200', 'bg-slate-50 rounded-2xl border border-slate-100');
cleanAnalysis = cleanAnalysis.replace(/bg-blue-50 hover:bg-blue-100/g, 'bg-white hover:bg-slate-50 border border-slate-200');
cleanAnalysis = cleanAnalysis.replace(/bg-teal-50 hover:bg-teal-100 text-teal-800/g, 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700');

// Clean Smart Tip
cleanAnalysis = cleanAnalysis.replace('bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white  relative overflow-hidden flex flex-col justify-center', 'bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-800 relative overflow-hidden flex flex-col justify-center');
cleanAnalysis = cleanAnalysis.replace('text-white mb-2 relative z-10 flex items-center gap-1.5', 'text-slate-800 mb-2 relative z-10 flex items-center gap-1.5');
cleanAnalysis = cleanAnalysis.replace('text-indigo-50/90', 'text-slate-600');


// Swap them in the file content
const beforeLeft = code.substring(0, resumeDetailsStart);
const afterLeft = code.substring(resumeDetailsEnd + `              </motion.div>\n`.length, resultStart);
const afterRight = code.substring(resultEnd + `            </motion.div>\n`.length);

// We want resumeDetails to go to the Right, and cleanAnalysis to go to the Left.
// Make sure to add keys correctly if needed, but they are already in the strings.
const swappedCode = beforeLeft + cleanAnalysis + afterLeft + leftContent + afterRight;

fs.writeFileSync('src/components/ResumeAnalyzer.tsx', swappedCode);
console.log('Swap script executed!');
