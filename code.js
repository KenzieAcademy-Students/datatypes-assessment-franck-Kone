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

    //Call function for render dynamically the results
    renderResult(result)

    // console.log(JSON.stringify(result))
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
renderStaticBoard()
function renderStaticBoard() {

    //Elements creation
    let resultTitle = document.createElement('h2'), resultDiv = document.createElement('div'), volAndPunctDiv = document.createElement('div');
    let otherResultDiv = document.createElement('div'), vowelsTitle = document.createElement('h4'), punctTitle = document.createElement('h4');
    let numOfCharTitle = document.createElement('h4'), numOfWordsTitle = document.createElement('h4');
    let longestWordTitle = document.createElement('h4'), shortestWordTitle = document.createElement('h4');
    let lastThreeWordsTitle = document.createElement('h4'), waldoIndexesTitle = document.createElement('h4');
    let staticVowelUnordList = document.createElement('ul'), punctUnordList = document.createElement('ul');

    //display static vowels List
    let staticVowelList = '<li>a: 0</li><li>e: 0</li><li>i: 0</li><li>o: 0</li><li>u: 0</li>' 
    staticVowelUnordList.innerHTML = staticVowelList

    //display static punct List
    let staticPunctList = '<li>Period: 0</li><li>Commas: 0</li><li>Question Marks: 0</li><li>Exclamation Points: 0</li>'
    punctUnordList.innerHTML = staticPunctList

    //display results board 
    vowelsTitle.innerText = 'Vowel Counts'
    punctTitle.innerText = 'Punctuation Counts'
    numOfCharTitle.innerText = 'Number of Characters: 0'
    numOfWordsTitle.innerText = 'Number of Words: 0'
    longestWordTitle.innerText = 'Longest Word:'
    shortestWordTitle.innerText = 'Shortest Word:'
    lastThreeWordsTitle.innerText = 'Last Three Words:'
    waldoIndexesTitle.innerText = 'Waldo Indexes: []'

    // append results board
    resultTitle.textContent = 'Text Analysis'
    volAndPunctDiv.append(vowelsTitle,staticVowelUnordList, punctTitle, punctUnordList)
    otherResultDiv.append(numOfCharTitle, numOfWordsTitle, longestWordTitle, shortestWordTitle, lastThreeWordsTitle, waldoIndexesTitle)
    resultDiv.append(volAndPunctDiv, otherResultDiv)
    results.append(resultTitle)
    results.append(resultDiv)

    //style results board
    resultDiv.setAttribute('style', "display: flex; justify-content: space-around; padding: 0 40px 0 40px")
}

function renderResult(dynamicParam) {
    let vowelsUnordList = document.createElement('ul')
    let vowelList = ''
    for (let vowel in dynamicParam.vowels) {
      vowelList += `<li>${vowel}: ${dynamicParam.vowels[vowel]}</li>`
        console.log(JSON.stringify(dynamicParam), results.children[1].children[0])
        // console.log(JSON.stringify(dynamicParam), results.childNodes)
    }
    vowelsUnordList.innerHTML = vowelList
    console.log(vowelsUnordList)
    results.children[1].children[0].firstChild.after(vowelsUnordList)

}
// Hello!  Welcome to kenzie.  My name is Robert, and i'm here with my friend Waldo.  Have you met WALDO?