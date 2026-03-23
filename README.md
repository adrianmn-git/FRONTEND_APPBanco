# 🏦 Frontend App Banco

Este es el proyecto frontend para la aplicación bancaria **App Banco**. Esta intuitiva interfaz de usuario permite a los clientes interactuar con sus cuentas bancarias, realizar operaciones financieras y consultar sus movimientos de forma clara y segura.

El proyecto está construido utilizando las últimas tecnologías web para proporcionar una experiencia de usuario rápida, accesible y moderna, conectándose directamente con la potente API del backend bancario.

## 🚀 Tecnologías Principales

- **[Next.js 15](https://nextjs.org/)** - Framework de React utilizando el App Router y Turbopack para un desarrollo ágil y rendimiento óptimo.
- **[React 19](https://react.dev/)** - Librería principal para la construcción de interfaces de usuario interactivas.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático estricto para un código más robusto, predecible y fácil de mantener.
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS centrado en utilidades para un diseño a medida y completamente responsivo.
- **Iconografía y Estilos Adicionales**: Uso de `@mui/icons-material` y `@emotion/styled`.

## 📁 Estructura del Proyecto

El código fuente principal se encuentra organizado dentro del directorio `src/`:

- `src/app/`: Contiene el enrutamiento de la aplicación, layouts principales y páginas (Login, Home, Depósitos, Retiros, Transferencias, Creación de Cuentas/Tarjetas, Logs y Modificación de Límites) siguiendo la convención de Next.js App Router.
- `src/components/`: Colección de componentes UI modulares y reutilizables (Cuentas, Tarjetas, Logs de eventos, etc.).

## 🛠️ Instalación y Uso Local

Sigue estos pasos para arrancar el entorno de desarrollo en tu máquina local:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar el entorno:**
   Asegúrate de configurar las variables de entorno (como la URL de la API del banco) en un archivo `.env.local` en la raíz del proyecto, si es necesario.

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación:**
   Abre [http://localhost:3000](http://localhost:3000) en tu explorador. La página se actualizará automáticamente a medida que edites los archivos.

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Next.js.
- `npm run build`: Construye la aplicación generando una versión optimizada para producción.
- `npm run start`: Inicia el servidor de producción utilizando los archivos generados con `build`.
- `npm run lint`: Analiza el código con ESLint para advertir sobre problemas de sintaxis.

## 🌐 Integración con el Backend

Este cliente frontend es la cara visible de la aplicación **App Banco**. Funciona enviando y recibiendo datos para gestionar el acceso de los usuarios, realizar transacciones (transferencias, depósitos, retiros) y ofrecer resúmenes de cuenta. Para disfrutar de toda la experiencia operativa, recuerda tener el backend encendido.
