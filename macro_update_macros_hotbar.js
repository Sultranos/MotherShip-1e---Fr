/**
 * Macro de traduction pour le compendium Macros Barre Rapide (1e)
 * Traduit les macros de barre rapide de l'anglais vers le français
 */

async function updateMacrosHotbarCompendium() {
    console.log("🔥 Mise à jour du compendium Macros Barre Rapide...");
    
    try {
        // Obtenir le compendium macros hotbar
        const compendium = game.packs.get("mothership-fr.macros_hotbar_1e");
        if (!compendium) {
            ui.notifications.error("❌ Compendium 'Macros Barre Rapide (1e)' non trouvé !");
            return;
        }

        // Correspondances FR pour les noms de macros
        const macroTranslations = {
            // Macros de base
            "Panic Check": "Test de Panique",
            "Death Save": "Sauvegarde de Mort",
            "Wound Check": "Test de Blessure", 
            "Save": "Sauvegarde",
            "Stat Check": "Test de Caractéristique",
            "Cover": "Couverture",
            
            // Gestion du stress/calme
            "Gain Stress": "Gagner du Stress",
            "Lose Stress": "Perdre du Stress", 
            "Relieve Stress": "Soulager le Stress",
            "Gain Calm": "Gagner du Calme",
            "Lose Calm": "Perdre du Calme",
            "Rest Save": "Sauvegarde de Repos",
            
            // Actions de combat
            "Attack": "Attaque",
            "Damage": "Dégâts",
            "Defense": "Défense",
            "Initiative": "Initiative",
            
            // Termes génériques
            "Check": "Test",
            "Roll": "Jet",
            "Macro": "Macro",
            "Hotbar": "Barre Rapide"
        };
        
        // Traductions pour les commandes de macro
        const commandTranslations = {
            // Fonctions du système
            "game.mosh.initRollCheck": "game.mosh.initRollCheck",
            "game.mosh.rollStatMacro": "game.mosh.rollStatMacro",
            "game.mosh.initRollTable": "game.mosh.initRollTable",
            "game.mosh.initModifyActor": "game.mosh.initModifyActor",
            
            // Messages d'interface
            "Rolling for panic...": "Lancement pour la panique...",
            "Rolling for death save...": "Lancement pour la sauvegarde de mort...",
            "Rolling for wound check...": "Lancement pour le test de blessure...",
            "Rolling stat check...": "Lancement du test de caractéristique...",
            "Selecting cover...": "Sélection de la couverture...",
            
            // Paramètres de stress
            "system.other.stress.value": "system.other.stress.value",
            "Stress gained": "Stress gagné",
            "Stress relieved": "Stress soulagé", 
            "Calm gained": "Calme gagné",
            "Calm lost": "Calme perdu",
            
            // Noms de tables (UUID)
            "Compendium.mothership-fr.tables_aleatoires_1e": "Compendium.mothership-fr.tables_aleatoires_1e"
        };

        // Obtenir tous les documents du compendium
        let documents = await compendium.getDocuments();
        console.log(`🔥 ${documents.length} macros trouvées`);
        
        let updatedCount = 0;
        
        for (let macro of documents) {
            let hasChanges = false;
            let updateData = {};
            
            // Traduire le nom de la macro
            let newName = macro.name;
            if (macroTranslations[macro.name]) {
                newName = macroTranslations[macro.name];
                updateData.name = newName;
                hasChanges = true;
                console.log(`🔥 Macro: "${macro.name}" -> "${newName}"`);
            }
            
            // Traduire la commande si nécessaire (généralement on garde le code)
            if (macro.command) {
                let newCommand = macro.command;
                
                // Traduire les commentaires et messages dans le code
                for (let [english, french] of Object.entries(commandTranslations)) {
                    if (newCommand.includes(english)) {
                        newCommand = newCommand.replace(new RegExp(english, 'g'), french);
                    }
                }
                
                // Mettre à jour les références UUID vers le système français
                newCommand = newCommand.replace(/Compendium\.mosh\./g, 'Compendium.mothership-fr.');
                newCommand = newCommand.replace(/Compendium\.fvtt_mosh_1e_psg\./g, 'Compendium.mothership-fr.');
                
                if (newCommand !== macro.command) {
                    updateData.command = newCommand;
                    hasChanges = true;
                }
            }
            
            // Appliquer les modifications
            if (hasChanges) {
                try {
                    await macro.update(updateData);
                    updatedCount++;
                    console.log(`✅ Macro mise à jour: ${newName}`);
                } catch (error) {
                    console.error(`❌ Erreur mise à jour macro ${macro.name}:`, error);
                }
            }
        }
        
        console.log(`🎉 Traduction terminée! ${updatedCount} macros mises à jour.`);
        ui.notifications.info(`Macros Barre Rapide: ${updatedCount} macros traduites`);
        
    } catch (error) {
        console.error("❌ Erreur lors de la traduction des macros hotbar:", error);
        ui.notifications.error("Erreur lors de la traduction des macros hotbar - Vérifiez la console");
    }
}

// Exécution de la traduction
updateMacrosHotbarCompendium();