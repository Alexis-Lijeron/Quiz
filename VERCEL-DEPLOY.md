# Guía de Despliegue en Vercel

## 📋 Pasos para Desplegar en Vercel

### 1. Preparar el proyecto ✅
- [x] Archivo `vercel.json` creado
- [x] `package.json` actualizado con scripts de build
- [x] `server.js` exporta la app Express

### 2. Configurar Variables de Entorno en Vercel

Debes agregar estas variables en el dashboard de Vercel:

```
DB_HOST=quiz-xd.f.aivencloud.com
DB_PORT=18069
DB_USER=avnadmin
DB_PASSWORD=AVNS_tMgiLqCP61idscGcMBw
DB_NAME=defaultdb
JWT_SECRET=mi_secreto_super_seguro_2024
```

### 3. Comandos para Desplegar

#### Opción A: Usando Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Desplegar
vercel --prod
```

#### Opción B: Desde GitHub
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### 4. URLs después del despliegue
- **Frontend**: `https://tu-proyecto.vercel.app`
- **API**: `https://tu-proyecto.vercel.app/api/login`
- **Dashboard**: `https://tu-proyecto.vercel.app/student-dashboard.html`

### 5. Configuraciones Importantes

#### Archivos estáticos
Vercel servirá automáticamente:
- `login.html`
- `student-dashboard.html` 
- `teacher-dashboard.html`
- `style.css`
- `script.js`
- Imágenes (bien.jpg, mal.jpg, principal.jpg)

#### Base de datos
- ✅ Aiven MySQL ya está configurado para conexiones externas
- ✅ Las credenciales están en variables de entorno
- ✅ No requiere configuración adicional

### 6. Verificar después del despliegue

1. **Login del docente**:
   - Email: franco.penarrieta@retotech.com
   - Contraseña: franco12345

2. **Registro de estudiantes**:
   - Los estudiantes pueden registrarse desde la interfaz

3. **APIs funcionando**:
   - POST /api/login
   - POST /api/register
   - GET /api/student/stats
   - Todas las rutas del quiz

### 7. Troubleshooting

#### Si hay errores de conexión:
- Verificar variables de entorno en Vercel Dashboard
- Revisar logs en Vercel Functions
- Confirmar que Aiven permite conexiones externas

#### Si las rutas no funcionan:
- Verificar que `vercel.json` está configurado correctamente
- Revisar que todas las rutas del API tienen prefijo `/api/`

#### Si los archivos estáticos no cargan:
- Verificar que están en la raíz del proyecto
- Confirmar que no hay conflictos en el routing

## 🚀 ¡Listo para Desplegar!

Tu proyecto está configurado para Vercel con:
- ✅ Base de datos en la nube (Aiven)
- ✅ Serverless functions para el backend
- ✅ Archivos estáticos optimizados
- ✅ Variables de entorno configuradas
- ✅ Rutas API funcionando