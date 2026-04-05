# JuegoContador

App web en React para competir contra uno mismo: hacé click la mayor cantidad de veces posible en 5 segundos.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y ejecución local

```bash
# 1. Cloná el repositorio
git clone https://github.com/tu-usuario/juego-contador.git
cd juego-contador

# 2. Instalá las dependencias
npm install

# 3. Iniciá el servidor de desarrollo
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera la build de producción en `/dist` |
| `npm run preview` | Previsualiza la build de producción localmente |

## Cómo jugar

1. Presioná **Iniciar** — el botón se deshabilitará y comenzará la cuenta regresiva.
2. La pantalla mostrará: **Preparados → Listos → ¡Ya!**
3. Al aparecer **¡Ya!**, el botón de click se habilitará durante **5 segundos**.
4. Hacé click la mayor cantidad de veces posible antes de que el tiempo se agote.
5. Si superaste tu puntaje máximo, el marcador se actualiza automáticamente.

## Estructura del proyecto

```
juego-contador/
├── src/
│   ├── App.jsx             # Componente raíz
│   └── JuegoContador.jsx   # Lógica y UI del juego
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Stack

- React 18 (componentes funcionales + hooks)
- Vite (bundler / dev server)
- Estilos inline con objetos de estilo en JS (sin dependencias CSS externas)

## Decisiones de diseño

- `useRef` para el contador de clicks: evita closures desactualizados dentro del `setInterval`.
- `clearTimers()` en todos los `setTimeout`/`setInterval` activos al reiniciar o desmontar el componente, previniendo efectos secundarios.
- El estado `phase` (`idle | countdown | playing | finished`) centraliza la habilitación/deshabilitación de botones y los mensajes visuales, evitando múltiples flags booleanos.
