# 🏗️ Sanitarios & Materiales — App de Stock

App web para gestionar stock, armar presupuestos y enviarlos por WhatsApp/PDF.

---

## 🚀 Cómo configurar el flujo VS Code → GitHub → Netlify

### Paso 1: Instalar Git (si no lo tenés)
Descargá desde: https://git-scm.com/download/win  
Instalá con todas las opciones por defecto.

---

### Paso 2: Abrir el proyecto en VS Code
1. Abrí VS Code
2. Archivo → Abrir carpeta → seleccioná esta carpeta
3. Abrí la terminal integrada: **Ctrl + `** (acento grave)

---

### Paso 3: Inicializar Git y subir a GitHub

En la terminal de VS Code, ejecutá estos comandos **uno por uno**:

```bash
# Configurar tu nombre y email (solo la primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializar el repositorio
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Primer commit - App de stock"
```

Después:
1. Entrá a https://github.com y creá una cuenta (si no tenés)
2. Click en **"New repository"** (botón verde)
3. Nombre: `sanitarios-stock` (o el que quieras)
4. Dejalo **Public** o **Private** (cualquiera funciona con Netlify)
5. **NO** tildes "Add README" (ya tenemos uno)
6. Click en **"Create repository"**
7. GitHub te va a mostrar comandos — copiá y pegá los de la sección **"…or push an existing repository"**:

```bash
git remote add origin https://github.com/TU_USUARIO/sanitarios-stock.git
git branch -M main
git push -u origin main
```

---

### Paso 4: Conectar Netlify

1. Entrá a https://app.netlify.com y creá cuenta (podés entrar con GitHub)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Click en **"GitHub"** → autorizá Netlify
4. Buscá y seleccioná tu repo `sanitarios-stock`
5. En la configuración:
   - **Branch to deploy:** `main`
   - **Publish directory:** `.` (un punto, así tal cual)
   - Build command: dejar vacío
6. Click en **"Deploy site"**

¡Listo! En 1-2 minutos Netlify te da una URL tipo `https://nombre-random.netlify.app`

Podés cambiarle el nombre en: Site settings → General → Site name.

---

### ✅ Flujo de trabajo del día a día

Cada vez que modifiques algo en VS Code:

```bash
# Ver qué cambió
git status

# Agregar los cambios
git add .

# Guardar el cambio con un mensaje descriptivo
git commit -m "Actualicé precios / Agregué categoría / etc."

# Subir a GitHub (Netlify se actualiza automático)
git push
```

En 1-2 minutos Netlify detecta el push y actualiza la web automáticamente. 🎉

---

### 💡 Atajos útiles en VS Code

| Acción | Atajo |
|--------|-------|
| Abrir terminal | Ctrl + ` |
| Guardar archivo | Ctrl + S |
| Ver cambios de Git | Ctrl + Shift + G |
| Buscar en archivos | Ctrl + Shift + F |

También podés hacer commit desde la interfaz gráfica de VS Code:
- Click en el ícono de Git (barra lateral izquierda, el que tiene ramitas)
- Escribí el mensaje y hacé click en ✓

---

### 🔧 Solución a problemas comunes

**"git no se reconoce como comando"**  
→ Cerrá y volvé a abrir VS Code después de instalar Git.

**Te pide usuario y contraseña al hacer push**  
→ GitHub ya no acepta contraseñas. Usá un **Personal Access Token**:  
GitHub → Settings → Developer Settings → Personal Access Tokens → Generate new token  
Copialo y usalo como contraseña cuando te lo pida.

**Netlify no se actualiza**  
→ Verificá en el dashboard de Netlify que el deploy esté en verde. Si hay error, click en el deploy fallido para ver el log.
