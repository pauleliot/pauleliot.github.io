# Portfolio — Paul-Eliot Kostre

Site statique (HTML / CSS / JS) : aucune installation requise.

```
index.html              Accueil (landing page)
projets.html            Tous les projets, avec filtres
plugins.html            Plugins
projets/                Une page par projet détaillé
  _modele-projet.html   ← modèle à copier
plugins/
  modele-plugin.html    ← modèle à copier
js/data.js              ← LISTE DES PROJETS ET PLUGINS (à éditer)
css/style.css           Styles (couleurs et polices en haut du fichier)
images/                 Vos images
```

## Ajouter un projet

1. Dans `js/data.js`, ajoutez un bloc dans `PROJETS` (titre, catégorie, identifiant YouTube…).
   Il apparaît automatiquement sur la page Projets (et sur l'accueil avec `avant: true`).
2. Pour une page détaillée : copiez `projets/_modele-projet.html`, renommez-la
   (ex. `projets/interview-fayoles.html`), remplacez les « À REMPLIR »,
   puis ajoutez `page: "projets/interview-fayoles.html"` au projet dans `data.js`.
   Sans page, un clic sur la carte ouvre simplement la vidéo.

## Ajouter un plugin

Même principe avec la liste `PLUGINS` dans `js/data.js` et le modèle `plugins/modele-plugin.html`.

## Voir le site en local

Double-cliquer sur `index.html` fonctionne, mais les vidéos YouTube s'affichent mieux via un petit serveur :

```
python serve.py
```

(`serve.py` désactive le cache du navigateur : chaque modification s'affiche au simple rechargement.)

puis ouvrir http://localhost:8080

## Mettre en ligne

Glissez le dossier sur [Netlify Drop](https://app.netlify.com/drop), ou utilisez GitHub Pages / OVH / o2switch.

## À faire

- Parcours (accueil) : compléter les dates et missions de Thotis Media et Osez la Vidéo dans `index.html`
  (section `id="parcours"`). Pour ajouter une expérience, copiez un bloc `<li class="tl-item">`.
- Logos des logiciels (accueil) : chargés depuis le site Odoo, Wikimedia et reaper.fm. Pour ne dépendre
  de personne, enregistrez-les dans `images/logiciels/` et changez les `src` dans `index.html`.
- Compléter les sections « À REMPLIR » des pages projets.
- Plugins (Cypher, Ongaku, Sori) : ajouter le prix et le vrai lien de téléchargement / boutique
  dans `plugins/*.html` (les boutons « Obtenir » ouvrent pour l'instant un e-mail) et dans `js/data.js`.
- Vidéos d'aperçu en haut des pages plugin : déposez `plugins/videos/cypher.mp4`, `ongaku.mp4`, `sori.mp4`
  (16:9, courtes, sans son : elles tournent en boucle). Tant qu'elles n'existent pas, l'image d'exemple s'affiche.
- Démos au survol des fonctionnalités : une petite vidéo par carte, dans `plugins/videos/`, nommée
  `<plugin>-<fonction>.mp4` (ex. `cypher-audio.mp4`, `ongaku-beats.mp4`, `sori-presets.mp4`).
  Le nom exact de chaque carte est dans l'attribut `data-video` de la page. Sans fichier : « Démo à venir ».
- Aperçus des plugins : déposez vos captures dans `images/plugins/` (ex. `apercu-cypher.jpg`, format 16:10)
  puis changez le champ `apercu` du plugin dans `js/data.js`.
- Logos des plugins : `images/plugins/`. Dans un `style="--logo:url(...)"`, le chemin part du dossier
  `css/`, donc toujours `url('../images/plugins/nom.png')`.
