document.getElementById('redact-button').addEventListener('click', function () {
    const startTime = new Date();
    const content = document.getElementById('content').value;
    
    const wordsToRedact = document.getElementById('wordsToRedact').value.split(' ');
  
    const replacementChar = document.getElementById('replacementChar').value || '*';
    
    const redactedContent = redactContent(content, wordsToRedact, replacementChar);
    document.getElementById('redacted-content').textContent = redactedContent;

    // Calculate and display statistics
    const stats = getRedactionStats(content, redactedContent, startTime);
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
    const wordsRedacted = redactedContent.split(/\s+/).length;
    const charactersRedacted = redactedContent.length;

    
    const endTime = new Date();
    const timeTaken = (endTime - startTime)/1000; // in seconds

    return `Words Scanned: ${wordsScanned}, Words Redacted: ${wordsRedacted}, Characters Redacted: ${charactersRedacted}, Time Taken: ${timeTaken} seconds`;
}

