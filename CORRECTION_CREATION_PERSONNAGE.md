# Correction Création de Personnage - Système Français

## 🔧 Problème Identifié

L'erreur **"UUID de classe invalide. Veuillez resélectionner."** était causée par le module **MoSh Greybearded QoL** qui cherchait les classes dans les compendiums anglais au lieu des compendiums français.

### Symptômes :
- Grille de sélection de classes vide
- Message d'erreur "UUID de classe invalide"
- Impossible de continuer la création de personnage

## ✅ Solution Appliquée

### 1. Corrections dans le Module QoL

#### Fichier `select-class.js` :
```javascript
// AVANT (problématique)
const compendiumPacks = [
  "fvtt_mosh_1e_psg.items_classes_1e", // Compendium anglais
  ...
];

// APRÈS (corrigé)
const compendiumPacks = [
  "mothership-fr.classes_1e",         // Compendium français en priorité
  "fvtt_mosh_1e_psg.items_classes_1e", // Fallback anglais
  ...
];
```

#### Fichier `select-skills.js` :
```javascript
// AVANT (problématique)
const compendiumSkills = await game.packs.get('fvtt_mosh_1e_psg.items_skills_1e')?.getDocuments() ?? [];

// APRÈS (corrigé)
const compendiumSkills = await game.packs.get('mothership-fr.competences_1e')?.getDocuments() ?? 
  await game.packs.get('fvtt_mosh_1e_psg.items_skills_1e')?.getDocuments() ?? [];
```

### 2. Module Spécialisé Français

Création du module **`mosh-greybearded-qol-fr`** avec :
- ID unique : `mosh-greybearded-qol-fr`
- Compatibilité système français : `mothership-fr`
- Traductions françaises complètes
- Références corrigées aux compendiums français

## 🎯 Installation

### Option 1 : Utiliser le Module QoL Français (Recommandé)
1. Installer le système **Mothership - Français**
2. Activer le module **MoSh Greybearded QoL - Français** inclus
3. La création de personnage utilisera automatiquement les compendiums français

### Option 2 : Module QoL Original
Si vous utilisez le module original **MoSh Greybearded QoL**, assurez-vous d'avoir :
1. Le système français installé ET actif
2. Le module QoL avec les corrections appliquées

## 🧪 Test de Fonctionnement

1. Créer un nouvel acteur de type "Personnage"
2. Cliquer sur "Créer Personnage" dans la feuille d'acteur
3. Vérifier que la grille de classes affiche :
   - **Scientifique**
   - **Marine** 
   - **Ouvrier**
   - **Androïde**
4. Sélectionner une classe et continuer la création

## 📋 Compendiums Français Utilisés

- **Classes** : `mothership-fr.classes_1e`
- **Compétences** : `mothership-fr.competences_1e`
- **Équipement** : `mothership-fr.equipement_1e`
- **Armes** : `mothership-fr.armes_1e`
- **Armures** : `mothership-fr.armures_1e`
- Et tous les autres compendiums traduits...

## 🔍 Dépannage

Si le problème persiste :

1. **Vérifier le système actif** : Le système `mothership-fr` doit être utilisé
2. **Vérifier les modules** : Désactiver le module QoL anglais si les deux sont présents
3. **Nettoyer le cache** : Redémarrer Foundry VTT
4. **Console F12** : Vérifier les erreurs JavaScript

## 📞 Support

La création de personnage devrait maintenant fonctionner parfaitement avec le système français complet ! 🎉