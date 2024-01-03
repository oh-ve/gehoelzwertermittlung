# 🌳 Gehölzwertermittlungs-App

##### Deutsch

[English below](#english)

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

#### Klonen des Repositorys

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

Die `.env`-Datei ist in `.gitignore` enthalten, um sie vor unbeabsichtigter Veröffentlichung zu schützen. Eine `sample.env`-Datei wurde hinzugefügt, in die der Benutzer seine Variablen eintragen und die Datei anschließend in `.env` umbenennen kann.

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

Anmerkung: Beim Erstellen einer Pflanze wird automatisch der Wert der Pflanze anhand der eingegebenen Parameter berechnet. Die eigentliche Berechnungslogik ist allerdings in einer eigenen Datei gespeichert, die in .gitignore enthalten ist, um vertraulich zu bleiben. Damit ein neuer Eintrag erstellt werden kann, muss zuerst vom Nutzer eine Datei createPlant.js im Ordner controllers angelegt werden, die eine eigene Berechnungsformel enthält.

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

# 🌳 Plant Valuation App

##### English

[Back to German](#deutsch)

## Overview

The Plant Valuation App is a web application developed to calculate the value of plants based on various entered parameters. The frontend of the application was created with React.js, while the backend relies on Express.js and MongoDB.

### Main Features of the Application

Authentication: The application requires user login to access the main features. This ensures that access to the calculation functions and results is secure and controlled.

Calculation of Plant Values: Users can enter specific details about plants, after which the application calculates their value. The exact formula and method for calculating plant value remain confidential in the interest of the client.

Display of Results: After entering the data and performing the calculation, the results are displayed. Users can view the detailed results of their queries here.

Data Management: The application allows users to view, add, and delete data. This provides flexible handling of the information stored in the application.

## Setup

### Prerequisites

The following tools must be installed to set up the application:

Node.js  
npm (installed with Node.js)  
MongoDB  
Git

### Installation

#### Cloning the Repository

```
git clone [URL of your Git repository]
cd [Your project name]
```

#### Setting Up Backend Server

Navigate to the backend directory and install the [required dependencies](#backend-dependencies). Then start the server with npm run dev:

```
cd backend
npm install
npm run dev
```

#### Setting Up Frontend App

In a new terminal window, navigate to the frontend directory, install [dependencies](#frontend-dependencies), and start the server with npm start:

```
cd frontend
npm install
npm start
```

## Backend

### Backend Dependencies

Express  
Mongoose  
CORS  
dotenv  
bcrypt  
jsonwebtoken

### Environment Variables

In addition to the connection URI for the MongoDB database, the application requires a `SECRET` for authentication via JSON Web Tokens (JWT). This secret is used to sign and verify the tokens. It's important to keep this value secure and confidential.

For local development, a `.env` file must be created in the root directory of the backend project, and the following environment variables defined:

- `MONGODB_URI`: MongoDB connection URI.
- `SECRET`: A strong, random secret for JWT authentication.

An example of the `.env` file structure could look like this:

```
MONGODB_URI=your_mongodb_uri
SECRET=your_very_strong_secret
```

The `.env` file is included in `.gitignore` to protect it from accidental publication. A sample.env has been added where the user can insert their variables and rename the file to .env.

### API Endpoints

#### 1. **User Login**

    Endpoint: POST /user/login

    Example Request:

    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```

#### 2. **User Registration**

    Endpoint: POST /user/signup

    Example Request:

    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```

#### 3. **Retrieve All Users**

    Endpoint: GET /user/users

#### 4. **Retrieve Single User**

    Endpoint: GET /user/:id
    URL Parameter: 'id': The user ID.

#### 5. **Delete All Users**

    Endpoint: DELETE /user/delete

#### 6. **Delete Single User**

    Endpoint: DELETE /user/:id
    URL Parameter: 'id': The user ID.

#### 7. **Retrieve All Plants**

    Endpoint: GET /plants/

#### 8. **Create Plant**

Note: When creating a plant, the value of the plant is automatically calculated based on the entered parameters. However, the actual calculation logic is stored in a separate file included in .gitignore to remain confidential. To create a new entry, users must first create a file createPlant.js in the controllers folder containing their own calculation formula.

    Endpoint: POST /plants/

    Example Request:

    ```json
    {
            "pflanzenart": "Apple tree", //Type of plant
            "anschaffungskosten": 35, // Purchase cost
            "hoehe": 200, // Height of plant
            "pflegekostenProJahr": 3.15, // Maintenance cost per year
            "pflegejahre": 5, // Maintenance years
            "alter": 7, //Age
            "engstand": 0, //Crowding
            "schaeden": 5, //Damage
            "pflegemaengel": 5, //Maintenance defiency
            "anschaffungshoehe": 100, //Purchase height
            "pflanzung": 2, //Planting
            "risiko": 0, //Risk
            "lebenserwartung": 80, //Life expectancy
            "funktionserfuellung": 4 //Years until function fulfillment

    }
    ```

#### 9. **Delete All Plants**

    Endpoint: DELETE /plants/

#### 10. **Delete Single Plant**

     Endpoint: DELETE /plants/del/:plantId
     URL Parameter: 'plantId': The plant ID.

## Frontend

### Frontend Dependencies

react-router-dom  
axios  
react-icons  
react-jwt

### Structure

App.js: As the central component, App.js defines the basic structure of the application and manages navigation between different pages using react-router-dom. This component controls the display of different views and components based on the current navigation context.

Login.js: The Login component allows users to authenticate to access the application.

Calculator.js: This component is the heart of the app and allows users to enter various parameters to calculate the value of trees. It offers a user-friendly form to capture the required data.

Results.js: After calculation, the results are displayed in this component. It presents the calculated values clearly in a table.

List.js: This component includes all previously entered data. It can be filtered by plant type and sorted by all parameters. Entries can be deleted individually if necessary.

### Data Management

Axios is used for data management and communication with the backend. Axios allows asynchronously retrieving, sending, and processing data from the backend API. This includes both the authentication of users and the querying and transmission of plant data.
