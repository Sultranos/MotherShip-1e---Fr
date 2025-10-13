// =============================================================================
// MACRO MAÎTRE - RECONSTRUCTION FRANÇAISE MOTHERSHIP
// =============================================================================
// Macro principale qui orchestre l'exécution des macros spécialisées
// pour reconstruire tous les compendiums français
// =============================================================================

(async () => {
    console.log("🚀 LANCEMENT DU SYSTÈME DE RECONSTRUCTION FRANÇAIS");
    console.log("==================================================");
    
    // Confirmation utilisateur
    const confirmation = await Dialog.confirm({
        title: "🔧 Reconstruction Compendiums Français",
        content: `
            <h2>⚠️ SYSTÈME DE RECONSTRUCTION COMPLET</h2>
            <p>Cette macro va exécuter toutes les macros de reconstruction pour réparer les compendiums français.</p>
            
            <h3>📋 Compendiums à reconstruire:</h3>
            <ul>
                <li>🎲 Tables Aléatoires</li>
                <li>🎒 Équipement</li>
                <li>⚔️ Armes</li>
                <li>🛡️ Armures</li>
                <li>🏥 Soins Médicaux</li>
                <li>🎖️ Patchs</li>
                <li>🎯 Compétences</li>
                <li>👥 Classes</li>
            </ul>
            
            <h3>🔒 Garanties de sécurité:</h3>
            <ul>
                <li>✅ Conservation des IDs originaux</li>
                <li>✅ Données françaises authentiques</li>
                <li>✅ Reconstruction sélective</li>
                <li>✅ Rapport détaillé</li>
            </ul>
            
            <p><strong>Continuer la reconstruction automatique ?</strong></p>
        `,
        yes: "🚀 Lancer la Reconstruction",
        no: "❌ Annuler",
        defaultYes: false
    });
    
    if (!confirmation) {
        ui.notifications.info("❌ Reconstruction annulée par l'utilisateur");
        console.log("❌ Reconstruction annulée par l'utilisateur");
        return;
    }
    
    try {
        // Configuration des macros à exécuter
        const macrosConfig = [
            {
                name: "🎲 Tables Aléatoires",
                macroName: "Reconstruction Tables Françaises",
                priority: 1
            },
            {
                name: "🎒 Équipement",
                macroName: "Reconstruction Équipement",
                priority: 2
            },
            {
                name: "⚔️ Armes",
                macroName: "Reconstruction Armes",
                priority: 3
            },
            {
                name: "🛡️ Armures",
                macroName: "Reconstruction Armures",
                priority: 4
            },
            {
                name: "🏥 Soins Médicaux",
                macroName: "Reconstruction Soins Médicaux",
                priority: 5
            },
            {
                name: "🎖️ Patchs",
                macroName: "Reconstruction Patchs",
                priority: 6
            },
            {
                name: "🎯 Compétences",
                macroName: "Reconstruction Compétences",
                priority: 7
            },
            {
                name: "👥 Classes",
                macroName: "Reconstruction Classes",
                priority: 8
            }
        ];
        
        ui.notifications.info("🔧 Début de la reconstruction complète...");
        
        let totalSuccess = 0;
        let totalErrors = 0;
        
        // Exécuter chaque macro dans l'ordre de priorité
        for (const config of macrosConfig) {
            try {
                console.log(`\n🔧 Exécution: ${config.name}`);
                ui.notifications.info(`🔧 ${config.name}...`);
                
                // Chercher la macro par nom
                const macro = game.macros.find(m => m.name === config.macroName);
                
                if (macro) {
                    // Exécuter la macro
                    const result = await macro.execute();
                    
                    console.log(`✅ ${config.name} terminé`);
                    totalSuccess++;
                } else {
                    console.warn(`⚠️ Macro '${config.macroName}' introuvable - ignorée`);
                    ui.notifications.warn(`⚠️ Macro '${config.macroName}' introuvable`);
                }
                
            } catch (error) {
                console.error(`❌ Erreur pour ${config.name}:`, error);
                ui.notifications.error(`❌ Erreur ${config.name}: ${error.message}`);
                totalErrors++;
            }
        }
        
        // Rapport final
        console.log("\n🏁 RECONSTRUCTION COMPLÈTE TERMINÉE");
        console.log("==================================");
        console.log(`✅ Compendiums traités avec succès: ${totalSuccess}`);
        console.log(`❌ Erreurs rencontrées: ${totalErrors}`);
        console.log(`📊 Total traité: ${macrosConfig.length}`);
        
        const messageSucces = `🎉 Reconstruction complète terminée ! ${totalSuccess}/${macrosConfig.length} compendiums traités avec succès.`;
        ui.notifications.info(messageSucces);
        
        // Instructions finales
        if (totalSuccess > 0) {
            console.log("\n📝 PROCHAINES ÉTAPES:");
            console.log("1. Vérifiez les compendiums dans l'onglet Compendium Packs");
            console.log("2. Testez la création de personnages");
            console.log("3. Vérifiez que les tables aléatoires fonctionnent");
            
            ui.notifications.info("✅ Consultez la console pour les instructions de vérification");
        }
        
        if (totalErrors > 0) {
            ui.notifications.warn(`⚠️ ${totalErrors} erreurs rencontrées - consultez la console pour les détails`);
        }
        
    } catch (error) {
        console.error("❌ ERREUR CRITIQUE DANS LE SYSTÈME DE RECONSTRUCTION:", error);
        ui.notifications.error("❌ Erreur critique lors de la reconstruction");
        throw error;
    }
})();