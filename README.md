# Hackathon Orange - Safe Zone

Bienvenue sur le projet d'un **Hackathon organisé par Orange !** Ce projet a été réalisé avec 4 de mes collègues. Il utilise des API fournies par Orange pour créer une solution innovante axée sur la protection des familles.

## Fonctionnalités principales

- **Géolocalisation en temps réel** : Utilisation de l'API Device Location Retrieval pour localiser un appareil mobile.
- **Zones de sécurité** : Création de zones "safe" (vertes) et "interdites" (rouges) avec des restrictions horaires.
- **Notifications** : Alertes automatiques lorsqu'un appareil entre ou sort des zones définies.
- **Carte interactive** : Visualisation des zones sécurisées sur une carte.

## Technologies utilisées

- **HTML/CSS/JavaScript** : Développement front-end de l'interface utilisateur.
- **APIs Orange** :
  - Geofencing API : Gestion des zones et des alertes.
  - Device Location Retrieval API : Localisation des appareils.
- **API OpenStreetMap  : Intégration d'une carte interactive.**

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Un navigateur web moderne (Chrome, Firefox, Edge).
- Accès à une clé API Orange pour les appels API.


## Visualisation[
Le projet est déployé sur Vercel via ce [lien](https://hackathon-orange.vercel.app/)


## Installation

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Vespid90/Hackathon-orange.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd Hackathon-orange
   ```

3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```
4. Configurez vos variables d'environnement :
- Renommez le fichier .env.example en .env (s'il existe) ou créez un fichier .env.

- Ajoutez-y les variables nécessaires, par exemple :
   ```bash
   PORT=3000
   API_KEY
   ```
## Lancement

1. Démarrez l'application en mode développement :

   ```bash
   npm run dev
   ```
2. Ouvrez votre navigateur et accédez à :

   ```bash
   http://localhost:3000
   ```

1) Connectez-vous avec les informations d’authentification fournies (ou configurez-les si applicable).
2) Définissez des zones sécurisées ou interdites en cliquant sur la carte interactive.
3) Recevez des notifications en temps réel sur l'activité dans ces zones.

## Détails techniques

- **Appels API** :

  - Geofencing API : Pour définir les zones et les alertes associées.
  - Device Location Retrieval API : Pour localiser un appareil mobile.
  - API OpenStreetMap : Pour afficher une carte interactive.

- **Structure du projet** :

  - `index.html` : Page principale.
  - `styles.css` : Feuilles de style pour l’interface utilisateur.
  - `script.js` : Logique principale, y compris les appels API et les interactions utilisateur.

## Améliorations possibles

- Ajouter un historique des notifications.
- Intégrer un système de permissions pour différencier les utilisateurs (admin, utilisateur standard).
- Proposer une fonctionnalité d'envoi de SMS via les APIs Orange.
- Améliorer le design avec des animations et des transitions.

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer. Consultez le fichier `LICENSE` pour plus d'informations.

---

Merci de votre intérêt pour ce projet ! Si vous avez des questions ou des suggestions, n’hésitez pas à me contacter.

