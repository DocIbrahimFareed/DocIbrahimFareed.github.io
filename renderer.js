export function renderQuiz(data, container, onAnswer){

container.innerHTML = "";

data.forEach(q => {

const card = document.createElement("div");
card.className = `
bg-white rounded-xl shadow p-4
w-full
`;

card.innerHTML = `
<h2 class="font-bold text-sm text-slate-500">#${q.id}</h2>

<p class="mt-2 font-bold text-base leading-6">
${q.text}
</p>

<div class="mt-4 grid gap-2">
${q.options.map((o,i)=>`
<button
class="w-full text-left p-3 rounded-lg border
hover:bg-slate-50 active:scale-[0.99] transition"
data-correct="${o.isCorrect}"
>
${o.text}
</button>
`).join("")}
</div>
`;

card.querySelectorAll("button").forEach(btn=>{
btn.onclick = () => onAnswer(btn, q);
});

container.appendChild(card);
});
}