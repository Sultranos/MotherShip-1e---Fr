import { getThemeColor } from "../utils/get-theme-color.js";
import { findSkillByName, normalizeSkillName, getSkillNameVariants, skillNamesMatch } from "../../utils/skill-translation-map.js";
import { getSkillPrerequisites, getSkillDependents, validateSkillSelection } from "../../utils/skill-dependencies.js";

export async function selectSkills(actor, selectedClass) {
  function getSkillSortOrder() {
    // Ordre de tri avec support bilingue
    return [
      "Linguistique", "Linguistics",
      "Zoologie", "Zoology",
      "Botanique", "Botany",
      "Géologie", "Geology",
      "Équipement Industriel", "Industrial Equipment",
      "Bricolage", "Jury-Rigging",
      "Chimie", "Chemistry",
      "Informatique", "Computers",
      "Gravité Zéro", "Zero-G",
      "Mathématiques", "Mathematics",
      "Art", "Art",
      "Archéologie", "Archaeology",
      "Théologie", "Theology",
      "Entraînement Militaire", "Military Training",
      "Connaissances de la Bordure", "Rimwise",
      "Athlétisme", "Athletics",
      "Psychologie", "Psychology",
      "Pathologie", "Pathology",
      "Médecine de Terrain", "Field Medicine",
      "Écologie", "Ecology",
      "Extraction d'Astéroïdes", "Asteroid Mining",
      "Réparation Mécanique", "Mechanical Repair",
      "Explosifs", "Explosives",
      "Pharmacologie", "Pharmacology",
      "Piratage", "Hacking",
      "Pilotage", "Piloting",
      "Physique", "Physics",
      "Mysticisme", "Mysticism",
      "Survie en Milieu Hostile", "Survival",
      "Armes à Feu", "Firearms",
      "Combat Rapproché", "Close Quarters Battle",
      "Sophontologie", "Sophontology",
      "Exobiologie", "Exobiology",
      "Chirurgie", "Surgery",
      "Planétologie", "Planetology",
      "Robotique", "Robotics",
      "Ingénierie", "Engineering",
      "Cybernétique", "Cybernetics",
      "Intelligence Artificielle", "Artificial Intelligence",
      "Hyperspace", "Hyperspace",
      "Xénoésotérisme", "Xenoesotericism",
      "Commandement", "Command"
    ];
  }

  function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  function getSkillDependencies(skills) {
    const map = new Map(); // prereqId → Set of dependentIds
    
    // D'abord, traiter les dépendances du système
    for (const skill of skills) {
      for (const prereq of skill.system.prerequisite_ids || []) {
        const prereqId = prereq.split(".").pop();
        if (!map.has(prereqId)) map.set(prereqId, new Set());
        map.get(prereqId).add(skill.id);
      }
    }
    
    // Ensuite, ajouter les dépendances de notre configuration
    for (const skill of skills) {
      const configPrereqs = getSkillPrerequisites(skill.name);
      for (const prereqName of configPrereqs) {
        // Trouver la compétence prérequise par nom (avec support bilingue)
        const prereqSkill = findSkillByName(prereqName, skills);
        if (prereqSkill) {
          if (!map.has(prereqSkill.id)) map.set(prereqSkill.id, new Set());
          map.get(prereqSkill.id).add(skill.id);
        }
      }
    }
    
    return map;
  }
  
  const compendiumSkills = await game.packs.get('mothership-fr.competences_1e')?.getDocuments() ?? [];
  const worldSkills = game.items.filter(item => item.type === 'skill');
  const allSkills = [...worldSkills, ...compendiumSkills].map(skill => {
    // Normalisation des rangs français vers anglais pour compatibilité
    const rank = skill.system.rank;
    if (rank === "Formé" || rank === "Entraîné") skill.system.rank = "trained";
    else if (rank === "Expert") skill.system.rank = "expert";
    else if (rank === "Maître") skill.system.rank = "master";
    else skill.system.rank = skill.system.rank?.toLowerCase();
    
    // Normalisation du nom pour compatibilité bilingue
    skill.normalizedName = normalizeSkillName(skill.name);
    skill.nameVariants = getSkillNameVariants(skill.name);
    
    return skill;
  });

  // Création d'un map avec support bilingue
  const skillMap = new Map();
  for (const skill of allSkills) {
    skillMap.set(skill.id, skill);
    // Ajout des variantes de nom pour faciliter la recherche
    skillMap.set(skill.name, skill);
    if (skill.nameVariants.english !== skill.name) {
      skillMap.set(skill.nameVariants.english, skill);
    }
    if (skill.nameVariants.french !== skill.name) {
      skillMap.set(skill.nameVariants.french, skill);
    }
  }
  
  const dependencies = getSkillDependencies(allSkills);

  const sortOrder = getSkillSortOrder();
  const sortedSkills = allSkills.sort((a, b) => {
    // Support bilingue pour le tri
    const indexA = Math.min(
      sortOrder.indexOf(a.name),
      sortOrder.indexOf(a.nameVariants?.english || ""),
      sortOrder.indexOf(a.nameVariants?.french || "")
    );
    const indexB = Math.min(
      sortOrder.indexOf(b.name),
      sortOrder.indexOf(b.nameVariants?.english || ""),
      sortOrder.indexOf(b.nameVariants?.french || "")
    );
    
    // Si non trouvé dans l'ordre de tri, placer à la fin
    const realIndexA = indexA === -1 ? 9999 : indexA;
    const realIndexB = indexB === -1 ? 9999 : indexB;
    
    return realIndexA - realIndexB;
  });


  const baseAnd = selectedClass.system.selected_adjustment?.choose_skill_and ?? {};
  const baseOr = selectedClass.system.selected_adjustment?.choose_skill_or ?? [];
  const granted = new Set((selectedClass.system.base_adjustment?.skills_granted ?? []).map(uuid => uuid.split(".").pop()));

  const fullSetExpert = baseAnd.expert_full_set || 0;
  const fullSetMaster = baseAnd.master_full_set || 0;

  const basePoints = {
    trained: (baseAnd.trained || 0) + fullSetExpert + fullSetMaster,
    expert: (baseAnd.expert || 0) + fullSetExpert + fullSetMaster,
    master: (baseAnd.master || 0) + fullSetMaster
  };

  // Convertit tout ce qui ressemble à un nombre en Number, sinon 0
  const toNum = (v) => {
    if (v === "" || v === null || v === undefined) return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  // Somme pratique
  const add = (...vals) => vals.map(toNum).reduce((a, b) => a + b, 0);

  const orOptions = baseOr.flat().map((opt, i) => {
    return {
      id: `or-${i}`,
      name: opt.name ?? `Option ${i + 1}`,
      trained: add(opt.trained, opt.expert_full_set, opt.master_full_set),
      expert:  add(opt.expert,  opt.expert_full_set, opt.master_full_set),
      master:  add(opt.master,  opt.master_full_set),
    };
  });

  const html = await renderTemplate("systems/mothership-fr/templates/qol/character-creator/select-skills.html", {
    themeColor: getThemeColor(),
    actor,
    selectedClass,
    sortedSkills,
    granted: [...granted],
    basePoints,
    orOptions
  });

  return new Promise((resolve) => {
    const dlg = new Dialog({
      title: game.i18n.format("MoshQoL.UI.SelectSkills"),
      content: html,
      buttons: {},
      close: () => {
        resolve(null);
      },
      render: (html) => {
        const wrapper = html.closest('.app');
        if (wrapper?.length) {
          wrapper.css({ width: '1200px', maxWidth: '95vw', margin: '0 auto' });
        }

        const points = structuredClone(basePoints);

        function drawLines() {
          const svg = html[0].querySelector("#skill-arrows");
          if (!svg) return;
          svg.innerHTML = "";
        
          const selected = new Set(
            html.find(".skill-card.selected").map((_, el) => el.dataset.skillId)
          );
        
          const linesToDraw = [];
          const processedConnections = new Set(); // Éviter les doublons
        
          for (const skill of sortedSkills) {
            // Utilisation des prérequis du système ET de notre configuration
            const systemPrereqIds = (skill.system.prerequisite_ids || []).map(p => p.split(".").pop());
            const configPrereqs = getSkillPrerequisites(skill.name);
            
            // Normalisation et déduplication des prérequis
            const normalizedPrereqs = new Set();
            
            // Ajouter les prérequis système (par ID)
            for (const prereqId of systemPrereqIds) {
              const prereqSkill = sortedSkills.find(s => s.id === prereqId);
              if (prereqSkill) {
                normalizedPrereqs.add(prereqId);
              }
            }
            
            // Ajouter les prérequis de configuration (par nom)
            for (const prereqName of configPrereqs) {
              const prereqSkill = findSkillByName(prereqName, sortedSkills);
              if (prereqSkill) {
                normalizedPrereqs.add(prereqSkill.id);
              }
            }
        
            for (const prereqId of normalizedPrereqs) {
              // Créer une clé unique pour cette connexion
              const connectionKey = `${prereqId}->${skill.id}`;
              
              // Éviter les connexions dupliquées
              if (processedConnections.has(connectionKey)) {
                continue;
              }
              processedConnections.add(connectionKey);
              
              const fromEl = html[0].querySelector(`.skill-card[data-skill-id="${prereqId}"]`);
              const toEl = html[0].querySelector(`.skill-card[data-skill-id="${skill.id}"]`);
              
              if (!fromEl || !toEl) continue;
        
              const rect1 = fromEl.getBoundingClientRect();
              const rect2 = toEl.getBoundingClientRect();
              const parentRect = svg.getBoundingClientRect();
        
              const x1 = rect1.left + rect1.width;
              const y1 = rect1.top + rect1.height / 2;
              const x2 = rect2.left;
              const y2 = rect2.top + rect2.height / 2;
        
              const relX1 = x1 - parentRect.left;
              const relY1 = y1 - parentRect.top;
              const relX2 = x2 - parentRect.left;
              const relY2 = y2 - parentRect.top;
        
              const deltaX = Math.abs(relX2 - relX1) / 2;
              const c1x = relX1 + deltaX;
              const c1y = relY1;
              const c2x = relX2 - deltaX;
              const c2y = relY2;
        
              const pathData = `M ${relX1},${relY1} C ${c1x},${c1y} ${c2x},${c2y} ${relX2},${relY2}`;
              
              // Vérification si le prérequis est sélectionné
              const prereqSelected = selected.has(prereqId);
              const skillSelected = selected.has(skill.id);
              
              const isHighlighted =
                skillSelected &&
                prereqSelected &&
                (skill.system.rank === "expert" || skill.system.rank === "master");
        
              linesToDraw.push({ d: pathData, highlight: isHighlighted });
            }
          }
        
          // ⬇️ D'abord: lignes grises
          for (const line of linesToDraw.filter(l => !l.highlight)) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", line.d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "var(--color-border)");
            path.setAttribute("stroke-width", "2");
            svg.appendChild(path);
          }
        
          // ⬆️ Ensuite: lignes colorées par-dessus
          for (const line of linesToDraw.filter(l => l.highlight)) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", line.d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "var(--theme-color)");
            path.setAttribute("stroke-width", "3");
            svg.appendChild(path);
          }
        }

        const updateSkillAvailability = () => {
          const selectedSkills = new Set(
            html.find(".skill-card.selected").map((_, el) => el.dataset.skillId)
          );
        
          html.find(".skill-card").not(".default-skill").each(function () {
            const skillId = this.dataset.skillId;
            const rank = this.dataset.rank;
            const selected = this.classList.contains("selected");
        
            if (points[rank] === 0 && !selected) {
              this.classList.add("locked");
            } else {
              if (rank === "trained") {
                this.classList.remove("locked");
              } else {
                const skill = skillMap.get(skillId);
                
                // Combiner les prérequis du système et de la configuration
                const systemPrereqs = (skill?.system?.prerequisite_ids || []).map(p => p.split(".").pop());
                const configPrereqs = getSkillPrerequisites(skill?.name || "");
                
                // Vérification des prérequis avec support bilingue
                const hasSystemPrereqs = systemPrereqs.length === 0 || systemPrereqs.some(prereqId => {
                  // Recherche directe par ID
                  if (selectedSkills.has(prereqId)) return true;
                  
                  // Recherche par nom avec correspondance bilingue
                  const prereqSkill = skillMap.get(prereqId);
                  if (!prereqSkill) return false;
                  
                  // Vérifie si une compétence sélectionnée correspond au prérequis
                  for (const selectedId of selectedSkills) {
                    const selectedSkill = skillMap.get(selectedId);
                    if (selectedSkill && skillNamesMatch(selectedSkill.name, prereqSkill.name)) {
                      return true;
                    }
                  }
                  return false;
                });
                
                const hasConfigPrereqs = configPrereqs.length === 0 || configPrereqs.some(prereqName => {
                  // Recherche par nom avec correspondance bilingue
                  for (const selectedId of selectedSkills) {
                    const selectedSkill = skillMap.get(selectedId);
                    if (selectedSkill && skillNamesMatch(selectedSkill.name, prereqName)) {
                      return true;
                    }
                  }
                  return false;
                });
                
                const unlocked = hasSystemPrereqs && hasConfigPrereqs;
                
                if (unlocked) {
                  this.classList.remove("locked");
                } else {
                  this.classList.add("locked");
                  this.classList.remove("selected");
                }
              }
            }
          });
        };

        const updateUI = () => {
          html.find(".point-count").each(function () {
            const rank = this.dataset.rank;
            this.innerText = points[rank];
          });
        
          const remaining = Object.values(points).reduce((a, b) => a + b, 0);
          const hasOrOptions = orOptions.length > 0;
          const orSelected = !hasOrOptions || html.find(".or-option.selected").length > 0;
        
          const allowConfirm = remaining === 0 && orSelected;
          html.find(".confirm-button").toggleClass("locked", !allowConfirm);

          updateSkillAvailability();
          drawLines();
        };

        html.find(".skill-card").on("click", function () {
          if (this.classList.contains("default-skill") || this.classList.contains("locked")) return;

          const rank = this.dataset.rank;
          if (this.classList.contains("selected")) {
            const skillId = this.dataset.skillId;
            const dependents = dependencies.get(skillId) || new Set();
          
            for (const depId of dependents) {
              const depEl = html[0].querySelector(`[data-skill-id="${depId}"]`);
              if (!depEl?.classList.contains("selected")) continue;
          
              const depSkill = skillMap.get(depId);
              const depPrereqs = (depSkill.system.prerequisite_ids || []).map(p => p.split(".").pop());
          
              // Vérification avec support bilingue
              const fulfilled = depPrereqs.filter(pid => {
                if (pid === skillId) return false; // compétence actuellement désélectionnée
                
                // Recherche directe par ID
                const el = html[0].querySelector(`[data-skill-id="${pid}"]`);
                if (el?.classList.contains("selected")) return true;
                
                // Recherche par correspondance bilingue
                const prereqSkill = skillMap.get(pid);
                if (!prereqSkill) return false;
                
                const selectedElements = html[0].querySelectorAll('.skill-card.selected');
                for (const selectedEl of selectedElements) {
                  const selectedSkill = skillMap.get(selectedEl.dataset.skillId);
                  if (selectedSkill && skillNamesMatch(selectedSkill.name, prereqSkill.name)) {
                    return true;
                  }
                }
                return false;
              });
          
              if (fulfilled.length === 0) {
                ui.notifications.warn(`${depSkill.name} needs this skill to remain selected.`);
                return;
              }
            }
          
            this.classList.remove("selected");
            points[rank]++;
            updateUI();
            return;
          } else {
            if (points[rank] <= 0) return;
            this.classList.add("selected");
            points[rank]--;
          }

          updateUI();
        });

        html.find(".or-option").on("click", function () {
          html.find(".or-option").removeClass("selected");
          this.classList.add("selected");

          const optionId = this.dataset.option;
          const opt = orOptions.find(o => o.id === optionId);
          points.trained = basePoints.trained + (opt?.trained || 0);
          points.expert  = basePoints.expert  + (opt?.expert  || 0);
          points.master  = basePoints.master  + (opt?.master  || 0);

          html.find(".skill-card.selected:not(.default-skill)").removeClass("selected");
          updateUI();
        });

        html.find(".confirm-button").on("click", async function () {
          const selectedUUIDs = Array.from(
            html[0].querySelectorAll(".skill-card.selected[data-uuid]")
          ).map(el => el.dataset.uuid);
          
          const selectedItems = await Promise.all(
            selectedUUIDs.map(async uuid => {
              const item = await fromUuid(uuid);
              if (!item || item.type !== "skill") {
                console.warn("Invalid or missing skill:", uuid);
                return null;
              }
              const itemData = item.toObject();
              delete itemData._id;
              return itemData;
            })
          );
        
          const validItems = selectedItems.filter(i => i);
          if (validItems.length > 0) {
            await actor.createEmbeddedDocuments("Item", validItems);
          }
        
          resolve(validItems.length > 0 ? validItems : null);
          dlg.close();
        });

        updateUI();
      }
    });
    dlg.render(true);
  });
}
