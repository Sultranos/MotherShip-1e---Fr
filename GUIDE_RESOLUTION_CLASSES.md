# GUIDE DE RÉSOLUTION - COMPENDIUM CLASSES VIDE

## 🔍 Diagnostic du problème

Le problème identifié est que le compendium `mothership-fr.classes_1e` est vide (0 classes trouvées). Cela explique pourquoi la sélection de classe dans le créateur de personnage ne fonctionne pas.

## 🛠️ Solutions disponibles

### Solution 1 : Macro de copie (si le pack source est disponible)

Exécutez le macro `macro_copy_classes.js` dans FoundryVTT :
- Copie les classes depuis `fvtt_mosh_1e_psg.items_classes_1e`
- Corrige automatiquement les références de compendium
- Nécessite que le pack source soit installé

### Solution 2 : Macro de création directe (recommandée)

Exécutez le macro `macro_create_classes.js` dans FoundryVTT :
- Crée directement les 4 classes de base
- Ne dépend d'aucun pack externe
- Classes incluses : Scientifique, Marine, Ouvrier, Androïde

## 📋 Étapes pour résoudre le problème

1. **Dans FoundryVTT**, ouvrir la console et coller le contenu d'un des macros
2. **Exécuter le macro** (appuyer sur Entrée)
3. **Vérifier** que les classes sont créées avec la commande :
   ```javascript
   game.moshGreybeardQol.debugCompendiums()
   ```
4. **Tester** la création de personnage

## 🔧 Vérification post-correction

Après avoir exécuté un des macros, le debug devrait afficher :
```
🔍 DEBUG: mothership-fr.classes_1e contient 4 classes: [Scientifique, Marine, Ouvrier, Androïde]
```

## 📝 Notes techniques

- Les classes incluent les bonus de stats appropriés
- Les références de compendium sont correctement configurées pour `mothership-fr`
- Les descriptions et réponses traumatiques sont en français
- Les compétences de départ et tables de loadout sont référencées

## 🎯 Résultat attendu

Une fois corrigé, le créateur de personnage devrait :
1. Afficher les 4 classes disponibles
2. Permettre la sélection d'une classe
3. Appliquer correctement les bonus et compétences
4. Continuer avec les étapes suivantes de création