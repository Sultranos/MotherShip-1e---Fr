/**
 * Macro de traduction pour le compendium Tables Aléatoires (1e)
 * Traduit les tables de jets aléatoires de l'anglais vers le français
 * CRITIQUE : contient les tables pour panic check, death save, wound checks, etc.
 */

async function updateRollTablesCompendium() {
    console.log("🎲 Mise à jour du compendium Tables Aléatoires...");
    
    try {
        // Obtenir le compendium tables aléatoires
        const compendium = game.packs.get("mothership-fr.tables_aleatoires_1e");
        if (!compendium) {
            ui.notifications.error("❌ Compendium 'Tables Aléatoires (1e)' non trouvé !");
            return;
        }

        // Correspondances FR pour les tables critiques
        const tableTranslations = {
            // Tables de base
            "Panic Check": "Test de Panique",
            "Death Save": "Sauvegarde de Mort", 
            "Wound Check": "Test de Blessure",
            "Bleeding Wound": "Blessure Hémorragique",
            "Blunt Force Wound": "Blessure Contondante", 
            "Fire & Explosives Wound": "Blessure par Feu et Explosifs",
            "Gore/Massive Wound": "Blessure Grave/Massive",
            "Gunshot Wound": "Blessure par Balle",
            
            // Tables complémentaires
            "Maintenance Check": "Vérification de Maintenance",
            "Distress Signal": "Signal de Détresse",
            "Panic": "Panique",
            "Death": "Mort",
            "Wound": "Blessure",
            "Bleeding": "Hémorragie",
            "Blunt Force": "Force Contondante",
            "Fire & Explosives": "Feu et Explosifs", 
            "Gore/Massive": "Carnage/Massif",
            "Gunshot": "Balle",
            
            // Termes génériques
            "Roll": "Jet",
            "Result": "Résultat",
            "Effect": "Effet",
            "Description": "Description",
            "Success": "Succès",
            "Failure": "Échec",
            "Critical": "Critique",
            "Normal": "Normal"
        };
        
        // Traductions spécifiques pour les résultats de tables
        const resultTranslations = {
            // Panic Check results
            "You freeze up for 1 round. You cannot move or take any actions.": "Vous vous figez pendant 1 round. Vous ne pouvez ni bouger ni effectuer d'actions.",
            "You need to get out of here. You must move away from the source of your stress.": "Vous devez sortir d'ici. Vous devez vous éloigner de la source de votre stress.",
            "Something is behind you. You must turn around and look.": "Quelque chose est derrière vous. Vous devez vous retourner et regarder.",
            "It's all too much. Increase your Stress by 1d5.": "C'est trop. Augmentez votre Stress de 1d5.",
            "Nope. Increase your Stress by 1d10.": "Non. Augmentez votre Stress de 1d10.",
            "Oh god. Increase your Stress by 1d10 and gain a Condition.": "Oh mon dieu. Augmentez votre Stress de 1d10 et gagnez une Condition.",
            
            // Death Save results  
            "Close call. Reduce your Health to 1.": "Situation critique. Réduisez votre Santé à 1.",
            "You're dying. Make a Death Save at the start of each of your turns.": "Vous êtes en train de mourir. Faites une Sauvegarde de Mort au début de chacun de vos tours.",
            "You're dead.": "Vous êtes mort.",
            
            // Wound results patterns
            "Take 1 damage.": "Subissez 1 dégât.",
            "Take 1d5 damage.": "Subissez 1d5 dégâts.",
            "Take 1d10 damage.": "Subissez 1d10 dégâts.",
            "You're bleeding.": "Vous saignez.",
            "You're stunned for 1 round.": "Vous êtes étourdi pendant 1 round.",
            "You're knocked prone.": "Vous êtes renversé.",
            "Lose an arm.": "Perdez un bras.",
            "Lose a leg.": "Perdez une jambe.",
            "Lose an eye.": "Perdez un œil.",
            "Internal bleeding.": "Hémorragie interne.",
            "Broken bone.": "Os cassé.",
            "Severe burn.": "Brûlure grave.",
            "Infection risk.": "Risque d'infection."
        };

        // Obtenir tous les documents du compendium
        let documents = await compendium.getDocuments();
        console.log(`📊 ${documents.length} tables trouvées`);
        
        let updatedCount = 0;
        
        for (let table of documents) {
            let hasChanges = false;
            let updateData = {};
            
            // Traduire le nom de la table
            let newName = table.name;
            if (tableTranslations[table.name]) {
                newName = tableTranslations[table.name];
                updateData.name = newName;
                hasChanges = true;
                console.log(`📝 Table: "${table.name}" -> "${newName}"`);
            }
            
            // Corriger l'image de la table (systems/mosh -> systems/mothership-fr)
            if (table.data.img && table.data.img.startsWith("systems/mosh/")) {
                let newImg = table.data.img.replace("systems/mosh/", "systems/mothership-fr/");
                
                // Corriger les noms de fichiers spécifiques
                if (newImg.includes("panic_check_normal.png")) {
                    newImg = newImg.replace("panic_check_normal.png", "panic_check.png");
                }
                
                updateData.img = newImg;
                hasChanges = true;
                console.log(`🖼️ Image de table corrigée: "${table.data.img}" -> "${newImg}"`);
            }
            
            // Traduire la description si elle existe
            if (table.data.description && table.data.description.trim()) {
                let newDescription = table.data.description;
                
                // Appliquer les traductions de termes
                for (let [english, french] of Object.entries(tableTranslations)) {
                    const regex = new RegExp(`\\b${english}\\b`, 'gi');
                    newDescription = newDescription.replace(regex, french);
                }
                
                if (newDescription !== table.data.description) {
                    updateData.description = newDescription;
                    hasChanges = true;
                }
            }
            
            // Traduire les résultats de la table
            if (table.data.results && table.data.results.length > 0) {
                let newResults = [];
                let resultsChanged = false;
                
                for (let result of table.data.results) {
                    let newResult = foundry.utils.duplicate(result);
                    
                    // Traduire le texte du résultat
                    if (result.text) {
                        let newText = result.text;
                        
                        // Traductions directes de résultats
                        if (resultTranslations[result.text]) {
                            newText = resultTranslations[result.text];
                        } else {
                            // Traductions par patterns
                            for (let [english, french] of Object.entries(resultTranslations)) {
                                if (newText.includes(english)) {
                                    newText = newText.replace(english, french);
                                }
                            }
                            
                            // Traductions de termes génériques
                            for (let [english, french] of Object.entries(tableTranslations)) {
                                const regex = new RegExp(`\\b${english}\\b`, 'gi');
                                newText = newText.replace(regex, french);
                            }
                        }
                        
                        if (newText !== result.text) {
                            newResult.text = newText;
                            resultsChanged = true;
                        }
                    }
                    
                    // Corriger le chemin d'image (systems/mosh -> systems/mothership-fr)
                    if (result.img && result.img.startsWith("systems/mosh/")) {
                        let newImg = result.img.replace("systems/mosh/", "systems/mothership-fr/");
                        
                        // Corriger les noms de fichiers spécifiques
                        if (newImg.includes("panic_check_normal.png")) {
                            newImg = newImg.replace("panic_check_normal.png", "panic_check.png");
                        }
                        
                        newResult.img = newImg;
                        resultsChanged = true;
                        console.log(`🖼️ Image corrigée: "${result.img}" -> "${newImg}"`);
                    }
                    
                    newResults.push(newResult);
                }
                
                if (resultsChanged) {
                    updateData.results = newResults;
                    hasChanges = true;
                }
            }
            
            // Appliquer les modifications
            if (hasChanges) {
                try {
                    await table.update(updateData);
                    updatedCount++;
                    console.log(`✅ Table mise à jour: ${newName}`);
                } catch (error) {
                    console.error(`❌ Erreur mise à jour table ${table.name}:`, error);
                }
            }
        }
        
        console.log(`🎉 Traduction terminée! ${updatedCount} tables mises à jour.`);
        ui.notifications.info(`Tables Aléatoires: ${updatedCount} tables traduites`);
        
    } catch (error) {
        console.error("❌ Erreur lors de la traduction des tables:", error);
        ui.notifications.error("Erreur lors de la traduction des tables - Vérifiez la console");
    }
}

// Exécution de la traduction
updateRollTablesCompendium();