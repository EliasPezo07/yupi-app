   /* eslint-disable no-unused-vars */ 
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
const [isMathJaxReady, setIsMathJaxReady] = useState(false);

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
  '/aries-ft-peter-hook--georgia.mp3',
   '/Gorillaz - Silent Running ft. Adeleye Omotayo (Official Audio).mp3',
      '/Its A Party Vibe.mp3',
            '/Re-Hash.mp3',
             '/Sokie - New Love.mp3',
              '/Shes My Collar (feat. Kali Uchis).mp3'
  
 ];

useEffect(() => {
    console.log("YupiApp: Intentando detectar MathJax...");
    if (window.MathJax) {
      console.log("YupiApp: MathJax detectado al inicio!");
      setIsMathJaxReady(true);
    } else {
      console.log("YupiApp: MathJax NO detectado, iniciando intervalo de chequeo...");
      const checkMathJax = setInterval(() => {
        if (window.MathJax) {
          console.log("YupiApp: MathJax detectado por intervalo!");
          setIsMathJaxReady(true);
          clearInterval(checkMathJax);
        } else {
          console.log("YupiApp: MathJax aún no está listo...");
        }
      }, 500);
      return () => clearInterval(checkMathJax);
    }
  }, []);

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
const comunicacionLessonsImproved = [
  {
    title: "Lectura y comprensión de textos",
    teaching: "La comprensión lectora implica entender no solo las palabras, sino el mensaje completo del texto. Debemos identificar la idea principal, detalles importantes y el propósito del autor. Practica leyendo fragmentos de distintos géneros y contestando preguntas de comprensión.",
    examples: [
      {
        text: "El sol brillaba intensamente mientras María caminaba por el parque. Los niños jugaban alegremente y las flores mostraban sus colores vibrantes.",
        question: "¿Cuál es la idea principal del texto?, un ejemplo seria: Describe un buen dia en el parque, recuerda no olvidar las tildes y demás reglas gramaticales",
        validAnswers: [

"El sol brillaba mientras los niños jugaban en el parque",

"Lo que se resalta es cómo el sol ilumina el parque y hace todo más colorido",

"Un día soleado con niños jugando y flores brillando",

"El parque estaba lleno de vida, el sol brillaba y los niños jugaban",

"Lo principal es que el sol hacía brillar todo y los niños se divertían",

"Un ambiente soleado y alegre con juegos de niños y flores coloridas",

"El sol brillaba mientras las flores y los niños llenaban el parque",

"Lo que destaca es el buen clima, con el sol brillante y los niños jugando",

"Un parque lleno de vida, donde el sol y los niños daban color",

"El sol brillaba y todo en el parque se veía vibrante y lleno de actividad",

"Lo más importante es que el sol hacía todo en el parque más alegre",

"Un día lleno de sol, juegos y flores es lo que describe el texto",

"El texto muestra cómo el sol ilumina el parque y los niños disfrutan jugando",

"Lo que se destaca es el brillo del sol y la actividad alegre en el parque",

"Un parque lleno de color, vida y niños jugando bajo el sol",

"El sol brilla y llena de energía el parque donde juegan los niños",

"Lo que se resalta es que el parque estaba lleno de vida por el sol y los niños",

"Un día soleado donde el parque se llena de colores gracias a la luz del sol",

"El sol brilla y el parque se convierte en un lugar lleno de diversión y colores",

"Lo que destaca es cómo el sol crea una atmósfera alegre con los niños jugando",

"Un día brillante en el parque con muchas flores y niños jugando",

"El texto describe cómo el sol y la vida en el parque van de la mano",

"Lo principal es el buen tiempo y la diversión de los niños bajo el sol",

"Un parque lleno de vida y color gracias al sol brillante",

"El sol brilla y el parque está lleno de juegos y flores coloridas",

"Lo que se describe es un parque alegre, lleno de luz y actividad",

"Un día soleado donde los niños disfrutan y las flores se ven más hermosas",

"El texto muestra cómo el sol hace que el parque esté lleno de color",

"Lo más importante es el ambiente cálido y alegre que crea el sol",

"Un parque soleado lleno de niños jugando y flores brillando con colores vibrantes",


          "Describe un día bonito en el parque",
          "Describir un bonito dia en el parque",
          "Lo bonito que estaba el parque",
"Describe lo bonito que estaba el parque ese dia",
"Un día con mucho sol y niños jugando en el parque",

"Un paseo en el parque donde todo está muy bonito, con el sol y las flores",

"Un día feliz en el parque con niños y flores",

"Un día de sol, niños jugando y todo se ve bonito",

"Un parque donde hace calor, los niños juegan y las flores se ven de colores",
"Lo bonito que está el parque con tanto sol y flores",

"Lo alegre que es el día en el parque con los niños jugando",

"Lo que destaca es el sol brillando y el parque lleno de vida",

"Lo tranquilo del paseo de María mientras disfruta del parque",

"Lo colorido y animado que está todo en el parque",
"Un bonito dia en el parque",
"Un bello dia en el parque",
"Un bello día en el parque",
"Un bonito día en el parque",
"Bello dia en el parque",
"Bello día en el parque",
"Describe un bonito dia en un parque",
"Describe un bonito día en un parque",
"Describe un bello dia en el parque",
"Describe un bello día en el parque",
"Un dia alegre en un parque",
"un día alegre en el parque",
"Bonito dia en un parque",
"Bonito dia en el parque",

  "Cuenta cómo estaba el parque ese día",
  "Relata un momento en el parque",
  "Narra cómo era el ambiente del parque",
  "Presenta un día soleado en el parque",
  "Muestra lo que pasaba en el parque",
  "Describe la escena del parque",
  "Explica cómo estaba el parque ese día",
  "Cuenta que el parque estaba alegre",
  "Narra un día feliz en el parque",
  "Cuenta sobre María en el parque",
  "Describe lo que María veía en el parque",
  "Pinta una imagen de un parque alegre",
  "Relata un paseo por el parque",
  "Nos muestra un parque bonito",
  "Cuenta cómo era el clima en el parque",
  "Muestra lo bonito que era el parque",
  "Habla de un parque lleno de vida",
  "Relata un parque lleno de color",
  "Cuenta un momento alegre en el parque",
  "Describe una escena tranquila en el parque",
  "Cuenta cómo brillaba el sol en el parque",
  "Narra cómo los niños jugaban",
  "Describe un lugar alegre con flores",
  "Muestra un ambiente alegre y soleado",
  "Cuenta lo que pasaba ese día en el parque",
  "Habla de un parque donde todos son felices",
  "Cuenta que el parque estaba muy bonito",
  "Narra una caminata de María en el parque",
  "Describe cómo se sentía estar en el parque",
  "describe un dia bonito en el parque",
  "cuenta como estaba el parque ese dia",
  "relata un momento en el parque",
  "narra como era el ambiente del parque",
  "presenta un dia soleado en el parque",
  "muestra lo que pasaba en el parque",
  "describe la escena del parque",
  "explica como estaba el parque ese dia",
  "cuenta que el parque estaba alegre",
  "narra un dia feliz en el parque",
  "cuenta sobre maria en el parque",
  "describe lo que maria veia en el parque",
  "pinta una imagen de un parque alegre",
  "relata un paseo por el parque",
  "nos muestra un parque bonito",
  "cuenta como era el clima en el parque",
  "muestra lo bonito que era el parque",
  "habla de un parque lleno de vida",
  "relata un parque lleno de color",
  "cuenta un momento alegre en el parque",
  "describe una escena tranquila en el parque",
  "cuenta como brillaba el sol en el parque",
  "narra como los niños jugaban",
  "describe un lugar alegre con flores",
  "muestra un ambiente alegre y soleado",
  "cuenta lo que pasaba ese dia en el parque",
  "habla de un parque donde todos son felices",
  "cuenta que el parque estaba muy bonito",
  "narra una caminata de maria en el parque",
  "describe como se sentia estar en el parque",
  "describe un dia bonito en el parque",
  "narra una escena alegre en el parque",
  "presenta un dia soleado y tranquilo",
  "muestra como estaba el parque ese dia",
  "relata un paseo en el parque",
  "retrata un momento feliz en el parque",
  "pinta una imagen de un parque soleado",
  "muestra como brillaba el sol y jugaban los niños",
  "explica como se sentia estar en el parque",
  "cuenta como era un dia lindo en el parque",
  "describe una escena natural y tranquila",
  "presenta un lugar lleno de alegria",
  "relata un instante hermoso en el parque",
  "pinta un paisaje lleno de color y vida",
  "cuenta como jugaban los niños en un dia soleado",
  "retrata un dia feliz con flores y sol",
  "describe el ambiente agradable del parque",
  "muestra un momento comun pero especial",
  "narra un dia con clima ideal para pasear",
  "presenta un entorno alegre al aire libre",
  "cuenta un dia lleno de color en el parque",
  "retrata una tarde tranquila con naturaleza",
  "muestra una escena llena de paz",
  "describe lo que se ve y se siente en el parque",
  "relata un lugar lleno de vida y colores",
  "pinta una escena simple pero bella",
  "cuenta un instante alegre con niños y flores",
  "describe como la naturaleza esta viva",
  "retrata la belleza de un dia en el parque",
  "muestra como el sol ilumina el parque",
  "presenta una escena de felicidad simple",
  "relata un paisaje lleno de energia y luz",
  "narra un dia soleado con alegria",
  "Explica como se vive un momento al aire libre",
  "Describe una escena natural con calma",
  "pinta el parque como un lugar hermoso",
  "cuenta como el sol y las flores alegran el parque",
  "Presenta un escenario lleno de emociones suaves",
  "Retrata la tranquilidad de un espacio natural",
  "Muestra una descripcion alegre del parque",



        ]
      },
      {
        text: "Los océanos cubren el 71% de la superficie terrestre y contienen el 97% del agua del planeta. Son fundamentales para regular el clima global.",
        question: "¿Cuál es el dato más importante sobre los océanos?, recuerda no olvidar las tildes, aunque si del punto final, ese si olvidalo",
        validAnswers: [

"El océano cubre una gran parte de la Tierra y regula el clima",

"Lo más importante es que los océanos cubren el 71% de la Tierra",

"Un dato clave es que los océanos tienen el 97% del agua del planeta",

"El texto resalta que los océanos son fundamentales para el clima",

"Lo que destaca es que los océanos ocupan la mayor parte de la superficie terrestre",

"Un dato importante es que el océano tiene la mayor parte del agua del planeta",

"El océano regula el clima y ocupa gran parte de la Tierra",

"Lo esencial es que los océanos son cruciales para el clima y ocupan el 71% del planeta",

"Un dato clave es que los océanos son esenciales para la regulación del clima global",

"El océano cubre la mayor parte de la Tierra y regula el clima global",

"Lo que más destaca es que los océanos contienen casi toda el agua del planeta",

"Un dato importante es que los océanos ocupan el 71% de la superficie de la Tierra",

"El océano es vital para la Tierra, cubriendo gran parte de ella y regulando el clima",

"Lo esencial es que los océanos son vitales para la regulación del clima y el agua",

"Un dato fundamental es que los océanos cubren la mayor parte de la superficie terrestre",

"El océano regula el clima y es responsable de gran parte del agua en la Tierra",

"Lo que se resalta es que los océanos tienen el 97% del agua en el planeta",

"Un dato esencial es que los océanos cubren la mayoría del planeta y son clave para el clima",

"El océano tiene un papel vital en la regulación del clima y ocupa el 71% del planeta",

"Lo principal es que los océanos ocupan una gran parte de la superficie y controlan el clima",

"Un dato importante es que los océanos controlan el clima y tienen la mayor parte del agua",

"El océano cubre la mayor parte de la Tierra y es esencial para el equilibrio climático",

"Lo que se destaca es que los océanos contienen la mayoría del agua en la Tierra",

"Un dato relevante es que los océanos son esenciales para la vida en la Tierra",

"El océano ocupa gran parte de la superficie terrestre y regula el clima",

"Lo esencial es que los océanos son vitales para la vida, regulando el clima y el agua",

"Un dato fundamental es que los océanos controlan el clima global y ocupan la mayor parte del planeta",

"El océano es crucial para la vida en la Tierra, regulando el clima y ocupando el 71% de la superficie",

"Lo más importante es que los océanos contienen casi toda el agua y son esenciales para el clima",

"Un dato clave es que los océanos ocupan el 71% de la superficie terrestre y controlan el clima global",

          "El océano cubre casi todo el planeta y ayuda al clima",

"Lo que más importa es que cubren la mayoría de la Tierra y regulan el clima",

"Lo importante es que los océanos cubren casi todo y controlan el clima",

"Un dato clave es que ocupan mucho espacio en el planeta y afectan el clima",

"Lo que destaca es que cubren casi toda la Tierra y ayudan con el clima",

"El océano es el que más agua tiene y regula el clima",

"Lo más importante es que los océanos cubren una gran parte de la Tierra",

"Un dato importante es que los océanos regulan el clima del planeta",

"Lo que resalta es que los océanos ocupan la mayor parte de la superficie",

"Un dato clave es que los océanos tienen casi toda el agua de la Tierra",

"Lo que destaca es que son esenciales para controlar el clima",

"El océano tiene el 97% del agua del planeta y cubre la mayor parte",
          "cubren la mayor parte del planeta y ayudan al clima",
          "Que los océanos cubren al planeta ",
            "Que los océanos cubren gran parte de la tierra ",
              "Que los océanos cubren gran parte del planeta ",
  "ocupan gran parte de la tierra y regulan el clima",
  "los oceanos tienen casi toda el agua del planeta",
  "los oceanos cubren la mayoria del planeta",
  "regulan el clima del mundo",
  "tienen el 97 por ciento del agua del mundo",
  "estan en casi toda la superficie del planeta",
  "controlan el clima de la tierra",
  "los oceanos cubren el 71 por ciento de la tierra",
  "ayudan a mantener el clima estable",
  "los oceanos son los que equilibran el clima",
  "ocupan gran parte del planeta y son clave para el clima",
  "son fundamentales para el clima del mundo",
  "los oceanos tienen casi toda el agua y regulan el clima",
  "son la mayor parte del planeta y afectan el clima",
  "los oceanos son importantes para el clima global",
  "cubren mucho del planeta y hacen que el clima se mantenga",
  "regulan el clima y tienen la mayor parte del agua",
  "los oceanos cubren la tierra y ayudan con el clima",
  "los oceanos tienen muchisima agua y cuidan el clima",
  "la mayor parte del planeta esta cubierta por oceanos",
  "los oceanos dominan el planeta y regulan el clima",
  "ocupan gran parte del mundo y hacen que el clima funcione",
  "los oceanos mantienen el clima estable",
  "los oceanos tienen la mayor parte del agua y del clima",
  "cubren casi todo el planeta y son importantes para el clima",
  "los oceanos ayudan a controlar el tiempo del mundo",
  "están en casi todo el planeta y afectan el clima",
  "cubren la tierra y ayudan a que el clima sea estable",
  "los oceanos tienen un rol clave en el clima del planeta",
   "Cubren la mayor parte del planeta y ayudan al clima",
  "Ocupan gran parte de la Tierra y regulan el clima",
  "Los océanos tienen casi toda el agua del planeta",
  "Los océanos cubren la mayoría del planeta",
  "Regulan el clima del mundo",
  "Tienen el 97 por ciento del agua del mundo",
  "Están en casi toda la superficie del planeta",
  "Controlan el clima de la Tierra",
  "Los océanos cubren el 71 por ciento de la Tierra",
  "Ayudan a mantener el clima estable",
  "Los océanos son los que equilibran el clima",
  "Ocupan gran parte del planeta y son clave para el clima",
  "Son fundamentales para el clima del mundo",
  "Los océanos tienen casi toda el agua y regulan el clima",
  "Son la mayor parte del planeta y afectan el clima",
  "Los océanos son importantes para el clima global",
  "Cubren mucho del planeta y hacen que el clima se mantenga",
  "Regulan el clima y tienen la mayor parte del agua",
  "Los océanos cubren la Tierra y ayudan con el clima",
  "Los océanos tienen muchísima agua y cuidan el clima",
  "La mayor parte del planeta está cubierta por océanos",
  "Los océanos dominan el planeta y regulan el clima",
  "Ocupan gran parte del mundo y hacen que el clima funcione",
  "Los océanos mantienen el clima estable",
  "Los océanos tienen la mayor parte del agua y del clima",
  "Cubren casi todo el planeta y son importantes para el clima",
  "Los océanos ayudan a controlar el tiempo del mundo",
  "Están en casi todo el planeta y afectan el clima",
  "Cubren la Tierra y ayudan a que el clima sea estable",
  "Los océanos tienen un rol clave en el clima del planeta",
   "indica que los oceanos cubren gran parte del planeta",
  "describe como los oceanos regulan el clima",
  "presenta el rol de los oceanos en el equilibrio climatico",
  "muestra que los oceanos ocupan el 71 por ciento del planeta",
  "explica que los oceanos contienen casi toda el agua",
  "señala que los oceanos tienen el 97 por ciento del agua",
  "relata como los oceanos afectan el clima global",
  "informa sobre la importancia climatica de los oceanos",
  "describe la funcion de los oceanos en el planeta",
  "muestra el papel de los oceanos en la Tierra",
  "indica que los oceanos controlan el clima del mundo",
  "presenta los oceanos como reguladores climaticos",
  "explica la magnitud de agua que hay en los oceanos",
  "cuenta como los oceanos equilibran el planeta",
  "describe la extension de los oceanos",
  "muestra el poder natural de los oceanos",
  "explica que los oceanos tienen un rol vital",
  "resalta la influencia de los oceanos en el clima",
  "indica que los oceanos dominan la superficie terrestre",
  "cuenta como el mar regula la temperatura global",
  "presenta el agua de los oceanos como fuente vital",
  "explica la relacion entre oceano y clima",
  "informa que los oceanos cubren la mayor parte del mundo",
  "muestra el vinculo entre oceanos y vida en la Tierra",
  "describe el volumen de agua en los oceanos",
  "relata como los oceanos sostienen el planeta",
  "cuenta que los oceanos tienen funciones esenciales",
  "presenta el mar como base del equilibrio natural",
  "explica que sin oceanos no habria estabilidad climatica",
  "indica que los oceanos tienen una enorme superficie",
  "muestra el impacto global de los oceanos",
  "describe la conexion entre agua, oceano y clima",
  "presenta los oceanos como sistema de control climatico",
  "explica que el oceano es clave en el planeta",
  "cuenta que los oceanos son fuente de vida",
  "informa que el agua del planeta esta en los oceanos",
  "describe los oceanos como termostato del mundo",
  "muestra que los oceanos son inmensos y vitales",
  "explica como los oceanos ayudan al equilibrio natural",
  "indica que los oceanos cubren casi todo el planeta"
        ]
      }
    ]
  },
  {
    title: "Identificación de la idea principal en textos narrativos, descriptivos y expositivos",
    teaching: "En textos narrativos buscamos la acción central; en descriptivos, la descripción del objeto o lugar; en expositivos, la información principal que el autor quiere transmitir. Reconocer la idea principal nos ayuda a captar la esencia del texto.",
    examples: [
      {
        text: "Narrativo: Juan salió de su casa sin saber que aquel día cambiaría su vida para siempre. Descriptivo: La montaña se alzaba imponente con nieve en su cima y pinos verdes a su alrededor. Expositivo: La fotosíntesis es el proceso por el cual las plantas transforman la luz solar en energía.",
        question: "Identifica la idea principal de cada fragmento, recuerda seguir el ejemplo anterior y no saltarte las tildes, los 2 puntos suspensivos : ni el punto al final de otra oracion, No, hoy no te lo saltas.",
        validAnswers: [

"Narrativo: Juan sale sin saber que algo importante pasará. Descriptivo: La montaña es grande y tiene nieve. Expositivo: La fotosíntesis es el proceso que usan las plantas.",

"Narrativo: Juan sale de su casa sin imaginar lo que pasará. Descriptivo: La montaña tiene nieve y pinos. Expositivo: La fotosíntesis es cuando las plantas convierten la luz en energía.",

"Narrativo: Juan está a punto de vivir algo importante. Descriptivo: La montaña es alta y cubierta de nieve. Expositivo: Las plantas transforman la luz en energía mediante la fotosíntesis.",

"Narrativo: Juan sale sin saber que su vida cambiará. Descriptivo: La montaña es imponente con nieve. Expositivo: La fotosíntesis es el proceso de transformación de la luz solar en energía.",

"Narrativo: Juan no sabe lo que le espera. Descriptivo: La montaña tiene nieve en su cima. Expositivo: Las plantas producen energía gracias a la fotosíntesis.",

"Narrativo: Juan sale y su vida cambiará. Descriptivo: La montaña tiene una cima nevada. Expositivo: La fotosíntesis es cuando las plantas convierten la luz solar en alimento.",

"Narrativo: Juan inicia su día sin saber lo que pasará. Descriptivo: La montaña tiene nieve y pinos. Expositivo: La fotosíntesis es un proceso que usan las plantas para obtener energía.",

"Narrativo: Juan sale y algo importante va a suceder. Descriptivo: La montaña es grande con nieve en la cima. Expositivo: La fotosíntesis permite a las plantas transformar la luz en energía.",

"Narrativo: Juan sale y todo está por cambiar. Descriptivo: La montaña tiene pinos verdes. Expositivo: La fotosíntesis convierte la luz solar en energía para las plantas.",

"Narrativo: Juan no sabe que está a punto de vivir un cambio. Descriptivo: La montaña se alza con nieve. Expositivo: Las plantas usan la fotosíntesis para transformar la luz en energía.",

"Narrativo: Juan sale y un gran cambio ocurrirá. Descriptivo: La montaña se ve imponente. Expositivo: La fotosíntesis es cuando las plantas convierten luz en energía.",

"Narrativo: Juan comienza su día sin saber lo que viene. Descriptivo: La montaña está cubierta de nieve. Expositivo: La fotosíntesis transforma la luz en energía para las plantas.",

"Narrativo: Juan sale sin saber que su vida cambiará. Descriptivo: La montaña está rodeada de pinos. Expositivo: Las plantas convierten la luz solar en energía mediante la fotosíntesis.",

"Narrativo: Juan no sabe que su vida cambiará ese día. Descriptivo: La montaña es alta y tiene nieve. Expositivo: La fotosíntesis es un proceso de transformación de luz solar en energía.",

"Narrativo: Juan está a punto de vivir una gran aventura. Descriptivo: La montaña tiene nieve y pinos verdes. Expositivo: La fotosíntesis es un proceso esencial para las plantas.",

"Narrativo: Juan sale y no sabe que su vida cambiará. Descriptivo: La montaña tiene nieve en su cima. Expositivo: Las plantas usan la luz para producir su energía.",

"Narrativo: Juan está por vivir algo que cambiará todo. Descriptivo: La montaña se ve imponente con nieve. Expositivo: La fotosíntesis convierte la luz en energía para las plantas.",

"Narrativo: Juan sale sin saber que ese día cambiará su vida. Descriptivo: La montaña tiene pinos y nieve. Expositivo: Las plantas convierten la luz en energía mediante la fotosíntesis.",

"Narrativo: Juan sale de su casa sin imaginar lo que vendrá. Descriptivo: La montaña tiene una gran cima nevada. Expositivo: La fotosíntesis es la transformación de la luz en energía para las plantas.",

"Narrativo: Juan sale sin saber que algo importante sucederá. Descriptivo: La montaña tiene nieve y está rodeada de pinos. Expositivo: La fotosíntesis permite a las plantas producir energía.",

"Narrativo: Juan no sabe lo que pasará ese día. Descriptivo: La montaña se ve majestuosa y nevada. Expositivo: La fotosíntesis transforma la luz solar en energía para las plantas.",

"Narrativo: Juan comienza su día sin saber que su vida cambiará. Descriptivo: La montaña es grande, con nieve en la cima. Expositivo: Las plantas transforman la luz solar en energía con la fotosíntesis.",

"Narrativo: Juan sale y su vida va a cambiar. Descriptivo: La montaña es majestuosa y cubierta de nieve. Expositivo: La fotosíntesis es la forma en que las plantas convierten la luz en energía.",

"Narrativo: Juan sale sin saber que algo importante pasará. Descriptivo: La montaña se ve impresionante con nieve. Expositivo: La fotosíntesis es cuando las plantas usan la luz para producir energía.",

"Narrativo: Juan comienza su día sin saber lo que está por venir. Descriptivo: La montaña es grande y tiene nieve en la cima. Expositivo: Las plantas usan la fotosíntesis para generar su energía.",

"Narrativo: Juan sale sin saber que todo cambiará. Descriptivo: La montaña tiene nieve y está rodeada de pinos. Expositivo: La fotosíntesis convierte la luz solar en energía para las plantas.",

"Narrativo: Juan sale y no sabe lo que le depara el día. Descriptivo: La montaña se alza con nieve en la cima. Expositivo: La fotosíntesis es el proceso por el cual las plantas convierten la luz en energía.",

"Narrativo: Juan no sabe que su vida cambiará ese día. Descriptivo: La montaña tiene pinos verdes y nieve. Expositivo: La fotosíntesis es cuando las plantas usan la luz solar para producir energía.",

"Narrativo: Juan está por enfrentar un gran cambio. Descriptivo: La montaña se ve impresionante con nieve. Expositivo: La fotosíntesis permite a las plantas transformar la luz en energía.",

"Narrativo: Juan sale sin saber que algo importante está por suceder. Descriptivo: La montaña es imponente, con nieve en la cima. Expositivo: La fotosíntesis es el proceso que permite a las plantas generar su energía.",

          "El narrativo: Juan tiene un día que cambia su vida. Lo descriptivo: La montaña está llena de nieve. Un expositivo: La fotosíntesis convierte la luz en energía.",

"El narrativo: Juan vive un gran cambio. Lo descriptivo: La montaña es enorme y tiene nieve. Un expositivo: La fotosíntesis es cómo las plantas hacen su comida.",

"El narrativo: Juan tiene un día que lo cambia todo. Lo descriptivo: La montaña tiene nieve y pinos. Un expositivo: Las plantas usan la luz para vivir.",

"El narrativo: Juan pasa un día importante. Lo descriptivo: La montaña está cubierta de nieve. Un expositivo: Las plantas producen energía usando la luz.",

"El narrativo: Juan vive un día único. Lo descriptivo: La montaña tiene pinos y nieve. Un expositivo: Las plantas hacen comida con luz.",

"El narrativo: Juan cambia su vida en un día. Lo descriptivo: La montaña es gigante y fría. Un expositivo: La fotosíntesis ayuda a las plantas a crecer.",

"El narrativo: Juan tiene un día que lo marca. Lo descriptivo: La montaña está llena de nieve. Un expositivo: Las plantas usan luz para crecer.",

"El narrativo: Juan experimenta un cambio en su vida. Lo descriptivo: La montaña tiene nieve y pinos. Un expositivo: La fotosíntesis convierte la luz en comida.",

"El narrativo: Juan pasa un día que le cambia. Lo descriptivo: La montaña es impresionante. Un expositivo: Las plantas usan luz para hacer energía.",

"El narrativo: Juan vive algo que cambia su vida. Lo descriptivo: La montaña tiene nieve y árboles. Un expositivo: Las plantas crean energía con la luz.",

"El narrativo: Juan vive un cambio en su vida. Lo descriptivo: La montaña es fría y tiene nieve. Un expositivo: La fotosíntesis es como las plantas se alimentan.",

"El narrativo: Juan tiene un día inolvidable. Lo descriptivo: La montaña está cubierta de nieve. Un expositivo: La fotosíntesis convierte luz en energía para las plantas.",
    "narrativo: juan vive un dia que cambia su vida. descriptivo: como es la montaña. expositivo: que es la fotosintesis.",
  "narrativo: un dia importante para juan. descriptivo: descripcion de la montaña. expositivo: explicacion de la fotosintesis.",
  "narrativo: el cambio en la vida de juan. descriptivo: detalles sobre la montaña. expositivo: como funciona la fotosintesis.",
  "narrativo: juan tiene un dia que lo marca. descriptivo: como luce la montaña. expositivo: informacion sobre la fotosintesis.",
  "narrativo: algo pasa que cambia a juan. descriptivo: rasgos de la montaña. expositivo: como es la fotosintesis.",
  "narrativo: un suceso cambia a juan. descriptivo: imagen de la montaña. expositivo: que hacen las plantas con la luz.",
  "narrativo: dia que cambia la vida de juan. descriptivo: aspecto de la montaña. expositivo: uso de la luz por las plantas.",
  "narrativo: la historia de un cambio. descriptivo: descripcion de un paisaje. expositivo: proceso que hacen las plantas.",
  "narrativo: el dia especial de juan. descriptivo: como es el lugar. expositivo: como las plantas usan la luz.",
  "narrativo: dia diferente para juan. descriptivo: descripcion de un lugar natural. expositivo: energia de las plantas.",
  "narrativo: un momento que cambia todo. descriptivo: paisaje montañoso. expositivo: energia a partir del sol.",
  "narrativo: algo le pasa a juan. descriptivo: paisaje con nieve y pinos. expositivo: funcion de la fotosintesis.",
  "narrativo: una decision que cambia a juan. descriptivo: como se ve la montaña. expositivo: uso de la energia solar.",
  "narrativo: dia inolvidable para juan. descriptivo: lugar con nieve. expositivo: proceso natural de las plantas.",
  "narrativo: evento importante en la vida de juan. descriptivo: lugar frio y verde. expositivo: como transforman la luz.",
  "narrativo: juan tiene un dia inesperado. descriptivo: paisaje descrito. expositivo: uso de la luz solar.",
  "narrativo: la vida de juan cambia. descriptivo: como era la montaña. expositivo: que hacen las hojas.",
  "narrativo: juan enfrenta algo nuevo. descriptivo: descripcion de un entorno natural. expositivo: proceso en las plantas.",
  "narrativo: dia diferente para juan. descriptivo: lugar con pinos. expositivo: uso de la luz por las plantas.",
  "narrativo: historia de un cambio personal. descriptivo: elementos del paisaje. expositivo: energia para vivir.",
  "narrativo: dia especial de juan. descriptivo: montaña alta con nieve. expositivo: que es la fotosintesis.",
  "narrativo: el dia clave para juan. descriptivo: entorno montañoso. expositivo: como crean energia las plantas.",
  "narrativo: algo que cambia a juan. descriptivo: una montaña nevada. expositivo: proceso vital en plantas.",
  "narrativo: suceso impactante para juan. descriptivo: descripcion visual de la montaña. expositivo: mecanismo de energia vegetal.",
  "narrativo: momento que cambia la vida. descriptivo: paisaje natural. expositivo: explicacion cientifica de un proceso.",
  "narrativo: cambio en la historia de juan. descriptivo: caracteristicas del paisaje. expositivo: fotosintesis resumida.",
  "narrativo: un dia que marca a juan. descriptivo: lugar con pinos y nieve. expositivo: proceso solar de las plantas.",
  "narrativo: historia de un cambio en juan. descriptivo: detalles de la montaña. expositivo: energia solar en plantas.",
  "narrativo: un dia diferente. descriptivo: como era la montaña. expositivo: proceso natural.",
  "narrativo: historia de un cambio. descriptivo: paisaje detallado. expositivo: energia para la planta.",
  "narrativo: dia que cambia todo. descriptivo: vista de la montaña. expositivo: transformacion de luz en energia.",
  "narrativo: cambio importante. descriptivo: lugar nevado. expositivo: luz solar usada por plantas.",
  "narrativo: vida de juan cambia. descriptivo: descripcion de naturaleza. expositivo: energia vegetal.",
  "narrativo: algo inesperado le pasa a juan. descriptivo: montaña con nieve. expositivo: uso de la luz solar.",
  "narrativo: nueva etapa de juan. descriptivo: paisaje de montaña. expositivo: funcion de la fotosintesis.",
  "narrativo: juan no sabia que ese dia lo cambiaria. descriptivo: la montaña se describe. expositivo: explicacion sobre fotosintesis.",
  "narrativo: juan vive algo que le cambia. descriptivo: paisaje nevado. expositivo: que es la fotosintesis.",
  "narrativo: suceso que transforma a juan. descriptivo: montaña con detalles. expositivo: proceso solar de energia.",
  "narrativo: cambio inesperado. descriptivo: naturaleza en la montaña. expositivo: fotosintesis en plantas.",
  "narrativo: historia de juan y su cambio. descriptivo: lugar con pinos y nieve. expositivo: explicacion del proceso en plantas.",
  "Narrativo: Juan vive un día que cambia su vida. Descriptivo: Cómo es la montaña. Expositivo: Qué es la fotosíntesis.",
  "Narrativo: Un día importante para Juan. Descriptivo: Descripción de la montaña. Expositivo: Explicación de la fotosíntesis.",
  "Narrativo: El cambio en la vida de Juan. Descriptivo: Detalles sobre la montaña. Expositivo: Cómo funciona la fotosíntesis.",
  "Narrativo: Juan tiene un día que lo marca. Descriptivo: Cómo luce la montaña. Expositivo: Información sobre la fotosíntesis.",
  "Narrativo: Algo pasa que cambia a Juan. Descriptivo: Rasgos de la montaña. Expositivo: Cómo es la fotosíntesis.",
  "Narrativo: Un suceso cambia a Juan. Descriptivo: Imagen de la montaña. Expositivo: Qué hacen las plantas con la luz.",
  "Narrativo: Día que cambia la vida de Juan. Descriptivo: Aspecto de la montaña. Expositivo: Uso de la luz por las plantas.",
  "Narrativo: La historia de un cambio. Descriptivo: Descripción de un paisaje. Expositivo: Proceso que hacen las plantas.",
  "Narrativo: El día especial de Juan. Descriptivo: Cómo es el lugar. Expositivo: Cómo las plantas usan la luz.",
  "Narrativo: Día diferente para Juan. Descriptivo: Descripción de un lugar natural. Expositivo: Energía de las plantas.",
  "Narrativo: Un momento que cambia todo. Descriptivo: Paisaje montañoso. Expositivo: Energía a partir del sol.",
  "Narrativo: Algo le pasa a Juan. Descriptivo: Paisaje con nieve y pinos. Expositivo: Función de la fotosíntesis.",
  "Narrativo: Una decisión que cambia a Juan. Descriptivo: Cómo se ve la montaña. Expositivo: Uso de la energía solar.",
  "Narrativo: Día inolvidable para Juan. Descriptivo: Lugar con nieve. Expositivo: Proceso natural de las plantas.",
  "Narrativo: Evento importante en la vida de Juan. Descriptivo: Lugar frío y verde. Expositivo: Cómo transforman la luz.",
  "Narrativo: Juan tiene un día inesperado. Descriptivo: Paisaje descrito. Expositivo: Uso de la luz solar.",
  "Narrativo: La vida de Juan cambia. Descriptivo: Cómo era la montaña. Expositivo: Qué hacen las hojas.",
  "Narrativo: Juan enfrenta algo nuevo. Descriptivo: Descripción de un entorno natural. Expositivo: Proceso en las plantas.",
  "Narrativo: Día diferente para Juan. Descriptivo: Lugar con pinos. Expositivo: Uso de la luz por las plantas.",
  "Narrativo: Historia de un cambio personal. Descriptivo: Elementos del paisaje. Expositivo: Energía para vivir.",
  "Narrativo: Día especial de Juan. Descriptivo: Montaña alta con nieve. Expositivo: Qué es la fotosíntesis.",
  "Narrativo: El día clave para Juan. Descriptivo: Entorno montañoso. Expositivo: Cómo crean energía las plantas.",
  "Narrativo: Algo que cambia a Juan. Descriptivo: Una montaña nevada. Expositivo: Proceso vital en plantas.",
  "Narrativo: Suceso impactante para Juan. Descriptivo: Descripción visual de la montaña. Expositivo: Mecanismo de energía vegetal.",
  "Narrativo: Momento que cambia la vida. Descriptivo: Paisaje natural. Expositivo: Explicación científica de un proceso.",
  "Narrativo: Cambio en la historia de Juan. Descriptivo: Características del paisaje. Expositivo: Fotosíntesis resumida.",
  "Narrativo: Un día que marca a Juan. Descriptivo: Lugar con pinos y nieve. Expositivo: Proceso solar de las plantas.",
  "Narrativo: Historia de un cambio en Juan. Descriptivo: Detalles de la montaña. Expositivo: Energía solar en plantas.",
  "Narrativo: Un día diferente. Descriptivo: Cómo era la montaña. Expositivo: Proceso natural.",
  "Narrativo: Historia de un cambio. Descriptivo: Paisaje detallado. Expositivo: Energía para la planta.",
  "Narrativo: Día que cambia todo. Descriptivo: Vista de la montaña. Expositivo: Transformación de luz en energía.",
  "Narrativo: Cambio importante. Descriptivo: Lugar nevado. Expositivo: Luz solar usada por plantas.",
  "Narrativo: Vida de Juan cambia. Descriptivo: Descripción de naturaleza. Expositivo: Energía vegetal.",
  "Narrativo: Algo inesperado le pasa a Juan. Descriptivo: Montaña con nieve. Expositivo: Uso de la luz solar.",
  "Narrativo: Nueva etapa de Juan. Descriptivo: Paisaje de montaña. Expositivo: Función de la fotosíntesis.",
  "Narrativo: Juan no sabía que ese día lo cambiaría. Descriptivo: La montaña se describe. Expositivo: Explicación sobre fotosíntesis.",
  "Narrativo: Juan vive algo que le cambia. Descriptivo: Paisaje nevado. Expositivo: Qué es la fotosíntesis.",
  "Narrativo: Suceso que transforma a Juan. Descriptivo: Montaña con detalles. Expositivo: Proceso solar de energía.",
  "Narrativo: Cambio inesperado. Descriptivo: Naturaleza en la montaña. Expositivo: Fotosíntesis en plantas.",
  "Narrativo: Historia de Juan y su cambio. Descriptivo: Lugar con pinos y nieve. Expositivo: Explicación del proceso en plantas."
  
        ]
      },
      {
        text: "El mercado de frutas estaba lleno de colores vivos y aromas frescos.",
        question: "¿Qué idea principal tiene el fragmento descriptivo?, Puedes agregar el inicio palabras como Mostrar o Presentar para una respuesta mas acertada, recuerda no olvidar las tildes, aunque ahora puedes saltarte el punto al final",
        validAnswers: [
          "El fragmento muestra un mercado lleno de frutas y colores",
          "El mercado está lleno de frutas y colores vibrantes",

"Lo importante es que el mercado tiene muchos colores y olores frescos",

"Un mercado colorido y con frutas frescas es lo que describe",

"El texto muestra un mercado con frutas y colores brillantes",

"Lo que se destaca es la variedad de frutas y colores del mercado",

"Un mercado lleno de frutas y colores intensos es lo que se describe",

"El mercado está lleno de colores vivos y frutas frescas",

"Lo que se muestra es un mercado lleno de vida y colores",

"Un mercado lleno de aromas y colores intensos es lo que se describe",

"El mercado tiene una gran variedad de colores y frutas",

"Lo principal es que el mercado se describe como lleno de frutas frescas",

"Un mercado vibrante con muchos colores y frutas frescas",

"El mercado tiene una atmósfera llena de colores y olores frescos",

"Lo que se destaca es la abundancia de frutas y colores del mercado",

"Un mercado lleno de colores vibrantes y frutas frescas es lo que describe",

"El texto muestra un mercado lleno de frutas y colores",

"El texto describe un mercado lleno de frutas y colores",
"Lo principal es presentar un mercado con muchos colores y aromas frescos",

"Un dato clave es describir el mercado lleno de frutas y colores vivos",

"El fragmento presenta el mercado lleno de colores y frutas frescas",

"Lo que destaca es mostrar un mercado lleno de vida, frutas y colores",

"Un fragmento que describe un mercado lleno de frutas y colores vibrantes",

"El fragmento presenta un mercado con frutas frescas y colores vivos",

"Lo que se muestra es un mercado lleno de frutas de colores y aromas",

"Un mercado colorido y lleno de frutas es lo que se describe",

"El texto describe un mercado con frutas y colores brillantes",

"Lo que se muestra es el mercado lleno de frutas frescas y colores",

"Un mercado lleno de frutas, colores y aromas es lo que se describe",

          "describir el mercado lleno de frutas y colores",
          "Describir el mercado lleno de frutas y colores",
          "Describe un mercado lleno de colores y aromas",
          "Un mercado con colores y aromas",
          "Un mercado unico",
          "Un mercado con colores y aromas",
          "Un mercado con colores y aromas frescos",
          "Describe como es el mercado",
          "Describe el mercado",
          "como es el mercado de frutas",
  "mostrar como es el mercado de frutas",
  "presentar el ambiente del mercado",
  "contar como se veia el mercado de frutas",
  "retratar el lugar donde vendian frutas",
  "explicar como lucia el mercado",
  "dar detalles del mercado de frutas",
  "describir el aspecto del mercado con frutas",
  "pintar una imagen del mercado lleno de colores",
  "mostrar los colores y aromas del mercado",
  "presentar el mercado con sus colores vivos",
  "contar como olia y se veia el mercado",
  "enseñar como era el ambiente del mercado",
  "narrar la descripcion del mercado de frutas",
  "contar como se sentia estar en el mercado",
  "explicar la apariencia del mercado",
  "detallar el mercado de frutas",
  "hablar de los colores y olores del mercado",
  "describir el lugar donde vendian frutas frescas",
  "mostrar el mercado lleno de vida",
  "explicar el ambiente lleno de frutas",
  "narrar como estaba el mercado de frutas",
  "presentar un mercado lleno de aromas",
  "contar como era el mercado lleno de colores",
  "dar una imagen del mercado de frutas",
  "mostrar como se ve el mercado de frutas",
  "describir el ambiente colorido del mercado",
  "presentar el lugar con frutas y colores",
  "detallar como era el mercado lleno de frutas",
  "explicar como estaba el mercado",
  "describir la atmosfera del mercado",
  "mostrar el mercado lleno de colores y olores",
  "hablar de un mercado con frutas frescas",
  "contar como lucia el mercado de frutas",
  "pintar como era el mercado",
  "describir como se sentia en el mercado",
  "dar detalles del ambiente del mercado",
  "explicar que aspecto tenia el mercado",
  "narrar el lugar con frutas frescas",
  "mostrar el mercado con colores vivos",
  "Describir el mercado lleno de frutas y colores",
  "Mostrar cómo era el mercado de frutas",
  "Presentar el ambiente del mercado",
  "Contar cómo se veía el mercado de frutas",
  "Retratar el lugar donde vendían frutas",
  "Explicar cómo lucía el mercado",
  "Dar detalles del mercado de frutas",
  "Describir el aspecto del mercado con frutas",
  "Pintar una imagen del mercado lleno de colores",
  "Mostrar los colores y aromas del mercado",
  "Presentar el mercado con sus colores vivos",
  "Contar cómo olía y se veía el mercado",
  "Enseñar cómo era el ambiente del mercado",
  "Narrar la descripción del mercado de frutas",
  "Contar cómo se sentía estar en el mercado",
  "Explicar la apariencia del mercado",
  "Detallar el mercado de frutas",
  "Hablar de los colores y olores del mercado",
  "Describir el lugar donde vendían frutas frescas",
  "Mostrar el mercado lleno de vida",
  "Explicar el ambiente lleno de frutas",
  "Narrar cómo estaba el mercado de frutas",
  "Presentar un mercado lleno de aromas",
  "Contar cómo era el mercado lleno de colores",
  "Dar una imagen del mercado de frutas",
  "Mostrar cómo se ve el mercado de frutas",
  "Describir el ambiente colorido del mercado",
  "Presentar el lugar con frutas y colores",
  "Detallar cómo era el mercado lleno de frutas",
  "Explicar cómo estaba el mercado",
  "Describir la atmósfera del mercado",
  "Mostrar el mercado lleno de colores y olores",
  "Hablar de un mercado con frutas frescas",
  "Contar cómo lucía el mercado de frutas",
  "Pintar cómo era el mercado",
  "Describir cómo se sentía en el mercado",
  "Dar detalles del ambiente del mercado",
  "Explicar qué aspecto tenía el mercado",
  "Narrar el lugar con frutas frescas",
  "Mostrar el mercado con colores vivos",
  "describe el mercado lleno de frutas y colores",
  "muestra como era el mercado de frutas",
  "presenta el ambiente del mercado",
  "relata como se veia el mercado de frutas",
  "retrata el lugar donde vendian frutas",
  "explica como lucia el mercado",
  "da detalles del mercado de frutas",
  "describe el aspecto del mercado con frutas",
  "pinta una imagen del mercado lleno de colores",
  "muestra los colores y aromas del mercado",
  "presenta el mercado con sus colores vivos",
  "relata como olia y se veia el mercado",
  "enseña como era el ambiente del mercado",
  "narra la descripcion del mercado de frutas",
  "relata como se sentia estar en el mercado",
  "explica la apariencia del mercado",
  "detalla el mercado de frutas",
  "habla de los colores y olores del mercado",
  "describe el lugar donde vendian frutas frescas",
  "muestra el mercado lleno de vida",
  "explica el ambiente lleno de frutas",
  "narra como estaba el mercado de frutas",
  "presenta un mercado lleno de aromas",
  "relata como era el mercado lleno de colores",
  "da una imagen del mercado de frutas",
  "muestra como se ve el mercado de frutas",
  "describe el ambiente colorido del mercado",
  "presenta el lugar con frutas y colores",
  "detalla como era el mercado lleno de frutas",
  "explica como estaba el mercado",
  "describe la atmosfera del mercado",
  "muestra el mercado lleno de colores y olores",
  "habla de un mercado con frutas frescas",
  "relata como lucia el mercado de frutas",
  "pinta como era el mercado",
  "describe como se sentia en el mercado",
  "da detalles del ambiente del mercado",
  "explica que aspecto tenia el mercado",
  "narra el lugar con frutas frescas",
  "muestra el mercado con colores vivos",
  "Describe el mercado con frutas y colores",
  "Muestra cómo era el mercado de frutas",
  "Presenta el ambiente del mercado",
  "Relata cómo se veía el mercado de frutas",
  "Retrata el lugar donde vendían frutas",
  "Explica cómo lucía el mercado",
  "Da detalles del mercado de frutas",
  "Describe el aspecto del mercado con frutas",
  "Pinta una imagen del mercado lleno de colores",
  "Muestra los colores y aromas del mercado",
  "Presenta el mercado con sus colores vivos",
  "Relata cómo olía y se veía el mercado",
  "Enseña cómo era el ambiente del mercado",
  "Narra la descripción del mercado de frutas",
  "Relata cómo se sentía estar en el mercado",
  "Explica la apariencia del mercado",
  "Detalla el mercado de frutas",
  "Habla de los colores y olores del mercado",
  "Describe el lugar donde vendían frutas frescas",
  "Muestra el mercado lleno de vida",
  "Explica el ambiente lleno de frutas",
  "Narra cómo estaba el mercado de frutas",
  "Presenta un mercado lleno de aromas",
  "Relata cómo era el mercado lleno de colores",
  "Da una imagen del mercado de frutas",
  "Muestra cómo se ve el mercado de frutas",
  "Describe el ambiente colorido del mercado",
  "Presenta el lugar con frutas y colores",
  "Detalla cómo era el mercado lleno de frutas",
  "Explica cómo estaba el mercado",
  "Describe la atmósfera del mercado",
  "Muestra el mercado lleno de colores y olores",
  "Habla de un mercado con frutas frescas",
  "Relata cómo lucía el mercado de frutas",
  "Pinta cómo era el mercado",
  "Describe cómo se sentía en el mercado",
  "Da detalles del ambiente del mercado",
  "Explica qué aspecto tenía el mercado",
  "Narra el lugar con frutas frescas",
  "Muestra el mercado con colores vivos"
        ]
      }
    ]
  },
  {
    title: "Reconocimiento de la estructura de los textos: introducción, desarrollo y conclusión",
    teaching: "Todo texto bien estructurado tiene: Introducción (presenta el tema), Desarrollo (explica o narra) y Conclusión (resume o cierra la idea). Identificar estas partes ayuda a organizar la lectura y la redacción.",
    examples: [
      {
        text: "Introducción: El cambio climático es un desafío global. Desarrollo: El aumento de gases de efecto invernadero provoca el derretimiento de glaciares y fenómenos meteorológicos extremos. Conclusión: Para mitigar sus efectos, necesitamos energías renovables y reducir la huella de carbono.",
        question: "Señala la introducción, el desarrollo y la conclusión,  tal y como en el ejmplo de arriba, ahora si no te saltes el punto al final y no olvides la tilde.",
        validAnswers: [
          "Introducción: Presentación del cambio climático. Desarrollo: Explicación de sus causas y efectos. Conclusión: Propuesta de soluciones.",

"Introducción: Se menciona el cambio climático. Desarrollo: Se detallan sus efectos y causas. Conclusión: Se ofrecen soluciones para el futuro.",

"Introducción: El cambio climático es un problema global. Desarrollo: Se explica cómo los gases afectan al planeta. Conclusión: Se dan soluciones para mitigar el impacto.",

"Introducción: El cambio climático es un desafío urgente. Desarrollo: Se describen los efectos del calentamiento global. Conclusión: La solución está en energías renovables.",

"Introducción: El cambio climático está afectando al planeta. Desarrollo: Se detallan sus causas y consecuencias. Conclusión: Se deben tomar medidas inmediatas para frenar el daño.",

"Introducción: El cambio climático es una crisis mundial. Desarrollo: Los gases de efecto invernadero y su impacto. Conclusión: Necesitamos reducir las emisiones y usar energías limpias.",

"Introducción: El cambio climático es real y urgente. Desarrollo: Los efectos incluyen desastres naturales. Conclusión: Hay que cambiar nuestros hábitos y usar energía renovable.",

"Introducción: Se presenta el problema del cambio climático. Desarrollo: Se explican sus causas y consecuencias. Conclusión: La solución es adoptar energías renovables.",

"Introducción: El cambio climático es un desafío global. Desarrollo: Se detallan los efectos como el derretimiento de los glaciares. Conclusión: Se proponen soluciones a nivel global.",

"Introducción: El cambio climático está afectando al planeta. Desarrollo: Los glaciares se están derritiendo. Conclusión: Se deben buscar fuentes de energía más sostenibles.",

"Introducción: El cambio climático es una amenaza mundial. Desarrollo: El aumento de gases está acelerando el calentamiento global. Conclusión: Hay que tomar medidas urgentes para reducir las emisiones.",

"Introducción: El cambio climático es un tema importante. Desarrollo: Los gases de efecto invernadero están causando desastres. Conclusión: Se proponen alternativas como energías renovables.",
          "Introducción: Presentación del cambio climático. Desarrollo: Explicación de sus causas y efectos. Conclusión: Propuesta de soluciones.",
          "Introducción: Introducción al cambio climático. Desarrollo: Causas y consecuencias. Conclusión: Soluciones propuestas.",
          "Introducción: Planteamiento del problema. Desarrollo: Análisis de efectos. Conclusión: Medidas sugeridas.",
          "Introducción: Tema del cambio climático. Desarrollo: Efectos y causas. Conclusión: Alternativas de solución.",
          "Introducción: Problema climático. Desarrollo: Consecuencias del problema. Conclusión: Propuestas para solucionarlo.",
          "introduccion: presenta el cambio climatico. desarrollo: explica causas y efectos. conclusion: propone soluciones posibles.",
  "introduccion: plantea el tema del cambio climatico. desarrollo: describe sus consecuencias. conclusion: sugiere acciones.",
  "introduccion: introduce el problema ambiental. desarrollo: detalla los impactos. conclusion: muestra posibles salidas.",
  "introduccion: muestra el problema del clima. desarrollo: analiza las causas. conclusion: indica como actuar.",
  "introduccion: relata que el clima esta cambiando. desarrollo: expone los efectos. conclusion: da medidas concretas.",
  "introduccion: da una idea general del tema. desarrollo: desarrolla causas y consecuencias. conclusion: da recomendaciones.",
  "introduccion: menciona el cambio climatico. desarrollo: profundiza en los daños. conclusion: plantea alternativas.",
  "introduccion: presenta el desafio ambiental. desarrollo: analiza el aumento de gases. conclusion: propone energias limpias.",
  "introduccion: describe un problema global. desarrollo: cuenta como afecta al planeta. conclusion: recomienda soluciones.",
  "introduccion: muestra la problematica. desarrollo: detalla los fenomenos que produce. conclusion: ofrece acciones concretas.",
  "introduccion: plantea el tema. desarrollo: desarrolla los efectos negativos. conclusion: da posibles respuestas.",
  "introduccion: introduce el desafio. desarrollo: explica lo que lo causa. conclusion: propone usar energias limpias.",
  "introduccion: resume el problema. desarrollo: muestra sus consecuencias. conclusion: da formas de mitigar el impacto.",
  "introduccion: inicia con el cambio climatico. desarrollo: desarrolla lo que ocurre. conclusion: concluye con ideas de solucion.",
  "introduccion: abre el tema global. desarrollo: expone la situacion actual. conclusion: concluye con medidas necesarias.",
  "introduccion: presenta un problema ambiental. desarrollo: explica sus consecuencias. conclusion: propone actuar.",
  "introduccion: introduce el tema. desarrollo: explica el calentamiento. conclusion: propone cambios energeticos.",
  "introduccion: menciona el reto global. desarrollo: explica el origen. conclusion: da ideas para mejorar.",
  "introduccion: señala el tema. desarrollo: muestra lo que esta pasando. conclusion: recomienda cambiar habitos.",
  "introduccion: plantea una preocupacion. desarrollo: relata efectos graves. conclusion: impulsa soluciones.",
  "introduccion: explica el tema a tratar. desarrollo: desarrolla causas y efectos. conclusion: propone reducir huella.",
  "introduccion: informa del cambio climatico. desarrollo: describe su avance. conclusion: sugiere reducir contaminacion.",
  "introduccion: abre con el tema ambiental. desarrollo: muestra consecuencias reales. conclusion: impulsa energias limpias.",
  "introduccion: habla sobre el cambio del clima. desarrollo: analiza por que pasa. conclusion: propone soluciones claras.",
  "introduccion: presenta el topico. desarrollo: desarrolla la idea central. conclusion: sugiere acciones humanas.",
  "introduccion: plantea el fenomeno. desarrollo: explica como nos afecta. conclusion: propone actuar desde ahora.",
  "introduccion: relata que hay un problema. desarrollo: lo detalla. conclusion: recomienda energia renovable.",
  "introduccion: describe un tema global. desarrollo: da detalles cientificos. conclusion: indica que hacer.",
  "introduccion: plantea el problema del clima. desarrollo: detalla sus consecuencias. conclusion: menciona acciones.",
  "introduccion: muestra la preocupacion mundial. desarrollo: explica los fenomenos. conclusion: propone cambiar habitos.",
  "introduccion: introduce el tema del clima. desarrollo: muestra como afecta. conclusion: presenta alternativas.",
  "introduccion: habla del cambio. desarrollo: detalla lo que provoca. conclusion: sugiere actuar juntos.",
  "introduccion: senala un reto actual. desarrollo: analiza el problema. conclusion: sugiere soluciones practicas.",
  "introduccion: explica la situacion global. desarrollo: menciona lo que provoca. conclusion: da ideas utiles.",
  "introduccion: comienza con el tema. desarrollo: desarrolla el contenido. conclusion: da recomendaciones directas.",
  "introduccion: abre con una alerta climatica. desarrollo: describe el impacto. conclusion: concluye con medidas.",
  "introduccion: presenta el problema. desarrollo: lo desarrolla con ejemplos. conclusion: propone formas de actuar.",
  "introduccion: menciona el cambio. desarrollo: describe causas y efectos. conclusion: sugiere reducir emisiones.",
  "introduccion: indica el topico principal. desarrollo: narra los efectos. conclusion: propone alternativas.",
  "introduccion: presenta la situacion global. desarrollo: profundiza en el tema. conclusion: concluye con acciones."
        ]
      },
      {
        text: "Introducción: La lectura diaria mejora la concentración. Desarrollo: Estudios muestran que leer antes de dormir ayuda a reducir el estrés y fortalecer la memoria. Conclusión: Incorporar la lectura en la rutina diaria trae múltiples beneficios.",
        question: "¿Dónde termina el desarrollo y empieza la conclusión?, puedes seguir este ejemplo de respuesta: El desarrollo termina...,concluye con... etc, tambien saltarte el punto final xD, pero No las tildes",
        validAnswers: [
          "El desarrollo termina al mencionar los beneficios, y la conclusión comienza al sugerir incorporar la lectura en la rutina",
          "El desarrollo termina al mencionar los beneficios, y la conclusión comienza al sugerir incorporar la lectura en la rutina",
          "El desarrollo termina al explicar los beneficios, y la conclusión comienza al proponer incorporarla a la rutina",

"Lo que termina el desarrollo es la explicación de los beneficios, y la conclusión empieza con la recomendación de hacerlo parte del día a día",

"Un dato importante es que el desarrollo finaliza al hablar de los beneficios, y la conclusión comienza con la sugerencia de incluir la lectura",

"El desarrollo finaliza al detallar los beneficios de la lectura, y la conclusión empieza al sugerir hacerla parte de la rutina",

"Lo que termina el desarrollo es el análisis de los beneficios de la lectura, y la conclusión empieza al proponerla como hábito diario",

"Un momento clave es cuando el desarrollo explica los efectos, y la conclusión comienza con la recomendación de la lectura diaria",

"El desarrollo finaliza al detallar los beneficios, y la conclusión empieza al sugerir incorporar la lectura al día a día",

"Lo que marca el fin del desarrollo es la explicación de los beneficios, y la conclusión empieza al aconsejar la lectura en la rutina diaria",

"Un cambio ocurre cuando el desarrollo describe los efectos, y la conclusión comienza con la propuesta de incorporar la lectura",

"El desarrollo termina cuando se habla de cómo la lectura ayuda a reducir el estrés, y la conclusión empieza con la sugerencia de integrarla en la rutina",

"Lo que marca el fin del desarrollo es la explicación de los beneficios, y la conclusión comienza con la recomendación de hacerla parte de la rutina",

"Un punto clave es cuando el desarrollo menciona los beneficios de la lectura, y la conclusión comienza al proponerla como hábito diario",

"El desarrollo finaliza con la mención de los beneficios de leer, y la conclusión empieza con la sugerencia de incluir la lectura diaria",

"Lo que termina el desarrollo es la mención de cómo la lectura ayuda a mejorar la concentración, y la conclusión empieza al recomendarla como hábito",

"Un dato importante es que el desarrollo termina al detallar los beneficios, y la conclusión empieza con la propuesta de hacer la lectura diaria",


"El desarrollo finaliza cuando se mencionan los beneficios de la lectura, y la conclusión empieza con la sugerencia de hacerla parte de la rutina",

"El desarrollo termina cuando se habla de los efectos positivos de leer, y la conclusión empieza cuando se recomienda incluir la lectura en la rutina diaria",

"El desarrollo concluye al explicar los beneficios de leer antes de dormir, y la conclusión empieza cuando se aconseja hacerlo parte de la rutina",

"El desarrollo finaliza cuando se mencionan los beneficios de la lectura, y la conclusión comienza con la propuesta de incorporarla a la rutina",

"El desarrollo termina al describir los efectos beneficiosos de leer, y la conclusión empieza con la sugerencia de hacer de la lectura un hábito",

"El desarrollo finaliza cuando se habla de cómo mejora la memoria y reduce el estrés, y la conclusión empieza al sugerir incluirla en la rutina diaria",

"El desarrollo termina cuando se mencionan los beneficios, y la conclusión empieza con la recomendación de incluir la lectura diaria",

"El desarrollo concluye con los beneficios de la lectura, y la conclusión comienza cuando se sugiere integrar la lectura al día a día",

"El desarrollo termina cuando se explica cómo la lectura fortalece la memoria, y la conclusión empieza con la propuesta de incorporar la lectura en la rutina",

"El desarrollo finaliza cuando se describen los efectos de leer antes de dormir, y la conclusión comienza con la recomendación de incluir la lectura en la rutina diaria",

"El desarrollo termina cuando se detallan los beneficios de la lectura, y la conclusión empieza cuando se propone incorporarla a la rutina cotidiana",
          "El desarrollo finaliza con los beneficios, la conclusión inicia con la sugerencia de leer diariamente",
          "El desarrollo concluye con las ventajas, la conclusión empieza con la recomendación de leer",
          "El desarrollo acaba con los efectos positivos, la conclusión arranca con la propuesta de rutina",
          "El desarrollo se cierra con los beneficios, la conclusión se abre con la idea de leer habitualmente",
          "el desarrollo termina al mencionar los beneficios, la conclusion empieza cuando se recomienda leer diariamente",
  "el desarrollo acaba cuando se habla del estres y la memoria, la conclusion inicia al hablar de habitos",
  "el desarrollo finaliza al mostrar los efectos, la conclusion arranca con la propuesta de rutina",
  "el desarrollo concluye al destacar los beneficios, la conclusion empieza con la sugerencia de leer",
  "el desarrollo termina con las ventajas, la conclusion empieza al recomendar leer todos los dias",
  "el desarrollo se cierra al hablar del estres, la conclusion se abre con los beneficios generales",
  "el desarrollo termina con los resultados, la conclusion inicia con la idea de incorporar lectura diaria",
  "el desarrollo concluye con datos sobre la memoria, la conclusion propone incluir la lectura",
  "el desarrollo finaliza al mostrar efectos positivos, la conclusion arranca con la recomendacion",
  "el desarrollo termina tras los beneficios, la conclusion empieza al hablar de la rutina lectora",
  "el desarrollo acaba con el efecto en el estres, la conclusion arranca con una propuesta de cambio",
  "el desarrollo finaliza al explicar como ayuda la lectura, la conclusion empieza al proponer un habito",
  "el desarrollo concluye al mostrar los impactos, la conclusion inicia con la sugerencia de leer seguido",
  "el desarrollo termina con la evidencia cientifica, la conclusion abre con consejos",
  "el desarrollo cierra con resultados positivos, la conclusion arranca con una recomendacion practica",
  "el desarrollo termina con el impacto en la memoria, la conclusion comienza con habitos lectores",
  "el desarrollo finaliza tras mostrar beneficios mentales, la conclusion da una propuesta de accion",
  "el desarrollo concluye con datos del estudio, la conclusion comienza con una sugerencia util",
  "el desarrollo acaba cuando se explican los efectos, la conclusion empieza al recomendar una rutina",
  "el desarrollo termina con beneficios personales, la conclusion propone incluir lectura en la rutina",
  "el desarrollo finaliza al tratar el estres, la conclusion arranca con consejos aplicables",
  "el desarrollo concluye tras describir los efectos, la conclusion sugiere nuevos habitos",
  "el desarrollo se cierra con los efectos positivos, la conclusion plantea acciones concretas",
  "el desarrollo termina con la evidencia de mejoras, la conclusion invita a leer mas",
  "el desarrollo acaba tras mostrar cambios en la memoria, la conclusion propone leer antes de dormir",
  "el desarrollo concluye con beneficios cientificos, la conclusion sugiere lectura cotidiana",
  "el desarrollo cierra con el impacto positivo, la conclusion empieza con una propuesta de rutina diaria",
  "el desarrollo finaliza con efectos comprobados, la conclusion abre con una invitacion a leer",
  "el desarrollo termina al resaltar beneficios, la conclusion propone habitos saludables",
  "el desarrollo concluye al mencionar el efecto en el estres, la conclusion recomienda seguir leyendo",
  "el desarrollo se completa con la informacion sobre el cerebro, la conclusion invita a practicar la lectura diaria",
  "el desarrollo cierra tras mencionar ventajas, la conclusion comienza con la propuesta de habito",
  "el desarrollo termina con los resultados del estudio, la conclusion promueve el uso de lectura diaria",
  "el desarrollo concluye al detallar mejoras mentales, la conclusion inicia con consejos de aplicacion",
  "el desarrollo acaba cuando se ven los efectos, la conclusion propone aplicarlos a la vida diaria",
  "el desarrollo termina con las razones, la conclusion invita a la accion lectora",
  "el desarrollo cierra con datos cientificos, la conclusion da una pauta para la rutina",
  "el desarrollo concluye al mencionar los efectos, la conclusion promueve el habito lector",
  "el desarrollo termina tras ver los beneficios, la conclusion comienza con una aplicacion directa",
  "el desarrollo concluye cuando se presentan beneficios, la conclusion abre con una propuesta concreta",
  "el desarrollo termina con los puntos clave, la conclusion empieza con un llamado a la lectura"
        ]
      }
    ]
  },
  {
    title: "Reconocimiento de sinónimos y antónimos",
    teaching: "Un sinónimo es una palabra con significado similar; un antónimo es una palabra con significado opuesto. Identificar sinónimos y antónimos enriquece el vocabulario y mejora la comprensión lectora.",
    examples: [
      {
        text: "Escribe un sinónimo de brillante y un antónimo de triste.",
        question: "Sinónimo de brillante: resplandeciente. Antónimo de triste: feliz, coloca tu respues de esta forma: Resplandeciente / Feliz, recuerda escribir las respuestas sin errores ortograficos",
        validAnswers: [

          "Luminoso / Alegre",
          "Radiante / Contento",
          "Brilloso / Jovial",
          "Reluciente / Dichoso",
          "Espléndido / Satisfecho",
          "Cintilante / Contento",
  "Fulgurosa / Animado",
  "Centelleante / Eufórico",
  "Claro / Feliz",
  "Deslumbrante / Satisfecho",
  "Lumínico / Alegre",
  "Radioso / Optimista",
  "Refulgente / Gozoso",
  "Fulgente / Entusiasmado",
  "Relumbrante / Exultante",
  "Luminoso / Alegre",
  "Radiante / Contento",
  "Brilloso / Jovial",
  "Reluciente / Dichoso",
  "Espléndido / Satisfecho",
  "Centelleante / Animado",
  "Brillante / Entusiasmado",
  "Claro / Optimista",
  "Resplandor / Eufórico",
  "Vivaz / Sonriente",
  "Chispeante / Animoso",
  "Fulgurosa / Encantado",
  "Luciente / Emocionado",
  "Destellante / Pleno",
  "Centellante / Positivo",
  "Brilloso / Risueño",
  "Lumínico / Contentísimo",
  "Resplandor / Conformado",
  "Destacado / Bienhumorado"
        ]
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
          "Ligero / Mínima",
          "Raudo / Pequeña",
  "Pronto / Chica",
  "Ligero / Menuda",
  "Rápido / Pequeñita",
  "Ágil / Exigua",
  "Velóz / Pequeña",
  "Prontamente / Minúscula",
  "Apresurado / Diminuta",
  "Lesto / Breve",
  "Prestamente / Reducida",
  "Velozmente / Diminuta",
  "Rápidamente / Pequeña",
  "Aceleradamente / Minúscula",
  "Ágilmente / Chica",
  "Presto / Reducida",
  "Ligero / Mínima",
  "Apresuradamente / Cortita",
  "Raudo / Pequeñita",
  "Con rapidez / Breve",
  "Con agilidad / Angosta",
  "Con prisa / Limitada",
  "Ágil / Pequeña",
  "De prisa / Baja",
  "Rápida / Breve",
  "Veloz / Minúscula",
  "Apurado / Chiquita",
  "Rápido / Pequeñita",
  "Exprés / Compacta",
  "Con velocidad / Encogida",
  "Fulgurante / Baja"
        ]
      }
    ]
  },
  {
    title: "Inferencia y deducción: aprender a inferir información no explícita",
    teaching: "La inferencia consiste en deducir información a partir de pistas del texto. No todo se dice de forma directa; a veces debemos \"leer entre líneas\" para entender el mensaje implícito.",
    examples: [
      {
        text: "Laura llegó empapada a clase, con paraguas roto. No dijo nada sobre la lluvia, pero su ropa y cabello mojados lo indican.",
        question: "¿Qué podemos inferir sobre lo que sucedió antes?, recuerda no olvidar las tildes",
        validAnswers: [
          "Que Laura estuvo bajo la lluvia y su paraguas se rompió.",
          "El texto sugiere que Laura se mojó debido a la lluvia y su paraguas no la ayudó.",
          "El fragmento sugiere que Laura no estaba preparada para la lluvia.",

"Lo que se infiere es que Laura no esperaba la lluvia y su paraguas no funcionó.",

"Un posible mensaje es que Laura llegó tarde y empapada por culpa de la lluvia.",

"El texto indica que Laura no estaba lista para la lluvia y eso la sorprendió.",

"Lo que se muestra es que Laura se mojó porque su paraguas no la protegió.",

"Un fragmento que nos muestra que Laura estaba desprevenida para la lluvia.",

"El texto nos hace pensar que Laura no pudo cubrirse bien de la lluvia.",

"Lo que infiere es que Laura llegó empapada debido a que su paraguas se rompió.",

"Un posible mensaje es que Laura no anticipó la lluvia y se mojó completamente.",

"El fragmento nos muestra que Laura estaba muy mojada porque su paraguas no sirvió.",

"Lo que se indica es que Laura se empapó porque no estaba lista para la lluvia.",

"Un detalle es que Laura llegó empapada porque su paraguas no la protegió.",

"El texto sugiere que Laura no pudo evitar mojarse por culpa de la lluvia.",

"Lo que se infiere es que Laura estaba nerviosa por la lluvia y su paraguas roto.",

"Un posible mensaje es que la lluvia la sorprendió y no pudo protegerse.",

"Lo que podemos inferir es que Laura llegó empapada porque su paraguas se rompió.",

"Un dato importante es que Laura no estaba preparada para la lluvia.",

"El fragmento sugiere que Laura no logró protegerse de la lluvia.",

"Lo que se indica es que la lluvia la sorprendió y su paraguas no la cubrió.",

"Un detalle importante es que Laura no comentó nada sobre la lluvia.",

"El texto nos da a entender que Laura se mojó y su paraguas falló.",

"Lo que podemos inferir es que la lluvia la caló hasta los huesos.",

"Un punto clave es que Laura no pudo protegerse de la lluvia por el paraguas roto.",

"El fragmento sugiere que Laura no anticipó la lluvia y se mojó.",

"Lo que se indica es que Laura llegó empapada debido a la lluvia y su paraguas no sirvió.",

"Un detalle importante es que Laura reaccionó rápidamente, pero no pudo evitar mojarse.",

"El texto sugiere que Laura no estaba preparada para la lluvia y se mojó.",

"Lo que podemos inferir es que Laura se mojó por no tener un paraguas adecuado.",

"Un dato clave es que Laura llegó mojada porque el paraguas no cumplió su función.",



"Que Laura probablemente se mojó debido a la lluvia y su paraguas ya no sirvió.",

"Que la lluvia fue fuerte y dañó el paraguas de Laura.",

"Que Laura no pudo protegerse de la lluvia porque su paraguas se rompió.",

"Que Laura se olvidó de su paraguas o no estaba funcionando bien.",

"Que la lluvia era muy intensa y el paraguas de Laura no la cubrió.",

"Que Laura no comentó nada, pero claramente se mojó por la lluvia.",

"Que Laura salió sin paraguas o el suyo falló durante la lluvia.",

"Que la lluvia fue tan fuerte que su paraguas no resistió.",

"Que Laura probablemente tuvo un accidente con su paraguas en medio de la lluvia.",

"Que la lluvia la sorprendió y su paraguas no la protegió.",

"Que Laura llegó tarde por culpa de la lluvia y su paraguas roto.",

"Que Laura intentó protegerse de la lluvia, pero su paraguas no funcionó.",

"Que la lluvia la caló hasta los huesos y el paraguas no resistió.",

"Que Laura estaba muy mojada porque no pudo usar bien su paraguas debido a la lluvia.",
          "Que Laura estuvo bajo la lluvia y su paraguas se rompió.",
          "Laura se mojó por la lluvia porque se le dañó el paraguas.",
          "Se empapó porque el paraguas no funcionó bajo la lluvia.",
          "La lluvia la mojó al romperse su paraguas.",
          "Llovió y el paraguas de Laura se averió.",
          "El paraguas falló y Laura se mojó con la lluvia.",
           "Que Laura estuvo bajo la lluvia y su paraguas se rompió.",
  "Laura se mojó por la lluvia porque se le dañó el paraguas.",
  "Se empapó porque el paraguas no funcionó bajo la lluvia.",
  "La lluvia la mojó al romperse su paraguas.",
  "Llovió y el paraguas de Laura se averió.",
  "El paraguas falló y Laura se mojó con la lluvia.",
  "Estuvo lloviendo y el paraguas de Laura no la protegió.",
  "Laura caminó bajo la lluvia sin buena protección.",
  "Salió con lluvia y su paraguas no sirvió.",
  "Fue sorprendida por la lluvia y su paraguas no resistió.",
  "Estuvo bajo una lluvia fuerte con un paraguas roto.",
  "El clima la sorprendió y acabó empapada.",
  "La lluvia la sorprendió camino a clase.",
  "El paraguas no aguantó la lluvia fuerte.",
  "El viento o la lluvia dañaron su paraguas.",
  "La lluvia la alcanzó antes de entrar a clases.",
  "Iba por la calle cuando se le rompió el paraguas.",
  "Llegó mojada por culpa de la lluvia inesperada.",
  "Salió con paraguas, pero igual se mojó.",
  "El mal clima afectó su llegada a clase.",
  "La lluvia fue tan fuerte que rompió su paraguas.",
  "Estuvo expuesta al agua de lluvia por el paraguas roto.",
  "No se pudo cubrir bien por el mal estado del paraguas.",
  "Se nota que llovía y no tuvo cómo protegerse bien.",
  "Llovió mientras ella iba al colegio, pero el paraguas no ayudó."
        ]
      },
      {
        text: "Al oír el timbre, Marcos guardó rápidamente su cuaderno en la mochila y adoptó una postura seria. La profesora acababa de anunciar la visita sorpresa.",
        question: "¿Qué infieres sobre la actitud de Marcos?",
        validAnswers: [
          "Que estaba nervioso o no preparado para la visita sorpresa.",

"Que Marcos se sorprendió y no estaba listo para la visita.",

"Que Marcos reaccionó rápidamente porque no esperaba la visita.",

"Que Marcos se puso nervioso al oír el timbre y se preparó rápidamente.",

"Que Marcos adoptó una actitud seria porque no estaba preparado para la visita.",

"Que Marcos se sintió inseguro al escuchar el timbre y reaccionó rápidamente.",

"Que Marcos estaba preocupado por la visita sorpresa y por eso se puso serio.",

"Que al oír el timbre, Marcos se sintió presionado por la visita que no esperaba.",

"Que Marcos se sorprendió tanto que intentó ocultar su nerviosismo guardando su cuaderno.",

"Que Marcos no estaba listo para la visita, por eso se mostró serio y guardó su cuaderno rápidamente.",

"Que al oír el timbre, Marcos sintió que debía estar más serio ante la visita.",

"Que Marcos se puso serio porque no estaba preparado para la sorpresa de la profesora.",

"Que Marcos se sintió incómodo con la visita sorpresa y reaccionó guardando sus cosas rápidamente.",

"Que la visita sorpresa lo tomó desprevenido y por eso mostró una actitud seria.",

"Que Marcos guardó su cuaderno y adoptó una postura seria porque se sintió sorprendido y no preparado.",
          "Que estaba nervioso o no preparado para la visita sorpresa.",
          "Estaba inquieto porque no esperaba la visita.",
          "Se puso ansioso por la visita inesperada.",
          "No estaba listo para la inspección sorpresa.",
          "Se sintió preocupado por la visita imprevista.",
          "Estaba intranquilo ante la visita no programada.",
            "Que estaba nervioso o no preparado para la visita sorpresa.",
  "Estaba inquieto porque no esperaba la visita.",
  "Se puso ansioso por la visita inesperada.",
  "No estaba listo para la inspección sorpresa.",
  "Se sintió preocupado por la visita imprevista.",
  "Estaba intranquilo ante la visita no programada.",
  "Parecía tenso al enterarse de la visita.",
  "Cambió su actitud por temor a la sorpresa.",
  "Se puso serio al escuchar lo de la visita.",
  "Intentó parecer más responsable al saber de la visita.",
  "Quiso dar una buena impresión al saber que alguien venía.",
  "Dejó de hacer lo que hacía por miedo a ser visto.",
  "Guardó rápido sus cosas porque no estaba haciendo lo correcto.",
  "El anuncio lo tomó por sorpresa y se puso nervioso.",
  "Mostró incomodidad ante la noticia inesperada.",
  "Se preocupó por lo que pudiera pasar en la visita.",
  "Su actitud cambió porque no se sentía preparado.",
  "Parecía temer que lo descubrieran haciendo algo indebido.",
  "Reaccionó con incomodidad frente al anuncio.",
  "Su cambio de postura muestra que no estaba tranquilo.",
  "Mostró seriedad porque quería evitar problemas.",
  "La noticia lo hizo actuar con más cuidado.",
  "Intentó disimular algo al saber de la visita.",
  "Se alarmó con el anuncio y quiso parecer ordenado.",
  "Tuvo una reacción de nervios por lo inesperado."
        ]
      }
    ]
  },
 {
    title: "Uso de Conectores Lógicos",
    teaching: "Los conectores lógicos son palabras o frases que unen ideas, oraciones o párrafos, dando coherencia y cohesión al texto. Hay conectores de adición (y, además), contraste (pero, sin embargo), causa (porque, debido a), consecuencia (por lo tanto, así que), entre otros.",
    examples: [
      {
        text: "Estudié mucho para el examen, ___ aprobé con buena nota.",
        question: "Completa la oración con un conector de consecuencia.",
        validAnswers: [
          "por lo tanto",
          "por consiguiente",
          "en consecuencia",
          "así que",
          "de modo que",
          "por ende",
           "por lo tanto",
  "por consiguiente",
  "en consecuencia",
  "así que",
  "de modo que",
  "por ende",
  "de manera que",
  "por esta razón",
  "entonces",
  "de ahí que",
  "con lo cual",
  "por tal motivo",
  "de resultas",
  "por eso",
  "de ahí la razón",
  "por dicha razón",
  "por ese motivo",
  "como resultado",
  "a consecuencia de ello",
  "con lo que",
  "de tal forma que",
  "por lo que"
        ]
      },
      {
        text: "Me gusta mucho leer, ___ no tengo tiempo para hacerlo.",
        question: "Completa la oración con un conector de contraste.",
        validAnswers: [
          "pero",
          "sin embargo",
          "no obstante",
          "mas",
          "aunque",
          "pero",
  "sin embargo",
  "no obstante",
  "mas",
  "aunque",
  "a pesar de eso",
  "con todo",
  "aun así",
  "empero",
  "sin embargo de ello",
  "en cambio",
  "al contrario",
  "por el contrario",
  "no por eso",
  "aunque eso sí",
  "sin embargo no obstante",
  "pese a ello",
  "por más que",
  "aunque aún así",
  "no obstante lo anterior"
        ]
      },
      {
        text: "No pude ir a la fiesta ___ estaba enfermo.",
        question: "Completa la oración con un conector de causa.",
        validAnswers: [
          "porque",
          "ya que",
          "debido a que",
          "puesto que",
          "a causa de que",
           "porque",
  "ya que",
  "debido a que",
  "puesto que",
  "a causa de que",
  "como",
  "en vista de que",
  "visto que",
  "dado que",
  "por el hecho de que",
  "considerando que",
  "por cuanto",
  "gracias a que",
  "teniendo en cuenta que",
  "motivo por el cual",
  "pues",
  "por razón de que",
  "en razón de que",
  "con motivo de que",
  "debido a ello"
        ]
      }
    ]
  },
 
    {
    title: "Identificación de Sujeto y Predicado",
    teaching: "En una oración, el Sujeto es la persona, animal o cosa que realiza la acción o de quien se dice algo. El Predicado es la acción que realiza el sujeto y todo lo que se dice de él. El núcleo del sujeto es el sustantivo y el del predicado es el verbo.",
    examples: [
      {
        text: "El perro ladra fuertemente en el jardín.",
        question: "¿Cuál es el sujeto de la oración?",
        validAnswers: [
          "El perro",
          "el perro",
          "El perro",
  "el perro",
  "El perro.",
  "el perro.",
  "Sujeto: el perro",
  "Sujeto: El perro",
  "el sujeto es el perro",
  "el sujeto: el perro",
  "sujeto: el perro",
  "el que ladra es el perro",
  "se habla del perro",
  "de quien se habla: el perro",
  "Sujeto, el perro",
  "Sujeto, El perro",
  "el sujeto es el perro",
  "el sujeto, el perro",
  "sujeto, el perro",
  "el que ladra es el perro",
  "se habla del perro",
  "de quien se habla, el perro"
        ]
      },
      {
        text: "Los niños juegan alegremente en el parque.",
        question: "¿Cuál es el predicado de la oración?",
        validAnswers: [
          "juegan alegremente en el parque",
          "juegan alegremente en el parque.",
          "juegan alegremente en el parque",
  "juegan alegremente en el parque.",
  "Predicado: juegan alegremente en el parque",
  "Predicado: juegan alegremente en el parque.",
  "el predicado es juegan alegremente en el parque",
  "juegan en el parque alegremente",
  "acción: juegan alegremente en el parque",
  "todo lo que se dice del sujeto: juegan alegremente en el parque",
  "lo que hacen: juegan alegremente en el parque",
  "parte verbal: juegan alegremente en el parque",
  "juegan alegremente en el parque",
  "juegan alegremente en el parque.",
  "Predicado, juegan alegremente en el parque",
  "Predicado, juegan alegremente en el parque.",
  "el predicado es juegan alegremente en el parque",
  "juegan en el parque alegremente",
  "acción, juegan alegremente en el parque",
  "todo lo que se dice del sujeto, juegan alegremente en el parque",
  "lo que hacen, juegan alegremente en el parque",
  "parte verbal, juegan alegremente en el parque"
        ]
      },
      {
        text: "Mi hermana mayor estudia medicina en la universidad.",
        question: "¿Cuál es el núcleo del sujeto?",
        validAnswers: [
          "hermana",
          "Hermana",
          "hermana",
  "Hermana",
  "el núcleo es hermana",
  "núcleo: hermana",
  "sustantivo: hermana",
  "palabra principal: hermana",
  "núcleo del sujeto: hermana",
  "la palabra hermana",
  "hermana (porque es el sustantivo)",
  "hermana, porque es de quien se habla",
  "la que hace la acción es hermana",
  "el núcleo es hermana",
  "núcleo, hermana",
  "sustantivo, hermana",
  "palabra principal, hermana",
  "núcleo del sujeto, hermana",
  "la palabra hermana",
  "hermana porque es el sustantivo",
  "hermana, porque es de quien se habla",
  "la que hace la acción es hermana"
  
        ]
      }
    ]
  },
  {
    title: "Tipos de Oraciones según la Intención del Hablante",
    teaching: "Las oraciones pueden clasificarse según lo que el hablante quiere expresar: Declarativas (afirman o niegan algo), Interrogativas (hacen preguntas), Exclamativas (expresan emoción), Imperativas (dan órdenes o consejos), Dubitativas (expresan duda) y Desiderativas (expresan deseo).",
    examples: [
      {
        text: "Hoy es un día soleado y perfecto para salir.",
        question: "¿Qué tipo de oración es?",
        validAnswers: [
          "Declarativa",
          "Afirmativa",
          "declarativa",
          "afirmativa",
           "Declarativa",
  "Afirmativa",
  "declarativa",
  "afirmativa",
  "oración afirmativa",
  "oración declarativa",
  "es una oración afirmativa",
  "es una oración declarativa",
  "se está afirmando algo",
  "afirma algo",
  "se da una información",
  "es una afirmación",
  "expresa una idea",
  "dice algo",
  "tipo afirmativo",
  "tipo declarativo",
  "da un mensaje",
  "se dice algo con certeza",
  "una frase afirmativa",
  "una frase declarativa",
  "Declarativa",
  "Afirmativa",
  "declarativa",
  "afirmativa",
  "oracion afirmativa",
  "oracion declarativa",
  "es una oracion afirmativa",
  "es una oracion declarativa",
  "se esta afirmando algo",
  "afirma algo",
  "se da una informacion",
  "es una afirmacion",
  "expresa una idea",
  "dice algo",
  "tipo afirmativo",
  "tipo declarativo",
  "da un mensaje",
  "se dice algo con certeza",
  "una frase afirmativa",
  "una frase declarativa"

        ]
      },
      {
        text: "¿Has terminado tu tarea para mañana?",
        question: "¿Qué tipo de oración es?",
        validAnswers: [
          "Interrogativa",
          "De pregunta",
          "interrogativa",
          "de pregunta",
          "Interrogativa",
  "interrogativa",
  "De pregunta",
  "de pregunta",
  "es una pregunta",
  "tipo interrogativo",
  "tipo de pregunta",
  "oración interrogativa",
  "oración de pregunta",
  "se está preguntando algo",
  "se formula una pregunta",
  "es una frase interrogativa",
  "se busca una respuesta",
  "pregunta directa",
  "plantea una duda",
  "quiere saber algo",
  "pregunta si hizo algo",
  "están preguntando",
  "se hace una pregunta",
  "se pide información",
  "se pide informacion",
   "Interrogativa",
  "interrogativa",
  "De pregunta",
  "de pregunta",
  "es una pregunta",
  "tipo interrogativo",
  "tipo de pregunta",
  "oracion interrogativa",
  "oracion de pregunta",
  "se esta preguntando algo",
  "se formula una pregunta",
  "es una frase interrogativa",
  "se busca una respuesta",
  "pregunta directa",
  "plantea una duda",
  "quiere saber algo",
  "pregunta si hizo algo",
  "estan preguntando",
  "se hace una pregunta"
        ]
      },
      {
        text: "¡Qué sorpresa tan agradable verte aquí!",
        question: "¿Qué tipo de oración es?",
        validAnswers: [
          "Exclamativa",
          "De exclamación",
          "exclamativa",
          "de exclamación",
           "Exclamativa",
  "exclamativa",
  "De exclamación",
  "de exclamación",
  "es una exclamación",
  "tipo exclamativo",
  "expresa emoción",
  "se expresa alegría",
  "oración exclamativa",
  "frase exclamativa",
  "transmite sorpresa",
  "transmite emoción",
  "es una expresión fuerte",
  "se dice con emoción",
  "emoción al ver a alguien",
  "habla con entusiasmo",
  "se exclama algo",
  "se expresa una reacción",
  "es un sentimiento expresado",
  "se muestra alegría",
  "Exclamativa",
  "exclamativa",
  "De exclamacion",
  "de exclamacion",
  "es una exclamacion",
  "tipo exclamativo",
  "expresa emocion",
  "se expresa alegria",
  "oracion exclamativa",
  "frase exclamativa",
  "transmite sorpresa",
  "transmite emocion",
  "es una expresion fuerte",
  "se dice con emocion",
  "emocion al ver a alguien",
  "habla con entusiasmo",
  "se exclama algo",
  "se expresa una reaccion",
  "es un sentimiento expresado",
  "se muestra alegria"
        ]
      }
    ]
  },
   
  {
    title: "Identificación de temas centrales y elementos literarios (personajes, conflictos, narradores)",
    teaching: "Al leer un texto literario, identifica el tema central (mensaje principal), los personajes (protagonista, antagonista), el conflicto (lo que impulsa la historia) y el narrador (primera persona, tercera persona, omnisciente).",
    examples: [
      {
        text: "Fragmento: \"María sintió el corazón latir con fuerza cuando se acercó a la puerta. El silencio era abrumador. Abrió y encontró una carta que cambiaba su destino.\"",
        question: "¿Quién es protagonista, cuál es el conflicto y qué tipo de narrador se usa?, recuerda que el nombre María lleva tilde, escribe tu respuesta siguiendo este modelo: Protagonista: Pepito. Conflicto: Se cayo de su bicicleta. Narrador: \"Tendras que Inferirlo por tu cuenta\"",
        validAnswers: [
          "Protagonista: María. Conflicto: Descubrir el contenido de la carta misteriosa. Narrador: Tercera persona limitada, describe solo lo que siente María.",
          "Protagonista: María. Conflicto: Descubrir el contenido de la carta. Narrador: Tercera persona limitada, describe solo lo que siente María.",
          "Protagonista: María. Conflicto: Descubre el contenido de la carta misteriosa. Narrador: Tercera persona limitada, describe solo lo que siente María.",

"Protagonista: María. Conflicto: El misterio de la carta. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: Desvelar lo que está en la carta. Narrador: Tercera persona limitada.",

"Protagonista: María. Conflicto: El destino de la carta misteriosa. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: El miedo a lo que puede descubrir. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: Lo que puede cambiar en su vida al leer la carta. Narrador: Tercera persona limitada.",

"Protagonista: María. Conflicto: El impacto de la carta en su vida. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: El temor a lo desconocido de la carta. Narrador: Tercera persona limitada.",

"Protagonista: María. Conflicto: Lo que la carta revelará. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: El impacto emocional de la carta. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: La incertidumbre sobre el contenido de la carta. Narrador: Tercera persona limitada.",

"Protagonista: María. Conflicto: El miedo a lo que cambiará su vida. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: La ansiedad de abrir la carta. Narrador: Tercera persona limitada.",

"Protagonista: María. Conflicto: El enfrentamiento con su destino a través de la carta. Narrador: Tercera persona.",

"Protagonista: María. Conflicto: El miedo a lo que descubrirá en la carta. Narrador: Tercera persona.",
          "Protagonista: María. Conflicto: El misterio de la carta. Narrador: Tercera persona.",
          "Personaje principal: María. Problema: La carta desconocida. Narrador: Externa limitada.",
          "Protagonista: María. Conflicto: La carta enigmática. Narrador: Tercera persona que conoce los sentimientos de María.",
          "Héroe: María. Tensión: El contenido misterioso. Narrador: Tercera persona.",
           "Protagonista: María. Conflicto: El misterio de la carta. Narrador: Tercera persona limitada.",
  "Protagonista: María. Conflicto: Descubrir lo que dice la carta. Narrador: Tercera persona.",
  "Protagonista: María. Problema: La carta que cambia su vida. Narrador: Externo.",
  "Personaje principal: María. Conflicto: El contenido inesperado de la carta. Narrador: Externo limitado.",
  "Protagonista: María. Conflicto: El destino oculto en una carta. Narrador: Tercera persona omnisciente parcial.",
  "Héroe: María. Conflicto: Qué contiene la carta. Narrador: Narrador externo con acceso a emociones.",
  "María es el personaje principal. Conflicto: Entender el mensaje de la carta. Narrador: Tercera persona subjetiva.",
  "Protagonista: María. Dilema: El impacto de una carta desconocida. Narrador: Externo que conoce sus emociones.",
  "Protagonista: María. Tensión: Qué hará al leer la carta. Narrador: Tercera persona desde su perspectiva.",
  "Personaje central: María. Problema: La carta misteriosa. Narrador: Tercera persona que narra sus emociones.",
  "María es el foco del texto. Conflicto: El contenido revelador de una carta. Narrador: Tercera persona.",
  "Protagonista: María. Conflicto: Lo que se revela en la carta. Narrador: Narrador externo limitado.",
  "Protagonista: María. Conflicto: Qué cambia su destino. Narrador: Narrador en tercera persona.",
  "Personaje principal: María. Conflicto: Carta inesperada. Narrador: Tercera persona limitada.",
  "Protagonista: María. Problema: Se enfrenta a un cambio por una carta. Narrador: Externo parcial.",
  "Protagonista: María. Conflicto: El giro que causa una carta. Narrador: Tercera con punto de vista cercano.",
  "Protagonista: María. Conflicto: Su reacción al leer la carta. Narrador: Tercera persona subjetiva.",
  "María es la protagonista. Conflicto: Un misterio que llega por escrito. Narrador: Externo limitado.",
  "Protagonista: María. Dilema: Una carta cambia su camino. Narrador: Tercera persona centrada en ella.",
  "Personaje central: María. Conflicto: Se revela algo oculto. Narrador: Tercera persona cercana.",
  "Protagonista: María. Problema: Lo que contiene la carta. Narrador: Externo con enfoque en ella.",
  "Protagonista: María. Conflicto: Misterio no anunciado. Narrador: Tercera persona limitada.",
  "Protagonista: María. Tensión: Qué cambia con la carta. Narrador: Observador con acceso a emociones.",
  "María es quien vive el conflicto. Problema: Qué contiene el mensaje. Narrador: Externo cercano.",
  "Protagonista: María. Conflicto: La carta inesperada. Narrador: Tercera persona con enfoque emocional.",
  "Personaje principal: María. Conflicto: Una carta transforma todo. Narrador: Tercera persona parcial.",
  "Protagonista: María. Problema: El mensaje secreto. Narrador: Tercera persona focalizada.",
  "Personaje principal: María. Conflicto: Se entera de algo fuerte. Narrador: Narrador limitado externo.",
  "Protagonista: María. Conflicto: Enfrenta algo desconocido. Narrador: Externo parcial.",
  "María: Protagonista. Conflicto: Una carta que impacta. Narrador: Tercera persona que siente con ella.",
  "Protagonista: María. Conflicto: Saber lo que hay en la carta. Narrador: Tercera persona emocional.",
  "Protagonista: María. Conflicto: Sorpresa que cambia su rumbo. Narrador: Narrador externo desde su punto de vista.",
  "Protagonista: María. Problema: Qué cambia con la carta. Narrador: Externo que narra emociones.",
  "Protagonista: María. Conflicto: Reacción frente a una carta. Narrador: Tercera persona.",
  "Personaje principal: María. Conflicto: Algo cambia con esa carta. Narrador: Tercera persona cercana.",
  "Protagonista: María. Conflicto: Conocer su destino. Narrador: Tercera persona.",
  "Protagonista: María. Conflicto: Misterio que se revela. Narrador: Narrador parcial.",
  "Protagonista: María. Problema: Una noticia que impacta. Narrador: Observador subjetivo.",
  "Personaje principal: María. Problema: Descubrir un secreto. Narrador: Tercera persona cercana.",
  "Protagonista: María. Conflicto: Enfrenta un giro en su vida. Narrador: Externo focalizado.",
  "Protagonista: María. Conflicto: Lo que pasa después de abrir la carta. Narrador: Tercera persona parcial.",
  "Personaje principal: María. Problema: Lo que representa la carta. Narrador: Tercera persona centrada en ella.",
  "Protagonista: María. Conflicto: Descubre algo inesperado. Narrador: Narrador externo limitado.",
  "Protagonista: María. Problema: Lo que siente al abrir la carta. Narrador: Tercera persona que observa emociones.",
  "Protagonista: María. Conflicto: Su vida cambia por algo escrito. Narrador: Tercera persona subjetiva.",
  "Personaje principal: María. Conflicto: Algo oculto en la carta. Narrador: Externo que sigue su experiencia.",
  "Protagonista: María. Problema: Qué dice la carta. Narrador: Tercera persona que sabe lo que siente.",
  "María es el centro. Conflicto: Un mensaje inesperado. Narrador: Narrador externo con enfoque emocional.",
  "Protagonista: María. Conflicto: Qué pasa con la carta. Narrador: Tercera limitada.",
  "María es el foco del relato. Problema: Lo que oculta la carta. Narrador: Observador con emociones."
        ]
      },
      {
        text: "Fragmento de cuento: \"Yo siempre supe que algo extraño ocurría en la casa vieja. Nadie más lo notaba, pero yo escuchaba susurros en los pasillos.\"",
        question: "¿Qué tipo de narrador se utiliza y cuál podría ser el tema central?, escribe tu respuesta como este ejemplo: Narrador: Yo. Tema: Miedo a lo desconocido.",
        validAnswers: [
          "Narrador: Primera persona. Tema central: Lo sobrenatural o el miedo a lo desconocido.",
          "Narrador: Yo. Tema: Lo paranormal o el temor a lo misterioso.",
          "Narrador: Primera persona. Tema: Lo extraño o el miedo.",
          "Narrador: Protagonista. Tema: Fenómenos sobrenaturales o terror.",
          "Narrador: Interno. Tema: Lo inexplicable o la inquietud.",
          "Narrador: Personaje. Tema: Misterio o suspenso.",
          "Narrador: Primera persona. Tema central: Lo sobrenatural.",
  "Narrador: Yo. Tema: Miedo a lo no conocido.",
  "Narrador: Protagonista. Tema: El misterio de la casa.",
  "Narrador: Interno. Tema: Lo inexplicable.",
  "Narrador: Personaje. Tema: Terror o suspenso.",
  "Narrador: Primera persona. Tema: Lo paranormal.",
  "Narrador: Yo. Tema: La inquietud de lo oculto.",
  "Narrador: Personaje principal. Tema: Lo extraño y misterioso.",
  "Narrador: Interno. Tema: Sospechas de algo raro.",
  "Narrador: Protagonista. Tema: La sospecha de sucesos ocultos.",
  "Narrador: Testigo. Tema: El miedo a lo invisible.",
  "Narrador: Primera persona. Tema: Escuchar cosas inexplicables.",
  "Narrador: Yo. Tema: La sensación de que algo pasa.",
  "Narrador: Interno. Tema: El ambiente extraño en la casa.",
  "Narrador: Personaje. Tema: Lo que no se puede explicar.",
  "Narrador: Protagonista. Tema: Presencias en la casa vieja.",
  "Narrador: Primera persona. Tema: Susto o presencia sobrenatural.",
  "Narrador: Yo. Tema: Percepción personal del terror.",
  "Narrador: Interno. Tema: El miedo de estar solo.",
  "Narrador: Protagonista. Tema: Sospechas paranormales.",
  "Narrador: Yo. Tema: El misterio de los pasillos.",
  "Narrador: Testigo. Tema: Ruidos en la oscuridad.",
  "Narrador: Primera persona. Tema: Sentir que algo no está bien.",
  "Narrador: Interno. Tema: Presencias invisibles.",
  "Narrador: Personaje. Tema: El miedo en la casa vieja.",
  "Narrador: Yo. Tema: Algo raro está pasando.",
  "Narrador: Primera persona. Tema: Sospechas que nadie más nota.",
  "Narrador: Protagonista. Tema: El temor a lo que se escucha.",
  "Narrador: Interno. Tema: Lo que ocurre en secreto.",
  "Narrador: Yo. Tema: Una casa con secretos.",
  "Narrador: Primera persona. Tema: Lo que no se puede ver.",
  "Narrador: Protagonista. Tema: Sentimientos de miedo.",
  "Narrador: Yo. Tema: Sospechas sin pruebas.",
  "Narrador: Interno. Tema: Lo oculto en la casa.",
  "Narrador: Personaje. Tema: Ruidos que no tienen explicación.",
  "Narrador: Yo. Tema: Lo que se percibe en silencio.",
  "Narrador: Testigo. Tema: El miedo dentro del hogar.",
  "Narrador: Protagonista. Tema: Lo raro que solo él nota.",
  "Narrador: Interno. Tema: Algo extraño que solo él siente.",
  "Narrador: Yo. Tema: Misterio entre pasillos.",
  "Narrador: Primera persona. Tema: Lo que nadie más oye.",
  "Narrador: Personaje. Tema: El miedo solitario.",
  "Narrador: Yo. Tema: Algo vive en la casa.",
  "Narrador: Interno. Tema: El terror desde la experiencia personal.",
  "Narrador: Yo. Tema: Sentir que algo lo observa.",
  "Narrador: Primera persona. Tema: Vivir con miedo.",
  "Narrador: Protagonista. Tema: Las voces que nadie más escucha.",
  "Narrador: Yo. Tema: La incertidumbre de lo que pasa.",
  "Narrador: Testigo. Tema: Siente que la casa no está vacía.",
  "Narrador: Interno. Tema: El temor constante.",
  "Narrador: Personaje. Tema: Algo lo sigue en la casa."
        ]
      }
    ]
  },
  {
    title: "Uso de Signos de Puntuación Básicos",
    teaching: "Los signos de puntuación nos ayudan a organizar las ideas y dar sentido a lo que escribimos. La coma (,) indica una pausa breve; el punto (.) marca el final de una oración; y los signos de interrogación (¿?) y exclamación (¡!) se usan para preguntas y expresiones de emoción.",
    examples: [
      {
        text: "Compré pan leche y huevos",
        question: "Añade la coma donde sea necesario.",
        validAnswers: [
          "Compré pan, leche y huevos",
          "Compré pan, leche, y huevos",
           "compre pan, leche y huevos",
  "compre pan, leche, y huevos",
   "compre pan, leche y huevos.",
  "Compré pan, leche y huevos.",
  "compre pan, leche y huevos ",
  "compre pan , leche y huevos"
        ]
      },
      {
        text: "El perro corrió por el parque luego regresó a casa",
        question: "Añade el punto donde sea necesario.",
        validAnswers: [
          "El perro corrió por el parque. Luego regresó a casa.",
          "El perro corrió por el parque. Luego regresó a casa",
          "El perro corrió por el parque. Luego regresó a casa.",
  "El perro corrió por el parque. Luego regresó a casa",
  "el perro corrió por el parque. luego regresó a casa",
  "el perro corrio por el parque. luego regreso a casa",
  "el perro corrió por el parque. luego regresó a casa.",
   "el perro corrio por el parque. luego regreso a casa"
        ]
      },
      {
        text: "Qué hora es",
        question: "Añade los signos de interrogación.",
        validAnswers: [
          "¿Qué hora es?",
          "¿Que hora es?",
           "¿Qué hora es?",
  "¿Que hora es?",
  "¿qué hora es?",
  "¿que hora es?",
        ]
      },
      {
        text: "Qué alegría verte",
        question: "Añade los signos de exclamación.",
        validAnswers: [
          "¡Qué alegría verte!",
          "¡Que alegría verte!",
           "¡Qué alegría verte!",
  "¡Que alegría verte!",
  "¡qué alegría verte!",
  "¡que alegria verte!",
  "¡que alegría verte!",
  "¡que alegria verte !"
        ]
      }
    ]
  },
];

// FUNCIÓN DE EVALUACIÓN MEJORADA (ESTRICTA)
// NOTA: El synonymsDictionary ha sido ELIMINADO completamente, ya no es necesario.
function evaluateAnswer(userAnswer, exampleData) {
  if (!userAnswer || !userAnswer.trim()) {
    return {
      isCorrect: false,
      score: 0,
      feedback: "Por favor, escribe una respuesta."
    };
  }

  const userAnswerLower = userAnswer.toLowerCase().trim();

  // Validación de longitud mínima (12 caracteres, según tu preferencia)
  // Esta validación se aplica a todas las preguntas que NO son de evaluación manual (minKeyWords === 0).
  // Si exampleData.minKeyWords no existe o es 0, esta validación no se aplica.
  // Para las nuevas lecciones, minKeyWords no está definido, por lo que se asume 0 y no aplica esta validación.
  // Sin embargo, para las lecciones que SÍ tienen minKeyWords definido (las antiguas que conservamos),
  // esta validación de longitud mínima sí se aplica.
  if (exampleData.minKeyWords !== 0 && userAnswerLower.length < 5) {
      return {
          isCorrect: false,
          score: 0,
          feedback: "Tu respuesta es demasiado corta. Por favor, sé más específico y elabora tu idea (mínimo 5 o 12 caracteres)."
      };
  }

  // Manejo de casos de evaluación manual (donde minKeyWords es 0)
  // Estas preguntas no se evalúan automáticamente; el feedback indica que requieren revisión manual.
  // NOTA: Las nuevas lecciones no tienen minKeyWords, por lo que esta condición no se activará para ellas.
  // Solo para las lecciones de redacción manual que se conservaron (si las hubiera).
  if (exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un cuento con inicio, nudo y desenlace.") ||
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
      exampleData.validAnswers.includes("La evaluación para este tipo de respuesta es manual. Se espera un informe con la estructura y datos solicitados.")
  ) {
    return {
      isCorrect: false, // Por defecto es false, ya que requiere revisión manual
      score: 0,
      feedback: exampleData.validAnswers[0] + " Esta respuesta requiere una revisión manual."
    };
  }

  // ÚNICO MÉTODO DE EVALUACIÓN AUTOMÁTICA: Coincidencia exacta con validAnswers
  // La respuesta del usuario debe ser EXACTAMENTE igual a una de las respuestas válidas predefinidas.
  const exactMatch = exampleData.validAnswers.some(validAnswer =>
    userAnswerLower === validAnswer.toLowerCase().trim()
  );

  if (exactMatch) {
    return {
      isCorrect: true,
      score: 100,
      feedback: "¡Excelente! Respuesta perfecta."
    };
  } else {
    // Si no hay coincidencia exacta, la respuesta es incorrecta.
    return {
      isCorrect: false,
      score: 0,
      feedback: "Tu respuesta no coincide con las opciones correctas. Inténtalo de nuevo."
    };
  }
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
      { text: "b) 15 cm", correct: false },
      { text: "c) 10 cm", correct: false },
      { text: "d) 12 cm", correct: false }
    ],
    explanation: "Aplicando el Teorema de Pitágoras: $5^2 + 12^2 = c^2 \\Rightarrow 25 + 144 = c^2 \\Rightarrow 169 = c^2 \\Rightarrow c = \\sqrt{169} = 13$ cm."
  },
  {
    title: "Regla de Tres Simple Inversa", // CAMBIADO DE "Directa" a "Inversa"
    subject: "aritmetica",
    teaching: "La regla de tres simple inversa se utiliza cuando dos magnitudes son inversamente proporcionales. Es decir, si una aumenta, la otra disminuye en la misma proporción, y viceversa. Se resuelve multiplicando en línea recta y dividiendo.",
    solution: "Ejemplo: Si 3 obreros tardan 8 horas en construir una pared, ¿cuántas horas tardarán 6 obreros? (3 obreros -> 8 horas, 6 obreros -> x horas). $x = (3 \\times 8) \\div 6 = 24 \\div 6 = 4$. Tardarán 4 horas.",
    youtubeLinks: [
      "https://www.youtube.com/watch?v=uQO_oBKqypQ", // Matemáticas profe Alex (incluye directa e inversa)
      "https://www.youtube.com/watch?v=Xphb-tzJj24"  // julioprofe (directa, pero el ejemplo lo hemos hecho inverso)
    ],
    question: "Si 4 pintores tardan 6 días en pintar una casa, ¿cuántos días tardarán 8 pintores en pintar la misma casa?",
    options: [
      { text: "a) 12 días", correct: false },
      { text: "b) 3 días", correct: true },
      { text: "c) 6 días", correct: false },
      { text: "d) 4 días", correct: false }
    ],
    explanation: "Esta es una regla de tres simple inversa. Si el número de pintores se duplica (de 4 a 8), el tiempo se reduce a la mitad (6 / 2 = 3 días)."
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
      { text: "a) 144 cm³", correct: false },
      { text: "b) 60 cm³", correct: false },
      { text: "c) 240 cm³", correct: true },
      { text: "d) 120 cm³", correct: false }
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

 
 // En YupiApp, busca este useEffect:

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

}, []); // Dependencias vacías para que se ejecute solo al montar el component

const saveProgress = useCallback((newProgress) => {
  setUserProgress(newProgress);
  localStorage.setItem('yupi-progress', JSON.stringify(newProgress));
}, [setUserProgress]); // <-- `setUserProgress` es la dependencia aquí.

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

    // ¡¡¡CORRECCIÓN CLAVE AQUÍ: CAMBIAR 'completedCompletedLessons' a 'completedLessons'!!!
    if (!newProgress[subject].completedLessons.includes(currentLessonIndex)) {
      newProgress[subject].completedLessons.push(currentLessonIndex); // <-- ¡CORREGIDO!
    }
    // El resto de la lógica para avanzar a la siguiente lección
    if (subject === 'comunicacion' && currentLessonIndex + 1 < comunicacionLessonsImproved.length) {
      newProgress[subject].currentLesson = currentLessonIndex + 1;
    }
    saveProgress(newProgress);
    return newProgress;
  });
  setShowAnimation(true);
  setTimeout(() => setShowAnimation(false), 3000);
}, [comunicacionLessonsImproved.length, setShowAnimation, saveProgress]);


 

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
  onClick={() => setCurrentSection('psychology')} // Cambiado a 'psychology' para que coincida con la condición de renderizado
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
  setShowAnimation,
  showCustomModal,
  matematicasLessons, handleMathAnswer,
  setCurrentSection,
  saveProgress, // <-- ¡AQUÍ VA LA COMA!
  isMathJaxReady
}) => {
  const contentRef = useRef(null); // Referencia para el contenedor donde se renderizará MathJax
const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };
  
  // useEffect para renderizar MathJax cuando el contenido de la lección o el paso cambien
  // Se asegura de que MathJax procese el DOM después de que React lo haya actualizado.
  useEffect(() => {
 
    if (isMathJaxReady && window.MathJax && contentRef.current) {
      // Limpiar el contenido anterior para evitar duplicados o errores de renderizado
      window.MathJax.typesetClear([contentRef.current]);
      // Renderizar el nuevo contenido.
      window.MathJax.typesetPromise([contentRef.current]).catch(err => console.error("MathJax rendering error:", err));
    }
  }, [selectedMathLesson, mathStep, isMathJaxReady]);


  if (!isMathJaxReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-6 font-inter text-white text-xl">
        Cargando módulo de matemáticas...
      </div>
    );
  }
  // ESTE ES EL ÚNICO BLOQUE 'if (selectedMathLesson)' QUE DEBE EXISTIR AQUÍ
  if (selectedMathLesson) {
    const lesson = selectedMathLesson;
    if (mathStep === 'teaching') {
      return (
        // El contentRef ahora envuelve todo el contenido dinámico de esta sección
        <div ref={contentRef} className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 p-6 font-inter">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setSelectedMathLesson(null)} // Volver a la lista de lecciones
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-label="Volver a la selección de materias"
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
              {/* Contenido de la teoría con MathJax */}
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-5" dangerouslySetInnerHTML={{ __html: lesson.teaching }}></p>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-2">Ejemplo resuelto:</h3>
                {/* Contenido del ejemplo con MathJax */}
                <p className="text-gray-700 text-sm whitespace-pre-line" dangerouslySetInnerHTML={{ __html: lesson.solution }}></p>
              </div>
            </div>
            {/* Botón para ir al video explicativo */}
            <button
              onClick={() => setMathStep('video')}
              className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 mt-6"
            >
              Ver video explicativo →
            </button>
          </div>
        </div>
      );
    }
    if (mathStep === 'video') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-6 font-inter">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setMathStep('teaching')} // Volver a la teoría
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-label="Volver a la teoría"
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
                {/* Lógica para seleccionar el video: 
                    Si hay más de un video Y ya hubo un intento fallido (mathAttempts > 0), 
                    usa el segundo video (índice 1). De lo contrario, usa el primer video (índice 0). */}
                {lesson.youtubeLinks && lesson.youtubeLinks.length > 0 && (
                  <a
                    href={lesson.youtubeLinks[mathAttempts > 0 && lesson.youtubeLinks.length > 1 ? 1 : 0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm"
                  >
                    <span className="mr-2">🎬</span>
                    Ver en YouTube
                  </a>
                )}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Consejo:</strong> Tómate tu tiempo para ver el video completo. Puedes pausarlo y repetir las partes que necesites.
                </p>
              </div>
            </div>
            {/* Botón para ir a la práctica */}
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
        // El contentRef ahora envuelve todo el contenido dinámico de esta sección
        <div ref={contentRef} className="min-h-screen bg-gradient-to-br from-orange-500 to-red-500 p-6 font-inter">
          <div className="max-w-md mx-auto pt-10">
            <div className="flex items-center mb-7">
              <button
                onClick={() => setMathStep('video')} // Volver al video
                className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-label="Volver al video"
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
              {/* Contenedor para la pregunta con MathJax */}
              <div className="bg-gray-50 p-4 rounded-lg mb-5 border border-gray-200">
                <p className="text-gray-700 font-medium text-lg" dangerouslySetInnerHTML={{ __html: lesson.question }}></p>
              </div>
              <div className="space-y-3">
                {lesson.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {/* Renderizar option.text con MathJax */}
                    <span className="font-medium text-gray-800" dangerouslySetInnerHTML={{ __html: option.text }}></span>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                if (selectedAnswer) {
                  const result = handleMathAnswer(selectedAnswer, lesson);
                  if (result.isCorrect) {
                    const newProgress = { ...userProgress };
                    const currentLessonIndex = matematicasLessons.findIndex(l => l.title === lesson.title);

                    if (!newProgress.matematicas.completedLessons.includes(currentLessonIndex)) {
                      newProgress.matematicas.completedLessons.push(currentLessonIndex);
                    }

                    // Avanzar a la siguiente lección solo si no es la última
                    if (currentLessonIndex + 1 < matematicasLessons.length) {
                      newProgress.matematicas.currentLesson = currentLessonIndex + 1;
                    }

                    setUserProgress(newProgress);
                    saveProgress(newProgress); // Guardar el progreso actualizado
                    setShowAnimation(true);
                    setTimeout(() => setShowAnimation(false), 3000);

                    // Volver a la lista de lecciones para que el usuario vea el progreso
                    setSelectedMathLesson(null);
                    setMathStep('teaching'); // Resetear el paso para la próxima vez que entre
                    setMathAttempts(0); // Resetear intentos al acertar
                    setSelectedAnswer(null);
                  } else {
                    setMathAttempts(prev => prev + 1); // Incrementar intentos ANTES de mostrar el modal
                    let feedbackMessage = `Respuesta incorrecta. ${result.explanation}\n\n`;
                    // Si hay un segundo video disponible Y es el primer intento fallido
                    if (lesson.youtubeLinks && lesson.youtubeLinks.length > 1 && mathAttempts === 0) {
                      feedbackMessage += `Te recomendamos ver el segundo video explicativo para un enfoque diferente.`;
                    } else {
                      feedbackMessage += `La respuesta correcta es: ${result.correctAnswer}\n\nTe recomendamos repasar la explicación y el video.`;
                    }

                    showCustomModal(feedbackMessage, "error");

                    // Volver al paso de video para que pueda ver el video nuevamente o el segundo video
                    setMathStep('video');
                    setSelectedAnswer(null);
                  }
                } else {
                  showCustomModal('Por favor, selecciona una respuesta', "warning");
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
  // Vista principal de matemáticas (selección de lección)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-500 p-6 font-inter">
      <div className="max-w-md mx-auto pt-10">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentSection('home')}
            className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="Volver a la página de inicio"
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
                    setMathAttempts(0); // Asegurarse de que los intentos se reseteen al iniciar una lección
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
};




  const PsychologyPage = ({ psychologyModule, setPsychologyModule, showCustomModal, journalEntries, setJournalEntries, stressEvents, setStressEvents, relaxActivities, setRelaxActivities, showActivityOptionsModal, setShowActivityOptionsModal, selectedActivityForOptions, setSelectedActivityForOptions }) => {

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
                  <p className="text-gray-700 mb-5">¿Cómo podemos replantear este pensamiento de manera más equilibrada?, A veces, es necesario que aprendamos a afrontar las dificultades por nosotros mismos y a encontrar las respuestas dentro de nosotros, desarrollando nuestra capacidad de resiliencia y autodependencia</p>
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



  const fruitTypes = useMemo(() => [
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
], []);


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
    saveProgress={saveProgress}
  />
 ) : currentSection === 'matematicas' ? (
     // Condición para mostrar MathematicsPage o un mensaje de carga
     // isMathJaxReady se usa aquí para satisfacer a ESLint
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
       setShowAnimation={setShowAnimation}
       showCustomModal={showCustomModal}
       matematicasLessons={matematicasLessons}
       handleMathAnswer={handleMathAnswer}
       setCurrentSection={setCurrentSection}
       saveProgress={saveProgress}
       isMathJaxReady={isMathJaxReady} // Pasamos la prop
     />

     ) : (currentSection === 'psychology' || currentSection === 'psychologyModule') ? (
  <PsychologyPage 
    psychologyModule={psychologyModule} // <-- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ
    setPsychologyModule={setPsychologyModule} // <-- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ
    showCustomModal={showCustomModal}
    journalEntries={journalEntries}
    setJournalEntries={saveJournalEntries}
    stressEvents={stressEvents}
    setStressEvents={saveStressEvents}
    relaxActivities={relaxActivities}
    setRelaxActivities={saveRelaxActivities}
    showActivityOptionsModal={showActivityOptionsModal}
    setShowActivityOptionsModal={setShowActivityOptionsModal}
    selectedActivityForOptions={selectedActivityForOptions}
    setSelectedActivityForOptions={setSelectedActivityForOptions}
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




