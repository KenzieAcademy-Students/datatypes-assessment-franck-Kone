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
            Periods: 0,
            Commas: 0,
            "Question Marks": 0,
            "Exclamation Points": 0
        },
        numCharacters: 0,
        numWords: 0,
        longestWord: "",
        shortestWord: "",
        lastThreeWords: [],
        waldoIndexes: [],
    }
   // spell-check for "school" => "Kenzie Academy", "Teacher" => "Jack Daniels", "coach"(1st time) => "Luke Warren", "coach"(2nd) => "Shanel Williams" and "learner success advisor" => "Scott Voisine"
    spellCheck(result)


    //Number of characters call function
    numOfChar(result)

    //longest, shortest, last 3,and number of word call Function
    longShortLastNumWord(result)

    //Call function for vowels punctuations and waldoIndexes
    vowelPunctWalIndex(result)

    //Call function to render dynamically the results
    dynamicResultMethod2(result)
}

//function for vowels punctuations and waldoIndexes Values
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
            myParameter.punctuation.Periods += 1
        } else if (myParameter.text[index] === ',') {
            myParameter.punctuation.Commas += 1
        } else if (myParameter.text[index] === '!') {
            myParameter.punctuation['Exclamation Points'] += 1
        } else if (myParameter.text[index] === '?') {
            myParameter.punctuation['Question Marks'] += 1
        }
    }
}

//longest, shortest, last 3,and number of word Values Function 
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

//Render static results function
renderStaticResult()
function renderStaticResult() {

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
    let staticPunctList = '<li>Periods: 0</li><li>Commas: 0</li><li>Question Marks: 0</li><li>Exclamation Points: 0</li>'
    punctUnordList.innerHTML = staticPunctList

    //display static results board 
    vowelsTitle.innerText = 'Vowel Counts'
    punctTitle.innerText = 'Punctuation Counts'
    numOfCharTitle.innerText = 'Number of Characters: 0'
    numOfWordsTitle.innerText = 'Number of Words: 0'
    longestWordTitle.innerText = 'Longest Word:'
    shortestWordTitle.innerText = 'Shortest Word:'
    lastThreeWordsTitle.innerText = 'Last Three Words:'
    waldoIndexesTitle.innerText = 'Waldo Indexes: []'
    resultTitle.textContent = 'Text Analysis'

    // append static results board
    volAndPunctDiv.append(vowelsTitle, staticVowelUnordList, punctTitle, punctUnordList)
    otherResultDiv.append(numOfCharTitle, numOfWordsTitle, longestWordTitle, shortestWordTitle, lastThreeWordsTitle, waldoIndexesTitle)
    resultDiv.append(volAndPunctDiv, otherResultDiv)
    results.append(resultTitle)
    results.append(resultDiv)

    //style static results board
    resultDiv.setAttribute('style', "display: flex; justify-content: space-around; padding: 0 30px 0 30px")
}

//Render Dynamic Results Function Method 2
function dynamicResultMethod2(resultParam) {

    let unordListBank = document.querySelectorAll('ul'), divListBank = document.querySelectorAll('div'), displayVowelsResult = '', displayPunctResult = '', othersResult

    // Update vowels result
    for (let vowel of Object.keys(resultParam.vowels)) {
        displayVowelsResult += `<li>${vowel}: ${resultParam.vowels[vowel]}</li>`
    }
    unordListBank[0].innerHTML = displayVowelsResult

    // Update punctuations result
    for (let punct of Object.keys(resultParam.punctuation)) {
        displayPunctResult += `<li>${punct}: ${resultParam.punctuation[punct]}</li>`
    }
    unordListBank[1].innerHTML = displayPunctResult

    // Update Number of Characters, Number of Words, Longest Word,Shortest Word, Last Three Words, Waldo Indexes results
    othersResult = `
  <h4>Number of Characters: ${resultParam.numCharacters}</h4>
  <h4>Number of Words: ${resultParam.numWords}</h4>
  <h4>Longest Word: ${resultParam.longestWord}</h4>
  <h4>Shortest Word: ${resultParam.shortestWord}</h4>
  <h4>Waldo Indexes: ${JSON.stringify(resultParam.waldoIndexes)}</h4>
  `
    divListBank[4].innerHTML = othersResult
}

// OPTIONAL PART 
// SPELL-CHECK function, school will produce Kenzie Academy, Jack Daniels for teacher, Luke Warren for the first typing coach and Shanel Williams for the 2nd, Scott Voisine for Learner success Advisor.
let coachCount = 0

function spellCheck(spellChekVariable) {

    // I added resultClone Object to reset the value of result object in order to update the results of the text Analyser when modifying the textArea value 
    let resultClone = {
        text: "",
        vowels: {
            a: 0,
            e: 0,
            i: 0,
            o: 0,
            u: 0
        },
        punctuation: {
            Periods: 0,
            Commas: 0,
            "Question Marks": 0,
            "Exclamation Points": 0
        },
        numCharacters: 0,
        numWords: 0,
        longestWord: "",
        shortestWord: "",
        lastThreeWords: [],
        waldoIndexes: [],
    }
    spellChekVariable = resultClone
    let modifiedText = ''
    for (let num = 0; num < textArea.value.length; num++) {
        if (textArea.value.toLowerCase().slice(num, num + 6) === 'school') {
            modifiedText = textArea.value.replace(textArea.value.toLowerCase().slice(num, num + 6), "Kenzie Academy")
            spellChekVariable.text = modifiedText
            console.log(spellChekVariable.text)
            textArea.value = modifiedText

        } else if (textArea.value.toLowerCase().slice(num, num + 7) === 'teacher') {

            modifiedText = textArea.value.replace(textArea.value.toLowerCase().slice(num, num + 7), "Jack Daniels")
            spellChekVariable.text = modifiedText
            textArea.value = modifiedText

        } else if (textArea.value.toLowerCase().slice(num, num + 5) === 'coach' && coachCount === 0) {
            modifiedText = textArea.value.replace(textArea.value.toLowerCase().slice(num, num + 5), "Luke Warren")
            spellChekVariable.text = modifiedText
            textArea.value = modifiedText
            coachCount += 1
        } else if (textArea.value.toLowerCase().slice(num, num + 5) === 'coach' && coachCount === 1) {
            modifiedText = textArea.value.replace(textArea.value.toLowerCase().slice(num, num + 5), "Shanel Williams")
            spellChekVariable.text = modifiedText
            textArea.value = modifiedText
            coachCount = 0
        } else if (textArea.value.toLowerCase().slice(num, num + 23) === 'learner success advisor') {
            modifiedText = textArea.value.replace(textArea.value.toLowerCase().slice(num, num + 23), "Scott Voisine")
            spellChekVariable.text = modifiedText
            textArea.value = modifiedText
        }
    }
}