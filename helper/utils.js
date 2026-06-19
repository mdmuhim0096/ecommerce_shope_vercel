const fs = require("fs");
const path = require("path");
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

function simpleClean(text) {
    return (text || "")
        .toLowerCase()
        .replace(/[\n\r]/g, " ")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

function buildVocabulary(texts, vocabSize = 5000) {

    const freq = {};
    texts.forEach(t => {
        const words = simpleClean(t).split(" ");
        words.forEach(w => {
            if (!w) return;
            freq[w] = (freq[w] || 0) + 1;
        });
    });

    const items = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const vocab = {};
    let index = 2;
    for (let i = 0; i < Math.min(items.length, vocabSize - 2); i++) {
        vocab[items[i][0]] = index++;
    }
    return vocab;

};

function textToSequence(text, vocab) {
    const words = simpleClean(text).split(" ");
    return words.map(w => (vocab[w] ? vocab[w] : 1));
};

function padSequences(sequences, maxLen = 100) {
    return sequences.map(seq => {
        if (seq.length > maxLen) {
            return seq.slice(0, maxLen);
        }
        const out = new Array(maxLen).fill(0);
        for (let i = 0; i < seq.length; i++) out[i] = seq[i];
        return out;
    });
};

function normalizeNumberArray(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const denom = max - min || 1;
    return arr.map(v => (v - min) / denom);
};

module.exports = {
    buildVocabulary,
    textToSequence,
    padSequences,
    simpleClean,
    normalizeNumberArray,
    clientUrl
};