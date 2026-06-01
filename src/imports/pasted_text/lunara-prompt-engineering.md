# Prompt de Ingeniería de Prompts (Prompt Engineering) para Figma / Vibe Coding

## Proyecto: Lunara (UI/UX Web)

### 📋 Descripción General del Proyecto
Crea una interfaz de usuario web (UI) completa y de alta fidelidad para **Lunara**, una plataforma digital empática, segura y confidencial diseñada para la concientización y detección temprana de señales de violencia psicológica y digital (VBGFT - Violencia Basada en Género Facilitada por la Tecnología). El enfoque de la inteligencia artificial debe ser extremadamente sutil (el texto "AI" no debe destacar en absoluto, priorizando la marca humana y protectora).

---

### 🎨 Guía de Estilo Visual & "Vibe"
- **Tono Emocional:** Seguro, libre de juicios, compasivo, limpio, profesional, confidencial.
- **Paleta de Colores (Muted & Soft):**
  - Fondo Principal: Blanco crema suave (`#FDFBF9`) o Lavanda extra claro (`#F4F1FA`).
  - Colores de Acento/Primarios: Lavanda (`#9D8DF1`), Violeta Suave (`#B3A5FF`), Morado Grisáceo (`#5E5473`).
  - Textos: Morado grisáceo muy oscuro (`#2F293A`) para evitar la agresividad del negro puro.
- **Tipografía:** Sans-serif geométrica moderna y limpia (ej. *Plus Jakarta Sans*, *Inter* o *Poppins*). Tamaños proporcionales para lectura fluida (H1: 32pt, H2: 20pt, H3: 16pt, Body: 11pt).
- **Estilo de Layout:** Minimalista, con amplios espacios en blanco (*breathable UI*), bordes muy redondeados (*radius: 16px* a *24px*) y sombras difuminadas casi imperceptibles (*soft shadows*).

---

### 🌐 Estructura Global: Navbar (Navegación)
- **Diseño:** Barra superior flotante o fija con fondo translúcido (Glassmorphism sutil).
- **Alineación:** Flex horizontal con distribución de extremos (`space-between`).
- **Izquierda (Logo & Marca):** - **Isotipo:** Un imagotipo minimalista donde una luna creciente estilizada abraza de forma orgánica el borde izquierdo e inferior de una burbuja de conversación (burbuja de chat).
  - **Logotipo:** Al lado del isotipo, el texto **"Lunara"** en tipografía elegante, peso *Medium/Bold*. *(Nota: El término AI no debe aparecer ni destacar en el branding visual)*.
- **Derecha (Menú):** Una pestaña/enlace destacado sutilmente que diga **"Red de Apoyo"** (con un ícono de un corazón o un escudo de protección).

---

### 🏠 Estructura de Páginas

#### PÁGINA 1: PÁGINA PRINCIPAL (Landing de Concientización)

##### 1. Hero Section (Sección Principal)
- **Disposición:** Centrada vertical y horizontalmente con amplio padding superior.
- **Título (H1):** "Lunara"
- **Subtítulo (H3):** "Ver las señales también es cuidarte." *(Color morado grisáceo de contraste medio)*.
- **Botón de Acción Principal (CTA):** Grande, con bordes redondeados, fondo violeta suave y texto en blanco: **"Revisar conversación"**. Al pasar el cursor (hover), debe transicionar suavemente a un lavanda más intenso.
- **Caja de Contexto (Card de Contención):** Situada justo debajo del botón. Un contenedor suave con fondo lavanda ultra-translúcido (10% opacidad). 
  - **Texto Interno:** *"Sentirte constantemente culpable, vigilada, menospreciada o con miedo de “hacer enojar” a alguien no debería ser normal. Entender lo que ocurre también es una forma de cuidarte."*

##### 2. Sección de Evidencia (Tarjetas de Datos Informativos)
- **Disposición:** Grid de 2 columnas (2 tarjetas por fila). Configurar para animación de aparición progresiva (*fade-in up*) al hacer scroll.
- **Estilo de Tarjeta:** Fondo blanco puro (`#FFFFFF`), bordes redondeados (16px), línea de borde ultrafina color lavanda y sombra muy suave.
- **Contenido de las Tarjetas (Métricas clave sin tono alarmista):**
  1. **Falta de Protección Legal:** Cerca del 50% de las mujeres y niñas a nivel mundial carecen de una protección jurídica específica frente al abuso digital, lo que invisibiliza estas conductas en el sistema. *(Fuente: ONU Mujeres, 2025)*
  2. **Prevalencia en Parejas (VBGFT):** En contextos de violencia doméstica, hasta un 98% de los casos documentados incluyen dinámicas tecnológicas como el rastreo o el envío masivo de mensajes. *(Fuente: eSafety Commissioner / NNEDV)*
  3. **Impacto en la Adolescencia:** 1 de cada 3 adolescentes ha reportado ser víctima de conductas de control a través de sus redes sociales, normalizando dinámicas tóxicas a temprana edad. *(Fuente: UNICEF / Red.es)*
  4. **Vector de Ataque (Coerción):** Los reportes globales muestran un incremento masivo en casos de extorsión y coerción digital, confirmando al mensaje de texto como la vía principal para estas prácticas. *(Fuente: CyberTipline - NCMEC)*

---

#### PÁGINA 2: INTERFAZ DE ANÁLISIS (Flujo tras Clic en CTA)

Esta pantalla se activa inmediatamente después de que el usuario presiona el botón **"Revisar conversación"**.

##### Estado A: Subida de Archivo (Upload Dropzone)
- **Diseño Central:** Un contenedor rectangular grande con bordes punteados (dashed) en tono morado grisáceo. 
- **Elementos Internos:** Ícono minimalista de carga/documento, seguido del texto: *"Sube o arrastra tu archivo de chat aquí (.txt)"*.
- **Estado de Error Dinámico (Validación):** Si el usuario intenta subir un formato incorrecto (ej. .pdf, .jpg), el contenedor cambia a un borde rojo pastel/naranja suave y despliega el mensaje: **"¡Ups! Te has equivocado en el formato. Recuerda que debe ser un archivo de texto plano (.txt)"**.
- **Botón de Ejecución:** Botón secundario centrado que dice **"Analizar"**. Se mantiene deshabilitado (opacidad 40%, cursor no-allowed) hasta que un archivo `.txt` válido sea detectado.

##### Estado B: Pantalla de Carga (Loading State - Aprox. 5s)
- **Diseño:** Remueve el dropzone y muestra una animación de carga fluida (un spinner circular sutil en tono violeta suave o un esqueleto de carga / skeleton loader).
- **Texto de Estado:** *"Analizando la conversación de manera completamente segura y confidencial..."*

##### Estado C: Visualización de Resultados
- **1. Badge de Nivel de Riesgo:** En la parte superior del módulo de resultados, un indicador visual claro pero no estresante. El color del fondo del badge se adapta según el resultado devuelto:
  - `Sin señales relevantes` *(Fondo verde menta suave)*
  - `Señales leves` *(Fondo amarillo pastel)*
  - `Señales importantes` *(Fondo naranja claro)*
  - `Señales preocupantes` *(Fondo ocre/rosa viejo oscuro)*
  - `Necesita atención inmediata` *(Fondo rojo suave/terracota apagado)*
- **2. Encabezado de Hallazgos:** Texto descriptivo intermedio: *"Estos son algunos mensajes detectados que consideramos que podrían ser relevantes:"*
- **3. Bloques de Mensajes Seleccionados (Máximo 5 ítems):**
  - Cada ítem emula una burbuja de chat en gris claro (`#F0EDE9`) alineada a la izquierda, simulando el mensaje recibido (Ejemplo de UI: *"A mi q me importa q esté mal tu te quedai en la casa porque yo quiero"*).
  - Justo debajo de la burbuja, un bloque explicativo con tipografía regular, color morado grisáceo y un sutil icono informativo (ℹ️): *"Este mensaje podría reflejar un intento de control sobre tus decisiones individuales y una baja consideración por tu bienestar emocional."*
- **4. Acceso Directo de Emergencia:** Un botón de llamada a la acción destacado en la parte inferior de los resultados: **"Consultar Red de Apoyo"**.

---

### 🚨 Sección Especial: Modal / Panel Lateral "Red de Apoyo"
Al hacer clic en "Red de Apoyo" desde cualquier pantalla, se despliega un panel lateral derecho (Slide-over) limpio y accesible con información de utilidad (Focalizado en Chile, expandible):
- **📞 Fono 149:** Prevención y apoyo en Violencia Intrafamiliar (Carabineros de Chile).
- **📞 Fono 1455:** Fono de orientación y guía en violencias de género (Sernameg).
- **💬 +56 9 9700 7000:** Canal de WhatsApp Silencioso (Asistencia discreta y segura).
- **⚖️ Fiscalía:** 600 333 0000 (Denuncias y orientación legal).
- **🌐 Portales Institucionales:**
  - [minmujeryeg.gob.cl](https://minmujeryeg.gob.cl) — Ministerio de la Mujer y la Equidad de Género.
  - [nomasviolenciacontramujeres.cl](http://nomasviolenciacontramujeres.cl) — Red Chilena contra la Violencia hacia las Mujeres.

---

### 🔒 Pie de Página, Cláusulas de Privacidad y Descargos éticos (Footers)
En el fondo de la pantalla de resultados, en tipografía muy pequeña (9pt a 10pt) y color gris neutro atenuado, incluir obligatoriamente los siguientes textos profesionalizados:

1. **Garantía de Confidencialidad y Privacidad:**
   *“🔒 **Compromiso de Privacidad Absoluta:** Su archivo se procesa de manera estrictamente local, automatizada y confidencial. Lunara no almacena, registra, comparte ni utiliza sus conversaciones bajo ninguna circunstancia. Toda la información es eliminada permanentemente de la memoria del navegador en el instante en que usted cierra o abandona esta página web.”*

2. **Descargo de Responsabilidad y Limitación de la Herramienta:**
   *“⚠️ **Nota de Orientación Informativa:** Lunara es un recurso tecnológico automatizado de carácter estrictamente preventivo e informativo. Esta herramienta no es un ser humano, no constituye un diagnóstico psicológico ni legal, ni reemplaza el criterio de un especialista. Le recomendamos encarecidamente tomar estos resultados únicamente como una sugerencia inicial y acudir a nuestra Red de Apoyo para recibir acompañamiento y guía profesional.”*