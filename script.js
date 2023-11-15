document.getElementById('redact-button').addEventListener('click', function () {
    const startTime = new Date();
    const content = document.getElementById('content').value;
    
    const wordsToRedact = document.getElementById('wordsToRedact').value.split(' ');
  
    const replacementChar = document.getElementById('replacementChar').value || '*';
    
    const redactedContent = redactContent(content, wordsToRedact, replacementChar);
    document.getElementById('redacted-content').textContent = redactedContent;

    // Calculate and display statistics
    const stats = getRedactionStats(content, wordsToRedact, startTime);
    document.getElementById('stats').textContent = stats;
});

function redactContent(content, wordsToRedact, replacementChar) {
    wordsToRedact.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        content = content.replace(regex, replacementChar.repeat(word.length));
    });
    return content;
}

function getRedactionStats(originalContent, redactedContent,startTime) {
    const wordsScanned = originalContent.split(/\s+/).length;
  
    const wordsRedacted = getMatchedWords(redactedContent,originalContent); //redactedContent.split(/\s+/).length;
    //const charactersRedacted = redactedContent.split(/\s+/).length;

    
    const endTime = new Date();
    const timeTaken = (endTime - startTime)/1000; // in seconds

    return `Words Scanned: ${wordsScanned}, Words Redacted: ${wordsRedacted}, Time Taken: ${timeTaken} seconds`;//, Characters Redacted: ${charactersRedacted}
}

function getMatchedWords(words1, words2) {
    const getword = words1.filter((text) => words2.includes(text)).length;
    return getword;
  }