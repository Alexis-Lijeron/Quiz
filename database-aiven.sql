-- Script de creación de tablas para RetoTech Quiz en Aiven Cloud
-- Ejecutar este script conectado a la base de datos defaultdb en Aiven
-- 
-- CONFIGURACIÓN LIMPIA: Solo incluye el usuario docente
-- Los estudiantes se registrarán mediante la interfaz web
--
-- NOTA: En Aiven usamos la base de datos 'defaultdb' ya existente
-- No necesitamos crear la base de datos, solo las tablas
-- Tabla de usuarios (estudiantes y docentes)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('estudiante', 'docente') NOT NULL,
    curso VARCHAR(50) NULL,
    -- Solo para estudiantes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role (role),
    INDEX idx_curso (curso),
    INDEX idx_email (email)
);

-- Tabla de respuestas de los estudiantes
CREATE TABLE IF NOT EXISTS respuestas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tema VARCHAR(50) NOT NULL,
    -- HTML, CSS, Condicionales, While
    pregunta_numero INT NOT NULL,
    -- 0-9 (índice de la pregunta)
    respuesta_seleccionada CHAR(1) NOT NULL,
    -- A, B, C, D
    es_correcta BOOLEAN NOT NULL,
    tiempo_respuesta INT DEFAULT NULL,
    -- tiempo en segundos
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_answer (usuario_id, tema, pregunta_numero),
    INDEX idx_usuario_tema (usuario_id, tema),
    INDEX idx_tema (tema),
    INDEX idx_fecha (fecha_respuesta)
);

-- Tabla de estadísticas globales por pregunta (opcional, para análisis)
CREATE TABLE IF NOT EXISTS estadisticas_preguntas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tema VARCHAR(50) NOT NULL,
    pregunta_numero INT NOT NULL,
    total_respuestas INT DEFAULT 0,
    respuestas_correctas INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_question_stat (tema, pregunta_numero),
    INDEX idx_tema (tema)
);

-- Insertar datos iniciales (solo si no existen)
-- Crear docente (con contraseña hasheada para 'franco12345')
INSERT
    IGNORE INTO usuarios (username, email, password, role)
VALUES
    (
        'Franco_Peñarrieta',
        'franco.penarrieta@retotech.com',
        '$2a$10$PgG5jgPiXygGKTk6c.wpD.RlLV67ptHJBwdJ3LDfQ99uy2pRJ8TKq',
        'docente'
    );

-- Inicializar estadísticas de preguntas (solo si no existen)
INSERT
    IGNORE INTO estadisticas_preguntas (
        tema,
        pregunta_numero,
        total_respuestas,
        respuestas_correctas
    )
VALUES
    -- HTML
    ('HTML', 0, 0, 0),
    ('HTML', 1, 0, 0),
    ('HTML', 2, 0, 0),
    ('HTML', 3, 0, 0),
    ('HTML', 4, 0, 0),
    ('HTML', 5, 0, 0),
    ('HTML', 6, 0, 0),
    ('HTML', 7, 0, 0),
    ('HTML', 8, 0, 0),
    ('HTML', 9, 0, 0),
    -- CSS
    ('CSS', 0, 0, 0),
    ('CSS', 1, 0, 0),
    ('CSS', 2, 0, 0),
    ('CSS', 3, 0, 0),
    ('CSS', 4, 0, 0),
    ('CSS', 5, 0, 0),
    ('CSS', 6, 0, 0),
    ('CSS', 7, 0, 0),
    ('CSS', 8, 0, 0),
    ('CSS', 9, 0, 0),
    -- Condicionales
    ('Condicionales', 0, 0, 0),
    ('Condicionales', 1, 0, 0),
    ('Condicionales', 2, 0, 0),
    ('Condicionales', 3, 0, 0),
    ('Condicionales', 4, 0, 0),
    ('Condicionales', 5, 0, 0),
    ('Condicionales', 6, 0, 0),
    ('Condicionales', 7, 0, 0),
    ('Condicionales', 8, 0, 0),
    ('Condicionales', 9, 0, 0),
    -- While
    ('While', 0, 0, 0),
    ('While', 1, 0, 0),
    ('While', 2, 0, 0),
    ('While', 3, 0, 0),
    ('While', 4, 0, 0),
    ('While', 5, 0, 0),
    ('While', 6, 0, 0),
    ('While', 7, 0, 0),
    ('While', 8, 0, 0),
    ('While', 9, 0, 0);

-- Vistas útiles para consultas
-- Vista de rendimiento por estudiante
CREATE
OR REPLACE VIEW vista_rendimiento_estudiantes AS
SELECT
    u.id,
    u.username,
    u.email,
    u.curso,
    r.tema,
    COUNT(r.id) as total_preguntas_respondidas,
    SUM(r.es_correcta) as respuestas_correctas,
    ROUND((SUM(r.es_correcta) / COUNT(r.id)) * 100, 2) as porcentaje_acierto,
    AVG(r.tiempo_respuesta) as tiempo_promedio_segundos,
    MAX(r.fecha_respuesta) as ultima_actividad
FROM
    usuarios u
    LEFT JOIN respuestas r ON u.id = r.usuario_id
WHERE
    u.role = 'estudiante'
GROUP BY
    u.id,
    u.username,
    u.email,
    u.curso,
    r.tema;

-- Vista de estadísticas por curso
CREATE
OR REPLACE VIEW vista_estadisticas_curso AS
SELECT
    u.curso,
    r.tema,
    COUNT(DISTINCT u.id) as estudiantes_participantes,
    COUNT(r.id) as total_respuestas,
    SUM(r.es_correcta) as respuestas_correctas,
    ROUND((SUM(r.es_correcta) / COUNT(r.id)) * 100, 2) as porcentaje_acierto_curso,
    AVG(r.tiempo_respuesta) as tiempo_promedio_curso
FROM
    usuarios u
    LEFT JOIN respuestas r ON u.id = r.usuario_id
WHERE
    u.role = 'estudiante'
    AND u.curso IS NOT NULL
GROUP BY
    u.curso,
    r.tema;

-- Mostrar información de las tablas creadas
SHOW TABLES;

-- Verificar que el docente fue creado correctamente
SELECT
    id,
    username,
    email,
    role
FROM
    usuarios
WHERE
    role = 'docente';