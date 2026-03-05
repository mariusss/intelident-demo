const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// 1. Settings Page left-nav & right-content
code = code.replace(
    '            <div style={{ display: "flex", gap: 32 }}>\n                {/* Settings Navigation Sidebar */}\n                <div style={{ width: 260, flexShrink: 0 }}>',
    '            <div className="stack-on-mobile" style={{ display: "flex", gap: 32 }}>\n                {/* Settings Navigation Sidebar */}\n                <div style={{ width: 260, flexShrink: 0, width: "100%" }}>'
);

// 2. Billing Claims Table
code = code.replace(
    '            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, overflow: "hidden" }}>\n                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>',
    '            <div className="table-scroll-mobile" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, overflow: "hidden" }}>\n                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>'
);

// 3. Billing Aging Summary Cards Row
code = code.replace(
    '                <div style={{ display: "flex", gap: 24 }}>',
    '                <div className="stack-on-mobile" style={{ display: "flex", gap: 24 }}>'
);
// Make sure we catch the second instance of this if it exists for aging cards
code = code.replace(
    '                <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>',
    '                <div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32 }}>'
);

// 4. Recall Page Kanban Board (Make it scroll horizontally on mobile rather than crush)
code = code.replace(
    '            {/* Columns Container */}\n            <div style={{ display: "flex", gap: 24, height: "calc(100vh - 180px)" }}>',
    '            {/* Columns Container */}\n            <div className="table-scroll-mobile" style={{ display: "flex", gap: 24, height: "calc(100vh - 180px)", paddingBottom: 16 }}>'
);
// Ensure Recall columns have a min-width on mobile to preserve layout
code = code.replace(
    '        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.5)", borderRadius: GEO_RADIUS, padding: 24 }}>',
    '        <div style={{ flex: 1, minWidth: 320, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.5)", borderRadius: GEO_RADIUS, padding: 24 }}>'
);

// 5. Smart Scheduler Columns
code = code.replace(
    '            {/* Schedule Grid Container */}\n            <div style={{ display: "flex", flex: 1, gap: 16, overflowY: "auto", paddingRight: 8 }}>',
    '            {/* Schedule Grid Container */}\n            <div className="table-scroll-mobile" style={{ display: "flex", flex: 1, gap: 16, overflowY: "auto", paddingRight: 8 }}>'
);
// Ensure Scheduler provider columns have a min-width on mobile
code = code.replace(
    '                        <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>',
    '                        <div key={idx} style={{ flex: 1, minWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>'
);

fs.writeFileSync(appPath, code);
console.log("Mobile classes injected for deeper modules via node replace");
