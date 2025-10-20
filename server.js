const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Función para crear conexión a la BD
async function createConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        throw error;
    }
}

// Middleware para verificar JWT
const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

// Middleware para verificar rol de docente
const verifyTeacher = (req, res, next) => {
    if (req.user.role !== 'docente') {
        return res.status(403).json({ error: 'Acceso denegado. Solo docentes.' });
    }
    next();
};

// RUTAS DE AUTENTICACIÓN

// Registro de usuarios
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, role, curso } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar que solo se permita registro de estudiantes
        if (role !== 'estudiante') {
            return res.status(403).json({ error: 'Solo se permite el registro de estudiantes' });
        }

        const connection = await createConnection();

        // Verificar si el usuario ya existe
        const [existingUsers] = await connection.execute(
            'SELECT id FROM usuarios WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.length > 0) {
            await connection.end();
            return res.status(400).json({ error: 'Usuario o email ya existe' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario
        const [result] = await connection.execute(
            'INSERT INTO usuarios (username, email, password, role, curso, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [username, email, hashedPassword, role, curso || null]
        );

        await connection.end();

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Login de usuarios
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const connection = await createConnection();

        // Buscar usuario
        const [users] = await connection.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            await connection.end();
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = users[0];

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            await connection.end();
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar JWT
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
                curso: user.curso
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        await connection.end();

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                curso: user.curso
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS DEL QUIZ (ESTUDIANTES)

// Guardar respuesta de estudiante
app.post('/api/quiz/answer', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'estudiante') {
            return res.status(403).json({ error: 'Solo estudiantes pueden responder quiz' });
        }

        const { tema, pregunta_numero, respuesta_seleccionada, es_correcta, tiempo_respuesta } = req.body;

        const connection = await createConnection();

        // Verificar si ya respondió esta pregunta
        const [existing] = await connection.execute(
            'SELECT id FROM respuestas WHERE usuario_id = ? AND tema = ? AND pregunta_numero = ?',
            [req.user.id, tema, pregunta_numero]
        );

        if (existing.length > 0) {
            // Actualizar respuesta existente
            await connection.execute(
                'UPDATE respuestas SET respuesta_seleccionada = ?, es_correcta = ?, tiempo_respuesta = ?, fecha_respuesta = NOW() WHERE usuario_id = ? AND tema = ? AND pregunta_numero = ?',
                [respuesta_seleccionada, es_correcta, tiempo_respuesta, req.user.id, tema, pregunta_numero]
            );
        } else {
            // Insertar nueva respuesta
            await connection.execute(
                'INSERT INTO respuestas (usuario_id, tema, pregunta_numero, respuesta_seleccionada, es_correcta, tiempo_respuesta, fecha_respuesta) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                [req.user.id, tema, pregunta_numero, respuesta_seleccionada, es_correcta, tiempo_respuesta]
            );
        }

        await connection.end();
        res.json({ message: 'Respuesta guardada exitosamente' });

    } catch (error) {
        console.error('Error guardando respuesta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener estadísticas del estudiante
app.get('/api/student/stats', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'estudiante') {
            return res.status(403).json({ error: 'Solo estudiantes pueden ver estas estadísticas' });
        }

        const connection = await createConnection();

        // Obtener estadísticas por tema
        const [stats] = await connection.execute(`
            SELECT 
                tema,
                COUNT(*) as total_preguntas,
                SUM(es_correcta) as respuestas_correctas,
                AVG(tiempo_respuesta) as tiempo_promedio,
                MAX(fecha_respuesta) as ultima_respuesta
            FROM respuestas 
            WHERE usuario_id = ?
            GROUP BY tema
        `, [req.user.id]);

        await connection.end();
        res.json(stats);

    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// RUTAS PARA DOCENTES

// Obtener cursos disponibles
app.get('/api/teacher/courses', verifyToken, verifyTeacher, async (req, res) => {
    try {
        const connection = await createConnection();

        const [courses] = await connection.execute(`
            SELECT DISTINCT curso 
            FROM usuarios 
            WHERE role = 'estudiante' AND curso IS NOT NULL
            ORDER BY curso
        `);

        await connection.end();
        res.json(courses.map(c => c.curso));

    } catch (error) {
        console.error('Error obteniendo cursos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener estadísticas del curso
app.get('/api/teacher/course-stats/:course', verifyToken, verifyTeacher, async (req, res) => {
    try {
        const { course } = req.params;
        const connection = await createConnection();

        // Estadísticas generales del curso
        const [generalStats] = await connection.execute(`
            SELECT 
                COUNT(DISTINCT u.id) as total_estudiantes,
                COUNT(DISTINCT CASE WHEN r.id IS NOT NULL THEN u.id END) as estudiantes_activos,
                COUNT(r.id) as total_respuestas,
                AVG(CASE WHEN r.es_correcta = 1 THEN 1 ELSE 0 END) * 100 as promedio_aciertos
            FROM usuarios u
            LEFT JOIN respuestas r ON u.id = r.usuario_id
            WHERE u.curso = ? AND u.role = 'estudiante'
        `, [course]);

        // Estadísticas por tema
        const [themeStats] = await connection.execute(`
            SELECT 
                r.tema,
                COUNT(DISTINCT r.usuario_id) as estudiantes_participantes,
                COUNT(r.id) as total_respuestas,
                SUM(r.es_correcta) as respuestas_correctas,
                AVG(r.tiempo_respuesta) as tiempo_promedio
            FROM respuestas r
            JOIN usuarios u ON r.usuario_id = u.id
            WHERE u.curso = ? AND u.role = 'estudiante'
            GROUP BY r.tema
        `, [course]);

        // Estadísticas por estudiante
        const [studentStats] = await connection.execute(`
            SELECT 
                u.id,
                u.username,
                u.email,
                COUNT(r.id) as total_respuestas,
                SUM(r.es_correcta) as respuestas_correctas,
                AVG(r.tiempo_respuesta) as tiempo_promedio,
                MAX(r.fecha_respuesta) as ultima_actividad
            FROM usuarios u
            LEFT JOIN respuestas r ON u.id = r.usuario_id
            WHERE u.curso = ? AND u.role = 'estudiante'
            GROUP BY u.id, u.username, u.email
            ORDER BY respuestas_correctas DESC
        `, [course]);

        await connection.end();

        res.json({
            general: generalStats[0],
            byTheme: themeStats,
            byStudent: studentStats
        });

    } catch (error) {
        console.error('Error obteniendo estadísticas del curso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener respuestas detalladas de un estudiante
app.get('/api/teacher/student-details/:studentId', verifyToken, verifyTeacher, async (req, res) => {
    try {
        const { studentId } = req.params;
        const connection = await createConnection();

        // Información del estudiante
        const [studentInfo] = await connection.execute(`
            SELECT id, username, email, curso, created_at
            FROM usuarios 
            WHERE id = ? AND role = 'estudiante'
        `, [studentId]);

        if (studentInfo.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        // Todas las respuestas del estudiante
        const [answers] = await connection.execute(`
            SELECT 
                tema, 
                pregunta_numero, 
                respuesta_seleccionada, 
                es_correcta, 
                tiempo_respuesta, 
                fecha_respuesta
            FROM respuestas 
            WHERE usuario_id = ?
            ORDER BY tema, pregunta_numero
        `, [studentId]);

        await connection.end();

        res.json({
            student: studentInfo[0],
            answers: answers
        });

    } catch (error) {
        console.error('Error obteniendo detalles del estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Rutas específicas para archivos HTML
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/student-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student-dashboard.html'));
});

app.get('/teacher-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'teacher-dashboard.html'));
});

// Ruta para servir la página principal - redirigir a login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Inicializar servidor
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log('📚 RetoTech Quiz System iniciado correctamente');
    });
}

module.exports = app;