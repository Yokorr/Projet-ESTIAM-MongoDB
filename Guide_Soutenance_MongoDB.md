# 🎓 Guide Complet de Préparation à la Soutenance MongoDB

Ce document est conçu pour aider votre groupe à préparer le fichier PowerPoint et à répartir la parole pendant l'évaluation de 14h00. L'objectif est de démontrer au jury que vous maîtrisez non seulement le développement de l'application, mais surtout les concepts fondamentaux et avancés de MongoDB.

---

## 📊 1. Proposition de Plan pour le PowerPoint (Slide par Slide)

### Slide 1 : Titre & Présentation de l'Équipe
* **Titre :** Application E-Commerce "MongoDB Store"
* **Contenu :** Le nom de votre projet et les prénoms de chaque membre du groupe.

### Slide 2 : L'Architecture de la Solution
* **Titre :** Architecture Technique (Stack MERN)
* **Contenu :** Expliquez pourquoi vous avez choisi ces technologies.
  * **Base de données :** MongoDB Atlas (Cloud) pour la haute disponibilité.
  * **Backend :** Node.js avec le framework Express et l'ODM "Mongoose". Mongoose permet de valider les schémas de données avant l'insertion dans MongoDB.
  * **Frontend :** React (via Vite) pour une interface utilisateur réactive, avec une conception "Glassmorphism".

### Slide 3 : La Modélisation des Données
* **Titre :** Modélisation et Relations (10 Collections)
* **Contenu :** Insérez un schéma (diagramme) ou listez les 10 collections. 
  * `Users`, `Addresses`, `Categories`, `Suppliers`, `Products`, `ShoppingCarts`, `Orders`, `OrderItems`, `Payments`, `Reviews`.
  * **À dire à l'oral :** "Bien que MongoDB soit orienté document (NoSQL), notre e-commerce nécessite des relations fortes. Nous avons lié les documents en utilisant des `ObjectId`. Par exemple, un `Product` référence directement son `Supplier` (Fournisseur) et sa `Category`."

### Slide 4 : Indexation et Performances
* **Titre :** Optimisation via l'Indexation
* **Contenu :** Montrez un extrait de code ou expliquez vos index.
  * **À dire à l'oral :** "Pour garantir la rapidité de notre base de données, nous avons créé plusieurs index. Un index `unique` sur l'email des utilisateurs pour accélérer la connexion, et un *index composé* (compound index) sur `{ categoryId: 1, price: 1 }` dans les produits, car les clients filtrent très souvent par catégorie puis trient par prix."

### Slide 5 : Peuplement de la base (Le Script "Seed")
* **Titre :** Insertion Massive de Documents
* **Contenu :** Expliquez comment vous avez obtenu les 10 documents par collection.
  * **À dire à l'oral :** "Au lieu de rentrer les données à la main, nous avons développé un script de 'Seeding'. En une seule commande Node.js, le script nettoie la base (`deleteMany`) et génère dynamiquement des utilisateurs, des produits et des commandes via des boucles et les commandes d'insertion `create()`. Cela garantit des jeux d'essai cohérents pour les tests."

---

## 💻 2. La Démonstration du "Dashboard MongoDB" (Le cœur de l'évaluation)

C'est ici qu'il faut ouvrir l'application web, vous rendre sur la page "Dashboard Évaluation" et cliquer sur les trois boutons devant le jury. Répartissez la parole : un étudiant par bouton.

### Action 1 : Jointures avec `$lookup`
* **Le But :** Rapatrier les données de plusieurs collections en une seule requête.
* **Le Code exécuté :**
  ```javascript
  Product.aggregate([
    { $lookup: { from: 'reviews', localField: '_id', foreignField: 'productId', as: 'productReviews' } },
    { $lookup: { from: 'suppliers', localField: 'supplierId', foreignField: '_id', as: 'supplierInfo' } }
  ])
  ```
* **Ce qu'il faut expliquer à l'oral :** 
  *"Ici, nous partons de la collection des Produits. L'étape `$lookup` agit comme un JOIN en SQL. Elle dit à MongoDB : Va chercher dans la collection `reviews`, prends les avis dont le `productId` correspond à mon `_id` local, et injecte-les dans un nouveau tableau appelé `productReviews`. Nous faisons de même pour injecter les infos du fournisseur. Cela évite au backend de devoir faire 3 requêtes séparées."*

### Action 2 : Filtres avancés, Projections et Tris
* **Le But :** Montrer que vous savez cibler et formater les données de recherche.
* **Le Code exécuté :**
  ```javascript
  Product.find({ price: { $gt: 50 }, stock: { $lte: 200 } })
    .select('name price stock categoryId -_id')
    .sort({ price: -1 })
  ```
* **Ce qu'il faut expliquer à l'oral :**
  *"Sur cette requête, nous démontrons l'utilisation d'opérateurs conditionnels. `$gt` (Greater Than) filtre les produits dont le prix est supérieur à 50. `$lte` (Less Than or Equal) vérifie que le stock est <= 200.*
  *Ensuite, la fonction `.select()` est notre **Projection** : on demande à MongoDB de ne renvoyer QUE le nom, le prix et le stock, et d'exclure l'_id (avec le signe `-`). Cela économise de la bande passante.*
  *Enfin, `.sort({ price: -1 })` effectue un **Tri décroissant**."*

### Action 3 : Agrégations Complexes avec `$group`
* **Le But :** Montrer la maîtrise du "Aggregation Pipeline" pour faire des statistiques.
* **Le Code exécuté :**
  ```javascript
  Order.aggregate([
    { $group: { _id: '$status', totalRevenue: { $sum: '$totalAmount' }, orderCount: { $sum: 1 }, averageValue: { $avg: '$totalAmount' } } },
    { $sort: { totalRevenue: -1 } }
  ])
  ```
* **Ce qu'il faut expliquer à l'oral :**
  *"Pour générer des statistiques pour le e-commerce, nous avons utilisé un Pipeline d'agrégation sur les Commandes. L'étape `$group` regroupe les commandes par leur champ `status` (ex: 'shipped', 'pending').*
  *Pour chaque groupe, l'opérateur `$sum` additionne le montant total pour donner le chiffre d'affaires, et l'opérateur `$avg` calcule le montant du panier moyen.*
  *Nous ajoutons une étape `$sort` à la fin du pipeline pour afficher le statut générant le plus de revenus en premier."*

---

## ❓ 3. Anticipation : Réponses aux questions "Pièges" du Jury

* **Question :** *Où et comment faites-vous la modification (Update) ou la suppression (Delete) de documents ?*
  * **Réponse :** "Dans notre architecture API standard (Backend), nous utilisons les fonctions de Mongoose `findByIdAndUpdate()` ou `updateOne()` avec l'opérateur `$set` pour modifier par exemple les informations d'un utilisateur. Pour la suppression, on utilise `findByIdAndDelete()` (par exemple lorsqu'un administrateur supprime un produit ou qu'on vide un panier)."

* **Question :** *Pourquoi avoir choisi d'utiliser un `$lookup` plutôt que de stocker le Fournisseur directement dans le document du Produit (Data Embedding) ?*
  * **Réponse :** "C'est une question de design (Normalisation vs Dénormalisation). Si les informations du fournisseur (son adresse, son numéro) changent, et que ces données étaient stockées "en dur" dans chaque produit, il faudrait mettre à jour des dizaines de produits. En utilisant une référence (ID) et un `$lookup`, nous n'avons à modifier l'adresse du fournisseur qu'à un seul endroit dans la collection `Suppliers`."

* **Question :** *À quoi servent exactement les index que vous avez mis en place ?*
  * **Réponse :** "Les index sont comme le sommaire d'un livre. Au lieu de scanner toute la collection `Users` document par document pour vérifier si une adresse email existe lors de l'inscription (Collection Scan), l'index permet à MongoDB de trouver l'email instantanément via une recherche en arbre binaire (Index Scan)."

---

*Avec ce plan, votre projet E-Commerce et votre Dashboard interactif, vous avez tous les atouts en main pour obtenir une note maximale. Bon courage !*
