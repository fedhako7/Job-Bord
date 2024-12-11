const content = document.getElementById('content');

function loadContent(file) {
  fetch(`./html/${file}`)
    .then(response => response.text())
    .then(html => content.innerHTML = html);
}

const defaultPage = Math.random() > 0.5 ? 'dad.html' : 'mom.html';
loadContent(defaultPage);

document.getElementById('viewDad').addEventListener('click', () => loadContent('dad.html'));
document.getElementById('viewMom').addEventListener('click', () => loadContent('mom.html'));
