const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// 1. Pass the prop to TopGreetingUI2 everywhere it is used
code = code.replace(
    /<TopGreetingUI2([^>]*?)\/>/g,
    (match, p1) => {
        if (p1.includes('isMobileMenuOpen')) return match; // Already added
        return `<TopGreetingUI2 ${p1} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />`;
    }
);

// 2. Add the props to the Page Component signatures
const pages = [
    'DashboardPageUI2',
    'PatientListPageUI2',
    'PatientDetailPageUI2',
    'SchedulerPageUI2',
    'AiNotesPageUI2',
    'VoiceAgentPageUI2',
    'AnalyticsPageUI2',
    'RecallPageUI2',
    'FormBuilderPageUI2',
    'IntegrationsPageUI2',
    'BillingPageUI2',
    'SettingsPageUI2',
    'PlaceholderPageUI2'
];

pages.forEach(page => {
    const regex = new RegExp(`export function ${page}\\(\\{([^}]+)\\}\\)`, 'g');
    code = code.replace(regex, (match, p1) => {
        if (p1.includes('isMobileMenuOpen')) return match;
        return `export function ${page}({${p1}, isMobileMenuOpen, setIsMobileMenuOpen})`;
    });
});

// 3. Add the props to the renderPage invocations in App
pages.forEach(page => {
    const regex = new RegExp(`<${page} (.*?)\\/>`, 'g');
    code = code.replace(regex, (match, p1) => {
        if (p1.includes('isMobileMenuOpen')) return match;
        return `<${page} ${p1} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />`;
    });
});
// Handle self-closing without space or multiple lines if needed
pages.forEach(page => {
    const regex = new RegExp(`<${page}\\s*\\/>`, 'g');
    code = code.replace(regex, (match) => {
        return `<${page} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />`;
    });
});


fs.writeFileSync(appPath, code);
console.log("State wiring injected.");
