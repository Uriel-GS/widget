# 🚚 Widget de Rastreo - Instalación Fácil

Este widget se instala tan fácil como el de AfterShip, con solo **2 líneas de código**.

## Instalación Súper Fácil

### 1. Cargar el widget (después del `<body>`)
```html
<div id="track-widget-root"></div>
<script src="dist/track-widget.js"></script>
```

### 2. Usar el botón donde quieras
```html
<div class="track-button" data-size="large"></div>
```

## Opciones disponibles

- `data-size="large"` - Botón grande (por defecto)
- `data-size="small"` - Botón pequeño

## Demo

Abre `demo.html` en tu navegador para ver el widget funcionando.


## Desarrollo

Para desarrollo local:
```bash
npm install
npm run start
```

## Estructura del proyecto

- `dist/track-widget.js` - Widget standalone para CDN
- `demo.html` - Demo de instalación fácil
- `src/` - Código fuente React (para desarrollo)
