document.getElementById('redact-button').addEventListener('click', function () {
    
    const content = document.getElementById('content').value;
    
    const wordsToRedact = document.getElementById('wordsToRedact').value.split(' ');
    alert(wordsToRedact)
    const replacementChar = document.getElementById('replacementChar').value || '*';
    alert(replacementChar)
    const redactedContent = redactContent(content, wordsToRedact, replacementChar);
    document.getElementById('redacted-content').textContent = redactedContent;

    // Calculate and display statistics
    const stats = getRedactionStats(content, redactedContent);
    document.getElementById('stats').textContent = stats;
});

function redactContent(content, wordsToRedact, replacementChar) {
    wordsToRedact.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        content = content.replace(regex, replacementChar.repeat(word.length));
    });
    return content;
}

function getRedactionStats(originalContent, redactedContent) {
    const wordsScanned = originalContent.split(/\s+/).length;
    const wordsRedacted = redactedContent.split(/\s+/).length;
    const charactersRedacted = originalContent.length - redactedContent.length;

    const startTime = new Date();
    const endTime = new Date();
    const timeTaken = (endTime - startTime); // in seconds

    return `Words Scanned: ${wordsScanned}, Words Replaced: ${wordsRedacted}, Characters Redacted: ${charactersRedacted}, Time Taken: ${timeTaken} seconds`;
}





// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("scrambler-form");
//     const originalText = document.getElementById("original-text");
//     const wordsToScramble = document.getElementById("words-to-scramble");
//     const redactButton = document.getElementById("redact-button");
//     const scrambledText = document.getElementById("scrambled-text");
//     const wordsScanned = document.getElementById("words-scanned");
//     const wordsScrambled = document.getElementById("words-scrambled");
//     const charactersScrambled = document.getElementById("characters-scrambled");
//     const timeTaken = document.getElementById("time-taken");

//     redactButton.addEventListener("click", function() {
//         const startTime = Date.now();
//         const originalContent = originalText.value;
//         const words = wordsToScramble.value.split(" ");

//         let scrambledContent = originalContent;

//         words.forEach(word => {
//             const regex = new RegExp(word, "g");
//             scrambledContent = scrambledContent.replace(regex, "**");
//         });

//         const endTime = Date.now();
//         const elapsedSeconds = (endTime - startTime) / 1000;

//         scrambledText.textContent = scrambledContent;
//         wordsScanned.textContent = originalContent.split(/\s+/).length;
//         wordsScrambled.textContent = words.length;
//         charactersScrambled.textContent = scrambledContent.length;
//         timeTaken.textContent = elapsedSeconds.toFixed(2);
//     });
// });