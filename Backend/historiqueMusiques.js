const musiques = [];

function addMusique({ nom, photo }) {
  const musique = { nom, photo };
  musiques.push(musique);
}

function GetMusiques() {
  return [...new Set(musiques)];
}

module.exports = { addMusique, GetMusiques };
