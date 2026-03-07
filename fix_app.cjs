const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Fix junction 1 (claims to claim-detail)
content = content.replace(/ \}\)\n        <\/div>\n    \)\n\}\n\n\{\n    view === "claim-detail"/, ` )}\n\n            {view === "claim-detail"`);

// Fix junction 2 (claim-detail to aging)
content = content.replace(/                <\/div>\n            <\/div>\n        <\/div>\n    \)\n\}\n\n\{\n    view === "aging"/, `                </div>\n            </div>\n            )}\n\n            {view === "aging"`);

// Fix junction 3 (end of aging)
content = content.replace(/                <\/div>\n            <\/div>\n        <\/div>\n    \)\n\}\n\n\/\/ ==========================================\n\/\/ UI2: RECALL & REACTIVATION MODULE/, `                </div>\n            </div>\n            )}\n        </div>\n    );\n}\n\n// ==========================================\n// UI2: RECALL & REACTIVATION MODULE`);

fs.writeFileSync('src/App.jsx', content);
console.log("App.jsx fixed.");
