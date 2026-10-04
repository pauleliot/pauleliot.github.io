/* =========================================================
   CONTENU DU SITE — c'est ici que vous ajoutez vos projets
   et vos plugins. Les listes de l'accueil, de la page
   Projets et de la page Plugins se mettent à jour seules.
   ========================================================= */

/*
  Champs d'un projet :
  - titre      : nom affiché
  - categorie  : "bandeannonce" | "horizontal" | "motion"
  - type       : petite étiquette (ex. "Bande-annonce", "Interview")
  - annee      : année (texte)
  - resume     : 1 à 2 phrases
  - youtube    : identifiant de la vidéo YouTube (ce qui suit "v=" ou "embed/")
  - instagram  : (optionnel) lien d'embed Instagram, à la place de youtube
  - image      : (optionnel) miniature perso, sinon celle de YouTube est utilisée
  - page       : (optionnel) chemin de la page détaillée, ex. "projets/mon-projet.html"
                 → sans page, un clic ouvre simplement la vidéo
  - avant      : true pour l'afficher sur la page d'accueil
*/
const PROJETS = [
  {
    titre: "Bande Annonce F1 Le Film",
    categorie: "bandeannonce",
    type: "Bande-annonce",
    annee: "2025",
    resume: "Version alternative de la bande-annonce de F1. Focus sur le rythme et l'habillage sonore pour proposer une lecture différente de l'originale.",
    youtube: "rqYI4MbQLe8",
    page: "projets/bande-annonce-f1.html",
    avant: true
  },
  {
    titre: "Mini Doc — Addiction aux téléphones",
    categorie: "horizontal",
    type: "Mini-documentaire",
    annee: "",
    resume: "Post-production pour Theyo axée sur la clarté narrative : montage dynamique, motion design et sound design pour rendre le sujet accessible.",
    youtube: "IITSHFPP0xE",
    page: "projets/doc-theyo.html",
    avant: true
  },
  {
    titre: "Vidéo de prévention",
    categorie: "horizontal",
    type: "Corporate",
    annee: "",
    resume: "Réalisée pour Osez La Vidéo : des conseils aux entreprises qui veulent sensibiliser leurs salariés aux sujets importants.",
    youtube: "QOaYwc43sZI",
    page: "projets/video-prevention.html",
    avant: true
  },
  {
    titre: "Interview Jacques Fayoles",
    categorie: "horizontal",
    type: "Interview",
    annee: "",
    resume: "Montage d'interview.",
    youtube: "IGpXd4z2GG4"
  },
  {
    titre: "Interview Jérôme Teillard",
    categorie: "horizontal",
    type: "Interview",
    annee: "",
    resume: "Montage d'interview.",
    youtube: "-2TBJZMTlSU"
  },
  {
    titre: "Bande Annonce — Suzume",
    categorie: "bandeannonce",
    type: "Bande-annonce",
    annee: "",
    resume: "Bande-annonce du film d'animation Suzume de Makoto Shinkai.",
    youtube: "vWgKDN7jfZo",
    page: "projets/bande-annonce-suzume.html"
  },
  {
    titre: "Motion Design #1",
    categorie: "motion",
    type: "Motion design",
    annee: "",
    resume: "Animation réalisée sous After Effects.",
    youtube: "cmr1luvZycQ"
  },
  {
    titre: "Motion Design #2",
    categorie: "motion",
    type: "Motion design",
    annee: "",
    resume: "Animation réalisée sous After Effects.",
    youtube: "84g0MyMwJJQ"
  }
];

const CATEGORIES = {
  bandeannonce: "Bandes-annonces",
  horizontal: "Vidéos horizontales",
  motion: "Motion design"
};

/*
  Champs d'un plugin :
  - nom, sous (petit texte à côté du nom), accroche, description
  - logo      : image PNG transparente (coloriée automatiquement), sinon "initiale"
  - apercu    : capture du plugin (ex. "images/plugins/apercu-cypher.jpg", format 16:10 conseillé)
  - logiciels : ["Premiere Pro", "Windows", ...]
  - prix      : "Gratuit", "14,99 €"... ou "" pour ne rien afficher
  - statut    : (optionnel) "Nouveau", "Bientôt", "Bêta", "v1.2"...
  - page      : (optionnel) "plugins/mon-plugin.html"
  - lien      : (optionnel) lien externe (boutique, téléchargement)
*/
const PLUGINS = [
  {
    nom: "Cypher",
    sous: "Studio",
    logo: "images/plugins/cypher.png",
    apercu: "images/plugins/apercu-exemple.svg", // → remplacer par images/plugins/apercu-cypher.jpg
    accroche: "Le couteau suisse du monteur, dans un seul panneau.",
    description: "Conversion audio et vidéo, rangement des chutiers, retours client en marqueurs, import web et vérification avant export aux normes diffuseurs.",
    logiciels: ["Premiere Pro", "Windows", "macOS"],
    prix: "",
    statut: "v2.9",
    page: "plugins/cypher.html"
  },
  {
    nom: "Ongaku",
    sous: "音楽 · musique",
    logo: "images/plugins/ongaku.png",
    apercu: "images/plugins/apercu-exemple.svg", // → remplacer par images/plugins/apercu-ongaku.jpg
    accroche: "Votre bibliothèque musique et SFX, calée sur le rythme.",
    description: "Formes d'onde, BPM et temps forts détectés, marqueurs sur les beats, fins de morceau (reverb tail, vinyl stop) rendues en un clic.",
    logiciels: ["Premiere Pro", "Windows", "macOS"],
    prix: "",
    statut: "v1.7",
    page: "plugins/ongaku.html"
  },
  {
    nom: "Sori",
    sous: "反り · courbure",
    logo: "images/plugins/sori.png",
    apercu: "images/plugins/apercu-exemple.svg", // → remplacer par images/plugins/apercu-sori.jpg
    accroche: "De vraies courbes d'animation dans Premiere Pro.",
    description: "Un éditeur de courbes de Bézier façon After Effects : presets, vitesse, flou de mouvement, appliqués directement sur vos images clés.",
    logiciels: ["Premiere Pro", "Windows", "macOS"],
    prix: "",
    statut: "v1.2",
    page: "plugins/sori.html"
  },
  {
    nom: "Kiru",
    sous: "切る · couper",
    logo: "images/plugins/kiru.png",
    apercu: "images/plugins/apercu-exemple.svg", // → remplacer par images/plugins/apercu-kiru.jpg
    accroche: "Couper par le texte, sous-titrer sans retouche.",
    description: "Transcription sur votre ordinateur, silences, hésitations et reprises retirés en un clic, sous-titres stylés ou d'interview calés mot à mot.",
    logiciels: ["Premiere Pro", "Windows", "macOS"],
    prix: "",
    statut: "Nouveau",
    page: "plugins/kiru.html"
  }
];
