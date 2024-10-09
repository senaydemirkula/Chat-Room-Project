const axios = require('axios');
const readlineSync = require('readline-sync');

// Ana menüyü göster
function showMenu() {
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. Quit");
    const choice = readlineSync.question("Please choose an option: ");
    
    switch (choice) {
        case '1':
            login();
            break;
        case '2':
            register();
            break;
        case '3':
            quit();
            break;
        default:
            console.log("Invalid choice, please try again.");
            showMenu();
    }
}

// Kullanıcı giriş işlemi
async function login() {
    const username = readlineSync.question("Enter your username: ");
    const password = readlineSync.question("Enter your password: ", { hideEchoBack: true });
    
    try {
        const response = await axios.post('http://127.0.0.1:3000/login', { username, password });
        console.log(response.data);
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
    showMenu();
}

// Kullanıcı kayıt işlemi
async function register() {
    const username = readlineSync.question("Enter your username: ");
    const email = readlineSync.question("Enter your email: ");
    const password = readlineSync.question("Enter your password: ", { hideEchoBack: true });
    
    try {
        const response = await axios.post('http://127.0.0.1:3000/register', { username, email, password });
        console.log(response.data);
    } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
    showMenu();
}

// Uygulamadan çıkış işlemi
function quit() {
    console.log("Exiting the application...");
    process.exit(0);
}

// Uygulamanın çalıştırılması
showMenu();
