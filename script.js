document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const nextButton = document.getElementById('next-btn');
    
    let currentQuestionIndex = 0;
    let quizData = [];
    let resultDisplayed = false; 
    
    
    async function fetchQuizData() {
        try {
            const response = await fetch('quizData.json');
            quizData = await response.json();
            displayQuestion();
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    }
    
    
    function displayQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
    
       
        optionsContainer.innerHTML = '';
    
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.classList.add('option-btn');
            optionButton.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionButton);
        });
    }
    
    function selectOption(optionIndex) {
        if (!resultDisplayed) { 
            const currentQuestion = quizData[currentQuestionIndex];
            const selectedOption = currentQuestion.options[optionIndex];
            const correctOption = currentQuestion.options[currentQuestion.correctIndex];
        
            if (selectedOption === correctOption) {
               
                const resultContent = document.createElement('h3');
                resultContent.innerText = "THIS ANSWER IS CORRECT";
                resultContainer.appendChild(resultContent);
                console.log('Correct answer!');
            } else {
                
                const resultContent = document.createElement('h3');
                resultContent.innerText = "THIS ANSWER IS INCORRECT";
                resultContainer.appendChild(resultContent);
                console.log('Incorrect answer!');
            }
            
            resultDisplayed = true; 
        }
    }
    
   
    function nextQuestion() {
        resultContainer.innerHTML = ''; 
        resultDisplayed = false; 
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            displayQuestion();
        } else {
            
            alert('Quiz completed!');
        }
    }
    
    
    nextButton.addEventListener('click', nextQuestion);
    
    
    fetchQuizData();
});
