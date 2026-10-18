# Web de Chill Out Resto

Web independiente (ya no se genera con `_generador`). Todo lo que usa está en esta carpeta.

Publicada en: https://mbwebstudio.github.io/CHILL-OUT/ (repo `mbwebstudio/CHILL-OUT`).

## Estructura

```
CHILL OUT RESTO/
├── index.html        ← la página
├── css/styles.css    ← estilos (blanco y negro, como el logo)
├── js/main.js        ← horarios, "abierto ahora", menú del celular y botón de WhatsApp
├── img/
│   ├── logo-negro.png   ← logo con fondo transparente, para fondos claros
│   ├── logo-blanco.png  ← logo con fondo transparente, para fondos oscuros
│   └── favicon.svg      ← ícono de la pestaña
└── fotos/
    ├── atardecer-puerto.jpg
    ├── puerto-noche.jpg
    ├── puente-la-barra.jpg
    └── CREDITOS.txt     ← autor y licencia de cada foto
```

## Cambios frecuentes

- **Horarios:** se editan en un solo lugar, arriba de todo en `js/main.js` (`HORARIOS`). La tabla de cada local y el "abierto ahora" se actualizan solos, con la hora de Uruguay.
- **Teléfonos de WhatsApp:** buscá `wa.me/598` en `index.html`.
- **Fotos:** si Chill Out pasa fotos propias, reemplazá los archivos de `fotos/` con el mismo nombre y borrá la línea de créditos del pie en `index.html` y el archivo `CREDITOS.txt`.
- **Carta:** la sección "Lo que más se pide" está armada con lo que más comentan las reseñas. Si pasan la carta real, se puede reemplazar por la carta completa con precios.

## Para publicar cambios

Copiá los archivos al repo `CHILL-OUT` y subilos (git push). GitHub Pages tarda 1 o 2 minutos en actualizar.
