# Laboratorium PIW

## Wykorzystane narzędzia

| Narzędzie         | Wersja               |
| :---------------- | :------------------- |
| Docker            | 19.03.10-ce          |
| System operacyjny | Manjaro Linux 20.0.2 |

## Opis

Rozwiązania obejmują ćwiczenie 1 z laboratorium nr 6.

## Przygotowanie do uruchomienia

Przejdź do katalogu projektu zawierającego plik `package.json`. Zainstaluj wymagane narzędzia poprzez menadżer pakietów _npm_:

```
npm install
```

## Rozwiązania

### Zadanie 1, 2 (fibonacci)

Implementacja funkcji `fibonacci(n)` znajduje się w `src/math.js`.

Aby uruchomić program ograniczony do _STDOUT_, uruchom komendę:

```
node src/index.js 2> /dev/null
```

Aby uruchomić program ograniczony do _STDERR_, uruchom komendę:

```
node src/index.js 1> /dev/null
```

### Zadanie 3.1 (one-liner-joke)

Uruchom program wywołując:
```
node src/joke.js
```

### Zadanie 3.2 (axios)

Uruchom program wywołując:
```
node src/axiosTest.js
```

### Zadanie 4, 5 (serwer HTTP, Docker)

#### Zbudowanie obrazu Dockera

`docker-compose build`

#### Uruchomienie

Jeżeli obraz nie istnieje, zostaje zbudowany przed uruchomieniem.

`docker-compose up`

#### Dostęp do serwera HTTP

Uruchomiony serwer HTTP wraz z odnośnikami do dostępnych endpointów udostępniony jest pod adresem `localhost:8088`.
