# Projet E-Commerce Complet & Guide MongoDB Atlas

Conception, développement et déploiement d'une application E-Commerce complète avec un frontend React, un backend Node.js (Express), et une modélisation MongoDB sur 10 collections interconnectées, comprenant un tableau de bord analytique MongoDB interactif pour l'évaluation orale.

## User Review Required

> [!IMPORTANT]
> **Validation des Technologies** : Nous proposons d'utiliser **React (Vite + JavaScript)** pour le Frontend et **Node.js (Express + Mongoose)** pour le Backend. Cette stack est légère, rapide à lancer et idéale pour présenter des requêtes MongoDB complexes en temps réel. Merci de confirmer si cette stack convient à votre groupe.
>
> **Tableau de Bord MongoDB Exclusif** : Pour vous aider lors de la soutenance (évaluation à 14h), nous allons ajouter une section spéciale "MongoDB Analytics / Dev Tools" dans l'application. Elle permettra de lancer en 1 clic les requêtes requises (comme les jointures `$lookup`, les indexations, les tris et les agrégations complexes) et d'afficher le code de la requête ainsi que les résultats bruts.

## Open Questions

> [!NOTE]
> 1. **MongoDB Atlas** : Avez-vous déjà un cluster MongoDB Atlas de créé ? Si oui, possédez-vous l'URI de connexion (du type `mongodb+srv://...`) ?
> 2. **Comptes Utilisateurs Initiaux** : Le script de seeding créera 10 utilisateurs. Souhaitez-vous des identifiants spécifiques (e.g. `admin@estiam.com` / `password123`) pour vous connecter facilement lors de la démo ?

## Proposed Changes

Nous allons structurer le projet en deux répertoires principaux à la racine du workspace :
- `/backend` : API Express, modèles Mongoose, script de seeding de données, routes pour les requêtes d'évaluation.
- `/frontend` : Application React avec une interface moderne, fluide (glassmorphisme, animations de micro-interaction) et le tableau de bord MongoDB.

---

### Modélisation de la Base de Données (10 Collections)

Pour satisfaire l'exigence d'un minimum de 10 collections cohérentes et liées fonctionnellement, nous modéliserons les collections suivantes :

```mermaid
erDiagram
    Users ||--o{ Addresses : "possède"
    Users ||--o{ Orders : "passe"
    Users ||--o{ Reviews : "rédige"
    Users ||--o{ ShoppingCarts : "possède"
    Categories ||--o{ Products : "contient"
    Suppliers ||--o{ Products : "fournit"
    Products ||--o{ OrderItems : "inclus dans"
    Products ||--o{ Reviews : "reçoit"
    Orders ||--o{ OrderItems : "contient"
    Orders ||--o1 Payments : "génère"
```

1. **`users`** : Comptes clients et administrateurs.
2. **`addresses`** : Adresses de livraison/facturation associées aux utilisateurs (liaison `userId`).
3. **`categories`** : Catégories de produits (liaison par ID ou slug).
4. **`suppliers`** : Fournisseurs des produits (nom, contact, adresse).
5. **`products`** : Catalogue de produits (liaison `categoryId`, `supplierId`, stock, caractéristiques).
6. **`shopping_carts`** : Paniers d'achat actifs des utilisateurs (liaison `userId`, tableau d'items avec `productId` et `quantity`).
7. **`orders`** : Commandes globales (liaison `userId`, total, statut, adresse de livraison).
8. **`order_items`** : Détail des produits commandés (liaison `orderId`, `productId`, quantité, prix d'achat fixe).
9. **`payments`** : Historique des paiements (liaison `orderId`, méthode, montant, statut, transactionId).
10. **`reviews`** : Avis et évaluations (liaison `productId`, `userId`, note, commentaire).

---

### Backend Components

#### [NEW] [package.json](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/backend/package.json)
Initialise le backend Node.js avec les dépendances suivantes : `express`, `mongoose`, `cors`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `morgan`, et `nodemon` (pour le développement).

#### [NEW] [server.js](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/backend/server.js)
Point d'entrée du serveur Express. Gère la connexion à MongoDB Atlas via Mongoose et charge les routes d'API.

#### [NEW] [.env](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/backend/.env)
Fichier de configuration local (variables d'environnement) contenant le port du serveur, la clé secrète JWT et l'URI de connexion MongoDB Atlas (à configurer par le groupe).

#### [NEW] [models](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/backend/models/)
Création des schémas et modèles Mongoose pour les 10 collections :
- `User.js`, `Address.js`, `Category.js`, `Supplier.js`, `Product.js`, `ShoppingCart.js`, `Order.js`, `OrderItem.js`, `Payment.js`, `Review.js`.
- Mise en place d'index MongoDB (ex: index unique sur `email` de User, index composé ou simple sur les clés de recherche fréquentes comme le prix du produit ou la référence catégorie).

#### [NEW] [seed.js](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/backend/scripts/seed.js)
Script autonome pour réinitialiser la base de données et insérer exactement 10+ documents cohérents par collection. Très utile pour s'assurer que la base est prête et remplie à tout moment.

#### [NEW] [controllers & routes](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/backend/routes/)
Routes REST pour les opérations classiques de l'e-commerce (CRUD utilisateurs, produits, panier, commandes) et une route spécifique `/api/mongodb-demo` pour exécuter et renvoyer les résultats des requêtes complexes d'évaluation :
- Jointure `$lookup` (e.g. récupérer un produit avec ses avis et les informations de son fournisseur).
- Agrégation complexe (e.g. chiffre d'affaires total par catégorie de produits, note moyenne par produit).
- Filtres avancés (e.g. produits ayant un prix > X et un stock < Y).

---

### Frontend Components

#### [NEW] [Vite Config & package.json](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/frontend/package.json)
Initialisation de l'application React avec Vite.

#### [NEW] [App Design & CSS](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/frontend/src/index.css)
Mise en place d'une feuille de style CSS premium :
- Thème sombre par défaut avec dégradés subtils, effets de flou d'arrière-plan (Glassmorphism).
- Typographie moderne et responsive.
- Animations de transition fluides lors du chargement des pages ou de l'ajout au panier.

#### [NEW] [React Views & State](file:///d:/informatique/estiam/L3/MongoDB/Nouveau%20dossier/frontend/src/)
- **Auth**: Inscription et connexion.
- **Product List & Details**: Recherche, filtres par catégorie, tri par prix/note. Visualisation des avis.
- **Cart & Checkout**: Gestion du panier local/serveur, formulaire d'adresse, bouton de paiement simulé.
- **Order History**: Suivi des commandes pour l'utilisateur connecté.
- **MongoDB evaluation Hub (Dev Dashboard)**:
  - Page accessible aux admins ou via un lien dans la barre de navigation.
  - Permet d'exécuter interactivement les 12 points d'évaluation MongoDB (Recherches, Filtres, Tris, Agrégations `$lookup`, etc.) et de voir instantanément le code JavaScript/Mongoose utilisé, la commande brute MongoDB équivalente et le résultat JSON formaté. C'est le support visuel parfait pour la soutenance.

---

## Verification Plan

### Automated Tests
- Script de validation de connexion à la base de données : `npm run test-db` dans le backend.
- Validation des requêtes d'agrégation via un script CLI ou via l'interface du tableau de bord.

### Manual Verification
1. **Étape 1 : Guide de connexion MongoDB Atlas**
   - Nous fournirons la procédure détaillée pour créer le cluster sur Atlas et renseigner l'URI dans le fichier `.env`.
2. **Étape 2 : Lancement du Seed**
   - Lancement de `node scripts/seed.js` et vérification dans MongoDB Compass ou Atlas que les 10 collections contiennent bien au moins 10 documents chacune.
3. **Étape 3 : Parcours utilisateur complet**
   - Inscription d'un nouvel utilisateur -> ajout de produits au panier -> validation de la commande avec adresse -> paiement simulé -> écriture d'un avis client.
4. **Étape 4 : Démonstration MongoDB**
   - Utilisation du tableau de bord MongoDB pour valider visuellement que chaque type de requête fonctionne et retourne les bonnes données.
