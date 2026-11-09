/* Atlas de Hyrule — datos del remake de Ocarina of Time (Switch 2, noviembre de 2026).
   La numeración sigue el orden de progresión de las guías de RPG Site (skulltulas)
   y Respec (piezas de corazón). La posición de cada marcador vive en js/maps.js. */

const SRC = {
  gs: [
    ['RPG Site', 'https://www.rpgsite.net/guide/21634-the-legend-zelda-ocarina-time-remake-gold-skulltula-locations-guide'],
    ['TheGamer (con capturas)', 'https://www.thegamer.com/the-legend-of-zelda-ocarina-of-time-all-gold-skulltula-locations/']
  ],
  hp: [
    ['Respec', 'https://www.respec.net/guide/280-the-legend-zelda-ocarina-time-remake-pieces-heart-list-every-heart-piece-location-including-those-moved-for-switch-2'],
    ['TheGamer (con capturas)', 'https://www.thegamer.com/the-legend-of-zelda-ocarina-of-time-all-heart-piece-locations/']
  ]
};

/* kind: over = zona exterior, dun = mazmorra. floors: de arriba abajo. start: piso inicial. */
const ZONES = [
  { id: 'world', kind: 'world', name: 'Hyrule', short: 'Hyrule', sub: 'Arrastra para moverte y usa la rueda para acercarte. Pulsa un marcador para ver la captura del sitio exacto.' },

  { id: 'kokiri', kind: 'over', name: 'Bosque Kokiri', short: 'Bosque Kokiri', sub: 'La aldea donde empieza todo.' },
  { id: 'lostwoods', kind: 'over', name: 'Bosque Perdido', short: 'Bosque Perdido', sub: 'Esquema del laberinto: los claros están conectados, pero la orientación real engaña.' },
  { id: 'sfm', kind: 'over', name: 'Pradera Sagrada del Bosque', short: 'Pradera Sagrada', sub: 'El remake la llama también «Sacred Grove». Antesala del Templo del Bosque.' },
  { id: 'field', kind: 'over', name: 'Llanura de Hyrule', short: 'Llanura de Hyrule', sub: 'En el remake tiene más desniveles y formaciones rocosas que en N64.' },
  { id: 'lonlon', kind: 'over', name: 'Rancho Lon Lon', short: 'Rancho Lon Lon', sub: 'En el centro de la llanura: acércate para verlo en detalle.' },
  { id: 'market', kind: 'over', name: 'Ciudadela de Hyrule', short: 'Ciudadela', sub: 'El mercado, sus minijuegos y el Templo del Tiempo. De adulto está en ruinas.' },
  { id: 'castle', kind: 'over', name: 'Castillo de Hyrule', short: 'Castillo', sub: 'De niño, los jardines del castillo; de adulto, el exterior del Castillo de Ganondorf.' },
  { id: 'kakariko', kind: 'over', name: 'Villa Kakariko', short: 'Kakariko', sub: 'Aquí está la Casa de las Skulltulas, donde se cobran las recompensas.' },
  { id: 'graveyard', kind: 'over', name: 'Cementerio de Kakariko', short: 'Cementerio', sub: 'Al fondo de Kakariko.' },
  { id: 'dmt', kind: 'over', name: 'Sendero de la Montaña de la Muerte', short: 'Mña. de la Muerte', sub: 'De Kakariko a la cima, pasando por la Caverna Dodongo y Ciudad Goron.' },
  { id: 'goron', kind: 'over', name: 'Ciudad Goron', short: 'Ciudad Goron', sub: 'Una ciudad excavada en anillos alrededor de un pozo central.' },
  { id: 'dmc', kind: 'over', name: 'Cráter de la Montaña de la Muerte', short: 'Cráter', sub: 'De niño te quemas enseguida: entra con la vida llena y ve directo.' },
  { id: 'zriver', kind: 'over', name: 'Río Zora', short: 'Río Zora', sub: 'El río sube de oeste a este hasta la cascada.' },
  { id: 'zdomain', kind: 'over', name: 'Región de los Zora', short: 'Región Zora', sub: 'Tras la cascada. De adulto está congelada.' },
  { id: 'zfountain', kind: 'over', name: 'Fuente Zora', short: 'Fuente Zora', sub: 'El hogar de Lord Jabu-Jabu y, de adulto, la entrada a la Caverna de Hielo.' },
  { id: 'lake', kind: 'over', name: 'Lago Hylia', short: 'Lago Hylia', sub: 'Laboratorio, estanque de pesca y el Templo del Agua bajo la isla.' },
  { id: 'gvalley', kind: 'over', name: 'Valle Gerudo', short: 'Valle Gerudo', sub: 'El cañón que separa Hyrule del territorio gerudo.' },
  { id: 'gfortress', kind: 'over', name: 'Fortaleza Gerudo', short: 'Fortaleza Gerudo', sub: 'Necesitas el Pase Gerudo para moverte con libertad.' },
  { id: 'wasteland', kind: 'over', name: 'Desierto Encantado', short: 'Desierto', sub: 'El remake lo llama «Mirage Desert».' },
  { id: 'colossus', kind: 'over', name: 'Coloso del Desierto', short: 'Coloso', sub: 'El remake lo llama «Evil Desert Colossus». Entrada al Templo del Espíritu.' },

  { id: 'deku', kind: 'dun', name: 'Gran Árbol Deku', short: 'Árbol Deku', floors: ['3F', '2F', '1F', 'B1', 'B2'], start: '1F', sub: 'Primera mazmorra. Link niño.' },
  { id: 'dodongo', kind: 'dun', name: 'Caverna Dodongo', short: 'Cav. Dodongo', floors: ['2F', '1F'], start: '1F', sub: 'Segunda mazmorra. Hay una skulltula que solo se alcanza de adulto.' },
  { id: 'jabu', kind: 'dun', name: 'Tripa de Jabu-Jabu', short: 'Jabu-Jabu', floors: ['2F', '1F', 'B1'], start: '1F', sub: 'Tercera mazmorra. Link niño.' },
  { id: 'forest', kind: 'dun', name: 'Templo del Bosque', short: 'T. Bosque', floors: ['2F', '1F', 'B1', 'B2'], start: '1F', sub: 'Primer templo de adulto.' },
  { id: 'fire', kind: 'dun', name: 'Templo del Fuego', short: 'T. Fuego', floors: ['5F', '4F', '3F', '2F', '1F'], start: '1F', sub: 'Dentro del Cráter. Cinco pisos.' },
  { id: 'ice', kind: 'dun', name: 'Caverna de Hielo', short: 'Cav. Hielo', floors: ['1F'], start: '1F', sub: 'Su pieza de corazón se ha mudado al Cráter en el remake (n.º 36).' },
  { id: 'water', kind: 'dun', name: 'Templo del Agua', short: 'T. Agua', floors: ['3F', '2F', '1F', 'B1'], start: '1F', sub: 'El piso al que llega el agua decide a qué puedes acceder.' },
  { id: 'well', kind: 'dun', name: 'Fondo del Pozo', short: 'Fondo del Pozo', floors: ['B1', 'B2'], start: 'B1', sub: 'Minimazmorra de Link niño, bajo el pozo de Kakariko.' },
  { id: 'shadow', kind: 'dun', name: 'Templo de las Sombras', short: 'T. Sombras', floors: ['B1', 'B2', 'B3', 'B4'], start: 'B1', sub: 'Se desciende cuatro niveles bajo el cementerio.' },
  { id: 'gtg', kind: 'dun', name: 'Centro de Instrucción Gerudo', short: 'C. Instrucción', floors: ['1F'], start: '1F', sub: 'Sin skulltulas ni piezas de corazón: aquí se consiguen las Flechas de Hielo.' },
  { id: 'spirit', kind: 'dun', name: 'Templo del Espíritu', short: 'T. Espíritu', floors: ['4F', '3F', '2F', '1F'], start: '1F', sub: 'Mitad de niño, mitad de adulto.' },
  { id: 'ganon', kind: 'dun', name: 'Castillo de Ganondorf', short: 'Cast. Ganondorf', floors: ['1F'], start: '1F', sub: 'Dentro no hay coleccionables; la skulltula n.º 97 está fuera, en las ruinas.' }
];

/* Las capturas de la carpeta «capturas» proceden de estas guías de TheGamer */
const SHOT = {
  gs: ['TheGamer', SRC.gs[1][1]],
  hp: ['TheGamer', SRC.hp[1][1]]
};

const REQ = {
  slingshot: 'Tirachinas', boomerang: 'Bumerán', hookshot: 'Gancho', longshot: 'Supergancho',
  bombs: 'Bombas', bug: 'Bichos en botella', bean: 'Judía mágica plantada de niño', hammer: 'Martillo Megatón',
  scarecrow: 'Canción del Espantapájaros', lens: 'Lente de la Verdad', iron: 'Botas de Hierro',
  hover: 'Botas Voladoras', silver: 'Guanteletes de Plata', sot: 'Canción del Tiempo',
  storms: 'Canción de la Tormenta', saria: 'Canción de Saria', sun: 'Canción del Sol', fire: 'Palo Deku o Fuego de Din',
  scale: 'Escama Dorada', cucco: 'Un cuco', bolero: 'Bolero del Fuego', requiem: 'Réquiem del Espíritu',
  rupees: '100 rupias', key: 'Llave pequeña', epona: 'Epona y el arco', bombchu: 'Saco de bombas', rod: 'Caña de pescar',
  pass: 'Pase Gerudo', ocarina: 'Ocarina', seed: 'Una judía mágica'
};

const ITEMS = [];
/* gs(n, edad, noche, requisitos, título, descripción, notaRemake)  edad: c niño · a adulto · x cualquiera */
const add = t => (n, age, night, req, title, desc, remake) =>
  ITEMS.push({ id: t + n, t, n, age, night: !!night, req: req ? req.split(' ') : [], title, desc, remake: remake || '' });
const gs = add('gs'), hp = add('hp'), bn = add('bn');

/* ───────── Skulltulas doradas (100) ───────── */
gs(1, 'c', 0, '', 'Hueco de la sala de la brújula', 'En el 3F, en la sala de las plataformas que suben con el interruptor (donde está la brújula). Cruza las plataformas hasta el hueco lateral de la izquierda: la skulltula está en la pared.');
gs(2, 'c', 0, 'slingshot', 'Enredadera del sótano', 'Al caer al B1 por la telaraña, date la vuelta: está en la gran enredadera que sube de vuelta al 1F. Dispárale y trepa a por la ficha.');
gs(3, 'c', 0, 'slingshot', 'Reja del sótano', 'En la misma sala inundada del B1, sobre la reja metálica del norte, a la izquierda del interruptor. Salta desde la plataforma para coger la ficha.');
gs(4, 'c', 0, 'fire', 'Tras la telaraña de las larvas', 'En la sala del B1 donde caen las tres larvas de Gohma, quema con un Palo Deku la telaraña de la izquierda. Detrás hay una salita con la skulltula en la enredadera.', 'En N64 estaba tras un muro bombardeable; ahora basta con quemar la telaraña.');
gs(5, 'c', 0, '', 'Caja de la sala de guardia', 'Nada más cruzar el puente levadizo, entra por la puerta de la derecha. Al fondo hay cajas: rueda contra la que tiembla, la más cercana al guardia.');
gs(6, 'c', 0, '', 'Árbol tras la casa del rancho', 'Detrás de la casa grande que queda a la izquierda al entrar hay un árbol delgado. Rueda contra él para que caiga.');
gs(7, 'c', 1, 'slingshot', 'Escalera de la atalaya', 'En la escalera de mano de la atalaya del centro del pueblo. Derríbala con el tirachinas y sube a por la ficha.');
gs(8, 'c', 1, '', 'Puerta de la Casa de las Skulltulas', 'Justo a la izquierda de la puerta de la casa cubierta de telarañas.');
gs(9, 'c', 1, '', 'Edificio en obras', 'En la pared de la obra del centro del pueblo, la que mira al corral de la señora de los cucos.');
gs(10, 'c', 1, '', 'Árbol de la entrada', 'Rueda contra el árbol cercano a la entrada desde la llanura, donde se sienta el hijo del capataz.');
gs(11, 'c', 1, '', 'Detrás de la casa del noroeste', 'Junto a la puerta que sube a la Montaña de la Muerte hay una casa a la izquierda del soldado. La skulltula está en su pared trasera.');
gs(12, 'c', 0, 'bug', 'Tierra blanda del cementerio', 'Sube el pequeño desnivel del noroeste y ve a la izquierda: junto a un árbol hay tierra blanda. Suelta un bicho de una botella.');
gs(13, 'c', 1, '', 'Casa de los Hermanos Sabelotodo', 'Detrás de la casa del suroeste de la aldea, en el tronco.');
gs(14, 'c', 0, 'bug', 'Tierra blanda del oeste', 'Desde la entrada por el Bosque Kokiri: izquierda y otra vez izquierda. La tierra blanda queda inmediatamente a tu izquierda. Suelta un bicho.', 'RPG Site la etiqueta como «Kokiri Forest», pero está ya dentro del Bosque Perdido.');
gs(15, 'c', 0, 'bug', 'Tierra blanda ante la Caverna Dodongo', 'Tras despejar la entrada de la caverna con una flor bomba, a la derecha de la boca hay tierra blanda. Suelta un bicho y planta después una judía.');
gs(16, 'c', 0, 'slingshot', 'Lo alto de la escalera de flores bomba', 'En la sala donde detonas la hilera de flores bomba para formar una escalera. Arriba, al dar la vuelta, mira la pared con rejilla trepable: hay una skulltula normal y la dorada.');
gs(17, 'c', 0, 'bombs', 'Sala de la roca junto al puente', 'En el 2F, a la derecha del interruptor que convierte la plataforma en ascensor, junto al puente colgante. Vuela el muro agrietado: dentro hay dos Dodongos alrededor de una gran roca y la skulltula está detrás.', 'Las guías no coinciden del todo: RPG Site la sitúa girando a la derecha tras abrir el atajo hacia la planta baja.');
gs(18, 'c', 0, 'bombs', 'Sala lateral del pasillo este', 'En el pasillo del este del 1F, donde aparecen los Dodongos bebé, vuela el muro agrietado. Dentro hay tres Keese y la skulltula.');
gs(19, 'c', 0, 'bombs', 'Sala oculta tras la calavera', 'Pasada la boca de la calavera gigante, en la sala de los bloques: coloca el bloque suelto ante el muro agrietado, pon una bomba encima y entra. Está en la pared del fondo, con un Armos y Dodongos bebé.');
gs(20, 'c', 0, 'bombs', 'Muro agrietado del sendero', 'En el camino entre Kakariko y la Caverna Dodongo, en la pared de la derecha según subes. Vuela el muro.');
gs(21, 'c', 0, 'bombs', 'Sala de las rocas', 'Al entrar en la ciudad ve a la izquierda y ábrete paso con bombas por el laberinto de rocas (las grises no se rompen). Al fondo hay cofres con rupias y la skulltula.');
gs(22, 'x', 0, '', 'Cajas de la entrada del cráter', 'Entra al cráter desde la cima (junto a la Gran Hada) y corre a la izquierda: rompe la caja del fondo. De niño te quemas rápido, así que entra con la vida llena.');
gs(23, 'c', 0, 'bug', 'Tierra blanda del vendedor de judías', 'Justo a la derecha del vendedor de judías mágicas. Suelta un bicho y, ya puestos, planta una judía.', 'Novedad del remake: en N64 era la única tierra blanda sin skulltula.');
gs(24, 'c', 1, '', 'Pilar del final del río', 'Sube hasta el final del río y baja al nivel inferior. Está detrás del pilar de piedra que sostiene el puente.');
gs(25, 'c', 0, 'bug', 'Tierra blanda del laboratorio', 'A la derecha de la puerta del Laboratorio del Lago. Suelta un bicho y planta una judía.');
gs(26, 'c', 0, '', 'Árbol junto a la Gran Hada', 'En la esquina sureste, cerca de la Fuente de la Gran Hada, hay un árbol solitario. Rueda contra él.');
gs(27, 'c', 0, '', 'Enredadera de la sala del mapa', 'Con el agua subida, nada hasta la enredadera que hay frente al cofre grande del mapa y trepa a la zona elevada.', 'Ubicación propia del remake.');
gs(28, 'c', 0, 'boomerang', 'Pared norte de la cámara inferior', 'Derrota a los tentáculos y déjate caer por el agujero nuevo de la cámara principal. Nada más aterrizar, está en la pared norte.');
gs(29, 'c', 0, 'boomerang', 'Pasillo hacia el Gran Octo', 'Desde la cámara inferior, toma el pasillo que lleva al Gran Octo y mira arriba a la izquierda al entrar.');
gs(30, 'c', 0, 'boomerang', 'Enredadera de la antesala del jefe', 'En la última sala antes de Barinade, tras eliminar a los Biri: está en la enredadera de la columna.');
gs(31, 'c', 1, 'boomerang', 'Pared sur de la fuente', 'En la pared sur, bien alta, frente al arco sumergido que hace de rampa.');
gs(32, 'c', 1, 'boomerang', 'Pared del laboratorio', 'Sube al puente colgante que sale del laboratorio y mira atrás: está en la pared del edificio.');
gs(33, 'c', 0, '', 'Agujero del extremo suroeste', 'Nada hasta el extremo suroeste del lago. En un saliente diminuto, un Tektite azul vigila un agujero: gatea por él hasta una salita.');
gs(34, 'c', 1, 'boomerang', 'Ventana de la casa del rancho', 'Sobre la puerta de la casa de Malon, en la ventana. Recoge la ficha con el bumerán.');
gs(35, 'c', 1, 'boomerang', 'Torre en ruinas', 'En el edificio de piedra de la esquina suroeste del rancho. Entra y mira arriba: está en la enredadera.');
gs(36, 'c', 1, 'boomerang', 'Detrás de la cabaña de Dampé', 'En la parte trasera de la cabaña del sepulturero, a la derecha, junto a la valla.');
gs(37, 'x', 1, '', 'Árbol solitario junto al arroyo', 'Al oeste de la entrada del Bosque Kokiri, donde termina el arroyo que cruza el camino, hay un árbol delgado y solitario. Rueda contra él.', 'RPG Site la consigue de niño; TheGamer la lista como de adulto. Prueba en la época en la que estés.');
gs(38, 'c', 0, 'bug', 'Tierra blanda tras la tienda', 'Detrás de la tienda Kokiri. Suelta un bicho y planta una judía.');
gs(39, 'c', 0, 'bug', 'Tierra blanda del claro del teatro', 'Desde la entrada: derecha, izquierda, derecha, izquierda, izquierda. Aturde a los dos Deku devolviéndoles los disparos; la tierra blanda está en la esquina del fondo a la derecha. Planta también una judía.');
gs(40, 'c', 1, 'boomerang', 'Bajo el puente de tablas', 'Baja al agua bajo el puentecito de tablas de la entrada del valle: está bajo el extremo más alejado.');
gs(41, 'c', 0, 'bug cucco', 'Tierra blanda de la gerudo y la vaca', 'Coge el cuco junto al puente grande y planea hasta la orilla junto a la cascada. Sigue el arroyo hasta una gerudo con una vaca: al lado está la tierra blanda.');
gs(42, 'a', 1, 'hookshot', 'Detrás de la casa de Impa', 'Usa el gancho en la enredadera del risco que hay junto a la casa del sur, sube al tejado y mira la pared trasera (donde de niño está el corral).');
gs(43, 'a', 1, 'hookshot', 'Casa de las gemelas', 'Detrás de la casa que queda frente a la tienda, en alto.');
gs(44, 'a', 0, 'bean', 'Planta mágica del claro del teatro', 'Súbete a la planta que crece donde plantaste la judía (misma tierra que la n.º 39): te eleva hasta un saliente con la skulltula.');
gs(45, 'a', 0, 'hookshot', 'Sobre el laberinto', 'A mitad del laberinto de los Moblins, antes del pasillo recto del Moblin de la maza, date la vuelta y sube la escalera de mano. Está a tu izquierda.');
gs(46, 'a', 0, 'hookshot', 'Árbol de la entrada', 'En el claro de entrada del templo, en lo alto del árbol cubierto de enredaderas.');
gs(47, 'a', 0, 'hookshot', 'Escalera norte del gran salón', 'En el gran salón, sube la escalera del norte. Sin cruzar la puerta, date la vuelta: está en la pared.');
gs(48, 'a', 0, 'hookshot', 'Cornisa del patio este', 'En el 2F del patio del pozo: tras caer por el agujero que sigue a la llave del jefe sales a un balcón. Camina con cuidado por la cornisa a la izquierda de la puerta y dobla la esquina.');
gs(49, 'a', 0, 'scarecrow hookshot', 'Balconcillo del patio oeste', 'Tras empujar el bloque grande que abre el atajo, mira arriba: hay un balconcillo inaccesible. Toca la Canción del Espantapájaros y engánchate a él.');
gs(50, 'a', 0, '', 'Hueco de la sala giratoria', 'En el sótano, gira la sala con el pilar hasta que quede accesible la cámara verde de las vasijas. Entra y mira la pared.');
gs(51, 'a', 0, 'scarecrow hookshot', 'Saliente del pasillo este', 'En el pasillo de los Dodongos bebé, a media altura de la pared norte hay un punto de espantapájaros. Tócale la canción y sube con el gancho.');
gs(52, 'a', 0, 'hookshot', 'Plataforma colgante central', 'Sube al segundo nivel, ponte en el lado norte y mira la roca suspendida sobre el centro de la ciudad: está agarrada a ella.', 'RPG Site se salta el n.º 52 en su lista; por recuento de zonas corresponde a esta.');
gs(53, 'a', 0, 'sot', 'Sala oculta de la caverna de lava', 'En la gran caverna de lava del 1F, la plataforma cuadrada de la esquina del fondo a la izquierda sube en vez de hundirse. Arriba, toca la Canción del Tiempo para mover el bloque. Dentro: losas voladoras, un Like Like y la skulltula al fondo.');
gs(54, 'a', 0, 'bombs', 'Muro del laberinto de rocas', 'En el laberinto de las rocas rodantes, baja la rampa y ve a la esquina noreste: vuela el muro agrietado.');
gs(55, 'a', 0, 'scarecrow hookshot', 'Sala oculta sobre el laberinto', 'En la parte alta del laberinto, tras bajar el bloque desde la sala del muro de fuego, gira al suroeste. Invoca al espantapájaros, engánchate a él y luego al pequeño ascensor de enfrente. Está en la sala de arriba.');
gs(56, 'a', 0, 'hookshot', 'Pared exterior de la cima', 'Nada más conseguir la anterior, cruza la puerta y mira a la derecha: está en la pared.');
gs(57, 'a', 0, 'hammer', 'Segunda sala de las losas voladoras', 'Con el martillo, rompe la estatua que bloquea la puerta de la derecha en el vestíbulo. En la sala, rompe la roca gris de la pared del fondo.');
gs(58, 'a', 0, 'hammer', 'Roca bajo Biggoron', 'En el tramo alto donde de niño te llovían rocas, justo por debajo de Biggoron, hay una roca gris. Rómpela con el martillo.');
gs(59, 'a', 0, 'hammer', 'Roca junto a Ciudad Goron', 'En el risco cercano a la entrada de Ciudad Goron hay otra roca gris rompible.');
gs(60, 'c', 0, 'bug bolero', 'Tierra blanda del punto de teletransporte', 'Vuelve a ser niño y toca el Bolero del Fuego. Junto al pedestal hay tierra blanda: suelta un bicho, mata a la skulltula y planta una judía antes de quemarte.');
gs(61, 'a', 1, 'bean hookshot', 'Meseta de las grutas', 'Súbete a la planta mágica del vendedor de judías y bájate en la zona elevada de la piedra chismosa y las grutas. Salta el hueco: está en la pared.');
gs(62, 'a', 1, 'hookshot', 'Pared alta ante la cascada', 'Al final del río, junto a la entrada de la Región de los Zora, muy arriba en la pared del noroeste. Subido a la barandilla de piedra llegas con el gancho normal.');
gs(63, 'a', 0, 'hookshot', 'Cascada congelada', 'Sube a donde se jugaba al minijuego de buceo. Está en la pared de la izquierda, alcanzable con el gancho desde el saliente.');
gs(64, 'a', 0, 'hookshot', 'Sala de la cuchilla giratoria', 'En la primera sala con cuchilla, en lo alto de la pared de hielo a la izquierda de la puerta por la que entras.');
gs(65, 'a', 0, 'hookshot', 'Sala de la brújula', 'Desde el cofre de la brújula, mira a la izquierda (noroeste): está en un hueco tallado en la columna de hielo.');
gs(66, 'a', 0, 'hookshot', 'Sala del bloque de hielo', 'En la sala del puzle del bloque deslizante, cruza las estalagmitas y date la vuelta hacia la entrada: está sobre tu cabeza.');
gs(67, 'a', 0, 'iron hookshot', 'Bajo la torre central', 'Con el agua en el nivel intermedio, entra en la torre central y húndete con las Botas de Hierro: el bloque flota y deja libre el hueco del suelo. Abajo, mata los pinchos, dispara al interruptor de cristal y sube por la reja a la sala de la skulltula.');
gs(68, 'a', 0, 'longshot', 'Río de los remolinos', 'Tras conseguir el supergancho, en el pasillo de los remolinos: en el primer recodo a la derecha, por encima del agua.');
gs(69, 'a', 0, 'longshot', 'Techo de la torre central', 'Vuelve a la torre central con el supergancho, sube por los puntos de enganche y mira arriba: está en una esquina del techo.');
gs(70, 'a', 0, 'longshot', 'Cascada del pasillo de las rocas', 'En el pasillo de las rocas rodantes que lleva a la llave del jefe, tras una pequeña cascada en la pared.');
gs(71, 'a', 0, 'bombs iron', 'Muro agrietado sobre la sala de Ruto', 'Con el agua en el nivel intermedio, baja con las botas a la sala donde encontraste a Ruto y déjate flotar: en la pared este hay un muro agrietado. Dentro hay conchas afiladas y la skulltula.');
gs(72, 'a', 1, 'longshot', 'Árbol de la isla central', 'En lo alto del gran árbol de la isla del Templo del Agua. Lo más cómodo es cogerla al salir del templo.', 'RPG Site la numera por error como «#77» en su texto.');
gs(73, 'a', 0, 'iron hookshot', 'Fondo del tanque del laboratorio', 'Dentro del laboratorio, húndete hasta el fondo del tanque y rueda contra la caja de madera para liberarla.', 'RPG Site la numera por error como «#78» en su texto.');
gs(74, 'c', 1, '', 'Árbol junto a la enredadera', 'En el primer patio del castillo, a la derecha de la enredadera por la que se trepa hay un árbol. Rueda contra él.');
gs(75, 'c', 0, 'storms bombs boomerang', 'Gruta de la Canción de la Tormenta', 'Donde dormía Talon, en la esquina hay un árbol con una planta de tres hojas detrás. Toca allí la Canción de la Tormenta, baja a la gruta y vuela las paredes.');
gs(76, 'c', 0, 'lens', 'Sala del Like Like', 'Ve a la esquina noroeste, a la sala de los Keese de fuego y el Beamos. Con la Lente esquiva los agujeros invisibles y cruza la puerta del sur: tras vencer al Like Like, está en la pared este.');
gs(77, 'c', 0, 'key lens', 'Celda oeste de la cámara central', 'Coge la llave del cofre invisible del pasillo exterior este (donde patrulla la burbuja verde grande) y abre la celda del fondo a la izquierda de la cámara central.');
gs(78, 'c', 0, 'key lens fire', 'Celda este de la cámara central', 'La llave está en la sala del extremo oeste: bucea bajo el arco, vence al Gibdo y quema el ataúd entre las antorchas. Abre la otra celda y sigue con la Lente el camino invisible.');
gs(79, 'a', 0, '', 'Sala lateral de la guadaña invisible', 'En la sala de la guadaña invisible, vence al Like Like de la esquina para abrir una puerta. Dentro hay dos cofres (uno invisible) y la skulltula en la pared del fondo.');
gs(80, 'a', 0, 'longshot', 'Sobre los pinchos que caen', 'Empuja el bloque hasta el final para protegerte, trepa a él y sube a lo alto de las trampas. Está arriba, en la esquina noreste.');
gs(81, 'a', 0, 'longshot hover iron', 'Foso del pasillo de los ventiladores', 'Al final del pasillo, cruza el foso cuando el ventilador pare y date la vuelta: está en la pared del foso.');
gs(82, 'a', 0, 'scarecrow longshot', 'Sobre el muelle', 'Antes de subir al barco, mira encima del bloque que apartaste para abrir el atajo. Invoca al espantapájaros y sube: queda a su izquierda.');
gs(83, 'a', 0, 'bombs', 'Tres vasijas calavera', 'Al norte del laberinto invisible, tras el barco. Sube la escalera y lanza una bomba a cada una de las tres vasijas giratorias: una contiene la skulltula.');
gs(84, 'a', 1, 'hookshot', 'Arco de piedra del campamento', 'Cruza el puente hasta el campamento de los carpinteros. Sobre las rocas grises, en la columna que sostiene el arco.');
gs(85, 'a', 1, '', 'Detrás de la tienda de campaña', 'En la pared que hay justo detrás de la tienda de los carpinteros.');
gs(86, 'a', 1, 'pass', 'Muro de la fortaleza', 'En un hueco junto a una puerta, donde se puede invocar al espantapájaros.', 'Las guías discrepan: RPG Site dice «al este de la zona» y TheGamer «en el lado oeste de la fortaleza». Guíate por la Gema del Eco.');
gs(87, 'a', 1, 'longshot pass', 'Diana del tiro a caballo', 'En el campo de tiro, al sur de la fortaleza: detrás de la diana más alejada (noreste). Acércate a la valla.');
gs(88, 'a', 0, '', 'Sótano del refugio de piedra', 'A mitad del desierto hay un pequeño edificio de piedra. Baja la escalera: está en la pared, junto a las antorchas apagadas.');
gs(89, 'a', 1, '', 'Pared norte, bajo los pájaros', 'A la derecha de la entrada del templo (al norte), en la pared sobre la que revolotea la bandada.');
gs(90, 'c', 0, 'bug requiem', 'Tierra blanda ante el templo', 'Llega de niño con el Réquiem del Espíritu. A la izquierda de la entrada del templo hay tierra blanda: suelta un bicho y planta una judía.');
gs(91, 'c', 0, 'boomerang', 'Sala del puente de reja', 'En la parte de niño, al recoger los cinco cristales (las rupias de plata) cae la reja que hace de puente. La skulltula queda a la vista: usa el bumerán para matarla y recoger la ficha.');
gs(92, 'c', 0, '', 'Base de la estatua', 'Tras coger el mapa, al pie de la estatua gigante, en la esquina noreste (a la derecha del todo desde el cofre).');
gs(93, 'c', 0, 'boomerang', 'Sobre la puerta del pasillo', 'Tras el puzle de los bloques y el rayo de sol, al entrar en el pasillo que va al Nudillo de Hierro, mira atrás: está encima de la puerta.');
gs(94, 'a', 1, 'bean', 'Roca alta del coloso', 'Súbete a la planta mágica nacida ante el templo y bájate en la segunda roca enorme: la skulltula está arriba.', 'RPG Site la lista bajo «Spirit Temple», pero está fuera.');
gs(95, 'a', 0, 'sot', 'Hueco de la sala de las rocas rodantes', 'En la sala donde recoges cristales esquivando rocas, toca la Canción del Tiempo para apartar el bloque azul de la esquina noroeste.');
gs(96, 'a', 0, 'scarecrow hookshot', 'Saliente de la sala de la estatua', 'Desde la mano de la estatua donde aparece el cofre, pasa al saliente más cercano y mira a la esquina noroeste: invoca al espantapájaros y sube.');
gs(97, 'a', 0, 'hookshot', 'Ruinas ante el castillo', 'Antes de entrar en el Castillo de Ganondorf, ve a la izquierda: está en la parte trasera de un edificio derruido, los restos de la puerta del antiguo castillo.');
gs(98, 'a', 0, 'bombs', 'Gruta de la zona pantanosa', 'En la zona de charcas con Tektites, cerca de la entrada del Lago Hylia. Busca un círculo gris agrietado dentro del agua, vuélalo y rompe la caja de la gruta.', 'RPG Site sitúa el pantano «al oeste» y TheGamer «al sureste»: el punto del mapa es aproximado.');
gs(99, 'a', 0, 'bombs hookshot', 'Gruta del bosque del suroeste', 'En el bosque de los Deku que separa el Lago Hylia de la zona gerudo, pegado a la pared de roca al oeste de la entrada del lago. Vuela la grieta, mata a la skulltula grande y mira arriba.');
gs(100, 'a', 1, 'silver lens', 'Cueva de las skulltulas invisibles', 'Con los Guanteletes de Plata, levanta la roca enorme junto a la Fuente de la Gran Hada. Sube la cueva de enemigos invisibles y, arriba, sobre la enredadera por la que has trepado.');

/* ───────── Piezas de corazón (36) ───────── */
hp(1, 'c', 0, '', 'Silo del rancho', 'En el edificio con forma de silo del extremo suroeste. Mueve los bloques hasta descubrir un agujero por el que cabe Link niño.');
hp(2, 'x', 0, 'cucco', 'El hombre del tejado', 'Habla con el hombre del tejado azul. De niño: lleva un cuco a la entrada del molino, salta la reja planeando, sube la escalera y planea con el otro cuco hasta el tejado. De adulto basta con el gancho.');
hp(3, 'c', 1, '', 'Tour de excavación de Dampé', 'Paga 10 rupias para que Dampé cave. Es aleatorio; si dice que hay «algo duro», págale para que siga cavando.', 'En el remake el minijuego es mucho más rápido.');
hp(4, 'c', 1, '', 'Gruta bajo una tumba', 'De noche se pueden apartar las lápidas. Abre la tumba del fondo a la derecha, en la segunda fila (sin contar la gran Tumba Real). Debajo hay una gruta con la pieza.', 'Se ha movido dos tumbas a la izquierda respecto a N64 y ya no pide la Canción del Sol.');
hp(5, 'c', 0, 'ocarina', 'Juego de memoria de los Skull Kids', 'Baja junto a la diana, súbete al tocón frente a los dos Skull Kids y repite sus melodías varias rondas.');
hp(6, 'c', 0, 'saria', 'El Skull Kid solitario', 'Nada más entrar desde el Bosque Kokiri, gira a la izquierda. Toca la Canción de Saria al Skull Kid.');
hp(7, 'c', 0, 'fire bombs', 'Vasija giratoria', 'Enciende todas las antorchas de la ciudad empezando por la planta baja, junto a la sala de Darunia. La vasija central empezará a girar: lánzale una bomba desde arriba.');
hp(8, 'c', 0, '', 'Tejado del corral', 'Sube a la cima de la Montaña de la Muerte y acepta el viaje del búho Kaepora Gaebora. Te deja en un tejado de Kakariko: salta al tejado del sur.', 'En N64 estaba en la jaula de la vaca de la casa de Impa.');
hp(9, 'c', 0, 'bombchu', 'Bolera Bombchu', 'Juega en la bolera y hazlo bien: es uno de los premios.');
hp(10, 'c', 1, '', 'El perro perdido', 'De noche, la señora de los perros ha perdido a Richard. Es uno de los perros blancos; suele empezar en el callejón, cerca de su casa. Llévaselo.');
hp(11, 'c', 0, 'cucco', 'Columna del río', 'Sube el río con el cuco del principio. Cruza un hueco planeando, trepa por la enredadera hasta las dos grutas (en una hay otro cuco) y planea desde allí hasta la pieza.');
hp(12, 'c', 0, 'cucco', 'Saliente junto a la cascada', 'Con el mismo cuco, al final del río el camino serpentea a varios niveles: planea río abajo hasta el saliente.', 'El viejo salto con cuco hasta el pilar ya no parece funcionar.');
hp(13, 'c', 0, 'fire', 'Las antorchas de los Zora', 'Enciende todas las antorchas, en cualquier orden; las dos últimas están tras la cascada, en la planta baja. Aparece un cofre.', 'Antes la pieza flotaba; ahora sale en un cofre.');
hp(14, 'c', 0, 'rod', 'Estanque de pesca', 'Pesca un pez de 55 cm o más y el dueño te la regala.', 'Las guías no coinciden en la talla: Respec dice 55 cm y TheGamer 58 cm.');
hp(15, 'c', 0, 'cucco', 'Cofre del suroeste', 'Con el cuco que hay a la izquierda del puente, planea hacia el suroeste: hay un cofre en un saliente.', 'Antes estaba en una caja.');
hp(16, 'c', 0, '', 'Hueco junto a la cascada', 'Desde los salientes de la gerudo y la vaca, sigue hacia el norte y trepa hasta una zona escondida.');
hp(17, 'a', 0, 'bean', 'Planta mágica del cementerio', 'Súbete a la planta nacida de la judía que plantaste de niño: te lleva a una zona antes inaccesible.');
hp(18, 'a', 0, '', 'Interior del molino', 'Al terminar la carrera de Dampé sales al piso alto del molino. Un salto bien medido desde el saliente llega a la pieza.', 'De niño también se alcanza con el bumerán.');
hp(19, 'a', 0, '', 'Carrera contra Dampé', 'Repite la carrera con el fantasma de Dampé y termina en menos de un minuto.');
hp(20, 'a', 0, 'bean', 'Tejado del laboratorio', 'La planta mágica que nace junto al laboratorio da una vuelta al lago y te deja sobre el tejado.');
hp(21, 'a', 0, 'bean', 'Sobre la Caverna Dodongo', 'Súbete a la planta mágica de la entrada de la caverna.', 'Ya no vale el truco de salto para cogerla de niño.');
hp(22, 'a', 0, '', 'Nicho entre las rejas', 'Al salir del Templo del Fuego, busca en el sur del cráter dos rejas trepables. La pieza está entre ambas: baja por ellas.');
hp(23, 'x', 0, '', 'Recompensa de las 50 skulltulas', 'Entrega 50 fichas en la Casa de las Skulltulas.');
hp(24, 'a', 0, 'bean bolero', 'Planta mágica del cráter', 'Planta de niño una judía junto al pedestal del Bolero (misma tierra que la skulltula n.º 60). De adulto, la planta te lleva hasta la pieza.');
hp(25, 'a', 0, '', 'Témpanos de la fuente', 'De adulto, salta por los bloques de hielo de la fuente hasta la pieza.');
hp(26, 'a', 0, 'iron', 'Fondo de la fuente', 'Húndete con las Botas de Hierro hasta el fondo. Tienes vida de sobra para hacerlo sin la Túnica Zora, aunque con ella no te preocupas del aire.');
hp(27, 'a', 0, 'scale', 'Inmersión del laboratorio', 'Consigue la Escama Dorada pescando de adulto un pez de más de 65 cm y toca el fondo del tanque sin Botas de Hierro.');
hp(28, 'c', 0, 'storms', 'Las ranas y la tormenta', 'A mitad del río, toca la Canción de la Tormenta ante las ranas.');
hp(29, 'c', 0, 'ocarina', 'El coro de las ranas', 'Toca una canción distinta a cada rana hasta que las cinco crezcan y supera su juego de imitación.');
hp(30, 'c', 1, 'lens', 'Tienda de los cofres del tesoro', 'En el callejón del fondo, solo de noche. Con la Lente de la Verdad ves qué cofre lleva la llave en cada sala.');
hp(31, 'a', 0, 'longshot pass', 'Cofre del tejado', 'Junto a la puerta de la celda de la que escapaste hay una escalera. Sube a lo más alto y mira al este: hay un cofre al que llegas con el supergancho.');
hp(32, 'a', 0, 'epona pass', 'Tiro con arco a caballo', 'Consigue 1000 puntos o más.');
hp(33, 'a', 0, 'bean', 'Planta mágica del coloso', 'La planta nacida ante el templo te sube hasta la pieza, sobre el arco.');
hp(34, 'c', 0, '', 'El cofre de las dos épocas', 'Camino del territorio gerudo, bajo un saliente de roca, hay un cofre: de niño está sellado y de adulto, vacío. Lee de adulto la Nota de Hada que hay al lado y vuelve de niño para abrirlo.', 'Puzle nuevo del remake.');
hp(35, 'c', 0, 'rupees', 'El Deku de la contraseña', 'A la derecha de la Ciudadela, en el lado del castillo del foso, hay un árbol solitario y una gruta. Lee de adulto la Nota de Hada para saber la contraseña («Sell somethin\', will ya?») y dísela de niño al Deku.', 'Puzle nuevo del remake. Respec la numera por error como «36».');
hp(36, 'c', 0, 'rupees', 'El Deku del cráter', 'De niño no puedes salir de la zona del teletransporte, así que entra desde la cima con la vida llena. A la izquierda, bastante adentro, un Deku comerciante te la vende.', 'Es la pieza que antes estaba en la Caverna de Hielo.');

/* ───────── Judías mágicas (10) ─────────
   Se plantan de niño en la tierra blanda (la misma en la que se suelta el bicho de una skulltula)
   y de adulto son una planta voladora. El vendedor está en el Río Zora y sube 10 rupias con cada una. */
bn(1, 'c', 0, 'seed', 'Tierra blanda del cementerio', 'A la izquierda del cementerio, en la misma tierra blanda de la skulltula n.º 12. De adulto, la planta te sube a una zona a la que no se llega de otro modo.');
bn(2, 'c', 0, 'seed', 'Tierra blanda del oeste del bosque', 'Desde la entrada por el Bosque Kokiri: izquierda y otra vez izquierda. Es la tierra blanda de la skulltula n.º 14.');
bn(3, 'c', 0, 'seed', 'Tierra blanda ante la Caverna Dodongo', 'A la derecha de la boca de la caverna, en la tierra blanda de la skulltula n.º 15. De adulto, la planta te sube sobre la entrada.');
bn(4, 'c', 0, 'seed', 'Tierra blanda junto al vendedor', 'Al lado del propio vendedor de judías, en la tierra blanda de la skulltula n.º 23. De adulto, la planta remonta el río hasta la meseta de las grutas.');
bn(5, 'c', 0, 'seed', 'Tierra blanda del laboratorio', 'A la derecha de la puerta del Laboratorio del Lago, en la tierra blanda de la skulltula n.º 25. De adulto, la planta da una vuelta al lago y te deja en el tejado.');
bn(6, 'c', 0, 'seed', 'Tierra blanda tras la tienda Kokiri', 'Detrás de la tienda, en la tierra blanda de la skulltula n.º 38.');
bn(7, 'c', 0, 'seed', 'Tierra blanda del claro del teatro', 'Desde la entrada: derecha, izquierda, derecha, izquierda, izquierda. Es la tierra blanda de la skulltula n.º 39, en la esquina del fondo a la derecha.');
bn(8, 'c', 0, 'seed cucco', 'Tierra blanda de la gerudo y la vaca', 'Baja planeando con el cuco hasta la orilla de la cascada y sigue el arroyo: es la tierra blanda de la skulltula n.º 41.');
bn(9, 'c', 0, 'seed bolero', 'Tierra blanda del cráter', 'Llega de niño con el Bolero del Fuego: la tierra blanda está junto al pedestal (la de la skulltula n.º 60). Planta rápido, que te quemas.');
bn(10, 'c', 0, 'seed requiem', 'Tierra blanda ante el Templo del Espíritu', 'Llega de niño con el Réquiem del Espíritu: a la izquierda de la entrada del templo, en la tierra blanda de la skulltula n.º 90.');

/* Qué coleccionable depende de cada judía (según las guías consultadas) */
const BEAN_GIVES = { bn1: ['hp17'], bn3: ['hp21'], bn4: ['gs61'], bn5: ['hp20'], bn7: ['gs44'], bn9: ['hp24'], bn10: ['hp33', 'gs94'] };
