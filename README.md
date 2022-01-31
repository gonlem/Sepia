# Sepia, application d'administration

## Installations préalables

1. Installer Node.js : https://nodejs.org/en/
2. Installer Visual Studio Code : https://code.visualstudio.com/
3. Installer Git : https://git-scm.com/downloads

## Installation locale

### Téléchargement du code source

- Lancer Git Bash
- Se placer dans le répertoire souhaité (Par exemple : C:/dev/prj)
- Éxécuter la commande : git clone https://github.com/gonlem/Sepia.git

### Installation des dépendances

- Ouvrez un terminal (Windows PowerShell) dans Visual Studio Code
- Éxécuter la commande suivante : npm install

### Création d'une base de données MongoDB

- Enregistrez-vous sur https://www.mongodb.com/fr-fr
- Suivez les étapes de ce guide afin de créer une DB gratuite (free tier) : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database

### Lancement du serveur

- Ouvrez un terminal (Windows PowerShell) dans Visual Studio Code
- Éxécuter la commande : $ENV:MONGO_DB = "mongodb+srv://Username:Password@cluster0.qdosd.mongodb.net/Sepia?retryWrites=true&w=majority"; npm run devstart