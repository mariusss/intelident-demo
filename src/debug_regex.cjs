const fs = require('fs');
const path = require('path');
const part1Code = fs.readFileSync(path.join(__dirname, 'modified_components_part1.jsx'), 'utf8');

const compName = 'SmartSchedulerPageUI2';
const targetMatch = part1Code.match(new RegExp(`export function ${compName}[\\s\\S]*?(?=export function|$)`, 'm'));
console.log("Length of match:", targetMatch ? targetMatch[0].length : 'No match');
console.log("Last 50 chars of match:", targetMatch ? targetMatch[0].slice(-50) : '');
