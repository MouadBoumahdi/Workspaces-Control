
# WorkSpaces

##  Présentation

WorkSpaces est une **application web innovante** dédiée à la gestion interactive du personnel dans les espaces de travail.  
L’objectif est de faciliter l’organisation et la répartition des employés sur un plan d’étage en **temps réel**, tout en respectant les **contraintes liées aux rôles et zones autorisées**.


##  Objectifs

- Permettre l’ajout, la modification et la suppression d’employés via une interface graphique.
- Assurer le respect des règles métier (ex : seuls les réceptionnistes peuvent occuper la réception).
- Offrir une expérience utilisateur fluide, intuitive et responsive sur desktop, tablette et mobile.
- Centraliser la gestion des données du personnel et la visualisation spatiale sur une même plateforme.


##  Fonctionnalités

### Fonctionnalités principales

- Sidebar **Unassigned Staff** pour gérer les employés non assignés.
- **Modale d’ajout** d’employé avec champs : nom, rôle, photo, email, téléphone, expériences.
- **Prévisualisation instantanée** de la photo de l’employé.
- **Validation** du formulaire (regex email/téléphone, date début < date fin).
- Plan d’étage interactif avec **6 zones** :
  - Salle de conférence
  - Réception
  - Salle des serveurs
  - Salle de sécurité
  - Salle du personnel
  - Salle d’archives
- **Restrictions par rôle** pour chaque zone.
- **Bouton “X”** pour retirer un employé d’une zone et le renvoyer à Unassigned Staff.
- **Profil détaillé** en popup pour chaque employé.
- **Bouton “+”** dans chaque zone pour ajouter un employé selon les règles.
- Zones vides obligatoires en **rouge pâle**.
- Limitation du nombre d’employés par zone.
- **Responsive design** .
- Sauvegarde automatique de l’état du plan dans le **localStorage**.


##  Structure des fichiers

Voici les fichiers et dossiers présents dans le projet :

index.html - Page principale

style.css - Feuille de style principale

script.js - Script JavaScript principal

images/ - Dossier contenant toutes les images utilisées



##  Technologies utilisées

- **HTML5 / CSS3 / JS PARSLEY**
- **Flexbox & CSS Grid** pour le layout
- **Media Queries** pour le responsive
- Déploiement : **GitHub Pages**


##  Demo

Le projet est déjà **hébergé en ligne via GitHub Pages**.  
Accéder au site :  https://mouadboumahdi.github.io/Workspaces-Control/

