import {parseQuestions} from "./modules/parser.js";
import {renderQuiz} from "./modules/renderer.js";

let state = {
data: [],
page: 1,
size: 20,
score: 0,
answered: 0
};

async function init(){

const res = await fetch("./data/questions.json");
const raw = await res.json();

state.data = parseQuestions(raw);

render();
}

function render(){

const start = (state.page-1)*state.size;
const pageData = state.data.slice(start, start+state.size);

renderQuiz(pageData, document.getElementById("quiz"), handleAnswer);

document.getElementById("stats").innerText =
`Score: ${state.score} | Total: ${state.answered}`;
}

function handleAnswer(btn, q){

if(btn.parentElement.classList.contains("locked")) return;

btn.parentElement.classList.add("locked");
state.answered++;

const correct = btn.dataset.correct === "true";

if(correct){
btn.classList.add("bg-green-200");
state.score++;
}else{
btn.classList.add("bg-red-200");

btn.parentElement.querySelectorAll("button")
.forEach(b=>{
if(b.dataset.correct==="true")
b.classList.add("bg-green-200");
});
}

document.getElementById("stats").innerText =
`Score: ${state.score} | Total: ${state.answered}`;
}

init();