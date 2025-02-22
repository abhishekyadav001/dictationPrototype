import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

const TranscriptionComparisonTool = () => {
  // State variables
  const [typingStartTime, setTypingStartTime] = useState(null);
  const [isBackspaceDisabled, setIsBackspaceDisabled] = useState(false);
  const [timer, setTimer] = useState(60 * 50); // 50 minutes in seconds
  const [userInput, setUserInput] = useState("");
  const [comparisonResult, setComparisonResult] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [popupVisible, setPopupVisible] = useState(true);
  const [backspaceStatus, setBackspaceStatus] = useState("enabled");
  const [D1, setD1] = useState("Half");
  const [D2, setD2] = useState("None");
  const [D3, setD3] = useState("None");
  const [D4, setD4] = useState("None");

  const timerRef = useRef(null);
  const contentRef = useRef(null);

  // Original text
  const originalText = `
    The old lighthouse keeper, Silas, squinted at the churning sea.  The wind howled a mournful dirge, rattling the windows of his lonely tower.  For fifty years, he'd kept the beacon lit, a steadfast guardian against the treacherous reefs that clawed at the coastline.  He knew every creak and groan of the ancient structure, every shift in the wind's temperament.  Tonight, though, was different.  A storm, unlike any he'd witnessed, was brewing.

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
    
    The storm continued to rage through the night, but Silas knew he had weathered the worst of it.  He sat by the window, watching the waves crash against the rocks, his gaze fixed on the beam of light that cut through the darkness.  He was just an old man, a solitary figure in a lonely tower, but he was also a guardian, a beacon of hope in a world of storms.  As dawn approached, the wind began to subside, the rain softened to a drizzle, and the sea slowly calmed.  The storm had passed, leaving behind a trail of destruction, but also a renewed sense of the power of nature and the resilience of the human spirit.  Silas knew he would be there, day after day, night after night, keeping the light burning, a testament to his unwavering dedication and the enduring importance of his solitary vigil.  The lighthouse, a symbol of hope and guidance, would continue to stand, a steadfast sentinel against the sea.
  `.trim();

  // Synonym map (abridged for brevity, full map should be included)
  const synonymMap = {
    "hon'ble": "hon'ble",
    "hon.": "hon'ble",
    honourable: "hon'ble",
    capitalize: "capitalize",
    capitalise: "capitalize",
    // ... (include the full synonymMap from index2.js)
  };

  // Normalize word function
  const normalizeWord = (word) => {
    const standardApostropheWord = word.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
    const lowerWord = standardApostropheWord.toLowerCase().trim();
    const normalizedPhrase = lowerWord.replace(/\s+/g, " ");
    return synonymMap[normalizedPhrase] || lowerWord;
  };

  // Timer effect
  useEffect(() => {
    if (!popupVisible) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            exitFullscreenAndCompare();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [popupVisible]);

  // Fullscreen functions
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    setPopupVisible(false);
  };

  const exitFullscreenAndCompare = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    clearInterval(timerRef.current);
    compareParagraphs();
  };

  // Start timer on first input
  const startTimer = () => {
    if (!typingStartTime) setTypingStartTime(new Date());
  };

  // Handle keydown for backspace and keystrokes
  const handleKeyDown = (e) => {
    if (isBackspaceDisabled && e.key === "Backspace") {
      e.preventDefault();
    }
    startTimer();
    const ignoredKeys = [
      "Shift",
      "Control",
      "Alt",
      "CapsLock",
      "Meta",
      "Tab",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Escape",
    ];
    if (!ignoredKeys.includes(e.key)) {
      setTotalKeystrokes((prev) => prev + 1);
    }
  };

  const handlePaste = (e) => {
    startTimer();
    const pastedText = (e.clipboardData || window.clipboardData).getData("text");
    setTotalKeystrokes((prev) => prev + pastedText.length);
  };

  // Comparison logic
  const compareWords = (originalWords, userWords) => {
    const matrix = Array(originalWords.length + 1)
      .fill(null)
      .map(() => Array(userWords.length + 1).fill(null));

    for (let i = 0; i <= originalWords.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= userWords.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= originalWords.length; i++) {
      for (let j = 1; j <= userWords.length; j++) {
        const cost = originalWords[i - 1].toLowerCase() === userWords[j - 1].toLowerCase() ? 0 : 1;
        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
      }
    }

    let i = originalWords.length;
    let j = userWords.length;
    let result = "";

    while (i > 0 || j > 0) {
      const origWord = originalWords[i - 1] || "";
      const userWord = userWords[j - 1] || "";
      const origWordNorm = normalizeWord(origWord);
      const userWordNorm = normalizeWord(userWord);

      if (i > 0 && j > 0 && origWordNorm === userWordNorm) {
        if (origWord.toLowerCase() === userWord.toLowerCase() && origWord !== userWord) {
          result = `<span class="capitalization">${userWord}</span> ` + result;
        } else if (origWord.toLowerCase() !== userWord.toLowerCase()) {
          result = origWord + " " + result;
        } else {
          result = origWord + " " + result;
        }
        i--;
        j--;
      } else if (i > 0 && j > 0 && isCapitalizationDifference(origWord, userWord)) {
        result = `<span class="capitalization">${userWord}</span> ` + result;
        i--;
        j--;
      } else if (i > 0 && j > 0 && isPunctuationDifference(origWord, userWord)) {
        result = `<span class="punctuation">${userWord}</span> ` + result;
        i--;
        j--;
      } else if (i > 0 && j > 0 && isSpellingDifference(origWord, userWord)) {
        result = `<span class="spelling">${userWord}</span> ` + result;
        i--;
        j--;
      } else if (j > 0 && (i === 0 || matrix[i][j - 1] <= matrix[i - 1][j])) {
        result = `<span class="addition">${userWord}</span> ` + result;
        j--;
      } else {
        result = `<span class="omission">${origWord}</span> ` + result;
        i--;
      }
    }
    return result;
  };

  const isPunctuationDifference = (word1, word2) => {
    const strippedWord1 = word1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const strippedWord2 = word2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return strippedWord1 === strippedWord2 && word1 !== word2;
  };

  const isSpellingDifference = (word1, word2) => {
    const levenshteinDist = levenshteinDistance(word1.toLowerCase(), word2.toLowerCase());
    return levenshteinDist === 1 || levenshteinDist === 2;
  };

  const isCapitalizationDifference = (word1, word2) => {
    return word1.toLowerCase() === word2.toLowerCase() && word1 !== word2;
  };

  const levenshteinDistance = (s1, s2) => {
    const track = Array(s2.length + 1)
      .fill(null)
      .map(() => Array(s1.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i++) track[0][i] = i;
    for (let j = 0; j <= s2.length; j++) track[j][0] = j;
    for (let j = 1; j <= s2.length; j++) {
      for (let i = 1; i <= s1.length; i++) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
      }
    }
    return track[s2.length][s1.length];
  };

  const compareParagraphs = () => {
    setShowResults(true);
    let processedOriginal = originalText.replace(/per\s+cent/gi, "percent");
    let processedUserInput = userInput.replace(/per\s+cent/gi, "percent");
    const originalWords = processedOriginal.split(/\s+/);
    const userWords = processedUserInput.split(/\s+/);
    const result = compareWords(originalWords, userWords);
    setComparisonResult(result);

    const totalWordsP1 = originalWords.length;
    const totalWordsP2 = userWords.length;
    const fullDiffCount =
      (result.match(/class="addition"/g) || []).length + (result.match(/class="omission"/g) || []).length;
    const halfDiffCount =
      (result.match(/class="spelling"/g) || []).length + (result.match(/class="similarity"/g) || []).length;
    const punDiffCount = (result.match(/class="punctuation"/g) || []).length;
    let percentageDiff = ((halfDiffCount / 2 + fullDiffCount) / totalWordsP1) * 100;
    if (percentageDiff > 100) percentageDiff = 100;
    const accuracy = 100 - percentageDiff;
    const typingEndTime = new Date();
    const timeDiff = (typingEndTime - typingStartTime) / 1000 / 60;
    const wpm = totalWordsP2 / timeDiff;
    const submissionDate = typingEndTime.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const transcriptionName = "Kailash Chandra Dictation No. 1";

    document.getElementById("statsContainer").innerHTML = `
      <div class="transcriptionName">Dictation Name: ${transcriptionName}</div>
      <div class="stats totalWordsP1">Total words: ${totalWordsP1}</div>
      <div class="stats totalWordsP2">Typed Words: ${totalWordsP2}</div>
      <div class="stats fullDiff">Total No. of Full Mistakes: ${fullDiffCount}</div>
      <div class="stats halfDiff">Total No. of Half Mistakes: ${halfDiffCount}</div>
      <div class="stats percentageDiff">Total % of Mistakes: ${percentageDiff.toFixed(2)}%</div>
      <div class="stats accuracy">🎯 Accuracy: ${accuracy.toFixed(2)}%</div>
      <div class="stats totalKeystrokes">Typed Keystrokes: ${totalKeystrokes}</div>
      <div class="stats wpm">Typing Speed: ${wpm.toFixed(2)} WPM</div>
      <div class="stats submissionTime">Test Date: ${submissionDate}</div>
    `;
  };

  // Generate PDF
  const generatePDF = () => {
    const element = contentRef.current;
    const transcriptionName = "Kailash Chandra Dictation No. 1";
    const opt = {
      margin: 10,
      filename: `${transcriptionName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // Apply logic from popup
  const applyLogic = () => {
    setIsBackspaceDisabled(backspaceStatus === "disabled");
    // Here you would typically load different JS/CSS based on D1-D4,
    // but since we're in React, we rely on the component's logic and inline CSS
    setPopupVisible(false);
    enterFullscreen();
  };

  // CSS (inline from the original HTML, abridged for brevity)
  const styles = `
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    #fullscreenOverlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      z-index: 1000;
    }
    #userInput {
      font-family: "Calibri", sans-serif;
      border: 2px solid #007acc;
      padding: 10px;
      border-radius: 5px;
      width: 80%;
      background-color: #f8f9fa;
      font-size: 22px;
      margin: 0 auto 10px auto;
      display: block;
    }
    #compareButton {
      padding: 10px 20px;
      background-color: #2e86c1;
      color: white;
      font-size: 24px;
      font-family: "Calibri", sans-serif;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10%;
      margin-top: 20px;
    }
    #downloadPdfButton {
      padding: 10px 20px;
      background-color: #28a745;
      color: white;
      font-size: 24px;
      font-weight: bold;
      font-family: "Calibri", sans-serif;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10%;
      margin-top: 20px;
      display: ${showResults ? "block" : "none"};
    }
    #timerContainer {
      position: fixed;
      top: 40px;
      right: 40px;
      display: flex;
      align-items: center;
      background-color: white;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    #timerContainer.warning {
      background-color: #ffe6e6;
    }
    #timerTitle, #timer {
      font-size: 24px;
      color: teal;
      font-family: "Calibri", sans-serif;
    }
    #timerContainer.warning #timerTitle, #timerContainer.warning #timer {
      color: red;
    }
    .addition { color: red; background-color: #ffcccc; text-decoration: line-through; }
    .omission { color: green; background-color: #ccffcc; }
    .spelling { color: orange; background-color: #ffe6cc; }
    .capitalization { background-color: none; }
    .punctuation { background-color: none; }
    #comparisonResult {
      font-family: "Calibri Light", sans-serif;
      font-size: 20px;
      text-align: justify;
      padding: 20px;
      border: 2px solid #007acc;
      border-radius: 8px;
      background-color: #f0f8ff;
      margin-top: 20px;
      width: 80%;
      margin-left: 10%;
      display: ${showResults ? "block" : "none"};
    }
    #statsContainer {
      margin-bottom: 30px;
      width: 80%;
      margin-left: 10%;
      display: ${showResults ? "block" : "none"};
    }
    .stats {
      display: inline-block;
      padding: 10px;
      margin: 10px 10px 0 0;
      border-radius: 10px;
      color: white;
      font-size: 20px;
      font-family: "Calibri", sans-serif;
      background-color: teal;
    }
    .transcriptionName {
      background-color: teal;
      color: white;
      font-size: 20px;
      font-family: "Calibri", sans-serif;
      padding: 10px;
      margin: 10px 0;
      border-radius: 10px;
      width: 90%;
    }
    #legend {
      display: ${showResults ? "flex" : "none"};
      align-items: center;
      margin-bottom: 20px;
      margin-left: 10%;
    }
    .legend-item { display: flex; align-items: center; margin-right: 15px; }
    .legend-color-box { width: 20px; height: 20px; border-radius: 5px; margin-right: 5px; }
    .legend-label { font-size: 14px; }
    #popupFlex {
      display: ${popupVisible ? "block" : "none"};
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      z-index: 2000;
    }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
    .dropdown-container { margin: 10px 0; }
    #saveButton {
      padding: 10px 20px;
      background-color: #007acc;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `;

  // Render
  return (
    <>
      <style>{styles}</style>
      <div>
        <h1>Stenoshala Shorthand Academy</h1>
        <h2 className="custom-subheading">Email - stenoshala@gmail.com | WhatsApp - 8447949206</h2>

        {/* Popup */}
        {popupVisible && (
          <div id="popupFlex">
            <div className="section">
              <div className="section-title">Adjust Mistake Counting As Per Your Need</div>
              <div className="dropdown-container">
                <label htmlFor="backspaceDropdown">Backspace Status:</label>
                <select
                  id="backspaceDropdown"
                  value={backspaceStatus}
                  onChange={(e) => setBackspaceStatus(e.target.value)}
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div className="dropdown-container">
                <label htmlFor="D1">Count Spelling Mistake as:</label>
                <select
                  id="D1"
                  value={D1}
                  onChange={(e) => {
                    setD1(e.target.value);
                    setD4("None");
                  }}
                >
                  <option value="Half">Half</option>
                  <option value="Full">Full</option>
                </select>
              </div>
              <div className="dropdown-container">
                <label htmlFor="D2">Count Capitalization Mistake as:</label>
                <select
                  id="D2"
                  value={D2}
                  onChange={(e) => {
                    setD2(e.target.value);
                    setD4("None");
                  }}
                >
                  <option value="None">None</option>
                  <option value="Half">Half</option>
                  <option value="Full">Full</option>
                </select>
              </div>
              <div className="dropdown-container">
                <label htmlFor="D3">Count Punctuation Mistake as:</label>
                <select
                  id="D3"
                  value={D3}
                  onChange={(e) => {
                    setD3(e.target.value);
                    setD4("None");
                  }}
                >
                  <option value="None">None</option>
                  <option value="Half">Half</option>
                  <option value="Full">Full</option>
                </select>
              </div>
            </div>
            <div className="section">
              <div className="section-title">Adjust Mistake Counting As Per Specific Exam</div>
              <div className="dropdown-container">
                <label htmlFor="D4">Count Mistakes as Per:</label>
                <select
                  id="D4"
                  value={D4}
                  onChange={(e) => {
                    setD4(e.target.value);
                    setD1("Half");
                    setD2("None");
                    setD3("None");
                  }}
                >
                  <option value="None">None</option>
                  <option value="Ssc">Ssc Stenographer Grade C & D Skill Test</option>
                  <option value="Biharcourt">Bihar Civil Court stenography Skill Test</option>
                  <option value="Dda">Delhi Development Authority Stenography Skill Test</option>
                </select>
              </div>
            </div>
            <button id="saveButton" onClick={applyLogic}>
              Save and Continue
            </button>
          </div>
        )}

        <textarea
          id="userInput"
          rows="10"
          placeholder="Start typing..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          spellCheck={false}
          disabled={showResults}
        />
        <button id="compareButton" onClick={exitFullscreenAndCompare}>
          Submit
        </button>
        <button id="downloadPdfButton" onClick={generatePDF}>
          Download Result Pdf
        </button>

        <div id="contentToDownload" ref={contentRef}>
          <h2 id="comparisonTitle" style={{ display: showResults ? "block" : "none" }}>
            Result Sheet:
          </h2>
          <div id="statsContainer"></div>
          <div id="legend">
            <div className="legend-item">
              <div className="legend-color-box" style={{ backgroundColor: "#ffcccc" }}></div>
              <span className="legend-label">Additions</span>
            </div>
            <div className="legend-item">
              <div className="legend-color-box" style={{ backgroundColor: "#ccffcc" }}></div>
              <span className="legend-label">Omissions</span>
            </div>
            <div className="legend-item">
              <div className="legend-color-box" style={{ backgroundColor: "#ffe6cc" }}></div>
              <span className="legend-label">Spelling Mistakes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color-box" style={{ backgroundColor: "#85c1e9" }}></div>
              <span className="legend-label">Capitalization Mistakes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color-box" style={{ backgroundColor: "#d7bde2" }}></div>
              <span className="legend-label">Punctuation Mistakes</span>
            </div>
          </div>
          <div id="comparisonResult" dangerouslySetInnerHTML={{ __html: comparisonResult }}></div>
          <h2 id="originalTitle" style={{ display: showResults ? "block" : "none" }}>
            Original Transcription
          </h2>
          <div id="originalContent" style={{ display: showResults ? "block" : "none" }}>
            {originalText}
          </div>
        </div>

        <div id="timerContainer" className={timer <= 300 ? "warning" : ""}>
          <div id="timerTitle">Time Left:</div>
          <div id="timer">
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
            :{(timer % 60).toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </>
  );
};

export default TranscriptionComparisonTool;
