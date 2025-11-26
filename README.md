# Jeu spatial shooter

## Description du Projet

Ce projet est un mini-jeu web 2D realise dans le cadre d'un cursus B2 Informatique/Cybersecurite. Il met en scene une fusee dans l'espace, controlée a distance.

*   **Écran PC (jeu)** : Affiche la partie (fusee, obstacles, score).
*   **Smartphone (manette)** : Sert de contrôleur (joystick pour le mouvement, boutons pour accelerer et tirer).
*   **Communication** : Temps réel via un serveur Node.js et Socket.IO.

## Technologies utilisées

*   **Node.js** & **npm** : Environnement serveur et gestionnaire de paquets.
*   **Express** : Serveur HTTP.
*   **Socket.IO** : Communication temps reel bidirectionnelle.
*   **HTML / CSS / JavaScript** : Frontend pour les interfaces Desktop et Mobile.

## Structure du projet

```text
jeu-voiture-realtime/
└── server/
    ├── server.js          # Backend Node.js (Express + Socket.IO)
    ├── package.json       # Dependances et scripts npm
    └── public/
        ├── desktop.html   # Interface du jeu (PC)
        ├── mobile.html    # Interface manette (smartphone)
        ├── styles.css     # Styles communs
        └── fighter-jet.svg# Sprite de la fusee / avion
```

## Pré-requis

*   **Node.js** installe (version recente, 18+ recommandée).
*   Un **PC** pour exécuter le serveur et afficher le jeu.
*   Un **Smartphone** pour servir de manette.
*   Les deux appareils doivent être connectés au **même réseau local** :
    *   Soit sur la même box internet.
    *   Soit via le partage de connexion du telephone.

## Installation

1.  Clonez ou téléchargez le projet sur votre ordinateur.
2.  Ouvrez un terminal dans le dossier `server` :
    ```bash
    cd server
    ```
3.  Installez les dépendances :
    ```bash
    npm install
    ```

## Démarrage

Dans le dossier `server`, lancez la commande :

```bash
npm start
```

Le serveur démarrera sur le port 3000. Vous verrez des informations de connexion s'afficher dans le terminal.

## Accès au jeu

### 1. Sur le PC

Sur l'ordinateur où tourne le serveur, ouvrez un navigateur et allez à l'adresse :

```
http://localhost:3000/desktop.html
```

Vous devriez voir la route spatiale, la fusée et le HUD

### 2. Sur le téléphone (manette)

**Important** : Le smartphone doit être sur le meme réseau que le PC.

1.  **Récuperer l'adresse IP locale du PC** :
    *   Ouvrez un terminal (cmd ou PowerShell sur Windows, Terminal sur macOS/Linux).
    *   Tapez `ipconfig` (Windows) ou `ifconfig` (macOS/Linux).
    *   Repérez l'adresse IPv4 de votre carte réseau (ex: `192.168.1.25` ou `172.20.10.5`).

2.  **Ouvrir la manette** :
    *   Sur le smartphone, ouvrez un navigateur (Chrome recommandé).
    *   Entrez l'adresse suivante en remplaçant `ADRESSE_IP_DU_PC` par l'IP trouvée precedemment :
        ```
        http://ADRESSE_IP_DU_PC:3000/mobile.html
        ```

## Controles et gameplay

### Côté mobile (manette)

*   **Joystick** (bas gauche) : Glissez vers la gauche ou la droite pour déplacer la fusée.
*   **Bouton accélérer** (bas droite) : Maintenez pour activer le boost de vitesse. Relachez pour ralentir.
*   **Bouton Tirer** : Appuyez pour tirer un projectile et détruire les obstacles.

### Côté desktop (jeu)

*   La fusée avance automatiquement.
*   La vitesse augmente lors de l'utilisation du boost.
*   Des obstacles (asteroides, etc.) apparaissent et doivent être évités ou detruits.
*   **Game over** : Si la fusée percute un obstacle.

## Détails techniques (Backend)

Le fichier `server.js` gère :
*   La création du serveur Express et HTTP.
*   La gestion des évènements Socket.IO pour le temps réel.
*   La distribution des fichiers statiques du dossier `public/`.

**Évènements principaux :**
*   `control` (Mobile vers serveur) : Envoie les commandes de mouvement et d'accélération.
*   `player-shoot` (Mobile vers serveur) : Déclenche le tir.
*   `update` et `shoot-projectile` (Serveur vers desktop) : Met à jour l'état du jeu sur l'écran principal.

Le serveur écoute sur `0.0.0.0` pour permettre les connexions externes (depuis le smartphone).

## Résolution de problemes

### Le jeu fonctionne sur PC mais pas sur mobile

*   Verifiez que le serveur est bien lancé (pas d'erreur dans le terminal).
*   Assurez-vous que le smartphone et le PC sont sur le **même reseau Wi-Fi**.
*   Verifiez que vous utilisez bien l'adresse IP du PC (et non celle du telephone) dans l'URL mobile.

### Problème de pare-feu

Si l'accès mobile est impossible, le pare-feu de l'ordinateur (Windows Defender, antivirus) bloque peut-etre le port 3000.
*   **Solution** : Autorisez Node.js dans le pare-feu ou créez une regle entrante pour le port TCP 3000.
*   **Test** : Désactivez temporairement le pare-feu pour confirmer que le probleme vient de là.

### Réseau d'école ou d'entreprise

Les réseaux publics ou d'entreprise bloquent souvent la communication directe entre appareils (isolation client).
*   **Solution** : Utilisez le partage de connexion de votre telephone pour créer un reseau local privé entre votre PC et votre smartphone.

## Pistes d'amélioration

*   Ajout d'un menu d'accueil et d'un écran de fin de partie.
*   Système de niveaux de difficulté progressifs.
*   Ajout d'effets sonores.
*   Mode multijoueur.
*   Sauvegarde des scores (Base de données).
