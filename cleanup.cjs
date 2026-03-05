const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

const ui1Start = '// ═══════════════════════════════════════════\n// REUSABLE COMPONENTS';
const appStart = 'export default function App() {';

if (code.includes(ui1Start) && code.includes(appStart)) {
    const preUI1 = code.substring(0, code.indexOf(ui1Start));
    const postUI1 = code.substring(code.indexOf(appStart));
    code = preUI1 + postUI1;
}

// Clean up currentUI state
code = code.replace(/    const \[currentUI, setUI\] = useState\("UI1"\);\n/g, '');

// Clean up renderPage
const renderPageStart = '    const renderPage = () => {';
const renderPageEnd = '    return (\n        <div style={{ display: "flex", minHeight: "100vh"';

if (code.includes(renderPageStart) && code.includes(renderPageEnd)) {
    const preRender = code.substring(0, code.indexOf(renderPageStart));
    const postRender = code.substring(code.indexOf(renderPageEnd));

    const newRender = `    const renderPage = () => {
        switch (currentPage) {
            case "dashboard": return <DashboardPageUI2 onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} WEEKLY_PRODUCTION={WEEKLY_PRODUCTION} SCHEDULE_DATA={SCHEDULE_DATA} PATIENT_DATA={PATIENTS} />;
            case "patients": return <PatientListPageUI2 onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} PATIENT_DATA={PATIENTS} />;
            case "patient-detail": return selectedPatient ? <PatientDetailPageUI2 patient={selectedPatient} onBack={() => { setSelectedPatient(null); setCurrentPage("dashboard"); }} TIMELINE_EVENTS={TIMELINE_EVENTS} MEDICAL_HISTORY={MEDICAL_HISTORY} /> : <DashboardPageUI2 onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} WEEKLY_PRODUCTION={WEEKLY_PRODUCTION} SCHEDULE_DATA={SCHEDULE_DATA} PATIENT_DATA={PATIENTS} />;
            case "schedule": return <SchedulerPageUI2 SCHEDULE_DATA={SCHEDULE_DATA} />;
            case "notes": return <AiNotesPageUI2 />;
            case "voice": return <VoiceAgentPageUI2 />;
            case "analytics": return <AnalyticsPageUI2 />;
            case "recall": return <RecallPageUI2 />;
            case "forms": return <FormBuilderPageUI2 />;
            case "integrations": return <IntegrationsPageUI2 />;
            case "billing": return <BillingPageUI2 />;
            case "settings": return <SettingsPageUI2 />;
            default: return <PlaceholderPageUI2 title={currentPage.toUpperCase()} />;
        }
    };

`;
    code = preRender + newRender + postRender;
}

// Clean up return block
const mainReturnStart = '    return (\n        <div style={{ display: "flex", minHeight: "100vh"';
const mainReturnEnd = '    );\n}';
if (code.includes(mainReturnStart)) {
    const preEnd = code.substring(0, code.indexOf(mainReturnStart));
    const newEnd = `    return (
        <div style={{ display: "flex", minHeight: "100vh", background: GEO_BG, fontFamily: "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <SidebarUI2 currentPage={currentPage === "patient-detail" ? "dashboard" : currentPage} onNavigate={handleNavigate} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <main style={{ flex: 1, marginLeft: isExpanded ? 280 : 120, padding: "32px 40px", transition: "all 0.3s" }}>
                {renderPage()}
            </main>
        </div>
    );
}`;
    code = preEnd + newEnd;
}

fs.writeFileSync(appPath, code);
console.log("UI1 fully removed from App.jsx");
