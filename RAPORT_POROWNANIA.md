# Aktualizacja 19.11.2026 — wersja v8 (0.10.0)

Cel strony: sprawdzenie na telefonie (iPhone 13 Pro i nowsze), czy mam dany tytuł; lista życzeń LEGO (do ok. 5 zestawów); Modele z nieco niższym priorytetem; Wasgij najniższy.

- Książki: jedna książka = jeden rekord. Pola `format` i `language` zastąpione listą `editions`: każda wersja językowa ma własny język i własną listę formatów (np. PL paperback + ebook, EN audiobook). Dotychczasowe 344 rekordy mają po jednej wersji. Edytor: bloki „Wersja 1, 2…”, przycisk „Dodaj wersję językową”, podpowiedzi języków; duplikat tytuł + autor blokuje eksport.
- Strona Książki przebudowana pod telefon: lista kart zamiast 9-kolumnowej tabeli, pole wyszukiwania przypięte u góry (czcionka 16 px, aby iPhone nie powiększał ekranu), skróty języków (PL/EN/DE), wyszukiwanie po języku i formacie, jasny komunikat „Nie masz tej książki w kolekcji”.
- Modele: na telefonie tabela mieści się w szerokości ekranu (węższe kolumny Numer/Skala), panel filtrów nie jest przypięty. LEGO: dwie kolumny na telefonie.
- Sprawdzono w Chromium z emulacją 390×844 (3×): brak poziomego przewijania na stronach Home, Books, Models, LEGO, Wasgij; menu i motyw ciemny działają.
- Ograniczenia kontroli jak w 0.9.0: bez sieci nie uruchomiono npm ci / lint / test / build; testy Vitest przepisane, ale nie uruchomione.

---

# Aktualizacja 19.11.2026 — wersja 0.9.0

Zmiany względem v7/0.8.0 (poniższy opis z 28.10 jest historyczny):
- Usunięto galerię (strona, karuzela, zdjęcia, testy). Wasgij zostaje „Under construction”, dodano grafikę SVG zależną od motywu.
- Książki: pole `format` zastąpione listą `formats` (paperback, ebook, audiobook; dawne „eBook” → ebook, „audio” → audiobook). Usunięto 4 duplikaty o tym samym formacie (ID 93, 145, 297, 298); z #145 do #144 przeniesiono tytuł oryginalny i świat/bohatera. Razem 344 rekordy. Edytor: pola wyboru formatów; duplikat tytuł + autor + język blokuje eksport.
- Usunięto React Query (dwa pliki JSON czyta prosty hook `useJson`) oraz martwy kod: warstwa `api/`, `useFileMetaQuery`, `useToCellValue`, obsługa kolumn tekstowych w tabeli, nieużywane style.
- Kod edytora przepisany czytelniej (konfiguracja pól w `src/utils/collection.ts`); style edytora, Books i Wasgij rozpisane wieloliniowo.
- Poprawki z przeglądu: skrypt motywu w index.html (latte/espresso), `engines` Node `^20.19.0 || >=22.12.0`, logo 517 KB → 46 KB.

Sprawdzenie: bez dostępu do sieci nie uruchomiono npm ci / lint / test / build. Wykonano: kontrolę typów z atrapami bibliotek (bez błędów w kodzie projektu), test w przeglądarce Chromium (esbuild): Książki 344 wiersze, wyszukiwanie po formacie, edytor (zaznaczanie formatu, blokada duplikatu, eksport), Modele 514, LEGO, Wasgij w obu motywach, brak błędów JS. Testy Vitest zostały przepisane, ale nie uruchomione.

---

# Collectorium — rozpoznanie i konsolidacja, 28.10.2026

Baza do dalszej pracy: **collectorium_v7 / 0.8.0**. Realizuje ustalenia z 26.10: statyczny React + JSON i lokalny edytor, bez backendu. Rozwija odnalezioną paczkę `collectorium_static_v6_editor_win10.zip`. Pięć załączonych ZIP-ów pozostawiono bez zmian.

## Co jest czym
| Paczka | Zawartość | Rola |
| --- | --- | --- |
| wr3dny.github.io-main(1).zip | Pierwotny frontend React/Vite/TS, klient zewnętrznego API, starsze komponenty i galerie | Historia strony |
| collectorium-main(1).zip | Python CLI + FastAPI, Render, JSON: 348 książek z firstName/lastName, 514 modeli, 131 Wasgij, 15 LEGO | Stary backend i dane źródłowe |
| collectorium_backend_v2_ksiazki_lego(1).zip | Rozwinięcie backendu, ujednolicone author w książkach, testy, kopia sprzed migracji | Źródło znormalizowanych książek; serwer już niepotrzebny |
| collectorium_frontend_v2_ksiazki_lego(1).zip | Poprawiony frontend, modele i książki, trzy starsze motywy, osobna wishlista 5 LEGO; VITE_API_URL | Wersja pośrednia |
| collectorium_frontend_v4_style(1).zip | Rozwinięcie v2: Latte/Espresso, kawowy styl, nowe wyszukiwanie i książki; nadal wymaga API | Najnowszy wygląd spośród pięciu załączników, ale starsza architektura |
| collectorium_static_v6_editor_win10.zip — odnaleziona wcześniejsza praca z 26.10 | Statyczne JSON, lokalny edytor i package-lock; błędy kompilacji/lintu i starsze instrukcje | Punkt startowy v7 |

Numer v4 dotyczy frontendu, nie całego projektu. collectorium-main jest backendem, mimo nazwy.

## Dane
- 348 rekordów książek, nie 348 autorów. Wszystkie dane books.json są równe backend_v2 po odczycie JSON.
- 514 modeli. Wszystkie dane są równe oryginalnemu katalogowi; nie zmieniono flag owned ani kolejności.
- LEGO: 5 aktywnych wpisów LegoWishlist. Stare 15 rekordów backendu to osobny katalog, nie dowód posiadania i nie wishlista.
- Wasgij: zachowano 131 rekordów w archive/wasgij.json; widok nadal Under construction.
- Galeria nadal Under construction; stare zdjęcia i źródła zachowano do dalszej pracy.

## Zmiany v7
1. Naprawiono błąd TypeScript input w edytorze blokujący build v6.
2. Oddzielono walidację od komponentu, poprawiono nieużywany parametr i zależności hooka książek. Lint jest czysty.
3. ID tylko do odczytu; nowe ID nadal nadawane automatycznie. Nie można przypadkowo stracić zaznaczenia ani nadać ID innego rekordu.
4. Podczas ładowania blokowane są import i przełączanie kolekcji; po błędzie odczytu blokowane jest dodawanie, aby nie zastąpić katalogu pojedynczym wpisem.
5. Wyszukiwanie edytora obsługuje wiele słów i pomija polskie znaki.
6. Poprawiono dwa nieaktualne testy tabeli książek i komunikatów modeli. Dodano testy walidacji danych i edytora.
7. Względne base ./ i HashRouter zapewniają obsługę podkatalogów hostingu.
8. Archiwalne Wasgij przeniesiono poza public/data, stare LEGO dodano do archive; nie trafiają do dist.
9. Stare instrukcje API/trzech motywów zastąpiono przewodnikiem HTML/Markdown; dodano URUCHOM_WINDOWS.cmd. Wersja 0.8.0.

## Sprawdzenie
Linux, Node 24.22.1, npm 11.9.0:
- npm ci — powodzenie, 312 pakietów.
- npm run lint — bez błędów i ostrzeżeń ESLint.
- npm test — 27/27 testów, 5 plików.
- npm run build — TypeScript i Vite zakończone powodzeniem.
- Lokalny podgląd produkcyjny: HTTP 200 dla index, JS, CSS i logo; books/paperModels przez HTTP porównane ze źródłami (348/514).
- Sprawdzono brak komponentu lokalnego edytora w produkcyjnym JavaScript.
- Obie aktywne kolekcje przeszły walidację typów, struktury i unikalności ID.

Nie wykonano testów wizualnych na szerokościach 320/390/768/1280: zabrakło przeglądarki, a pobranie jej nie powiodło się. Nie sprawdzono .cmd na Windows, opublikowanej strony ani zewnętrznych zdjęć LEGO. Niczego nie opublikowano. Testy jsdom nie potwierdzają wyglądu.

## Granice użytkowania
Eksport pobiera plik, ale nie podmienia public/data automatycznie. Edytor nie ma automatycznego zapisu roboczego; przed nawigacją wewnętrzną trzeba eksportować. Ostrzeżenie beforeunload chroni zamknięcie/odświeżenie karty, nie przejście linkiem w menu. Import zastępuje cały katalog. Lista pokazuje pierwsze 100 wyników, eksport obejmuje cały katalog. Ceny/zdjęcia LEGO są zachowanymi wartościami/odnośnikami z projektu, nie wynikiem sprawdzenia aktualnych ofert.
