const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// Replace flex rows with mobile stacking layouts

// 1. Stat cards row
code = code.replace(
    '            {/* Stats Row */}\n            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>',
    '            {/* Stats Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32 }}>'
);

// 2. Charts row
code = code.replace(
    '            {/* Charts Row */}\n            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>',
    '            {/* Charts Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24, marginBottom: 32 }}>'
);

// 3. Bottom Schedule/To-do Row
code = code.replace(
    '            {/* Bottom Row */}\n            <div style={{ display: "flex", gap: 24 }}>',
    '            {/* Bottom Row */}\n            <div className="stack-on-mobile" style={{ display: "flex", gap: 24 }}>'
);

// 4. Patients List toolbar
code = code.replace(
    '            {/* Toolbar */}\n            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>',
    '            {/* Toolbar */}\n            <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>'
);
code = code.replace(
    '                <div style={{ display: "flex", gap: 16 }}>\n                    <div style={{ position: "relative" }}>',
    '                <div className="stack-on-mobile mobile-margin-bottom" style={{ display: "flex", gap: 16 }}>\n                    <div style={{ position: "relative" }}>'
);

// 5. Patient Table wrapper
code = code.replace(
    '            {/* Patient Table */}\n            <div style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, overflow: "hidden" }}>',
    '            {/* Patient Table */}\n            <div className="table-scroll-mobile" style={{ background: GEO_WHITE, borderRadius: GEO_RADIUS, boxShadow: GEO_SHADOW, overflow: "hidden" }}>'
);

// 6. Patient Detail grid wrapper
code = code.replace(
    '            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>',
    '            <div className="grid-stack-on-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>'
);
code = code.replace(
    '                            <div style={{ display: "flex", gap: 12 }}>',
    '                            <div className="stack-on-mobile" style={{ display: "flex", gap: 12 }}>'
);

fs.writeFileSync(appPath, code);
console.log("Mobile classes injected via node replace");
