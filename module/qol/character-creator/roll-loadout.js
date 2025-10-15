
import { chatOutput } from "../utils/chat-output.js";


export async function rollLoadout(actor, selectedClass, { rollCredits = false, clearItems = false } = {}) {
  if (!actor || !selectedClass) return false;

  // Chemins d'images FR
  const DEFAULT_IMAGES = {
    Loadout: "modules/mothership-fr/images/icons/rolltables/loadouts.png",
    Patches: "modules/mothership-fr/images/icons/rolltables/patch.png",
    Trinkets: "modules/mothership-fr/images/icons/rolltables/trinket.png"
  };

  // Support Item ou data brut
  const classData = selectedClass.system ?? selectedClass;
  // Tables à rouler (supporte tous les champs possibles)
  const tableUUIDs = [];
  // Ajout dynamique des tables de loadout
  if (classData.roll_tables) {
    for (const key of Object.keys(classData.roll_tables)) {
      if (classData.roll_tables[key]) tableUUIDs.push(classData.roll_tables[key]);
    }
  }
  if (tableUUIDs.length === 0) {
    ui.notifications.error("Aucune table de loadout trouvée dans la classe. Vérifiez la configuration des roll_tables dans le compendium de classes.");
    console.warn("[QoL] Aucun UUID de table trouvé dans la classe:", classData);
    return false;
  }

  const allItems = { Weapons: [], Armor: [], Items: [] };
  const itemsToCreate = [];
  // Debug: log table UUIDs
  console.log("[QoL] Table UUIDs pour le loadout:", tableUUIDs);

  // Nettoyage inventaire si demandé
  if (clearItems) {
    const deletableTypes = ["weapon", "armor", "item"];
    const idsToDelete = actor.items
      .filter(i => deletableTypes.includes(i.type))
      .map(i => i.id);
    if (idsToDelete.length > 0) {
      await actor.deleteEmbeddedDocuments("Item", idsToDelete);
    }
  }

  // Rouler sur chaque table
  for (const uuid of tableUUIDs) {
    const table = await fromUuid(uuid);
    if (!table) {
      console.warn(`[QoL] Table non trouvée pour UUID: ${uuid}`);
      continue;
    }
    const results = (await table.roll()).results;

    for (const result of results) {
      let fullItem = null;
      let itemUuid = result.documentUuid;

      // Correction: construction UUID si absent
      if (!itemUuid && result.documentCollection && result.documentId) {
        itemUuid = `Compendium.${result.documentCollection}.${result.documentId}`;
      }

      if (itemUuid) {
        try {
          fullItem = await fromUuid(itemUuid);
        } catch (error) {
          console.warn(`Échec chargement item depuis UUID: ${itemUuid}`, error);
        }
      }

      if (fullItem) {
        const itemData = fullItem.toObject(false);
        itemsToCreate.push(itemData);
        if (itemData.type === "weapon") allItems.Weapons.push({ name: itemData.name, img: itemData.img });
        else if (itemData.type === "armor") allItems.Armor.push({ name: itemData.name, img: itemData.img });
        else allItems.Items.push({ name: itemData.name, img: itemData.img });
        continue;
      }

      // Fallback: résultat texte simple
      const cleanText = result.text?.replace(/<br\s*\/?/gi, " ").replace(/@UUID\[[^\]]+\]/g, "").trim();
      if (cleanText) {
        itemsToCreate.push({ name: cleanText, type: "item", img: DEFAULT_IMAGES.Loadout, system: {}, effects: [], flags: {} });
        allItems.Items.push({ name: cleanText, img: DEFAULT_IMAGES.Loadout });
      }
    }
  }

  // Création des items sur l'acteur
  if (itemsToCreate.length > 0) {
    console.log("[QoL] Items à créer sur l'acteur:", itemsToCreate);
    await actor.createEmbeddedDocuments("Item", itemsToCreate);
  } else {
    ui.notifications.error("Aucun objet de loadout n'a pu être ajouté à l'acteur. Vérifiez la configuration des tables et des compendiums.");
    console.warn("[QoL] Aucun item à ajouter. Table UUIDs:", tableUUIDs, "ItemsToCreate:", itemsToCreate);
  }

  // Affichage résumé dans le chat
  let itemSummary = "";
  for (const [category, items] of Object.entries(allItems)) {
    if (items.length > 0) {
      itemSummary += `<h3>${category}</h3>`;
      itemSummary += items.map(i => `
        <p><img src="${i.img}" style="height:2.5em; vertical-align:middle; margin-right:0.4em;"> ${i.name}</p>
      `).join("");
    }
  }

  // Roll crédits de départ
  if (rollCredits) {
    const creditRoll = new Roll("2d10 * 10");
    await creditRoll.evaluate();
    const startingCredits = creditRoll.total;
    await actor.update({ system: { credits: { value: startingCredits } } });
    itemSummary += `<br><strong>Crédits de départ:</strong> <label class="counter">${startingCredits}</label> cr`;
  }

  await chatOutput({
    actor,
    title: game.i18n.localize("MoshQoL.CharacterCreation.LoadoutRolled"),
    subtitle: actor.name,
    icon: "fa-dice",
    image: DEFAULT_IMAGES.Loadout,
    content: itemSummary
  });

  return true;
}
