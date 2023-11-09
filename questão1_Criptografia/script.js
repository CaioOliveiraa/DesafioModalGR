const chaveSecreta = "#modalGR#GPTW#top#maiorEmpresaTecnologia#baixadaSantista";

document.getElementById("criptografarButton").addEventListener("click", () => {
    encryptPasswords();
});

async function encryptPasswords() {
    // Salva os valores digitados das senhas nas suas respectivas variáveis
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const password3 = document.getElementById("password3").value;

    // Verifica se todos os campos de senha estão preenchidos
    if (!password1 || !password2 || !password3) {
        document.getElementById("alerta").textContent = `Preencha todos os campos!`;
        return;
    } else {
        document.getElementById("alerta").textContent = ``;
    }

    // Salva as senhas já criptografadas em variáveis
    const encryptedPassword1 = encryptRule1(password1); // Correção aqui
    const encryptedPassword2 = encryptRule2(password2, chaveSecreta); // Usando a nova função
    const encryptedPassword3 = await encryptRule3(password3);

    // Converter senhas 1 e 2 para representação hex
    const hexPassword1 = convertToHex(encryptedPassword1);
    const hexPassword2 = convertToHex(encryptedPassword2);

    // Escreve na tela as senhas Criptografadas
    document.getElementById("encryptedPassword1").textContent = `${hexPassword1}`;
    document.getElementById("encryptedPassword2").textContent = `${hexPassword2}`;
    document.getElementById("encryptedPassword3").textContent = `${encryptedPassword3}`;

    // Oculta os labels se os campos estiverem vazios
    toggleVisibility("labelPassword1", password1);
    toggleVisibility("labelPassword2", password2);
    toggleVisibility("labelPassword3", password3);

    // Salva as senhas descriptografadas em variáveis e as exibe no console
    const decryptedPassword1 = decryptRule1(encryptedPassword1); // Correção aqui
    console.log(`Senha 1 Descriptografada: ${decryptedPassword1}`);
}

function convertToHex(text) {
    // Converte uma string para representação hexadecimal
    return Array.from(text, char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

function toggleVisibility(elementId, text) {
    const element = document.getElementById(elementId);
    if (text) {
        element.style.display = 'inline';
    } else {
        element.style.display = 'none';
    }
}

function encryptRule1(password) {
    // Regra 1: Criptografia de Substituição (Cifra de César modificada)
    let encrypted = '';
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);
        const shift = chaveSecreta.charCodeAt(i % chaveSecreta.length);
        const encryptedChar = String.fromCharCode(charCode + shift);
        encrypted += encryptedChar;
    }
    return encrypted;
}

function decryptRule1(encryptedText) {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i++) {
        const charCode = encryptedText.charCodeAt(i);
        const shift = chaveSecreta.charCodeAt(i % chaveSecreta.length);
        const decryptedChar = String.fromCharCode(charCode - shift);
        decrypted += decryptedChar;
    }
    return decrypted;
}

function encryptRule2(text, key) {
    // Esta função aplica a operação XOR entre o texto e a chave
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const keyChar = key[i % key.length];
        const charCode = char.charCodeAt(0);
        const keyCharCode = keyChar.charCodeAt(0);
        const encryptedCharCode = charCode ^ keyCharCode; // Operação XOR
        encryptedText += String.fromCharCode(encryptedCharCode);
    }

    return encryptedText;
}

async function encryptRule3(password) {
    // Regra 3: Hashing da senha com a chave secreta usando SHA-256
    const data = password + chaveSecreta;
    const hashHex = await sha256(data);
    return hashHex;
}

async function sha256(data) {
    // Função para calcular o hash SHA-256 de uma string
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
