/**
 * Correspondance bilingue des compétences Mothership
 * Permet de faire le lien entre les noms anglais et français
 */

export const SKILL_TRANSLATION_MAP = {
  // Anglais -> Français
  "Linguistics": "Linguistique",
  "Zoology": "Zoologie", 
  "Botany": "Botanique",
  "Geology": "Géologie",
  "Industrial Equipment": "Équipement Industriel",
  "Jury-Rigging": "Bricolage",
  "Chemistry": "Chimie",
  "Computers": "Informatique",
  "Zero-G": "Gravité Zéro",
  "Mathematics": "Mathématiques",
  "Art": "Art",
  "Archaeology": "Archéologie",
  "Theology": "Théologie",
  "Military Training": "Entraînement Militaire",
  "Rimwise": "Connaissances de la Bordure",
  "Athletics": "Athlétisme",
  "Psychology": "Psychologie",
  "Pathology": "Pathologie",
  "Field Medicine": "Médecine de Terrain",
  "Ecology": "Écologie",
  "Asteroid Mining": "Extraction d'Astéroïdes",
  "Mechanical Repair": "Réparation Mécanique",
  "Explosives": "Explosifs",
  "Pharmacology": "Pharmacologie",
  "Hacking": "Piratage",
  "Piloting": "Pilotage",
  "Physics": "Physique",
  "Mysticism": "Mysticisme",
  "Survival": "Survie en Milieu Hostile",
  "Firearms": "Armes à Feu",
  "Close Quarters Battle": "Combat Rapproché",
  "Sophontology": "Sophontologie",
  "Exobiology": "Exobiologie",
  "Surgery": "Chirurgie",
  "Planetology": "Planétologie",
  "Robotics": "Robotique",
  "Engineering": "Ingénierie",
  "Cybernetics": "Cybernétique",
  "Artificial Intelligence": "Intelligence Artificielle",
  "Hyperspace": "Hyperspace",
  "Xenoesotericism": "Xénoésotérisme",
  "Command": "Commandement"
};

// Français -> Anglais (map inversé)
export const SKILL_REVERSE_MAP = Object.fromEntries(
  Object.entries(SKILL_TRANSLATION_MAP).map(([en, fr]) => [fr, en])
);

/**
 * Trouve une compétence par nom en cherchant dans les deux langues
 * @param {string} skillName - Nom de la compétence (anglais ou français)
 * @param {Array} skills - Liste des compétences disponibles
 * @returns {Object|null} - La compétence trouvée ou null
 */
export function findSkillByName(skillName, skills) {
  if (!skillName || !skills) return null;
  
  // Recherche directe par nom
  let skill = skills.find(s => s.name === skillName);
  if (skill) return skill;
  
  // Si nom français, essayer l'équivalent anglais
  if (SKILL_REVERSE_MAP[skillName]) {
    skill = skills.find(s => s.name === SKILL_REVERSE_MAP[skillName]);
    if (skill) return skill;
  }
  
  // Si nom anglais, essayer l'équivalent français
  if (SKILL_TRANSLATION_MAP[skillName]) {
    skill = skills.find(s => s.name === SKILL_TRANSLATION_MAP[skillName]);
    if (skill) return skill;
  }
  
  return null;
}

/**
 * Normalise le nom d'une compétence pour la correspondance
 * @param {string} skillName - Nom de la compétence
 * @returns {string} - Nom normalisé
 */
export function normalizeSkillName(skillName) {
  if (!skillName) return "";
  
  // Retourne le nom français si disponible, sinon le nom original
  return SKILL_TRANSLATION_MAP[skillName] || skillName;
}

/**
 * Obtient les deux versions (anglais et français) d'un nom de compétence
 * @param {string} skillName - Nom de la compétence
 * @returns {Object} - {english: string, french: string}
 */
export function getSkillNameVariants(skillName) {
  if (!skillName) return { english: "", french: "" };
  
  let english = skillName;
  let french = skillName;
  
  // Si c'est un nom français
  if (SKILL_REVERSE_MAP[skillName]) {
    english = SKILL_REVERSE_MAP[skillName];
    french = skillName;
  }
  // Si c'est un nom anglais
  else if (SKILL_TRANSLATION_MAP[skillName]) {
    english = skillName;
    french = SKILL_TRANSLATION_MAP[skillName];
  }
  
  return { english, french };
}

/**
 * Vérifie si deux noms de compétences correspondent (même compétence dans différentes langues)
 * @param {string} name1 - Premier nom
 * @param {string} name2 - Deuxième nom
 * @returns {boolean} - True si les noms correspondent à la même compétence
 */
export function skillNamesMatch(name1, name2) {
  if (!name1 || !name2) return false;
  if (name1 === name2) return true;
  
  const variants1 = getSkillNameVariants(name1);
  const variants2 = getSkillNameVariants(name2);
  
  return variants1.english === variants2.english || 
         variants1.french === variants2.french;
}