const vowels = ['a','e','i','o','u','A','E','I','O','U'];

function preserveCase(original, transformed){
  if (!original) return transformed;
  if (original === original.toUpperCase()) return transformed.toUpperCase();
  if (original[0] === original[0].toUpperCase()) return transformed[0].toUpperCase() + transformed.slice(1).toLowerCase();
  return transformed.toLowerCase();
}

function pigLatinWord(word){
  if (!word || !/[A-Za-z]/.test(word)) return word;
  const leading = word.match(/^\W+/) ? word.match(/^\W+/)[0] : '';
  const trailing = word.match(/\W+$/) ? word.match(/\W+$/)[0] : '';
  const core = word.slice(leading.length, word.length - trailing.length);

  let firstVowelIdx = -1;
  for (let i=0; i<core.length; i++){
    if (vowels.includes(core[i])){ firstVowelIdx = i; break; }
  }

  let transformed;
  if (firstVowelIdx === 0){
    transformed = core + 'yay';
  } else if (firstVowelIdx > 0){
    const head = core.slice(0, firstVowelIdx);
    const rest = core.slice(firstVowelIdx);
    transformed = rest + '-' + head + 'ay';
  } else {
    transformed = core + 'ay';
  }

  transformed = preserveCase(core, transformed);
  return leading + transformed + trailing;
}

function pigLatinPhrase(text){
  return text.split(/(\s+)/).map(token => pigLatinWord(token)).join('');
}

document.getElementById('convertBtn').addEventListener('click', () => {
  const input = document.getElementById('inputWord').value.trim();
  const result = pigLatinPhrase(input);
  document.getElementById('result').textContent = result || 'Please enter a word.';
});

document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('inputWord').value = '';
  document.getElementById('result').textContent = 'Your Pig Latin result will appear here.';
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('result').textContent;
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
});
