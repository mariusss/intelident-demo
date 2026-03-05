const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const mapping = {
    'DashboardPageUI2': 'Here is your schedule for today.',
    'PatientListPageUI2': 'Manage your active and overdue patients.',
    'AiNotesPageUI2': 'Generate and review clinical notes.',
    'PlaceholderPageUI2': 'This module is under construction.',
    'SchedulerPageUI2': 'Manage your appointments and calendar.',
    'VoiceAgentPageUI2': 'Review and configure AI patient communications.',
    'AnalyticsPageUI2': 'Track your practice performance metrics.',
    'FormBuilderPageUI2': 'Build and review patient intake forms.',
    'SettingsPageUI2': 'Manage practice preferences and configurations.',
    'IntegrationsPageUI2': 'Connect with third-party dental software.',
    'BillingPageUI2': 'Track claims, aging, and patient balances.',
    'RecallPageUI2': 'Manage patient recare and reactivations.',
};

for (const [func, subtitle] of Object.entries(mapping)) {
    const searchRegex = new RegExp(`(export function ${func}[\\s\\S]*?<TopGreetingUI2 currentUI=\\{currentUI\\} setUI=\\{setUI\\} isMobileMenuOpen=\\{isMobileMenuOpen\\} setIsMobileMenuOpen=\\{setIsMobileMenuOpen\\}) \\/>`);
    code = code.replace(searchRegex, `$1 subtitle="${subtitle}" />`);
}

code = code.replace(
    `export function TopGreetingUI2({ isMobileMenuOpen, setIsMobileMenuOpen }) {
    return (
        <div className="stack-on-mobile mobile-margin-bottom"`,
    `export function TopGreetingUI2({ isMobileMenuOpen, setIsMobileMenuOpen, subtitle }) {
    return (
        <div className="hide-on-mobile mobile-margin-bottom"`
);

code = code.replace(
    `<p style={{ color: GEO_TEXT_MUTED, margin: "8px 0 0 0", fontSize: 16 }}>Here is your schedule for today.</p>`,
    `<p style={{ color: GEO_TEXT_MUTED, margin: "8px 0 0 0", fontSize: 16 }}>{subtitle || "Here is your schedule for today."}</p>`
);

fs.writeFileSync('src/App.jsx', code);
console.log("Replaced references!");
