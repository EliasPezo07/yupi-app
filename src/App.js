import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
 Heart,
 Brain,
 BookOpen,
 Calculator,
 Smile,
 Star,
 ArrowRight,
 ArrowLeft,
 Home,
 CheckCircle,
 RefreshCw,
 Edit3,
 Target,
 Lightbulb,
 MessageCircle,
 Calendar,
 Eye,
 Briefcase,
 VolumeX,
 Volume2
} from 'lucide-react';



const YupiApp = () => {
 const [currentSection, setCurrentSection] = useState('home');
 const [userProgress, setUserProgress] = useState({
  comunicacion: { currentLesson: 0, completedLessons: [] },
  matematicas: { currentLesson: 0, completedLessons: [] },
  psicologia: { lastVisit: null }
 });

 // ¡¡¡CORRECCIÓN CLAVE AQUÍ: DECLARACIÓN DE showAnimation y setShowAnimation!!!
 const [showAnimation, setShowAnimation] = useState(false); 

 // Eliminado: const [cognitiveReflectionText, setCognitiveReflectionText] = useState('');
 // Eliminado: const [lessonStep, setLessonStep] = useState('teaching');
 // Eliminado: const [currentExample, setCurrentExample] = useState(1);
 // Eliminado: const [userAnswer, setUserAnswer] = useState('');

 
 const [selectedLesson, setSelectedLesson] = useState(null);
 const [psychologyModule, setPsychologyModule] = useState(null);


 const [journalEntries, setJournalEntries] = useState([]); // Para el Diario Emocional
 const [stressEvents, setStressEvents] = useState([]);   // Para el Registro de Situaciones Estresantes
 const [relaxActivities, setRelaxActivities] = useState([]); // Para la Planificación de Actividades Relajantes

 // NUEVO: Estados para el modal de opciones de actividad relajante
 const [showActivityOptionsModal, setShowActivityOptionsModal] = useState(false);
 const [selectedActivityForOptions, setSelectedActivityForOptions] = useState(null);


 const [showModal, setShowModal] = useState(false);
 const [modalMessage, setModalMessage] = useState({ text: '', type: 'info' }); 

const [selectedMathLesson, setSelectedMathLesson] = useState(null);
 const [mathStep, setMathStep] = useState('teaching'); // teaching, video, practice
 const [mathAttempts, setMathAttempts] = useState(0);
 const [selectedAnswer, setSelectedAnswer] = useState(null);


 const [testVocacional, setTestVocacional] = useState({
  currentQuestion: 0,
  answers: [],
  showResult: false,
  result: null
 });



 // ESTADOS Y REF PARA EL SONIDO DE FONDO (GLOBAL)
 const audioRef = useRef(null);
 const [isPlaying, setIsPlaying] = useState(false);
 const [volume, setVolume] = useState(0.5);
 const [currentSongIndex, setCurrentSongIndex] = useState(0);
 const playlist = [
  '/beach-cushions.mp3',
  '/decompression.mp3',
  '/sunday-in-bed.mp3',
  '/moonlight-poolside.mp3',
  '/home-town-easy.mp3',
  '/no-smoking.mp3',
  '/tarantula.mp3',
  '/dirty-harry-no-rap.mp3',
  '/19-2000.mp3',
 ];



 // EFECTO PARA CONTROLAR EL VOLUMEN DEL AUDIO
 useEffect(() => {
  if (audioRef.current) {
   audioRef.current.volume = volume;
  }
 }, [volume]);



 // EFECTO PARA REPRODUCIR LA CANCIÓN AUTOMÁTICAMENTE AL CAMBIAR EL ÍNDICE
 useEffect(() => {
  if (audioRef.current) {
   if (isPlaying) {
    audioRef.current.load(); // Carga la nueva fuente
    audioRef.current.play().catch(error => {
     console.error("Error al reproducir automáticamente la nueva canción:", error);
    });
   }
  }
 }, [currentSongIndex, isPlaying]);



 // FUNCIONES PARA CONTROLAR LA MÚSICA
 const toggleMusic = () => {
  if (audioRef.current) {
   if (isPlaying) {
    audioRef.current.pause();
   } else {
    audioRef.current.play().catch(error => {
     console.error("Error al intentar reproducir el audio:", error);
    });
   }
   setIsPlaying(!isPlaying);
  }
 };



 const handleVolumeChange = (e) => {
  setVolume(parseFloat(e.target.value));
 };



 const playNextSong = () => {
  setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
 };



 const playPreviousSong = () => {
  setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
 };
  // Referencia para el foco en textareas
 // Eliminado: const inputRef = useRef(null);
 // Eliminado: useEffect(() => { if (inputRef.current) { inputRef.current.focus(); } }, [cognitiveReflectionText]);


 // Función para mostrar el modal personalizado
 const showCustomModal = (messageText, type = 'info') => {
  setModalMessage({ text: messageText, type: type });
  setShowModal(true);
 };


  // Lecciones de Comunicación
 const synonymsDictionary = {
  // Verbos de descripción
  'describir': ['narrar', 'contar', 'relatar', 'presentar', 'mostrar', 'exponer', 'explicar', 'detallar', 'describir', 'presentar', 'mostrar', 'caracterizar', 'retratar', 'explicar'],
  'cubren': ['ocupan', 'abarcan', 'se extienden', 'comprenden', 'incluyen', 'representan'],
  'regulan': ['controlan', 'mantienen', 'equilibran', 'estabilizan', 'manejan', 'gobiernan'],
  'explicar': ['aclarar', 'definir', 'exponer', 'describir', 'detallar', 'interpretar'],
  'identificar': ['reconocer', 'determinar', 'señalar', 'encontrar', 'localizar', 'detectar'],
  'inferir': ['deducir', 'concluir', 'suponer', 'asumir', 'interpretar', 'entender'],
  'termina': ['finaliza', 'concluye', 'acaba', 'cierra'],
  'comienza': ['inicia', 'empieza', 'arranca', 'abre'],

  // Adjetivos descriptivos
  'hermoso': ['bonito', 'bello', 'agradable', 'lindo', 'precioso', 'encantador', 'atractivo', 'soleado'],
  'principal': ['central', 'importante', 'fundamental', 'esencial', 'básico', 'primordial'],
  'importante': ['relevante', 'significativo', 'fundamental', 'esencial', 'crucial', 'vital'],
  'grande': ['enorme', 'gigante', 'inmenso', 'vasto', 'extenso', 'amplio'],
  'pequeño': ['diminuto', 'minúsculo', 'chico', 'reducido', 'mínimo', 'tiny'],
  'rápido': ['veloz', 'acelerado', 'ágil', 'ligero', 'presto'],
  'triste': ['melancólico', 'deprimido', 'apenado', 'doliente', 'afligido'],
  'feliz': ['alegre', 'contento', 'jovial', 'gozoso', 'dichoso', 'satisfecho'],
  'brillante': ['resplandeciente', 'luminoso', 'radiante', 'reluciente', 'brilloso', 'espléndido'],
  'nervioso': ['inquieto', 'ansioso', 'preocupado', 'agitado', 'intranquilo'],
  'misterioso': ['enigmático', 'extraño', 'raro', 'desconocido', 'oculto', 'secreto'],

  // Sustantivos
  'día': ['jornada', 'fecha', 'momento', 'tiempo', 'período'],
  'clima': ['tiempo', 'ambiente', 'condiciones', 'temperatura', 'atmósfera'],
  'tierra': ['planeta', 'mundo', 'superficie', 'globo', 'suelo'],
  'agua': ['líquido', 'fluido', 'recurso hídrico'],
  'carta': ['mensaje', 'nota', 'comunicación', 'correspondencia', 'documento'],
  'problema': ['conflicto', 'dificultad', 'obstáculo', 'inconveniente', 'complicación', 'misterio', 'enigma', 'secreto', 'tensión'],
  'solución': ['respuesta', 'resolución', 'salida', 'alternativa', 'medida'],
  'tema': ['asunto', 'tópico', 'materia', 'cuestión', 'punto'],
  'personaje': ['protagonista', 'persona', 'individuo', 'figura', 'carácter', 'héroe'],
  'ambiente': ['entorno', 'atmósfera', 'contexto', 'escenario', 'medio'],
  'beneficio': ['ventaja', 'provecho', 'ganancia', 'utilidad', 'conveniencia', 'ventajas', 'efectos positivos'],
  'efecto': ['consecuencia', 'resultado', 'impacto', 'repercusión', 'influencia', 'efectos'],
  'causa': ['motivo', 'razón', 'origen', 'fuente', 'factor', 'causas'],
  'lectura': ['leer'],
  'lluvia': ['mojó', 'empapó'],
  'paraguas': ['roto', 'dañó', 'averió', 'falló'],
  'visita': ['inspección', 'inesperada', 'imprevista', 'no programada'],
  'narrador': ['primera persona', 'tercera persona', 'omnisciente', 'yo', 'protagonista', 'interno', 'personaje'],
  'sobrenatural': ['paranormal', 'misterioso', 'extraño', 'inexplicable'],
  'miedo': ['temor', 'terror', 'suspenso', 'inquietud'],
  'estructura': ['introducción', 'desarrollo', 'conclusión'],
  'argumentos': ['tesis', 'evidencia', 'ejemplos'],

  // Adverbios
  'velozmente': ['rápidamente', 'aceleradamente', 'ágilmente', 'presto', 'ligero'],
  'intensamente': ['fuertemente', 'vigorosamente', 'enérgicamente', 'profundamente']
};

// 2. RESPUESTAS MÚLTIPLES VÁLIDAS CON PALABRA/S CLAVE
const comunicacionLessonsImproved = [
  {
    title: "Lectura y comprensión de textos",
    teaching: "La comprensión lectora implica entender no solo las palabras, sino el mensaje completo del texto. Debemos identificar la idea principal, detalles importantes y el propósito del autor. Practica leyendo fragmentos de distintos géneros y contestando preguntas de comprensión.",
    examples: [
      {
        text: "El sol brillaba intensamente mientras María caminaba por el parque. Los niños jugaban alegremente y las flores mostraban sus colores vibrantes.",
        question: "¿Cuál es la idea principal del texto?",
        validAnswers: [
          "Describir un día hermoso en el parque",
          "Narrar un día soleado en el parque",
          "Contar sobre un día bonito en el parque",
          "Relatar una escena hermosa del parque",
          "Presentar un día agradable en el parque",
          "Mostrar un momento bello en el parque"
        ],
        keyWords: ['describir', 'narrar', 'contar', 'relatar', 'presentar', 'mostrar', 'día', 'hermoso', 'bonito', 'bello', 'agradable', 'soleado', 'parque', 'escena', 'momento'],
        minKeyWords: 2
      },
      {
        text: "Los océanos cubren el 71% de la superficie terrestre y contienen el 97% del agua del planeta. Son fundamentales para regular el clima global.",
        question: "¿Cuál es el dato más importante sobre los océanos?",
        validAnswers: [
          "Cubren la mayor parte de la Tierra y regulan el clima",
          "Ocupan la mayor parte del planeta y controlan el clima",
          "Se extienden por gran parte del planeta y mantienen el equilibrio climático",
          "Abarcan casi toda la superficie terrestre y controlan las condiciones climáticas",
          "Representan la mayor extensión del planeta y regulan el tiempo",
          "Comprenden la mayoría de la superficie y equilibran el clima"
        ],
        keyWords: ['cubren', 'ocupan', 'abarcan', 'se extienden', 'representan', 'mayor', 'parte', 'planeta', 'tierra', 'superficie', 'regulan', 'controlan', 'mantienen', 'equilibran', 'clima', 'tiempo', 'condiciones'],
        minKeyWords: 3
      }
    ]
  },
  {
    title: "Identificación de la idea principal en textos narrativos, descriptivos y expositivos",
    teaching: "En textos narrativos buscamos la acción central; en descriptivos, la descripción del objeto o lugar; en expositivos, la información principal que el autor quiere transmitir. Reconocer la idea principal nos ayuda a captar la esencia del texto.",
    examples: [
      {
        text: "Narrativo: Juan salió de su casa sin saber que aquel día cambiaría su vida para siempre. Descriptivo: La montaña se alzaba imponente con nieve en su cima y pinos verdes a su alrededor. Expositivo: La fotosíntesis es el proceso por el cual las plantas transforman la luz solar en energía.",
        question: "Identifica la idea principal de cada fragmento.",
        validAnswers: [
          "Narrativo: El día que cambia la vida de Juan. Descriptivo: Características de la montaña. Expositivo: Explicación breve de lo que es la fotosíntesis.",
          "Narrativo: Un día transformador para Juan. Descriptivo: Descripción de la montaña. Expositivo: Definición de fotosíntesis.",
          "Narrativo: El momento decisivo de Juan. Descriptivo: Rasgos de la montaña. Expositivo: Concepto de fotosíntesis.",
          "Narrativo: El día importante de Juan. Descriptivo: Aspecto de la montaña. Expositivo: Proceso de fotosíntesis.",
          "Narrativo: Cambio en la vida de Juan. Descriptivo: Imagen de la montaña. Expositivo: Funcionamiento de la fotosíntesis."
        ],
        keyWords: ['narrativo', 'día', 'cambia', 'transforma', 'vida', 'juan', 'descriptivo', 'características', 'descripción', 'rasgos', 'montaña', 'expositivo', 'explicación', 'definición', 'concepto', 'fotosíntesis', 'proceso'],
        minKeyWords: 4
      },
      {
        text: "Carla encontró una carta olvidada en un cajón, contenía un secreto familiar. Descriptivo: El mercado de frutas estaba lleno de colores vivos y aromas frescos. Expositivo: El sistema solar está compuesto por ocho planetas que orbitan alrededor del Sol.",
        question: "¿Qué idea principal tiene el fragmento descriptivo?",
        validAnswers: [
          "Describir el ambiente del mercado de frutas",
          "Presentar el entorno del mercado de frutas",
          "Mostrar cómo es el mercado de frutas",
          "Caracterizar el mercado de frutas",
          "Retratar la atmósfera del mercado",
          "Explicar el aspecto del mercado de frutas"
        ],
        keyWords: ['describir', 'presentar', 'mostrar', 'caracterizar', 'retratar', 'explicar', 'ambiente', 'entorno', 'atmósfera', 'aspecto', 'mercado', 'frutas'],
        minKeyWords: 2
      }
    ]
  },
  {
    title: "Reconocimiento de la estructura de los textos: introducción, desarrollo y conclusión",
    teaching: "Todo texto bien estructurado tiene: Introducción (presenta el tema), Desarrollo (explica o narra) y Conclusión (resume o cierra la idea). Identificar estas partes ayuda a organizar la lectura y la redacción.",
    examples: [
      {
        text: "Introducción: El cambio climático es un desafío global. Desarrollo: El aumento de gases de efecto invernadero provoca el derretimiento de glaciares y fenómenos meteorológicos extremos. Conclusión: Para mitigar sus efectos, necesitamos energías renovables y reducir la huella de carbono.",
        question: "Señala la introducción, el desarrollo y la conclusión.",
        validAnswers: [
          "Introducción: Presentación del cambio climático. Desarrollo: Explicación de sus causas y efectos. Conclusión: Propuesta de soluciones.",
          "Introducción: Introducción al cambio climático. Desarrollo: Causas y consecuencias. Conclusión: Soluciones propuestas.",
          "Introducción: Planteamiento del problema. Desarrollo: Análisis de efectos. Conclusión: Medidas sugeridas.",
          "Introducción: Tema del cambio climático. Desarrollo: Efectos y causas. Conclusión: Alternativas de solución.",
          "Introducción: Problema climático. Desarrollo: Consecuencias del problema. Conclusión: Propuestas para solucionarlo."
        ],
        keyWords: ['introducción', 'presentación', 'planteamiento', 'tema', 'cambio', 'climático', 'desarrollo', 'explicación', 'causas', 'efectos', 'consecuencias', 'análisis', 'conclusión', 'propuesta', 'soluciones', 'medidas', 'alternativas'],
        minKeyWords: 4
      },
      {
        text: "Introducción: La lectura diaria mejora la concentración. Desarrollo: Estudios muestran que leer antes de dormir ayuda a reducir el estrés y fortalecer la memoria. Conclusión: Incorporar la lectura en la rutina diaria trae múltiples beneficios.",
        question: "¿Dónde termina el desarrollo y empieza la conclusión?",
        validAnswers: [
          "El desarrollo termina al mencionar los beneficios, y la conclusión comienza al sugerir incorporar la lectura en la rutina.",
          "El desarrollo finaliza con los beneficios, la conclusión inicia con la sugerencia de leer diariamente.",
          "El desarrollo concluye con las ventajas, la conclusión empieza con la recomendación de leer.",
          "El desarrollo acaba con los efectos positivos, la conclusión arranca con la propuesta de rutina.",
          "El desarrollo se cierra con los beneficios, la conclusión se abre con la idea de leer habitualmente."
        ],
        keyWords: ['desarrollo', 'termina', 'finaliza', 'concluye', 'acaba', 'beneficios', 'ventajas', 'efectos', 'conclusión', 'comienza', 'inicia', 'empieza', 'sugerir', 'incorporar', 'rutina', 'lectura', 'leer'],
        minKeyWords: 3
      }
    ]
  },
  {
    title: "Reconocimiento de sinónimos y antónimos",
    teaching: "Un sinónimo es una palabra con significado similar; un antónimo es una palabra con significado opuesto. Identificar sinónimos y antónimos enriquece el vocabulario y mejora la comprensión lectora.",
    examples: [
      {
        text: "Escribe un sinónimo de brillante y un antónimo de triste.",
        question: "Sinónimo de brillante: resplandeciente. Antónimo de triste: feliz.",
        validAnswers: [
          "Resplandeciente / Feliz",
          "Luminoso / Alegre",
          "Radiante / Contento",
          "Brilloso / Jovial",
          "Reluciente / Dichoso",
          "Espléndido / Satisfecho"
        ],
        keyWords: ['resplandeciente', 'luminoso', 'radiante', 'brilloso', 'reluciente', 'espléndido', 'feliz', 'alegre', 'contento', 'jovial', 'dichoso', 'satisfecho'],
        minKeyWords: 2
      },
      {
        text: "Identifica en el siguiente texto un sinónimo de rápido y un antónimo de grande: \"El avión surcó el cielo velozmente sobre la diminuta isla.\"",
        question: "Sinónimo de rápido: velozmente. Antónimo de grande: diminuta.",
        validAnswers: [
          "Velozmente / Diminuta",
          "Rápidamente / Pequeña",
          "Aceleradamente / Minúscula",
          "Ágilmente / Chica",
          "Presto / Reducida",
          "Ligero / Mínima"
        ],
        keyWords: ['velozmente', 'rápidamente', 'aceleradamente', 'ágilmente', 'presto', 'ligero', 'diminuta', 'pequeña', 'minúscula', 'chica', 'reducida', 'mínima'],
        minKeyWords: 2
      }
    ]
  },
  {
    title: "Inferencia y deducción: aprender a inferir información no explícita",
    teaching: "La inferencia consiste en deducir información a partir de pistas del texto. No todo se dice de forma directa; a veces debemos \"leer entre líneas\" para entender el mensaje implícito.",
    examples: [
      {
        text: "Laura llegó empapada a clase, con paraguas roto. No dijo nada sobre la lluvia, pero su ropa y cabello mojados lo indican.",
        question: "¿Qué podemos inferir sobre lo que sucedió antes?",
        validAnswers: [
          "Que Laura estuvo bajo la lluvia y su paraguas se rompió.",
          "Laura se mojó por la lluvia porque se le dañó el paraguas.",
          "Se empapó porque el paraguas no funcionó bajo la lluvia.",
          "La lluvia la mojó al romperse su paraguas.",
          "Llovió y el paraguas de Laura se averió.",
          "El paraguas falló y Laura se mojó con la lluvia."
        ],
        keyWords: ['laura', 'lluvia', 'paraguas', 'rompió', 'dañó', 'averió', 'falló', 'mojó', 'empapó', 'estuvo', 'bajo'],
        minKeyWords: 3
      },
      {
        text: "Al oír el timbre, Marcos guardó rápidamente su cuaderno en la mochila y adoptó una postura seria. La profesora acababa de anunciar la visita sorpresa.",
        question: "¿Qué infieres sobre la actitud de Marcos?",
        validAnswers: [
          "Que estaba nervioso o no preparado para la visita sorpresa.",
          "Estaba inquieto porque no esperaba la visita.",
          "Se puso ansioso por la visita inesperada.",
          "No estaba listo para la inspección sorpresa.",
          "Se sintió preocupado por la visita imprevista.",
          "Estaba intranquilo ante la visita no programada."
        ],
        keyWords: ['nervioso', 'inquieto', 'ansioso', 'preocupado', 'intranquilo', 'preparado', 'listo', 'visita', 'sorpresa', 'inesperada', 'imprevista', 'inspección'],
        minKeyWords: 2
      }
    ]
  },
  {
    title: "Redacción de textos narrativos: escribir relatos y cuentos breves",
    teaching: "Para escribir un buen relato, piensa en personajes, un conflicto, un escenario y una secuencia de eventos con inicio, nudo y desenlace. Usa descripciones y diálogos para hacerlo vívido.",
    examples: [
      {
        text: "Escribe un cuento breve sobre un animal que habla y su aventura en la ciudad.",
        question: "Redacta tu cuento, cuidando la estructura narrativa.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un cuento con inicio, nudo y desenlace."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      },
      {
        text: "Crea un relato de no más de 100 palabras sobre un encuentro inesperado con un objeto mágico.",
        question: "Redacta el relato con descripción del encuentro y diálogo breve.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un relato con descripción y diálogo."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      }
    ]
  },
  {
    title: "Redacción de textos expositivos: estructurar un ensayo o artículo breve",
    teaching: "Un texto expositivo informa de manera clara y objetiva. Debe tener una introducción, desarrollo (con datos y explicaciones) y una conclusión que resuma la información.",
    examples: [
      {
        text: "Investiga sobre la importancia del reciclaje y escribe un artículo breve.",
        question: "Estructura tu artículo con introducción, desarrollo (datos, beneficios) y conclusión.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un artículo con la estructura solicitada y datos sobre reciclaje."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      },
      {
        text: "Escribe un texto explicativo sobre los volcanes.",
        question: "Incluye definiciones, procesos y ejemplos de volcanes famosos.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un texto que defina volcanes, explique sus procesos y mencione ejemplos."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      }
    ]
  },
  {
    title: "Escritura y redacción avanzada: redactar cartas, ensayos y composiciones",
    teaching: "Dominar diferentes tipos de textos escritos te permite comunicar eficazmente en diversas situaciones. Cada formato (carta, ensayo) tiene sus propias reglas y propósito.",
    examples: [
      {
        text: "Redacta una carta formal solicitando información sobre un curso de tu interés.",
        question: "Incluye saludo, cuerpo con motivos y despedida formal.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera una carta con formato formal."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      },
      {
        text: "Escribe un ensayo de opinión sobre el uso de la tecnología en la educación.",
        question: "Presenta introducción, argumentos a favor, argumentos en contra y conclusión.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un ensayo con argumentos a favor y en contra y una conclusión."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      }
    ]
  },
  {
    title: "Redacción de textos argumentativos: organizar y expresar argumentos de manera lógica",
    teaching: "Un texto argumentativo busca convencer. Debe tener una tesis clara, argumentos sólidos respaldados por evidencia y una conclusión que refuerce tu punto de vista.",
    examples: [
      {
        text: "Escribe un texto argumentando por qué el trabajo en equipo es crucial.",
        question: "Incluye tesis, evidencia de trabajo en equipo y conclusión.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un texto argumentativo con tesis, evidencia y conclusión."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      },
      {
        text: "Argumenta a favor o en contra de los deberes escolares.",
        question: "Desarrolla al menos dos argumentos con ejemplos y cierra con conclusión.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se esperan al menos dos argumentos con ejemplos y una conclusión."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      }
    ]
  },
  {
    title: "Debates y discusiones: aprender a argumentar y defender puntos de vista",
    teaching: "Participar en debates mejora la capacidad de argumentación y el pensamiento crítico. Es vital escuchar, refutar y defender tus puntos con respeto y lógica.",
    examples: [
      {
        text: "Piensa en un debate sobre el uso de plásticos. ¿Cuáles serían los argumentos principales de ambos equipos y cómo los refutarías?",
        question: "Escribe los argumentos principales de ambos equipos y una refutación breve.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se esperan argumentos a favor y en contra y una refutación."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      },
      {
        text: "Prepara un argumento para persuadir a tus amigos de la importancia de leer más libros.",
        question: "Incluye al menos tres argumentos por cada lado.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se esperan al menos tres argumentos convincentes."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      }
    ]
  },
  {
    title: "Identificación de temas centrales y elementos literarios (personajes, conflictos, narradores)",
    teaching: "Al leer un texto literario, identifica el tema central (mensaje principal), los personajes (protagonista, antagonista), el conflicto (lo que impulsa la historia) y el narrador (primera persona, tercera persona, omnisciente).",
    examples: [
      {
        text: "Fragmento: \"María sintió el corazón latir con fuerza cuando se acercó a la puerta. El silencio era abrumador. Abrió y encontró una carta que cambiaba su destino.\"",
        question: "¿Quién es protagonista, cuál es el conflicto y qué tipo de narrador se usa?",
        validAnswers: [
          "Protagonista: María. Conflicto: Descubrir el contenido de la carta misteriosa. Narrador: Tercera persona limitada (describe solo lo que siente María).",
          "Protagonista: María. Conflicto: El misterio de la carta. Narrador: Tercera persona.",
          "Personaje principal: María. Problema: La carta desconocida. Narrador: Externa limitada.",
          "Protagonista: María. Conflicto: La carta enigmática. Narrador: Tercera persona que conoce los sentimientos de María.",
          "Héroe: María. Tensión: El contenido misterioso. Narrador: Tercera persona."
        ],
        keyWords: ['protagonista', 'personaje', 'principal', 'héroe', 'maría', 'conflicto', 'problema', 'tensión', 'carta', 'misteriosa', 'misterio', 'desconocida', 'enigmática', 'narrador', 'tercera', 'persona', 'limitada', 'externa'],
        minKeyWords: 4
      },
      {
        text: "Fragmento de cuento: \"Yo siempre supe que algo extraño ocurría en la casa vieja. Nadie más lo notaba, pero yo escuchaba susurros en los pasillos.\"",
        question: "¿Qué tipo de narrador se utiliza y cuál podría ser el tema central?",
        validAnswers: [
          "Narrador: Primera persona. Tema central: Lo sobrenatural o el miedo a lo desconocido.",
          "Narrador: Yo. Tema: Lo paranormal o el temor a lo misterioso.",
          "Narrador: Primera persona. Tema: Lo extraño o el miedo.",
          "Narrador: Protagonista. Tema: Fenómenos sobrenaturales o terror.",
          "Narrador: Interno. Tema: Lo inexplicable o la inquietud.",
          "Narrador: Personaje. Tema: Misterio o suspenso."
        ],
        keyWords: ['narrador', 'primera', 'persona', 'yo', 'protagonista', 'interno', 'personaje', 'tema', 'sobrenatural', 'paranormal', 'extraño', 'misterioso', 'inexplicable', 'miedo', 'temor', 'terror', 'suspenso'],
        minKeyWords: 3
      }
    ]
  },
  {
    title: "Redacción de artículos de opinión, carteles, folletos o informes",
    teaching: "Redactar diferentes tipos de textos informativos o persuasivos requiere adaptar el lenguaje y la estructura al propósito. Ya sea un cartel, un folleto o un informe, la claridad es clave.",
    examples: [
      {
        text: "Diseña un cartel para promocionar un taller de lectura en tu escuela.",
        question: "Incluye título llamativo, breve descripción del taller y datos de inscripción.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un cartel con los elementos clave de promoción."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      },
      {
        text: "Realiza un informe sobre los resultados de una encuesta de hábitos de estudio.",
        question: "Estructura: introducción, datos de encuesta (porcentajes), breve análisis y conclusión.",
        validAnswers: ["La evaluación para este tipo de respuesta es manual. Se espera un informe con la estructura y datos solicitados."],
        keyWords: [],
        minKeyWords: 0 // Requires manual evaluation
      }
    ]
  }
];

// 3. FUNCIÓN DE EVALUACIÓN MEJORADA
function evaluateAnswer(userAnswer, exampleData) {
  if (!userAnswer || !userAnswer.trim()) {
    return {
      isCorrect: false,
      score: 0,
      feedback: "Por favor, escribe una respuesta."
    };
  }
  const userAnswerLower = userAnswer.toLowerCase().trim();
// Handle manual evaluation cases
      if (exampleData.minKeyWords === 0 && (exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un cuento con inicio, nudo y desenlace.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un relato con descripción y diálogo.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un artículo con la estructura solicitada y datos sobre reciclaje.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un texto que defina volcanes, explique sus procesos y mencione ejemplos.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera una carta con formato formal.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un ensayo con argumentos a favor y en contra y una conclusión.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un texto argumentativo con tesis, evidencia y conclusión.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se esperan al menos dos argumentos con ejemplos y una conclusión.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se esperan argumentos a favor y en contra y una refutación.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se esperan al menos tres argumentos convincentes.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un cartel con los elementos clave de promoción.") ||
          exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un informe con la estructura y datos solicitados."))) { // <--- CORRECCIÓN DE PARÉNTESIS AQUÍ
        return {
          isCorrect: false, // Default to false, as it's manual
          score: 0,
          feedback: exampleData.validAnswers[0] + " Esta respuesta requiere una revisión manual."
        };
      }
// Método 1: Verificar si coincide exactamente con alguna respuesta válida
      const exactMatch = exampleData.validAnswers.some(validAnswer =>
        userAnswerLower === validAnswer.toLowerCase().trim()
      );

      if (exactMatch) {
        return {
          isCorrect: true,
          score: 100,
          feedback: "¡Excelente! Respuesta perfecta."
        };
      }

      // Método 2: Evaluación por palabras clave con sinónimos
      const keyWordsFound = [];
      const expandedKeyWords = [];

      // Expandir palabras clave con sinónimos
      exampleData.keyWords.forEach(keyWord => {
        expandedKeyWords.push(keyWord);
        if (synonymsDictionary[keyWord]) {
          expandedKeyWords.push(...synonymsDictionary[keyWord]);
        }
      });

      // Buscar palabras clave en la respuesta del usuario
      expandedKeyWords.forEach(keyWord => {
        if (userAnswerLower.includes(keyWord.toLowerCase())) {
          keyWordsFound.push(keyWord);
        }
      });

      // Remover duplicados
      const uniqueKeyWordsFound = [...new Set(keyWordsFound)];

      // Calcular puntuación
      const minRequired = exampleData.minKeyWords || 2;
      const foundCount = uniqueKeyWordsFound.length;
      const score = Math.min(100, (foundCount / minRequired) * 100);

      // Determinar si es correcta
      let isCorrect = foundCount >= minRequired;

      // Método 3: Evaluación por similitud semántica básica
      if (!isCorrect) {
        // Verificar si al menos contiene conceptos relacionados
        const conceptMatch = exampleData.validAnswers.some(validAnswer => {
          const validWords = validAnswer.toLowerCase().split(/\s+/);
          const userWords = userAnswerLower.split(/\s+/);

          let matches = 0;
          validWords.forEach(validWord => {
            if (validWord.length > 3) { // Solo palabras significativas
              userWords.forEach(userWord => {
                if (userWord.includes(validWord) || validWord.includes(userWord)) {
                  matches++;
                }
              });
            }
          });

          return matches >= 2; // Al menos 2 coincidencias conceptuales
        });

        if (conceptMatch) {
          isCorrect = true; // Mark as correct if conceptual match is found
          return {
            isCorrect: true,
            score: Math.max(score, 70),
            feedback: "¡Muy bien! Tu respuesta captura la idea principal."
          };
        }
      }

      // Generar feedback
      let feedback;
      if (isCorrect) {
        feedback = score === 100 ? "¡Excelente! Respuesta perfecta." : "¡Muy bien! Has captado la idea principal.";
      } else if (score >= 50) {
        feedback = "Vas por buen camino, pero tu respuesta puede ser más completa.";
      } else {
        feedback = "Tu respuesta necesita incluir más elementos clave del texto.";
      }

      return {
        isCorrect: isCorrect,
        score: Math.round(score),
        feedback: feedback,
        keyWordsFound: uniqueKeyWordsFound,
        minRequired: minRequired
      };
    }
 // Lecciones de Matemáticas
const matematicasLessons = [
  {
    title: "Suma y Resta de Enteros",
    subject: "algebra",
    teaching: "Los números enteros incluyen a los naturales, el cero y los negativos. Para sumar o restar, si tienen el mismo signo, se suman los valores absolutos y se mantiene el signo. Si tienen signos diferentes, se restan los valores absolutos y se pone el signo del número con mayor valor absoluto.",
    solution: "Ejemplo: $5 + (-3) = 2$. Restamos 5 y 3 porque tienen signos diferentes, y el 5 es mayor, así que el resultado es positivo.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=FDsKgfcy5h8", // Matemáticas profe Alex - Suma y Resta de Números Enteros
      "https://www.youtube.com/watch?v=aGJ00fU5Cik"  // julioprofe - Suma y Resta de Números Enteros
    ],
    question: "¿Cuál es el resultado de $-7 + 4$?",
    options: [
      { text: "-3", correct: true },
      { text: "3", correct: false },
      { text: "-11", correct: false },
      { text: "11", correct: false }
    ],
    explanation: "Para resolver $-7 + 4$: Restamos los valores absolutos (7 - 4 = 3) y mantenemos el signo del número con mayor valor absoluto (el 7 es negativo), por lo tanto, el resultado es -3."
  },
  {
    title: "Multiplicación y División de Enteros",
    subject: "algebra",
    teaching: "Para multiplicar o dividir enteros, se multiplican o dividen los valores absolutos y se aplica la regla de los signos: signos iguales dan positivo (+), signos diferentes dan negativo (-).",
    solution: "Ejemplo: $(-6) \\times (-2) = 12$. Signos iguales dan positivo. $10 \\div (-5) = -2$. Signos diferentes dan negativo.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=pdnmX2PsyWM", // Matemáticas profe Alex - Multiplicación y División de Números Enteros
      "https://www.youtube.com/watch?v=PUG2If5MqZ0"  // julioprofe - Multiplicación y División de Números Enteros
    ],
    question: "¿Cuál es el resultado de $-8 \\times 3$?",
    options: [
      { text: "24", correct: false },
      { text: "-24", correct: true },
      { text: "5", correct: false },
      { text: "-5", correct: false }
    ],
    explanation: "Para resolver $-8 \\times 3$: Multiplicamos los valores absolutos (8 * 3 = 24) y aplicamos la regla de los signos (negativo por positivo da negativo), por lo tanto, el resultado es -24."
  },
  {
    title: "Suma y Resta de Fracciones",
    subject: "aritmetica",
    teaching: "Para sumar o restar fracciones con diferente denominador, primero encontramos un denominador común (mínimo común múltiplo). Luego, convertimos las fracciones a este denominador y finalmente sumamos o restamos los numeradores, manteniendo el denominador común.",
    solution: "Ejemplo: $\\frac{1}{2} + \\frac{1}{3}$. El MCM de 2 y 3 es 6. Convertimos: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=CdF65vhhxXU", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=qJtoI1ipxs8"  // julioprofe
    ],
    question: "¿Cuál es el resultado de $\\frac{2}{5} + \\frac{1}{3}$?",
    options: [
      { text: "a) 3/8", correct: false },
      { text: "b) 7/15", correct: false },
      { text: "c) 11/15", correct: true },
      { text: "d) 3/15", correct: false }
    ],
    explanation: "Para resolver $\\frac{2}{5} + \\frac{1}{3}$: El MCM de 5 y 3 es 15. Convertimos: $\\frac{6}{15} + \\frac{5}{15} = \\frac{11}{15}$."
  },
  {
    title: "Ecuaciones Cuadráticas (Fórmula General)",
    subject: "algebra",
    teaching: "Una ecuación cuadrática es de la forma $ax^2 + bx + c = 0$. La fórmula general para encontrar las soluciones (raíces) es $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. Identifica los valores de 'a', 'b' y 'c' en tu ecuación y sustitúyelos en la fórmula.",
    solution: "Ejemplo: $x^2 - 5x + 6 = 0$. Aquí $a=1, b=-5, c=6$. Sustituyendo en la fórmula, obtenemos $x=2$ y $x=3$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=BxrJmKdPHRs", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=RGOYPVjLqIs"  // julioprofe
    ],
    question: "Usando la fórmula general, ¿cuáles son las soluciones de $x^2 + x - 6 = 0$?",
    options: [
      { text: "a) x=2, x=3", correct: false },
      { text: "b) x=-2, x=3", correct: false },
      { text: "c) x=2, x=-3", correct: true },
      { text: "d) x=-2, x=-3", correct: false }
    ],
    explanation: "Para $x^2 + x - 6 = 0$, $a=1, b=1, c=-6$. Al aplicar la fórmula general, las soluciones son $x=2$ y $x=-3$."
  },
  {
    title: "Teorema de Pitágoras",
    subject: "geometria",
    teaching: "El Teorema de Pitágoras establece que en todo triángulo rectángulo, el cuadrado de la longitud de la hipotenusa (el lado opuesto al ángulo recto) es igual a la suma de los cuadrados de las longitudes de los otros dos lados (catetos). La fórmula es $a^2 + b^2 = c^2$, donde 'c' es la hipotenusa.",
    solution: "Ejemplo: Un triángulo rectángulo con catetos de 3 cm y 4 cm. Hipotenusa $c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$ cm.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=eTEBvBIz8Ok", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=2UbdPiqAiHY"  // julioprofe
    ],
    question: "Si los catetos de un triángulo rectángulo miden 5 cm y 12 cm, ¿cuánto mide la hipotenusa?",
    options: [
      { text: "a) 13 cm", correct: true },
      { text: "b) 17 cm", correct: false },
      { text: "c) 7 cm", correct: false },
      { text: "d) 169 cm", correct: false }
    ],
    explanation: "Aplicando el Teorema de Pitágoras: $5^2 + 12^2 = c^2 \\Rightarrow 25 + 144 = c^2 \\Rightarrow 169 = c^2 \\Rightarrow c = \\sqrt{169} = 13$ cm."
  },
  {
    title: "Regla de Tres Simple Directa",
    subject: "aritmetica",
    teaching: "La regla de tres simple directa se utiliza cuando dos magnitudes son directamente proporcionales. Es decir, si una aumenta, la otra también aumenta en la misma proporción, y si una disminuye, la otra disminuye. Se resuelve multiplicando en cruz y dividiendo.",
    solution: "Ejemplo: Si 2 kg de manzanas cuestan $4, ¿cuánto cuestan 6 kg? (2 kg -> $4, 6 kg -> x). $x = (6 \\times 4) \\div 2 = 12$. Cuestan $12.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=uQO_oBKqypQ", // Matemáticas profe Alex (incluye directa e inversa)
      "https://www.youtube.com/watch?v=Xphb-tzJj24"  // julioprofe (directa)
    ],
    question: "Si 3 obreros construyen una pared en 8 horas, ¿cuántas horas tardarán 6 obreros en construir la misma pared (asumiendo que trabajan al mismo ritmo)?",
    options: [
      { text: "a) 16 horas", correct: false },
      { text: "b) 4 horas", correct: true },
      { text: "c) 8 horas", correct: false },
      { text: "d) 12 horas", correct: false }
    ],
    explanation: "Esta es una regla de tres simple inversa. Si el número de obreros se duplica (de 3 a 6), el tiempo se reduce a la mitad (8 / 2 = 4 horas)."
  },
  {
    title: "Cálculo de Porcentajes",
    subject: "aritmetica",
    teaching: "Un porcentaje es una forma de expresar un número como una fracción de 100. Se usa para indicar una parte proporcional de un total. Para calcular el porcentaje de una cantidad, se multiplica la cantidad por el porcentaje y se divide entre 100.",
    solution: "Ejemplo: Calcular el 20% de 150. $(20 \\div 100) \\times 150 = 0.20 \\times 150 = 30$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=RE3XoDORMys", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=PjXpBwI6P0M"  // julioprofe
    ],
    question: "¿Cuánto es el 15% de 200?",
    options: [
      { text: "a) 15", correct: false },
      { text: "b) 20", correct: false },
      { text: "c) 30", correct: true },
      { text: "d) 45", correct: false }
    ],
    explanation: "Para calcular el 15% de 200: $(15 \\div 100) \\times 200 = 0.15 \\times 200 = 30$."
  },
  {
    title: "Sistemas de Ecuaciones 2x2 (Sustitución)",
    subject: "algebra",
    teaching: "Un sistema de ecuaciones 2x2 consiste en dos ecuaciones lineales con dos incógnitas. El método de sustitución implica despejar una de las incógnitas en una de las ecuaciones y sustituir su expresión en la otra ecuación, para así obtener una ecuación con una sola incógnita.",
    solution: "Ejemplo: $x + y = 5$ y $2x - y = 1$. De la primera, $y = 5 - x$. Sustituyendo en la segunda: $2x - (5 - x) = 1 \\Rightarrow 3x - 5 = 1 \\Rightarrow 3x = 6 \\Rightarrow x = 2$. Luego, $y = 5 - 2 = 3$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=LTfv1G2iYuQ", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=tL5vun70_DI"  // julioprofe
    ],
    question: "Resuelve el sistema por sustitución: $x - 2y = 1$ y $3x + y = 10$",
    options: [
      { text: "a) x=3, y=1", correct: true },
      { text: "b) x=1, y=3", correct: false },
      { text: "c) x=2, y=0.5", correct: false },
      { text: "d) x=4, y=1.5", correct: false }
    ],
    explanation: "De $x - 2y = 1$, despejamos $x = 1 + 2y$. Sustituimos en $3x + y = 10$: $3(1 + 2y) + y = 10 \\Rightarrow 3 + 6y + y = 10 \\Rightarrow 7y = 7 \\Rightarrow y = 1$. Luego, $x = 1 + 2(1) = 3$. Solución: $x=3, y=1$."
  },
  {
    title: "Volumen de Prismas",
    subject: "geometria",
    teaching: "El volumen de un prisma es el espacio que ocupa un cuerpo tridimensional. Se calcula multiplicando el área de su base por su altura. La fórmula general es $V = A_{base} \\times h$. La forma de la base puede ser un cuadrado, un rectángulo, un triángulo, etc.",
    solution: "Ejemplo: Un prisma con base cuadrada de lado 4 cm y altura 10 cm. $A_{base} = 4^2 = 16$ cm$^2$. $V = 16 \\times 10 = 160$ cm$^3$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=n0j1XwaroHs", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=N50Q0ZctD2U"  // julioprofe
    ],
    question: "Calcula el volumen de un prisma rectangular con base de 6 cm de largo y 4 cm de ancho, y una altura de 10 cm.",
    options: [
      { text: "a) 24 cm³", correct: false },
      { text: "b) 60 cm³", correct: false },
      { text: "c) 240 cm³", correct: true },
      { text: "d) 100 cm³", correct: false }
    ],
    explanation: "Área de la base = $6 \\times 4 = 24$ cm$^2$. Volumen = $24 \\times 10 = 240$ cm$^3$."
  },
  {
    title: "Suma y Resta de Polinomios",
    subject: "algebra",
    teaching: "Para sumar o restar polinomios, se agrupan y combinan los términos semejantes (aquellos que tienen la misma variable elevada a la misma potencia). Se suman o restan sus coeficientes, manteniendo la parte literal.",
    solution: "Ejemplo: $(3x^2 + 2x - 1) + (x^2 - 4x + 5)$. Agrupamos: $(3x^2 + x^2) + (2x - 4x) + (-1 + 5) = 4x^2 - 2x + 4$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=DXoqQOO_UW0", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=xpxb7Cttd9Q"  // julioprofe
    ],
    question: "Realiza la siguiente operación: $(5x^3 - 2x + 7) - (2x^3 + 3x - 4)$",
    options: [
      { text: "a) $3x^3 + x + 3$", correct: false },
      { text: "b) $3x^3 - 5x + 11$", correct: true },
      { text: "c) $7x^3 + x + 3$", correct: false },
      { text: "d) $3x^3 - 5x + 3$", correct: false }
    ],
    explanation: "Restamos los coeficientes de términos semejantes: $(5x^3 - 2x^3) + (-2x - 3x) + (7 - (-4)) = 3x^3 - 5x + 11$."
  },
  {
    title: "Media, Mediana y Moda",
    subject: "estadistica",
    teaching: "La media (promedio) es la suma de todos los valores dividida por el número total de valores. La mediana es el valor central de un conjunto de datos ordenados. La moda es el valor que aparece con mayor frecuencia en un conjunto de datos.",
    solution: "Ejemplo: Datos: 2, 3, 3, 5, 7. Media = $(2+3+3+5+7)/5 = 20/5 = 4$. Mediana = 3 (ordenados: 2, 3, **3**, 5, 7). Moda = 3 (es el que más se repite).",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=5bZXpfxwHqk", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=XG_Td_lsN9o"  // julioprofe
    ],
    question: "Para el siguiente conjunto de datos: 8, 10, 12, 10, 8, 14, 10. ¿Cuál es la moda?",
    options: [
      { text: "a) 8", correct: false },
      { text: "b) 10", correct: true },
      { text: "c) 12", correct: false },
      { text: "d) 14", correct: false }
    ],
    explanation: "La moda es el valor que más se repite. En el conjunto de datos, el número 10 aparece 3 veces, mientras que el 8 aparece 2 veces y los demás solo una vez. Por lo tanto, la moda es 10."
  },
  {
    title: "Propiedades de la Potenciación",
    subject: "algebra",
    teaching: "La potenciación es una operación que consiste en multiplicar un número (base) por sí mismo varias veces (exponente). Las propiedades incluyen: producto de potencias de igual base (se suman exponentes), cociente de potencias de igual base (se restan exponentes), potencia de una potencia (se multiplican exponentes), entre otras.",
    solution: "Ejemplo: $2^3 \\times 2^2 = 2^{(3+2)} = 2^5 = 32$. $(3^2)^3 = 3^{(2 \\times 3)} = 3^6 = 729$.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=kN1lgy6fPVU", // Matemáticas profe Alex
      "https://www.youtube.com/watch?v=OB-JQc5PIhE"  // julioprofe
    ],
    question: "Simplifica la expresión: $(x^4 \\cdot x^2) / x^3$",
    options: [
      { text: "a) $x^9$", correct: false },
      { text: "b) $x^6$", correct: false },
      { text: "c) $x^3$", correct: true },
      { text: "d) $x^2$", correct: false }
    ],
    explanation: "Primero, en el numerador, $x^4 \\cdot x^2 = x^{(4+2)} = x^6$. Luego, dividimos: $x^6 / x^3 = x^{(6-3)} = x^3$."
  }
];


 
 // Preguntas del test vocacional

 const vocationalQuestions = [

  {

   question: "¿Qué tipo de actividades disfrutas más en tu tiempo libre?",

   options: [

    { text: "Crear arte, música o escribir historias.", category: "artistico" },

    { text: "Resolver problemas lógicos o científicos.", category: "cientifico" },

    { text: "Ayudar a otras personas o trabajar en equipo.", category: "social" },

    { text: "Organizar eventos o gestionar proyectos.", category: "empresarial" },

   ],

  },

  {

   question: "Si pudieras aprender una nueva habilidad, ¿cuál elegirías?",

   options: [

    { text: "Diseño gráfico o animación.", category: "artistico" },

    { text: "Programación o análisis de datos.", category: "cientifico" },

    { text: "Psicología o consejería.", category: "social" },

    { text: "Marketing digital o ventas.", category: "empresarial" },

   ],

  },

  {

   question: "¿Qué te atrae más de un trabajo?",

   options: [

    { text: "La oportunidad de expresar mi creatividad.", category: "artistico" },

    { text: "La investigación y el descubrimiento.", category: "cientifico" },

    { text: "Impactar positivamente en la vida de otros.", category: "social" },

    { text: "Liderar y tomar decisiones estratégicas.", category: "empresarial" },

   ],

  },

  {

   question: "¿Cuál de estas asignaturas te interesaba más en la escuela?",

   options: [

    { text: "Literatura o Artes Plásticas.", category: "artistico" },

    { text: "Matemáticas o Física.", category: "cientifico" },

    { text: "Historia o Sociología.", category: "social" },

    { text: "Economía o Administración.", category: "empresarial" },

   ],

  },

  {

   question: "Cuando te enfrentas a un problema, ¿cuál es tu enfoque principal?",

   options: [

    { text: "Buscar soluciones innovadoras y fuera de lo común.", category: "artistico" },

    { text: "Analizar los datos y encontrar la causa raíz.", category: "cientifico" },

    { text: "Escuchar a las personas involucradas y mediar.", category: "social" },

    { text: "Planificar los pasos y delegar tareas.", category: "empresarial" },

   ],

  },

  {

   question: "¿Qué tipo de retos te motivan?",

   options: [

    { text: "Optimizar procesos y sistemas", category: "cientifico" },

    { text: "Entender y ayudar a las personas", category: "social" },

    { text: "Transmitir ideas complejas de forma simple", category: "comunicacion" },

    { text: "Expresar emociones visualmente", category: "artistico" }

   ]

  },

  {

   question: "¿En qué te fijas más cuando ves algo nuevo?",

   options: [

    { text: "Cómo funciona técnicamente", category: "cientifico" },

    { text: "Cómo afecta a las personas", category: "social" },

    { text: "Qué mensaje transmite", category: "comunicacion" },

    { text: "Qué tan estético es", category: "artistico" }

   ]

  },

  {

   question: "¿Qué actividad harías en tu tiempo libre?",

   options: [

    { text: "Armar dispositivos o programar", category: "cientifico" },

    { text: "Leer sobre comportamiento humano", category: "social" },

    { text: "Escribir o hacer podcasts", category: "comunicacion" },

    { text: "Dibujar o hacer manualidades", category: "artistico" }

   ]

  },

  {

   question: "¿Cómo reaccionas ante un problema?",

   options: [

    { text: "Lo analizo paso a paso", category: "cientifico" },

    { text: "Considero el impacto emocional", category: "social" },

    { text: "Busco información y opiniones", category: "comunicacion" },

    { text: "Busco soluciones creativas", category: "artistico" }

   ]

  },

  {

   question: "¿Qué tipo de reconocimiento valoras más?",

   options: [

    { text: "Ser reconocido por tu precisión", category: "cientifico" },

    { text: "Ser reconocido por tu ayuda", category: "social" },

    { text: "Ser reconocido por tu claridad", category: "comunicacion" },

    { text: "Ser reconocido por tu creatividad", category: "artistico" }

   ]

  },

  {

   question: "¿Qué te resulta más natural?",

   options: [

    { text: "Organizar información de forma lógica", category: "cientifico" },

    { text: "Escuchar y dar consejos", category: "social" },

    { text: "Explicar conceptos complejos", category: "comunicacion" },

    { text: "Imaginar y visualizar ideas", category: "artistico" }

   ]

  },

  {

   question: "¿Qué aspecto de un trabajo te parece más importante?",

   options: [
    { text: "La precisión y eficiencia", category: "cientifico" },
    { text: "El impacto social positivo", category: "social" },
    { text: "La capacidad de influir", category: "comunicacion" },
    { text: "La libertad creativa", category: "artistico" }
   ]
  },

  {
   question: "¿Cómo prefieres trabajar?",
   options: [
    { text: "Solo, concentrado en detalles", category: "cientifico" },
    { text: "En equipo, ayudando a otros", category: "social" },
    { text: "Colaborando e intercambiando ideas", category: "comunicacion" },
    { text: "Libremente, siguiendo mi inspiración", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de futuro te imaginas?",
   options: [
    { text: "Innovando tecnológicamente", category: "cientifico" },
    { text: "Mejorando la salud mental", category: "social" },
    { text: "Informando y educando", category: "comunicacion" },
    { text: "Creando belleza en el mundo", category: "artistico" }
   ]
  },

  {
   question: "¿Qué habilidad te gustaría desarrollar más?",
   options: [
    { text: "Programación y análisis", category: "cientifico" },
    { text: "Terapia y counseling", category: "social" },
    { text: "Redacción y oratoria", category: "comunicacion" },
    { text: "Diseño y composición", category: "artistico" }
   ]
  },

  {
   question: "¿Qué te genera más curiosidad?",
   options: [
    { text: "Cómo funcionan las cosas", category: "cientifico" },
    { text: "Por qué las personas actúan así", category: "social" },
    { text: "Cómo comunicar mejor", category: "comunicacion" },
    { text: "Cómo expresar sentimientos", category: "artistico" }
   ]
  },

  {
   question: "¿En qué ambiente te sientes más cómodo?",
   options: [
    { text: "Lugar ordenado y sistemático", category: "cientifico" },
    { text: "Lugar acogedor y empático", category: "social" },
    { text: "Lugar dinámico y comunicativo", category: "comunicacion" },
    { text: "Lugar inspirador y libre", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de impacto quieres tener?",
   options: [
    { text: "Mejorar la tecnología y eficiencia", category: "cientifico" },
    { text: "Mejorar la salud mental de las personas", category: "social" },
    { text: "Informar y educar a la sociedad", category: "comunicacion" },
    { text: "Inspirar y emocionar", category: "artistico" }
   ]
  },

  {
   question: "¿Qué actividad te resultaría más fácil?",
   options: [
    { text: "Diseñar un sistema eficiente", category: "cientifico" },
    { text: "Ayudar a alguien con ansiedad", category: "social" },
    { text: "Escribir un artículo interesante", category: "comunicacion" },
    { text: "Crear un logo atractivo", category: "artistico" }
   ]
  },

  {
   question: "¿Qué valoras más en una profesión?",
   options: [
    { text: "Estabilidad y crecimiento técnico", category: "cientifico" },
    { text: "Propósito y ayuda social", category: "social" },
    { text: "Variedad y conexión humana", category: "comunicacion" },
    { text: "Libertad y expresión personal", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de problemas te gusta resolver?",
   options: [
    { text: "Problemas técnicos y científicos", category: "cientifico" },
    { text: "Problemas humanos y sociales", category: "social" },
    { text: "Problemas de información y comunicación", category: "comunicacion" },
    { text: "Problemas estéticos y creativos", category: "artistico" }
   ]
  },

  {
   question: "¿Qué materia te resultaba más fácil en el colegio?",
   options: [
    { text: "Matemáticas y ciencias", category: "cientifico" },
    { text: "Psicología y ciencias sociales", category: "social" },
    { text: "Lenguaje y literatura", category: "comunicacion" },
    { text: "Arte y educación artística", category: "artistico" }
   ]
  },

  {
   question: "¿Cómo prefieres aprender cosas nuevas?",
   options: [
    { text: "Experimentando y analizando datos", category: "cientifico" },
    { text: "Observando comportamientos y patrones", category: "social" },
    { text: "Leyendo y investigando", category: "comunicacion" },
    { text: "Practicando y creando", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de proyectos te emocionan más?",
   options: [
    { text: "Construir o inventar algo funcional", category: "cientifico" },
    { text: "Ayudar a mejorar la vida de otros", category: "social" },
    { text: "Crear contenido que informe o entretenga", category: "comunicacion" },
    { text: "Expresar ideas a través del arte", category: "artistico" }
   ]
  },

  {
   question: "¿Qué te resulta más gratificante?",
   options: [
    { text: "Resolver un problema complejo", category: "cientifico" },
    { text: "Ver a alguien sentirse mejor", category: "social" },
    { text: "Que la gente entienda tu mensaje", category: "comunicacion" },
    { text: "Crear algo hermoso", category: "artistico" }
   ]
  },

  {
   question: "¿Cómo te describes a ti mismo?",
   options: [
    { text: "Analítico y sistemático", category: "cientifico" },
    { text: "Empático y comprensivo", category: "social" },
    { text: "Comunicativo y persuasivo", category: "comunicacion" },
    { text: "Creativo y original", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de herramientas prefieres usar?",
   options: [
    { text: "Calculadoras, computadoras, instrumentos", category: "cientifico" },
    { text: "Tests psicológicos, entrevistas", category: "social" },
    { text: "Cámaras, micrófonos, editores", category: "comunicacion" },
    { text: "Pinceles, software de diseño", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de retos te motivan?",
   options: [
    { text: "Optimizar procesos y sistemas", category: "cientifico" },
    { text: "Entender y ayudar a las personas", category: "social" },
    { text: "Transmitir ideas complejas de forma simple", category: "comunicacion" },
    { text: "Expresar emociones visualmente", category: "artistico" }
   ]
  },

  {
   question: "¿En qué te fijas más cuando ves algo nuevo?",
   options: [
    { text: "Cómo funciona técnicamente", category: "cientifico" },
    { text: "Cómo afecta a las personas", category: "social" },
    { text: "Qué mensaje transmite", category: "comunicacion" },
    { text: "Qué tan estético es", category: "artistico" }
   ]
  },

  {
   question: "¿Qué actividad harías en tu tiempo libre?",
   options: [
    { text: "Armar dispositivos o programar", category: "cientifico" },
    { text: "Leer sobre comportamiento humano", category: "social" },
    { text: "Escribir o hacer podcasts", category: "comunicacion" },
    { text: "Dibujar o hacer manualidades", category: "artistico" }
   ]
  },

  {
   question: "¿Cómo reaccionas ante un problema?",
   options: [
    { text: "Lo analizo paso a paso", category: "cientifico" },
    { text: "Considero el impacto emocional", category: "social" },
    { text: "Busco información y opiniones", category: "comunicacion" },
    { text: "Busco soluciones creativas", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de reconocimiento valoras más?",
   options: [
    { text: "Ser reconocido por tu precisión", category: "cientifico" },
    { text: "Ser reconocido por tu ayuda", category: "social" },
    { text: "Ser reconocido por tu claridad", category: "comunicacion" },
    { text: "Ser reconocido por tu creatividad", category: "artistico" }
   ]
  },

  {
   question: "¿Qué te resulta más natural?",
   options: [
    { text: "Organizar información de forma lógica", category: "cientifico" },
    { text: "Escuchar y dar consejos", category: "social" },
    { text: "Explicar conceptos complejos", category: "comunicacion" },
    { text: "Imaginar y visualizar ideas", category: "artistico" }
   ]
  },

  {
   question: "¿Qué aspecto de un trabajo te parece más importante?",
   options: [
    { text: "La precisión y eficiencia", category: "cientifico" },
    { text: "El impacto social positivo", category: "social" },
    { text: "La capacidad de influir", category: "comunicacion" },
    { text: "La libertad creativa", category: "artistico" }
   ]
  },

  {
   question: "¿Cómo prefieres trabajar?",
   options: [
    { text: "Solo, concentrado en detalles", category: "cientifico" },
    { text: "En equipo, ayudando a otros", category: "social" },
    { text: "Colaborando e intercambiando ideas", category: "comunicacion" },
    { text: "Libremente, siguiendo mi inspiración", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de futuro te imaginas?",
   options: [
    { text: "Innovando tecnológicamente", category: "cientifico" },
    { text: "Mejorando la salud mental", category: "social" },
    { text: "Informando y educando", category: "comunicacion" },
    { text: "Creando belleza en el mundo", category: "artistico" }
   ]
  },

  {
   question: "¿Qué habilidad te gustaría desarrollar más?",
   options: [
    { text: "Programación y análisis", category: "cientifico" },
    { text: "Terapia y counseling", category: "social" },
    { text: "Redacción y oratoria", category: "comunicacion" },
    { text: "Diseño y composición", category: "artistico" }
   ]
  },

  {
   question: "¿Qué te genera más curiosidad?",
   options: [
    { text: "Cómo funcionan las cosas", category: "cientifico" },
    { text: "Por qué las personas actúan así", category: "social" },
    { text: "Cómo comunicar mejor", category: "comunicacion" },
    { text: "Cómo expresar sentimientos", category: "artistico" }
   ]
  },

  {
   question: "¿En qué ambiente te sientes más cómodo?",
   options: [
    { text: "Lugar ordenado y sistemático", category: "cientifico" },
    { text: "Lugar acogedor y empático", category: "social" },
    { text: "Lugar dinámico y comunicativo", category: "comunicacion" },
    { text: "Lugar inspirador y libre", category: "artistico" }
   ]
  },

  {
   question: "¿Qué tipo de impacto quieres tener?",
   options: [
    { text: "Mejorar la tecnología y eficiencia", category: "cientifico" },
    { text: "Mejorar la salud mental de las personas", category: "social" },
    { text: "Informar y educar a la sociedad", category: "comunicacion" },
    { text: "Inspirar y emocionar", category: "artistico" }
   ]
  },

  {
   question: "¿Qué actividad te resultaría más fácil?",
   options: [
    { text: "Diseñar un sistema eficiente", category: "cientifico" },
    { text: "Ayudar a alguien con ansiedad", category: "social" },
    { text: "Escribir un artículo interesante", category: "comunicacion" },
    { text: "Crear un logo atractivo", category: "artistico" }
   ]
  },

  {
   question: "¿Qué valoras más en una profesión?",
   options: [
    { text: "Estabilidad y crecimiento técnico", category: "cientifico" },
    { text: "Propósito y ayuda social", category: "social" },
    { text: "Variedad y conexión humana", category: "comunicacion" },
    { text: "Libertad y expresión personal", category: "artistico" }
   ]
  }

 ];



 // Resultados del test vocacional

 const careerResults = {

  cientifico: {

   title: "Ciencias y Tecnología",

   description: "Tienes una mente analítica y te apasiona resolver problemas técnicos. Las carreras en ingeniería, programación, matemáticas aplicadas o ciencias exactas serían ideales para ti.",

   careers: ["Ingeniería de Sistemas", "Ingeniería Civil", "Ingeniería Industrial", "Programación", "Matemáticas", "Física", "Científico de Datos", "Investigador", "Analista de Sistemas", "Actuario"],

   color: "from-blue-500 to-indigo-500",

   icon: "🔬"

  },

  social: {

   title: "Ciencias Sociales y Humanidades",

   description: "Tienes una gran capacidad empática y te interesa entender el comportamiento humano. Las carreras en psicología, trabajo social, educación o terapia serían perfectas para ti.",

   careers: ["Psicología", "Trabajo Social", "Educación", "Terapia", "Recursos Humanos", "Sociología", "Enfermería", "Diplomacia", "Antropología", "Criminología"],

   color: "from-pink-500 to-rose-500",

   icon: "🤝"

  },

  comunicacion: {

   title: "Comunicación y Medios",

   description: "Tienes excelentes habilidades comunicativas y te gusta transmitir ideas. Las carreras en comunicación, periodismo, marketing o relaciones públicas serían ideales para ti.",

   careers: ["Comunicación Social", "Periodismo", "Marketing", "Relaciones Públicas", "Publicidad", "Literatura", "Edición", "Guionismo", "Producción Audiovisual", "Locución"],

   color: "from-green-500 to-emerald-500",

   icon: "🗣️"

  },

  artistico: {

   title: "Arte y Diseño",

   description: "Tienes una mente creativa y te apasiona la expresión artística. Las carreras en arte, diseño, arquitectura o artes visuales serían perfectas para ti.",

   careers: ["Diseño Gráfico", "Arquitectura", "Bellas Artes", "Diseño Industrial", "Fotografía", "Cine", "Música", "Danza", "Diseño de Moda", "Ilustración"],

   color: "from-purple-500 to-violet-500",

   icon: "🎨"

  },

  empresarial: {

   title: "Negocios y Administración",

   description: "Te atrae el mundo de los negocios, la gestión y el liderazgo. Las carreras en administración, finanzas, emprendimiento o consultoría son para ti.",

   careers: ["Administración de Empresas", "Emprendimiento", "Consultoría de Negocios", "Gerencia de Proyectos", "Analista Financiero", "Contabilidad", "Logística", "Desarrollo de Negocios", "Economía", "Marketing Estratégico"],

   color: "from-orange-500 to-red-500",

   icon: "💼"

  }

 };





 // Módulos de ayuda psicológica

 const psychologyModules = [

  {

   id: 'cognitive',

   title: 'Reestructuración Cognitiva',

   icon: Brain,

   description: 'Identifica y cambia pensamientos negativos'

  },

  {

   id: 'anxiety',

   title: 'Manejo de Ansiedad',

   icon: Heart,

   description: 'Técnicas para controlar la ansiedad'

  },

  {

   id: 'journal',

   title: 'Diario Emocional',

   icon: Edit3,

   description: 'Registra y reflexiona sobre tus emociones'

  },

  {

   id: 'frustration',

   title: 'Diario de Frustración',

   icon: MessageCircle,

   description: 'Libera tu frustración de forma segura'

  },

  {

   id: 'visualization',

   title: 'Visualización Positiva',

   icon: Eye,

   description: 'Ejercicios de relajación mental'

  },

  {

   id: 'stressRegister',

   title: 'Registro de Situaciones Estresantes',

   icon: Calendar,

   description: 'Anota eventos que te causan estrés'

  },

  {

   id: 'relaxPlan',

   title: 'Planificación de Actividades Relajantes',

   icon: Smile,

   description: 'Agenda actividades para relajarte'

  }

 ];

 
 // MODIFICADO: Lógica de useEffect para dailyMessage más robusta
useEffect(() => {
  // Cargar progreso guardado
  const savedProgress = localStorage.getItem('yupi-progress');
  if (savedProgress) {
   setUserProgress(JSON.parse(savedProgress));
  }

  // Cargar entradas del diario emocional
  const savedJournalEntries = localStorage.getItem('yupi-journal-entries');
  if (savedJournalEntries) {
    setJournalEntries(JSON.parse(savedJournalEntries));
  }

  // Cargar eventos estresantes
  const savedStressEvents = localStorage.getItem('yupi-stress-events');
  if (savedStressEvents) {
    setStressEvents(JSON.parse(savedStressEvents));
  }

  // Cargar actividades relajantes
  const savedRelaxActivities = localStorage.getItem('yupi-relax-activities');
  if (savedRelaxActivities) {
    setRelaxActivities(JSON.parse(savedRelaxActivities));
  }

 }, []); // Dependencias vacías para que se ejecute solo al montar el componente



 const saveProgress = (newProgress) => {

  setUserProgress(newProgress);

  localStorage.setItem('yupi-progress', JSON.stringify(newProgress));

 };
const saveJournalEntries = (entries) => {
  setJournalEntries(entries);
  localStorage.setItem('yupi-journal-entries', JSON.stringify(entries));
 };

 const saveStressEvents = (events) => {
  setStressEvents(events);
  localStorage.setItem('yupi-stress-events', JSON.stringify(events));
 };

 const saveRelaxActivities = (activities) => {
  setRelaxActivities(activities);
  localStorage.setItem('yupi-relax-activities', JSON.stringify(activities));
 };

const handleActivityComplete = (id) => {
   const updatedActivities = relaxActivities.filter(activity => activity.id !== id);
   setRelaxActivities(updatedActivities); // Usa el setRelaxActivities del estado de YupiApp
   localStorage.setItem('yupi-relax-activities', JSON.stringify(updatedActivities)); // Guarda el cambio
   showCustomModal('¡Felicidades! Actividad cumplida. 🎉', 'success');
 };

 const handleActivityKeep = () => {
   // No hace nada, solo cierra el modal. La actividad permanece en la lista.
 };


 // Función para completar la lección (para comunicación)
 // Esta función es utilizada por LessonPage para la sección de Comunicación.
 const completeLesson = useCallback((subject) => {
  setUserProgress(prevProgress => {
   const newProgress = { ...prevProgress };
   const currentLessonIndex = newProgress[subject].currentLesson;

   if (!newProgress[subject].completedLessons.includes(currentLessonIndex)) {
    newProgress[subject].completedLessons.push(currentLessonIndex);
   }

   // Asegura que solo se incremente el currentLesson si no es la última lección
   // y si la sección es 'comunicacion' (ya que MathematicsPage maneja su propio avance)
   if (subject === 'comunicacion' && currentLessonIndex + 1 < comunicacionLessonsImproved.length) {
    newProgress[subject].currentLesson = currentLessonIndex + 1;
   }
   return newProgress;
  });
  setShowAnimation(true); // Activa la animación de éxito
  setTimeout(() => setShowAnimation(false), 3000); // Desactiva la animación después de 3 segundos
 }, [comunicacionLessonsImproved.length, setShowAnimation]); // Asegúrate de que setShowAnimation esté en las dependencias


 

 const handleMathAnswer = (selectedOption, lesson) => {
  return {
    isCorrect: selectedOption.correct,
    explanation: lesson.explanation,
    correctAnswer: lesson.options.find(opt => opt.correct).text
  };
 };

 // Eliminado: const restartLesson = () => { /* ... */ };


 // HomePage ahora recibe props para los controles de música

 const HomePage = ({ isPlaying, toggleMusic, volume, handleVolumeChange, playNextSong, playPreviousSong, playlist, currentSongIndex }) => (

  <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-6">

   <div className="max-w-md mx-auto">

    {/* CONTROLES DE MÚSICA EN LA ESQUINA SUPERIOR DERECHA */}

       <div className="absolute top-4 right-4 flex items-center space-x-2 sm:space-x-3 bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-md">
     {/* Botón para canción anterior */}
     <button
      onClick={playPreviousSong}
      className="p-2 sm:p-2.5 rounded-full bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
      aria-label="Canción anterior"
     >
      <ArrowLeft size={18} /> {/* Ajuste de tamaño de icono: 18px por defecto (móvil) */}
     </button>

     {/* Botón para play/pause */}
     <button
      onClick={toggleMusic}
      className="p-2 sm:p-2.5 rounded-full bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
     >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />} {/* Ajuste de tamaño de icono: 18px por defecto (móvil) */}
     </button>

     {/* Botón para siguiente canción */}
     <button
      onClick={playNextSong}
      className="p-2 sm:p-2.5 rounded-full bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
      aria-label="Siguiente canción"
     >
      <ArrowRight size={18} /> {/* Ajuste de tamaño de icono: 18px por defecto (móvil) */}
     </button>

     {/* Control de volumen */}
     <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      className="w-16 sm:w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      aria-label="Control de volumen"
     />
    </div>




       {/* Header */}
   <div className="text-center mb-10 pt-8">
    <div className="bg-white rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-105">
     {/* Emoji más expresivo y animado */}
     <div className="text-6xl animate-pulse">🌟</div>
    </div>
    {/* Fuente "Pacifico" para el título */}
       <h1 className="text-5xl md:text-6xl font-['Pacifico'] text-white mb-3 drop-shadow-lg">Yupi</h1>
<p className="text-lg md:text-xl text-white/90 font-light">¡Lo dirás cuando empieces a mejorar!</p>

   </div>

    {/* Menú principal */}

    <div className="space-y-5">

     <button

      onClick={() => setCurrentSection('fruitSlash')}

      className="w-full bg-white rounded-3xl p-6 shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"

     >

      <div className="flex items-center space-x-5">

       <div className="bg-pink-100 p-4 rounded-full shadow-inner">

        <Target className="text-pink-700" size={28} />

       </div>

       <div className="flex-1 text-left">

        <h3 className="font-bold text-gray-900 text-lg">Fruit Slash</h3>

        <p className="text-gray-700 text-sm mt-1"> Un Videojuego menor como ocio recreativo:¡Corta las frutas y evita las bombas!</p>

       </div>

       <ArrowRight className="text-gray-600" size={24} />

      </div>

     </button>

     <button

      onClick={() => setCurrentSection('comunicacion')}

      className="w-full bg-white rounded-3xl p-6 shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"

     >

      <div className="flex items-center space-x-5">

       <div className="bg-blue-100 p-4 rounded-full shadow-inner">

        <BookOpen className="text-blue-700" size={28} />

       </div>

       <div className="flex-1 text-left">

        <h3 className="font-bold text-gray-900 text-lg">Comunicación</h3>

        <p className="text-gray-700 text-sm mt-1">El curso de Lenguaje como nunca antes</p>

        <div className="mt-3 bg-blue-100 rounded-full h-2">

         <div

          className="bg-blue-600 h-2 rounded-full transition-all duration-300"

          style={{

           width: `${(userProgress.comunicacion.completedLessons.length / comunicacionLessonsImproved.length) * 100}%`

          }}

         ></div>

        </div>

       </div>

       <ArrowRight className="text-gray-600" size={24} />

      </div>

     </button>

      <button
      onClick={() => setCurrentSection('matematicas')}
      className="w-full bg-white rounded-3xl p-6 shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
     >
      <div className="flex items-center space-x-5">
       <div className="bg-green-100 p-4 rounded-full shadow-inner">
        <Calculator className="text-green-700" size={28} />
       </div>
       <div className="flex-1 text-left">
        <h3 className="font-bold text-gray-900 text-lg">Matemáticas</h3>
        <p className="text-gray-700 text-sm mt-1">Números, Teoremas y demás Formulas</p>
        <div className="mt-3 bg-green-100 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${(userProgress.matematicas.completedLessons.length / matematicasLessons.length) * 100}%`
          }}
        ></div>
        </div>
       </div>
       <ArrowRight className="text-gray-600" size={24} />
      </div>
     </button>


     <button

      onClick={() => setCurrentSection('psicologia')}

      className="w-full bg-white rounded-3xl p-6 shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"

     >

      <div className="flex items-center space-x-5">

       <div className="bg-pink-100 p-4 rounded-full shadow-inner">

        <Heart className="text-pink-700" size={28} />

       </div>

       <div className="flex-1 text-left">

        <h3 className="font-bold text-gray-900 text-lg">Ayuda Psicológica</h3>

        <p className="text-gray-700 text-sm mt-1">Autocuidado Psico-Emocional a tu alcance</p>

       </div>

       <ArrowRight className="text-gray-600" size={24} />

      </div>

     </button>



     <button

      onClick={() => setCurrentSection('testVocacional')}

      className="w-full bg-white rounded-3xl p-6 shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"

     >

      <div className="flex items-center space-x-5">

       <div className="bg-purple-100 p-4 rounded-full shadow-inner">

        <Briefcase className="text-purple-700" size={28} />

       </div>

       <div className="flex-1 text-left">

        <h3 className="font-bold text-gray-900 text-lg">Test Vocacional</h3>

        <p className="text-gray-700 text-sm mt-1">Descubre tu carrera ideal</p>

       </div>

       <ArrowRight className="text-gray-600" size={24} />

      </div>

     </button>

    </div>
   {/* Estadísticas */}
    <div className="mt-10 grid grid-cols-2 gap-5">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
        <div className="text-3xl font-bold text-white">
          {userProgress.comunicacion.completedLessons.length + userProgress.matematicas.completedLessons.length}
        </div>
        <div className="text-white/80 text-sm mt-1">Lecciones completadas</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
        <div className="text-3xl font-bold text-white flex items-center justify-center">
          <Star className="text-yellow-400 mr-1" size={24} />
          {Math.floor(
            ((userProgress.comunicacion.completedLessons.length + userProgress.matematicas.completedLessons.length) /
             (comunicacionLessonsImproved.length + matematicasLessons.length)) *
            100
          )}%
        </div>
        <div className="text-white/80 text-sm mt-1">Progreso total</div>
      </div>
    </div>
   </div>

  </div>

 );

const SubjectPage = ({
  subject,
  lessons,
  color,
  setSelectedLesson, 
  setCurrentSection, 
  userProgress,      
  setUserAnswer,     
  setLessonStep,     
  setCurrentExample, 
  saveProgress       
}) => (

  <div className={`min-h-screen bg-gradient-to-br ${color} p-6`}>

   <div className="max-w-md mx-auto">
{/* Header */}

    <div className="flex items-center mb-8 pt-8">

     <button

      onClick={() => setCurrentSection('home')}

      className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"

     >

      <ArrowLeft className="text-white" size={24} />

     </button>

         <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize ml-4">{subject}</h1>


    </div>

    {/* Lista de lecciones */}

    <div className="space-y-4">

     {lessons.map((lesson, index) => {

      const isCompleted = userProgress[subject].completedLessons.includes(index);

      const isCurrent = userProgress[subject].currentLesson === index;

      const isLocked = index > userProgress[subject].currentLesson;



      return (
  <button
    key={index}
    onClick={() => {
      if (!isLocked) {
        setSelectedLesson(lesson); 
        setUserAnswer('');      
        setLessonStep('teaching'); 
        setCurrentExample(1);   
      }
    }}

       disabled={isLocked}

       className={`w-full bg-white rounded-2xl p-5 shadow-lg text-left transition-all duration-200 ${

        isLocked

         ? 'opacity-50 cursor-not-allowed'

         : 'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'

       }`}

      >

       <div className="flex items-center space-x-4">

        <div className={`p-3 rounded-full ${

         isCompleted ? 'bg-green-100' : isCurrent ? 'bg-blue-100' : 'bg-gray-100'

        } shadow-inner`}>

         {isCompleted ? (

          <CheckCircle className="text-green-700" size={22} />

         ) : isCurrent ? (

          <Target className="text-blue-700" size={22} />

         ) : (

          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

         )}

        </div>

        <div className="flex-1">

         <h3 className="font-semibold text-gray-800 text-lg">{lesson.title}</h3>

         <p className="text-gray-600 text-sm mt-1">

          {isCompleted ? 'Completada' : isCurrent ? 'En progreso' : 'Bloqueada'}

         </p>

        </div>

       </div>

      </button>

     );

    })}

   </div>



    {/* Opción de reaprender */}

    {userProgress[subject].completedLessons.length === lessons.length && (

     <div className="mt-10 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-md">

      <h3 className="text-white font-bold text-xl mb-3">¡Felicidades! 🎉</h3>

      <p className="text-white/90 text-sm mb-5">Has completado todas las lecciones.</p>

      <button

       onClick={() => {

        const newProgress = { ...userProgress };

        newProgress[subject].currentLesson = 0;

        newProgress[subject].completedLessons = [];

        saveProgress(newProgress);

       }}

       className="bg-white text-gray-900 px-5 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"

      >

       <RefreshCw size={18} />

       <span>Volver a aprender</span>

      </button>

     </div>

    )}

   </div>

  </div>

 );


const LessonPage = ({ subject, lesson, lessonIndex, setSelectedLesson, completeLesson, evaluateAnswer, showCustomModal }) => { // Agregado showCustomModal
  const [lessonStep, setLessonStep] = useState('teaching'); // teaching, example, practice, evaluation
  const [currentExample, setCurrentExample] = useState(1); // 1-indexed example number
  const [userAnswer, setUserAnswer] = useState(''); // Nuevo estado para la respuesta del usuario
  // Eliminado: const [evaluationResult, setEvaluationResult] = useState(null);
    
  const currentExampleData = lesson.examples[currentExample - 1];

 useEffect(() => {
    setLessonStep('teaching');
    setCurrentExample(1);
    setUserAnswer('');
    // Eliminado: setEvaluationResult(null);
  }, [lessonIndex, subject]);

    if (lessonStep === 'teaching') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setSelectedLesson(null)}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
                      <h1 className="text-xl sm:text-2xl font-bold text-white ml-4">{lesson.title}</h1>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg mb-7">
              <div className="flex items-center mb-5">
                <Lightbulb className="text-yellow-500 mr-2" size={26} />
                <h2 className="text-lg font-bold text-gray-800">Aprende</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{lesson.teaching}</p>
            </div>

            <button
              onClick={() => setLessonStep('example')}
              className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            >
              Ver ejemplo →
            </button>
          </div>
        </div>
      );
    }

    
    if (lessonStep === 'example') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setLessonStep('teaching')}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white ml-4">Ejemplo {currentExample}</h1>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg mb-7">
              <div className="flex items-center mb-5">
                <Star className="text-yellow-500 mr-2" size={26} />
                <h2 className="text-lg font-bold text-gray-800">Ejemplo</h2>
              </div>
              
              {subject === 'comunicacion' ? (
                <div>
                  <div className="bg-gray-50 p-5 rounded-lg mb-5 border border-gray-200">
                    <p className="text-gray-700 italic">&quot;{currentExampleData.text}&quot;</p>
                  </div>
                  <p className="font-medium text-gray-800 mb-3">{currentExampleData.question}</p>
                  <p className="text-green-600 font-semibold">Respuesta: {currentExampleData.answer}</p>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-50 p-5 rounded-lg mb-5 border border-gray-200">
                    <p className="text-gray-700 font-mono text-lg">{currentExampleData.problem}</p>
                  </div>
                  <p className="text-gray-700 mb-3">{currentExampleData.solution}</p>
                  <p className="text-green-600 font-bold">Respuesta: {currentExampleData.answer}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setLessonStep('practice')}
              className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
            >
              Practicar →
            </button>
          </div>
        </div>
      );
    }

    if (lessonStep === 'practice') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setLessonStep('example')}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white ml-4">Práctica</h1>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg mb-7">
              <div className="flex items-center mb-5">
                <Edit3 className="text-blue-500 mr-2" size={26} />
                <h2 className="text-lg font-bold text-gray-800">Tu turno</h2>
              </div>
              
              {subject === 'comunicacion' ? (
                <div>
                  <div className="bg-gray-50 p-5 rounded-lg mb-5 border border-gray-200">
                    <p className="text-gray-700 italic">&quot;{currentExampleData.text}&quot;</p>
                  </div>
                  <p className="font-medium text-gray-800 mb-4">{currentExampleData.question}</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-5 rounded-lg mb-5 border border-gray-200">
                  <p className="text-gray-700 font-mono text-lg">{currentExampleData.problem}</p>
                </div>
              )}
              <textarea
                placeholder="Escribe tu respuesta aquí..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none h-28 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                value={userAnswer} // Controla el valor con el estado
                onChange={(e) => setUserAnswer(e.target.value)} // Actualiza el estado
              />
            </div>
            <button
              onClick={() => {
                if (userAnswer.trim()) {
                  setLessonStep('evaluation');
                } else {
                  showCustomModal('Por favor, escribe una respuesta'); // Usar showCustomModal
                }
              }}
              className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
            >
              Evaluar respuesta →
            </button>
          </div>
        </div>
      );
    }
if (lessonStep === 'evaluation') {
  // Ya no necesitamos leer del DOM, el valor está en `userAnswer`
  // const textarea = document.querySelector('textarea');
  // const userAnswer = textarea?.value || '';

  console.log("Valor de selectedLesson:", selectedLesson);
  console.log("Título de la lección seleccionada (selectedLesson.title):", selectedLesson?.title);
  console.log("Lista completa de comunicacionLessonsImproved:", comunicacionLessonsImproved);

  const currentLessonData = comunicacionLessonsImproved.find(lesson => lesson.title === selectedLesson.title);

  if (!currentLessonData) {
    console.error("Error: No se encontró la lección seleccionada en comunicacionLessonsImproved. Revisar selectedLesson.title.");
    return (
        <div>
            <p>Error: No se pudo cargar la información de la lección. Por favor, selecciona otra lección.</p>
            <button onClick={() => setSelectedLesson(null)}>Volver a las lecciones</button>
        </div>
    );
  }

  const currentExampleData = currentLessonData.examples[currentExample - 1]; 
  
  // Usar la nueva función de evaluación
  const evaluation = evaluateAnswer(userAnswer, currentExampleData);
  const isCorrect = evaluation.isCorrect;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-6">
      <div className="max-w-md mx-auto pt-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="mb-5">
            {isCorrect ? (
              <div className="text-green-600 text-7xl mb-3">🎉</div>
            ) : (
              <div className="text-orange-600 text-7xl mb-3">🤔</div>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-5 text-gray-900">
            {isCorrect ? '¡Excelente!' : 'Intentémoslo de nuevo'}
          </h2>
          <div className="mb-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-600">Puntuación: {evaluation.score}/100</p>
            </div>
            <p className="text-gray-600 mb-4">{evaluation.feedback}</p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg mb-7 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Una respuesta correcta sería:</p>
            <p className="font-medium text-gray-800">{currentExampleData.validAnswers[0]}</p>
          </div>

          {isCorrect ? (
            <button
              onClick={() => {
                completeLesson(subject);
                setSelectedLesson(null);
                setLessonStep('teaching');
                setCurrentExample(1);
                setUserAnswer('');
              }}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
            >
              Continuar al siguiente tema →
            </button>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => {
                  if (currentExample < lesson.examples.length) {
                    setCurrentExample(currentExample + 1);
                    setLessonStep('example');
                    setUserAnswer('');
                  } else {
                    setCurrentExample(1);
                    setLessonStep('teaching');
                    setUserAnswer('');
                  }
                }}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
              >
                {currentExample < lesson.examples.length ? 'Ver siguiente ejemplo' : 'Repasar desde el inicio'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
      );
    }
  };


// Componente de Matemáticas
const MathematicsPage = ({
  selectedMathLesson, setSelectedMathLesson,
  mathStep, setMathStep,
  mathAttempts, setMathAttempts,
  selectedAnswer, setSelectedAnswer,
  userProgress, setUserProgress,
  setShowAnimation, // <-- RECIBE setShowAnimation AQUÍ
  showCustomModal,
  matematicasLessons, handleMathAnswer,
  setCurrentSection
}) => {
  if (selectedMathLesson) {
    const lesson = selectedMathLesson;

    if (mathStep === 'teaching') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setSelectedMathLesson(null)}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
                          <h1 className="text-xl sm:text-2xl font-bold text-white ml-4">{lesson.title}</h1>

            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-7">
              <div className="flex items-center mb-5">
                <Lightbulb className="text-yellow-500 mr-2" size={26} />
                <h2 className="text-lg font-bold text-gray-800">Teoría</h2>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-5">{lesson.teaching}</p>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-2">Ejemplo resuelto:</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">{lesson.solution}</p>
              </div>
            </div>
            <button
              onClick={() => setMathStep('video')}
              className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
            >
              Ver video explicativo →
            </button>
          </div>
        </div>
      );
    }
    if (mathStep === 'video') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setMathStep('teaching')}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white ml-4">Video Explicativo</h1>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-7">
              <div className="flex items-center mb-5">
                <Eye className="text-red-500 mr-2" size={26} />
                <h2 className="text-lg font-bold text-gray-800">Aprende con este video</h2>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-5">
                <p className="text-red-800 text-sm mb-3">
                  <strong>📺 Video recomendado:</strong> Este video te ayudará a entender mejor el tema {lesson.subject === 'algebra' ? 'de álgebra' : 'de geometría'}.
                </p>
                <a
                  href={lesson.youtubeLinks[mathAttempts > 0 ? 1 : 0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm"
                >
                  <span className="mr-2">🎬</span>
                  Ver en YouTube
                </a>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Consejo:</strong> Tómate tu tiempo para ver el video completo. Puedes pausarlo y repetir las partes que necesites.
                </p>
              </div>
            </div>
            <button
              onClick={() => setMathStep('practice')}
              className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"
            >
              Continuar al ejercicio →
            </button>
          </div>
        </div>
      );
    }
    if (mathStep === 'practice') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setMathStep('video')}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white ml-4">Práctica</h1>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-7">
              <div className="flex items-center mb-5">
                <Calculator className="text-blue-500 mr-2" size={26} />
                <h2 className="text-lg font-bold text-gray-800">Resuelve el problema</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-5 border border-gray-200">
                <p className="text-gray-700 font-medium text-lg">{lesson.question}</p>
              </div>
              <div className="space-y-3">
                {lesson.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-800">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                if (selectedAnswer) {
                  const result = handleMathAnswer(selectedAnswer, lesson);
                  if (result.isCorrect) {
                    // Completar lección y mostrar éxito
                    const newProgress = { ...userProgress };
                    const currentLessonIndex = matematicasLessons.findIndex(l => l.title === lesson.title);

                    if (!newProgress.matematicas.completedLessons.includes(currentLessonIndex)) {
                      newProgress.matematicas.completedLessons.push(currentLessonIndex);
                    }

                    if (currentLessonIndex + 1 < matematicasLessons.length) {
                      newProgress.matematicas.currentLesson = currentLessonIndex + 1;
                    }

                    setUserProgress(newProgress);
                    setShowAnimation(true); // <-- USO DE setShowAnimation
                    setTimeout(() => setShowAnimation(false), 3000); // <-- USO DE setShowAnimation

                    // Resetear estados
                    setSelectedMathLesson(null);
                    setMathStep('teaching');
                    setMathAttempts(0);
                    setSelectedAnswer(null);
                  } else {
                    // Respuesta incorrecta
                    setMathAttempts(prev => prev + 1);
                    showCustomModal( // Usar showCustomModal
                      `Respuesta incorrecta. ${result.explanation}\n\n` +
                      `La respuesta correcta es: ${result.correctAnswer}\n\n` +
                      `Te recomendamos ver el video nuevamente y repasar la explicación.`
                    );
                    setMathStep('video');
                    setSelectedAnswer(null);
                  }
                } else {
                  showCustomModal('Por favor, selecciona una respuesta'); // Usar showCustomModal
                }
              }}
              disabled={!selectedAnswer}
              className={`w-full font-semibold py-4 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 ${
                selectedAnswer
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Evaluar respuesta →
            </button>
          </div>
        </div>
      );
    }
  }
  // Vista principal de matemáticas
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-500 p-6">
      <div className="max-w-md mx-auto pt-10">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentSection('home')}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white ml-4">Matemáticas</h1>

        </div>
        <div className="space-y-4">
          {matematicasLessons.map((lesson, index) => {
            const isCompleted = userProgress.matematicas.completedLessons.includes(index);
            const isCurrent = userProgress.matematicas.currentLesson === index;
            const isLocked = index > userProgress.matematicas.currentLesson;
            return (
              <button
                key={index}
                onClick={() => {
                  if (!isLocked) {
                    setSelectedMathLesson(lesson);
                    setMathStep('teaching');
                    setMathAttempts(0);
                    setSelectedAnswer(null);
                  }
                }}
                disabled={isLocked}
                className={`w-full bg-white rounded-2xl p-5 shadow-lg text-left transition-all duration-200 ${
                  isLocked
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    isCompleted ? 'bg-green-100' : isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                  } shadow-inner`}>
                    {isCompleted ? (
                      <CheckCircle className="text-green-700" size={22} />
                    ) : isCurrent ? (
                      <Calculator className="text-blue-700" size={22} />
                    ) : (
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{lesson.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {isCompleted ? 'Completada' : isCurrent ? 'En progreso' : 'Bloqueada'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {userProgress.matematicas.completedLessons.length === matematicasLessons.length && (
          <div className="mt-10 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <h3 className="text-white font-bold text-xl mb-3">¡Felicidades! 🎉</h3>
            <p className="text-white/90 text-sm mb-5">Has completado todas las lecciones de matemáticas.</p>
            <button
              onClick={() => {
                const newProgress = { ...userProgress };
                newProgress.matematicas.currentLesson = 0;
                newProgress.matematicas.completedLessons = [];
                setUserProgress(newProgress);
              }}
              className="bg-white text-gray-900 px-5 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <RefreshCw size={18} />
              <span>Volver a aprender</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



   const PsychologyPage = ({ showCustomModal, journalEntries, setJournalEntries, stressEvents, setStressEvents, relaxActivities, setRelaxActivities, showActivityOptionsModal, setShowActivityOptionsModal, selectedActivityForOptions, setSelectedActivityForOptions }) => {
    // NUEVO: Estados locales para los inputs de los módulos
    const [currentJournalEntry, setCurrentJournalEntry] = useState('');
    const [currentStressEvent, setCurrentStressEvent] = useState('');
    const [currentRelaxActivity, setCurrentRelaxActivity] = useState('');


    // NUEVO: Funciones para manejar el guardado de cada módulo
    const handleSaveJournalEntry = () => {
      if (currentJournalEntry.trim()) {
        const newEntry = {
          id: Date.now(), // ID único
          date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          text: currentJournalEntry.trim(),
        };
        const updatedEntries = [newEntry, ...journalEntries]; // Añadir al principio
        setJournalEntries(updatedEntries); // Usa la prop setJournalEntries (que es saveJournalEntries de YupiApp)
        setCurrentJournalEntry(''); // Limpiar el textarea
        showCustomModal('Tu reflexión ha sido guardada. Recuerda que las emociones son naturales, lo importante es cómo reaccionamos ante ellas.', 'success');
      } else {
        showCustomModal('Por favor, escribe tu reflexión antes de guardar.', 'warning');
      }
    };

    const handleSaveStressEvent = () => {
      if (currentStressEvent.trim()) {
        const newEvent = {
          id: Date.now(), // ID único
          date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          text: currentStressEvent.trim(),
        };
        const updatedEvents = [newEvent, ...stressEvents]; // Añadir al principio
        setStressEvents(updatedEvents); // Usa la prop setStressEvents (que es saveStressEvents de YupiApp)
        setCurrentStressEvent(''); // Limpiar el textarea
        showCustomModal('Registro guardado. Reflexiona sobre cómo podrías cambiar tu perspectiva sobre este evento.', 'success');
      } else {
        showCustomModal('Por favor, describe la situación estresante antes de guardar.', 'warning');
      }
    };

    const handleSaveRelaxActivity = () => {
      if (currentRelaxActivity.trim()) {
        const newActivity = {
          id: Date.now(), // ID único
          date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          text: currentRelaxActivity.trim(),
          completed: false, // Por defecto, no completada
        };
        const updatedActivities = [newActivity, ...relaxActivities]; // Añadir al principio
        setRelaxActivities(updatedActivities); // Usa la prop setRelaxActivities (que es saveRelaxActivities de YupiApp)
        setCurrentRelaxActivity(''); // Limpiar el textarea
        showCustomModal(`Actividad programada: "${newActivity.text}". ¡No olvides cumplirla!`, 'success');
      } else {
        showCustomModal('Por favor, escribe la actividad relajante antes de guardar.', 'warning');
      }
    };




    if (psychologyModule) {
      const selected = psychologyModules.find(m => m.id === psychologyModule);

      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-500 p-6">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-8">
              <button
                onClick={() => setPsychologyModule(null)}
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>
                           <h1 className="text-xl sm:text-2xl font-bold text-white ml-4">{selected.title}</h1>

            </div>

            {psychologyModule === 'cognitive' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Identifica tu pensamiento</h3>
                  <p className="text-gray-700 mb-5">Selecciona una situación que te preocupe:</p>
                  <div className="space-y-3">
                    {['Autoestima baja', 'Miedo social', 'Ansiedad académica', 'Pensamientos negativos recurrentes'].map((option) => (
                      <button key={option} className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Reflexiona</h3>
                  <p className="text-gray-700 mb-5">¿Cómo podemos replantear este pensamiento de manera más equilibrada?</p>
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Escribe tu reflexión aquí..."
                  />
                </div>
              </div>
            )}

            {psychologyModule === 'anxiety' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Manejo de Ansiedad</h3>
                  <p className="text-gray-700 mb-5">¿Qué sientes ahora mismo?</p>
                  <div className="space-y-3">
                    {['Mi ansiedad está creciendo', 'Me siento abrumado/a', 'Tengo pensamientos acelerados', 'Siento tensión física'].map((option) => (
                      <button key={option} className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Técnica de respiración</h3>
                  <p className="text-gray-700 mb-5">Practica la respiración 4-7-8:</p>
                  <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
                    <li>Inhala por 4 segundos</li>
                    <li>Mantén por 7 segundos</li>
                    <li>Exhala por 8 segundos</li>
                    <li>Repite 3 veces</li>
                  </ol>
                </div>
              </div>
            )}

            {psychologyModule === 'journal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* MODIFICADO: Layout para mostrar lista */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Diario Emocional</h3>
                    <p className="text-gray-700 mb-5">¿Cómo te sientes hoy?</p>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg h-36 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                      placeholder="Describe tus emociones y qué las provocó."
                      value={currentJournalEntry}
                      onChange={(e) => setCurrentJournalEntry(e.target.value)}
                    />
                    <button
                      onClick={handleSaveJournalEntry} // NUEVO: Usar la función de guardado
                      className="w-full mt-5 bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
                    >
                      Guardar reflexión
                    </button>
                  </div>
                </div>
                {/* NUEVO: Sección para mostrar entradas guardadas */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-3 text-lg">Tus Reflexiones Anteriores:</h3>
                  {journalEntries.length > 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-lg max-h-96 overflow-y-auto">
                      {journalEntries.map((entry) => (
                        <div key={entry.id} className="border-b border-gray-200 last:border-b-0 py-3">
                          <p className="text-gray-500 text-xs mb-1">{entry.date}</p>
                          <p className="text-gray-800 text-sm leading-snug">{entry.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-sm text-center">
                      Aún no tienes reflexiones guardadas.
                    </div>
                  )}
                </div>
              </div>
            )}

            {psychologyModule === 'frustration' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Diario de Frustración</h3>
                  <p className="text-gray-700 mb-5">Escribe lo que te frustra. Este espacio es temporal y privado.</p>
                  <textarea
                  
                    className="w-full p-4 border border-gray-300 rounded-lg h-36 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                    placeholder="Libera tu frustración aquí... (no se guardará)"
                  />
                  <button
                    onClick={() => {
                      // Este módulo sigue siendo temporal, no guarda en localStorage
                      showCustomModal('Es normal sentir enojo o frustración. Lo importante es cómo lo manejamos. Tu espacio ha sido limpiado.', 'info'); // Usar showCustomModal con tipo 'info'
                    }}
                    className="w-full mt-5 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                  >
                    Liberar y limpiar
                  </button>
                </div>
              </div>
            )}

            {psychologyModule === 'visualization' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Visualización Positiva</h3>
                  <p className="text-gray-700 mb-5">Cierra los ojos e imagina:</p>
                  <div className="space-y-4">
                    <div className="p-5 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-blue-800 font-medium">🏖️ Un lugar tranquilo</p>
                      <p className="text-blue-600 text-sm">Imagina una playa serena con olas suaves...</p>
                    </div>
                    <div className="p-5 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-green-800 font-medium">🎯 Un logro personal</p>
                      <p className="text-green-600 text-sm">Visualiza el momento de alcanzar tu meta...</p>
                    </div>
                    <div className="p-5 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-purple-800 font-medium">✨ Tu mejor versión</p>
                      <p className="text-purple-600 text-sm">Imagínate siendo la persona que quiere ser...</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Pensamientos positivos</h3>
                  <div className="space-y-3">
                    {['Soy capaz de superar desafíos', 'Cada día me hago más fuerte', 'Mis esfuerzos valen la pena', 'Confío en mi proceso'].map((thought) => (
                      <div key={thought} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <p className="text-yellow-800">{thought}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {psychologyModule === 'stressRegister' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* MODIFICADO: Layout para mostrar lista */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Registro de Situaciones Estresantes</h3>
                    <p className="text-gray-700 mb-5">Anota un evento que te cause estrés y cómo reaccionaste:</p>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg h-36 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                      placeholder="Describe situación estresante..."
                      value={currentStressEvent}
                      onChange={(e) => setCurrentStressEvent(e.target.value)}
                    />
                    <button
                      onClick={handleSaveStressEvent} // NUEVO: Usar la función de guardado
                      className="w-full mt-5 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                    >
                      Guardar registro
                    </button>
                  </div>
                </div>
                {/* NUEVO: Sección para mostrar eventos guardados */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-3 text-lg">Tus Registros Anteriores:</h3>
                  {stressEvents.length > 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-lg max-h-96 overflow-y-auto">
                      {stressEvents.map((event) => (
                        <div key={event.id} className="border-b border-gray-200 last:border-b-0 py-3">
                          <p className="text-gray-500 text-xs mb-1">{event.date}</p>
                          <p className="text-gray-800 text-sm leading-snug">{event.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-sm text-center">
                      Aún no tienes registros de estrés guardados.
                    </div>
                  )}
                </div>
              </div>
            )}

            {psychologyModule === 'relaxPlan' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* MODIFICADO: Layout para mostrar lista */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Planificación de Actividades Relajantes</h3>
                    <p className="text-gray-700 mb-5">Escribe una actividad que te ayude a relajarte esta semana:</p>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                      placeholder="Ej. Escuchar música, leer un libro, pasear en bicicleta..."
                      value={currentRelaxActivity}
                      onChange={(e) => setCurrentRelaxActivity(e.target.value)}
                    />
                    <button
                      onClick={handleSaveRelaxActivity} // NUEVO: Usar la función de guardado
                      className="w-full mt-5 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
                    >
                      Guardar actividad
                    </button>
                  </div>
                </div>
                {/* NUEVO: Sección para mostrar actividades guardadas */}
                <div className="space-y-4">
                  <h3 className="font-bold text-white mb-3 text-lg">Tus Actividades Pendientes:</h3>
                  {relaxActivities.length > 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-lg max-h-96 overflow-y-auto">
                      {relaxActivities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => {
                            setSelectedActivityForOptions(activity); // Establece la actividad para el modal de opciones
                            setShowActivityOptionsModal(true); // Abre el modal de opciones
                          }}
                          className="w-full text-left border-b border-gray-200 last:border-b-0 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <p className="text-gray-500 text-xs mb-1">{activity.date}</p>
                          <p className="text-gray-800 text-sm leading-snug">{activity.text}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-sm text-center">
                      Aún no tienes actividades relajantes guardadas.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-500 p-6">
        <div className="max-w-md mx-auto pt-10">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setCurrentSection('home')}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <ArrowLeft className="text-white" size={24} />
            </button>
            <h1 className="text-2xl font-bold text-white ml-4">Ayuda Psicológica</h1>
          </div>



     {/* Módulos de ayuda */}

     <div className="space-y-5">

      {psychologyModules.map((module) => (

       <button

        key={module.id}

        onClick={() => setPsychologyModule(module.id)}

        className="w-full bg-white rounded-3xl p-6 shadow-2xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"

       >

        <div className="flex items-center space-x-5">

         <div className="bg-pink-100 p-4 rounded-full shadow-inner">

          <module.icon className="text-pink-700" size={28} />

         </div>

         <div className="flex-1 text-left">

          <h3 className="font-bold text-gray-900 text-lg">{module.title}</h3>

          <p className="text-gray-700 text-sm mt-1">{module.description}</p>

         </div>

         <ArrowRight className="text-gray-600" size={24} />

        </div>

       </button>

      ))}

     </div>



     {/* Consejo del día */}

     <div className="mt-10 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-md">

      <h3 className="text-white font-bold mb-4 flex items-center text-lg">

       <Lightbulb className="mr-2" size={20} />

       Consejo del día

      </h3>

      <p className="text-white/90 text-sm">

       Recuerda que cada pequeño paso hacia tu bienestar cuenta. No tengas prisa, ve a tu propio ritmo.
       
      </p>

     </div>

    </div>

   </div>

  );

 };



// Animación de éxito
 const SuccessAnimation = ({ showAnimation }) => { // Recibe showAnimation como prop
  if (!showAnimation) return null; // <-- USO DE showAnimation

  return (

   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">

    <div className="bg-white rounded-3xl p-10 text-center animate-bounce shadow-2xl">

     <div className="text-7xl mb-5">🎉</div>

     <h2 className="text-3xl font-bold text-gray-800 mb-3">¡Excelente trabajo!</h2>

     <p className="text-gray-600 text-lg">Has completado una lección</p>

    </div>

   </div>

  );

 };
const CustomModal = ({ message, onClose }) => {
  // showModal es un estado que controla la visibilidad del modal.
  // Se asume que este componente CustomModal se renderiza condicionalmente
  // en el componente padre (YupiApp) basado en el estado 'showModal'.
  // Si showModal no está definido aquí, es porque no se está pasando como prop
  // o no es un estado accesible en este ámbito.
  // En el renderizado de YupiApp, CustomModal ya recibe 'onClose' que actualiza 'showModal'.
  // Por lo tanto, no necesitamos una prop 'showModal' explícita aquí,
  // ya que la visibilidad se controla desde el padre.
  // Eliminaré la verificación `if (!showModal) return null;` de aquí para evitar
  // que dependa de una prop que no recibe explícitamente en su firma.

  const modalClasses = {
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-300',
    error: 'bg-red-600 hover:bg-red-700 focus:ring-red-300',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300 text-gray-900', // Texto oscuro para warning
  };

  const modalIcon = {
    info: '💡',
    success: '✅',
    error: '❌',
    warning: '⚠️',
  };

  return (
   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-auto">
     <div className="text-5xl mb-4">{modalIcon[message.type]}</div> {/* Muestra el emoji según el tipo */}
     <p className="text-gray-800 text-lg mb-6">{message.text}</p> {/* Usa message.text */}
     <button
      onClick={onClose}
      className={`font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 text-white ${modalClasses[message.type]}`}
     >
      Entendido
     </button>
    </div>
   </div>
  );
 };


 // Componente Modal Personalizado para reemplazar alert()
 const ActivityOptionsModal = ({ activity, onComplete, onKeep, onClose }) => {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-auto">
        <div className="text-3xl mb-4">🤔</div>
        <p className="text-gray-800 text-lg mb-6">¿Qué quieres hacer con esta actividad?</p>
        <p className="text-600 text-md italic mb-6">"{activity.text}"</p>
        <div className="space-y-4">
          <button
            onClick={() => { onComplete(activity.id); onClose(); }}
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
          >
            ✅ Cumplido
          </button>
          <button
            onClick={() => { onKeep(); onClose(); }}
            className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            ↩️ Por cumplirse
          </button>
        </div>
      </div>
    </div>
  );
 };


 // Componente del Test Vocacional

 const TestVocacionalPage = () => {

  const currentQuestion = vocationalQuestions[testVocacional.currentQuestion];



  const handleAnswer = (selectedOption) => {

   const newAnswers = [...testVocacional.answers, selectedOption];



   if (testVocacional.currentQuestion < vocationalQuestions.length - 1) {

    setTestVocacional({

     ...testVocacional,

     currentQuestion: testVocacional.currentQuestion + 1,

     answers: newAnswers

    });

   } else {

    // Calcular resultado

    const categoryCounts = {};

    newAnswers.forEach(answer => {

     categoryCounts[answer.category] = (categoryCounts[answer.category] || 0) + 1;

    });



    const winningCareer = Object.keys(categoryCounts).reduce((a, b) =>

     categoryCounts[a] > categoryCounts[b] ? a : b

    );



    setTestVocacional({

     ...testVocacional,

     answers: newAnswers,

     showResult: true,

     result: winningCareer

    });

   }

  };



  const resetTest = () => {

   setTestVocacional({

    currentQuestion: 0,

    answers: [],

    showResult: false,

    result: null

   });

  };



  if (testVocacional.showResult && testVocacional.result) {

   const result = careerResults[testVocacional.result];



   return (

    <div className={`min-h-screen bg-gradient-to-br ${result.color} p-6`}>

     <div className="max-w-md mx-auto pt-10">

      <div className="flex items-center mb-8">

       <button

        onClick={() => setCurrentSection('home')}

        className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"

       >

        <Home className="text-white" size={24} />

       </button>

       <h1 className="text-2xl font-bold text-white ml-4">Tu Resultado</h1>

      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center mb-8">

       <div className="text-6xl mb-4">{result.icon}</div>

       <h2 className="text-3xl font-bold text-gray-900 mb-4">{result.title}</h2>

       <p className="text-gray-700 text-lg mb-6 leading-relaxed">{result.description}</p>



       <div className="bg-gray-50 rounded-2xl p-6 mb-6">

        <h3 className="font-bold text-gray-900 mb-4 text-lg">Carreras recomendadas:</h3>

        <div className="grid grid-cols-1 gap-3">

         {result.careers.map((career, index) => (

          <div key={index} className="bg-white rounded-lg p-3 shadow-sm">

           <p className="font-medium text-gray-800">{career}</p>

          </div>

         ))}

        </div>

       </div>

       <div className="space-y-4">

        <button

         onClick={resetTest}

         className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"

        >

         Hacer test nuevamente

        </button>

        <button

         onClick={() => setCurrentSection('home')}

         className="w-full bg-gray-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"

        >

         Volver al inicio

        </button>

       </div>

      </div>

     </div>

    </div>

   );

  }



  return (

   <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-500 p-6">

    <div className="max-w-md mx-auto pt-10">

     <div className="flex items-center mb-8">

      <button

       onClick={() => setCurrentSection('home')}

       className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"

      >

       <ArrowLeft className="text-white" size={24} />

      </button>

      <h1 className="text-2xl font-bold text-white ml-4">Test Vocacional</h1>

     </div>

     {/* Barra de progreso */}

     <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-md">

      <div className="flex items-center justify-between mb-3">

       <span className="text-white font-medium">Pregunta {testVocacional.currentQuestion + 1} de {vocationalQuestions.length}</span>

       <span className="text-white font-medium">{Math.round(((testVocacional.currentQuestion + 1) / vocationalQuestions.length) * 100)}%</span>

      </div>

      <div className="bg-white/30 rounded-full h-3">

       <div

        className="bg-white h-3 rounded-full transition-all duration-300"

        style={{ width: `${((testVocacional.currentQuestion + 1) / vocationalQuestions.length) * 100}%` }}

       ></div>

      </div>

     </div>

     {/* Pregunta actual */}

     <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">

      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center leading-relaxed">

       {currentQuestion.question}

      </h2>



      <div className="space-y-4">

       {currentQuestion.options.map((option, index) => (

        <button

         key={index}

         onClick={() => handleAnswer(option)}

         className="w-full text-left p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 transform hover:scale-105 shadow-sm"

        >

         <div className="flex items-center space-x-4">

          <div className="bg-purple-100 rounded-full p-2 shadow-inner">

           <div className="w-3 h-3 bg-purple-600 rounded-full"></div>

          </div>

          <span className="text-gray-800 font-medium">{option.text}</span>

         </div>

        </button>

       ))}

      </div>

     </div>

     {/* Información adicional */}

     <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-md">

      <p className="text-white/90 text-sm text-center">

       💡 Responde con honestidad para obtener el mejor resultado

      </p>

     </div>

    </div>

   </div>

  );

 };



 // Componente FruitSlashGame (COPIADO DIRECTAMENTE DE TU ARCHIVO)

 const FruitSlashGame = ({ setCurrentSection }) => {

  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver'

  const [score, setScore] = useState(0);

  const [lives, setLives] = useState(3);

  const [combo, setCombo] = useState(0);

  const [highScore, setHighScore] = useState(0);

  const [fruits, setFruits] = useState([]);

  const [particles, setParticles] = useState([]);

  const [slashEffect, setSlashEffect] = useState(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [isSlashing, setIsSlashing] = useState(false);

  const [missedFruits, setMissedFruits] = useState(0);

  const [fruitSpawnTimer, setFruitSpawnTimer] = useState(0);

  const [slowMotionEffect, setSlowMotionEffect] = useState(null);

  const [cursedEffect, setCursedEffect] = useState(null);

  const gameAreaRef = useRef(null);

  // Eliminado: const animationRef = useRef(null);
  const gameLoopRef = useRef(null);



  const MISSED_FRUIT_LIMIT = 12;

  const FRUIT_SPAWN_INTERVAL = 120; // Frames between waves (about 2 seconds)

  const FRUIT_LIFETIME = 5000; // 5 seconds on screen (faster paced)

  // Eliminado: const ITEMS_PER_WAVE = 5; // 5 items max per wave



  const fruitTypes = [

   { name: 'apple', emoji: '🍎', color: '#ef4444', points: 10, critical: false },

   { name: 'orange', emoji: '🍊', color: '#f97316', points: 15, critical: false },

   { name: 'banana', emoji: '🍌', color: '#eab308', points: 12, critical: false },

   { name: 'watermelon', emoji: '🍉', color: '#22c55e', points: 20, critical: false },

   { name: 'grape', emoji: '🍇', color: '#8b5cf6', points: 18, critical: false },

   { name: 'strawberry', emoji: '🍓', color: '#ec4899', points: 25, critical: false },

   { name: 'golden_apple', emoji: '🍏', color: '#fbbf24', points: 50, critical: true },

   { name: 'bomb', emoji: '💣', color: '#1f2937', points: -100, critical: false },

   { name: 'clock', emoji: '⏰', color: '#3b82f6', points: 30, critical: false },

   { name: 'heart', emoji: '❤️', color: '#ef4444', points: 0, critical: false },

   { name: 'skull', emoji: '💀', color: '#6b7280', points: 40, critical: false }

  ];



  const createFruitWave = useCallback(() => {

   const gameArea = gameAreaRef.current;

   if (!gameArea) return [];



   const rect = gameArea.getBoundingClientRect();

   const newFruits = [];



   // Decidir si esta será una ola de 5 items (muy raro) o normal (3 items)

   const isBigWave = Math.random() < 0.08; // 8% de probabilidad de ola grande

   const itemCount = isBigWave ? 5 : 3;



   // Crear frutas regulares/críticas

   for (let i = 0; i < itemCount; i++) {

    let fruitType;

    const rand = Math.random();



    if (rand < 0.02) { // 2% - Corazón (muy raro)

     fruitType = fruitTypes.find(f => f.name === 'heart');

    } else if (rand < 0.05) { // 3% - Reloj (raro)

     fruitType = fruitTypes.find(f => f.name === 'clock');

    } else if (rand < 0.08) { // 3% - Calavera (raro)

     fruitType = fruitTypes.find(f => f.name === 'skull');

    } else if (rand < 0.18) { // 10% - Fruta crítica

     fruitType = fruitTypes.find(f => f.name === 'golden_apple');

    } else { // 82% - Frutas normales

     const normalFruits = fruitTypes.filter(f =>

      !['bomb', 'golden_apple', 'clock', 'heart', 'skull'].includes(f.name)

     );

     fruitType = normalFruits[Math.floor(Math.random() * normalFruits.length)];

    }



    const startX = 80 + (i * (rect.width - 160) / (itemCount - 1)) + (Math.random() - 0.5) * 80;

    const velocityX = (Math.random() - 0.5) * 4;

    const velocityY = 3 + Math.random() * 2;



    newFruits.push({

     id: Date.now() + Math.random() + i,

     type: fruitType,

     x: startX,

     y: -50,

     velocityX,

     velocityY,

     rotation: 0,

     rotationSpeed: (Math.random() - 0.5) * 4,

     size: fruitType.critical ? 80 : 60 + Math.random() * 20,

     sliced: false,

     createdAt: Date.now(),

     critical: fruitType.critical

    });

   }



   // Añadir bombas ocasionalmente

   const bombCount = Math.random() < 0.3 ? 1 : Math.random() < 0.1 ? 2 : 0;

   for (let i = 0; i < bombCount; i++) {

    const bombType = cursedEffect?.active ?

     fruitTypes.find(f => f.name === 'apple') : // Durante curse, bombas se vuelven frutas

     fruitTypes.find(f => f.name === 'bomb');



    const startX = 100 + Math.random() * (rect.width - 200);

    const velocityX = (Math.random() - 0.5) * 4;

    const velocityY = 3 + Math.random() * 2;



    newFruits.push({

     id: Date.now() + Math.random() + i + 100,

     type: bombType,

     x: startX,

     y: -50,

     velocityX,

     velocityY,

     rotation: 0,

     rotationSpeed: (Math.random() - 0.5) * 4,

     size: 70,

     sliced: false,

     createdAt: Date.now(),

     critical: false,

     originallyBomb: cursedEffect?.active // Marcar si era originalmente bomba

    });

   }



   return newFruits;

  }, [cursedEffect, fruitTypes]); // <-- AÑADIDO 'fruitTypes' AQUÍ



  const createParticles = useCallback((x, y, color, count = 12, critical = false) => {

   const newParticles = [];

   const particleCount = critical ? count * 2 : count;



   for (let i = 0; i < particleCount; i++) {

    newParticles.push({

     id: Date.now() + Math.random() + i,

     x,

     y,

     velocityX: (Math.random() - 0.5) * (critical ? 15 : 10),

     velocityY: (Math.random() - 0.5) * (critical ? 15 : 10),

     color: critical ? '#fbbf24' : color,

     life: 1,

     decay: critical ? 0.015 : 0.02,

     size: critical ? 4 : 2

    });

   }

   return newParticles;

  }, []);



  const sliceFruit = useCallback((fruit, mouseX, mouseY) => {

   if (fruit.sliced) return;



   setSlashEffect({ x: mouseX, y: mouseY, timestamp: Date.now() });



   // Manejar efectos especiales

   if (fruit.type.name === 'clock') {

    // Activar slow motion

    setSlowMotionEffect({

     active: true,

     startTime: Date.now(),

     duration: 5000

    });

    setScore(prev => prev + fruit.type.points);

    const newParticles = createParticles(fruit.x, fruit.y, '#3b82f6', 20, true);

    setParticles(prev => [...prev, ...newParticles]);

   } else if (fruit.type.name === 'heart') {

    // Dar vida extra

    setLives(prev => Math.min(prev + 1, 5)); // Máximo 5 vidas

    const newParticles = createParticles(fruit.x, fruit.y, '#ef4444', 20, true);

    setParticles(prev => [...prev, ...newParticles]);

   } else if (fruit.type.name === 'skull') {

    // Activar efecto maldito

    setCursedEffect({

     active: true,

     startTime: Date.now(),

     duration: 5000

    });

    setScore(prev => prev + fruit.type.points);

    const newParticles = createParticles(fruit.x, fruit.y, '#6b7280', 20);

    setParticles(prev => [...prev, ...newParticles]);

   } else if (fruit.type.name === 'bomb' && !fruit.originallyBomb) {

    // Bomba normal (o fruta transformada durante curse)

    if (cursedEffect?.active && fruit.originallyBomb) {

     // Era bomba pero ahora es fruta durante curse

     const basePoints = 15;

     const comboMultiplier = Math.min(combo + 1, 5);

     const finalPoints = basePoints * comboMultiplier;

     setScore(prev => prev + finalPoints);

     setCombo(prev => prev + 1);

    } else {

     // Bomba real

     setLives(prev => {

      const newLives = prev - 1;

      if (newLives <= 0) {

       setGameState('gameOver');

      }

      return newLives;

     });

     setCombo(0);

    }



    const explosionParticles = createParticles(fruit.x, fruit.y, '#ff0000', 20);

    setParticles(prev => [...prev, ...explosionParticles]);

   } else {

    // Frutas normales

    let actualType = fruit.type;



    // Durante curse, las frutas se vuelven bombas

    if (cursedEffect?.active && !['clock', 'heart', 'skull'].includes(fruit.type.name)) {

     // Convertir fruta en bomba durante curse

     setLives(prev => {

      const newLives = prev - 1;

      if (newLives <= 0) {

       setGameState('gameOver');

      }

      return newLives;

     });

     setCombo(0);

     const explosionParticles = createParticles(fruit.x, fruit.y, '#ff0000', 20);

     setParticles(prev => [...prev, ...explosionParticles]);

    } else {

     // Fruta normal

     const basePoints = actualType.points;

     const comboMultiplier = Math.min(combo + 1, 5);

     const finalPoints = basePoints * comboMultiplier;



     setScore(prev => prev + finalPoints);

     setCombo(prev => prev + 1);



     const newParticles = createParticles(fruit.x, fruit.y, actualType.color, 12, fruit.critical);

     setParticles(prev => [...prev, ...newParticles]);

    }

   }



   setFruits(prev => prev.map(f =>

    f.id === fruit.id ? { ...f, sliced: true, slicedAt: Date.now() } : f

   ));

  }, [createParticles, combo, cursedEffect, setLives, setScore, setCombo, setGameState]); // <-- AÑADIDO setLives, setScore, setCombo, setGameState para dependencias de sliceFruit



  const handleMouseMove = useCallback((e) => {

   if (gameState !== 'playing') return;



   const gameArea = gameAreaRef.current;

   if (!gameArea) return;



   const rect = gameArea.getBoundingClientRect();

   const mouseX = e.clientX - rect.left;

   const mouseY = e.clientY - rect.top;



   setCursorPosition({ x: mouseX, y: mouseY });



   fruits.forEach(fruit => {

    if (fruit.sliced) return;



    const distance = Math.sqrt(

     Math.pow(mouseX - fruit.x, 2) + Math.pow(mouseY - fruit.y, 2)

    );



    if (distance < fruit.size / 2) {

     setIsSlashing(true);

     sliceFruit(fruit, mouseX, mouseY);

     setTimeout(() => setIsSlashing(false), 150);

    }

   });

  }, [fruits, gameState, sliceFruit]);


const handleTouchMove = useCallback((e) => {
    if (gameState !== 'playing') return;
    // Previene el desplazamiento de la página al arrastrar el dedo
    e.preventDefault(); 

    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const rect = gameArea.getBoundingClientRect();
    // Usa clientX y clientY del primer toque (touches[0])
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;

    setCursorPosition({ x: touchX, y: touchY });

    fruits.forEach(fruit => {
      if (fruit.sliced) return;

      const distance = Math.sqrt(
        Math.pow(touchX - fruit.x, 2) + Math.pow(touchY - fruit.y, 2)
      );

      if (distance < fruit.size / 2) {
        setIsSlashing(true);
        sliceFruit(fruit, touchX, touchY);
        setTimeout(() => setIsSlashing(false), 150);
      }
    });
  }, [fruits, gameState, sliceFruit]); // <-- ELIMINADO slowMotionEffect de aquí, ya no es una dependencia



  const updateGame = useCallback(() => {

   if (gameState !== 'playing') return;



   const currentTime = Date.now();

   const gameArea = gameAreaRef.current;

   if (!gameArea) return;



   const rect = gameArea.getBoundingClientRect();



   // Actualizar efectos especiales

   if (slowMotionEffect?.active && currentTime - slowMotionEffect.startTime > slowMotionEffect.duration) {

    setSlowMotionEffect(null);

   }



   if (cursedEffect?.active && currentTime - cursedEffect.startTime > cursedEffect.duration) {

    setCursedEffect(null);

   }



   // Determinar velocidad según efectos

   const speedMultiplier = slowMotionEffect?.active ? 0.3 :
               cursedEffect?.active ? 0.7 : 1.0;



   setFruits(prev => {

    let newMissedCount = 0;

    let criticalMissed = false;



    const updated = prev.map(fruit => {

     if (fruit.sliced) return fruit;



     let newY = fruit.y + (fruit.velocityY * speedMultiplier);

     let newX = fruit.x + (fruit.velocityX * speedMultiplier);

     const newRotation = fruit.rotation + fruit.rotationSpeed;



     // Rebote en paredes laterales

     if (newX <= fruit.size / 2) {

      newX = fruit.size / 2;

      fruit.velocityX = Math.abs(fruit.velocityX); // Rebote hacia la derecha

     } else if (newX >= rect.width - fruit.size / 2) {

      newX = rect.width - fruit.size / 2;

      fruit.velocityX = -Math.abs(fruit.velocityX); // Rebote hacia la izquierda

     }



     // Check if fruit lifetime expired or fell off screen

     const timeAlive = currentTime - fruit.createdAt;

     const fellOffScreen = newY > window.innerHeight + 50;

     const timeExpired = timeAlive > FRUIT_LIFETIME * (slowMotionEffect?.active ? 2 : 1);



     if (fellOffScreen || timeExpired) {

      if (!['bomb', 'clock', 'heart', 'skull'].includes(fruit.type.name)) {

       if (fruit.critical) {

        criticalMissed = true;

       } else {

        newMissedCount++;

       }

       setCombo(0);

      }

      return { ...fruit, sliced: true, missedFruit: true };

     }



     return {

      ...fruit,

      x: newX,

      y: newY,

      rotation: newRotation

     };

    }).filter(fruit => {

     if (fruit.sliced) {

      if (fruit.slicedAt) {

       return currentTime - fruit.slicedAt < 300;

      }

      return false;

     }

     return true;

    });



    // Handle critical fruit miss

    if (criticalMissed) {

     setLives(prevLives => {

      const newLives = prevLives - 1;

      if (newLives <= 0) {

       setGameState('gameOver');

      }

      return newLives;

     });

    }



    // Handle regular missed fruits

    if (newMissedCount > 0) {

     setMissedFruits(prevMissed => {

      const newTotal = prevMissed + newMissedCount;

      if (newTotal >= MISSED_FRUIT_LIMIT) {

       setGameState('gameOver');

      }

      return newTotal;

     });

    }



    return updated;

   });



   setParticles(prev =>

    prev.map(particle => ({

     ...particle,

     x: particle.x + particle.velocityX,

     y: particle.y + particle.velocityY,

     life: particle.life - particle.decay

    })).filter(particle => particle.life > 0)

   );



   setFruitSpawnTimer(prev => prev + 1);

  }, [gameState, slowMotionEffect, cursedEffect, setLives, setMissedFruits, setGameState, setCombo, setParticles, setFruitSpawnTimer, setSlowMotionEffect, setCursedEffect]); // <-- AÑADIDO setLives, setMissedFruits, setGameState, setCombo, setParticles, setFruitSpawnTimer, setSlowMotionEffect, setCursedEffect



  const spawnFruits = useCallback(() => {

   if (gameState !== 'playing') return;



   if (fruitSpawnTimer >= FRUIT_SPAWN_INTERVAL && fruits.length === 0) {

    const newWave = createFruitWave();

    if (newWave.length > 0) {

     setFruits(newWave);

     setFruitSpawnTimer(0);

    }

   }

  }, [gameState, fruitSpawnTimer, fruits.length, createFruitWave, setFruits, setFruitSpawnTimer]); // <-- AÑADIDO setFruits, setFruitSpawnTimer



  const startGame = () => {

   setGameState('playing');

   setScore(0);

   setLives(3);

   setCombo(0);

   setFruits([]);

   setParticles([]);

   setMissedFruits(0);

   setFruitSpawnTimer(0);

   setSlowMotionEffect(null);

   setCursedEffect(null);

  };



  const endGame = useCallback(() => { // <-- ENVUELTO EN useCallback
   setGameState('gameOver');
   setHighScore(prev => Math.max(prev, score));
   setFruits([]);
   setParticles([]);
  }, [setGameState, setHighScore, score, setFruits, setParticles]); // <-- AÑADIDO DEPENDENCIAS



  const resetGame = () => {

   setGameState('menu');

   setScore(0);

   setLives(3);

   setCombo(0);

   setFruits([]);

   setParticles([]);

   setMissedFruits(0);

   setFruitSpawnTimer(0);

   setSlowMotionEffect(null);

   setCursedEffect(null);

  };



  useEffect(() => {

   if (gameState === 'playing') {

    gameLoopRef.current = setInterval(() => {

     updateGame();

     spawnFruits();

    }, 16);



    return () => {

     if (gameLoopRef.current) {

      clearInterval(gameLoopRef.current);

     }

    };

   }

  }, [gameState, updateGame, spawnFruits]);



  useEffect(() => {

   if (gameState === 'gameOver') {

    endGame();

   }

  }, [gameState, endGame]); // <-- AÑADIDO 'endGame' AQUÍ



  if (gameState === 'menu') {

   return (

    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-red-500 to-orange-500 flex items-center justify-center">

     <div className="absolute top-4 left-4"> {/* Posiciona el botón en la esquina superior izquierda */}

      <button

       onClick={() => setCurrentSection('home')} // Al hacer clic, le dice a Yupi que vuelva a la sección 'home'

       className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"

      >

       <ArrowLeft className="text-white" size={24} /> {/* Icono de flecha hacia la izquierda */}

      </button>

     </div>

     <div className="text-center text-white space-y-8">

      <h1 className="text-6xl font-bold mb-4">⚔️ Fruit Slash</h1>

      <p className="text-xl mb-8">¡Corta todas las frutas, evita las bombas!</p>

      <div className="space-y-4">

       <button

        onClick={startGame}

        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-xl transition-colors"

       >

        ⚡ Comenzar

       </button>

       {highScore > 0 && (

        <p className="text-lg">🏆 Mejor Puntuación: {highScore}</p>

       )}

      </div>

      <div className="text-sm opacity-75 mt-8 space-y-2 max-w-md mx-auto">

       <p>⚔️ Corta frutas para ganar puntos</p>

       <p>🍏 <span className="text-yellow-400 font-bold">Frutas doradas</span> son críticas - ¡DEBES cortarlas!</p>

       <p>💣 Evita las bombas o perderás una vida</p>

       <p>⏰ <span className="text-blue-400 font-bold">Reloj</span> = Slow Motion por 5 segundos</p>

       <p>❤️ <span className="text-red-400 font-bold">Corazón</span> = Vida extra (muy raro)</p>

       <p>💀 <span className="text-gray-400 font-bold">Calavera</span> = Frutas se vuelven bombas por 5s</p>

       <p>🔥 Haz combos para multiplicar puntos</p>

      </div>

     </div>

    </div>

   );

  }

  if (gameState === 'gameOver') {

   return (

    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 flex items-center justify-center">

     <div className="text-center text-white space-y-8">

      <h1 className="text-6xl font-bold mb-4">💥 Game Over</h1>

      <div className="space-y-4">

       <p className="text-2xl">Puntuación Final: {score}</p>

       <p className="text-lg text-red-300">Vidas: {lives}/3</p>

       <p className="text-lg text-red-300">Frutas Perdidas: {missedFruits}/{MISSED_FRUIT_LIMIT}</p>

       {score === highScore && score > 0 && (

        <p className="text-xl text-yellow-400"> ¡Nueva mejor puntuación!</p>

       )}

       <p className="text-lg">Mejor Puntuación: {highScore}</p>

      </div>

      <div className="space-x-4">

       <button

        onClick={resetGame}

        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-xl transition-colors"

       >🔄 Jugar de Nuevo

       </button>

       <button

        onClick={() => {

         resetGame(); // Primero, reiniciamos el juego Fruit Slash

         setCurrentSection('home'); // Luego, volvemos a la pantalla principal de Yupi

        }}

        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors"

       >

        🏠 Menú Principal de Yupi

       </button>

      </div>

     </div>

    </div>

   );

  }



  return (

  <div
    ref={gameAreaRef}
    className={`min-h-screen overflow-hidden relative transition-all duration-500 ${
     slowMotionEffect?.active ? 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500' :
     cursedEffect?.active ? 'bg-gradient-to-br from-red-900 via-purple-900 to-black' :
     'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600'
    }`}
    onMouseMove={handleMouseMove}
    onTouchMove={handleTouchMove} 
    style={{ cursor: 'none' }}
   >

    {/* HUD */}

    <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white z-10">

     <div className="space-x-6">

      <span className="text-xl font-bold">⚔️ {score}</span>

      <span className="text-lg">❤️ {lives}</span>

      {combo > 1 && (

       <span className="text-lg text-yellow-400 animate-pulse">

        🔥 x{combo}

       </span>

      )}

     </div>

     <div className="text-right space-x-4">

      <span className="text-lg">🏆 Best: {highScore}</span>

      <span className={`text-lg ${missedFruits > 8 ? 'text-red-400 animate-pulse' : 'text-white'}`}>

       🚨 {missedFruits}/{MISSED_FRUIT_LIMIT}

      </span>

     </div>

    </div>



    {/* Efectos activos */}

    {slowMotionEffect?.active && (

     <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20">

      <div className="bg-blue-500 bg-opacity-80 rounded-lg px-4 py-2 text-white font-bold animate-pulse">

       ⏰ SLOW MOTION ACTIVO

      </div>

     </div>

    )}



    {cursedEffect?.active && (

     <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20">

      <div className="bg-red-800 bg-opacity-80 rounded-lg px-4 py-2 text-white font-bold animate-pulse">

       💀 MALDICIÓN ACTIVA - ¡FRUTAS = BOMBAS!

      </div>

     </div>

    )}



    {/* Fruits */}

    {fruits.map(fruit => (

     <div

      key={fruit.id}

      className="absolute pointer-events-none select-none transition-opacity duration-300"

      style={{

       left: fruit.x - fruit.size / 2,

       top: fruit.y - fruit.size / 2,

       transform: `rotate(${fruit.rotation}deg)`,

       fontSize: fruit.size,

       opacity: fruit.sliced ? 0.3 : 1,

       filter: fruit.type.name === 'bomb'
        ? 'drop-shadow(0 0 15px red)'
        : fruit.critical
         ? 'drop-shadow(0 0 15px gold) brightness(1.2)'
         : fruit.type.name === 'clock'
          ? 'drop-shadow(0 0 15px cyan)'
          : fruit.type.name === 'heart'
           ? 'drop-shadow(0 0 15px pink)'
           : fruit.type.name === 'skull'
            ? 'drop-shadow(0 0 15px purple)'
            : 'none'
      }}

     >

      {fruit.type.emoji}

      {fruit.critical && (

       <div className="absolute -top-2 -right-2 text-xs animate-pulse">✨</div>

      )}

     </div>

    ))}



    {/* Custom Cursor - Ninja Sword */}

    {gameState === 'playing' && (

     <div

      className="absolute pointer-events-none z-20 transition-all duration-75"

      style={{

       left: cursorPosition.x - 15,

       top: cursorPosition.y - 15,

       transform: isSlashing ? 'scale(1.8) rotate(45deg)' : 'scale(1.2) rotate(0deg)'

      }}

     >

      <div className="relative">

       <div

        className={`w-10 h-1 rounded-full transition-all duration-150 ${

         isSlashing ? 'bg-yellow-300 shadow-lg shadow-yellow-400' : 'bg-gray-300'

        }`}

        style={{

         background: isSlashing

          ? 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)'

          : 'linear-gradient(90deg, #e5e7eb, #9ca3af)'

        }}

       />

       <div className="absolute -right-1 -top-0.5 w-2 h-2 bg-amber-800 rounded-full border border-amber-900" />



       {isSlashing && (

        <div className="absolute -left-6 -top-3 w-16 h-6 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70 rounded-full blur-sm animate-pulse" />

       )}

      </div>

     </div>

    )}



    {/* Particles */}

    {particles.map(particle => (

     <div

      key={particle.id}

      className="absolute rounded-full pointer-events-none"

      style={{

       left: particle.x,

       top: particle.y,

       width: particle.size || 2,

       height: particle.size || 2,

       backgroundColor: particle.color,

       opacity: particle.life

      }}

     />

    ))}



    {/* Slash Effect */}

    {slashEffect && Date.now() - slashEffect.timestamp < 200 && (

     <div

      className="absolute w-24 h-1 bg-white opacity-80 pointer-events-none animate-ping"

      style={{

       left: slashEffect.x - 48,

       top: slashEffect.y,

       transform: 'rotate(45deg)'

      }}

     />

    )}



    {/* Instructions */}

    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center opacity-75">

     <p className="text-sm">

      Corta las frutas • <span className="text-yellow-400">🍏 Frutas doradas</span> •

      <span className="text-blue-400"> ⏰ Slow Motion</span> •

      <span className="text-red-400"> ❤️ Vida Extra</span> •

      <span className="text-gray-400"> 💀 Maldición</span> • Evita bombas 💣

     </p>

    </div>

   </div>

  );

 };



 // Renderizado principal

 // El elemento <audio> se renderiza aquí, fuera de cualquier componente de página específico

return (
  <>
    {/* EL ELEMENTO AUDIO SE COLOCA AQUÍ, FUERA DE CUALQUIER RUTA ESPECÍFICA */}
    <audio ref={audioRef} loop src={playlist[currentSongIndex]} />
    
    {selectedLesson !== null && currentSection === 'comunicacion' ? (
      <LessonPage
        subject={currentSection}
        lesson={selectedLesson}
        lessonIndex={comunicacionLessonsImproved.findIndex(l => l.title === selectedLesson.title)}
        setSelectedLesson={setSelectedLesson}
        completeLesson={completeLesson}
        evaluateAnswer={evaluateAnswer}
        showCustomModal={showCustomModal} // <-- PASANDO showCustomModal
      />
    ) : currentSection === 'comunicacion' ? (
      <SubjectPage
        subject="comunicacion"
        lessons={comunicacionLessonsImproved}
        color="from-blue-500 to-indigo-500"
        setSelectedLesson={setSelectedLesson}
        setCurrentSection={setCurrentSection}
        userProgress={userProgress}
        setUserAnswer={setUserAnswer}
        setLessonStep={setLessonStep}
        setCurrentExample={setCurrentExample}
        saveProgress={saveProgress}
      />
 ) : currentSection === 'matematicas' ? ( // NUEVA CONDICIÓN PARA MATEMÁTICAS
      <MathematicsPage
        selectedMathLesson={selectedMathLesson}
        setSelectedMathLesson={setSelectedMathLesson}
        mathStep={mathStep}
        setMathStep={setMathStep}
        mathAttempts={mathAttempts}
        setMathAttempts={setMathAttempts}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        setShowAnimation={setShowAnimation} // <-- PASANDO setShowAnimation
        showCustomModal={showCustomModal}
        matematicasLessons={matematicasLessons} // Pasa el array de lecciones
        handleMathAnswer={handleMathAnswer}     // Pasa la función de evaluación
        setCurrentSection={setCurrentSection}   // Para volver a la home
      />
      ) : (currentSection === 'psychology' || currentSection === 'psychologyModule') ? ( // <--- CORRECCIÓN DE PARÉNTESIS AQUÍ
      <PsychologyPage 
        showCustomModal={showCustomModal}
        journalEntries={journalEntries}
        setJournalEntries={saveJournalEntries} // Pasa la función para guardar
        stressEvents={stressEvents}
        setStressEvents={saveStressEvents}     // Pasa la función para guardar
        relaxActivities={relaxActivities}
        setRelaxActivities={saveRelaxActivities} // Pasa la función para guardar
        showActivityOptionsModal={showActivityOptionsModal} // Pasa el estado del modal de opciones
        setShowActivityOptionsModal={setShowActivityOptionsModal} // Pasa la función para controlar el modal de opciones
        selectedActivityForOptions={selectedActivityForOptions} // Pasa la actividad seleccionada
        setSelectedActivityForOptions={setSelectedActivityForOptions} // Pasa la función para establecer la actividad seleccionada
      /> 

    ) : currentSection === 'fruitSlash' ? (
      <FruitSlashGame setCurrentSection={setCurrentSection} />
    ) : currentSection === 'testVocacional' ? (
      <TestVocacionalPage />
    ) : (
      // HomePage ahora recibe las props para los controles de música
      <HomePage
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        playlist={playlist}
        currentSongIndex={currentSongIndex}
      />
   )}
   {/* Pasa showAnimation como prop a SuccessAnimation */}
   <SuccessAnimation showAnimation={showAnimation} />
   {/* Esta línea ya estaba bien, solo confirmamos que CustomModal se renderice */}
   
   {showModal && (
     <CustomModal message={modalMessage} onClose={() => setShowModal(false)} />
   )}

   {/* Renderiza ActivityOptionsModal SOLO si showActivityOptionsModal es true */}
   {showActivityOptionsModal && (
     <ActivityOptionsModal
       activity={selectedActivityForOptions}
       onComplete={handleActivityComplete}
       onKeep={handleActivityKeep}
       onClose={() => setShowActivityOptionsModal(false)}
     />
   )}
  </>
 );

};

export default YupiApp;
