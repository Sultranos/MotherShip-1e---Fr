/**
 * Configuration des dépendances entre compétences
 * Support bilingue anglais/français
 */

import { SKILL_TRANSLATION_MAP, SKILL_REVERSE_MAP } from "./skill-translation-map.js";

/**
 * Définit les dépendances entre compétences avec support bilingue
 * Format: { compétence: [prérequis1, prérequis2, ...] }
 */
export const SKILL_DEPENDENCIES = {
  // Expert level skills require trained prerequisites
  "Engineering": ["Industrial Equipment"],
  "Ingénierie": ["Équipement Industriel"],
  
  "Surgery": ["Field Medicine"],
  "Chirurgie": ["Médecine de Terrain"],
  
  "Cybernetics": ["Engineering"],
  "Cybernétique": ["Ingénierie"],
  
  "Artificial Intelligence": ["Computers"],
  "Intelligence Artificielle": ["Informatique"],
  
  "Robotics": ["Engineering"],
  "Robotique": ["Ingénierie"],
  
  "Hacking": ["Computers"],
  "Piratage": ["Informatique"],
  
  "Xenoesotericism": ["Mysticism"],
  "Xénoésotérisme": ["Mysticisme"],
  
  "Command": ["Military Training"],
  "Commandement": ["Entraînement Militaire"],
  
  "Exobiology": ["Zoology"],
  "Exobiologie": ["Zoologie"],
  
  "Sophontology": ["Psychology"],
  "Sophontologie": ["Psychologie"],
  
  "Hyperspace": ["Physics"],
  "Hyperspace": ["Physique"],
  
  "Pharmacology": ["Chemistry"],
  "Pharmacologie": ["Chimie"],
  
  "Pathology": ["Field Medicine"],
  "Pathologie": ["Médecine de Terrain"],
  
  "Planetology": ["Geology"],
  "Planétologie": ["Géologie"]
};

/**
 * Obtient les prérequis d'une compétence avec support bilingue
 * @param {string} skillName - Nom de la compétence (anglais ou français)
 * @returns {Array<string>} - Liste des prérequis
 */
export function getSkillPrerequisites(skillName) {
  if (!skillName) return [];
  
  // Recherche directe
  let prereqs = SKILL_DEPENDENCIES[skillName];
  if (prereqs) return prereqs;
  
  // Recherche via traduction
  const translatedName = SKILL_TRANSLATION_MAP[skillName] || SKILL_REVERSE_MAP[skillName];
  if (translatedName) {
    prereqs = SKILL_DEPENDENCIES[translatedName];
    if (prereqs) return prereqs;
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
 * @returns {Array<string>} - Liste des compétences dépendantes
 */
export function getSkillDependents(skillName) {
  if (!skillName) return [];
  
  const dependents = [];
  
  for (const [skill, prereqs] of Object.entries(SKILL_DEPENDENCIES)) {
    if (prereqs.includes(skillName)) {
      dependents.push(skill);
    }
    
    // Vérifier aussi avec la traduction
    const translatedSkillName = SKILL_TRANSLATION_MAP[skillName] || SKILL_REVERSE_MAP[skillName];
    if (translatedSkillName && prereqs.includes(translatedSkillName)) {
      dependents.push(skill);
    }
  }
  
  return [...new Set(dependents)]; // Dédoublonnage
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