/* Atlas de Hyrule — mapas dibujados con un mini-lenguaje, una orden por línea:
   B clase                        fondo
   P clase d…                     forma (path SVG)
   W clase grosor d…              trazo (caminos, ríos, puentes)
   R clase x y ancho alto [texto] rectángulo (salas). «|» parte el texto en dos líneas
   E clase cx cy rx ry [texto]    elipse
   I icono x y [escala]           icono (ver <symbol id="i-…"> en index.html)
   L x y texto / l x y texto      rótulo grande / pequeño
   n x y texto                    nota clara, para escribir sobre el fondo oscuro de las mazmorras
   X x y destino texto            salida a otra zona
   T tamaño x y texto             título grande (solo en la base del gran mapa)
   M id x y                       marcador (gs12, hp3…)
   Clases de terreno: gr hierba · g2 bosque · wt agua · w2 agua honda · pa camino · rk roca · r2 roca oscura
   sd arena · s2 arena oscura · lv lava · bd edificio · rb tejado azul · st piedra · wd madera · ic hielo
   fl suelo de mazmorra · f2 suelo alterno · vd vacío · sw pantano
   Lienzo: 1000×700 por zona o piso; el gran mapa (WORLD) las coloca todas juntas. El norte queda arriba. */

/* El gran mapa: cada zona exterior es una lámina de 1000×700 colocada en una rejilla (columna, fila).
   La Llanura va al doble de tamaño y el Rancho Lon Lon se incrusta en su centro. */
const WORLD = {
  w: 5760, h: 4260, pitch: [1120, 820], margin: 140,
  plates: {
    wasteland: [0, 0], colossus: [1, 0], castle: [2, 0], goron: [3, 0],
    gfortress: [0, 1], market: [2, 1], dmt: [3, 1], dmc: [4, 1],
    gvalley: [0, 2], field: [1, 2, 2, 60, 60], kakariko: [3, 2], graveyard: [4, 2],
    lake: [0, 3], zriver: [3, 3], zdomain: [4, 3],
    sfm: [0, 4], lostwoods: [1, 4], kokiri: [2, 4], zfountain: [4, 4]
  },
  inset: { lonlon: { host: 'field', at: [500, 362], center: [500, 390], s: 0.4 } },
  roads: [['field', 'market'], ['market', 'castle'], ['field', 'kakariko'], ['kakariko', 'dmt'], ['dmt', 'goron'], ['dmt', 'dmc'],
    ['kakariko', 'graveyard'], ['field', 'kokiri'], ['kokiri', 'lostwoods'], ['lostwoods', 'sfm'], ['field', 'lake'],
    ['field', 'gvalley'], ['gvalley', 'gfortress'], ['gfortress', 'wasteland'], ['wasteland', 'colossus']],
  rivers: [['zfountain', 'zdomain'], ['zdomain', 'zriver'], ['zriver', 'field'], ['gvalley', 'lake']],
  base: `
`
};

const MAPS = {

kokiri: { vb: [1000, 700], d: `
B g2
P gr M110,340 Q130,150 330,115 Q520,60 720,150 Q910,210 900,390 Q880,570 700,625 Q480,680 270,640 Q100,560 110,340Z
W wt 14 M350,112 Q400,300 520,370 Q600,420 610,640
E wt 560 395 60 28
W pa 12 M60,345 L210,350 Q400,320 560,300 Q740,280 905,300
W pa 9 M440,100 L450,318
I tree 60 120
I tree 90 600
I tree 940 560
I tree 930 110
I tree 600 40
I tree 250 55
I tree 800 660
I tree 430 685
I tree 50 470
I tree 960 420
I house 190 430
l 190 468 Casa de Link
I house 300 220
l 300 258 Casa de Mido
I house 400 500
l 400 538 Casa de Saria
I house 250 570
l 262 608 Hermanos Sabelotodo
I house 770 470
l 770 508 Casa de las gemelas
I house 740 210
l 740 248 Tienda
I soil 800 170
X 60 345 field Llanura de Hyrule
X 440 82 lostwoods Bosque Perdido
X 925 300 deku Gran Árbol Deku
M gs13 182 530
M gs38 832 158
M gs43 818 446
` },

lostwoods: { vb: [1000, 700], d: `
B g2
W pa 18 M500,650 L500,585
W pa 18 M500,585 L320,585 L150,475
W pa 18 M500,585 L690,585 L690,425 L500,425 L500,270 L310,270
W pa 18 M500,270 L690,270 L690,130 L860,130
E gr 500 590 72 46
E gr 320 585 72 46
E gr 150 470 78 52
E gr 690 585 78 52
E gr 690 425 70 46
E gr 500 425 72 46
E gr 500 270 70 46
E gr 310 270 92 58
E gr 690 270 66 42
E gr 690 130 66 42
I tree 80 120
I tree 180 200
I tree 420 130
I tree 860 300
I tree 900 480
I tree 840 640
I tree 80 640
I tree 240 390
I tree 590 500
I tree 400 350
I tree 600 190
I tree 520 100
l 500 618 Entrada
I stump 300 590
l 320 640 Skull Kid solitario
I soil 128 480
l 150 536 Claro del oeste
I target 665 570
l 690 648 Diana y Skull Kids
l 690 478 Atajo a Ciudad Goron
E wt 500 428 26 14
l 500 482 Estanque (atajo al Río Zora)
I soil 300 285
I hole 345 290
l 310 340 Claro del teatro del bosque
l 500 30 Para llegar al teatro: derecha, izquierda, derecha, izquierda, izquierda
X 500 672 kokiri Bosque Kokiri
X 880 130 sfm Pradera Sagrada
X 770 425 goron Ciudad Goron
M hp6 345 568
M gs14 172 446
M hp5 738 572
M gs39 262 248
M gs44 338 244
` },

sfm: { vb: [1000, 700], d: `
B g2
R gr 380 570 240 110
R gr 240 250 520 320
R g2 300 300 50 210
R g2 410 250 50 200
R g2 410 500 180 26
R g2 520 310 50 130
R g2 640 300 50 210
R g2 300 250 110 26
R wt 525 455 40 30
R pa 455 150 90 100
R gr 320 40 360 115
I stump 500 105
I warp 420 95
I ladder 606 372
I tree 150 150
I tree 850 150
I tree 120 420
I tree 880 430
I tree 200 620
I tree 800 620
l 500 545 Laberinto de los Moblins
l 500 200 Escalinata
l 588 100 Tocón de Saria
X 500 672 lostwoods Bosque Perdido
X 500 28 forest Templo del Bosque
M gs45 608 328
` },

field: { vb: [1000, 700], d: `
B gr
W wt 22 M1000,150 Q850,175 700,125 Q560,75 420,112 Q250,160 120,250 Q60,290 0,300
R st 400 0 200 56
W wd 12 M500,56 L500,108
W pa 9 M500,108 L500,290
W pa 9 M500,200 Q680,200 790,150 L830,75
W pa 9 M560,390 Q760,450 950,515
W pa 9 M480,430 Q430,560 400,660
W pa 9 M405,360 Q220,330 50,330
W wt 8 M1000,430 Q905,432 850,470
E pa 500 360 98 72
E sw 560 618 72 30
E wt 545 622 26 11
I tree 836 482
I tree 650 42
I hole 690 62
I tree 200 540
I tree 260 590
I tree 160 620
I tree 310 640
I tree 230 660
I hole 262 632
I hole 580 606
I rock 150 372
I rock 195 392
I chest 172 420
I tree 700 300
I tree 320 250
I tree 760 600
I tree 880 620
I tree 660 520
l 500 30 Puente levadizo
l 560 664 Zona pantanosa
l 150 455 Salientes de roca
l 225 505 Bosque de los Deku
X 500 78 market Ciudadela
X 835 55 kakariko Kakariko
X 940 205 zriver Río Zora
X 935 518 kokiri Bosque Kokiri
X 400 676 lake Lago Hylia
X 62 318 gvalley Valle Gerudo
M gs37 806 500
M gs98 612 588
M gs99 296 612
M hp34 224 398
M hp35 722 50
` },

lonlon: { vb: [1000, 700], d: `
B gr
E rk 500 390 440 300
E pa 500 390 420 282
R pa 455 20 90 110
E gr 520 430 230 130
E pa 520 430 150 78
R bd 290 95 140 90 Casa de Talon|y Malon
R bd 570 95 140 90 Establo
R st 170 505 100 100
l 220 628 Silo en ruinas
I tree 232 150
I tree 800 300
I tree 160 330
I crate 730 200
l 520 434 Corral de los caballos
M gs6 210 182
M gs34 360 205
M hp1 196 532
M gs35 246 578
` },

market: { vb: [1000, 700], d: `
B r2
R pa 300 220 400 300
R pa 460 100 80 130
R pa 460 510 80 180
R pa 80 300 220 70
R pa 700 150 110 70
E wt 500 370 38 38
E st 500 370 16 16
R bd 300 120 150 90 Tienda de|máscaras
R bd 550 120 150 90 Galería|de tiro
R bd 180 200 110 90 Bazar
R bd 180 380 110 140 Bolera|Bombchu
R bd 710 230 110 130 Tienda de|pociones
R bd 710 380 110 140 Cofres del|tesoro
R bd 560 550 140 100 Sala de|guardia
R pa 60 380 100 180
R bd 40 570 150 80 Casa de la|señora del perro
R st 810 50 150 120 Templo|del Tiempo
l 110 470 Callejón
l 500 430 Plaza del mercado
X 500 676 field Llanura de Hyrule
X 500 92 castle Castillo de Hyrule
M gs5 678 572
M hp9 268 498
M hp30 798 498
M hp10 132 528
` },

castle: { vb: [1000, 700], d: `
B gr
P rk M640,700 L640,540 Q680,450 780,440 L1000,440 L1000,700Z
P rk M0,700 L0,470 Q150,440 250,480 Q330,560 320,700Z
W pa 14 M500,690 Q520,610 460,540 Q420,480 480,415
R st 230 398 220 22
R st 520 398 240 22
W pa 12 M485,400 Q520,330 500,250
W wt 20 M270,235 Q500,290 730,235 L760,110
R st 330 50 340 150 Castillo de Hyrule
I vines 646 590
I tree 596 606
I tree 810 318
I hole 842 350
I crate 742 290
I crate 765 300
I fairy 130 300
I rock 165 318
I tree 320 330
I tree 200 380
l 130 345 Gran Hada
l 742 268 Aquí dormía Talon
l 330 382 De adulto: ruinas de la puerta
l 485 382 Puerta
X 500 676 market Ciudadela
X 500 30 ganon Castillo de Ganondorf (de adulto)
M gs74 566 634
M gs75 872 330
M gs97 290 436
` },

kakariko: { vb: [1000, 700], d: `
B gr
P rk M0,0 L1000,0 L1000,105 Q700,140 520,92 Q300,122 0,90Z
P rk M0,620 Q140,600 230,640 L250,700 L0,700Z
W pa 14 M40,430 L300,430 Q450,420 520,385 Q600,335 650,235
W pa 12 M330,428 Q360,250 400,112
W pa 12 M520,385 Q750,440 960,470
W pa 10 M400,438 Q380,520 368,572
I tree 285 392
I house 262 205
l 262 243 Casa junto a la puerta
R wd 440 285 96 62 Obra
I ladder 618 318
l 618 352 Atalaya
R bd 520 452 136 84 Casa de las|Skulltulas
R bd 296 572 116 72 Casa de Impa
R wd 430 588 92 56 Corral
I well 668 208
l 668 184 Pozo
I mill 812 188 1.4
l 812 228 Molino
R rb 692 300 104 62 Tejado azul
R bd 462 148 112 60 Bazar
I vines 268 598
X 60 430 field Llanura de Hyrule
X 400 70 dmt Sendero de la Montaña
X 940 470 graveyard Cementerio
X 668 146 well Fondo del Pozo
M gs10 316 404
M gs11 228 176
M gs9 552 340
M gs7 648 300
M gs8 502 508
M hp23 668 474
M gs42 244 650
M hp8 420 560
M hp18 852 158
M hp2 814 300
` },

graveyard: { vb: [1000, 700], d: `
B gr
P rk M0,0 L1000,0 L1000,95 L0,95Z
P rk M0,610 L1000,610 L1000,700 L0,700Z
W pa 14 M40,380 L900,380
I hut 170 290 1.5
l 170 326 Cabaña de Dampé
I grave 320 300
I grave 430 300
I grave 540 300
I grave 650 300
I grave 760 300
I grave 320 460
I grave 430 460
I grave 540 460
I grave 650 460
I grave 760 460
R st 860 320 96 110 Tumba|Real
I tree 268 142
I soil 232 160
I grave 700 180 1.3
l 700 212 Tumba de Dampé
I soil 118 520
R rk 60 545 230 50
l 150 575 Saliente elevado
l 485 345 Hileras de tumbas
X 60 380 kakariko Kakariko
X 900 130 shadow Templo de las Sombras
M gs36 128 252
M gs12 200 132
M hp3 485 392
M hp4 794 440
M hp19 738 158
M hp17 252 548
` },

dmt: { vb: [1000, 700], d: `
B rk
P r2 M0,0 L260,0 Q200,120 120,200 Q60,260 0,270Z
P r2 M700,700 L1000,700 L1000,300 Q900,420 820,560Z
W pa 24 M300,690 Q320,600 420,560 Q560,520 520,440 Q470,380 330,360 Q200,340 240,260 Q300,180 460,200 Q620,220 680,150 Q720,112 810,110
E vd 548 440 36 24
I soil 492 478
E vd 212 322 26 18
I rock 300 322
I rock 640 212
I fairy 760 62
I rock 100 80
I rock 880 520
I rock 420 110
I rock 700 420
l 760 92 Gran Hada
l 690 262 Biggoron
l 470 245 Zona de lluvia de rocas
X 300 676 kakariko Kakariko
X 628 440 dodongo Caverna Dodongo
X 150 322 goron Ciudad Goron
X 880 110 dmc Cráter
M gs20 448 592
M gs15 468 506
M hp21 592 372
M gs59 322 296
M gs58 612 244
` },

goron: { vb: [1000, 700], d: `
B r2
E rk 500 360 440 310
E st 500 360 330 228
E r2 500 360 222 150
E rk 500 318 62 40
R bd 430 50 140 60 Sala de Darunia
R st 62 300 136 112
l 130 434 Sala de las rocas
R bd 640 448 84 50 Tienda
I pot 500 430 1.5
I torch 380 300
I torch 620 300
I torch 300 420
I torch 700 420
I rock 168 322
I rock 92 388
l 500 372 Plataforma colgante
l 476 480 Vasija giratoria
l 500 560 Nivel inferior
X 915 360 dmt Sendero de la Montaña
X 500 30 dmc Cráter (tras la estatua)
X 790 610 lostwoods Atajo al Bosque Perdido
M gs21 130 345
M gs52 548 300
M hp7 552 412
` },

dmc: { vb: [1000, 700], d: `
B r2
P lv M150,300 Q300,200 500,230 Q750,200 880,330 Q900,480 700,560 Q450,620 250,540 Q120,440 150,300Z
P rk M0,0 L340,0 Q300,120 200,200 Q100,260 0,270Z
P rk M0,470 Q150,460 230,560 L260,700 L0,700Z
P rk M300,636 L800,636 L800,700 L300,700Z
E rk 105 372 72 46
E rk 480 400 112 72
E rk 800 285 92 60
E rk 668 480 52 32
W wd 10 M560,372 L742,302
I crate 172 132
I crate 204 152
I warp 448 392
I soil 520 412
I ladder 518 660
I ladder 604 660
I scrub 92 372
I fairy 318 58
l 318 88 Gran Hada
l 668 520 Cima del volcán
l 462 362 Pedestal del Bolero
l 420 676 Rejas trepables
X 70 100 dmt Sendero (cima)
X 800 268 fire Templo del Fuego
X 90 610 goron Ciudad Goron
M gs22 232 124
M gs60 552 432
M hp24 672 464
M hp22 561 652
M hp36 132 352
` },

zriver: { vb: [1000, 700], d: `
B gr
P rk M0,0 L1000,0 L1000,120 Q700,160 400,130 Q200,112 0,160Z
P rk M0,620 Q300,580 600,600 Q850,560 1000,470 L1000,700 L0,700Z
W wt 62 M962,170 Q860,330 700,400 Q520,460 330,440 Q180,430 0,520
W pa 12 M40,440 Q200,380 330,372 Q520,382 680,322 Q800,262 880,202
E gr 430 250 122 56
E rk 420 442 20 20
E rk 782 432 40 24
W wd 9 M560,472 L640,442
R wt 925 95 56 92
I soil 214 388
I hole 398 250
I hole 462 244
I pillar 848 332
I tree 120 250
I tree 620 230
I tree 280 240
l 150 412 Vendedor de judías
l 430 300 Meseta de las grutas
l 596 518 Tronco de las ranas
l 952 205 Cascada
X 60 462 field Llanura de Hyrule
X 905 80 zdomain Región de los Zora
M gs23 244 364
M hp11 420 414
M gs61 512 226
M hp28 578 434
M hp29 662 452
M hp12 782 408
M gs24 878 348
M gs62 858 150
` },

zdomain: { vb: [1000, 700], d: `
B r2
E rk 500 370 442 302
E wt 480 430 262 170
E w2 480 440 150 90
R wt 440 78 92 232
R st 700 130 164 84 Sala del trono
R bd 760 520 96 56 Tienda
I torch 300 262
I torch 660 312
I torch 250 480
I torch 462 320
I torch 510 320
l 486 62 Cascada (minijuego de buceo)
l 480 568 Atajo submarino al Lago Hylia
X 130 590 zriver Río Zora
X 900 122 zfountain Fuente Zora
M gs63 404 112
M hp13 486 348
` },

zfountain: { vb: [1000, 700], d: `
B wt
P rk M0,0 L1000,0 L1000,80 Q500,122 0,80Z
P w2 M180,200 Q400,150 560,260 Q560,400 380,420 Q200,400 180,200Z
P gr M0,470 Q200,450 330,520 Q420,600 400,700 L0,700Z
P gr M700,420 Q850,400 1000,430 L1000,700 L640,700 Q650,520 700,420Z
P rk M400,662 L640,662 L640,700 L400,700Z
R st 300 432 150 56 Altar
E r2 520 300 112 70 Lord Jabu-Jabu
E ic 650 200 36 22
E ic 728 150 30 20
E ic 600 132 28 18
E ic 768 252 46 30
I fairy 905 560
I tree 780 502
I rock 878 482 1.4
P rk M330,560 Q380,520 430,560 L430,585 L330,585Z
l 905 592 Gran Hada
l 380 606 Arco sumergido
l 300 362 Aguas profundas
l 700 100 Témpanos (de adulto)
X 70 600 zdomain Región de los Zora
X 520 252 jabu Tripa de Jabu-Jabu
X 870 110 ice Caverna de Hielo
M gs26 752 474
M gs100 928 452
M gs31 520 642
M hp25 770 240
M hp26 300 290
` },

lake: { vb: [1000, 700], d: `
B gr
P wt M120,250 Q300,160 520,200 Q760,180 900,320 Q960,480 820,600 Q600,690 350,640 Q120,580 90,420 Q80,320 120,250Z
P w2 M300,330 Q500,280 700,360 Q760,480 620,540 Q420,560 320,480 Q260,400 300,330Z
W pa 12 M500,60 L480,185
R bd 130 110 172 92 Laboratorio|del Lago
W wd 8 M330,232 L430,300 L500,382
E gr 430 300 34 24
E gr 524 402 72 50
I tree 524 386 1.5
I warp 572 422
I soil 322 168
R bd 820 150 116 72 Estanque|de pesca
E gr 150 602 42 26
I scare 640 250
I tree 700 130
I tree 380 110
l 524 470 El templo está bajo la isla
l 150 644 Hueco para gatear
X 500 40 field Llanura de Hyrule
X 400 400 water Templo del Agua
M hp20 142 72
M gs73 158 184
M hp27 276 128
M gs32 312 222
M gs25 348 150
M gs72 562 366
M hp14 878 256
M gs33 136 584
` },

gvalley: { vb: [1000, 700], d: `
B rk
P r2 M430,0 L570,0 Q602,350 562,700 L420,700 Q398,350 430,0Z
W wt 40 M500,60 Q520,350 490,700
R wt 468 0 64 84
W pa 14 M960,330 L600,330
W pa 14 M400,330 L40,280
W wt 10 M800,200 Q780,330 820,480
W wd 10 M756,330 L842,330
W wd 14 M400,330 L600,330
E rk 452 430 32 20
E rk 448 545 34 22
E rk 548 135 30 22
I soil 462 432
I cow 432 428
I chest 462 550
I tent 230 248 1.5
R rk 240 392 112 24
l 296 442 Arco de piedra
I rock 262 474
I rock 312 480
I rock 880 240
I rock 120 480
I rock 700 560
l 250 160 Campamento de los carpinteros
l 800 300 Puente de tablas
l 500 318 Puente
l 640 300 Cuco
l 500 686 Río abajo: Lago Hylia
l 500 100 Cascada
X 940 330 field Llanura de Hyrule
X 62 282 gfortress Fortaleza Gerudo
M gs40 802 366
M gs41 412 390
M hp15 428 528
M hp16 574 122
M gs85 232 202
M gs84 296 366
` },

gfortress: { vb: [1000, 700], d: `
B sd
P rk M0,0 L1000,0 L1000,90 Q500,120 0,90Z
R bd 330 120 430 270
R st 400 150 300 150 Fortaleza Gerudo
R bd 460 300 180 90
I ladder 372 352
I chest 722 172
R pa 460 480 400 124 Campo de tiro a caballo
I target 495 500
I target 660 496
I target 822 500
R wd 58 190 30 110
I rock 850 560
I rock 220 380
l 372 392 Escalera junto a la celda
l 74 318 Portón
X 60 245 wasteland Desierto Encantado
X 850 400 gtg Centro de Instrucción
X 250 676 gvalley Valle Gerudo
M hp31 692 152
M gs86 784 302
M gs87 850 474
M hp32 660 578
` },

wasteland: { vb: [1000, 700], d: `
B sd
W s2 64 M720,0 Q650,350 740,700
P s2 M0,0 L300,0 Q250,80 120,120 Q50,140 0,130Z
P s2 M0,700 L0,560 Q150,540 260,600 Q330,650 340,700Z
R st 420 300 100 76 Refugio|de piedra
I rock 300 180
I rock 180 420
I rock 560 520
I rock 860 200
I crate 700 345
l 700 380 Río de arena
l 620 250 Sigue las banderas
l 280 290 Sigue al fantasma guía (Lente de la Verdad)
X 935 350 gfortress Fortaleza Gerudo
X 70 350 colossus Coloso del Desierto
M gs88 536 296
` },

colossus: { vb: [1000, 700], d: `
B sd
P rk M0,0 L1000,0 L1000,110 Q500,152 0,110Z
P rk M0,110 L70,110 Q110,360 70,620 L0,640Z
R st 62 258 164 204 Templo del|Espíritu
R rk 540 300 142 28
l 611 352 Arco de roca
E rk 432 522 46 30
E rk 622 545 52 34
E wt 790 500 62 36
I soil 272 440
I fairy 850 150
I warp 500 432
I tree 842 482
I rock 300 600
I rock 900 320
l 850 182 Gran Hada
l 790 552 Oasis
l 335 228 Bandada de pájaros
l 500 468 Pedestal del Réquiem
X 312 318 spirit Templo del Espíritu
X 935 380 wasteland Desierto Encantado
M gs89 332 170
M gs90 300 468
M hp33 612 284
M gs94 628 526
` },

/* ───────── Mazmorras ───────── */

deku: { vb: [1000, 700], floors: {
'3F': `
B vd
E fl 500 350 240 210
E vd 500 350 172 146
R fl 96 290 184 120 Sala de la brújula
R fl 96 180 84 120
I chest 240 380
n 138 168 Hueco lateral
n 500 350 Hueco central (se ve el 1F)
l 500 180 Pasarela del 3F
M gs1 138 222
`,
'2F': `
B vd
E fl 500 350 240 210
E vd 500 350 172 146
R fl 722 290 190 120 Sala del|tirachinas
I vines 300 500
n 500 350 Hueco central
l 500 180 Pasarela del 2F
`,
'1F': `
B vd
E fl 500 350 240 210
I web 500 360 3.4
I vines 292 300
I ladder 706 300
l 500 250 Sala principal
l 500 420 Telaraña: rómpela saltando desde arriba
l 292 338 Enredadera al 2F
X 500 590 kokiri Salir al Bosque Kokiri
`,
'B1': `
B vd
E fl 380 400 180 150
E wt 380 425 132 92
R r2 328 252 104 14
R fl 556 370 116 80 Sala del ojo
R fl 690 370 172 80 Sala inundada
R fl 780 220 112 134 Antorchas
R fl 600 200 164 100 Larvas de|Gohma
R fl 468 138 116 84
n 526 124 Salita oculta
R fl 670 396 22 28
R fl 822 352 28 20
R fl 762 238 20 28
I vines 380 532
I web 592 226
I torch 300 345
n 380 238 Reja
l 380 440 Sala inundada (caes aquí)
M gs2 426 516
M gs3 380 284
M gs4 526 170
`,
'B2': `
B vd
R fl 230 160 240 150 Los tres hermanos Deku
R fl 520 300 270 260 Reina Gohma
R fl 440 300 90 40
I boss 655 380 1.6
n 330 350 Se llega buceando desde el B1
`
} },

dodongo: { vb: [1000, 700], floors: {
'1F': `
B vd
E fl 500 410 232 190
E lv 500 410 152 116
E fl 500 410 62 44
I skull 500 232 2.2
R fl 762 250 92 330 Pasillo|este
R fl 868 330 104 84
n 920 438 Sala lateral
R fl 720 400 46 30
R fl 380 56 240 112 Sala de los bloques
R fl 470 166 60 40
R fl 640 62 112 84
n 700 172 Sala oculta
R fl 150 56 196 112 Rey Dodongo
R fl 110 320 124 190 Sala de los|Lizalfos
R fl 230 400 46 30
I boss 196 80
I scare 786 296
l 500 286 Calavera gigante
l 500 572 Sala principal
X 500 650 dmt Salir al sendero
M gs18 920 362
M gs51 830 290
M gs19 696 96
`,
'2F': `
B vd
E fl 500 410 232 190
E vd 500 410 172 138
W wd 14 M330,410 L670,410
R fl 760 110 180 160 Escalera de|flores bomba
R fl 720 262 60 60
I vines 908 140
R fl 60 350 160 124
n 140 498 Sala de la roca
R fl 216 396 56 30
I rock 160 428 1.6
R fl 380 56 240 112 Sala de los Armos
R fl 150 80 180 110 Saco de bombas
n 500 390 Puente colgante
n 500 470 Hueco (se ve la sala principal)
M gs16 866 138
M gs17 102 388
`
} },

jabu: { vb: [1000, 700], floors: {
'2F': `
B vd
R fl 280 340 240 180 Antesala|del jefe
R fl 480 110 270 180 Barinade
R fl 470 288 50 54
I boss 712 140
I vines 322 380
n 500 560 Se sube desde el B1 tras perder a Ruto
M gs30 322 462
`,
'1F': `
B vd
R fl 440 530 120 130 Boca
R fl 462 420 76 112
E fl 500 320 132 104 Cámara principal
R fl 284 284 90 60
R fl 626 284 90 60
R fl 110 110 180 140 Sala de los|tentáculos
R fl 180 248 110 100
R fl 710 110 180 140 Sala de la|brújula
R fl 710 248 110 100
R fl 410 50 180 110 Sala del|bumerán
R fl 478 158 44 60
l 500 370 Agujeros al B1
X 500 676 zfountain Salir a la Fuente Zora
`,
'B1': `
B vd
E fl 500 330 152 112 Cámara inferior
R fl 646 292 180 80
n 736 278 Pasillo
R fl 822 250 142 164 Gran Octo
R fl 380 470 240 120 Sala del interruptor
R fl 478 438 44 36
R fl 150 270 190 140
R fl 336 316 20 30
I vines 180 300
I chest 300 380
l 262 330 Sala del mapa
M gs27 186 372
M gs28 500 238
M gs29 722 326
`
} },

forest: { vb: [1000, 700], floors: {
'2F': `
B vd
R fl 370 290 260 230 Gran salón (galería alta)
R gr 100 300 224 222 Patio oeste|(desde arriba)
R gr 676 300 224 222 Patio este|(desde arriba)
R fl 110 110 200 140 Sala de los|bloques
R st 686 304 204 26
R fl 400 80 200 140 Sala de los Stalfos
R fl 700 90 190 130 Techo que cae
R fl 330 150 50 150
R fl 620 150 50 150
n 500 262 Pasillos retorcidos a los lados
l 790 322 Cornisa
M gs48 872 350
`,
'1F': `
B vd
R gr 400 590 200 96
I tree 432 632
I tree 568 632
R fl 470 516 60 78
R fl 370 290 260 230 Gran salón
I torch 440 350
I torch 560 350
I torch 440 470
I torch 560 470
R gr 100 300 224 222 Patio oeste
R gr 676 300 224 222 Patio este
I well 800 430
I scare 150 340
l 172 392 Balconcillo (arriba)
R fl 322 392 50 40
R fl 628 392 50 40
R fl 420 130 160 112 Sala norte
R fl 478 240 44 52
l 800 462 Pozo
X 500 690 sfm Salir a la pradera
M gs46 590 606
M gs47 598 312
M gs49 206 344
`,
'B1': `
B vd
R fl 230 300 540 96 Pasadizo bajo el pozo
I chest 500 322
I ladder 270 348
I ladder 730 348
n 500 440 Se entra vaciando el pozo del patio este; une los dos patios
`,
'B2': `
B vd
E fl 500 400 172 152 Sala giratoria
R fl 242 356 92 84
n 270 464 Cámara de las vasijas
R fl 666 356 92 84
R fl 410 60 180 140 Ganon Fantasma
R fl 478 198 44 54
I boss 562 88
n 500 600 Se baja en el ascensor del gran salón
M gs50 288 392
`
} },

fire: { vb: [1000, 700], floors: {
'5F': `
B vd
R fl 250 330 260 170 Sala del cofre
R fl 560 150 240 180 Sala del Martillo|Megatón
R fl 498 300 74 50
I chest 300 462
I chest 760 190
n 380 532 Se sube desde la sala del espantapájaros del 4F
M gs56 468 366
`,
'4F': `
B vd
R fl 250 180 500 340 Laberinto de rocas (parte alta)
R fl 780 300 150 220 Muro de|fuego
R fl 748 380 34 40
R fl 70 370 160 150
R fl 228 430 24 40
I scare 290 484
I block 720 460
n 150 548 Sala del espantapájaros
M gs55 150 432
`,
'3F': `
B vd
R fl 250 180 500 340 Laberinto de rocas rodantes
R fl 760 180 96 84
R fl 110 300 116 124 Celda|goron
R fl 224 350 28 30
n 500 552 Aquí las rocas ruedan por los pasillos
M gs54 808 216
`,
'2F': `
B vd
R fl 380 280 240 200 Ascensor de bloques
R fl 660 300 210 140 Pasillo de las rejas
R fl 618 350 44 40
n 500 520 Piso de paso: sin coleccionables
`,
'1F': `
B vd
R fl 400 500 200 150 Vestíbulo
R fl 650 520 204 124 Losas voladoras
R fl 598 560 54 40
R fl 150 520 204 124 Sala de Darunia
R fl 348 560 54 40
R fl 60 370 180 124 Volvagia
R fl 130 492 44 30
R fl 320 170 440 300
R lv 346 196 388 248 Caverna de lava
R fl 470 468 60 34
R fl 120 180 172 124 Sala oculta
R fl 290 220 32 40
I boss 100 396
I block 366 216
l 366 250 Plataforma que sube
X 500 676 dmc Salir al cráter
M gs53 146 204
M gs57 826 548
`
} },

ice: { vb: [1000, 700], floors: {
'1F': `
B vd
R ic 460 556 80 110
E ic 500 440 132 102 Sala de la cuchilla
R ic 618 310 80 60
E ic 780 310 122 102 Sala de la brújula|(fuego azul)
R ic 302 310 80 60
E ic 222 310 122 102 Puzle del|bloque de hielo
R ic 180 100 164 104 Botas de Hierro
R ic 240 200 44 30
I chest 800 362
I block 200 352
n 560 60 La pieza de corazón de esta cueva se ha mudado al cráter (n.º 36)
X 500 676 zfountain Salir a la Fuente Zora
M gs64 402 400
M gs65 742 250
M gs66 300 252
`
} },

water: { vb: [1000, 700], floors: {
'3F': `
B vd
R fl 300 200 400 300
R wt 336 236 328 228
R fl 440 290 120 120
l 500 398 Torre central
R fl 110 290 150 120 Ala oeste
R fl 258 330 44 40
R fl 740 290 150 120 Ala este
R fl 698 330 44 40
R fl 400 36 200 124 Morpha
R fl 478 158 44 44
R fl 70 70 190 150 Link Oscuro
R fl 150 218 40 74
I boss 572 62
l 500 480 Cámara central, nivel alto
M gs69 500 324
`,
'2F': `
B vd
R fl 300 200 400 300
R wt 336 236 328 228
R fl 440 290 120 120 Torre|central
R fl 740 290 176 120
l 812 396 Muro agrietado
R fl 698 330 44 40
R fl 100 290 160 120 Ala oeste
R fl 258 330 44 40
R fl 350 36 260 124 Pasillo de las rocas|y la cascada
R fl 478 158 44 44
R fl 640 46 150 104 Llave del jefe
R fl 608 80 34 40
l 500 480 Cámara central, nivel medio
M gs71 876 322
M gs70 584 60
`,
'1F': `
B vd
R fl 300 200 400 300
R wt 336 236 328 228
R fl 440 290 120 120 Torre|central
R fl 740 290 176 120 Sala de Ruto
R fl 698 330 44 40
R fl 100 290 160 120 Ala oeste
R fl 258 330 44 40
R fl 400 60 200 104 Ala norte
R fl 478 162 44 40
R fl 420 540 160 104 Entrada
R fl 478 498 44 44
l 500 480 Cámara central, fondo
X 500 676 lake Salir al Lago Hylia
`,
'B1': `
B vd
R fl 420 270 160 140 Bajo la torre
R fl 110 430 440 90 Río de los remolinos
R wt 130 448 400 54
R fl 620 430 230 130 Sala del dragón
R fl 548 455 74 40
R fl 150 150 200 150 Cofre del|Supergancho
R fl 230 298 40 134
I chest 310 180
M gs67 552 290
M gs68 330 428
`
} },

well: { vb: [1000, 700], floors: {
'B1': `
B vd
R fl 200 130 600 450
R vd 262 192 476 326
R fl 330 240 340 230 Cámara central
R f2 340 250 112 92
R f2 548 250 112 92
l 500 302 Celdas
R fl 478 468 44 114
R fl 50 40 190 132 Sala del Beamos
R fl 50 200 130 112
n 112 334 Sala del Like Like
R fl 96 170 40 32
R fl 178 240 24 34
R fl 40 420 150 124 Sala de los|ataúdes
R fl 188 462 14 40
R fl 830 250 144 164 Mano Muerta
R fl 798 310 34 40
I chest 772 380
l 500 160 Pasillo exterior
l 772 414 Cofre invisible
X 500 612 kakariko Salir a Kakariko
M gs76 128 246
M gs77 396 284
M gs78 604 284
`,
'B2': `
B vd
R fl 250 200 500 300 Sótano
I ladder 300 250
I ladder 700 450
l 500 380 Aquí caes si pisas los agujeros invisibles del B1
n 500 540 Sin coleccionables
`
} },

shadow: { vb: [1000, 700], floors: {
'B1': `
B vd
R fl 420 556 160 100 Entrada
R fl 462 420 76 138
E fl 500 330 124 98 Pájaro de|la verdad
R fl 180 280 196 110 Mano Muerta
R fl 624 280 196 110 Sala del mapa
R fl 462 110 76 124
n 278 414 Aquí consigues las Botas Voladoras
n 500 94 Abismo hacia el B2
X 500 676 graveyard Salir al cementerio
`,
'B2': `
B vd
R fl 440 500 120 160 Pasillo|descendente
E fl 500 384 112 88 Beamos
R fl 180 320 210 130 Guadaña invisible
R fl 60 180 150 114
n 135 164 Sala lateral
R fl 120 292 40 30
R fl 610 320 210 130 Sala de la brújula
R fl 452 150 96 150 Bajada al B3
M gs79 135 226
`,
'B3': `
B vd
R fl 420 520 160 140 Guillotinas
E fl 500 372 192 122 Gran caverna
R fl 100 300 190 144 Pinchos|que caen
R fl 286 352 26 40
R fl 710 300 190 144 Pinchos|invisibles
R fl 686 352 26 40
R fl 420 100 160 132 Vasija calavera|gigante
R fl 478 230 44 24
I block 140 410
M gs80 262 322
`,
'B4': `
B vd
R fl 70 490 320 80 Pasillo de los ventiladores
R vd 336 500 40 60
R fl 70 320 136 150 Gibdos
R fl 120 468 40 24
R fl 240 280 204 152 Muelle
R fl 204 380 38 40
R wt 442 318 200 76 Río
I boat 470 356 1.5
I scare 268 322
R fl 640 250 224 224 Laberinto|invisible
R fl 680 76 156 134
l 758 192 Tres vasijas calavera
R fl 738 208 40 44
R fl 880 300 104 134
I boss 932 366 1.4
n 920 456 Bongo Bongo
n 356 592 Foso
M gs81 356 520
M gs82 318 310
M gs83 758 118
`
} },

gtg: { vb: [1000, 700], floors: {
'1F': `
B vd
R fl 410 540 180 120 Entrada
R fl 130 420 220 130 Dunas y rupias|de plata
R fl 110 210 200 160 Sala de la lava
R fl 380 250 240 230 Laberinto central|de las llaves
R fl 690 210 200 160 Sala del agua
R fl 650 420 220 130 Sala de las|estatuas
R fl 380 70 240 130 Sala del martillo
R fl 348 470 64 40
R fl 588 470 64 40
R fl 190 368 40 54
R fl 770 368 40 54
R fl 308 110 74 40
R fl 618 110 74 40
I chest 500 340
n 500 34 Aquí no hay skulltulas ni piezas de corazón
X 500 676 gfortress Salir a la fortaleza
`
} },

spirit: { vb: [1000, 700], floors: {
'4F': `
B vd
R fl 380 260 240 200 Sala del espejo gigante
R fl 400 60 200 150 Birova
R fl 478 208 44 54
I boss 566 88
`,
'3F': `
B vd
R fl 380 200 240 320 Sala de la estatua|(altura de las manos)
I scare 412 250
R fl 180 110 200 92 Pasillo
R fl 330 200 52 60
R fl 50 240 180 150 Nudillo de|Hierro (oeste)
R fl 120 200 60 42
R fl 50 430 180 100 Mano izquierda:|Guanteletes de Plata
R fl 120 388 40 44
R fl 770 240 180 150 Nudillo de|Hierro (este)
R fl 618 300 154 40
R fl 770 430 180 100 Mano derecha:|Escudo Espejo
R fl 840 388 40 44
l 430 286 Saliente
M gs96 438 222
M gs93 342 136
`,
'2F': `
B vd
R fl 380 200 240 320
I statue 500 340 4
l 500 498 Sala de la estatua (base)
R fl 110 250 230 164 Bloques y|rayo de sol
R fl 338 320 44 40
R fl 660 250 230 164 Sala de los espejos
R fl 618 320 44 40
I chest 412 240
M gs92 594 226
`,
'1F': `
B vd
R fl 400 500 200 150 Vestíbulo
R fl 150 440 220 110 Parte de niño|(gatera)
R fl 368 520 34 40
R fl 90 240 210 164 Sala del puente|de reja
R fl 200 402 40 40
R fl 150 110 190 100 Sala de las|antorchas
R fl 200 208 40 34
R fl 630 440 220 110 Parte de adulto|(bloque de plata)
R fl 598 520 34 40
R fl 700 210 230 194 Rocas rodantes
R fl 760 402 40 40
I block 722 232
X 500 676 colossus Salir al coloso
M gs91 272 268
M gs95 752 250
`
} },

ganon: { vb: [1000, 700], floors: {
'1F': `
B vd
E fl 500 330 120 120 Torre de|Ganondorf
R fl 110 110 190 100 Prueba del Bosque
R fl 40 280 190 100 Prueba del Agua
R fl 110 450 190 100 Prueba de|las Sombras
R fl 700 110 190 100 Prueba del Fuego
R fl 770 280 190 100 Prueba de la Luz
R fl 700 450 190 100 Prueba del|Espíritu
R fl 430 540 140 110 Entrada
W fl 26 M300,170 L420,270
W fl 26 M230,330 L380,330
W fl 26 M300,490 L420,400
W fl 26 M700,170 L580,270
W fl 26 M770,330 L620,330
W fl 26 M700,490 L580,400
W fl 26 M500,450 L500,540
I boss 500 262
n 500 34 Dentro no hay coleccionables: la skulltula n.º 97 está fuera, en las ruinas
X 500 676 castle Salir al exterior
`
} }

};
