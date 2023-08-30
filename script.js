// Get Random quotes from API

// Global variable created so that the response can be put into an empty string and used by the fetchQuotes function. I have used let because the data in the array will change.

let ApiQuotes = []



async function fetchQuotes() {
    // API URL stored in variable.
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    // try catch allows us to attempt a fetch request. If it doesnt work we can catch the error and do something with it.
    try {
        // Fetching the request and storing the response as a constant. Await ensures that the constant won't be populated until it has some data fetched from the API.
        const response = await fetch(apiURL)
        // response turned into json so data can be read.
        ApiQuotes = await response.json()
        // console log to check that it is working.
        console.log(ApiQuotes)

    } catch (error) {

    }
}

// call the function when the page loads
fetchQuotes()