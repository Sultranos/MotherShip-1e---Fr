# Guide d'Installation - Mothership Système Unifié Français

## Installation Rapide

### Option 1 : Installation via URL de Manifest (Recommandée)

1. **Ouvrir FoundryVTT**
2. **Aller dans "Game Systems"**
3. **Cliquer "Install System"**
4. **Coller l'URL du Manifest** :
   ```
   https://raw.githubusercontent.com/[votre-repo]/mothership-francais/main/system.json
   ```
5. **Cliquer "Install"**

### Option 2 : Installation Manuelle

1. **Télécharger** la dernière version depuis [Releases](https://github.com/[votre-repo]/releases)
2. **Extraire** le fichier ZIP dans votre dossier `Data/systems/`
3. **Redémarrer** FoundryVTT
4. **Créer un nouveau monde** avec le système "Mothership - Système Unifié Français"

## Configuration Initiale

### 1. Première Configuration

Après l'installation :

1. **Créer un nouveau monde**
   - Système : "Mothership - Système Unifié Français"
   - Modules : Aucun module additionnel requis

2. **Vérifier les Compendiums**
   - 13 compendiums devraient être disponibles
   - Classes, Compétences, Équipement, etc.

3. **Tester la Création de Personnage**
   - Créer un nouvel Acteur "Personnage"
   - Utiliser le "Générateur de Personnage" pour un test complet

### 2. Migration depuis Modules Séparés

Si vous aviez des modules Mothership installés :

1. **Sauvegarder vos données**
   - Exporter personnages importants
   - Noter paramètres personnalisés

2. **Désactiver anciens modules**
   - MoSh - Unofficial Mothership
   - Mothership 1e Compendium FR
   - MoSh Greybearded QoL

3. **Créer nouveau monde**
   - Utiliser le système unifié
   - Importer personnages sauvegardés

## Vérification de l'Installation

### Tests à Effectuer

#### ✅ Test 1 : Création de Personnage
1. Créer un nouvel Acteur "Personnage"
2. Cliquer sur "Générateur de Personnage"
3. Suivre le processus guidé
4. Vérifier que tout est en français

#### ✅ Test 2 : Compendiums
1. Ouvrir onglet "Compendium Packs"
2. Vérifier présence de tous les packs :
   - Classes (1e)
   - Compétences (1e) 
   - Armures (1e)
   - Armes (1e)
   - Équipement (1e)
   - Soins Médicaux (1e)
   - Écussons (1e)
   - Bibelots (1e)
   - Conditions (1e)
   - Maintenance (1e)
   - Macros Barre Rapide (1e)
   - Macros Déclenchées (1e)
   - Tables Aléatoires (1e)

#### ✅ Test 3 : Fonctionnalités QoL
1. Créer un personnage avec le générateur
2. Tester le "Congé à Terre"
3. Ouvrir la "Feuille de Réserve"
4. Tester la "Conversion de Stress"

#### ✅ Test 4 : Macros
1. Glisser une macro de la barre rapide
2. Effectuer un test de compétence
3. Tester un jet de panique
4. Vérifier que tout est en français

## Résolution de Problèmes

### Problèmes Courants

#### ❌ Système non visible dans la liste
**Solution :**
- Vérifier le chemin d'installation
- Redémarrer FoundryVTT
- Vérifier les permissions de fichiers

#### ❌ Compendiums manquants
**Solution :**
- Vérifier que tous les fichiers .db sont présents dans `/packs/`
- Recréer le monde si nécessaire

#### ❌ Textes en anglais
**Solution :**
- Vérifier que `lang/fr.json` existe
- Définir le français comme langue par défaut
- Redémarrer le monde

#### ❌ Générateur de personnage ne fonctionne pas
**Solution :**
- Vérifier la console F12 pour erreurs JavaScript
- S'assurer que tous les modules QoL sont intégrés
- Vérifier les templates dans `/templates/qol/`

#### ❌ Images/Icônes manquantes
**Solution :**
- Vérifier que `/images/` et `/icons/` sont complets
- Corriger les chemins dans `system.json` si nécessaire

### Logs et Débogage

1. **Ouvrir Console Développeur** (F12)
2. **Vérifier onglet Console** pour erreurs
3. **Rechercher erreurs liées à** :
   - Chargement de modules
   - Chemins de fichiers
   - Compendiums manquants

### Support

En cas de problème persistant :

1. **Vérifier les Issues** sur GitHub
2. **Créer une nouvelle Issue** avec :
   - Version FoundryVTT
   - Description du problème
   - Logs de console
   - Étapes pour reproduire

3. **Rejoindre la communauté** FoundryVTT francophone

## Mises à Jour

### Installation des Mises à Jour

1. **Sauvegarde** de vos mondes
2. **Télécharger** nouvelle version
3. **Remplacer** anciens fichiers
4. **Redémarrer** FoundryVTT
5. **Tester** fonctionnalités clés

### Compatibilité

- **FoundryVTT v12+** requis
- **FoundryVTT v13** recommandé
- **Modules tiers** : Compatible avec la plupart

---

## Liens Utiles

- 📖 [Documentation Complète](README.md)
- 📝 [Historique des Versions](CHANGELOG.md)
- 🐛 [Signaler un Bug](https://github.com/[votre-repo]/issues)
- 💬 [Communauté Discord](lien-discord)
- 🎮 [Mothership RPG Official](https://www.tuesdayknightgames.com/)

---

*Bon voyage dans l'espace... et que la terreur soit avec vous ! 🚀👽*