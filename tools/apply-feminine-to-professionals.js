import fs from 'fs';
import professions from '../data/professions.json';


class RegexRule {
    constructor(regex, replacement, exceptionList) {
        this.regex = regex;
        this.replacement = replacement;
        this.exceptionList = exceptionList;
    }
    apply(word) {
        if (this.exceptionList && this.exceptionList.includes(word)) return word;
        if (word.match(this.regex)) {
            const newWord = word.replace(this.regex, (m, c1) => c1 + this.replacement);
            return newWord;
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


function getFeminine(word) {
    for (let i = 0; i < rules.length; i++) {
        const feminineWord = rules[i].apply(word);
        if (feminineWord !== word) return feminineWord;
    }
    return word;
}


const newProfessions = {
    data: []
};

for (let i = 0; i < professions.data.length; i++) {
    const masculineVersion = professions.data[i][0];
    newProfessions.data.push([masculineVersion, getFeminine(masculineVersion)]);
}

newProfessions.data = newProfessions.data.sort((a, b) => a[0].localeCompare(b[0].name));

const newProfessionsString = JSON.stringify(newProfessions, null, 4);

fs.writeFileSync('./data/professions-processed.json', newProfessionsString);
