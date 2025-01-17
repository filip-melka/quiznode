import { fetchMarkdown } from "./hashnode.js"
import { fetchQuestions } from "./openai.js"

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getPostDetails" }, (res) => {
        const host = res.host
        const slug = res.slug

        if (host && slug) {
            startQuiz(slug, host)
        }
    })
})

const QUESTION = document.getElementById("question")
const OPTIONS = document.getElementById("options")

let questions
let questionIndex = -1
let noOfCorrectAnswers = 0

function setDisplayProperty(id, value) {
    document.getElementById(id).style.display = value
}

async function startQuiz(slug, host) {
    /* get markdown */
    const markdown = await fetchMarkdown(slug, host)

    /* get questions */
    questions = await fetchQuestions(markdown)

    /* show quiz */
    setDisplayProperty("loader", "none")
    nextQuestion()
    setDisplayProperty("quiz", "flex")
}

function setProgressBar(percentage) {
    document.getElementById("progress-bar").firstChild.style.width = `${
        percentage * 100
    }%`
}

function nextQuestion() {
    /* hide 'next' button */
    setDisplayProperty("next-btn", "none")

    questionIndex++

    if (questionIndex < questions.length) {
        setProgressBar((questionIndex + 1) / questions.length)

        /* set questions */
        QUESTION.innerText = questions[questionIndex].question

        /* remove previous option buttons */
        OPTIONS.innerHTML = ""

        /* create new option buttons */
        questions[questionIndex].options.forEach((option) => {
            const btn = document.createElement("button")
            btn.innerHTML = option
            btn.addEventListener("click", () => evaluateAnswer(btn))
            OPTIONS.appendChild(btn)
        })

        OPTIONS.className = ""
    } else {
        showResult()
    }
}

function evaluateAnswer(btn) {
    /* disable options buttons */
    OPTIONS.className = "disabled"

    if (btn.innerText.startsWith(questions[questionIndex].correctAnswer)) {
        noOfCorrectAnswers++
        btn.className = "correct"
    } else {
        btn.className = "incorrect"

        /* loop through the options */
        for (
            var option = OPTIONS.firstChild;
            option !== null;
            option = option.nextSibling
        ) {
            if (
                option.innerText.startsWith(
                    questions[questionIndex].correctAnswer
                )
            ) {
                option.className = "correct"
            }
        }
    }

    /* display 'next' button */
    setDisplayProperty("next-btn", "block")
}

document.getElementById("next-btn").addEventListener("click", nextQuestion)

function showResult() {
    setDisplayProperty("quiz", "none")

    const spans = document.querySelectorAll("#result span")

    spans[0].innerHTML = noOfCorrectAnswers
    spans[1].innerHTML = `/ ${questions.length}`

    // result bar
    const container = document.getElementById("result-bar")

    // add points
    for (let i = 0; i < questions.length; i++) {
        const point = document.createElement("div")
        point.className = "point"
        if (i >= noOfCorrectAnswers) {
            point.style.background = "var(--primary-light)"
        }
        container.appendChild(point)
    }

    // add line
    const backgroundLine = document.createElement("div")
    backgroundLine.className = "line"
    backgroundLine.style.background = "var(--primary-light)"
    container.appendChild(backgroundLine)

    const line = document.createElement("div")
    line.className = "line"
    line.style.width =
        noOfCorrectAnswers === 0
            ? 0
            : `${((noOfCorrectAnswers - 1) / (questions.length - 1)) * 100}%`
    container.appendChild(line)

    setDisplayProperty("result", "flex")
}

document
    .getElementById("close-btn")
    .addEventListener("click", () => window.close())
