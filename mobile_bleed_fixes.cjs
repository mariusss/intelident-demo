const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
let code = fs.readFileSync(appPath, 'utf8');

// 1. Fix the main content padding so it doesn't push the screen out
// We already added .main-content-mobile which has padding: 20px 16px !important
// but let's make sure the inline padding isn't overpowering it dynamically
code = code.replace(
    '<main className="main-content-mobile" style={{ flex: 1, marginLeft: isExpanded ? 280 : 120, padding: "32px 40px", transition: "all 0.3s" }}>',
    '<main className="main-content-mobile" style={{ flex: 1, marginLeft: isExpanded ? 280 : 120, padding: "32px 40px", transition: "all 0.3s", boxSizing: "border-box", maxWidth: "100vw" }}>'
);

// 2. Fix the "Dashboard Page" outermost div which might be causing scroll
code = code.replace(
    '        <div style={{ paddingBottom: 60 }}>',
    '        <div style={{ paddingBottom: 60, maxWidth: "100%", boxSizing: "border-box" }}>'
);

// 3. Fix Patient Details Top Bar which has fixed paddings that bleed
code = code.replace(
    '        <div style={{ padding: "20px 40px" }}>',
    '        <div className="main-content-mobile" style={{ padding: "20px 40px" }}>'
);

// 4. Fix Patient Settings Top Content which has flex overflow
code = code.replace(
    '            <div style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>',
    '            <div className="stack-on-mobile mobile-padding" style={{ background: "#FFFFFF", borderRadius: "28px", padding: 32, boxShadow: "0px 8px 30px rgba(0,0,0,0.04)", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>'
);

// 5. Patient Profile left/right sections stacking
code = code.replace(
    '                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>',
    '                <div className="stack-on-mobile" style={{ display: "flex", alignItems: "center", gap: 24 }}>'
);

// 6. Fix "Settings Page" left sidebar which has fixed width 260
code = code.replace(
    '                <div style={{ width: 260, flexShrink: 0, width: "100%" }}>',
    '                <div style={{ width: "100%", flexShrink: 0 }}>'
);

// 7. Remove fixed minimum widths from Kanban/Schedule that break the screen on mobile
// We added horizontal scrolling, but sometimes flexbox child limits cause full vertical page horizontal scrolls instead of container scrolls
code = code.replace(
    'className="table-scroll-mobile" style={{ display: "flex", flex: 1, gap: 16, overflowY: "auto", paddingRight: 8 }}>',
    'className="table-scroll-mobile" style={{ display: "flex", flex: 1, gap: 16, overflowY: "auto", paddingRight: 8, maxWidth: "100vw", boxSizing: "border-box" }}>'
);


fs.writeFileSync(appPath, code);
console.log("Mobile layout bleed fixes applied.");
