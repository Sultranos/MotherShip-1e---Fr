import { chatOutput } from "../utils/chat-output.js";

export async function rollLoadout(actor, selectedClass, { rollCredits = false, clearItems = false } = {}) {
  if (!actor || !selectedClass) return false;

  const DEFAULT_IMAGES = {
    Loadout: "systems/mothership-fr/icons/rolltables/loadouts.png",
    Patches: "systems/mothership-fr/icons/rolltables/patch.png",
    Trinkets: "systems/mothership-fr/icons/rolltables/trinket.png"
  };

  const classData = selectedClass.system ?? selectedClass; // Support for Item or raw data
  const tableUUIDs = [
    classData.roll_tables?.loadout,
    classData.roll_tables?.patch,
    classData.roll_tables?.trinket
  ].filter(Boolean);

  // Utilisation des noms français pour les catégories d'items
  const allItems = { Armes: [], Armures: [], Équipements: [] };
  const itemsToCreate = [];

  if (clearItems) {
    const deletableTypes = ["weapon", "armor", "item"];
    const idsToDelete = actor.items
      .filter(i => deletableTypes.includes(i.type))
      .map(i => i.id);
    if (idsToDelete.length > 0) {
      await actor.deleteEmbeddedDocuments("Item", idsToDelete);
    }
  }

  for (const uuid of tableUUIDs) {
    const table = await fromUuid(uuid);
    if (!table) continue;
    const results = (await table.roll()).results;

    for (const result of results) {
      let fullItem = null;
      let uuid = result.documentUuid;
      
      // Fix for FoundryVTT v13: Handle both old and new formats
      if (!uuid && result.documentCollection && result.documentId) {
        // Convert old format to proper UUID
        uuid = `Compendium.${result.documentCollection}.${result.documentId}`;
      }
      
      if (uuid) {
        try {
          fullItem = await fromUuid(uuid);
        } catch (error) {
          console.warn(`Failed to load item from UUID: ${uuid}`, error);
        }
      }

      if (fullItem) {
        const itemData = fullItem.toObject(false);
        itemsToCreate.push(itemData);
        // Classification française des items
        if (itemData.type === "weapon") allItems.Armes.push({ name: itemData.name, img: itemData.img });
        else if (itemData.type === "armor") allItems.Armures.push({ name: itemData.name, img: itemData.img });
        else allItems.Équipements.push({ name: itemData.name, img: itemData.img });
        continue;
      }

      // fallback for text-only results
      const cleanText = (result.text || result.name || result.description)?.replace(/<br\s*\/?>/gi, " ").replace(/@UUID\[[^\]]+\]/g, "").trim();
      if (cleanText) {
        itemsToCreate.push({ name: cleanText, type: "item", img: DEFAULT_IMAGES.Loadout, system: {}, effects: [], flags: {} });
        allItems.Équipements.push({ name: cleanText, img: DEFAULT_IMAGES.Loadout });
      }
    }
  }

  if (itemsToCreate.length > 0) {
    await actor.createEmbeddedDocuments("Item", itemsToCreate);
  }

  // 💬 Chat output avec noms français
  let itemSummary = "";
  for (const [category, items] of Object.entries(allItems)) {
    if (items.length > 0) {
      itemSummary += `<h3>${category}</h3>`;
      itemSummary += items.map(i => `
        <p><img src="${i.img}" style="height:2.5em; vertical-align:middle; margin-right:0.4em;"> ${i.name}</p>
      `).join("");
    }
  }

  // Jet pour les Crédits de Départ
  if (rollCredits) {
    const creditRoll = new Roll("2d10 * 10");
    await creditRoll.evaluate();
    const startingCredits = creditRoll.total;
    await actor.update({ system: { credits: { value: startingCredits } } });
    itemSummary += `<br><strong>Crédits de Départ:</strong> <label class="counter">${startingCredits}</label> cr`;
  }
  
  await chatOutput({
    actor,
    title: "Équipement Généré",
    subtitle: actor.name,
    icon: "fa-dice",
    image: DEFAULT_IMAGES.Loadout,
    content: itemSummary
  });

  return true;
}
