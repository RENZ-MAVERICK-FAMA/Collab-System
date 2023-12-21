const lookupForm = document.getElementById('lookupForm');
const wordInput = document.getElementById('word');
const modal = document.getElementById('myModal');
const modalContent = document.getElementById('modalContent');
const api_url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function getDefinition(word) {
  try {
    const response = await fetch(api_url + word);
    const data = await response.json();

    if (response.ok) {
      displayDefinition(data);
      openModal();
    } else {
      displayError(`Failed to retrieve definition. Status code: ${response.status}`);
    }
  } catch (error) {
    displayError(`Error: ${error.message}`);
  }
}

function displayDefinition(data) {
  modalContent.innerHTML = ''; // Clear previous content

  data.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.innerHTML = `<strong>${entry.word}</strong> (${entry.phonetic})`;

    entry.phonetics.forEach(phonetic => {
      entryDiv.innerHTML += `<div>Phonetic: ${phonetic.text}</div>`;
      if (phonetic.audio) {
        entryDiv.innerHTML += `<div>Audio: <a href="${phonetic.audio}" target="_blank">Listen</a></div>`;
      }
    });

    entry.meanings.forEach(meaning => {
      entryDiv.innerHTML += `<div>${meaning.partOfSpeech}</div>`;
      meaning.definitions.forEach(definition => {
        entryDiv.innerHTML += `<ul>`;
        entryDiv.innerHTML += `<li><strong>Definition:</strong> ${definition.definition}</li>`;
        if (definition.synonyms.length > 0) {
          entryDiv.innerHTML += `<li><strong>Synonyms:</strong> ${definition.synonyms.join(', ')}</li>`;
        }
        if (definition.antonyms.length > 0) {
          entryDiv.innerHTML += `<li><strong>Antonyms:</strong> ${definition.antonyms.join(', ')}</li>`;
        }
        entryDiv.innerHTML += `</ul>`;
      });
    });

    modalContent.appendChild(entryDiv);
  });
}

function displayError(errorMessage) {
  modalContent.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
}

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

lookupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const word = wordInput.value;
  getDefinition(word);
});
