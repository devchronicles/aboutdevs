import fs from 'fs';
import professions from '../data/professions';


class RegexRule {
    constructor(regex, replacement, exceptionList) {
        this.regex = regex;
        this.replacement = replacement;
        this.exceptionList = exceptionList;
    }
    apply(word) {
        if (this.exceptionList && this.exceptionList.includes(word)) return word;
        if (word.match(this.regex)) {
            const newWord = word.replace(this.regex, (c1, c2) => );
            console.log(newWord);
            return newWord;
        }
        return word;
    }
}

const rules = [];
rules.push(new RegexRule(/^[^ ]*(eiro)/, 'eira', ['Bombeiro']));
rules.push(new RegexRule(/^[^ ]*(grafo)/, 'grafa'));
rules.push(new RegexRule(/^[^ ]*(dor)/, 'dora'));
rules.push(new RegexRule(/^[^ ]*(tora)/, 'dora'));
rules.push(new RegexRule(/^[^ ]*(dico)/, 'dica'));
rules.push(new RegexRule(/^[^ ]*(gado)/, 'gada'));

export function getFeminine(word) {
    let finalWord = word;
    for (let i = 0; i < rules.length; i++) {
        finalWord = rules[i].apply(word);
    }
    return finalWord;
}


const newProfessions = {
    data: []
};

for (let i = 0; i < professions.data.length; i++) {
    const masculineVersion = professions.data[i][0];
    newProfessions.data.push([masculineVersion, getFeminine(masculineVersion)]);
}

const newProfessionsString = JSON.stringify(newProfessions, null, 4);

fs.writeFileSync('./data/professions2.json', newProfessionsString);
