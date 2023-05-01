let textArea = document.getElementById("text");
let results = document.getElementById("results");

// Your Code Here.
textArea.addEventListener('keyup', textAnalyzer)

function textAnalyzer() {

    let result = {
        text: "",
        vowels: {
            a: 0,
            e: 0,
            i: 0,
            o: 0,
            u: 0
        },
        punctuation: {
            period: 0,
            comma: 0,
            exclamation: 0,
            questionMark: 0
        },
        numCharacters: 0,
        numWords: 0,
        longestWord: "",
        shortestWord: "",
        lastThreeWords: [],
        waldoIndexes: [],
    }

    result.text += textArea.value

    let noPunctuation = result.text.replace(/[^\w\s\']|_/g, '')

    let noPunctuationArray = noPunctuation.split(' ')

    //  vowels and punctuations
    for (let index = 0; index < result.text.length; index++) {

        // waldo Indexes
        if (result.text.slice(index, index + 5) === 'Waldo') {
            result.waldoIndexes.push(index)
        }

        // vowels count
        for (let key of Object.keys(result.vowels)) {

            if (result.text[index] === key) {
                result.vowels[key] += 1
            }
        }

        // punctuations count
        if (result.text[index] === '.') {
            result.punctuation.period += 1
        } else if (result.text[index] === ',') {
            result.punctuation.comma += 1
        } else if (result.text[index] === '!') {
            result.punctuation.exclamation += 1
        } else if (result.text[index] === '?') {
            result.punctuation.questionMark += 1
        }
    }

    // Number of characters 
    result.numCharacters = result.text.length

    // The last three words
    result.lastThreeWords = noPunctuationArray.slice(-3)

    // Number of Words
    for (let word of noPunctuationArray) {
        if (word) {
            result.numWords += 1
        }
    }

    // The longest word
    result.longestWord += noPunctuationArray.sort((word, anotherWord) => anotherWord.length - word.length)[0]

    // The shortest word
    result.shortestWord += noPunctuationArray.sort((word, otherWord) => word.length - otherWord.length).join(' ').trim().split(' ')[0]

    console.log(JSON.stringify(result))
}

// Hello!  Welcome to kenzie.  My name is Robert, and i'm here with my friend Waldo.  Have you met Waldo?