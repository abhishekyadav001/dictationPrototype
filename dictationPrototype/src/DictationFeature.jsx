import React, { useState, useEffect, useRef } from "react";

const synonymMap = {
  "hon'ble": "hon'ble",
  "hon.": "hon'ble",
  honourable: "hon'ble",
  capitalize: "capitalize",
  capitalise: "capitalize",
  realize: "realize",
  realise: "realize",
  percent: "per cent",
  "per cent": "percent",
  "Mr.": "Mister",
  Mister: "Mr.",
  Number: "No.",
  "No.": "Number",
  "no.": "number",
  number: "no.",
  defense: "defence",
  defence: "defense",
  license: "licence",
  licence: "license",
  practices: "practises",
  practises: "practices",
  enrollment: "enrolment",
  enrolment: "enrollment",
  organization: "organisation",
  organisation: "organization",
  authorize: "authorise",
  authorise: "authorize",
  summarize: "summarise",
  summarise: "summarize",
  analyze: "analyse",
  analyse: "analyze",
  recognize: "recognize",
  recognise: "recognize",
  apologize: "apologize",
  apologise: "apologize",
  organize: "organize",
  organise: "organize",
  specialize: "specialize",
  specialise: "specialize",
  socialize: "socialize",
  socialise: "socialize",
  paralyze: "paralyze",
  paralyse: "paralyze",
  memorize: "memorize",
  memorise: "memorize",
  criticize: "criticize",
  criticise: "criticize",
  centralize: "centralize",
  centralise: "centralize",
  prioritize: "prioritize",
  prioritise: "prioritize",
  maximize: "maximize",
  maximise: "maximize",
  minimize: "minimize",
  minimise: "minimize",
  vaporize: "vaporize",
  vaporise: "vaporize",
  offense: "offense",
  offence: "offense",
  practice: "practice",
  practise: "practice",
  judgment: "judgment",
  judgement: "judgment",
  mold: "mold",
  mould: "mold",
  pedaled: "pedaled",
  pedalled: "pedaled",
  fueled: "fueled",
  fuelled: "fueled",
  modeled: "modeled",
  modelled: "modeled",
  canceled: "canceled",
  cancelled: "canceled",
  traveled: "traveled",
  travelled: "traveled",
  marveled: "marveled",
  marvelled: "marveled",
  woolen: "woolen",
  woollen: "woolen",
  jewelry: "jewelry",
  jewellery: "jewelry",
  labeling: "labeling",
  labelling: "labeling",
  quarreled: "quarreled",
  quarrelled: "quarreled",
  carburetor: "carburetor",
  carburettor: "carburetor",
  mustache: "mustache",
  moustache: "mustache",
  gray: "gray",
  grey: "gray",
  curb: "curb",
  kerb: "curb",
  plow: "plow",
  plough: "plow",
  program: "program",
  programme: "program",
  pyjamas: "pyjamas",
  pajamas: "pyjamas",
  storey: "storey",
  story: "storey",
  whisky: "whisky",
  whiskey: "whisky",
  theater: "theater",
  theatre: "theater",
  meter: "meter",
  metre: "meter",
  liter: "liter",
  litre: "liter",
  fiber: "fiber",
  fibre: "fiber",
  sulfur: "sulfur",
  sulphur: "sulfur",
  aluminum: "aluminum",
  aluminium: "aluminum",
  armor: "armor",
  armour: "armor",
  rumor: "rumor",
  rumour: "rumor",
  humor: "humor",
  humour: "humor",
  glamor: "glamor",
  glamour: "glamor",
  behavior: "behavior",
  behaviour: "behavior",
  valour: "valour",
  valor: "valour",
  saber: "saber",
  sabre: "saber",
  caliber: "caliber",
  calibre: "caliber",
  vapor: "vapor",
  vapour: "vapor",
  sepulcher: "sepulcher",
  sepulchre: "sepulcher",
  axe: "axe",
  ax: "axe",
  spoiled: "spoiled",
  spoilt: "spoiled",
  burned: "burned",
  burnt: "burned",
  leaped: "leaped",
  leapt: "leaped",
  dreamed: "dreamed",
  dreamt: "dreamed",
  learned: "learned",
  learnt: "learned",
  spilled: "spilled",
  spilt: "spilled",
  smelled: "smelled",
  smelt: "smelled",
  chiseled: "chiseled",
  chiselled: "chiseled",
  tunneled: "tunneled",
  tunnelled: "tunneled",
  fueling: "fueling",
  fuelling: "fueling",
  quarreling: "quarreling",
  quarrelling: "quarreling",
  marshaled: "marshaled",
  marshalled: "marshaled",
  signaled: "signaled",
  signalled: "signaled",
  dialed: "dialed",
  dialled: "dialed",
  computerized: "computerised",
  computerised: "computerized",
  activised: "activized",
  activized: "activised",
  totalling: "totaling",
  totaling: "totalling",
  privatised: "privatized",
  privatized: "privatised",
  criticised: "criticized",
  criticized: "criticised",
  modernising: "modernizing",
  modernizing: "modernising",
  programmes: "programs",
  programs: "programmes",
  recognised: "recognized",
  recognized: "recognised",
  centralisation: "centralization",
  centralization: "centralisation",
  decentralised: "decentralized",
  decentralized: "decentralised",
  centralised: "centralized",
  centralized: "centralised",
  reorganisation: "reorganization",
  reorganization: "reorganisation",
  favourably: "favorably",
  favorably: "favourably",
  Organisation: "Organization",
  Organization: "Organisation",
  labour: "labor",
  labor: "labour",
  analysed: "analyzed",
  analyzed: "analysed",
  labourers: "laborers",
  laborers: "labourers",
  colonised: "colonized",
  colonized: "colonised",
  authorised: "authorized",
  authorized: "authorised",
  industrialisation: "industrialization",
  industrialization: "industrialisation",
  endeavor: "endeavour",
  endeavour: "endeavor",
  revolutionised: "revolutionized",
  revolutionized: "revolutionised",
  fertilisers: "fertilizers",
  fertilizers: "fertilisers",
  mobilisation: "mobilization",
  mobilization: "mobilisation",
  organizational: "organisational",
  organisational: "organizational",

  "1st": "first",
  first: "first",
  "2nd": "second",
  second: "second",
  "3rd": "third",
  third: "third",
  "4th": "fourth",
  fourth: "fourth",
  "5th": "fifth",
  fifth: "fifth",
  "6th": "sixth",
  sixth: "sixth",
  "7th": "seventh",
  seventh: "seventh",
  "8th": "eighth",
  eighth: "eighth",
  "9th": "ninth",
  ninth: "ninth",
  "10th": "tenth",
  tenth: "tenth",
  "11th": "eleventh",
  eleventh: "eleventh",
  "12th": "twelfth",
  twelfth: "twelfth",
  "13th": "thirteenth",
  thirteenth: "thirteenth",
  "14th": "fourteenth",
  fourteenth: "fourteenth",
  "15th": "fifteenth",
  fifteenth: "fifteenth",
  "16th": "sixteenth",
  sixteenth: "sixteenth",
  "17th": "seventeenth",
  seventeenth: "seventeenth",
  "18th": "eighteenth",
  eighteenth: "eighteenth",
  "19th": "nineteenth",
  nineteenth: "nineteenth",
  "20th": "twentieth",
  twentieth: "twentieth",
  "21st": "twenty-first",
  "twenty-first": "twenty-first",
  "22nd": "twenty-second",
  "twenty-second": "twenty-second",
  "23rd": "twenty-third",
  "twenty-third": "twenty-third",
  "24th": "twenty-fourth",
  "twenty-fourth": "twenty-fourth",
  "25th": "twenty-fifth",
  "twenty-fifth": "twenty-fifth",
  "26th": "twenty-sixth",
  "twenty-sixth": "twenty-sixth",
  "27th": "twenty-seventh",
  "twenty-seventh": "twenty-seventh",
  "28th": "twenty-eighth",
  "twenty-eighth": "twenty-eighth",
  "29th": "twenty-ninth",
  "twenty-ninth": "twenty-ninth",
  "30th": "thirtieth",
  thirtieth: "thirtieth",
  "31st": "thirty-first",
  "thirty-first": "thirty-first",
  "32nd": "thirty-second",
  "thirty-second": "thirty-second",
  "33rd": "thirty-third",
  "thirty-third": "thirty-third",
  "34th": "thirty-fourth",
  "thirty-fourth": "thirty-fourth",
  "35th": "thirty-fifth",
  "thirty-fifth": "thirty-fifth",
  "36th": "thirty-sixth",
  "thirty-sixth": "thirty-sixth",
  "37th": "thirty-seventh",
  "thirty-seventh": "thirty-seventh",
  "38th": "thirty-eighth",
  "thirty-eighth": "thirty-eighth",
  "39th": "thirty-ninth",
  "thirty-ninth": "thirty-ninth",
  "40th": "fortieth",
  fortieth: "fortieth",
  "41st": "forty-first",
  "forty-first": "forty-first",
  "42nd": "forty-second",
  "forty-second": "forty-second",
  "43rd": "forty-third",
  "forty-third": "forty-third",
  "44th": "forty-fourth",
  "forty-fourth": "forty-fourth",
  "45th": "forty-fifth",
  "forty-fifth": "forty-fifth",
  "46th": "forty-sixth",
  "forty-sixth": "forty-sixth",
  "47th": "forty-seventh",
  "forty-seventh": "forty-seventh",
  "48th": "forty-eighth",
  "forty-eighth": "forty-eighth",
  "49th": "forty-ninth",
  "forty-ninth": "forty-ninth",
  "50th": "fiftieth",
  fiftieth: "fiftieth",
  "51st": "fifty-first",
  "fifty-first": "fifty-first",
  "52nd": "fifty-second",
  "fifty-second": "fifty-second",
  "53rd": "fifty-third",
  "fifty-third": "fifty-third",
  "54th": "fifty-fourth",
  "fifty-fourth": "fifty-fourth",
  "55th": "fifty-fifth",
  "fifty-fifth": "fifty-fifth",
  "56th": "fifty-sixth",
  "fifty-sixth": "fifty-sixth",
  "57th": "fifty-seventh",
  "fifty-seventh": "fifty-seventh",
  "58th": "fifty-eighth",
  "fifty-eighth": "fifty-eighth",
  "59th": "fifty-ninth",
  "fifty-ninth": "fifty-ninth",
  "60th": "sixtieth",
  sixtieth: "sixtieth",
  "61st": "sixty-first",
  "sixty-first": "sixty-first",
  "62nd": "sixty-second",
  "sixty-second": "sixty-second",
  "63rd": "sixty-third",
  "sixty-third": "sixty-third",
  "64th": "sixty-fourth",
  "sixty-fourth": "sixty-fourth",
  "65th": "sixty-fifth",
  "sixty-fifth": "sixty-fifth",
  "66th": "sixty-sixth",
  "sixty-sixth": "sixty-sixth",
  "67th": "sixty-seventh",
  "sixty-seventh": "sixty-seventh",
  "68th": "sixty-eighth",
  "sixty-eighth": "sixty-eighth",
  "69th": "sixty-ninth",
  "sixty-ninth": "sixty-ninth",
  "70th": "seventieth",
  seventieth: "seventieth",
  "71st": "seventy-first",
  "seventy-first": "seventy-first",
  "72nd": "seventy-second",
  "seventy-second": "seventy-second",
  "73rd": "seventy-third",
  "seventy-third": "seventy-third",
  "74th": "seventy-fourth",
  "seventy-fourth": "seventy-fourth",
  "75th": "seventy-fifth",
  "seventy-fifth": "seventy-fifth",
  "76th": "seventy-sixth",
  "seventy-sixth": "seventy-sixth",
  "77th": "seventy-seventh",
  "seventy-seventh": "seventy-seventh",
  "78th": "seventy-eighth",
  "seventy-eighth": "seventy-eighth",
  "79th": "seventy-ninth",
  "seventy-ninth": "seventy-ninth",
  "80th": "eightieth",
  eightieth: "eightieth",
  "81st": "eighty-first",
  "eighty-first": "eighty-first",
  "82nd": "eighty-second",
  "eighty-second": "eighty-second",
  "83rd": "eighty-third",
  "eighty-third": "eighty-third",
  "84th": "eighty-fourth",
  "eighty-fourth": "eighty-fourth",
  "85th": "eighty-fifth",
  "eighty-fifth": "eighty-fifth",
  "86th": "eighty-sixth",
  "eighty-sixth": "eighty-sixth",
  "87th": "eighty-seventh",
  "eighty-seventh": "eighty-seventh",
  "88th": "eighty-eighth",
  "eighty-eighth": "eighty-eighth",
  "89th": "eighty-ninth",
  "eighty-ninth": "eighty-ninth",
  "90th": "ninetieth",
  ninetieth: "ninetieth",
  "91st": "ninety-first",
  "ninety-first": "ninety-first",
  "92nd": "ninety-second",
  "ninety-second": "ninety-second",
  "93rd": "ninety-third",
  "ninety-third": "ninety-third",
  "94th": "ninety-fourth",
  "ninety-fourth": "ninety-fourth",
  "95th": "ninety-fifth",
  "ninety-fifth": "ninety-fifth",
  "96th": "ninety-sixth",
  "ninety-sixth": "ninety-sixth",
  "97th": "ninety-seventh",
  "ninety-seventh": "ninety-seventh",
  "98th": "ninety-eighth",
  "ninety-eighth": "ninety-eighth",
  "99th": "ninety-ninth",
  "ninety-ninth": "ninety-ninth",
  "100th": "one hundredth",
  "one hundredth": "one hundredth",

  one: "one",
  1: "one",
  two: "two",
  2: "two",
  three: "three",
  3: "three",
  four: "four",
  4: "four",
  five: "five",
  5: "five",
  six: "six",
  6: "six",
  seven: "seven",
  7: "seven",
  eight: "eight",
  8: "eight",
  nine: "nine",
  9: "nine",
  ten: "ten",
  10: "ten",
  eleven: "eleven",
  11: "eleven",
  twelve: "twelve",
  12: "twelve",
  thirteen: "thirteen",
  13: "thirteen",
  fourteen: "fourteen",
  14: "fourteen",
  fifteen: "fifteen",
  15: "fifteen",
  sixteen: "sixteen",
  16: "sixteen",
  seventeen: "seventeen",
  17: "seventeen",
  eighteen: "eighteen",
  18: "eighteen",
  nineteen: "nineteen",
  19: "nineteen",
  twenty: "twenty",
  20: "twenty",
  "twenty-one": "twenty-one",
  21: "twenty-one",
  "twenty-two": "twenty-two",
  22: "twenty-two",
  "twenty-three": "twenty-three",
  23: "twenty-three",
  "twenty-four": "twenty-four",
  24: "twenty-four",
  "twenty-five": "twenty-five",
  25: "twenty-five",
  "twenty-six": "twenty-six",
  26: "twenty-six",
  "twenty-seven": "twenty-seven",
  27: "twenty-seven",
  "twenty-eight": "twenty-eight",
  28: "twenty-eight",
  "twenty-nine": "twenty-nine",
  29: "twenty-nine",
  thirty: "thirty",
  30: "thirty",
  "thirty-one": "thirty-one",
  31: "thirty-one",
  "thirty-two": "thirty-two",
  32: "thirty-two",
  "thirty-three": "thirty-three",
  33: "thirty-three",
  "thirty-four": "thirty-four",
  34: "thirty-four",
  "thirty-five": "thirty-five",
  35: "thirty-five",
  "thirty-six": "thirty-six",
  36: "thirty-six",
  "thirty-seven": "thirty-seven",
  37: "thirty-seven",
  "thirty-eight": "thirty-eight",
  38: "thirty-eight",
  "thirty-nine": "thirty-nine",
  39: "thirty-nine",
  forty: "forty",
  40: "forty",
  "forty-one": "forty-one",
  41: "forty-one",
  "forty-two": "forty-two",
  42: "forty-two",
  "forty-three": "forty-three",
  43: "forty-three",
  "forty-four": "forty-four",
  44: "forty-four",
  "forty-five": "forty-five",
  45: "forty-five",
  "forty-six": "forty-six",
  46: "forty-six",
  "forty-seven": "forty-seven",
  47: "forty-seven",
  "forty-eight": "forty-eight",
  48: "forty-eight",
  "forty-nine": "forty-nine",
  49: "forty-nine",
  fifty: "fifty",
  50: "fifty",
  "fifty-one": "fifty-one",
  51: "fifty-one",
  "fifty-two": "fifty-two",
  52: "fifty-two",
  "fifty-three": "fifty-three",
  53: "fifty-three",
  "fifty-four": "fifty-four",
  54: "fifty-four",
  "fifty-five": "fifty-five",
  55: "fifty-five",
  "fifty-six": "fifty-six",
  56: "fifty-six",
  "fifty-seven": "fifty-seven",
  57: "fifty-seven",
  "fifty-eight": "fifty-eight",
  58: "fifty-eight",
  "fifty-nine": "fifty-nine",
  59: "fifty-nine",
  sixty: "sixty",
  60: "sixty",
  "sixty-one": "sixty-one",
  61: "sixty-one",
  "sixty-two": "sixty-two",
  62: "sixty-two",
  "sixty-three": "sixty-three",
  63: "sixty-three",
  "sixty-four": "sixty-four",
  64: "sixty-four",
  "sixty-five": "sixty-five",
  65: "sixty-five",
  "sixty-six": "sixty-six",
  66: "sixty-six",
  "sixty-seven": "sixty-seven",
  67: "sixty-seven",
  "sixty-eight": "sixty-eight",
  68: "sixty-eight",
  "sixty-nine": "sixty-nine",
  69: "sixty-nine",
  seventy: "seventy",
  70: "seventy",
  "seventy-one": "seventy-one",
  71: "seventy-one",
  "seventy-two": "seventy-two",
  72: "seventy-two",
  "seventy-three": "seventy-three",
  73: "seventy-three",
  "seventy-four": "seventy-four",
  74: "seventy-four",
  "seventy-five": "seventy-five",
  75: "seventy-five",
  "seventy-six": "seventy-six",
  76: "seventy-six",
  "seventy-seven": "seventy-seven",
  77: "seventy-seven",
  "seventy-eight": "seventy-eight",
  78: "seventy-eight",
  "seventy-nine": "seventy-nine",
  79: "seventy-nine",
  eighty: "eighty",
  80: "eighty",
  "eighty-one": "eighty-one",
  81: "eighty-one",
  "eighty-two": "eighty-two",
  82: "eighty-two",
  "eighty-three": "eighty-three",
  83: "eighty-three",
  "eighty-four": "eighty-four",
  84: "eighty-four",
  "eighty-five": "eighty-five",
  85: "eighty-five",
  "eighty-six": "eighty-six",
  86: "eighty-six",
  "eighty-seven": "eighty-seven",
  87: "eighty-seven",
  "eighty-eight": "eighty-eight",
  88: "eighty-eight",
  "eighty-nine": "eighty-nine",
  89: "eighty-nine",
  ninety: "ninety",
  90: "ninety",
  "ninety-one": "ninety-one",
  91: "ninety-one",
  "ninety-two": "ninety-two",
  92: "ninety-two",
  "ninety-three": "ninety-three",
  93: "ninety-three",
  "ninety-four": "ninety-four",
  94: "ninety-four",
  "ninety-five": "ninety-five",
  95: "ninety-five",
  "ninety-six": "ninety-six",
  96: "ninety-six",
  "ninety-seven": "ninety-seven",
  97: "ninety-seven",
  "ninety-eight": "ninety-eight",
  98: "ninety-eight",
  "ninety-nine": "ninety-nine",
  99: "ninety-nine",
  "one hundred": "one hundred",
  100: "one hundred",
};

const normalizeWord = (word) => {
  const cleaned = word
    .replace(/[^a-zA-Z0-9']/g, "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  return synonymMap[cleaned] || cleaned;
};

const compareCharacters = (original, input) => {
  let matches = 0;
  const minLen = Math.min(original.length, input.length);
  for (let i = 0; i < minLen; i++) {
    if (original[i] === input[i]) matches++;
  }
  return matches / Math.max(original.length, input.length);
};

const DictationFeature = () => {
  const [originalText, setOriginalText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fontSize, setFontSize] = useState("22px");
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setOriginalText(
      `The old lighthouse keeper, Silas, squinted at the churning sea.  The wind howled a mournful dirge, rattling the windows of his lonely tower.  For fifty years, he'd kept the beacon lit, a steadfast guardian against the treacherous reefs that clawed at the coastline.  He knew every creak and groan of the ancient structure, every shift in the wind's temperament.  Tonight, though, was different.  A storm, unlike any he'd witnessed, was brewing.

The first fat drops of rain splattered against the thick glass of the lantern room, quickly escalating into a torrential downpour.  The waves, already agitated, grew into monstrous, frothing beasts, crashing against the rocky base of the lighthouse with thunderous roars.  Silas gripped his worn pipe, the familiar weight a small comfort in the face of the encroaching tempest.  He'd seen storms before, countless storms, but this one carried a malevolent energy, a primal fury that chilled him to the bone.

He glanced at the barometer.  The needle was plummeting, a stark indicator of the storm's ferocity.  He knew he had to contact the mainland, warn the ships at sea.  He reached for the radio, his hand trembling slightly.  Static crackled from the speaker, punctuated by bursts of unintelligible chatter.  The storm was interfering with the signal, making communication nearly impossible.

Silas wrestled with the controls, adjusting the frequency, trying desperately to find a clear channel.  He managed to send a brief, garbled message before the radio fell silent, swallowed by the storm's electronic interference.  He was alone, utterly alone, with the raging sea and the howling wind for company.

He climbed the winding stairs to the lantern room, his old bones protesting with every step.  The light, his life's work, his responsibility, was flickering erratically.  He had to keep it burning, no matter the cost.  He reached the top, the wind buffeting him as he stepped onto the narrow platform that encircled the light.  The glass of the lantern room was vibrating violently, threatened by the onslaught of the storm.

Inside, the massive Fresnel lens, a masterpiece of engineering, rotated steadily, casting its powerful beam out into the darkness.  Silas checked the oil levels, ensuring the lamp had enough fuel to burn through the night.  He cleaned the soot from the glass, meticulously maintaining the integrity of the light.  This light was more than just a beacon; it was hope, a lifeline for sailors lost in the storm's clutches.

The storm raged on, its fury unabated.  Waves crashed over the lighthouse, sending tremors through the tower.  Silas clung to the railing, his knuckles white, his heart pounding in his chest.  He felt a surge of fear, a primal terror that he hadn't experienced in decades.  He was just an old man, alone against the raw power of nature.

He remembered his father, also a lighthouse keeper, who had taught him the importance of his duty.  "The light," his father had said, "is more important than anything.  It guides the lost, it saves lives.  Never let it go out."  Those words echoed in his mind, giving him strength.

He checked the light again, his eyes scanning the horizon.  Through the driving rain and the swirling mist, he saw a flicker of light in the distance.  A ship!  It was heading straight for the reefs, oblivious to the danger.  Silas knew he had to act quickly.

He grabbed a flare gun, his hands shaking.  He climbed onto the exposed platform, the wind nearly ripping him from his grasp.  He aimed the flare gun into the sky and fired.  A bright red flare soared into the darkness, a desperate plea for attention.

He watched, his breath held tight, as the ship slowly changed course, veering away from the treacherous rocks.  The flare had been seen.  He had saved them.  A wave of relief washed over him, followed by an overwhelming exhaustion.

He stumbled back inside the lantern room, collapsing into a chair.  He was battered, bruised, and soaked to the bone, but the light was still burning.  He had done his duty.

The storm continued to rage through the night, but Silas knew he had weathered the worst of it.  He sat by the window, watching the waves crash against the rocks, his gaze fixed on the beam of light that cut through the darkness.  He was just an old man, a solitary figure in a lonely tower, but he was also a guardian, a beacon of hope in a world of storms.  As dawn approached, the wind began to subside, the rain softened to a drizzle, and the sea slowly calmed.  The storm had passed, leaving behind a trail of destruction, but also a renewed sense of the power of nature and the resilience of the human spirit.  Silas knew he would be there, day after day, night after night, keeping the light burning, a testament to his unwavering dedication and the enduring importance of his solitary vigil.  The lighthouse, a symbol of hope and guidance, would continue to stand, a steadfast sentinel against the sea.`
    );
  }, []);

  const handleFullScreenToggle = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleStartTyping = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
  };

  const handleCompare = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setComparisonResult(compareTexts(originalText, userInput));
  };

  const compareTexts = (original, input) => {
    const originalWords = original.trim().split(/\s+/);
    const inputWords = input.trim().split(/\s+/);
    let differences = [];
    let correctWords = 0;

    originalWords.forEach((origWord, idx) => {
      const inputWord = inputWords[idx] || "";
      const normalizedOriginal = normalizeWord(origWord);
      const normalizedInput = normalizeWord(inputWord);

      const charMatchRatio = compareCharacters(normalizedOriginal, normalizedInput);

      if (
        normalizedOriginal === normalizedInput ||
        (synonymMap[normalizedInput] === normalizedOriginal && charMatchRatio >= 0.9) // Threshold for near matches
      ) {
        correctWords++;
      } else {
        differences.push({
          position: idx + 1,
          expected: origWord,
          typed: inputWord,
          similarity: (charMatchRatio * 100).toFixed(2) + "%",
        });
      }
    });

    return {
      totalWords: originalWords.length,
      totalTyped: inputWords.length,
      correctWords,
      mistakes: differences.length,
      accuracy: ((correctWords / originalWords.length) * 100).toFixed(2) + "%",
      detailedDifferences: differences,
    };
  };

  const handleFontSizeChange = (e) => setFontSize(e.target.value);

  const handleUserInput = (e) => setUserInput(e.target.value);

  return (
    <div className="p-8 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-700">Stenoshala Shorthand Academy</h1>
      <h2 className="text-2xl text-center text-gray-700">Email - support@stenoshala.com | WhatsApp - 8447949206</h2>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <textarea
          value={userInput}
          onChange={handleUserInput}
          onFocus={handleStartTyping}
          style={{ fontSize, width: "100%", height: "12em" }}
          placeholder="Start typing..."
          className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-screen"
        />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={handleCompare}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          >
            Submit
          </button>
          <select
            onChange={handleFontSizeChange}
            value={fontSize}
            className="border-2 border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="18px">Small</option>
            <option value="22px">Medium</option>
            <option value="26px">Large</option>
          </select>
          <button
            onClick={handleFullScreenToggle}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          >
            {isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </button>
        </div>
      </div>

      {comparisonResult && (
        <div className="bg-blue-50 rounded-2xl shadow-lg p-6 mt-4 space-y-2">
          <h3 className="text-2xl font-semibold text-blue-600">Result Sheet:</h3>
          <p className="text-lg">Total Words: {comparisonResult.totalWords}</p>
          <p className="text-lg">Total Typed: {comparisonResult.totalTyped}</p>
          <p className="text-lg">Correct Words: {comparisonResult.correctWords}</p>
          <p className="text-lg">Mistakes: {comparisonResult.mistakes}</p>
          <p className="text-lg">Accuracy: {comparisonResult.accuracy}</p>
          {comparisonResult.detailedDifferences.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h4 className="text-lg font-semibold text-red-600">Detailed Mistakes:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {comparisonResult.detailedDifferences.map((diff, index) => (
                  <li key={index}>
                    Word {diff.position}: Expected "{diff.expected}" but got "{diff.typed}" (Similarity:{" "}
                    {diff.similarity})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-lg">Time Taken: {timer} seconds</p>
        </div>
      )}
    </div>
  );
};

export default DictationFeature;
