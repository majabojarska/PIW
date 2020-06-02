# Laboratorium PIW

## Wykorzystane narzędzia

| Narzędzie         | Wersja               |
| :---------------- | :------------------- |
| Docker            | 19.03.7-ce           |
| System operacyjny | Manjaro Linux 19.0.2 |

## Opis aplikacji

Aplikacja jest prostą stroną internetową opartą na bibliotece React. Obejmuje zadania 1,2 oraz 3. 
- Zadanie 1 - strona powitalna.
- Zadanie 2 - przycisk "Show/Hide distributions".
- Zadanie 3 - lista dostępnym dystrybucji systemu Manjaro.

## Zbudowanie obrazu Dockera

`docker-compose build`

## Uruchomienie
Jeżeli obraz nie istnieje, zostaje zbudowany przed uruchomieniem.

`docker-compose up`

Uruchomiona aplikacja dostępna jest pod adresem `localhost:8080`.
