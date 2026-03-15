document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchInput = document.getElementById('searchInput');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      if (talk.type === 'break') return true;
      return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredTalks);
  });

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    talksToRender.forEach(talk => {
      const talkElement = document.createElement('div');
      if (talk.type === 'break') {
        talkElement.classList.add('break');
        talkElement.innerHTML = `<h2>${talk.title}</h2><p class="meta">${talk.time}</p>`;
      } else {
        talkElement.classList.add('talk');
        talkElement.innerHTML = `
          <h2>${talk.title}</h2>
          <p class="meta"><strong>Time:</strong> ${talk.time}</p>
          <p class="meta"><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
          <p>${talk.description}</p>
          <div>
            ${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}
          </div>
        `;
      }
      scheduleContainer.appendChild(talkElement);
    });
  }
});
