// Import Modules - Système de base Mothership
import { MothershipActor } from "./actor/actor.js";
import { MothershipActorSheet } from "./actor/actor-sheet.js";
import { MothershipCreatureSheet } from "./actor/creature-sheet.js";
import { MothershipShipSheet } from "./actor/ship-sheet.js";
import { MothershipShipSheetSBT } from "./actor/ship-sheet-sbt.js";

import { MothershipItem } from "./item/item.js";
import { MothershipItemSheet } from "./item/item-sheet.js";
import { MothershipClassSheet } from "./item/class-sheet.js";
import { MothershipSkillSheet } from "./item/skill-sheet.js";

import {
  registerSettings
} from "./settings.js";

// Import Update Manager
import { UpdateManager } from "./update-manager.js";

// Import Modules QoL - Fonctionnalités avancées
import { QoLContractorSheet } from "./qol/contractor-sheet-class.js";
import { defineStashSheet } from "./qol/stash-sheet-class.js";
import { convertStress } from "./qol/convert-stress.js";
import { ShoreLeaveTierEditor } from "./qol/ui/edit-shore-leave-tiers.js";
import { simpleShoreLeave } from "./qol/simple-shore-leave.js";
import { SHORE_LEAVE_TIERS } from "./qol/config/default-shore-leave-tiers.js";
import { startCharacterCreation } from "./qol/character-creator/character-creator.js";
import {
  checkReady,
  checkCompleted,
  setReady,
  setCompleted,
  reset
} from "./qol/character-creator/progress.js";

Hooks.once('init', async function () {

  // Enregistrer les paramètres de l'UpdateManager
  UpdateManager.registerSettings();

  // Enregistrer les paramètres QoL
  game.settings.register("mosh-greybearded-qol", "enableCharacterCreator", {
    name: "Activer le créateur de personnage",
    hint: "Active le système de création de personnage QoL",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("mosh-greybearded-qol", "themeColor", {
    name: "Couleur du thème global",
    hint: "Si définie, cette couleur remplacera les couleurs des joueurs",
    scope: "world",
    config: true,
    type: String,
    default: "#f50"
  });

  game.settings.register("mosh-greybearded-qol", "themeColorOverride", {
    name: "Couleur du thème joueur",
    hint: "Si définie, cette couleur remplacera la couleur par défaut pour cet utilisateur",
    scope: "client",
    config: true,
    type: String,
    default: ""
  });

  // Paramètres de conversion du stress
  game.settings.register("mosh-greybearded-qol", "convertStress.noSanitySave", {
    name: "Pas de jet de sanité mentale",
    hint: "Si activé, le stress sera converti sans jet de sanité mentale",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  game.settings.register("mosh-greybearded-qol", "convertStress.noStressRelieve", {
    name: "Pas de réduction de stress",
    hint: "Si activé, le stress ne sera pas remis au minimum après conversion",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  game.settings.register("mosh-greybearded-qol", "convertStress.minStressConversion", {
    name: "Convertir le stress minimum",
    hint: "Si activé, la conversion du stress est plafonnée à 0 au lieu du stress minimum",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  game.settings.register("mosh-greybearded-qol", "convertStress.formula", {
    name: "Formule de conversion du stress",
    hint: "Formule de dés de secours utilisée pour convertir le stress",
    scope: "world",
    config: true,
    type: String,
    default: "1d10"
  });

  game.settings.register("mosh-greybearded-qol", "simpleShoreLeave.randomFlavor", {
    name: "Texte d'ambiance aléatoire pour les permissions",
    hint: "Si activé, ajoute du texte d'ambiance aléatoire aux activités de permission",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  game.settings.register("mosh-greybearded-qol", "simpleShoreLeave.disableFlavor", {
    name: "Désactiver complètement le texte d'ambiance",
    hint: "Si activé, désactive tout texte d'ambiance pour les permissions",
    scope: "world", 
    config: true,
    default: false,
    type: Boolean
  });

  game.settings.register("mosh-greybearded-qol", "simpleShoreLeave.shoreLeaveTiers", {
    name: "Niveaux des permissions",
    hint: "Configuration des différents niveaux de permissions disponibles",
    scope: "world",
    config: false,
    type: Object,
    default: SHORE_LEAVE_TIERS
  });

  game.mosh = {
    MothershipActor,
    MothershipItem,
    rollItemMacro,
    rollStatMacro,
    initRollTable,
    initRollCheck,
    initModifyActor,
    initModifyItem,
    noCharSelected,
    startCharacterCreation,
    // Exposer l'UpdateManager pour un accès global
    UpdateManager,
    // Fonctions QoL
    convertStress,
    simpleShoreLeave,
    QoLContractorSheet,
    defineStashSheet,
    ShoreLeaveTierEditor
  };

  registerSettings();


  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d100",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.documentClass = MothershipActor;
  CONFIG.Item.documentClass = MothershipItem;


  // Register sheet application classes
  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("mothership-fr", MothershipActorSheet, {types: ['character'], makeDefault: true});
  foundry.documents.collections.Actors.registerSheet("mothership-fr", MothershipCreatureSheet, {types: ['creature'], makeDefault: false});
  foundry.documents.collections.Actors.registerSheet("mothership-fr", MothershipShipSheetSBT, {types: ['ship'], makeDefault: true});
  foundry.documents.collections.Actors.registerSheet("mothership-fr", MothershipShipSheet, {types: ['ship'], makeDefault: false});
  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("mothership-fr", MothershipClassSheet, {types: ['class'], makeDefault: true});
  foundry.documents.collections.Items.registerSheet("mothership-fr", MothershipSkillSheet, {types: ['skill'], makeDefault: true});
  foundry.documents.collections.Items.registerSheet("mothership-fr", MothershipItemSheet, {
    types: [
      "item",
      "weapon",
      "armor",
      "ability",
      "module",
      "condition",
      "crew",
      "repair"
    ], 
    makeDefault: true 
  });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function () {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('compare', function (varType, varOne, comparator, varTwo) {
    if (varType === 'str') {
     if (eval('"' + varOne + '"' + comparator + '"' + varTwo+ '"')) {
       return true
     } else {
       return false
     }
    } else if (varType === 'int') {
     if (eval(varOne + comparator + varTwo)) {
       return true
     } else {
       return false
     }
    }
     });
     //convert uuid list to names for display.
     Handlebars.registerHelper('UUidListToNames',function(UuidList){
      var names = []
      for(let i=0;i<UuidList.length;i++){
        let object = fromUuidSync(UuidList[i]);
        names.push(object.name);
      }
      return names.join(", ");
     });
     
});


Hooks.once("ready", async function () {
  
  // Initialiser l'UpdateManager
  await UpdateManager.initialize();
  
  // Initialisation des modules QoL
  console.log("🔧 Initialisation des modules QoL...");
  
  // Helpers Handlebars pour QoL
  Handlebars.registerHelper("eq", (a, b) => a === b);  
  Handlebars.registerHelper("array", (...args) => args.slice(0, -1));
  Handlebars.registerHelper("capitalize", str => str.charAt(0).toUpperCase() + str.slice(1));
  Handlebars.registerHelper("includes", function (collection, value) {
    if (Array.isArray(collection)) return collection.includes(value);
    if (collection instanceof Set) return collection.has(value);
    return false;
  });
  Handlebars.registerHelper("stripHtml", (text) => {
    return typeof text === "string" ? text.replace(/<[^>]*>/g, "").trim() : "";
  });
  
  // Registre global pour utilisation dans les macros
  game.moshGreybeardQol = game.moshGreybeardQol || {};
  game.moshGreybeardQol.convertStress = convertStress;
  game.moshGreybeardQol.simpleShoreLeave = simpleShoreLeave;
  game.moshGreybeardQol.startCharacterCreation = startCharacterCreation;
  
  // Fonction de diagnostic système complet
  game.moshGreybeardQol.diagnosticSysteme = function() {
    console.log("=== DIAGNOSTIC SYSTÈME COMPLET ===");
    
    console.log("1. Informations système:");
    console.log(`   - ID système: ${game.system.id}`);
    console.log(`   - Version système: ${game.system.version}`);
    console.log(`   - Version FoundryVTT: ${game.version}`);
    
    console.log("\n2. Configuration documents:");
    console.log(`   - CONFIG.Actor.documentClass: ${CONFIG.Actor?.documentClass?.name || 'NON DÉFINI'}`);
    console.log(`   - CONFIG.Item.documentClass: ${CONFIG.Item?.documentClass?.name || 'NON DÉFINI'}`);
    
    console.log("\n3. Feuilles d'acteur enregistrées:");
    Object.entries(CONFIG.Actor.sheetClasses).forEach(([type, sheets]) => {
      console.log(`   Type "${type}":`);
      Object.entries(sheets).forEach(([key, sheet]) => {
        console.log(`     - ${key}: ${sheet.cls.name} (défaut: ${sheet.default})`);
      });
    });
    
    console.log("\n4. Feuilles d'objet enregistrées:");
    Object.entries(CONFIG.Item.sheetClasses).forEach(([type, sheets]) => {
      console.log(`   Type "${type}":`);
      Object.entries(sheets).forEach(([key, sheet]) => {
        console.log(`     - ${key}: ${sheet.cls.name} (défaut: ${sheet.default})`);
      });
    });
    
    console.log("\n5. Test compendiums:");
    const totalPacks = game.packs.size;
    const systemPacks = Array.from(game.packs.values()).filter(p => p.metadata.packageName === game.system.id);
    console.log(`   - Total compendiums: ${totalPacks}`);
    console.log(`   - Compendiums du système: ${systemPacks.length}`);
    
    console.log("\n6. Test ouverture compendium:");
    const testPack = game.packs.get("mothership-fr.classes_1e");
    if (testPack) {
      try {
        console.log("   - Tentative d'ouverture du pack classes...");
        testPack.render(true);
        console.log("   ✅ Ouverture réussie");
      } catch (err) {
        console.log("   ❌ Erreur ouverture:", err.message);
        console.log("   Stack:", err.stack);
      }
    } else {
      console.log("   ❌ Pack classes non trouvé");
    }
    
    console.log("=== FIN DIAGNOSTIC ===");
  };
  
  // Fonction de debug pour diagnostiquer les problèmes de compendium
  game.moshGreybeardQol.debugCompendiums = async function() {
    console.log("=== DEBUG COMPENDIUM CLASSES ===");
    
    // 1. Lister tous les packs disponibles
    console.log("1. Tous les packs disponibles:");
    Array.from(game.packs.keys()).forEach(key => {
      const pack = game.packs.get(key);
      console.log(`   - ${key} (${pack.metadata.label}) - Type: ${pack.metadata.type}`);
    });
    
    // 2. Rechercher spécifiquement le pack des classes
    console.log("\n2. Recherche du pack classes_1e:");
    const classPack = game.packs.get("mothership-fr.classes_1e");
    if (classPack) {
      console.log("   ✅ Pack trouvé:", classPack.metadata);
      
      // 3. Lister le contenu du pack
      try {
        const docs = await classPack.getDocuments();
        console.log("\n3. Contenu du pack classes_1e:");
        console.log(`   Nombre de documents: ${docs.length}`);
        docs.forEach(doc => {
          console.log(`   - ${doc.name} (type: ${doc.type}, id: ${doc.id})`);
          if (doc.type === "class") {
            console.log(`     UUID: ${doc.uuid}`);
            console.log(`     Pack: ${doc.pack}`);
          }
        });
      } catch (err) {
        console.error("   ❌ Erreur lors de la lecture du pack:", err);
      }
    } else {
      console.log("   ❌ Pack non trouvé !");
      
      // Chercher des alternatives
      console.log("\n   Recherche d'alternatives:");
      game.packs.forEach(pack => {
        if (pack.metadata.label.toLowerCase().includes("class")) {
          console.log(`   Trouvé: ${pack.metadata.id} (${pack.metadata.label})`);
        }
      });
    }
    
    // 4. Test d'ouverture de compendium
    console.log("\n4. Test d'ouverture de compendiums:");
    try {
      console.log("   - Test ouverture pack classes...");
      classPack.render(true);
      console.log("   ✅ Pack classes ouvert avec succès");
    } catch (err) {
      console.error("   ❌ Erreur ouverture pack classes:", err);
    }
    
    // 5. Vérification de la configuration système
    console.log("\n5. Configuration système:");
    console.log(`   - CONFIG.Actor.documentClass: ${CONFIG.Actor.documentClass?.name || 'NON DÉFINI'}`);
    console.log(`   - CONFIG.Item.documentClass: ${CONFIG.Item.documentClass?.name || 'NON DÉFINI'}`);
    console.log(`   - game.system.id: ${game.system.id}`);
    console.log(`   - game.system.version: ${game.system.version}`);
    
    console.log("=== FIN DEBUG ===");
  };

  // Enregistrer les feuilles QoL
  try {
    const BaseSheet = CONFIG.Actor.sheetClasses.character["mothership-fr.MothershipActorSheet"].cls;
    const StashSheet = defineStashSheet(BaseSheet);

    foundry.documents.collections.Actors.registerSheet("mosh-greybearded-qol", StashSheet, {
      types: ["character"],
      label: "Stash Sheet",
      makeDefault: false
    });

    foundry.documents.collections.Actors.registerSheet("mosh-greybearded-qol", QoLContractorSheet, {
      types: ["creature"],
      label: "Contractor Sheet",
      makeDefault: false
    });
    
    console.log("✅ Feuilles QoL enregistrées avec succès");
  } catch (error) {
    console.warn("⚠️ Erreur lors de l'enregistrement des feuilles QoL:", error);
  }
  
  console.log("✅ MoSh Greybearded QoL intégré");
  
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if (data.type === "Item") {
      createMothershipMacro(data, slot);
      return false;
    }
  });
  
    //Calm & 1e/0e character updates
    // if the user has calm enabled at the start, 
    if (game.settings.get('mosh','useCalm')) {
      //get list of actors
      let actorList = game.actors;
      let actorName = '';
      let minStart = null;
      let valueStart = null;
      let maxStart = null;
      let labelStart = '';
      let minEnd = null;
      let valueEnd = null;
      let maxEnd = null;
      let labelEnd = '';
      //loop through all actors and update their stress values
      actorList.forEach(function(actor){ 
        //loop through each result
        if (actor.type === 'character') {
          //set character name
          actorName = actor.name;
          //set current values
          minStart = actor.system.other.stress.min;
          valueStart = actor.system.other.stress.value;
          maxStart = actor.system.other.stress.max;
          labelStart = actor.system.other.stress.label;
          //if the label does not say Calm
          if (actor.system.other.stress.label != 'Calm') {
            //change it to calm
            actor.update({'system.other.stress.label': 'Calm'});
            //log
            labelEnd = 'Calm';
          }
          //if the MIN value is not 0, this is an old character
          if (actor.system.other.stress.min != 0) {
            //put this value as the maximum
              //change it to calm
              actor.update({'system.other.stress.max': actor.system.other.stress.min});
              //log
              maxEnd = actor.system.other.stress.min;
            //set the minimum to zero
              //change it to calm
              actor.update({'system.other.stress.min': 0});
              //log
              minEnd = 0;
          }
          //log change
          console.log(actorName + " stress.min changed from " + minStart + " to " + minEnd);
          console.log(actorName + " stress.max changed from " + maxStart + " to " + maxEnd);
          console.log(actorName + " stress.label changed from " + labelStart + " to " + labelEnd);
          //rerender this sheet
          actor.render();
        }
      });
    //user does not have calm enabled
    } else {
      //if the user has Zero edition enabled
      if (!game.settings.get('mosh','firstEdition')) {
        //loop through all actors and update their stress values
        actorList.forEach(function(actor){ 
          //loop through each result
          if (actor.type === 'character') {
            //set character name
            actorName = actor.name;
            //set current values
            maxStart = actor.system.other.stress.max;
            //if the max value, this is an old character
            if (actor.system.other.stress.max != 999) {
              //put this value as the maximum
                //change it to calm
                actor.update({'system.other.stress.max': 999});
                //log
                maxEnd = 999;
            }
            //log change
            console.log(actorName + " stress.max changed from " + maxStart + " to " + maxEnd);
            //rerender this sheet
            actor.render();
          }
        });
      }
    }
});
  

//add custom damage dice for MOSH
Hooks.once('diceSoNiceReady', (dice3d) => {
  dice3d.addColorset(
    {
      name: 'roll',
      description: 'Roll Dice',
      category: 'Mothership',
      foreground: '#FFFFFF',
      background: '#262626',
      outline: 'none',
      texture: 'none',
      material: 'none',
      font: 'Arial'
    }
  )
})

//add custom damage dice for MOSH
Hooks.once('diceSoNiceReady', (dice3d) => {
  dice3d.addColorset(
    {
      name: 'damage',
      description: 'Damage Dice',
      category: 'Mothership',
      foreground: '#FFFFFF',
      background: '#cc2828',
      outline: 'none',
      texture: 'none',
      material: 'none',
      font: 'Arial'
    }
  )
})

//add custom panic dice for MOSH
Hooks.once('diceSoNiceReady', (dice3d) => {
  dice3d.addColorset(
    {
      name: 'panic',
      description: 'Panic Die',
      category: 'Mothership',
      foreground: '#000000',
      background: '#FFF200',
      outline: 'none',
      texture: 'none',
      material: 'metal',
      font: 'Arial'
    }
  )
})

//Hooks.on("preCreateActor", (createData) => {
/**
 * Set default values for new actors' tokens
 */
Hooks.on("preCreateActor", (document, createData, options, userId) => {
  let disposition = CONST.TOKEN_DISPOSITIONS.NEUTRAL;

  if (createData.type == "creature") {
    disposition = CONST.TOKEN_DISPOSITIONS.HOSTILE
  }

  // Set wounds, advantage, and display name visibility
  foundry.utils.mergeObject(createData,
    {
      "token.bar1": { "attribute": "health" },        // Default Bar 1 to Health 
      "token.bar2": { "attribute": "hits" },      // Default Bar 2 to Insanity
      "token.displayName": CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,     // Default display name to be on owner hover
      "token.displayBars": CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,     // Default display bars to be on owner hover
      "token.disposition": disposition,                               // Default disposition to neutral
      "token.name": createData.name                                   // Set token name to actor name
    })

    console.log(createData);
    console.log("Created!");

  if (createData.type == "character") {
    console.log("Got here");
    const prototypeToken = { disposition: 1, actorLink: true, vision: true}; // Set disposition to "Friendly"
    document.updateSource({ prototypeToken });
    
  }
})

Hooks.on('renderSidebarTab', async (app, html) => {
  console.log(app);
  console.log(app.options.id);
  if (app.options.id == "actors" || app.title == "Actors Directory") {
    console.log("testing~");
    let button = $(`<button class="import-json"><i class="fas fa-file-import"></i> Import JSON</button>`);
    button.click(function () {
      d.render({force: true});
    });
    html.find(".directory-footer").append(button);
  }
});



/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createMothershipMacro(data, slot) {

  if (data.type !== "Item") return;

  var itemUUID = data.uuid.split("."); 
  console.log(itemUUID);

  var actor = game.actors.get(itemUUID[1]);
  var item;

  if (game.release.generation >= 12) {
    item = foundry.utils.duplicate(actor.getEmbeddedDocument('Item',itemUUID[3]));
  } else {
    item = duplicate(actor.getEmbeddedDocument('Item',itemUUID[3]));
  }
  console.log(item);

  if (!item) return ui.notifications.warn("You can only create macro buttons for owned Items");

  // Create the macro command
  let command = `game.mosh.rollItemMacro("${item.name}");`;
console.log(command);
  let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: {
        "mosh.itemMacro": true
      }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Roll Macro from a Weapon.
 * @param {string} itemName
 * @return {Promise}
 */
function rollItemMacro(itemName) {
  //init vars
  let item;
  let itemId;
  //determine who to run the macro for
  if (game.settings.get('mosh','macroTarget') === 'character') {
    //is there a selected character? warn if no
    if (!game.user.character) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for the player's 'Selected Character'
        //get item id
        itemId = game.user.character.items.getName(itemName)._id;
        //get item
        if (game.release.generation >= 12) {
          item = foundry.utils.duplicate(game.user.character.getEmbeddedDocument("Item", itemId));
        } else {
          item = duplicate(game.user.character.getEmbeddedDocument("Item", itemId));
        }
        //warn if no item
        if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);
        //roll action
        if (item.type == "weapon") {
          return game.user.character.rollCheck(null, 'low', 'combat', null, null, item);
        } else if (item.type == "item" || item.type == "armor" || item.type == "ability" || item.type == "condition" || item.type == "repair") {
          return game.user.character.printDescription(item.id);
        } else if (item.type == "skill") {
          return game.user.character.rollCheck(null, null, null, item.name, item.system.bonus, null);
        }
    }
  } else if (game.settings.get('mosh','macroTarget') === 'token') {
    //is there a selected character? warn if no
    if (!canvas.tokens.controlled.length) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for all selected tokens
      canvas.tokens.controlled.forEach(function(token){
        //get item id
        itemId = token.actor.items.getName(itemName)._id;
        //get item
        if (game.release.generation >= 12) {
          item = foundry.utils.duplicate(token.actor.getEmbeddedDocument("Item", itemId));
        } else {
          item = duplicate(token.actor.getEmbeddedDocument("Item", itemId));
        }
        //warn if no item
        if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);
        //roll action
        if (item.type == "weapon") {
          return token.actor.rollCheck(null, 'low', 'combat', null, null, item);
        } else if (item.type == "item" || item.type == "armor" || item.type == "ability" || item.type == "condition" || item.type == "repair") {
          return token.actor.printDescription(item.id);
        } else if (item.type == "skill") {
          return token.actor.rollCheck(null, null, null, item.name, item.system.bonus, null);
        }
      });
    }
  }
}


/**
 * Roll Stat.
 * @param {string} statName
 * @return {Promise}
 */
function rollStatMacro() {
  var selected = canvas.tokens.controlled;
  const speaker = ChatMessage.getSpeaker();

  if (selected.length == 0) {
    selected = game.actors.tokens[speaker.token];
  }

  let actor;
  if (speaker.token) actor = game.actors.tokens[speaker.token];
  if (!actor) actor = game.actors.get(speaker.actor);
  const stat = actor ? Object.entries(actor.system.stats) : null;


  // if (stat == null) {
  //   ui.notifications.info("Stat not found on token");
  //   return;
  // }

  console.log(stat);

  return actor.rollStatSelect(stat);
}

//find and tell the actor to run the tableRoll function
async function initRollTable(tableId,rollString,aimFor,zeroBased,checkCrit,rollAgainst,comparison) {
  //determine who to run the macro for
  if (game.settings.get('mosh','macroTarget') === 'character') {
    //is there a selected character? warn if no
    if (!game.user.character) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for the player's 'Selected Character'
      game.user.character.rollTable(tableId,rollString,aimFor,zeroBased,checkCrit,rollAgainst,comparison);
    }
  } else if (game.settings.get('mosh','macroTarget') === 'token') {
    //is there a selected character? warn if no
    if (!canvas.tokens.controlled.length) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for all selected tokens
      canvas.tokens.controlled.forEach(function(token){
        token.actor.rollTable(tableId,rollString,aimFor,zeroBased,checkCrit,rollAgainst,comparison);
      });
    }
  }
  //log what was done
  console.log(`Initiated rollTable function with: tableId: ${tableId}, rollString: ${rollString}, aimFor: ${aimFor}, zeroBased: ${zeroBased}, checkCrit: ${checkCrit}, rollAgainst: ${rollAgainst}, comparison: ${comparison}`);
}

//find and tell the actor to run the rollCheck function
async function initRollCheck(rollString,aimFor,attribute,skill,skillValue,weapon) {
  //determine who to run the macro for
  if (game.settings.get('mosh','macroTarget') === 'character') {
    //is there a selected character? warn if no
    if (!game.user.character) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for the player's 'Selected Character'
      game.user.character.rollCheck(rollString,aimFor,attribute,skill,skillValue,weapon);
    }
  } else if (game.settings.get('mosh','macroTarget') === 'token') {
    //is there a selected character? warn if no
    if (!canvas.tokens.controlled.length) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for all selected tokens
      canvas.tokens.controlled.forEach(function(token){
        token.actor.rollCheck(rollString,aimFor,attribute,skill,skillValue,weapon);
      });
    }
  }
  //log what was done
  console.log(`Initiated rollCheck function with: rollString: ${rollString}, aimFor: ${aimFor}, attribute: ${attribute}, skill: ${skill}, skillValue: ${skillValue}, weapon: ${weapon}`);
}

//find and tell the actor to run the modifyActor function
async function initModifyActor(fieldAddress,modValue,modRollString,outputChatMsg) {
  //determine who to run the macro for
  if (game.settings.get('mosh','macroTarget') === 'character') {
    //is there a selected character? warn if no
    if (!game.user.character) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for the player's 'Selected Character'
      game.user.character.modifyActor(fieldAddress,modValue,modRollString,outputChatMsg);
    }
  } else if (game.settings.get('mosh','macroTarget') === 'token') {
    //is there a selected character? warn if no
    if (!canvas.tokens.controlled.length) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for all selected tokens
      canvas.tokens.controlled.forEach(function(token){
        token.actor.modifyActor(fieldAddress,modValue,modRollString,outputChatMsg);
      });
    }
  }
  //log what was done
  console.log(`Initiated modifyActor function with: fieldAddress: ${fieldAddress}, modValue: ${modValue}, modRollString: ${modRollString}, outputChatMsg: ${outputChatMsg}`);
}

//tell the actor to run the function
async function initModifyItem(itemId,addAmount) {
  //determine who to run the macro for
  if (game.settings.get('mosh','macroTarget') === 'character') {
    //is there a selected character? warn if no
    if (!game.user.character) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for the player's 'Selected Character'
      game.user.character.modifyItem(itemId,addAmount);
    }
  } else if (game.settings.get('mosh','macroTarget') === 'token') {
    //is there a selected character? warn if no
    if (!canvas.tokens.controlled.length) {
      //warn player
      game.mosh.noCharSelected();
    } else {
      //run the function for all selected tokens
      canvas.tokens.controlled.forEach(function(token){
        token.actor.modifyItem(itemId,addAmount);
      });
    }
  }
  //log what was done
  console.log(`Initiated modifyItem function with: itemId: ${itemId}, addAmount: ${addAmount}`);
}

//tell user no character is selected
async function noCharSelected() {
  //wrap the whole thing in a promise, so that it waits for the form to be interacted with
  return new Promise(async (resolve) => {
    //init vars
    let errorMessage = ``;
    //create error text based on current settings
    if (game.settings.get('mosh','macroTarget') === 'character') {
      errorMessage = `<h3>No Character Selected</h3>Macro Target is set to the currently selected character. To select a character, modify your User Configuration in the Players menu located in the lower-left of the interface.<br><br>If you prefer Macros to be run on the currently selected token(s) in the scene, you should change your settings accordingly.<br><br>`;
    } else if (game.settings.get('mosh','macroTarget') === 'token') {
      errorMessage = `<h3>No Character Selected</h3>Macro Target is set to the currently selected token(s) in the scene. To select token(s), click or draw a box around token(s) in the current scene.<br><br>If you prefer Macros to be run on the currently selected character for your user, you should change your settings accordingly.<br><br>`;
    }
    //create final dialog data
    const dialogData = {
      window: {title: `Macro Issue`},
      content: errorMessage,
      buttons: [
        {
          label: `Ok`,
          action: 'action_ok',
          callback: () => { },
          icon: '<i class="fas fa-check"></i>'
        }
      ]
    };
    //render dialog
    const dialog = foundry.applications.api.DialogV2(dialogData).render({force: true});
    //log what was done
    console.log(`Told the user that no character was selected.`);
  });
}

//tell user no ship is selected
async function noShipSelected() {
  //wrap the whole thing in a promise, so that it waits for the form to be interacted with
  return new Promise(async (resolve) => {
    //init vars
    let errorMessage = ``;
    //create error text based on current settings
    if (game.settings.get('mosh','macroTarget') === 'character') {
      errorMessage = `<h3>No Ship Selected</h3>Macro Target is set to the currently selected character. To select a ship, modify your User Configuration in the Players menu located in the lower-left of the interface.<br><br>If you prefer Macros to be run on the currently selected token(s) in the scene, you should change your settings accordingly.<br><br>`;
    } else if (game.settings.get('mosh','macroTarget') === 'token') {
      errorMessage = `<h3>No Ship Selected</h3>Macro Target is set to the currently selected token(s) in the scene. To select token(s), click or draw a box around token(s) in the current scene.<br><br>If you prefer Macros to be run on the currently selected character for your user, you should change your settings accordingly.<br><br>`;
    }
    //create final dialog data
    const dialogData = {
      window: {title: `Macro Issue`},
      content: errorMessage,
      buttons: [
        {
          label: `Ok`,
          action: 'action_ok',
          callback: () => { },
          icon: '<i class="fas fa-check"></i>'
        }
      ]
    };
    //render dialog
    const dialog = foundry.applications.api.DialogV2(dialogData).render({force: true});
    //log what was done
    console.log(`Told the user that no character was selected.`);
  });
}


/**
 * get element from world or compendiums by id or UUID, filtering by specific type.
 * @param {string} id_uuid                   The id or the full uuid of the element we want to retieve.
 * @param {object} options                   General search options for this function and for 'fromUuid'
 * @param {string} [options.type]            A string to filter the compendium type to search or the world element type. Valid values =["RollTable","Item","Macro","Actor","Adventure","Cards","JournalEntry","Playlist","Scene"]
 * @returns {Promise<Document|null>}         Returns the Document if it could be found, otherwise null.
 */
export async function fromIdUuid(id_uuid, options={}){
  let type = options.type;
  //first we try to find from UUID, asuming the parameter(id_uuid) is an UUID.
  let item = await fromUuid(id_uuid,options);
  if(item != null){
    //we found the item with the id_uuid, it probably was an uuid.
    return item;
  }

  //we need to manualy find the item
  let currentLocation = '';
  let objectLocation = '';
  //first loop through each compendium
  game.packs.forEach(function(pack){ 
    //is this a pack of rolltables?
    if (pack.metadata.type === type) {
      //log where we are
      currentLocation = pack.metadata.id;
      //loop through each pack to find the right table
      pack.index.forEach(function(pack_item) { 
        //is this our table?
        if (pack_item._id === id_uuid) {
          //grab the table location
          objectLocation = currentLocation;
        }
      });
    }
  });
  if (objectLocation){
    // Item found in a compendium -> get document data
    return await game.packs.get(objectLocation).getDocument(id_uuid);
  }else{
    //if we dont find it in a compendium, its probable a world item:
    //Lets filtery by type to search the relevant elements only.
    switch (type) {
      case "RollTable":
        return getTableFromId(id_uuid);
      case "Item":
        return getItemFromId(id_uuid);
      case "Macro":
        return getMacroFromId(id_uuid);
      case "Actor":
        return getActorFromId(id_uuid);
      case "Adventure":
        //adventures can only be defined in compendiums and not in the world (i think)
        return null;
      case "Cards":
        return getCardFromId(id_uuid);
      case "JournalEntry":
        return getJournalFromId(id_uuid);
      case "Playlist":
        return getPlaylistFromId(id_uuid);
      case "Scene":
        return getSceneFromId(id_uuid);

      default:
        //type is not defined, and we could not find it in a compendium,
        //now we search all world elements for the ID.
        //this could lead to conflicts since ID could not be unique.
        let tableData = getTableFromId(id_uuid);
        if (tableData){
          return tableData;
        }
        let itemData = getItemFromId(id_uuid);
        if (itemData){
          return itemData;
        }
        let macroData = getMacroFromId(id_uuid);
        if (macroData){
          return macroData;
        }
        let actorData = getActorFromId(id_uuid);
        if (actorData){
          return actorData;
        }
        let cardData = getCardFromId(id_uuid);
        if (cardData){
          return cardData;
        }
        let journalData = getJournalFromId(id_uuid);
        if (journalData){
          return journalData;
        }
        let scenneData = getSceneFromId(id_uuid);
        if (scenneData){
          return scenneData;
        }
        let playlistData = getPlaylistFromId(id_uuid);
        if (playlistData){
          return playlistData;
        }
      }
    //if we get here we have not found anything with that id.
    return null;
  }
  /**functions to get world defined elements by type and ID */ 
  function getSceneFromId(sceneId){
    return game.scenes.filter(i=> i.id == sceneId)[0];
  }
  function getPlaylistFromId(playlistId){
    return game.playlists.filter(i=> i.id == playlistId)[0];
  }
  function getJournalFromId(journalId){
    return game.journal.filter(i=> i.id == journalId)[0];
  }
  function getCardFromId(cardId){
    return game.cards.filter(i=> i.id == cardId)[0];
  }
  function getActorFromId(actorId){
    return game.actors.filter(i=> i.id == actorId)[0];
  }
  function getTableFromId(tableId){
    return game.tables.filter(i=> i.id == tableId)[0];
  }
  function getItemFromId(itemId){
    return game.items.filter(i=> i.id == itemId)[0];
  }
  function getMacroFromId(macroId){
    return game.macros.filter(i=> i.id == macroId)[0];
  }

}

// Hooks QoL pour les menus contextuels  
Hooks.on("getActorDirectoryEntryContext", (html, options) => {
  const enabled = game.settings.get("mosh-greybearded-qol", "enableCharacterCreator");
  if (!enabled) return;

  options.push(
    {
      name: "Réinitialiser le créateur de personnage",
      icon: '<i class="fas fa-undo"></i>',
      condition: li => {
        const actor = game.actors.get(li.data("documentId"));
        return game.user.isGM && actor?.type === "character";
      },
      callback: li => {
        const actor = game.actors.get(li.data("documentId"));
        if (!actor) return;
        reset(actor);
        ui.notifications.info(`Progression du créateur de personnage réinitialisée pour : ${actor.name}`);
      }
    },
    {
      name: "Marquer comme prêt",
      icon: '<i class="fas fa-check-circle"></i>',
      condition: li => {
        const actor = game.actors.get(li.data("documentId"));
        return game.user.isGM && actor?.type === "character" && !checkCompleted(actor) && !checkReady(actor);
      },
      callback: li => {
        const actor = game.actors.get(li.data("documentId"));
        if (!actor) return;
        setReady(actor);
        ui.notifications.info(`Personnage marqué comme prêt : ${actor.name}`);
      }
    },
    {
      name: "Marquer comme terminé",
      icon: '<i class="fas fa-flag-checkered"></i>',
      condition: li => {
        const actor = game.actors.get(li.data("documentId"));
        return game.user.isGM && actor?.type === "character" && !checkCompleted(actor);
      },
      callback: li => {
        const actor = game.actors.get(li.data("documentId"));
        if (!actor) return;
        setCompleted(actor);
        ui.notifications.info(`Personnage marqué comme terminé : ${actor.name}`);
      }
    }
  );
});