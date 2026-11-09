# Atlas de Hyrule · dirección

Guía de las 100 skulltulas doradas y las 36 piezas de corazón del remake de Ocarina of Time
(Switch 2, noviembre de 2026). Este documento recoge cómo se llegó a su aspecto: qué fallaba,
qué rutas se probaron, cuál se eligió y qué queda sin comprobar.

## Qué falló antes (auditoría, de lo grande a lo pequeño)

| Capa | Hallazgo | Corrección |
|---|---|---|
| Estructura | Tres lenguajes visuales a la vez: interfaz verde oscura, mapa pastel y capturas nocturnas del juego | Un solo mundo visual, sacado del propio juego (ver «La frase») |
| Estructura | Dos formas de ir a una zona (menú desplegable y mapa) y dos sitios para la ficha (emergente y lista) | El índice vive en la guía; la ficha se despliega en la guía si está abierta y solo emerge si está cerrada |
| Recorrido | Las fotos, que son lo que más ayuda, solo salían al pulsar cada marcador | Cada zona enseña sus fichas con foto, descripción y requisitos sin pulsar nada |
| Recorrido | Vista general saturada: 92 marcadores diminutos y etiquetas encima | De lejos solo láminas y nombres; el detalle aparece al acercarse |
| Pantalla | Todas las láminas iguales: no se sabía dónde estaba cada cosa | Cada dominio tiñe su suelo con el color de su medallón |

## La frase

**El mapa del menú de pausa del remake —oro repujado sobre azul noche— ordenado por los seis
medallones de los sabios, con la calma de quien consulta el inventario a mitad de partida.**

Referencia cultural: el minimapa dorado en relieve que el propio juego pinta en la esquina de
cada captura. Tratamiento: relieve con luz desde arriba a la izquierda, filete de oro, placas.
Registro: pausa, consulta, inventario.

Rasgos: **artesanal** (repujado, no plano), **nocturno** (las skulltulas salen de noche),
**ordenado** (seis dominios, un color cada uno).

```
FORMA 1   El relieve: cada forma del mapa lleva su sombra desplazada; los edificios, más alta.
FORMA 2   La retícula es un tablero de láminas con marco de oro, no una página con secciones.
FORMA 3   Las capturas van en placas de esquinas talladas, como las casillas del inventario.
GESTO     Volar: el mapa se acerca a la zona elegida igual que el cursor del menú de pausa.
```

## Rutas que se prototiparon (puerta P1, 9-nov-2026)

| Ruta | Idea | Resultado |
|---|---|---|
| A · Cuaderno de campo | Lámina de naturalista: papel claro, acuarela, tinta verde, trazo a mano | Descartada: legible, pero chocaba con las capturas oscuras |
| **B · Relieve dorado** | El mapa del menú de pausa | **Elegida** viendo las tres lado a lado |
| C · Vidriera de los sabios | Vidrio emplomado, letra gótica, fotos en arco | Descartada: la más llamativa y la más cansada de leer |

## Color (tokens en OKLCH, `css/style.css` · bloque 2)

| Papel | Token | De dónde sale |
|---|---|---|
| Manda | `--brand` / `--gold`, oro | La ficha de skulltula dorada y el minimapa del juego |
| Acompaña | `--bg`, `--panel`, azul noche | El fondo del menú de pausa; la noche en que salen las arañas |
| Avisa | `--heart`, carmesí | Las piezas de corazón; solo se usa para ellas |
| Ordena | `--c-luz`, `--c-bosque`, `--c-fuego`, `--c-agua`, `--c-sombra`, `--c-espiritu` | Los seis medallones de los sabios |

De noche el oro del mapa pasa a plata azulada (luz de luna) y las skulltulas nocturnas brillan.

## Tipografía

- **Forum** (títulos): romana de inscripción, emparentada con el rótulo del juego. Un solo corte.
- **Sofia Sans** (texto, etiquetas y cifras): variable 400-800, cifras tabulares.

Ambas van dentro del proyecto (`fonts/`); la única llamada externa de la página son las capturas.

## Voz

| Decimos | No decimos |
|---|---|
| «Rueda contra el árbol de la entrada» | «Interactúa con el entorno» |
| «Aquí no hay nada: puedes pasar de largo» | «Sin resultados» |
| «Solo las que faltan» | «Filtrar por estado» |
| «Ya la tengo» | «Marcar como completado» |

## Lo que no está comprobado

- Los mapas son esquemas dibujados a mano, no cartografía del juego; los pisos de algunas
  mazmorras salen de las guías, no de haberlo jugado.
- Cuatro skulltulas tienen ubicación dudosa porque las guías se contradicen (17, 37, 86 y 98):
  lo dice su ficha.
- La animación de vuelo no se ha grabado en vídeo (las pruebas automáticas corren sin
  animaciones); se ha verificado el destino, no el trayecto.
- No se ha probado con lector de pantalla ni en un móvil real, solo en ventana estrecha.

## Juez ciego (9-nov-2026)

Un pase, solo con cinco capturas y sin contexto: **aspecto 6/10, claridad 6/10** (escritorio 7,
móvil 4). Acertó a la primera qué es y para qué sirve. Se corrigió después lo que señaló: el
tablero pasó de 7×5 a 5×5 para llenar el lienzo, elegir una ficha encuadra la lámina entera,
los títulos dejaron de usar una negrita sintética, la guía ocupa toda la pantalla en móvil, la
leyenda bajó al pie de la guía y se quitaron el rótulo «Hyrule» y la rosa de los vientos.
**No se ha repetido el juicio tras las correcciones.** Queda sin resolver lo que no depende del
diseño: las capturas llevan la marca de agua de TheGamer y los planos de las mazmorras no
dibujan las puertas entre salas.
