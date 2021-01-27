const resume = require("./resume.json");
const fs = require("fs");

// Configuration options
const USE_TABS = true;

const TEMPLATE_PATH = './pdf_generator/resume-template.txt';
const OUTPUT_PATH = './pdf_generator/resume.tex';

const REPLACEMENT_STRINGS = [
  "%%PERSONAL_INFO_SECTION",
  "%%EMPLOYMENT_SECTION",
  "%%EDUCATION_SECTION",
  "%%AWARDS_SECTION",
];

// TODO: Move hardcoded values to resume.json
const personalInfoSection = `
\\name{${resume.personalInfo.name}}
\\address{${resume.personalInfo.email} \\linebreak ${resume.personalInfo.phone}}
\\contacts{\\faGithub \\hspace{0.05cm} KrammerJake \\linebreak \\faLinkedin \\hspace{0.05cm} jkrammer}
`;

const getEmploymentSection = () => {
  const jobValues = Object.values(resume.jobs);
  return `\\begin{cvsection}{Employment}
    ${jobValues.map((job) => {
      return `
    \\begin{cvsubsection}{${job.role}}{${job.companyName}}{${job.employmentDateRange.startDateStr} - ${job.employmentDateRange.endDateStr}}
      \\begin{itemize}
        ${job.description.map((bulletPoint) => `\\item ${bulletPoint}\n        `).join('').trimEnd()}
        \\item \\textbf{Technologies: \\emph{${job.technologies.join(', ')}}}
      \\end{itemize}
    \\end{cvsubsection}
`;
    }).join('').trim()}
  \\end{cvsection}
`;
};

const getEducationSection = () => {
  const degreeValues = Object.values(resume.degrees);
  return `\\begin{cvsection}{Education}
    ${degreeValues.map((degree) => {
      return `
    \\begin{cvsubsection}{${degree.title}}{${degree.schoolName}}{${degree.enrollmentDateRange.startDateStr} - ${degree.enrollmentDateRange.endDateStr}}
      \\begin{itemize}
        ${degree.description.map((bulletPoint) => `\\item ${bulletPoint}\n        `).join('').trimEnd()}
      \\end{itemize}
    \\end{cvsubsection}
      `;
    }).join('').trim()}
  \\end{cvsection}
`;
};

// TODO: Move hardcoded values to resume.json
const getAwardsSection = () => {
  return `\\begin{cvsection}{Awards}
    \\begin{cvsubsection}{1st Place}{Code for Good Hackathon}{Oct 2015}
      \\begin{itemize}
        \\item Won 1st place for developing a website that gamified the Goodwill donation process and displayed real-time updates using Kimonolabs web crawlers
      \\end{itemize}
    \\end{cvsubsection}
  \\end{cvsection}
  `;
};

const contentReplacementMap = {
  "%%PERSONAL_INFO_SECTION": personalInfoSection.trimStart(),
  "%%EMPLOYMENT_SECTION": getEmploymentSection(),
  "%%EDUCATION_SECTION": getEducationSection(),
  "%%AWARDS_SECTION": getAwardsSection(),
};

let texFileTemplateContents = fs.readFileSync(
  TEMPLATE_PATH,
  "utf-8"
);
for (let i = 0; i < REPLACEMENT_STRINGS.length; i++) {
  const replacementStr = REPLACEMENT_STRINGS[i];
  const replacementValue = contentReplacementMap[replacementStr].trimEnd();
  texFileTemplateContents = texFileTemplateContents.replace(
    replacementStr,
    replacementValue
  );
}

const finalTexFileContents = USE_TABS ? texFileTemplateContents.replace(/ {2}/g, '\t') : texFileTemplateContents;
fs.writeFileSync(OUTPUT_PATH, finalTexFileContents, {
  encoding: "utf-8",
});
