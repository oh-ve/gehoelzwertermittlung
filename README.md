# Gehölzwertermittlungs-App

## Überblick

Die Gehölzwertermittlungs-App ist eine Webanwendung, die entwickelt wurde, um den Wert von Gehölz auf Basis verschiedener eingegebener Parameter zu berechnen. Das Frontend der Anwendung wurde mit React.js erstellt, während das Backend auf Express.js und MongoDB setzt.

### Hauptfunktionen der Anwendung

Authentifizierung: Die Anwendung erfordert eine Benutzeranmeldung, um Zugang zu den Hauptfunktionen zu erhalten. Dies stellt sicher, dass der Zugriff auf die Berechnungsfunktionen und -ergebnisse sicher und kontrolliert erfolgt.

Berechnung von Gehölzwerten: Benutzer können spezifische Angaben zu Gehölzen eingeben, woraufhin die Anwendung den Wert berechnet. Die genaue Formel und Methode zur Berechnung des Gehölzwertes bleibt im Interesse der Auftraggeberin vertraulich.

Anzeige von Ergebnissen: Nach der Eingabe der Daten und der Durchführung der Berechnung werden die Ergebnisse angezeigt. Benutzer können hier die detaillierten Ergebnisse ihrer Anfragen einsehen.

Datenverwaltung: Die Anwendung ermöglicht es den Benutzern, Daten einzusehen, hinzuzufügen und zu löschen. Dies bietet eine flexible Handhabung der in der Anwendung gespeicherten Informationen.

## Einrichtung

### Voraussetzungen

Folgende Tools müssen installiert sein, um die Anwendung einzurichten:

Node.js  
npm (wird mit Node.js installiert)  
MongoDB  
Git

### Installation

#### Klonen des Repositories

git clone [URL Ihres Git-Repository]  
cd [Ihr Projektname]

#### Backend-Server einrichten

Ins Backend-Verzeichnis navigieren und die [benötigten Abhängigkeiten](#abhängigkeiten-backend) installieren. Anschließend Server mit npm run dev starten:

cd backend  
npm install  
npm run dev

#### Frontend-App einrichten

In einem neuen Terminalfenster ins Frontend-Verzeichnis navigieren, [Abhängigkeiten](#abhängigkeiten-frontend) installieren und Server mit npm start starten:

cd frontend  
npm install  
npm start

## Backend

### Abhängigkeiten Backend

Express  
Mongoose  
CORS  
dotenv  
bcrypt  
jsonwebtoken

### Umgebungsvariablen

Neben der Verbindungs-URI für die MongoDB-Datenbank benötigt die Anwendung ein `SECRET` für die Authentifizierung über JSON Web Tokens (JWT). Dieses Geheimnis wird verwendet, um die Tokens zu signieren und zu verifizieren. Es ist wichtig, dass dieser Wert sicher und geheim gehalten wird.

Für die lokale Entwicklung muss eine `.env`-Datei im Root-Verzeichnis des Backend-Projekts erstellt und folgende Umgebungsvariablen definiert werden:

- `MONGODB_URI`: MongoDB-Verbindungs-URI.
- `SECRET`: Ein starkes, zufälliges Geheimnis für die JWT-Authentifizierung.

Ein Beispiel für die Struktur der `.env`-Datei könnte wie folgt aussehen:

```
MONGODB_URI=ihre_mongodb_uri
SECRET=ihr_sehr_starkes_geheimnis
```

Die `.env`-Datei ist in `.gitignore` enthalten, um sie vor unbeabsichtigter Veröffentlichung zu schützen.

### API-Endpunkte

Basierend auf dem bereitgestellten Code und den Informationen zur Gehölzwertermittlungs-App, hier ist die Auflistung der API-Endpunkte im geforderten Stil:

#### 1. **Benutzeranmeldung**

    Endpunkt: POST /user/login

    Beispiel-Anfrage:

    ```json
    {
      "username": "Benutzername",
      "password": "Passwort"
    }
    ```

#### 2. **Benutzerregistrierung**

    Endpunkt: POST /user/signup

    Beispiel-Anfrage:

    ```json
    {
      "username": "Benutzername",
      "password": "Passwort"
    }
    ```

#### 3. **Alle Benutzer abrufen**

    Endpunkt: GET /user/users

#### 4. **Einzelnen Benutzer abrufen**

    Endpunkt: GET /user/:id
    URL-Parameter: 'id': Die Benutzer-ID.

#### 5. **Alle Benutzer löschen**

    Endpunkt: DELETE /user/delete

#### 6. **Einzelnen Benutzer löschen**

    Endpunkt: DELETE /user/:id
    URL-Parameter: 'id': Die Benutzer-ID.

#### 7. **Alle Pflanzen abrufen**

    Endpunkt: GET /pflanzen/

#### 8. **Pflanze erstellen**

    Endpunkt: POST /pflanzen/

    Beispiel-Anfrage:

    ```json
    {
            "pflanzenart": "Kirschbaum",
            "anschaffungskosten": 35,
            "hoehe": 200,
            "pflegekostenProJahr": 3.15,
            "pflegejahre": 5,
            "alter": 7,
            "engstand": 0,
            "schaeden": 5,
            "pflegemaengel": 5,
            "anschaffungshoehe": 100,
            "pflanzung": 2,
            "risiko": 0,
            "lebenserwartung": 80,
            "funktionserfuellung": 4

    }
    ```

#### 9. **Alle Pflanzen löschen**

    Endpunkt: DELETE /pflanzen/

#### 10. **Einzelne Pflanze löschen**

     Endpunkt: DELETE /pflanzen/del/:plantId
     URL-Parameter: 'plantId': Die Pflanzen-ID.

## Frontend

### Abhängigkeiten Frontend

react-router-dom
axios
react-icons
react-jwt

### Gliederung

App.js: Als zentrale Komponente definiert App.js die grundlegende Struktur der Anwendung und verwaltet die Navigation zwischen verschiedenen Seiten mithilfe von react-router-dom. Diese Komponente steuert die Darstellung der unterschiedlichen Ansichten und Komponenten basierend auf dem aktuellen Navigationskontext.

Login.js: Die Login-Komponente ermöglicht es Benutzern, sich zu authentifizieren, um auf die Anwendung zuzugreifen.

Rechner.js: Diese Komponente ist das Herzstück der App und ermöglicht es den Benutzern, verschiedene Parameter zur Berechnung des Wertes von Gehölz einzugeben. Sie bietet ein benutzerfreundliches Formular, um die erforderlichen Daten zu erfassen.

Ergebnis.js: Nach der Berechnung werden die Ergebnisse in dieser Komponente angezeigt. Sie präsentiert die berechneten Werte übersichtlich in einer Tabelle.

Liste.js: Diese Komponente umfasst alle bisher eingegebenen Daten. Sie kann nach Pflanzenart gefiltert und nach allen Parametern sortiert werden. Die Einträge können bei Bedarf einzeln gelöscht werden.

### Datenverwaltung

Für das Datenmanagement und die Kommunikation mit dem Backend wird Axios verwendet. Axios ermöglicht es, asynchron Daten von der Backend-API abzurufen, zu senden und zu verarbeiten. Dies umfasst sowohl die Authentifizierung der Benutzer als auch die Abfrage und Übermittlung von Pflanzendaten.
