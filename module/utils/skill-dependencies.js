/**
 * Configuration des dépendances entre compétences
 * Support bilingue anglais/français
 */

import { SKILL_TRANSLATION_MAP, SKILL_REVERSE_MAP } from "./skill-translation-map.js";

/**
 * Définit les dépendances entre compétences avec support bilingue
 * Format: { compétence: [prérequis1, prérequis2, ...] }
 * NOTE: Seules les versions FRANCAISES sont définies ici pour éviter les doublons
 * Le système gère automatiquement la correspondance bilingue via skill-translation-map.js
 */
export const SKILL_DEPENDENCIES = {
  // Expert level skills require trained prerequisites
  "Ingénierie": ["Équipement Industriel"],
  "Chirurgie": ["Médecine de Terrain"],
  "Cybernétique": ["Ingénierie"],
  "Intelligence Artificielle": ["Informatique"],
  "Robotique": ["Ingénierie"],
  "Piratage": ["Informatique"],
  "Xénoésotérisme": ["Mysticisme"],
  "Commandement": ["Entraînement Militaire"],
  "Exobiologie": ["Zoologie"],
  "Sophontologie": ["Psychologie"],
  "Hyperspace": ["Physique"],
  "Pharmacologie": ["Chimie"],
  "Pathologie": ["Médecine de Terrain"],
  "Planétologie": ["Géologie"]
};

/**
 * Obtient les prérequis d'une compétence avec support bilingue automatique
 * @param {string} skillName - Nom de la compétence (anglais ou français)
 * @returns {Array<string>} - Liste des prérequis
 */
export function getSkillPrerequisites(skillName) {
  if (!skillName) return [];
  
  // Recherche directe (nom français)
  let prereqs = SKILL_DEPENDENCIES[skillName];
  if (prereqs) return prereqs;
  
  // Si nom anglais, convertir vers français et chercher
  const frenchName = SKILL_TRANSLATION_MAP[skillName];
  if (frenchName) {
    prereqs = SKILL_DEPENDENCIES[frenchName];
    if (prereqs) return prereqs;
  }
  
  // Si nom français non trouvé, essayer la version anglaise
  const englishName = SKILL_REVERSE_MAP[skillName];
  if (englishName) {
    const frenchEquivalent = SKILL_TRANSLATION_MAP[englishName];
    if (frenchEquivalent) {
      prereqs = SKILL_DEPENDENCIES[frenchEquivalent];
      if (prereqs) return prereqs;
    }
  }
  
  return [];
}

/**
 * Vérifie si une compétence a des prérequis
 * @param {string} skillName - Nom de la compétence
 * @returns {boolean} - True si la compétence a des prérequis
 */
export function hasPrerequisites(skillName) {
  return getSkillPrerequisites(skillName).length > 0;
}

/**
 * Obtient toutes les compétences qui dépendent d'une compétence donnée
 * @param {string} skillName - Nom de la compétence prérequise
 * @returns {Array<string>} - Liste des compétences dépendantes (dédoublonnées)
 */
export function getSkillDependents(skillName) {
  if (!skillName) return [];
  
  const dependents = new Set(); // Utiliser un Set pour éviter les doublons
  
  // Normaliser le nom de la compétence prérequise (version française)
  const frenchSkillName = SKILL_TRANSLATION_MAP[skillName] || skillName;
  const englishSkillName = SKILL_REVERSE_MAP[skillName] || skillName;
  
  for (const [skill, prereqs] of Object.entries(SKILL_DEPENDENCIES)) {
    for (const prereq of prereqs) {
      // Vérifier correspondance directe ou bilingue
      if (prereq === frenchSkillName || 
          prereq === englishSkillName ||
          SKILL_TRANSLATION_MAP[prereq] === frenchSkillName ||
          SKILL_REVERSE_MAP[prereq] === englishSkillName) {
        dependents.add(skill);
      }
    }
  }
  
  return [...dependents];
}

/**
 * Valide qu'une sélection de compétences respecte toutes les dépendances
 * @param {Array<string>} selectedSkills - Liste des compétences sélectionnées
 * @returns {Object} - {valid: boolean, errors: Array<string>}
 */
export function validateSkillSelection(selectedSkills) {
  const errors = [];
  
  for (const skill of selectedSkills) {
    const prereqs = getSkillPrerequisites(skill);
    
    for (const prereq of prereqs) {
      const hasPrereq = selectedSkills.some(selected => {
        return selected === prereq || 
               SKILL_TRANSLATION_MAP[selected] === prereq ||
               SKILL_REVERSE_MAP[selected] === prereq;
      });
      
      if (!hasPrereq) {
        const translatedPrereq = SKILL_TRANSLATION_MAP[prereq] || SKILL_REVERSE_MAP[prereq] || prereq;
        errors.push(`${skill} requires ${translatedPrereq}`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}