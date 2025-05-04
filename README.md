# BB Overlay

Proyecto de frontend en AngularJS para overlay transparente en OBS.

## Instalación

1. Asegúrate de tener Node.js y npm instalados.
2. En la carpeta del proyecto, ejecuta:

```bash
npm install
```

## Ejecución

1. Para iniciar el servidor estático y servir la aplicación:
2. Instala y ejecuta BlueBottle (League Broadcast - https://bluebottle.gg)
3. Con Bluebottle abierto, en la carpeta del proyecto, ejecuta:

```bash
npm start
```

Luego, abre tu navegador en http://localhost:8080.

## Integración con OBS

- Agrega una "Fuente de navegador" apuntando a http://localhost:8080.
- Activa la transparencia para que el fondo se muestre como transparente.

## Desarrollo y depuración

- La aplicación utiliza AngularJS y se actualiza automáticamente desde un WebSocket.
- Para depurar, abre las herramientas de desarrollo del navegador (F12).
- Modifica el endpoint WebSocket en `js/app.js` con la URL de tu servicio.

## Copilot Instructions

Se siguen las instrucciones de `.github/copilot-instructions.md` para mantener arquitectura y estilo.
