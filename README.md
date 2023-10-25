# multimedia-chat

## Description
Une application de chat multimedia en temps réel développée avec Node.js, React Native et Socket.io.

## Fonctionnalités
- Authentification utilisateur
- Création de conversations
- Envoi de messages textuels, images et vidéos

## Configuration requise
- Node.js
- docker-compose
- npm
- React Native
- Expo

## Installation
Dans le dossier back et front lancer : `npm i` <br>
Créer un fichier `config.local.json` dans back et front et renseigner sont adresse ip privé (en suivant le schema du fichier config.json)

## Launch
Dans le dossier front : `npm run start` <br>
Dans le dossier back : `docker-compose up -d --build` puis `npm run start` <br>

