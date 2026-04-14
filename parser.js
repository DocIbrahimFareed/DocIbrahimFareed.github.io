export function parseQuestions(raw){

let q = null;
let result = [];

raw.forEach(item => {
let text = item.text.trim();

// سؤال جديد
if(/^\d+\./.test(text)){
if(q) result.push(q);

q = {
id: text.match(/^\d+/)[0],
text,
options:[]
};
}

// إجابة
else if(q && text){

q.options.push({
text: text.replace(/^[+-]/,'').trim(),
isCorrect: item.all_bold === true || text.includes("+")
});
}
});

if(q) result.push(q);
return result;
}