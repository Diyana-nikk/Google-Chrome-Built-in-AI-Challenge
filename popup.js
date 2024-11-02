document.getElementById("detectBtn").addEventListener("click", async () => {
    const text = document.getElementById("text").value;
  
    if (!text) {
      alert("Please enter some text.");
      return;
    }
  
    try {
      // Check if the Language Detection API is available
      const canDetect = await translation.canDetect();
      let detector;
  
      if (canDetect !== 'no') {
        if (canDetect === 'readily') {
          // Use the language detector immediately
          detector = await translation.createDetector();
        } else {
          // Wait for the model to download
          detector = await translation.createDetector();
          detector.addEventListener('downloadprogress', (e) => {
            console.log(`Downloading: ${e.loaded} / ${e.total}`);
          });
          await detector.ready;
        }
  
        // Detect the language of the input text
        const results = await detector.detect(text);
  
        // Display the results
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";
  
        results.forEach(result => {
          const { detectedLanguage, confidence } = result;
          resultDiv.innerHTML += `<p>Language: ${detectedLanguage}, Confidence: ${confidence.toFixed(2)}</p>`;
        });
      } else {
        alert("Language detection is not available.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console for details.");
    }
  });
  