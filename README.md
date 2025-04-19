
# 📱 Eventme

**Eventme** est une application mobile développée avec **React Native** et **Supabase**, qui permet aux utilisateurs de découvrir, suivre et rejoindre des événements autour d’eux en fonction de leurs centres d’intérêt. Le tout avec une interface fluide, géolocalisation, filtres personnalisés et authentification sécurisée.

---

## 🏗️ Architecture du projet

L’application est structurée de façon modulaire avec :

- `React Navigation` :
  - Stack principal pour le flux général (auth, app, détails)
  - Drawer secondaire pour la navigation interne (`Tous les événements`, `Mes événements`)
- `Supabase` :
  - Authentification email/mot de passe
  - Stockage des utilisateurs, événements et participations
- `expo-location` pour obtenir la position actuelle de l’utilisateur
- `expo-notifications` pour les rappels d’événements (préparé)
- `Context API` pour gérer la session utilisateur
- `StyleSheet.create()` pour tout le stylisme

---

## ✨ Fonctionnalités implémentées

### ✅ Authentification
- Inscription et connexion avec email/mot de passe via Supabase
- Gestion de la session utilisateur avec `Context`

### ✅ Liste des événements
- Affichage de tous les événements dans un écran principal
- Vue sous forme de carte avec date, titre, premium ou non
- Calcul et affichage de la **distance entre l'utilisateur et chaque événement**

### ✅ Détail d’un événement
- Écran de détails avec :
  - Titre, description, date
  - Catégorie stylisée
  - Tag **premium** si applicable
  - Distance depuis l’utilisateur (calculée dynamiquement)
- Bouton “Je participe” qui inscrit l’utilisateur dans la table `event_participants`
- Navigation fluide avec bouton retour

### ✅ Mes événements
- Événements à venir et événements passés affichés dans deux blocs
- Affichage dynamique en fonction de la date
- Bouton pour **annuler une participation**

### ✅ Filtres
- Filtrage par **catégorie** dans l’écran des événements
- Filtrage si premium/gratuit

### ✅ Géolocalisation
- Autorisation et récupération automatique de la position actuelle avec `expo-location`
- Calcul précis de la distance à vol d’oiseau pour chaque événement

### ✅ Notifications
- L'utilisateur est notifié lorsque l'évenement auquel il est inscrit commence dans un jour.

---

## 📦 Supabase : structure utilisée

- `users`: stocke les infos utilisateur (auth + nom personnalisé)
- `events`: chaque événement contient une date, description, localisation (latitude/longitude), catégorie, premium
- `event_participants`: enregistre chaque participation avec horodatage

---

## 🛠 Installation et lancement

### 1. Cloner le repo

```bash
git clone https://github.com/ton-pseudo/eventme
cd eventme
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le projet

```bash
npx expo start
```

> Scanne le QR Code avec **Expo Go** sur ton téléphone pour tester l’app.

---

## 📸 Aperçu des écrans

- **Écran d’accueil** : tous les événements, avec filtres
- **Détail d’événement** : infos complètes + inscription
- **Mes événements** : événements à venir + passés
- **Connexion / Inscription** : authentification sécurisée Supabase

---

## 📚 Technologies utilisées

- **React Native**
- **TypeScript**
- **Expo Go**
- **Supabase (auth + base de données)**
- **expo-location**
- **React Navigation (stack + drawer)**
- **Context API**
- **StyleSheet (Flexbox)**

---

## ✅ Ce qui fonctionne

- Authentification complète avec Supabase
- Géolocalisation utilisateur (expo-location)
- Inscription à un événement
- Affichage de la distance
- Séparation événements passés / futurs
- Navigation fluide (stack + drawer)
- Gestion de la session avec Context
- UI responsive et propre
