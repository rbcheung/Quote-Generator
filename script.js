// Get Random quotes from API

// Selecting HTML elements using document.getElementById.

const quoteText = document.getElementById("quote-text")
// console.log(quoteText)
const quoteAuthor = document.getElementById("quote-author")
// console.log(quoteAuthor)
const twitterBtn = document.getElementById("twitter-button")
// console.log(twitterBtn)
const quoteBtn = document.getElementById("quote-button")
// console.log(quoteBtn)
const loader = document.getElementById("loader")
// console.log(loader)
const quoteContainer = document.getElementById("quote-container")

// Global variable created so that the response can be put into an empty string and used by the fetchQuotes function. I have used let because the data in the array will change.

let ApiQuotes = []

// Loading function to show loading.

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading 

function hiding() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// new function added to randomise the quote and populate page correctly.
function newQuote()  {

    // calling the loading function

    loading();
    // New variable created to stored randomised quote. Math.random finds a random number. wrapped in Math.floor as this ensures theres no decimal it rounds down to the nearest whole number/integer. wrappred in square brackets as we are finding the index of the ApiQuotes array. multiply by length of apiQuotes array so that it will never be higher than the length of the array.
    const randomQuote = ApiQuotes[Math.floor(Math.random() * ApiQuotes.length)]
    console.log(randomQuote)

    // Check to see if author in random quote is null. if null, change text content to read "unknown", if not proceed with whatever data the api data gives for the author of that random quote.
    if (!randomQuote.author) {
        quoteAuthor.textContent = "Unknown"
    } else {
        quoteAuthor.textContent = randomQuote.author
    }

    // check to ensure that text size gets smaller when the quote is too long.

    if (randomQuote.text.length > 120)  {
        quoteText.classList.add("long-quote")
    } 
    
    // code below changes the text content of the variables to be whatever is in the randomquote array.

    quoteText.textContent = randomQuote.text;
    quoteAuthor.textContent = randomQuote.author;

    hiding();



}

// New function added to tweet selected quotes.
function tweetQuote() {
    // variable stores the twitter url. back ticks used to pass variables into template string. ? after tweet used to show that we are parsing variables. window.open allows a new window to be opened with twitterURL.
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(twitterURL, '_blank')
}

twitterBtn.addEventListener("click", tweetQuote)
quoteBtn.addEventListener("click", newQuote)



async function fetchQuotes() {
    loading();
    // API URL stored in variable.
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    // try catch allows us to attempt a fetch request. If it doesnt work we can catch the error and do something with it.
    try {
        // Fetching the request and storing the response as a constant. Await ensures that the constant won't be populated until it has some data fetched from the API.
        const response = await fetch(apiURL)
        // response turned into json so data can be read.
        ApiQuotes = await response.json()
        newQuote()

    } catch (error) {

    }
}

// call the function when the page loads
fetchQuotes()