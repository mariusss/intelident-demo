const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// 1. Dashboard Stats Row - force flex wrapping so cards stack cleanly instead of squeezing into one row
code = code.replace(
    '<div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32 }}>\n                <StatCardUI2 icon={UsersRound} title="Total Patients" value="1,842" change="+15%" isPositive={true} />',
    '<div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>\n                <StatCardUI2 icon={UsersRound} title="Total Patients" value="1,842" change="+15%" isPositive={true} />'
);

// Catching the dynamically added version just in case
code = code.replace(
    '<div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32 }}>\n                <StatCardUI2 icon={UsersRound} title="Total Patients" value="1,248" change="+12 this month" isPositive={true} />',
    '<div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>\n                <StatCardUI2 icon={UsersRound} title="Total Patients" value="1,248" change="+12 this month" isPositive={true} />'
);

// 2. AI Practice Insights Row - force flex wrapping on the 4 info cards
code = code.replace(
    '            <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>\n                {insights.map((insight, i) => (',
    '            <div className="stack-on-mobile" style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>\n                {insights.map((insight, i) => ('
);

// Fix the insight boxes themselves so they expand to fill space when wrapping
code = code.replace(
    '                    <div key={i} style={{ flex: 1, background: GEO_WHITE, borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>',
    '                    <div key={i} style={{ flex: "1 1 200px", minWidth: 160, background: GEO_WHITE, borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>'
);


// 3. Overview Charts Row - Make sure it wraps and stacks
// The production chart (Overview) and Next Appt list
code = code.replace(
    '            {/* Charts Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32 }}>',
    '            {/* Charts Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>'
);

// Fix the Production Chart flex sizing
code = code.replace(
    '                {/* Production Chart */}\n                <div style={{ flex: 2, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>',
    '                {/* Production Chart */}\n                <div style={{ flex: "1 1 100%", minWidth: 300, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>'
);

// Fix the Upcoming Appts flex sizing
code = code.replace(
    '                {/* Upcoming Appts */}\n                <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>',
    '                {/* Upcoming Appts */}\n                <div style={{ flex: "1 1 100%", minWidth: 300, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>'
);

// 4. Bottom Row (Schedule / Notes)
code = code.replace(
    '            {/* Bottom Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24 }}>',
    '            {/* Bottom Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>'
);

// Fix Schedule preview box
code = code.replace(
    '                {/* Schedule preview */}\n                <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>',
    '                {/* Schedule preview */}\n                <div style={{ flex: "1 1 100%", minWidth: 300, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW }}>'
);

// Fix AI Notes box
code = code.replace(
    '                {/* AI Notes Preview */}\n                <div style={{ flex: 1, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>',
    '                {/* AI Notes Preview */}\n                <div style={{ flex: "1 1 100%", minWidth: 300, background: GEO_WHITE, borderRadius: GEO_RADIUS, padding: 32, boxShadow: GEO_SHADOW, display: "flex", flexDirection: "column" }}>'
);


fs.writeFileSync(appPath, code);
console.log("Flex wrap stacking applied.");
