/Hackathon-Orange
│
├── /assets                         # Dossier des médias.
│   └── /img                        # Dossier pour les images.
│
├── /controllers                    # Logique intermédiaire entre le modèle et les services (MVC).
│   ├── FetchingController.js       # Contrôleur pour les données.
│   ├── LocationController.js       # Contrôleur pour les localisations.
│   └── ZoneController.js           # Contrôleur pour les zones.
│
├── /docs                           # Documentation du projet.
│   ├── structure.md                # Structure détaillée du projet.
│   └── style-guide.md              # Règles de la charte graphique
│
├── /models                         # Modèles de données.
│   ├── LocationModel.js            # Classes ou fonctions pour les localisations.
│   └── ZoneModel.js                # Classes ou fonctions pour les zones.
│
├── /public                         # Fichiers accessibles par le navigateur.
│   ├── index.html                  # Page principale.
│   └── style.css                   # Fichier CSS
│
├── /services                       # Services ou utilitaires logiques.
│   ├── FirebaseService.js          # Service Firebase.
│   ├── GeoFencingService.js        # Service de géorepérage.
│   └── MapService.js               # Service pour la gestion des cartes.
│
├── /views                          # Composants d'affichage.
│   ├── MapView.js                  # Affichage de la carte.
│   └── NotificationView.js         # Affichage des notifications.
│
├── .gitignore                      # Fichiers à ignorer par Git
├── app.js                          # Point d'entrée principal.
└── package.json                    # Fichier de configuration du projet.