const fs = require('fs');
const appPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/App.jsx';
const ui2Path = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/part4_ui2.jsx';
const finalPath = '/Users/mariusserban/.gemini/antigravity/scratch/intelident-demo/src/FinalApp.jsx';

let appCode = fs.readFileSync(appPath, 'utf8');
let ui2Code = fs.readFileSync(ui2Path, 'utf8');

// Strip imports from UI2
let ui2Content = ui2Code.substring(ui2Code.indexOf('// =========================================='));

// Extract parts of App.jsx
const appStartMarker = 'export default function App() {';
const appHead = appCode.substring(0, appCode.indexOf(appStartMarker));
const appTail = appCode.substring(appCode.indexOf(appStartMarker));

// Assemble the final file
const finalCode = appHead + '\n' + ui2Content + '\n\n' + appTail;

fs.writeFileSync(finalPath, finalCode);
console.log("FinalApp.jsx created successfully!");
