const fs = require('fs');

const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
const ui2Path = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/part4_ui2.jsx';

let appCode = fs.readFileSync(appPath, 'utf8');
let ui2Code = fs.readFileSync(ui2Path, 'utf8');

// Strip imports from UI2
ui2Code = ui2Code.substring(ui2Code.indexOf('// =========================================='));

// We need to replace the old UI2 block in App.jsx completely
// First, find the start and end of the UI2 section in App.jsx
const ui2Start = '// ==========================================\n// GEOVEA DESIGN CONSTANTS (UI2)';
const ui2End = '// ═══════════════════════════════════════════\n// MAIN COMPONENT & STATE MANAGER';

if (appCode.includes(ui2Start)) {
    const preUI2 = appCode.substring(0, appCode.indexOf(ui2Start));
    const postUI2 = appCode.substring(appCode.indexOf(ui2End));
    appCode = preUI2 + ui2Code + '\n\n' + postUI2;
}

const searchBlockStart = '    const renderPage = () => {';
const searchBlockEnd = '    return (\n        <div style={{ display: "flex", minHeight: "100vh"';

if (appCode.includes(searchBlockStart) && appCode.includes(searchBlockEnd)) {
    const preRender = appCode.substring(0, appCode.indexOf(searchBlockStart));
    const postRender = appCode.substring(appCode.indexOf(searchBlockEnd));

    const newRender = `    const renderPage = () => {
        if (currentUI === "UI2") {
            switch (currentPage) {
                case "dashboard": return <DashboardPageUI2 currentUI={currentUI} setUI={setUI} onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} WEEKLY_PRODUCTION={WEEKLY_PRODUCTION} SCHEDULE_DATA={SCHEDULE_DATA} PATIENT_DATA={PATIENTS} />;
                case "patients": return <PatientListPageUI2 currentUI={currentUI} setUI={setUI} onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} PATIENT_DATA={PATIENTS} />;
                case "patient-detail": return selectedPatient ? <PatientDetailPageUI2 currentUI={currentUI} setUI={setUI} patient={selectedPatient} onBack={() => { setSelectedPatient(null); setCurrentPage("dashboard"); }} TIMELINE_EVENTS={TIMELINE_EVENTS} MEDICAL_HISTORY={MEDICAL_HISTORY} /> : <DashboardPageUI2 currentUI={currentUI} setUI={setUI} onNavigatePage={handleNavigate} onSelectPatient={handleSelectPatient} WEEKLY_PRODUCTION={WEEKLY_PRODUCTION} SCHEDULE_DATA={SCHEDULE_DATA} PATIENT_DATA={PATIENTS} />;
                case "schedule": return <SchedulerPageUI2 currentUI={currentUI} setUI={setUI} SCHEDULE_DATA={SCHEDULE_DATA} />;
                case "notes": return <AiNotesPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "voice": return <VoiceAgentPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "analytics": return <AnalyticsPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "recall": return <RecallPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "forms": return <FormBuilderPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "integrations": return <IntegrationsPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "billing": return <BillingPageUI2 currentUI={currentUI} setUI={setUI} />;
                case "settings": return <SettingsPageUI2 currentUI={currentUI} setUI={setUI} />;
                default: return <PlaceholderPageUI2 currentUI={currentUI} setUI={setUI} title={currentPage.toUpperCase()} />;
            }
        }
        
        switch (currentPage) {
            case "dashboard": return <DashboardPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
            case "patients": return <PatientListPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
            case "patient-detail": return selectedPatient ? <PatientDetailPage currentUI={currentUI} setUI={setUI} patient={selectedPatient} onBack={() => { setSelectedPatient(null); setCurrentPage("dashboard"); }} /> : <DashboardPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
            case "schedule": return <SchedulerPage currentUI={currentUI} setUI={setUI} />;
            case "notes": return <AiNotesPage currentUI={currentUI} setUI={setUI} />;
            case "voice": return <VoiceAgentPage currentUI={currentUI} setUI={setUI} />;
            case "forms": return <FormBuilderPage currentUI={currentUI} setUI={setUI} />;
            case "analytics": return <AnalyticsPage currentUI={currentUI} setUI={setUI} />;
            case "integrations": return <IntegrationsPage currentUI={currentUI} setUI={setUI} />;
            case "settings": return <SettingsPage currentUI={currentUI} setUI={setUI} />;
            default: return <DashboardPage currentUI={currentUI} setUI={setUI} onNavigate={handleSelectPatient} />;
        }
    };

`;
    appCode = preRender + newRender + postRender;
}

// Ensure return block is correct with the expanded sidebar margins.
// The sidebar itself expands to 240px, so main shouldn't be hardcoded to 120. We can just use a flexible margin overlay if we left it fixed, but actually a margin-left of 100 is fine if the sidebar is fixed and floats over. Geovea floats the sidebar over the content or pushes it. Since it's fixed, we can just give main a constant left padding of 120, and when expanded it'll fly out over the content (which is standard for "expand on hover/click" sidebars).
const returnSearchStart = '    return (\n        <div style={{ display: "flex", minHeight: "100vh"';
const returnSearchEnd = '    );\n}';

if (appCode.includes(returnSearchStart)) {
    const preEnd = appCode.substring(0, appCode.indexOf(returnSearchStart));
    const newEnd = `    return (
        <div style={{ display: "flex", minHeight: "100vh", background: currentUI === "UI2" ? GEO_BG : PAGE_BG, fontFamily: currentUI === "UI2" ? "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" : "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
            {currentUI === "UI1" ? (
                <Sidebar currentPage={currentPage === "patient-detail" ? "dashboard" : currentPage} onNavigate={handleNavigate} />
            ) : (
                <SidebarUI2 currentPage={currentPage === "patient-detail" ? "dashboard" : currentPage} onNavigate={handleNavigate} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            )}
            <main style={{ flex: 1, marginLeft: currentUI === "UI1" ? 260 : (isExpanded ? 280 : 120), padding: "32px 40px", transition: "all 0.3s" }}>
                {renderPage()}
            </main>
        </div>
    );
}`;
    appCode = preEnd + newEnd;
}

// Inject the state variable into App
const appStateMarker = '    const [currentUI, setUI] = useState("UI1");';
if (appCode.includes(appStateMarker)) {
    // Remove any existing declarations first
    appCode = appCode.replace(/ *const \[isExpanded, setIsExpanded\] = useState\((true|false)\);\n/g, '');
    appCode = appCode.replace(appStateMarker, appStateMarker + '\n    const [isExpanded, setIsExpanded] = useState(true);');
}

fs.writeFileSync(appPath, appCode);
console.log("Merge completed successfully.");
