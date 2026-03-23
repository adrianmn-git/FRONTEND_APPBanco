# 🎲 Bingo / Quinto App - Frontend

Este es el proyecto frontend para la aplicación de **Bingo / Quinto**. Esta intuitiva interfaz de usuario permite a los jugadores interactuar con el juego, obtener sus cartones, visualizar los números cantados, consultar el historial de partidas y comprobar las líneas o bingos ganadores de forma clara y dinámica.

El proyecto está construido utilizando las últimas tecnologías web para proporcionar una experiencia de usuario rápida, accesible y moderna, conectándose directamente con la sólida API de backend.

## 🚀 Tecnologías Principales

- **[Next.js 15](https://nextjs.org/)** - Framework de React utilizando el App Router y Turbopack para un desarrollo ágil y un rendimiento óptimo.
- **[React 19](https://react.dev/)** - Librería principal para la construcción de interfaces de usuario interactivas.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático estricto para un código más robusto, predecible y fácil de mantener.
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS centrado en utilidades para un diseño a medida y completamente responsivo.
- **Iconografía y Estilos Adicionales**: Uso de `@mui/icons-material` y `@emotion/styled`.

## 📁 Estructura del Proyecto

El código fuente principal se encuentra organizado dentro del directorio `src/`:

- `src/app/`: Contiene el enrutamiento de la aplicación, layouts principales y páginas siguiendo la convención de Next.js App Router.
- `src/components/`: Colección de componentes UI modulares y reutilizables (cartones de bingo, paneles de historial, botones, etc.).
- `src/libs/`: Funciones de utilidad auxiliares, configuración estática y conectores para las peticiones a la API.

## 🛠️ Instalación y Uso Local

Sigue estos pasos para arrancar el entorno de desarrollo en tu máquina local:

1. **Clonar e instalar dependencias:**
   ```bash
   npm install
   ```
   *(También puedes utilizar `yarn`, `pnpm` o `bun`)*

2. **Configuración del entorno (Recomendado):**
   Asegúrate de configurar correctamente las variables de entorno necesarias (por ejemplo, la URL de la API del Bingo). Si el proyecto requiere un archivo `.env.local`, configúralo en la raíz apuntando a tu backend.

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Comenzar a jugar:**
   Abre [http://localhost:3000](http://localhost:3000) en tu explorador. La página se actualizará automáticamente a medida que edites los archivos.

## 📦 Scripts Disponibles

En el directorio del proyecto, tienes a tu disposición los siguientes comandos (`npm run <script>`):

- `dev`: Inicia el servidor de desarrollo de Next.js.
- `build`: Construye la aplicación generando una versión optimizada para producción (`.next`).
- `start`: Inicia el servidor de producción utilizando los archivos generados con `build`.
- `lint`: Analiza el código con ESLint para encontrar problemas de sintaxis y respetar las convenciones de estilo.

## 🌐 Integración con el Backend

Este cliente frontend es la cara visible de la robusta **Bingo API** (construida basándose en Arquitectura Hexagonal y DDD). Funciona enviando y recibiendo eventos esenciales como la creación de partidas, validación de estado de cartones e información histórica de jugadas. ¡Asegúrate de encender tu backend para disfrutar de la experiencia completa!
