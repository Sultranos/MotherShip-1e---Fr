# 🚀 MACROS DE TRADUCTION MOTHERSHIP-FR

Ce dossier contient toutes les macros nécessaires pour traduire le système Mothership de l'anglais vers le français.

## 📋 LISTE COMPLÈTE DES MACROS

### 🔧 Macros de Traduction Individuelles

| Macro | Compendium Cible | Description | Status |
|-------|------------------|-------------|--------|
| `macro_update_skills.js` | `competences_1e` | Traduction des compétences | ✅ |
| `macro_update_classes.js` | `classes_1e` | Traduction des classes | ✅ |
| `macro_update_weapons.js` | `armes_1e` | Traduction des armes | ✅ |
| `macro_update_armor.js` | `armures_1e` | Traduction des armures | ✅ |
| `macro_update_equipment.js` | `equipement_1e` | Traduction de l'équipement | ✅ |
| `macro_update_medical_care.js` | `soins_medicaux_1e` | Traduction des soins médicaux | ✅ |
| `macro_update_patches.js` | `ecussons_1e` | Traduction des écussons/patches | ✅ |
| `macro_update_trinkets.js` | `bibelots_1e` | Traduction des bibelots | ✅ |
| **`macro_update_rolltables.js`** | `tables_aleatoires_1e` | **Traduction des tables (CRITIQUE)** | ✅ |
| `macro_update_macros_hotbar.js` | `macros_hotbar_1e` | Traduction macros barre rapide | ✅ |
| `macro_update_macros_triggered.js` | `macros_triggered_1e` | Traduction macros déclenchées | ✅ |

### 🎯 Macros de Gestion Globale

| Macro | Description | Usage |
|-------|-------------|-------|
| `macro_update_all_compendiums.js` | **Exécute TOUTES les traductions** | Traduction complète |
| `macro_reload_compendiums.js` | Recharge les compendiums | Après modification |
| `macro_test_bilingual_skills.js` | Test du système bilingue | Validation |

## 🔥 MACRO CRITIQUE - Tables Aléatoires

**`macro_update_rolltables.js`** est la macro la plus importante car elle traduit :
- ✅ **Test de Panique** (Panic Check)
- ✅ **Sauvegarde de Mort** (Death Save)  
- ✅ **Test de Blessure** (Wound Check)
- ✅ Tables de blessures spécifiques
- ✅ Vérifications de maintenance

**Cette macro DOIT être exécutée pour corriger l'erreur :**
```
TypeError: Cannot read properties of undefined (reading 'name')
```

## 🚀 PROCÉDURE D'INSTALLATION COMPLÈTE

### 1. Exécution Automatique (Recommandée)
```javascript
// Copier et exécuter dans FoundryVTT (en tant que GM) :
// Contenu de macro_update_all_compendiums.js
```

### 2. Exécution Manuelle (Étape par étape)
1. **CRITIQUE** : `macro_update_rolltables.js` (corrige panic check)
2. `macro_update_skills.js` 
3. `macro_update_classes.js`
4. `macro_update_weapons.js`
5. `macro_update_armor.js`
6. `macro_update_equipment.js`
7. `macro_update_medical_care.js`
8. `macro_update_patches.js`
9. `macro_update_trinkets.js`
10. `macro_update_macros_hotbar.js`
11. `macro_update_macros_triggered.js`

## 🛠️ DÉPANNAGE

### Erreur "Cannot read properties of undefined"
- **Cause** : Tables aléatoires non traduites
- **Solution** : Exécuter `macro_update_rolltables.js`

### Compendium verrouillé
- **Cause** : Compendium en lecture seule
- **Solution** : Déverrouiller manuellement ou utiliser la macro globale

### UUID non trouvé
- **Cause** : Références vers ancien système
- **Solution** : Toutes les macros mettent à jour les UUID vers `mothership-fr`

## 📊 COUVERTURE DE TRADUCTION

| Compendium | Items | Status | Priorité |
|------------|--------|--------|----------|
| Tables Aléatoires | ~15 tables | ✅ | **CRITIQUE** |
| Compétences | 42 skills | ✅ | Haute |
| Classes | 8 classes | ✅ | Haute |
| Armes | ~80 armes | ✅ | Moyenne |
| Armures | ~15 armures | ✅ | Moyenne |
| Équipement | ~200 items | ✅ | Moyenne |
| Soins Médicaux | ~20 items | ✅ | Basse |
| Écussons | ~106 patches | ✅ | Basse |
| Bibelots | ~50 trinkets | ✅ | Basse |
| Macros Hotbar | ~10 macros | ✅ | Moyenne |
| Macros Triggered | ~100 macros | ✅ | Basse |

## 🔄 MISES À JOUR

### v1.0.13 - Support Bilingue
- ✅ Ajout système de correspondance bilingue
- ✅ Créateur de personnage fonctionne avec noms FR/EN
- ✅ Toutes les macros de traduction créées

### v1.0.14 - Traductions Complètes (Prochaine)
- 🔄 Exécution de toutes les traductions
- 🔄 Test complet du système
- 🔄 Validation panic check

## 📞 SUPPORT

Si vous rencontrez des problèmes :
1. Vérifiez que vous êtes **GM**
2. Vérifiez la console (F12) pour les erreurs
3. Exécutez `macro_test_bilingual_skills.js` pour diagnostics
4. En dernier recours, utilisez les scripts PowerShell de reset

---
*Toutes les macros sont conçues pour préserver les UUID et maintenir la compatibilité avec le système original.*