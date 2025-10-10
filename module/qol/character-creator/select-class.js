import { getThemeColor } from "../utils/get-theme-color.js";
import { calculateDialogWidth } from "../utils/calculate-dialog-width.js";

function normalizeCaps(text) {
  const lowered = text.toLowerCase().trim();
  return lowered.charAt(0).toUpperCase() + lowered.slice(1);
}

export async function selectClass(actor, applyStats = true) {
  // little helpers
  const stripHtml = html => html.replace(/<[^>]*>/g, '').trim();
  const formatAttribute = (value, label) => {
    if (!Number.isFinite(value) || value === 0) return null;
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${Math.abs(value) < 10 ? "\u00A0" : ''}${value}  ${label}`;
  };
  const stats = ['strength', 'speed', 'intellect', 'combat'];
  const saves = ['sanity', 'fear', 'body'];

  // Load all the classes
  console.log("🔍 DEBUG: Tous les packs disponibles:", Array.from(game.packs.keys()));
  
  const compendiumPacks = [
    "mothership-fr.classes_1e",
    ...game.packs.filter(p => p.metadata.type === "Item" && p.metadata.label.toLowerCase().includes("class")).map(p => p.metadata.id)
  ];
  const worldClasses = game.items.filter(cls => cls.type === "class");
  const classMap = new Map();

  console.log("🔍 DEBUG: Compendium packs recherchés:", compendiumPacks);

  for (const packId of compendiumPacks) {
    const pack = game.packs.get(packId);
    console.log(`🔍 DEBUG: Pack ${packId}:`, pack ? "TROUVÉ" : "INTROUVABLE");
    if (!pack) continue;
    const classes = await pack.getDocuments();
    console.log(`🔍 DEBUG: ${packId} contient ${classes.length} classes:`, classes.map(c => c.name));
    for (const cls of classes) {
      if (!classMap.has(cls.name)) {
        classMap.set(cls.name, foundry.utils.deepClone(cls));
      }
    }
  }

  // Si aucune classe n'a été trouvée, essayer une recherche plus large
  if (classMap.size === 0) {
    console.log("🔍 DEBUG: Aucune classe trouvée, recherche dans tous les packs...");
    for (const pack of game.packs.values()) {
      if (pack.metadata.type === "Item") {
        console.log(`🔍 DEBUG: Vérification du pack: ${pack.metadata.id} (${pack.metadata.label})`);
        try {
          const documents = await pack.getDocuments();
          const classes = documents.filter(doc => doc.type === "class");
          if (classes.length > 0) {
            console.log(`🔍 DEBUG: Trouvé ${classes.length} classes dans ${pack.metadata.id}:`, classes.map(c => c.name));
            for (const cls of classes) {
              if (!classMap.has(cls.name)) {
                classMap.set(cls.name, foundry.utils.deepClone(cls));
              }
            }
          }
        } catch (error) {
          console.warn(`🔍 DEBUG: Erreur lors de la lecture de ${pack.metadata.id}:`, error);
        }
      }
    }
  }
  for (const cls of worldClasses) classMap.set(cls.name, foundry.utils.deepClone(cls));
  const sortedClasses = Array.from(classMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  console.log(`🔍 DEBUG: ${sortedClasses.length} classes trouvées au total:`, sortedClasses.map(c => c.name));

  // Si aucune classe trouvée, afficher un message d'erreur explicite
  if (sortedClasses.length === 0) {
    ui.notifications.error("Aucune classe trouvée ! Vérifiez que le compendium 'Classes (1e)' est bien présent et contient des données.");
    console.error("🔍 DEBUG: ERREUR - Aucune classe trouvée dans aucun compendium !");
    return null;
  }

  // Compile processed class data
  const processedClasses = sortedClasses.map(cls => {
    const description = stripHtml(cls.system.description || "No description available.");
    const trauma = normalizeCaps(stripHtml(cls.system.trauma_response || "No trauma specified."));
    const base = cls.system.base_adjustment || {};
    const selected = cls.system.selected_adjustment || {};
    const attr = [];
  
    for (const group of [stats, saves]) {
      const values = group.map(stat => base[stat] || 0);
      const allEqual = values.every(v => v === values[0]);
      if (allEqual && values[0] !== 0) {
        attr.push(formatAttribute(values[0], group === stats ? "All Stats" : "All Saves"));
      } else {
        for (const stat of group) {
          const value = base[stat] || 0;
          const formatted = formatAttribute(value, stat.charAt(0).toUpperCase() + stat.slice(1));
          if (formatted) attr.push(formatted);
        }
      }
    }
  
    const wounds = (base.max_wounds || 0) + (selected.max_wounds || 0);
    if (wounds) attr.push(formatAttribute(wounds, "Wounds"));
  
    if (Array.isArray(selected.choose_stat)) {
      for (const choice of selected.choose_stat) {
        const isAllStats = stats.every(stat => choice.stats.includes(stat));
        const isAllSaves = saves.every(save => choice.stats.includes(save));
        const label = isAllStats ? "Any Stat" : isAllSaves ? "Any Save" :
          choice.stats.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
        const mod = parseInt(choice.modification, 10) || 0;
        attr.push(formatAttribute(mod, `Choose 1: ${label}`));
      }
    }
  
    return {
      id: cls.id,
      name: cls.name,
      img: cls.img || "icons/svg/mystery-man.svg",
      trauma,
      description,
      attributes: attr.join('<br>') || "No attributes.",
      uuid: cls.pack ? `Compendium.${cls.pack}.${cls.id}` : cls.uuid
    };
  });
  
  // Calculate dialog width
  const classCount = sortedClasses.length;
  let gridColumns = 5;
  if ([3, 6].includes(classCount)) {
    gridColumns = 3;
  }
  else if ([4, 7, 8, 11, 12].includes(classCount)) {
    gridColumns = 4;
  }
  const dialogWidth = calculateDialogWidth(gridColumns, 250, true);

  //Finish Template data and render
  const templateData = {
    themeColor: getThemeColor(),
    gridColumns,
    classes: processedClasses
  };
  const content = await renderTemplate("systems/mothership-fr/templates/qol/character-creator/select-class.html", templateData);

  return new Promise(resolve => {
    const dlg = new Dialog({
      title: game.i18n.localize("MoshQoL.UI.SelectClass"),
      content,
      buttons: {},
      close: () => resolve(null),
      render: html => {
        // Dialog Resizing
        const dialogElement = html.closest('.app');
        dialogElement.css({ width: `${dialogWidth}px`, maxWidth: '95vw', margin: '0 auto' });
        setTimeout(() => {
          dialogElement[0].style.height = 'auto';
        }, 0);
        // Click
        html.find('.card').on('click', async function () {
          const id = $(this).data('class');
          const selected = templateData.classes.find(c => c.id === id);
          if (!selected) return resolve(null);

          const classItem = await fromUuid(selected.uuid);
          if (!classItem) return ui.notifications.error("Failed to load class data.");

          const updates = {
            "system.class.value": classItem.name,
            "system.class.uuid": classItem.uuid,
            "system.other.stressdesc.value": classItem.system.trauma_response
              ? normalizeCaps(classItem.system.trauma_response)
              : ""
          };
          
          if (applyStats) {
            const base = classItem.system.base_adjustment || {};
            const allStats = ["strength", "speed", "intellect", "combat", "sanity", "fear", "body"];
            for (const stat of allStats) {
              const val = parseInt(base[stat], 10);
              if (!isNaN(val) && val !== 0) {
                updates[`system.stats.${stat}.value`] = (foundry.utils.getProperty(actor.system, `stats.${stat}.value`) || 0) + val;
              }
            }
            if (!isNaN(base.max_wounds)) {
              updates["system.hits.max"] = (foundry.utils.getProperty(actor.system, `hits.max`) || 2) + base.max_wounds;
              updates["system.hits.value"] = 0; // optional: reset current hits
            }
          }
          
          await actor.update(updates);

          resolve(classItem);
          dlg.close();
        });
      }
    });
    dlg.render(true);
  });
}

