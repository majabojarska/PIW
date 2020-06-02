# Laboratorium 1

Statyczna strona internetowa, oparta o framework Bootstrap v3.3.7.

## Wykorzystane narzędzia

| Narzędzie         | Wersja               |
| :---------------- | :------------------- |
| Docker            | 19.03.7-ce           |
| System operacyjny | Manjaro Linux 19.0.2 |

## Uruchomienie

### Budowanie obrazu

Obraz jest budowany z wykorzystaniem pliku `Dockerfile`, określającego obraz bazowy (*nginx*) oraz dodatkowe operacje, jakie należy wykonać, aby uzyskać pożądany obraz docelowy.

`docker build -f docker/Dockerfile -t majabojarska/lab1 .`

### Uruchomienie kontenera

Serwer NGINX uruchomiony wewnątrz kontenera, domyślnie słucha zapytań HTTP na porcie 80. Ten port zostaje udostępniony na porcie hosta, o numerze 8080. 

`docker run -p 8080:80 majabojarska/lab1:latest`
