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

    //Number of characters call function
    numOfChar(result)

    //longest, shortest, last 3,and number of word call Function
    longShortLastNumWord(result)

    //Call function for vowels punctuations and waldoIndexes
    vowelPunctWalIndex(result)

    console.log(JSON.stringify(result))
}




//function for vowels punctuations and waldoIndexes
function vowelPunctWalIndex(myParameter) {
    //  vowels and punctuations
    for (let index = 0; index < myParameter.text.length; index++) {

        // waldo Indexes
        if (myParameter.text.toLowerCase().slice(index, index + 5) === 'waldo') {
            myParameter.waldoIndexes.push(index)
        }

        // vowels count
        for (let key of Object.keys(myParameter.vowels)) {

            if (myParameter.text[index].toLowerCase() === key) {
                myParameter.vowels[key] += 1
            }
        }

        // punctuations count
        if (myParameter.text[index] === '.') {
            myParameter.punctuation.period += 1
        } else if (myParameter.text[index] === ',') {
            myParameter.punctuation.comma += 1
        } else if (myParameter.text[index] === '!') {
            myParameter.punctuation.exclamation += 1
        } else if (myParameter.text[index] === '?') {
            myParameter.punctuation.questionMark += 1
        }
    }
}

//longest, shortest, last 3,and number of word Function
function longShortLastNumWord(wordParameter) {

    //remove punctuations 
    let noPunctuation = wordParameter.text.replace(/[^\w\s\']|_/g, '')

    let noPunctuationArray = noPunctuation.split(' ')

    // The last three words
    wordParameter.lastThreeWords = noPunctuationArray.slice(-3)

    // Number of Words
    for (let word of noPunctuationArray) {
        if (word) {
            wordParameter.numWords += 1
        }
    }

    // The longest word
    wordParameter.longestWord += noPunctuationArray.sort((word, anotherWord) => anotherWord.length - word.length)[0]

    // The shortest word
    wordParameter.shortestWord += noPunctuationArray.sort((word, otherWord) => word.length - otherWord.length).join(' ').trim().split(' ')[0]
}

//number of characters Function
function numOfChar(charParameter) {

    charParameter.text += textArea.value

    charParameter.numCharacters = charParameter.text.length
}

//Render result function

// Hello!  Welcome to kenzie.  My name is Robert, and i'm here with my friend Waldo.  Have you met WALDO?