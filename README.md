# Strona API - Inwentaryzacje

Aplikacja webowa wyświetlająca dostępne inwentaryzacje z API z możliwością filtrowania.

## Funkcjonalności

- 📋 **Wyświetlanie inwentaryzacji** - pobiera dane z API inwentury.pl dla województwa śląskiego
- 🔍 **Filtry**:
  - Ukrywanie przepełnionych inwentaryzacji (lista rezerwowa)
  - Ukrywanie ofert wyjazdowych (z transportem)
- 📱 **Responsywny design** - działa na wszystkich urządzeniach
- ⚡ **Dynamiczne filtrowanie** - filtry działają natychmiast

## Struktura projektu

```
strona_api/
├── index.html          # Główna strona HTML
├── index.js            # Logika JavaScript
├── package.json        # Konfiguracja projektu
├── api_zawartosc.txt   # Przykładowe dane z API
└── README.md           # Ten plik
```

## Jak używać

1. Otwórz `index.html` w przeglądarce
2. Strona automatycznie pobierze aktualne dane z API
3. Użyj filtrów na górze strony:
   - **"Ukryj przepełnione"** - ukrywa inwentaryzacje gdzie liczba osób osiągnęła maksimum (np. 11/11)
   - **"Ukryj oferty wyjazdowe"** - ukrywa oferty z zapewnionym transportem

## Wyświetlane informacje

Dla każdej inwentaryzacji pokazane są:
- 📍 Lokalizacja (miasto, adres)
- 🗓️ Data i godzina rozpoczęcia
- 💰 Stawka za godzinę
- 👥 Liczba miejsc (aktualna/maksymalna)
- 🏪 Typ klienta
- 🛒 Nazwa klienta
- 👨‍💼 Dane opiekuna projektu
- 🚌 Informacje o transporcie (jeśli dostępny)
- 🎁 Premie (jeśli dostępne)

## Technologie

- **HTML5** - struktura strony
- **CSS3** - stylowanie i responsywność
- **JavaScript (ES6+)** - logika aplikacji
- **Fetch API** - pobieranie danych z API
- **Git** - kontrola wersji

## API

Aplikacja pobiera dane z:
```
https://api.inwentury.pl/errands.json?province=9
```

Gdzie `province=9` oznacza województwo śląskie.

## Instalacja lokalna

1. Sklonuj repozytorium:
```bash
git clone https://github.com/JanDziaslo/strona_api.git
```

2. Otwórz `index.html` w przeglądarce

Lub uruchom lokalny serwer:
```bash
cd strona_api
python -m http.server 8000
# lub
npx serve .
```

## Autor

Projekt utworzony przez Jana Dziasło

## Licencja

MIT License
