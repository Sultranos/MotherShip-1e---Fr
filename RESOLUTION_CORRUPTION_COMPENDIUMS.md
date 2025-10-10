# 🚨 RÉSOLUTION - COMPENDIUMS CORROMPUS PAR GIT

## 🔍 Problème identifié

**Git a corrompu les fichiers de base de données des compendiums** en les traitant comme du texte et en modifiant les fins de ligne (LF → CRLF).

**Symptômes :**
- Aucun compendium ne s'ouvre (pas cliquable)
- Les données affichent des caractères corrompus : `{"{"_{"_i{{"_`
- Erreurs lors du chargement des compendiums

## ✅ Solution appliquée

### 1. Ajout de `.gitattributes`
```
*.db binary
*.ldb binary
packs/*.db binary
```
Empêche git de traiter les fichiers `.db` comme du texte.

### 2. Restauration des compendiums
Les fichiers corrompus ont été restaurés depuis les backups propres :
- `classes_1e.db` ← `items_classes_1e.db`
- `armures_1e.db` ← `items_armor_1e.db`  
- `equipement_1e.db` ← `items_equipment_1e.db`
- `competences_1e.db` ← `items_skills_1e.db`

## 🎯 Résultat attendu

Après redémarrage de FoundryVTT :
- Tous les compendiums redeviennent cliquables
- La sélection de classes fonctionne
- Les données s'affichent correctement

## ⚠️ Prévention future

Le fichier `.gitattributes` empêchera la récurrence du problème en protégeant les fichiers binaires des transformations de git.

## 🔧 Si le problème persiste

1. Redémarrer complètement FoundryVTT
2. Vider le cache du navigateur
3. Vérifier que les fichiers .db ont la bonne taille (> 1000 bytes)

**Le problème était une corruption des données, pas le code !**