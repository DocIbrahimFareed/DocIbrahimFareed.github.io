let allQuestions = [];
let currentTab = 'all';

async function loadData() {
    try {
        const response = await fetch('questions.json');
        allQuestions = await response.json();
        document.getElementById('totalCount').innerText = allQuestions.length;
        renderQuestions(allQuestions);
    } catch (e) {
        console.error("Error loading JSON", e);
    }
}

function renderQuestions(data) {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    // To maintain performance with 1500+ items, we only show first 100 initially
    const limit = data.slice(0, 200); 

    limit.forEach(q => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="question-text">${q.id}. ${q.question_ru}</div>
            <div class="options-list">
                ${q.options_ru.map((opt, i) => `
                    <div class="option" onclick="handleSelect(this, ${i}, ${q.correctIndex})">
                        ${opt}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

function handleSelect(element, selected, correct) {
    if (selected === correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
        // Optional: show correct one
        const options = element.parentElement.children;
        options[correct].classList.add('correct');
    }
}

// Simple Search Logic
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allQuestions.filter(q => q.question_ru.toLowerCase().includes(term));
    renderQuestions(filtered);
});

loadData();