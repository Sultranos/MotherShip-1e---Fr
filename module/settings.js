
import { rolltableConfig } from "./windows/settings-rolltables.js";

export const registerSettings = function () {
  
  game.settings.register('mothership-fr', 'firstEdition', {
    name: "1e Rules",
    hint: "utiliser les règles de la première édition de MotherShip.",
    default: true,
    scope: 'world',
    type: Boolean,
    config: true,
    onChange: value => {
      //log the change
      console.log("firstEdition set to " + value)
      //get list of actors
      let actorList = game.actors;
      let actorName = '';
      let maxStart = null;
      let maxEnd = null;
      //only make changes if calm is false
      if (game.settings.get('mothership-fr','useCalm') === false) {
        //if setting is now true
        if (value) {
          //loop through all actors and update their maximum stress
            //get list of actors
            let actorList = game.actors;
            //loop through each actor
            actorList.forEach(function(actor){ 
              //loop through each result
              if (actor.type === 'character') {
                //set character name
                actorName = actor.name;
                //set current values
                maxStart = actor.system.other.stress.max;
                //set max stress to 20
                actor.update({'system.other.stress.max': 20});
                //set final values
                actorList = game.actors;
                maxEnd = 20;
                //log change
                console.log(actorName + " stress.max changed from " + maxStart + " to " + maxEnd);
                //rerender this sheet
                actor.render();
              }
            });
        //if value is now false
        } else {
          //loop through all actors and update their maximum stress
            //get list of actors
            let actorList = game.actors;
            //loop through each actor
            actorList.forEach(function(actor){ 
              //loop through each result
              if (actor.type === 'character') {
                //set character name
                actorName = actor.name;
                //set current values
                maxStart = actor.system.other.stress.max;
                //set max stress to 999
                actor.update({'system.other.stress.max': 999});
                //set final values
                actorList = game.actors;
                maxEnd = 999;
                //log change
                console.log(actorName + " stress.max changed from " + maxStart + " to " + maxEnd);
                //rerender this sheet
                actor.render();
              }
            });
        }
      } else {
        //get list of actors
        let actorList = game.actors;
        //loop through each actor
        actorList.forEach(function(actor){ 
          //loop through each result
          if (actor.type === 'character') {
            //log change
            console.log("First Edition switched to " + value);
            //rerender this sheet
            actor.render();
          }
        });
      }
    }
  });

    // Sélection de la langue (pour usage futur, une seule langue disponible)
  game.settings.register('mothership-fr', 'language', {
    name: "Langue de l'interface",
    hint: "Choisissez la langue de l'interface du système. (Actuellement, seul le français est disponible)",
    default: "fr",
    scope: 'world',
    type: String,
    choices: {
      "fr": "Français"
    },
    config: true,
    onChange: value => {
      //log the change
      console.log("Langue du système définie sur " + value);
      // Ici, on pourrait recharger l'interface ou appliquer la langue si plusieurs étaient disponibles
    }
  });
  
  game.settings.register('mothership-fr', 'macroTarget', {
    name: "Cible de Macro",
    hint: "Qui devrait être la cible des macros?",
    default: "character",
    scope: 'world',
    type: String,
    choices: {
      "character": "Personnage actuellement sélectionné pour le joueur",
      "token": "Token actuellement sélectionnés dans la scène"
    },
    config: true,
    onChange: value => {
      //log the change
      console.log("Cible de macro définie sur " + value)
    }
  });

  game.settings.register('mothership-fr', 'critDamage', {
    name: "Dégâts de Coup Critique",
    hint: "Quel devrait être le montant des dégâts en cas de coup critique?",
    default: "advantage",
    scope: 'world',
    type: String,
    choices: {
      "advantage": "Lancer avec avantage",
      "doubleDamage": "Double le résultat des dégâts",
      "doubleDice": "Double les dés de dégâts",
      "maxDamage": "Résultat de dégâts maximum possible",
      "weaponValue": "Se référer aux dégâts critiques de chaque arme",
      "none": "Pas de dégâts critiques"
    },
    config: true,
    onChange: value => {
      //log the change
      console.log("Dégâts critiques définis sur " + value)
    }
  });

  game.settings.register('mothership-fr', 'damageDiceTheme', {
    name: "Thème des Dés de Dégâts",
    hint: "Si DiceSoNice est installé, quel thème doit être appliqué aux dés de dégâts?",
    default: "damage",
    scope: 'world',
    type: String,
    config: true,
    onChange: value => {
      //log the change
      console.log("Damage dice theme set to " + value)
    }
  });

  game.settings.register('mothership-fr', 'panicDieTheme', {
    name: "Panic Die Theme",
    hint: "If DiceSoNice is installed, what theme should be applied to the panic die?",
    default: "panic",
    scope: 'world',
    type: String,
    config: true,
    onChange: value => {
      //log the change
      console.log("Panic die theme set to " + value)
    }
  });

  game.settings.register('mothership-fr', 'hideWeight', {
    name: "Hide 0e Weight",
    hint: "Hide the 0e weight mechanic in the items list for players and ships?",
    default: true,
    scope: 'world',
    type: Boolean,
    config: true,
    onChange: value => {
      //log the change
      console.log("hideWeight set to " + value)
    }
  });
  
  game.settings.register('mothership-fr', 'useCalm', {
    name: "Use Calm?",
    hint: "Uses the traaa.sh Calm system instead of Stress.",
    default: false,
    scope: 'world',
    type: Boolean,
    config: true,
    onChange: value => {
      //log the change
      console.log("useCalm set to " + value);
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
      //if setting is now true
      if (value) {
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
            //update max calm
              //set max calm to 85 if min stress is 2
              if (minStart === 2) {
                actor.update({'system.other.stress.max': 85});
                maxEnd = 85;
              //otherwise convert the min stress to max calm
              } else {
                actor.update({'system.other.stress.max': Math.round(85-(actor.system.other.stress.value*3))});
                maxEnd = Math.round(85-(actor.system.other.stress.value*3));
              }
            //set min stress to 0
            actor.update({'system.other.stress.min': 0});
            minEnd = 0;
            //update calm
              //set calm to 85 if stress is 2
              if (valueStart === 2) {
                actor.update({'system.other.stress.value': 85});
                valueEnd = 85;
              //otherwise convert stress to calm
              } else {
                actor.update({'system.other.stress.value': Math.round(85-(actor.system.other.stress.value*3))});
                valueEnd = Math.round(85-(actor.system.other.stress.value*3));
              }
            //set stress label to Calm
            actor.update({'system.other.stress.label': 'Calm'});
            labelEnd = 'Calm';
            //log change
            console.log(actorName + " stress.min changed from " + minStart + " to " + minEnd);
            console.log(actorName + " stress.value changed from " + valueStart + " to " + valueEnd);
            console.log(actorName + " stress.max changed from " + maxStart + " to " + maxEnd);
            console.log(actorName + " stress.label changed from " + labelStart + " to " + labelEnd);
            //rerender this sheet
            actor.render();
          }
        });
      //if value is now false
      } else {
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
            //convert maximum calm to min stress
              //set min stress to 20 if > 20
              if (Math.round((85-actor.system.other.stress.max)/3) > 20) {
                actor.update({'system.other.stress.min': 20});
                minEnd = 20;
              //set min stress to 2 if < 2
              } else if (Math.round((85-actor.system.other.stress.max)/3) < 2) {
                actor.update({'system.other.stress.min': 2});
                minEnd = 2;
              //regular value
              } else {
                actor.update({'system.other.stress.min': Math.round((85-actor.system.other.stress.max)/3)});
                minEnd = Math.round((85-actor.system.other.stress.max)/3);
              }
            //set max stress based on current system setting
            if (game.settings.get('mothership-fr','firstEdition')) {
              //set max stress to 20
              actor.update({'system.other.stress.max': 20});
              maxEnd = 20;
            } else {
              //set max stress to 999
              actor.update({'system.other.stress.max': 999});
              maxEnd = 999;
            }
            //convert calm to stress
            actor.update({'system.other.stress.value': Math.round((85-actor.system.other.stress.value)/3)});
            valueEnd = Math.round((85-actor.system.other.stress.value)/3);
            //set stress label to Stress
            actor.update({'system.other.stress.label': 'Stress'});
            labelEnd = 'Stress'
            //log change
            console.log(actorName + " stress.min changed from " + minStart + " to " + minEnd);
            console.log(actorName + " stress.value changed from " + valueStart + " to " + valueEnd);
            console.log(actorName + " stress.max changed from " + maxStart + " to " + maxEnd);
            console.log(actorName + " stress.label changed from " + labelStart + " to " + labelEnd);
            //rerender this sheet
            actor.render();
          }
        });
      }

    }
  });

  game.settings.register('mothership-fr', 'androidPanic', {
    name: "Utiliser les tables de panique Android?",
    hint: "Ajoute des tables spécifiques aux androids pour les tests de panique.",
    default: false,
    scope: 'world',
    type: Boolean,
    config: true,
    onChange: value => {
      //log the change
      console.log("androidPanic set to " + value)
    }
  });

  game.settings.register('mothership-fr', 'autoStress', {
    name: "Gain de Stress Automatique?",
    hint: "Gère automatiquement le gain de stress lors d'un échec.",
    default: true,
    scope: 'world',
    type: Boolean,
    config: true,
    onChange: value => {
      //log the change
      console.log("autoStress set to " + value)
    }
  });

  game.settings.registerMenu('mothership-fr', 'rolltableSelector', {
    name: "Configuration des tables",
    label: "Choisir les tables",
    hint: "Personnalisez les tables aléatoires utilisées.",
    icon: "fa-solid fa-list",
    type: rolltableConfig
  });

  game.settings.register('mothership-fr', 'table0ePanicStressNormal', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table0ePanicStressAndroid', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table0ePanicCalmNormal', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table0ePanicCalmAndroid', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table1ePanicStressNormal', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.dCCBZKRD1IYxXLTn"
  });

  game.settings.register('mothership-fr', 'table1ePanicStressAndroid', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.KaYEiIP4VMHJwT0U"
  });

  game.settings.register('mothership-fr', 'table1ePanicCalmNormal', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table1ePanicCalmAndroid', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table1eWoundBluntForce', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.fwWWBsRF35Vmjc2z"
  });

  game.settings.register('mothership-fr', 'table1eWoundBleeding', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.qzn1VVpLGa8oSmZ7"
  });

  game.settings.register('mothership-fr', 'table1eWoundGunshot', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.H5GJFM2B7HmJwKSf"
  });

  game.settings.register('mothership-fr', 'table1eWoundFireExplosives', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.s2wcefhNyZ2k3TWa"
  });

  game.settings.register('mothership-fr', 'table1eWoundGoreMassive', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.jPl7bba6vTcnxFAw"
  });

  game.settings.register('mothership-fr', 'table0eDeath', {
    scope: 'world',
    config: false,
    type: String,
    default: ""
  });

  game.settings.register('mothership-fr', 'table1eDeath', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.WdX3LR05ajq3V539"
  });

  game.settings.register('mothership-fr', 'table1eDistressSignal', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.TjyhTaIioj7JdVwC"
  });

  game.settings.register('mothership-fr', 'table1eMegadamageEffects', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.JvWzdkB0fxxEn9jb"
  });

  game.settings.register('mothership-fr', 'table1eMaintenance', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.4YxKHaNEBZjnuL09"
  });

  game.settings.register('mothership-fr', 'table1eBankruptcy', {
    scope: 'world',
    config: false,
    type: String,
    default: "Compendium.mothership-fr.tables_aleatoires_1e.RollTable.svjXOcBSJDSdPC6d"
  });

};

