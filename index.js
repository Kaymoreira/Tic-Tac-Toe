document.getElementById('ButtonIa').addEventListener('click', function() {
    window.location.href = '/game?iaStarts=true';
})
document.getElementById('ButtonPlayer').addEventListener('click', function() {
    window.location.href = '/game?iaStarts=false';
})