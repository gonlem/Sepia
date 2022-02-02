# Sepia, application d'administration

## Installations préalables

1. Installez Node.js : https://nodejs.org/en/
2. Installez Visual Studio Code : https://code.visualstudio.com/
3. Installez Git : https://git-scm.com/downloads

## Installation locale

### Téléchargement du code source

- Lancez Git Bash
- Placez-vous dans le répertoire où sont enregistrés vos différents projets (Par exemple : C:/dev/prj)
- Éxécutez la commande : git clone https://github.com/gonlem/Sepia.git

### Installation des dépendances

- Ouvrez un terminal (Windows PowerShell) dans Visual Studio Code
- Éxécutez la commande suivante : npm install

### Création d'une base de données MongoDB

- Enregistrez-vous sur https://www.mongodb.com/fr-fr
- Suivez les étapes de ce guide afin de créer une DB gratuite (free tier) : https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database

### Lancement du serveur

- Ouvrez un terminal (Windows PowerShell) dans Visual Studio Code
- Éxécutez la commande : `$ENV:MONGO_DB = "mongodb+srv://Username:Password@ClusterName.qdosd.mongodb.net/DatabaseName?retryWrites=true&w=majority"; npm run devstart`

## Installation sur Google Cloud Platform - App Engine

### Installer Google Cloud SDK

Suivez ce guide pour installer le SDK Cloud : https://cloud.google.com/sdk/docs/install?hl=fr

### Création du fichier app.yaml

Ajoutez un fichier app.yaml à la racine de l'application. La configuration de ce fichier est décrite ici : https://cloud.google.com/appengine/docs/standard/nodejs/config/appref?hl=fr

Voici un exemple de contenu du fichier :
```
runtime: nodejs16
env: standard
instance_class: F1
automatic_scaling:
  max_instances: 2
env_variables:
  MONGO_DB: "mongodb+srv://Username:Password@ClusterName.qdosd.mongodb.net/DatabaseName?retryWrites=true&w=majority"
```
### Déploiement de l'app sur GCP

Pour déployer l'application sur Google Cloud App Engine :
- Ouvrez un terminal (Windows PowerShell) dans Visual Studio Code
- Éxécutez la commande : `gcloud app deploy`
