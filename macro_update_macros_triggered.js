/**
 * Macro de traduction pour le compendium Macros Déclenchées (1e)  
 * Traduit les macros déclenchées de l'anglais vers le français
 */

async function updateMacrosTriggeredCompendium() {
    console.log("⚡ Mise à jour du compendium Macros Déclenchées...");
    
    try {
        // Obtenir le compendium macros triggered
        const compendium = game.packs.get("mothership-fr.macros_triggered_1e");
        if (!compendium) {
            ui.notifications.error("❌ Compendium 'Macros Déclenchées (1e)' non trouvé !");
            return;
        }

        // Correspondances FR pour les noms de macros déclenchées
        const macroTranslations = {
            // Modifications de stress
            "+1 Stress": "+1 Stress",
            "+1d5 Stress": "+1d5 Stress", 
            "+1d10 Stress": "+1d10 Stress",
            "-1 Stress": "-1 Stress",
            "-1d5 Stress": "-1d5 Stress",
            "-1d10 Stress": "-1d10 Stress",
            "-1 Min Stress": "-1 Stress Min",
            "+1 Max Stress": "+1 Stress Max",
            "-1 Max Stress": "-1 Stress Max",
            "-2 Max Stress": "-2 Stress Max",
            
            // Modifications de santé
            "+1 Health": "+1 Santé",
            "+1d5 Health": "+1d5 Santé",
            "+1d10 Health": "+1d10 Santé", 
            "-1 Health": "-1 Santé",
            "-1d5 Health": "-1d5 Santé",
            "-1d10 Health": "-1d10 Santé",
            
            // Modifications d'attributs  
            "+1 Strength": "+1 Force",
            "+1d5 Strength": "+1d5 Force",
            "+1d10 Strength": "+1d10 Force",
            "-1 Strength": "-1 Force", 
            "-1d5 Strength": "-1d5 Force",
            "-1d10 Strength": "-1d10 Force",
            "-5 Strength": "-5 Force",
            
            "+1 Speed": "+1 Vitesse",
            "+1d5 Speed": "+1d5 Vitesse", 
            "+1d10 Speed": "+1d10 Vitesse",
            "-1 Speed": "-1 Vitesse",
            "-1d5 Speed": "-1d5 Vitesse",
            "-1d10 Speed": "-1d10 Vitesse",
            "-5 Speed": "-5 Vitesse",
            
            "+1 Intellect": "+1 Intellect",
            "+1d5 Intellect": "+1d5 Intellect",
            "+1d10 Intellect": "+1d10 Intellect", 
            "-1 Intellect": "-1 Intellect",
            "-1d5 Intellect": "-1d5 Intellect",
            "-1d10 Intellect": "-1d10 Intellect",
            "-5 Intellect": "-5 Intellect",
            
            "+1 Combat": "+1 Combat",
            "+1d5 Combat": "+1d5 Combat",
            "+1d10 Combat": "+1d10 Combat",
            "-1 Combat": "-1 Combat",
            "-1d5 Combat": "-1d5 Combat", 
            "-1d10 Combat": "-1d10 Combat",
            
            // Modifications de sauvegardes
            "+1 Body Save": "+1 Sauvegarde de Corps",
            "+1d5 Body Save": "+1d5 Sauvegarde de Corps",
            "+1d10 Body Save": "+1d10 Sauvegarde de Corps",
            "-1 Body Save": "-1 Sauvegarde de Corps",
            "-1d5 Body Save": "-1d5 Sauvegarde de Corps",
            "-1d10 Body Save": "-1d10 Sauvegarde de Corps",
            
            "+1 Sanity Save": "+1 Sauvegarde de Sanité",
            "+1d5 Sanity Save": "+1d5 Sauvegarde de Sanité", 
            "+1d10 Sanity Save": "+1d10 Sauvegarde de Sanité",
            "-1 Sanity Save": "-1 Sauvegarde de Sanité",
            "-1d5 Sanity Save": "-1d5 Sauvegarde de Sanité",
            "-1d10 Sanity Save": "-1d10 Sauvegarde de Sanité",
            
            "+1 Fear Save": "+1 Sauvegarde de Peur",
            "+1d5 Fear Save": "+1d5 Sauvegarde de Peur",
            "+1d10 Fear Save": "+1d10 Sauvegarde de Peur", 
            "-1 Fear Save": "-1 Sauvegarde de Peur",
            "-1d5 Fear Save": "-1d5 Sauvegarde de Peur",
            "-1d10 Fear Save": "-1d10 Sauvegarde de Peur",
            
            // Conditions et effets spéciaux
            "+1 Wound": "+1 Blessure",
            "-1 Wound": "-1 Blessure",
            "+1 Bleeding": "+1 Saignement",
            "+1 Broken": "+1 Cassé",
            "+1 Insane": "+1 Fou",
            "+1 Anhedonia": "+1 Anhédonie",
            "+1 Cowardice": "+1 Lâcheté",
            "+1 Death Drive": "+1 Pulsion de Mort",
            "+1 Emotional Detachment": "+1 Détachement Émotionnel",
            "+1 Escapism": "+1 Escapisme",
            "+1 Hallucinations": "+1 Hallucinations", 
            "+1 Hypervigilance": "+1 Hypervigilance",
            "+1 Paranoia": "+1 Paranoïa",
            "+1 Tremors": "+1 Tremblements",
            
            // Conditions androïdes
            "+1 Bit Rot": "+1 Corruption de Bits",
            "+1 Deviant Logic Core": "+1 Noyau Logique Déviant",
            "+1 Ethical Directive Failure": "+1 Échec Directive Éthique",
            "+1 Ethical Directive Misread": "+1 Mauvaise Lecture Directive Éthique",
            "+1 Faulty Heuristics": "+1 Heuristiques Défaillantes",
            "+1 Fried Logic Core": "+1 Noyau Logique Grillé",
            "+1 Suppressed Memories": "+1 Mémoires Supprimées"
        };
        
        // Traductions pour les commandes de macro
        const commandTranslations = {
            // Fonctions du système
            "game.mosh.initModifyActor": "game.mosh.initModifyActor",
            
            // Champs d'attributs système
            "system.other.stress.value": "system.other.stress.value",
            "system.other.stress.min": "system.other.stress.min",
            "system.other.stress.max": "system.other.stress.max",
            "system.health.value": "system.health.value",
            "system.health.max": "system.health.max",
            "system.hits.value": "system.hits.value",
            "system.stats.strength.value": "system.stats.strength.value",
            "system.stats.speed.value": "system.stats.speed.value", 
            "system.stats.intellect.value": "system.stats.intellect.value",
            "system.stats.combat.value": "system.stats.combat.value",
            "system.stats.sanity.value": "system.stats.sanity.value",
            "system.stats.fear.value": "system.stats.fear.value",
            "system.stats.body.value": "system.stats.body.value",
            
            // Messages
            "Stress increased": "Stress augmenté",
            "Stress decreased": "Stress diminué", 
            "Health increased": "Santé augmentée",
            "Health decreased": "Santé diminuée",
            "Wound gained": "Blessure gagnée",
            "Wound healed": "Blessure soignée",
            "Condition added": "Condition ajoutée"
        };

        // Obtenir tous les documents du compendium
        let documents = await compendium.getDocuments();
        console.log(`⚡ ${documents.length} macros trouvées`);
        
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
                console.log(`⚡ Macro: "${macro.name}" -> "${newName}"`);
            }
            
            // Traduire la commande si nécessaire
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
        ui.notifications.info(`Macros Déclenchées: ${updatedCount} macros traduites`);
        
    } catch (error) {
        console.error("❌ Erreur lors de la traduction des macros triggered:", error);
        ui.notifications.error("Erreur lors de la traduction des macros triggered - Vérifiez la console");
    }
}

// Exécution de la traduction
updateMacrosTriggeredCompendium();