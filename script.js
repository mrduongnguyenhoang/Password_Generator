const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('password-length');
const lengthVal = document.getElementById('length-val');

const uppercaseCb = document.getElementById('uppercase');
const lowercaseCb = document.getElementById('lowercase');
const numbersCb = document.getElementById('numbers');
const symbolsCb = document.getElementById('symbols');

const strengthLabel = document.getElementById('strength-label');
const strengthBarFill = document.getElementById('strength-bar-fill');
const generateBtn = document.getElementById('generate-btn');

const keys = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
    updateStrength(); 
});

function updateStrength() {
    const length = parseInt(lengthSlider.value);
    
    
    if (length < 12) {
        strengthLabel.textContent = 'Weak';
        strengthLabel.style.color = '#dc3545'; 
        strengthBarFill.style.width = '30%';
        strengthBarFill.style.background = '#dc3545';
    } else if (length === 12) {
        strengthLabel.textContent = 'Medium';
        strengthLabel.style.color = '#ffc107'; 
        strengthBarFill.style.width = '60%';
        strengthBarFill.style.background = '#ffc107';
    } else {
        strengthLabel.textContent = 'Strong';
        strengthLabel.style.color = '#28a745';
        strengthBarFill.style.width = '100%';
        strengthBarFill.style.background = '#28a745';
    }
}

[uppercaseCb, lowercaseCb, numbersCb, symbolsCb].forEach(cb => {
    cb.addEventListener('change', updateStrength);
});

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let validChars = '';

    if (uppercaseCb.checked) validChars += keys.uppercase;
    if (lowercaseCb.checked) validChars += keys.lowercase;
    if (numbersCb.checked) validChars += keys.numbers;
    if (symbolsCb.checked) validChars += keys.symbols;

    if (validChars === '') {
        alert('Vui lòng chọn ít nhất một loại ký tự!');
        passwordDisplay.value = '';
        return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validChars.length);
        generatedPassword += validChars[randomIndex];
    }

    passwordDisplay.value = generatedPassword;
}

copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.value;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        const icon = copyBtn.querySelector('i');
        icon.classList.replace('fa-regular', 'fa-solid');
        icon.classList.replace('fa-copy', 'fa-check');
        copyBtn.style.color = '#28a745';

        setTimeout(() => {
            icon.classList.replace('fa-solid', 'fa-regular');
            icon.classList.replace('fa-check', 'fa-copy');
            copyBtn.style.color = '#2b5876';
        }, 1500);
    }).catch(err => {
        console.error('Không thể sao chép: ', err);
    });
});

generateBtn.addEventListener('click', generatePassword);

updateStrength();
