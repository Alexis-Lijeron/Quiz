// Sistema de usuarios y Quiz
let currentUser = null;
let userStartTime = null;

// Preguntas del quiz
const allQuestions = {
    'HTML': [
        { question: '¿Qué significa HTML?', options: ['A) Hyper Transfer Machine Language', 'B) HyperText Markup Language', 'C) HighText Machine Language', 'D) HyperTool Manual Language'], correct: 'B' },
        { question: '¿Cuál de estas es una etiqueta obligatoria en un documento HTML?', options: ['A) <table>', 'B) <section>', 'C) <html>', 'D) <br>'], correct: 'C' },
        { question: '¿Qué etiqueta se usa para dividir bloques grandes en HTML?', options: ['A) <span>', 'B) <div>', 'C) <header>', 'D) <p>'], correct: 'B' },
        { question: '¿Qué atributo se usa para vincular una hoja CSS externa?', options: ['A) src', 'B) style', 'C) href', 'D) class'], correct: 'C' },
        { question: '¿Cuál es la diferencia entre "id" y "class" en HTML?', options: ['A) class es único, id puede repetirse', 'B) Ambos pueden repetirse', 'C) id es único, class se puede repetir', 'D) Ninguno sirve para identificar elementos'], correct: 'C' },
        { question: '¿Cuál representa una estructura válida de HTML5?', options: ['A) <head><title>Mi sitio</title></head><body><h1>Hola</h1></body>', 'B) <html><body><title>Hola</title></body></html>', 'C) <!DOCTYPE html><html><head><title>Mi primera página HTML</title></head><body><h1>¡Bienvenido!</h1></body></html>', 'D) html<body><h1>Hola mundo</h1></body>'], correct: 'C' },
        { question: '¿Qué etiqueta se usa para un enlace que diga "Estas visitando mi página"?', options: ['A) <p href="...">', 'B) <a src="...">', 'C) <a href="...">Estas visitando mi pagina</a>', 'D) <link href="...">'], correct: 'C' },
        { question: '¿Cómo se inserta correctamente una imagen con texto alternativo?', options: ['A) <img href="img.jpg" texto="...">', 'B) <img src="img.jpg" alt="...">', 'C) <img link="img.jpg" content="...">', 'D) <img source="img.jpg" label="...">'], correct: 'B' },
        { question: '¿Qué opción crea una lista ordenada y un enlace a id="contacto"?', options: ['A) <ul>...</ul><a link="#contacto">...</a>', 'B) <ol>...</ol><a href="#contacto">...</a>', 'C) html<ol>...<goto>...</goto>', 'D) <ul>...<a name="#contacto">...</a>'], correct: 'B' },
        { question: '¿Qué opción divide la página con clases y <div>?', options: ['A) <div class="principal">...</div><div class="lateral">...</div>', 'B) <section id="principal">...</section><aside class="lateral">...</aside>', 'C) <div id="contenido">...</div><div id="barra">...</div>', 'D) <body class="...">Contenido</body>'], correct: 'A' }
    ],
    'CSS': [
        { question: '¿Qué significa CSS?', options: ['A) Creative Style System', 'B) Color Style Script', 'C) Cascading Style Sheets', 'D) Control Style Sheet'], correct: 'C' },
        { question: '¿Cómo se enlaza un archivo CSS externo correctamente?', options: ['A) <script src="estilos.css">', 'B) <link rel="stylesheet" href="estilos.css">', 'C) <css link="estilos.css">', 'D) <style src="estilos.css">'], correct: 'B' },
        { question: '¿Qué propiedad controla el espacio entre el borde y el contenido?', options: ['A) border', 'B) padding', 'C) margin', 'D) spacing'], correct: 'B' },
        { question: '¿Cuál de estas opciones tiene mayor especificidad en CSS?', options: ['A) Selector de etiqueta', 'B) Selector de clase', 'C) Selector de ID', 'D) Selector universal'], correct: 'C' },
        { question: '¿Cuál es un ejemplo correcto de pseudoelemento en CSS?', options: ['A) p:first-letter {}', 'B) p::first-letter {}', 'C) p->first-letter {}', 'D) p:firstletter {}'], correct: 'B' },
        { question: '¿Cuál de las siguientes reglas cambia el fondo y el color del texto del cuerpo?', options: ['A) body { background-color: #f0f0f0; color: #333333; }', 'B) body { text-align: center; font-size: 12px; }', 'C) h1 { background: white; color: black; }', 'D) html { background-color: gray; }'], correct: 'A' },
        { question: '¿Qué propiedad se usa para centrar un texto?', options: ['A) margin: auto;', 'B) align: center;', 'C) text-align: center;', 'D) center: true;'], correct: 'C' },
        { question: '¿Cuál de estas opciones da estilo a una lista de navegación horizontal?', options: ['A) ul { list-style: disc; }', 'B) ul li { display: block; }', 'C) ul li { list-style: none; display: inline-block; }', 'D) ul { float: left; }'], correct: 'C' },
        { question: '¿Cuál es una forma correcta de crear una clase ".caja" con fondo azul y borde negro?', options: ['A) .caja { width: 300px; height: 150px; background-color: lightblue; border: 2px solid black; }', 'B) .box { size: 300px 150px; color: blue; }', 'C) .caja { width: 300px; height: 150px; background-color: lightblue; border: 2px solid black; margin: 20px; }', 'D) #caja { width: auto; border-color: black; }'], correct: 'C' },
        { question: '¿Qué regla CSS aplica Flexbox para distribuir tres elementos en fila?', options: ['A) .container { display: grid; grid-template-columns: auto auto auto; }', 'B) .container { display: flex; justify-content: space-between; }', 'C) .flex { float: left; }', 'D) .parent { column-count: 3; }'], correct: 'B' }
    ],
    'Condicionales': [
        { question: '¿Qué estructura se usa para tomar decisiones en programación?', options: ['A) loop', 'B) if', 'C) function', 'D) try'], correct: 'B' },
        { question: '¿Qué operador verifica si dos valores son iguales en Python?', options: ['A) ===', 'B) ==', 'C) =', 'D) equal()'], correct: 'B' },
        { question: '¿Cuál es la función del bloque else?', options: ['A) Ejecuta si la condición es verdadera', 'B) Ejecuta si otra condición fue verdadera', 'C) Ejecuta si ninguna condición anterior se cumplió', 'D) Solo se usa con errores'], correct: 'C' },
        { question: '¿Cuál de estos valores es considerado "falso" (falsy)?', options: ['A) True', 'B) "Hola"', 'C) []', 'D) 1'], correct: 'C' },
        { question: '¿Qué hace este código en JavaScript?: if (edad > 18 && tieneLicencia) { console.log("Puede conducir"); }', options: ['A) Evalúa si tieneLicencia es true', 'B) Evalúa solo edad', 'C) Evalúa ambas condiciones juntas', 'D) No funciona, falta else'], correct: 'C' },
        { question: '¿Cuál verifica edad y da mensaje según el valor?', options: ['A) if edad >= 18 { print("Mayor") } else { print("Menor") }', 'B) if edad < 18 then print("Menor")', 'C) edad == 18 ? "Exacto" : "Otro"', 'D) edad = 18'], correct: 'A' },
        { question: '¿Qué resultado da nota = 9?', options: ['A) Desaprobado', 'B) Bueno', 'C) Excelente', 'D) Regular'], correct: 'C' },
        { question: '¿Qué estructura permite validar acceso con usuario y clave?', options: ['A) if (usuario == "admin" && clave == "123") { acceso = true }', 'B) if usuario igual admin', 'C) validar(usuario)', 'D) console.log("Listo")'], correct: 'A' },
        { question: '¿Qué pasa con número = 72 si se evalúa su paridad y valor?', options: ['A) Es impar', 'B) Par y mayor que 50', 'C) Par pero menor o igual a 50', 'D) Nada'], correct: 'B' },
        { question: '¿Qué operadores evalúan múltiples condiciones en lenguajes como JavaScript?', options: ['A) = y !=', 'B) & y |', 'C) && y ||', 'D) > y <'], correct: 'C' }
    ],
    'While': [
        { question: '¿Qué pasa si un bucle while nunca se detiene?', options: ['A) Lanza error de sintaxis', 'B) Termina automáticamente', 'C) Genera un bucle infinito', 'D) Salta al siguiente código'], correct: 'C' },
        { question: '¿Qué bucle se usa cuando no se sabe cuántas veces repetir?', options: ['A) for', 'B) while', 'C) repeat', 'D) do-while'], correct: 'B' },
        { question: '¿Qué hace break dentro de un bucle?', options: ['A) Repite el ciclo', 'B) Pausa el programa', 'C) Sale del bucle inmediatamente', 'D) Ignora la condición'], correct: 'C' },
        { question: '¿Qué previene un bucle infinito?', options: ['A) Condición fija', 'B) No usar input()', 'C) Cambiar variables dentro del bucle', 'D) Usar for en lugar de while'], correct: 'C' },
        { question: '¿Qué hace este código con "salir"?', options: ['A) Repite siempre', 'B) Solo se ejecuta una vez', 'C) Termina si escribís "salir"', 'D) Da error por break'], correct: 'C' },
        { question: '¿Cómo imprimir del 1 al 10 con while?', options: ['A) while (i <= 10) { print(i); i++ }', 'B) for i in range(10): print(i)', 'C) while true: print("hola")', 'D) i = 0; print(i)'], correct: 'A' },
        { question: '¿Qué hace este código si ingresas 0?', options: ['A) Suma y termina', 'B) Sigue sumando', 'C) Error', 'D) Se reinicia'], correct: 'A' },
        { question: '¿Qué hace este while con clave "admin"?', options: ['A) Pide clave hasta acertar', 'B) Solo una vez', 'C) No valida', 'D) Corta siempre'], correct: 'A' },
        { question: '¿Qué hace este código si adivinas el número?', options: ['A) Nunca se detiene', 'B) Siempre imprime "Correcto"', 'C) Cuenta intentos hasta adivinar', 'D) Solo imprime 1 intento'], correct: 'C' },
        { question: '¿Qué hace este código con Fibonacci?', options: ['A) Muestra 100 veces el 1', 'B) Solo imprime 0', 'C) Genera números Fibonacci menores a 100', 'D) Da error de sintaxis'], correct: 'C' }
    ]
};

let currentTheme = '';
let currentQuestionIndex = 0;
let quizAnswered = false; // Nueva variable para controlar si ya se respondió

// *** NUEVA FUNCIONALIDAD: Función para colapsar el navbar ***
function collapseNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Usar Bootstrap para colapsar el navbar
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide();

        // También actualizar el estado del botón toggler
        if (navbarToggler) {
            navbarToggler.setAttribute('aria-expanded', 'false');
            navbarToggler.classList.add('collapsed');
        }
    }
}

// Funciones de gestión de usuarios
function initializeApp() {
    loadExistingUsers();
    if (getCurrentUser()) {
        showMainScreen();
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideLoginScreen() {
    document.getElementById('loginScreen').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showMainScreen() {
    hideLoginScreen();
    updateUserInfo();
    updateScores();
    showMainMenu();
}

function loadExistingUsers() {
    const users = getStoredUsers();
    const container = document.getElementById('existingUsers');
    container.innerHTML = '';

    if (Object.keys(users).length === 0) {
        container.innerHTML = '<p class="text-muted">No hay usuarios registrados</p>';
        return;
    }

    Object.keys(users).forEach(username => {
        const user = users[username];
        const totalScore = Object.values(user.scores).reduce((a, b) => a + b, 0);
        const userDiv = document.createElement('div');
        userDiv.className = 'user-item';
        userDiv.onclick = () => selectExistingUser(username);
        userDiv.innerHTML = `
          <div>
            <strong>${username}</strong>
            <div class="user-stats">Puntos totales: ${totalScore}</div>
          </div>
        `;
        container.appendChild(userDiv);
    });
}

function selectExistingUser(username) {
    document.getElementById('username').value = username;
    loginUser();
}

function createNewUser() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Por favor ingresa un nombre de usuario');
        return;
    }

    const users = getStoredUsers();
    if (users[username]) {
        alert('Este usuario ya existe. Selecciónalo de la lista o elige otro nombre.');
        return;
    }

    const newUser = {
        username: username,
        scores: { 'HTML': 0, 'CSS': 0, 'Condicionales': 0, 'While': 0 },
        totalQuestions: 0,
        correctAnswers: 0,
        totalTime: 0,
        createdAt: new Date().toISOString(),
        lastPlayed: new Date().toISOString()
    };

    users[username] = newUser;
    saveUsers(users);
    setCurrentUser(username);
    showMainScreen();
}

function loginUser() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Por favor ingresa un nombre de usuario');
        return;
    }

    const users = getStoredUsers();
    if (!users[username]) {
        alert('Usuario no encontrado. Usa "Crear Nuevo Usuario" para registrarte.');
        return;
    }

    setCurrentUser(username);
    showMainScreen();
}

function logout() {
    setCurrentUser(null);
    showLoginScreen();
    resetQuizState();
}

function resetQuizState() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
    quizAnswered = false; // Resetear el estado de respuesta
}

// Funciones de almacenamiento
function getStoredUsers() {
    const stored = localStorage.getItem('retotech_users');
    return stored ? JSON.parse(stored) : {};
}

function saveUsers(users) {
    localStorage.setItem('retotech_users', JSON.stringify(users));
}

function getCurrentUser() {
    return localStorage.getItem('retotech_current_user');
}

function setCurrentUser(username) {
    if (username) {
        localStorage.setItem('retotech_current_user', username);
        currentUser = username;
        userStartTime = Date.now();
    } else {
        localStorage.removeItem('retotech_current_user');
        currentUser = null;
        userStartTime = null;
    }
}

function updateUserData(updates) {
    const users = getStoredUsers();
    const username = getCurrentUser();
    if (users[username]) {
        Object.assign(users[username], updates);
        users[username].lastPlayed = new Date().toISOString();
        saveUsers(users);
    }
}

function getUserData() {
    const users = getStoredUsers();
    const username = getCurrentUser();
    return users[username] || null;
}

function updateUserInfo() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('currentUserName').textContent = userData.username;
    }
}

// Funciones del quiz
function startQuiz(theme) {
    currentTheme = theme;
    currentQuestionIndex = 0;
    quizAnswered = false; // Resetear el estado al iniciar un nuevo quiz
    // *** NUEVA FUNCIONALIDAD: Reiniciar puntuación del tema ***
    // *** NUEVA FUNCIONALIDAD: Inicializar control de envío de respuestas ***
    window.answerSubmitted = false;
    const userData = getUserData();
    if (userData) {
        // Preguntar al usuario si quiere reiniciar su puntuación para este tema
        const currentScore = userData.scores[theme] || 0;
        if (currentScore > 0) {
            const restart = confirm(`Ya tienes ${currentScore} puntos en ${theme}. ¿Quieres reiniciar tu puntuación y empezar de nuevo?`);
            if (restart) {
                // Reiniciar solo la puntuación de este tema
                const updates = {
                    scores: { ...userData.scores },
                    // Restar las preguntas y respuestas correctas del tema anterior
                    totalQuestions: Math.max(0, (userData.totalQuestions || 0) - 10),
                    correctAnswers: Math.max(0, (userData.correctAnswers || 0) - currentScore)
                };
                updates.scores[theme] = 0;
                updateUserData(updates);
                updateScores(); // Actualizar la visualización
            } else {
                // Si el usuario cancela, no iniciar el test y regresar al menú
                return;
            }
        }

    }
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const question = allQuestions[currentTheme][currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    quizAnswered = false;
    selectedOption = null;
    window.answerSubmitted = false;

    question.options.forEach((opt, i) => {
        const button = document.createElement('button');
        button.className = `option-button option-${opt.charAt(0).toLowerCase()}`;
        button.value = opt.charAt(0);

        // Crear estructura interna mejorada
        const contentDiv = document.createElement('div');
        contentDiv.style.cssText = 'display: flex; align-items: flex-start; gap: 15px; width: 100%;';

        const letterDiv = document.createElement('div');
        letterDiv.style.cssText = 'background: rgba(255,255,255,0.3); border-radius: 50%; width: 35px; height: 35px; min-width: 35px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: bold; flex-shrink: 0;';
        letterDiv.textContent = opt.charAt(0);

        const textDiv = document.createElement('div');
        textDiv.style.cssText = 'flex: 1; text-align: left; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto; line-height: 1.4;';
        textDiv.textContent = opt.substring(3);

        contentDiv.appendChild(letterDiv);
        contentDiv.appendChild(textDiv);
        button.appendChild(contentDiv);

        button.onclick = () => selectOption(button, opt.charAt(0));
        optionsContainer.appendChild(button);
    });

    // Resetear mensaje y botones
    document.getElementById('message').innerHTML = '';
    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('submit-btn').textContent = 'Enviar Respuesta';
}
function selectOption(button, value) {
    if (quizAnswered) return;

    // Remover selección anterior
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Seleccionar nueva opción
    button.classList.add('selected');
    selectedOption = value;
}

function checkAnswer() {
    if (quizAnswered) return;

    if (!selectedOption) {
        alert('Por favor, selecciona una respuesta.');
        return;
    }

    quizAnswered = true;
    window.answerSubmitted = true;

    // Deshabilitar todas las opciones
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.add('disabled');
    });

    const userData = getUserData();
    const correct = allQuestions[currentTheme][currentQuestionIndex].correct;
    const currentQuestion = allQuestions[currentTheme][currentQuestionIndex];
    const isCorrect = selectedOption === correct;

    // Registrar respuesta en estadísticas globales
    registerUserResponse(currentTheme, currentQuestionIndex, isCorrect);

    // Actualizar estadísticas del usuario
    const updates = {
        totalQuestions: (userData.totalQuestions || 0) + 1
    };

    if (isCorrect) {
        updates.scores = { ...userData.scores };
        updates.scores[currentTheme]++;
        updates.correctAnswers = (userData.correctAnswers || 0) + 1;

        document.getElementById('message').innerHTML = `
                    <div class="feedback correct">
                        <img src="bien.jpg" class="avatar" alt="Correcto" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;" />
                        <div class="text">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <span class="emoji">🎉</span>
                                <span class="correct-message">¡Correcto!</span>
                            </div>
                            <div><strong>Puntaje: ${updates.scores[currentTheme]}/10</strong></div>
                            <p style="margin-top: 10px;">${generateCorrectFeedback(currentQuestion, selectedOption)}</p>
                        </div>
                    </div>
                `;
        document.getElementById('message').className = 'quiz-message correct';
    } else {
        document.getElementById('message').innerHTML = `
                    <div class="feedback incorrect">
                        <img src="mal.jpg" class="avatar" alt="Incorrecto" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px;" />
                        <div class="text">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <span class="emoji">💥</span>
                                <span class="incorrect-message">¡Incorrecto!</span>
                            </div>
                            <div><strong>La respuesta correcta es: ${correct}</strong></div>
                            <p style="margin-top: 10px;">${generateIncorrectFeedback(currentQuestion, selectedOption, correct)}</p>
                        </div>
                    </div>
                `;
        document.getElementById('message').className = 'quiz-message incorrect';
    }

    updateUserData(updates);
    updateScores();

    // Cambiar botones
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
}


let globalStats = {
    'HTML': {
        correct: Array(allQuestions['HTML'].length).fill(0),
        incorrect: Array(allQuestions['HTML'].length).fill(0)
    },
    'CSS': {
        correct: Array(allQuestions['CSS'].length).fill(0),
        incorrect: Array(allQuestions['CSS'].length).fill(0)
    },
    'Condicionales': {
        correct: Array(allQuestions['Condicionales'].length).fill(0),
        incorrect: Array(allQuestions['Condicionales'].length).fill(0)
    },
    'While': {
        correct: Array(allQuestions['While'].length).fill(0),
        incorrect: Array(allQuestions['While'].length).fill(0)
    }
};

function registerUserResponse(theme, questionIndex, isCorrect) {
    // Cargar estadísticas globales
    const globalStats = loadGlobalStats();

    if (isCorrect) {
        globalStats[theme].correct[questionIndex]++;
    } else {
        globalStats[theme].incorrect[questionIndex]++;
    }
    globalStats[theme].total[questionIndex]++;

    // Guardar estadísticas actualizadas
    saveGlobalStats(globalStats);
}
// Cargar estadísticas globales desde localStorage
function loadGlobalStats() {
    const stored = localStorage.getItem('retotech_global_stats');
    if (stored) {
        return JSON.parse(stored);
    }

    // Inicializar estadísticas globales si no existen
    const initialStats = {};
    Object.keys(allQuestions).forEach(theme => {
        initialStats[theme] = {
            correct: Array(allQuestions[theme].length).fill(0),
            incorrect: Array(allQuestions[theme].length).fill(0),
            total: Array(allQuestions[theme].length).fill(0)
        };
    });

    return initialStats;
}

// Guardar estadísticas globales
function saveGlobalStats(stats) {
    localStorage.setItem('retotech_global_stats', JSON.stringify(stats));
}

// Registrar respuesta del usuario (reemplaza la función anterior)
function registerUserResponse(theme, questionIndex, isCorrect) {
    const globalStats = loadGlobalStats();

    if (isCorrect) {
        globalStats[theme].correct[questionIndex]++;
    } else {
        globalStats[theme].incorrect[questionIndex]++;
    }
    globalStats[theme].total[questionIndex]++;

    saveGlobalStats(globalStats);
}

// Mostrar estadísticas globales
function showGlobalStatistics() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';

    // Crear o mostrar la sección de estadísticas globales
    let globalStatsSection = document.getElementById('global-statistics');
    if (!globalStatsSection) {
        globalStatsSection = createGlobalStatisticsSection();
        document.body.appendChild(globalStatsSection);
    }

    globalStatsSection.style.display = 'block';
    updateGlobalStatisticsDisplay();
}

// Crear la sección HTML para estadísticas globales
function createGlobalStatisticsSection() {
    const section = document.createElement('div');
    section.id = 'global-statistics';
    section.className = 'statistics-section';
    section.style.display = 'none';

    section.innerHTML = `
        <div class="container">
            <h2 style="text-align: center; margin-bottom: 30px;">
                📊 Estadísticas Globales de Todos los Usuarios
            </h2>
            
            <div id="global-stats-content">
                <!-- Contenido dinámico -->
            </div>
        </div>
    `;

    return section;
}

// Actualizar el display de estadísticas globales
function updateGlobalStatisticsDisplay() {
    const globalStats = loadGlobalStats();
    const container = document.getElementById('global-stats-content');

    let html = '';

    // Crear estadísticas por tema
    Object.keys(allQuestions).forEach(theme => {
        const stats = globalStats[theme];
        const questions = allQuestions[theme];

        // Calcular promedio del tema
        const totalAnswers = stats.total.reduce((a, b) => a + b, 0);
        const totalCorrect = stats.correct.reduce((a, b) => a + b, 0);
        const themeAverage = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

        html += `
            <div class="theme-stats" style="margin-bottom: 40px; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                <h3 style="text-align: center; color: #059669; margin-bottom: 20px;">
                    🎯 ${theme} - Promedio General: ${themeAverage}%
                </h3>
                
                <div class="chart-container" style="margin-bottom: 20px;">
                    <canvas id="globalChart${theme}" width="400" height="200"></canvas>
                </div>
                
                <div class="questions-details">
                    <h4>📋 Detalle por Pregunta:</h4>
                    <div class="questions-grid" style="display: grid; gap: 10px;">
        `;

        questions.forEach((q, index) => {
            const correct = stats.correct[index];
            const incorrect = stats.incorrect[index];
            const total = stats.total[index];
            const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

            // Color basado en dificultad
            let difficultyColor = '#10b981'; // Verde (fácil)
            let difficultyText = 'Fácil';
            if (percentage < 70) {
                difficultyColor = '#f59e0b'; // Amarillo (medio)
                difficultyText = 'Medio';
            }
            if (percentage < 50) {
                difficultyColor = '#ef4444'; // Rojo (difícil)
                difficultyText = 'Difícil';
            }

            html += `
                <div class="question-stat" style="
                    background: white; 
                    border: 1px solid #e5e7eb; 
                    border-radius: 8px; 
                    padding: 15px; 
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                ">
                    <div style="font-weight: bold; color: #374151; margin-bottom: 8px;">
                        Pregunta ${index + 1}
                    </div>
                    <div style="font-size: 0.9em; color: #6b7280; margin-bottom: 10px;">
                        "${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}"
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="color: #10b981;">✓ ${correct}</span> | 
                            <span style="color: #ef4444;">✗ ${incorrect}</span>
                            <div style="font-size: 0.8em; color: #6b7280;">Total: ${total} respuestas</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.2em; font-weight: bold; color: ${difficultyColor};">
                                ${percentage}%
                            </div>
                            <div style="font-size: 0.8em; color: ${difficultyColor};">
                                ${difficultyText}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;
    });

    // Estadísticas generales
    const totalUsers = Object.keys(getStoredUsers()).length;
    const allStats = Object.values(globalStats);
    const overallTotal = allStats.reduce((sum, theme) =>
        sum + theme.total.reduce((a, b) => a + b, 0), 0);
    const overallCorrect = allStats.reduce((sum, theme) =>
        sum + theme.correct.reduce((a, b) => a + b, 0), 0);
    const overallAverage = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;

    html = `
        <div class="overall-stats" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 20px; 
            border-radius: 12px; 
            margin-bottom: 30px; 
            text-align: center;
        ">
            <h3>🌟 Resumen General</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 15px;">
                <div>
                    <div style="font-size: 2em; font-weight: bold;">${totalUsers}</div>
                    <div>Usuarios Registrados</div>
                </div>
                <div>
                    <div style="font-size: 2em; font-weight: bold;">${overallTotal}</div>
                    <div>Respuestas Totales</div>
                </div>
                <div>
                    <div style="font-size: 2em; font-weight: bold;">${overallAverage}%</div>
                    <div>Promedio Global</div>
                </div>
            </div>
        </div>
    ` + html;

    container.innerHTML = html;

    // Dibujar gráficos
    setTimeout(() => {
        Object.keys(allQuestions).forEach(theme => {
            drawGlobalChart(theme, globalStats[theme]);
        });
    }, 100);
}

// Dibujar gráfico global por tema
function drawGlobalChart(theme, stats) {
    const ctx = document.getElementById(`globalChart${theme}`);
    if (!ctx) return;

    if (ctx.chart) {
        ctx.chart.destroy();
    }

    const labels = Array.from({ length: stats.correct.length }, (_, i) => `P${i + 1}`);
    const percentages = stats.correct.map((correct, i) => {
        const total = stats.total[i];
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    });

    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '% de Respuestas Correctas',
                data: percentages,
                backgroundColor: percentages.map(p => {
                    if (p >= 70) return '#10b981'; // Verde
                    if (p >= 50) return '#f59e0b'; // Amarillo
                    return '#ef4444'; // Rojo
                }),
                borderColor: '#374151',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Dificultad de Preguntas - ${theme}`,
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Resetear estadísticas globales
function resetGlobalStats() {
    if (confirm('⚠️ ¿Estás seguro de que quieres borrar TODAS las estadísticas globales? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('retotech_global_stats');
        alert('✅ Estadísticas globales reseteadas correctamente.');
        updateGlobalStatisticsDisplay();
    }
}
function generateCorrectFeedback(question, selectedAnswer) {
    switch (question.question) {
        case '¿Qué significa HTML?':
            return 'HTML es el acrónimo de <strong>HyperText Markup Language</strong>, utilizado para estructurar las páginas web.';
        case '¿Cuál de estas es una etiqueta obligatoria en un documento HTML?':
            return 'La etiqueta <strong>&lt;html&gt;</strong> es necesaria para definir un documento HTML.';
        case '¿Qué etiqueta se usa para dividir bloques grandes en HTML?':
            return 'La etiqueta <strong>&lt;div&gt;</strong> se utiliza para dividir el contenido en bloques de una página web.';
        case '¿Qué atributo se usa para vincular una hoja CSS externa?':
            return 'El atributo <strong>href</strong> se usa en la etiqueta <strong>&lt;link&gt;</strong> para vincular una hoja de estilo CSS externa.';
        case '¿Cuál es la diferencia entre "id" y "class" en HTML?':
            return 'El atributo <strong>id</strong> es único para un solo elemento, mientras que <strong>class</strong> puede aplicarse a varios elementos.';
        case '¿Cuál representa una estructura válida de HTML5?':
            return 'La estructura válida de HTML5 incluye la declaración <strong>&lt;!DOCTYPE html&gt;</strong> para indicar el tipo de documento, seguido por <strong>&lt;html&gt;</strong>, <strong>&lt;head&gt;</strong> y <strong>&lt;body&gt;</strong>.';
        case '¿Qué etiqueta se usa para un enlace que diga "Estas visitando mi página"?':
            return 'La etiqueta correcta para crear un enlace es <strong>&lt;a href="..."&gt;Estas visitando mi página&lt;/a&gt;</strong>.';
        case '¿Cómo se inserta correctamente una imagen con texto alternativo?':
            return 'Para insertar una imagen con texto alternativo, se utiliza la etiqueta <strong>&lt;img src="img.jpg" alt="..."&gt;</strong>.';
        case '¿Qué opción crea una lista ordenada y un enlace a id="contacto"?':
            return 'La forma correcta de crear una lista ordenada y un enlace a un ID es usar <strong>&lt;ol&gt;</strong> para la lista y <strong>&lt;a href="#contacto"&gt;</strong> para el enlace.';
        case '¿Qué opción divide la página con clases y <div>?':
            return 'La respuesta correcta es usar <strong>&lt;div class="principal"&gt;...</div>&lt;div class="lateral"&gt;...</div></strong> para crear secciones en la página.';
        default:
            return '¡Bien hecho! Sigues aprendiendo y dominando los conceptos clave.';
    }
}

function generateIncorrectFeedback(question, selectedAnswer, correctAnswer) {
    switch (question.question) {
        case '¿Qué significa HTML?':
            return `La respuesta correcta es <strong>HyperText Markup Language (HTML)</strong>, utilizado para crear y estructurar páginas web.`;
        case '¿Cuál de estas es una etiqueta obligatoria en un documento HTML?':
            return `La respuesta correcta es <strong>&lt;html&gt;</strong>, que es la etiqueta principal de un documento HTML.`;
        case '¿Qué propiedad controla el espacio entre el borde y el contenido?':
            return `La respuesta correcta es <strong>padding</strong>, que define el espacio entre el contenido y el borde de un elemento.`;
        case '¿Qué hace break dentro de un bucle?':
            return `La respuesta correcta es que <strong>break</strong> interrumpe un bucle y lo detiene inmediatamente. Es muy útil para controlar flujos de ejecución.`;
        case '¿Qué significa CSS?':
            return `La respuesta correcta es <strong>Cascading Style Sheets</strong>. CSS se utiliza para definir la presentación de un documento HTML.`;
        case '¿Cómo se enlaza un archivo CSS externo correctamente?':
            return `La respuesta correcta es <strong>&lt;link rel="stylesheet" href="estilos.css"&gt;</strong>. Este enlace aplica el archivo CSS al HTML.`;
        case '¿Qué propiedad controla el espacio entre el borde y el contenido?':
            return `La respuesta correcta es <strong>padding</strong>, que controla el espacio entre el contenido y el borde de un elemento.`;
        default:
            return `La respuesta correcta es <strong>${correctAnswer}</strong>. Repasa los conceptos para mejorar en la siguiente prueba.`;
    }
}

function nextQuestion() {
    if (!window.answerSubmitted) {
        alert('Por favor, envía tu respuesta antes de continuar.');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= allQuestions[currentTheme].length) {
        const userData = getUserData();
        const finalScore = userData.scores[currentTheme];

        if (userStartTime) {
            const timeSpent = Math.floor((Date.now() - userStartTime) / 60000);
            updateUserData({
                totalTime: (userData.totalTime || 0) + timeSpent
            });
        }

        alert(`¡Terminaste ${currentTheme}! Puntaje final: ${finalScore}/10`);
        goBack();
    } else {
        displayQuestion();
        window.answerSubmitted = false;
    }
}


function updateScores() {
    const userData = getUserData();
    if (userData) {
        for (const tema in userData.scores) {
            const scoreElement = document.getElementById(`score-${tema}`);
            if (scoreElement) {
                scoreElement.innerText = `Puntaje: ${userData.scores[tema]}/10`;
            }
        }
    }
}


function goBack() {
    document.getElementById('quiz-section').style.display = 'none';
    showMainMenu();
}

function showMainMenu() {
    collapseNavbar();
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('statistics').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    // Ocultar estadísticas globales si existe
    const globalStats = document.getElementById('global-statistics');
    if (globalStats) {
        globalStats.style.display = 'none';
    }
}

function showStatistics() {
    const userData = getUserData();
    if (!userData) return;
    collapseNavbar();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('statistics').style.display = 'block';
    // Ocultar estadísticas globales si existe
    const globalStats = document.getElementById('global-statistics');
    if (globalStats) {
        globalStats.style.display = 'none';
    }
    // Actualizar estadísticas generales
    document.getElementById('totalQuestions').textContent = userData.totalQuestions || 0;
    const accuracy = userData.totalQuestions > 0 ?
        Math.round((userData.correctAnswers || 0) / userData.totalQuestions * 100) : 0;
    document.getElementById('overallAccuracy').textContent = accuracy + '%';
    document.getElementById('totalTime').textContent = (userData.totalTime || 0) + ' min';

    // Crear gráficos
    drawPie('chartHTML', 'HTML', userData.scores.HTML || 0);
    drawPie('chartCSS', 'CSS', userData.scores.CSS || 0);
    drawPie('chartCondicionales', 'Condicionales', userData.scores.Condicionales || 0);
    drawPie('chartWhile', 'While', userData.scores.While || 0);

    // Calcular mejor área
    const scores = userData.scores;
    const max = Math.max(...Object.values(scores));
    const best = Object.entries(scores).filter(e => e[1] === max).map(e => e[0]);
    document.getElementById('bestArea').innerText =
        max > 0 ? `🏆 Tu mejor área: ${best.join(', ')} (${max}/10)` : 'Aún no has completado ningún tema.';
}

function showLeaderboard() {
    collapseNavbar();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('statistics').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    // Ocultar estadísticas globales si existe
    const globalStats = document.getElementById('global-statistics');
    if (globalStats) {
        globalStats.style.display = 'none';
    }
    const users = getStoredUsers();
    const leaderboardData = Object.values(users)
        .map(user => ({
            username: user.username,
            totalScore: Object.values(user.scores).reduce((a, b) => a + b, 0),
            totalQuestions: user.totalQuestions || 0,
            accuracy: user.totalQuestions > 0 ?
                Math.round((user.correctAnswers || 0) / user.totalQuestions * 100) : 0
        }))
        .sort((a, b) => {
            if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
            return b.accuracy - a.accuracy;
        });

    const container = document.getElementById('leaderboardContent');
    container.innerHTML = '';

    if (leaderboardData.length === 0) {
        container.innerHTML = '<p class="text-center">No hay datos de ranking disponibles.</p>';
        return;
    }

    leaderboardData.forEach((user, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${index < 3 ? 'top-3' : ''}`;

        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

        item.innerHTML = `
          <div>
            <strong>${medal} ${index + 1}. ${user.username}</strong>
            <div style="font-size: 0.9em; color: #666;">
              ${user.totalQuestions} preguntas • ${user.accuracy}% precisión
            </div>
          </div>
          <div style="font-size: 1.2em; font-weight: bold; color: #059669;">
            ${user.totalScore}/40
          </div>
        `;
        container.appendChild(item);
    });
}

function drawPie(id, label, score) {
    const ctx = document.getElementById(id);
    if (ctx.chart) {
        ctx.chart.destroy();
    }

    ctx.chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correctas', 'Incorrectas'],
            datasets: [{
                label: label,
                data: [score, 10 - score],
                backgroundColor: ['#34d399', '#f87171'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${label} (${score}/10)`,
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Manejar el Enter en el campo de usuario
document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                loginUser();
            }
        });
    }
});
