// API utilizada:  https://www.scorebat.com/video-api/v1/

const input = document.querySelector('#competitions');
const btn = document.querySelector('#btn-search');
const teams = document.querySelector('.teams');

const renderTeam = (competitionName, date, highlights) => {
  const div = document.createElement('div');
  const spanMatch = document.createElement('span');
  const video = document.createElement('div');
  const dateMatch = document.createElement('span');

  div.className = 'is-flex-direction-column is-align-items-center card has-background-white-bis';
  spanMatch.className = 'is-flex is-align-items-center is-justify-content-center pt-4 title is-4';
  spanMatch.innerHTML = competitionName;
  dateMatch.className = 'is-flex is-align-items-center is-justify-content-center subtitle mt-2';
  dateMatch.innerHTML = `Data: ${date.substring(0, date
    .indexOf('T')).split('-').reverse().join(' - ')}`;
  video.innerHTML = highlights;
  video.className = 'video-container';

  teams.appendChild(div);
  div.appendChild(spanMatch);
  div.appendChild(dateMatch);
  div.appendChild(video);
};

// Falta implementar essa função. Se não encontrar nenhuma partida do comapeonato retorna essa mensagem de erro.
/* const errorMsg = () => {
  const spanError = document.createElement('span');
  spanError.innerText = 'Partida não encontrada';
  spanError.className = 'has-text-centered';
  spanError.id = 'span-error';
  teams.appendChild(spanError);
}; */

const getInformationsMatch = (data) => {
  teams.innerHTML = '';
  
  const result = data
  .forEach(({ title, date, competition: { name }, embed }) => {
    if (name === input.value) {
      renderTeam(`Partida: ${title}`, `${date}`, `${embed}`);
    }
  });
  return result;
};

const fechFootballCompetitions = () => {
  fetch('https://www.scorebat.com/video-api/v1/')
  .then((response) => response.json())
  .then((competitions) => {
    btn.addEventListener('click', () => {
      getInformationsMatch(competitions);
    });
  })
  .catch(() => alert('Erro ao conectar com o servidor'));
};

window.onload = () => {
  fechFootballCompetitions();
};
