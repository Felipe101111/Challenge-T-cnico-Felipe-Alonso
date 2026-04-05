# Challenge Técnico — JuegoContador

Comparativa de desarrollo con asistencia de IA vs. desarrollo manual, utilizando dos modelos distintos: **ChatGPT (GPT-4o)** y **Claude (Sonnet 4.6)**.

---

## Índice

1. [Descripción del ejercicio](#descripción-del-ejercicio)
2. [Desarrollo manual vs. con IA](#desarrollo-manual-vs-con-ia)
3. [Prompts utilizados](#prompts-utilizados)
4. [Resultados por modelo](#resultados-por-modelo)
5. [Comparativa entre modelos](#comparativa-entre-modelos)
6. [Conclusiones](#conclusiones)
7. [Cómo correr el proyecto localmente](#cómo-correr-el-proyecto-localmente)

---

## Descripción del ejercicio

El objetivo fue desarrollar en React una app llamada **JuegoContador**: un juego simple en el que el usuario intenta hacer la mayor cantidad de clicks posible en un botón durante 5 segundos.

**Requisitos funcionales:**
- Dos botones: uno para iniciar el juego y otro para clickear
- Indicador de puntaje máximo (inicia en 0)
- Cuenta regresiva con los mensajes "Preparados", "Listos" y "Ya" al presionar Iniciar
- Al aparecer "Ya", el botón de click se habilita por 5 segundos
- Durante el juego se muestra el tiempo restante y el contador actual
- Al terminar: se deshabilita el click, se habilita Iniciar y se actualiza el puntaje máximo si fue superado

---

## Desarrollo manual vs. con IA

### Hacerlo a mano

Hacer este ejercicio sin asistencia de IA requeria de saber cosas previas:

- **React Hooks**: entender `useState`, `useEffect` y `useRef`, y cuándo usar cada uno
- **Manejo de timers**: coordinar múltiples `setTimeout` y `setInterval`, y limpiarlos correctamente para evitar memory leaks
- **Closures en JavaScript**: uno de los bugs más frecuentes en este tipo de ejercicios es que el `setInterval` captura el valor del estado en el momento en que fue creado, lo que hace que siempre lea el valor inicial y no el actualizado
- **Sincronización de estados**: manejar correctamente la habilitación/deshabilitación de botones en función de la fase del juego

El tiempo estimado para alguien con conocimiento intermedio de React sería de **1 a 2 horas**, incluyendo debugging. Para alguien que está aprendiendo, puede extenderse considerablemente más, especialmente al encontrarse con el problema de los closures o con efectos secundarios no controlados al reiniciar el juego.

### Usando IA

Con IA el proceso se redujo a redactar un prompt claro con los requisitos del ejercicio. La IA generó el código completo en segundos, incluyendo la estructura de carpetas, todos los archivos necesarios y el README. El tiempo total fue de **menos de 2 minutos**.

La diferencia de dificultad es muy marcada: no es necesario recordar la sintaxis, resolver bugs de closures ni pensar en la limpieza de timers. Sin embargo, sí es necesario **saber leer y evaluar el código generado** para detectar si cumple los requisitos o si introduce errores sutiles.

---

## Prompts utilizados

### Prompt enviado a Claude

> Resumen Desarrollar en React un juego muy simple en el que los usuarios puedan competir contra sí mismos intentando clickear la mayor cantidad de veces posible un botón durante 5 segundos. Descripción del ejercicio Crear una App web en React llamada "JuegoContador" que muestre en todo momento: • Dos botones: uno para iniciar el juego y otro para clickear durante el mismo • Un indicador de puntaje máximo iniciado en 0 Al presionar el botón de inicio, dicho botón debe deshabilitarse y el componente debe mostrar una cuenta regresiva visual con los mensajes "Preparados","Listos" y "Ya" en intervalos de 1 segundo. Al mostrarse el "Ya", el botón para clickear debe habilitarse durante 5 segundos, permitiendo al usuario clickear tantas veces como desee. El usuario debe poder ver durante el juego el tiempo restante disponible para clickear el botón y el contador actual. Concluido el tiempo, el botón para clickear debe deshabilitarse, el botón para iniciar debe habilitarse nuevamente y, en caso de que se haya superado el puntaje máximo, el valor mostrado debe cambiar por el actual. Requisitos 1. Crea una App web en React llamada "JuegoContador". 2. Incluir los estados internos necesarios para cumplir con la funcionalidad detallada. 3. Definir una distribución de elementos en la pantalla simple y funcional. 4. Resolver la necesidad utilizando componentes funcionales. 5. Mostrar la información solicitada con los elementos HTML que considere más apropiados según el caso. 6. Puedes utilizar una librería de componentes (como MUI) si lo consideras útil y simplifica la tarea. 7. Puedes agregar estilos o elementos visuales adicionales para hacer el juego de contador más atractivo. 8. Entregar el código en un repositorio de GitHub público. Se deberá incluir un README con instrucciones precisas y claras sobre cómo correr la solución en un entorno local. 9. Se evaluará la prolijidad del código, su mantenibilidad y el uso de buenas prácticas de programación.

### Prompt enviado a ChatGPT

> Resumen Desarrollar en React un juego muy simple en el que los usuarios puedan competir contra sí mismos intentando clickear la mayor cantidad de veces posible un botón durante 5 segundos. Descripción del ejercicio Crear una App web en React llamada "JuegoContador" que muestre en todo momento: • Dos botones: uno para iniciar el juego y otro para clickear durante el mismo • Un indicador de puntaje máximo iniciado en 0 Al presionar el botón de inicio, dicho botón debe deshabilitarse y el componente debe mostrar una cuenta regresiva visual con los mensajes "Preparados","Listos" y "Ya" en intervalos de 1 segundo. Al mostrarse el "Ya", el botón para clickear debe habilitarse durante 5 segundos, permitiendo al usuario clickear tantas veces como desee. El usuario debe poder ver durante el juego el tiempo restante disponible para clickear el botón y el contador actual. Concluido el tiempo, el botón para clickear debe deshabilitarse, el botón para iniciar debe habilitarse nuevamente y, en caso de que se haya superado el puntaje máximo, el valor mostrado debe cambiar por el actual. Requisitos 1. Crea una App web en React llamada "JuegoContador". 2. Incluir los estados internos necesarios para cumplir con la funcionalidad detallada. 3. Definir una distribución de elementos en la pantalla simple y funcional. 4. Resolver la necesidad utilizando componentes funcionales. 5. Mostrar la información solicitada con los elementos HTML que considere más apropiados según el caso. 6. Puedes utilizar una librería de componentes (como MUI) si lo consideras útil y simplifica la tarea. 7. Puedes agregar estilos o elementos visuales adicionales para hacer el juego de contador más atractivo. 8. Entregar el código en un repositorio de GitHub público. Se deberá incluir un README con instrucciones precisas y claras sobre cómo correr la solución en un entorno local. 9. Se evaluará la prolijidad del código, su mantenibilidad y el uso de buenas prácticas de programación.  **quiero que crees el codigo para este proyecto, todo el codigo quiero que este dentro de una carpeta para que yo pueda subirla directamente al github.**

---

## Resultados por modelo

### ChatGPT — GPT-4o

ChatGPT devolvió el código **en formato de texto plano**, archivo por archivo, sin organizarlos en una estructura de carpetas descargable. El código es funcional y está bien estructurado, pero requirió trabajo adicional para crear los archivos manualmente y respetar la jerarquía de carpetas correcta (`src/`, raíz del proyecto, etc.).

**Archivos generados:** `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles.css`

**Enfoque técnico:**
- Toda la lógica en un único componente `App.jsx`
- Uso de `useEffect` para controlar el temporizador, con `canClick` y `timeLeft` como dependencias
- Estilos en un archivo CSS separado (`styles.css`)
- El contador de clicks usa `setCount((prev) => prev + 1)`, lo que es correcto para actualizaciones de estado reactivas


---

### Claude — Sonnet 4.6

Claude entregó el código **organizado en archivos descargables directamente**, respetando la estructura de carpetas del proyecto. Además incluyó una preview interactiva del juego dentro del chat para poder probarlo antes de descargarlo.

**Archivos generados:** `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/JuegoContador.jsx`

**Enfoque técnico:**
- Lógica del juego separada en su propio componente `JuegoContador.jsx`, con `App.jsx` únicamente como punto de entrada
- Uso de `useRef` para el contador (`countRef`) como solución explícita al problema de closures en `setInterval`
- Todos los timers registrados en un array `timersRef` para limpiarlos de forma centralizada con `clearTimers()`
- Estado `phase` (`idle | countdown | playing | finished`) como única fuente de verdad para el estado del juego, evitando múltiples flags booleanos
- Estilos en objetos JS inline, sin dependencias CSS externas

---

## Comparativa entre modelos

| Aspecto | ChatGPT (GPT-4o) | Claude (Sonnet 4.6) |
|---|---|---|
| **Formato de entrega** | Texto plano, archivo por archivo | Archivos descargables organizados |
| **Estructura del proyecto** | Correcta pero manual | Lista para subir a GitHub |
| **Separación de responsabilidades** | Todo en App.jsx | App.jsx + JuegoContador.jsx |
| **Manejo de closures** | No explícito | `useRef` para evitar stale closures |
| **Limpieza de timers** | `clearInterval` en cleanup de useEffect | `clearTimers()` centralizado + cleanup en desmontaje |
| **Estado del juego** | Múltiples booleanos (`gameStarted`, `canClick`) | Un único estado `phase` |
| **Estilos** | Archivo CSS separado | Objetos de estilo inline |
| **Preview del resultado** | No | Sí, interactiva dentro del chat |
| **Buenas prácticas** | Correctas para el nivel del ejercicio | Más defensivas y escalables |

---

## Conclusiones

Ambos modelos lograron resolver el ejercicio correctamente y en muy poco tiempo. La diferencia más notable no estuvo en si el código "funciona o no", sino en **la profundidad técnica de las decisiones tomadas** y en **la experiencia de uso**.

ChatGPT generó una solución válida y directa, adecuada para el nivel del ejercicio. Su código es fácil de leer y suficiente para cumplir los requisitos. La desventaja estuvo en el formato de entrega: recibir bloques de texto que luego hay que transformar en archivos es un paso extra innecesario.

Claude fue más exhaustivo en las decisiones técnicas: separó responsabilidades en componentes distintos, resolvió explícitamente el problema de closures con `useRef` y centralizó la limpieza de efectos secundarios. Además entregó los archivos listos para descargar y subir, lo que redujo la fricción del proceso al mínimo.

En cuanto a la diferencia con el desarrollo manual: usar IA permitió tener una solución completa y funcional en menos de 2 minutos, frente a las 1-2 horas que podría tomar resolverlo desde cero con conocimiento previo. La IA no reemplaza entender el código, pero sí elimina la fricción de recordar sintaxis, depurar bugs comunes y estructurar el proyecto desde cero.

---
