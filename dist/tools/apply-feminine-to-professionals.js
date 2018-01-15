"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const professions = require('../data/professions.json');
class RegexRule {
    constructor(regex, replacement, exceptionList = []) {
        this.regex = regex;
        this.replacement = replacement;
        this.exceptionList = exceptionList;
    }
    apply(word) {
        if (this.exceptionList && this.exceptionList.indexOf(word) !== -1)
            return word;
        if (word.match(this.regex)) {
            return word.replace(this.regex, (m, c1) => c1 + this.replacement);
        }
        return word;
    }
}
const rules = [];
rules.push(new RegexRule(/^([^ ]*)(eiro)/, 'eira', ['Bombeiro']));
rules.push(new RegexRule(/^([^ ]*)(grafo)/, 'grafa'));
rules.push(new RegexRule(/^([^ ]*)(dor)/, 'dora'));
rules.push(new RegexRule(/^([^ ]*)(tora)/, 'dora'));
rules.push(new RegexRule(/^([^ ]*)(dico)/, 'dica'));
rules.push(new RegexRule(/^([^ ]*)(gado)/, 'gada'));
rules.push(new RegexRule(/^([^ ]*)(tor)/, 'tora'));
rules.push(new RegexRule(/^([^ ]*)(rio)/, 'ria')); // Atuário
rules.push(new RegexRule(/^([^ ]*)(ogo)/, 'oga')); // Psicólogo
rules.push(new RegexRule(/^([^ ]*)(ssor)/, 'ssora')); // Professor
rules.push(new RegexRule(/^([^ ]*)(eto)/, 'eta')); // Arquiteto
function getFeminine(word) {
    for (const rule of rules) {
        const feminineWord = rule.apply(word);
        if (feminineWord !== word)
            return feminineWord;
    }
    return word;
}
const newProfessions = {
    data: [],
};
for (const profession of professions.data) {
    const masculineVersion = profession[0];
    newProfessions.data.push([masculineVersion, getFeminine(masculineVersion)]);
}
newProfessions.data = newProfessions.data.sort((a, b) => a[0].localeCompare(b[0]));
const newProfessionsString = JSON.stringify(newProfessions, null, 4);
fs.writeFileSync('./data/professions-processed.json', newProfessionsString);
//# sourceMappingURL=apply-feminine-to-professionals.js.map