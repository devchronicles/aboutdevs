import * as fs from 'fs';
const professions = require('../data/professions.json');

class RegexRule {
    private regex: RegExp;
    private replacement: string;
    private exceptionList: string[];
    constructor(regex: RegExp, replacement: string, exceptionList: string[] = []) {
        this.regex = regex;
        this.replacement = replacement;
        this.exceptionList = exceptionList;
    }
    public apply(word: string) {
        if (this.exceptionList && this.exceptionList.indexOf(word) !== -1) return word;
        if (word.match(this.regex)) {
            const newWord = word.replace(this.regex, (m, c1) => c1 + this.replacement);
            return newWord;
        }
        return word;
    }
}

const rules: RegexRule[] = [];
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

function getFeminine(word: string) {
    for (const rule of rules) {
        const feminineWord = rule.apply(word);
        if (feminineWord !== word) return feminineWord;
    }
    return word;
}

interface NewProfessions {
    data: string[][];
}

const newProfessions: NewProfessions = {
    data: [],
};

for (const profession of professions.data) {
    const masculineVersion = profession[0];
    newProfessions.data.push([masculineVersion, getFeminine(masculineVersion)]);
}

newProfessions.data = newProfessions.data.sort((a, b) => a[0].localeCompare(b[0]));

const newProfessionsString = JSON.stringify(newProfessions, null, 4);

fs.writeFileSync('./data/professions-processed.json', newProfessionsString);
