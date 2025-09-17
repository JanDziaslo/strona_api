console.log('Happy developing ✨')

let allData = []; // Przechowuje wszystkie dane

// Funkcja do przełączania ciemnego motywu
function toggleDarkMode() {
  const isDarkMode = document.getElementById('dark-mode').checked;
  const body = document.body;

  if (isDarkMode) {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}

// Inicjalizacja motywu na podstawie zapisanych preferencji
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const darkModeCheckbox = document.getElementById('dark-mode');

  if (savedTheme === 'dark') {
    darkModeCheckbox.checked = true;
    document.body.setAttribute('data-theme', 'dark');
  } else {
    darkModeCheckbox.checked = false;
    document.body.removeAttribute('data-theme');
  }
}

function renderInwentaryzacje(data) {
  const container = document.getElementById('inwentaryzacje');
  if (!container) return;

  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:#888;">Brak dostępnych inwentaryzacji spełniających kryteria.</div>';
    return;
  }

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'inwentaryzacja';
    div.innerHTML = `
      <h2>${item.name}</h2>
      <div class="adres">
        <b>${item.project.city.name}</b>, ${item.project.address}
      </div>
      <div class="info">
        <span title="Data i godzina"><b>🗓️</b> ${item.projectLocation.startAt.replace('T', ' ').slice(0, 16)}</span>
        <span title="Stawka"><b>💰</b> ${item.project.rate} zł/h</span>
        <span title="Liczba miejsc"><b>👥</b> ${item.currentWorkersNumber} / ${item.maxWorkersNumber}</span>
        <span title="Typ klienta"><b>🏪</b> ${item.project.customerType}</span>
        <span title="Klient"><b>🛒</b> ${item.project.customer?.name || ''}</span>
      </div>
      <div class="opiekun">
        <b>Opiekun:</b> ${item.project.projectSupervisor.recruiter.firstName} ${item.project.projectSupervisor.recruiter.lastName}
        (<a href="mailto:${item.project.projectSupervisor.recruiter.email}">${item.project.projectSupervisor.recruiter.email}</a>)
      </div>
      ${item.details ? `<div class="szczegoly"><b>Szczegóły:</b> ${item.details}</div>` : ''}
      ${item.transportLocation ? `
        <div class="szczegoly">
          <b>Transport z:</b> ${item.transportLocation.city.name}, ${item.transportLocation.address || ''}<br>
          <b>Godzina wyjazdu:</b> ${item.transportLocation.date.replace('T', ' ').slice(0, 16)}<br>
          ${item.transportLocation.details ? `<span>${item.transportLocation.details}</span>` : ''}
        </div>
      ` : ''}
      ${item.prizes && item.prizes.length > 0 ? `
        <div class="szczegoly">
          <b>Premie:</b>
          <ul>
            ${item.prizes.map(prize => `<li>${prize.name}: ${prize.value} zł</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      <hr>
    `;
    container.appendChild(div);
  });
}

function applyFilters() {
  const ukryjPelne = document.getElementById('ukryj-pelne').checked;
  const ukryjWyjazdowe = document.getElementById('ukryj-wyjazdowe').checked;

  let filteredData = allData.filter(item => {
    // Filtr dla przepełnionych inwentaryzacji (lista rezerwowa)
    if (ukryjPelne && item.currentWorkersNumber >= item.maxWorkersNumber) {
      return false;
    }

    // Filtr dla ofert wyjazdowych (z transportem)
    if (ukryjWyjazdowe && item.transportLocation) {
      return false;
    }

    return true;
  });

  renderInwentaryzacje(filteredData);
}

fetch('https://api.inwentury.pl/errands.json?province=9')
  .then(response => response.json())
  .then(data => {
    // Pokazuj tylko dostępne inwentaryzacje
    allData = data.filter(item => item.public && item.status === "published");

    // Dodaj event listenery do filtrów
    document.getElementById('ukryj-pelne').addEventListener('change', applyFilters);
    document.getElementById('ukryj-wyjazdowe').addEventListener('change', applyFilters);
    document.getElementById('dark-mode').addEventListener('change', toggleDarkMode);

    // Pierwszy render
    applyFilters();

    // Inicjalizuj motyw po załadowaniu danych
    initTheme();
  })
  .catch(err => {
    document.getElementById('inwentaryzacje').innerText = 'Błąd ładowania danych';
  });
