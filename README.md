# 🚀 MongoDB E-Commerce - Guide d'Installation Locale

Bienvenue sur le projet E-Commerce de notre groupe ! 
Suivez attentivement ce guide pour faire fonctionner l'application (Frontend + Backend) sur votre ordinateur.

---

## 📋 1. Prérequis

Avant de commencer, assurez-vous d'avoir installé ces logiciels sur votre machine :
- **[Git](https://git-scm.com/downloads)** pour cloner le projet.
- **[Node.js](https://nodejs.org/)** (Version 18 ou supérieure recommandée) pour exécuter le serveur et React.

---

## 📥 2. Récupérer le projet

Ouvrez un terminal et clonez le dépôt Git dans le dossier de votre choix, puis entrez dedans :

```bash
git clone <LIEN_DU_DEPOT_GIT_ICI>
cd nom-du-dossier-du-projet
```

*(Remarque : Demandez le lien du dépôt à celui qui a créé le GitHub/GitLab)*

---

## ⚙️ 3. Configuration de la Base de Données (CRITIQUE)

Pour des raisons de sécurité, le mot de passe de la base de données n'est pas envoyé sur Git. Vous devez créer un fichier de configuration local manuellement.

1. Allez dans le dossier `backend` :
2. Créez un nouveau fichier nommé exactement `.env`
3. Ouvrez ce fichier avec un éditeur de texte (VS Code, Bloc-notes...) et collez le contenu suivant à l'intérieur :

```env
PORT=5000
MONGODB_URI=mongodb+srv://williamxp95_db_user:20010@cluster0.wk9zozt.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=supersecretkey_for_ecommerce_app_2026
```

> **Attention :** Le fichier `.env` est ignoré par Git (via le `.gitignore`). C'est normal ! Chacun doit le créer sur son propre PC. Ne modifiez pas l'URI, il pointe vers le cluster Atlas partagé par le groupe.

---

## 📦 4. Installation des dépendances

Le projet est divisé en deux parties : le `backend` (l'API) et le `frontend` (le site web). **Il faut installer les modules pour les deux.**

Ouvrez un terminal à la racine du projet et tapez :

**Pour le Backend :**
```bash
cd backend
npm install
```

**Pour le Frontend :**
Ouvrez un autre terminal (ou faites `cd ../frontend`) et tapez :
```bash
cd frontend
npm install
```

---

## 🏃 5. Lancer l'Application

Pour faire fonctionner le site, vous devez lancer **deux terminaux en même temps** (un pour le serveur, un pour l'affichage).

### Terminal 1 (Backend)
```bash
cd backend
npm run dev
```
👉 *Si tout va bien, vous verrez écrit "MongoDB Connected" et "Server running on port 5000".*

### Terminal 2 (Frontend)
```bash
cd frontend
npm run dev
```
👉 *Vous verrez une adresse locale s'afficher (généralement `http://localhost:5173`). Cliquez dessus en maintenant "Ctrl" pour ouvrir le site dans votre navigateur.*

---

## 🛠️ Commandes Bonus Utiles

### Réinitialiser la Base de Données
Si la base de données de test devient brouillonne ou est supprimée par erreur, vous pouvez la repeupler instantanément avec plus de 10 collections complètes :
1. Allez dans le dossier `backend`.
2. Tapez : `npm run seed`
3. C'est fini ! La base Atlas est à nouveau propre et remplie.

### Le Dashboard d'Évaluation (Pour la soutenance)
Rendez-vous sur la page d'accueil du site et cliquez sur **"Voir le Dashboard d'Évaluation MongoDB"**. Cette page a été spécialement conçue pour faire notre démonstration orale devant le jury (utilisation de `$lookup`, `$group`, filtres avancés, etc.).
