# Collectorium v8 — instrukcja użycia
Stan: 19 listopada 2026 (wersja 0.10.0). Baza do dalszej pracy: collectorium_v8.

## Co jest aktualne
Statyczny React + JSON i lokalny edytor kolekcji. Książki: 344 rekordy (jedna książka = jeden rekord, z wersjami językowymi i formatami), modele kartonowe: 514, wishlista LEGO: 5 zestawów. Dwa motywy: Latte i Espresso. Strona jest projektowana przede wszystkim pod telefon (iPhone 13 Pro i nowsze): najważniejsze są Książki („czy mam ten tytuł?”) i lista życzeń LEGO, potem Modele, na końcu Wasgij. Wasgij pozostaje „Under construction” (z prostą grafiką). Galerię usunięto; zdjęcia są tylko w starych paczkach ZIP. Dane liczbowo odnoszą się do zawartości paczki; po własnych zmianach liczniki będą inne.

## Pierwsze uruchomienie — Windows
1. Rozpakuj CAŁY ZIP, np. do C:\Projekty\Collectorium. Nie uruchamiaj plików wewnątrz archiwum.
2. Otwórz folder collectorium_v8 zawierający package.json w VS Code albo IntelliJ.
3. Potrzebny jest Node.js wraz z npm. W terminalu sprawdź: node -v oraz npm -v. Projekt wymaga Node 20.19+ albo 22.12+ (starsze wydania 22.x i wersja 21 nie działają z Vite 7); wersji 0.10.0 nie uruchomiono jeszcze przez npm (brak sieci przy przygotowaniu) — po npm ci wykonaj najpierw npm run lint i npm test (patrz „Sprawdzenie i podgląd”). Nie sprawdzano na Windows.
4. Otwórz terminal w tym folderze i wykonaj: npm ci. Internet jest potrzebny do pierwszej instalacji pakietów.
5. Wykonaj: npm run dev. Otwórz adres wypisany przez Vite, zwykle http://localhost:5173/.
6. Terminal musi pozostać uruchomiony. Ctrl+C zatrzymuje stronę.
Przy kolejnych uruchomieniach wystarczy npm run dev. Możesz też użyć URUCHOM_WINDOWS.cmd: instaluje pakiety, jeśli nie ma node_modules, i otwiera przeglądarkę. Po zmianie package-lock.json ponów npm ci.
Nie potrzeba Pythona, FastAPI, Render, klucza API ani pliku .env.

## Przeglądanie kolekcji
Książki: użyj pola wyszukiwania. Kilka słów może pochodzić z różnych kolumn; wszystkie muszą pasować. Polskie znaki i wielkość liter nie są wymagane, np. pilipiuk kuzynki. Każda książka to jeden wpis z jedną lub kilkoma wersjami językowymi, a każda wersja ma własne formaty (paperback, ebook, audiobook). Na liście wygląda to np. tak: „PL paperback, ebook” i „EN audiobook”. Szukać możesz po tytule, autorze, serii, języku (polish albo PL) i formacie. Gdy nic nie pasuje, strona pokazuje komunikat, że nie masz tej książki w kolekcji. Lista jest dopasowana do telefonu, a pole wyszukiwania zostaje na górze ekranu podczas przewijania.
Modele: na telefonie panel filtrów przewija się razem ze stroną, a tabela mieści się w szerokości ekranu. Wybierz Wszystkie / Posiadane / Nieposiadane, opcjonalnie wpisz pełny czterocyfrowy rocznik i frazę. Filtry działają łącznie. Rocznik krótszy niż cztery cyfry nie filtruje. W tabeli: Numer, Skala, Tytuł; rekordy są pogrupowane rocznikami.
LEGO: to lista życzeń, nie kolekcja posiadanych. Kliknięcie otwiera zewnętrzną stronę. Ceny są zapisanymi wartościami orientacyjnymi; nie są automatycznie aktualizowane. Zdjęcia LEGO wymagają połączenia z zewnętrznym serwisem.
Motyw Latte / Espresso wybierzesz w nawigacji; wybór pamięta przeglądarka.

## Użycie na telefonie
Po publikacji otwórz https://wr3dny.github.io/ w Safari na iPhonie. Aby mieć stronę jak aplikację: Udostępnij → „Do ekranu początkowego”. Najszybsza droga do odpowiedzi „czy mam tę książkę?”: zakładka Books i wpisanie fragmentu tytułu lub nazwiska autora.

## Edycja książek i modeli — krok po kroku
1. W lokalnej stronie kliknij „Otwórz lokalny edytor kolekcji” albo otwórz http://localhost:5173/#/editor. Przy innym porcie użyj adresu Vite i dopisz #/editor.
2. Wybierz Książki lub Modele kartonowe i poczekaj na komunikat „Wczytano dane projektu”.
3. Wyszukaj rekord i kliknij go. Lista pokazuje maksymalnie 100 wyników — zawęź szukanie, aby dotrzeć do kolejnych.
4. Popraw pola. ID jest tylko do odczytu, nowe ID powstaje automatycznie. „Dodaj rekord” tworzy pusty wpis; uzupełnij wymagane pola. „Usuń ten rekord” wymaga potwierdzenia.
5. W modelach owned oznacza posiadanie: Tak = true, Nie = false. Książki wymagają title, author i co najmniej jednej wersji językowej (pole editions). W każdej wersji wpisz język (podpowiedzi: polish, english, german; można wpisać inny) i zaznacz formaty paperback, ebook, audiobook. Przyciskiem „Dodaj wersję językową” dopisujesz kolejny język tej samej książki, np. polska wersja papierowa i angielski ebook. Ta sama książka (tytuł + autor) może istnieć tylko w jednym rekordzie — duplikat blokuje eksport, a język lub format dopisz w istniejącym rekordzie. Modele wymagają title, number i dodatniego year. Numer modelu jest tekstem, np. 4a. Puste pola opcjonalne są zapisywane jako null.
6. Usuń błędy walidacji. Niepoprawna kolekcja blokuje eksport.
7. Kliknij „Eksportuj books.json” lub „Eksportuj paperModels.json”. Pobierany jest CAŁY katalog, również rekordy niewidoczne w wynikach wyszukiwania.
8. Znajdź pobrany plik w folderze Pobrane. Przeglądarka może dodać do nazwy „(1)”. Zrób kopię aktualnego pliku z public/data poza tym folderem, np. w swoim folderze kopii zapasowych.
9. Zastąp public/data/books.json lub public/data/paperModels.json pobranym plikiem, zachowując dokładną nazwę bez „(1)”.
10. Odśwież stronę i sprawdź rekord oraz licznik. Dopiero podmiana pliku w projekcie utrwala zmianę dla kolejnych uruchomień i buildów.
Eksport nie podmienia pliku projektu automatycznie. Przed opuszczeniem edytora, również linkiem w menu albo przyciskiem Wstecz, wyeksportuj zmiany. Nie ma automatycznego zapisu roboczego. Przeglądarka ostrzega przy zamykaniu/odświeżaniu karty z niezapisanymi zmianami; wewnętrzna nawigacja nie ma takiej ochrony.
„Import JSON” zastępuje całą roboczą kolekcję, nie scala jej. Wybierz właściwy rodzaj kolekcji przed importem. Niepoprawny import jest odrzucany. „Wczytaj ponownie” odrzuca robocze zmiany i wczytuje plik projektu.
Edytor jest dostępny w npm run dev. W npm run preview i na publicznej stronie nie ma trasy edytora.

## Edycja LEGO
Otwórz src/const/lego.ts. LegoWishlist zawiera pięć wpisów (strona jest przygotowana na około pięć zestawów; w telefonie wyświetlają się w dwóch kolumnach); popraw odpowiedni wpis, zachowując składnię TypeScript. setNumber = numer zestawu, year = rok, price = orientacyjna cena w złotych, url = odnośnik, image = adres zdjęcia, alt = opis zdjęcia, series = seria. Linki i zdjęcia sprawdź w przeglądarce (zdjęcia ładują się z zewnętrznego serwisu). Tu nie używaj historycznego pliku lego-legacy.json. Po zapisie sprawdź widok LEGO i zbuduj stronę ponownie.

## Sprawdzenie i podgląd wersji produkcyjnej
W folderze z package.json wykonaj po kolei:
    npm run lint
    npm test
    npm run build
    npm run preview
Otwórz adres wypisany przez podgląd (zwykle http://localhost:4173/). Nie otwieraj dist/index.html dwuklikiem: JSON wymaga serwera HTTP. Podgląd nie zmienia publicznej strony. Po zmianie danych trzeba ponownie wykonać build.

## Publikacja do wr3dny.github.io (GitHub Actions)
Strona publikuje się sama: plik .github/workflows/deploy.yml uruchamia się po każdym pushu na gałąź main, wykonuje npm ci, lint, testy i build, a potem publikuje dist w GitHub Pages. Pull Request do main uruchamia tylko kontrole, bez publikacji. Ręczne wdrożenie (npm run deploy, gałąź gh-pages) usunięto. W ustawieniach repozytorium (Settings → Pages) źródłem musi być „GitHub Actions”.
Pierwsze wdrożenie v8: 1. Sklonuj repozytorium (WebStorm: File → New → Project from Version Control) i utwórz gałąź collectorium-v8. 2. Usuń ze starego projektu pliki źródłowe i .env, zachowaj foldery .git i .github. 3. Wstaw zawartość collectorium_v8 (bez node_modules i dist); plik .github/workflows/deploy.yml z paczki zastępuje stary. 4. Wykonaj npm ci, npm run lint, npm test, npm run build. 5. Zatwierdź zmiany (commit), wypchnij gałąź collectorium-v8 i na GitHubie utwórz Pull Request do main — kontrole uruchomią się same. 6. Gdy są zielone, wybierz Merge: wtedy strona się publikuje (postęp w zakładce Actions). 7. Sprawdź https://wr3dny.github.io/ i bezpośrednią trasę /#/books; odśwież Ctrl+F5, jeśli widzisz stare dane.
Kolejne zmiany: podmień plik w public/data albo popraw kod, zatwierdź i wypchnij na main (lub przez Pull Request) — reszta dzieje się automatycznie. Sekret VITE_API_URL w ustawieniach repozytorium i stary plik .env nie są już potrzebne; można je usunąć.
base jest względne (./), a routing używa HashRouter. Pliki public/data są dostępne dla każdego odwiedzającego publiczną stronę. Lokalny edytor nie jest panelem logowania ani zabezpieczeniem danych publicznych.

## Zmiana wyglądu i struktura kodu
Kolory, czcionki i promienie zaokrągleń obu motywów są w src/styles/variables.css (sekcje latte i espresso). Styl każdej strony leży obok jej pliku: np. src/pages/Books/Books.module.css, src/pages/Wasgij/Wasgij.module.css (kolory grafiki Wasgij też z variables.css). Menu: src/const/paths.ts. Typy rekordów: src/types/collection.ts. Wczytywanie JSON: src/hooks/useJson.ts (bez zewnętrznej biblioteki). Pola edytora i reguły walidacji: src/utils/collection.ts. Po większych zmianach uruchom npm run format, aby ujednolicić zapis kodu, potem npm run lint i npm test.

## Co gdzie jest
public/data/books.json — jedyne aktywne źródło książek (pole editions: wersje językowe z formatami; skróty języków PL/EN/DE są w BOOK_LANGUAGES w src/types/collection.ts).
public/data/paperModels.json — jedyne aktywne źródło modeli.
src/const/lego.ts — aktywna wishlista LEGO.
archive/wasgij.json — 131 zachowanych rekordów, jeszcze nieużywanych przez widok.
archive/lego-legacy.json — 15 historycznych rekordów; nie oznaczają potwierdzonej kolekcji posiadanych. Folder archive nie jest kopiowany do dist.
src/styles/variables.css — kolory i pozostałe ustawienia motywów.
dist/ — zbudowana strona; nie edytuj jej ręcznie.
.github/workflows/deploy.yml — automatyczna publikacja w GitHub Pages.
RAPORT_POROWNANIA.md — dokładne rozpoznanie paczek, zmiany i wyniki kontroli.

## Gdy coś nie działa
„npm nie jest rozpoznawane”: sprawdź instalację Node/npm i otwórz terminal ponownie.
Błąd npm ci: sprawdź internet, wersję Node i to, czy terminal jest w folderze package.json.
Błąd odczytu JSON: sprawdź składnię, nazwę i położenie pliku oraz używanie adresu HTTP. Przywróć własną kopię, jeśli plik został uszkodzony.
Brak zmiany po eksporcie: podmień właściwy plik w public/data i odśwież stronę. Online: zatwierdź i wypchnij zmianę na main — Actions opublikuje ją w kilka minut.
Brak /editor: użyj npm run dev i adresu z #/editor, nie /editor bez znaku #.
Błąd w zakładce Actions na GitHubie: otwórz nieudane uruchomienie, sprawdź który krok (lint, test, build) zgłosił błąd i uruchom to samo polecenie lokalnie. Nie twórz nowego repozytorium, aby ominąć błąd.
