let allQuestions = [];


function toUrduNumber(n) {
    const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().split('').map(x => urduDigits[x]).join('') + "۔";
}

async function initQuiz() {
    const container = document.getElementById('quiz-container');
    try {
        const response = await fetch('quiz.json');
        if (!response.ok) throw new Error("File not found");
        allQuestions = await response.json();
        renderQuestions(allQuestions);
    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<div class="no-results">ڈیٹا لوڈ کرنے میں خرابی آئی ہے۔</div>`;
    }
}

function renderQuestions(data) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<div class="no-results">کوئی نتیجہ نہیں ملا</div>`;
        return;
    }

    data.forEach((item, index) => {
        const accordion = document.createElement('div');
        accordion.className = 'accordion-item';

       
        const urduNum = toUrduNumber(index + 1);

        accordion.innerHTML = `
            <div class="accordion-header">
                <div class="question-wrapper">
                    <span class="q-number">${urduNum}</span>
                    <div class="question-text">${item.question}</div>
                </div>
                <div class="toggle-icon">+</div>
            </div>
            <div class="accordion-content">
                <div class="content-inner">
                    <p>${item.answer}</p>
                    <div class="reference">Ref: ${item.reference}</div>
                </div>
            </div>
        `;

        accordion.querySelector('.accordion-header').addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
            if (!isActive) accordion.classList.add('active');
        });

        container.appendChild(accordion);
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredData = allQuestions.filter(item => 
        item.question.toLowerCase().includes(searchTerm) || 
        item.answer.toLowerCase().includes(searchTerm)
    );
    renderQuestions(filteredData);
});

initQuiz();