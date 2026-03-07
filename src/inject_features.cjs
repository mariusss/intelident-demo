const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'App.jsx');
let appCode = fs.readFileSync(appJsxPath, 'utf8');

const newModulesCode = fs.readFileSync(path.join(__dirname, 'new_modules_ui2.jsx'), 'utf8');
const part1Code = fs.readFileSync(path.join(__dirname, 'modified_components_part1.jsx'), 'utf8').replace(/import .*?;\n/g, '');
const part2Code = fs.readFileSync(path.join(__dirname, 'modified_components_part2.jsx'), 'utf8').replace(/import .*?;\n/g, '');

function replaceComponent(compName, newCodeSection) {
    const startRegex = new RegExp(`export function ${compName}\\([^\\)]*\\) \\{`);
    const match = appCode.match(startRegex);
    if (!match) return;

    const startIdx = match.index;
    let endIdx = appCode.indexOf('export function', startIdx + 20);
    if (endIdx === -1) endIdx = appCode.indexOf('// ═══════════════════════════════════════════', startIdx);
    if (endIdx === -1) endIdx = appCode.length;

    // Use a regex without m flag, so $ means end of string, not end of line. Or simply split by 'export function'
    const targetMatch = newCodeSection.match(new RegExp(`export function ${compName}[\\s\\S]*?(?=export function|$)`));
    if (!targetMatch) return;

    appCode = appCode.substring(0, startIdx) + targetMatch[0] + '\n\n' + appCode.substring(endIdx);
    console.log(`Replaced ${compName} successfully.`);
}

replaceComponent('SmartSchedulerPageUI2', part1Code);
replaceComponent('AnalyticsPageUI2', part1Code);
replaceComponent('BillingPageUI2', part2Code);
replaceComponent('RecallPageUI2', part2Code);

const mainIndex = appCode.indexOf('// ═══════════════════════════════════════════\n// MAIN COMPONENT & STATE MANAGER');
if (mainIndex !== -1) {
    const injectedText = `\n// --- NEW INJECTED MODULES ---\n${newModulesCode.replace(/import .*?;\n/g, '')}\n// ----------------------------\n\n`;
    appCode = appCode.substring(0, mainIndex) + injectedText + appCode.substring(mainIndex);
    console.log('Injected ClinicalChartPageUI2 and CommunicationsHubPageUI2');
}

// Update Sidebar Menu
const sidebarMenuBlockPattern = /const menuItems = \[\s*\{\s*id:\s*"dashboard"[^\]]+\];/m;
const newSidebarMenu = `const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "patients", icon: Users, label: "Patients" },
        { id: "chart", icon: Stethoscope, label: "Clinical Chart" },
        { id: "schedule", icon: Calendar, label: "Schedule" },
        { id: "reactivation", icon: CalendarCheck, label: "Reactivation" },
        { id: "communications", icon: MessageSquare, label: "Communications" },
        { id: "notes", icon: FileText, label: "AI Notes" },
        { id: "billing", icon: Wallet, label: "Billing" },
        { id: "voice", icon: PhoneCall, label: "Voice Agent" },
        { id: "analytics", icon: BarChart3, label: "Analytics" },
    ];`;
appCode = appCode.replace(sidebarMenuBlockPattern, newSidebarMenu);
console.log('Updated Sidebar menuItems');

// Update Switch Router for the pages
const switchTarget = `case "notes":
                return <AiNotesPageUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;`;
const newSwitchTarget = `case "chart":
                return <ClinicalChartPageUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "communications":
                return <CommunicationsHubPageUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;
            case "notes":
                return <AiNotesPageUI2 currentUI={currentUI} setUI={setUI} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />;`;

appCode = appCode.replace(switchTarget, newSwitchTarget);
console.log('Updated Router switch cases');

fs.writeFileSync(appJsxPath, appCode);
console.log('App.jsx successfully modified.');
