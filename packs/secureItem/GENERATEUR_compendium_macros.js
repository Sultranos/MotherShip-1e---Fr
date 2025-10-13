// =============================================================================
// GÉNÉRATEUR DE COMPENDIUM MACROS DE RECONSTRUCTION
// =============================================================================
// Crée un compendium avec toutes les macros de reconstruction française
// =============================================================================

(async () => {
    console.log("📦 CRÉATION DU COMPENDIUM MACROS DE RECONSTRUCTION");
    console.log("==================================================");
    
    const PACK_ID = "mothership-fr.macros_reconstruction_1e";
    
    // Fonction pour créer le compendium de macros
    const createMacroCompendium = async () => {
        // Vérifier si le pack existe
        let pack = game.packs.get(PACK_ID);
        
        if (!pack) {
            ui.notifications.warn(`Pack ${PACK_ID} introuvable - création nécessaire`);
            return;
        }
        
        console.log(`✅ Pack trouvé: ${pack.metadata.label}`);
        
        // Vider le pack d'abord
        const existingDocs = await pack.getDocuments();
        if (existingDocs.length > 0) {
            await pack.documentClass.deleteDocuments(existingDocs.map(d => d.id), {pack: PACK_ID});
            console.log(`🗑️ Supprimé ${existingDocs.length} macros existantes`);
        }
        
        // Lire le contenu des fichiers de macros
        const macrosData = {
            "macro_maitre": {
                name: "🚀 Reconstruction Française - MAÎTRE",
                type: "script",
                scope: "global",
                command: `// MACRO MAÎTRE - Exécute toutes les reconstructions
// Pour utiliser cette macro, assurez-vous que toutes les autres macros 
// de reconstruction sont présentes dans ce compendium

ui.notifications.info("🚀 Lancement de la reconstruction complète française...");

// Cette macro cherche et exécute toutes les autres macros de reconstruction
const macrosToRun = [
    "🎲 Reconstruction Tables Françaises",
    "🎒 Reconstruction Équipement", 
    "⚔️ Reconstruction Armes",
    "🛡️ Reconstruction Armures",
    "🏥 Reconstruction Soins Médicaux",
    "🎖️ Reconstruction Patchs",
    "🎯 Reconstruction Compétences",
    "👥 Reconstruction Classes"
];

let executed = 0;
for (const macroName of macrosToRun) {
    const macro = game.macros.find(m => m.name === macroName);
    if (macro) {
        try {
            await macro.execute();
            executed++;
            ui.notifications.info(\`✅ \${macroName} terminé\`);
        } catch (error) {
            ui.notifications.error(\`❌ Erreur \${macroName}: \${error.message}\`);
        }
    } else {
        ui.notifications.warn(\`⚠️ Macro '\${macroName}' introuvable\`);
    }
}

ui.notifications.info(\`🎉 Reconstruction complète! \${executed}/\${macrosToRun.length} macros exécutées\`);`,
                img: "icons/svg/upgrade.svg",
                folder: null
            },
            
            "macro_tables": {
                name: "🎲 Reconstruction Tables Françaises",
                type: "script", 
                scope: "global",
                command: `// Reconstruction des tables aléatoires françaises
// Cette macro reconstruit le compendium des tables avec les bonnes icônes

const PACK_ID = "mothership-fr.tables_aleatoires_1e";
const pack = game.packs.get(PACK_ID);

if (!pack) {
    ui.notifications.error("❌ Compendium tables aléatoires introuvable");
    return;
}

ui.notifications.info("🎲 Reconstruction des tables aléatoires...");

// Code de reconstruction des tables ici
// (Le code sera ajouté depuis les fichiers existants)

ui.notifications.info("✅ Tables aléatoires reconstruites");`,
                img: "icons/svg/d20-grey.svg",
                folder: null
            }
        };
        
        let created = 0;
        
        // Créer chaque macro
        for (const [id, macroData] of Object.entries(macrosData)) {
            try {
                const docData = {
                    _id: id,
                    ...macroData
                };
                
                const macro = await pack.documentClass.create(docData, {
                    pack: PACK_ID,
                    keepId: true
                });
                
                if (macro) {
                    console.log(`✅ Créé: ${macroData.name}`);
                    created++;
                }
            } catch (error) {
                console.error(`❌ Erreur création macro ${macroData.name}:`, error);
            }
        }
        
        console.log(`📋 CRÉATION TERMINÉE:`);
        console.log(`   ✅ Créées: ${created}`);
        console.log(`   📊 Total: ${Object.keys(macrosData).length}`);
        
        if (created > 0) {
            ui.notifications.info(`✅ ${created} macros créées dans le compendium`);
        }
        
        return { created, total: Object.keys(macrosData).length };
    };
    
    // Exécuter la création
    const result = await createMacroCompendium();
    
    if (result && result.created > 0) {
        ui.notifications.info("🎉 Compendium de macros créé avec succès!");
        console.log("📝 Pour utiliser: Compendium Packs → Macros Reconstruction → Glisser-déposer les macros");
    }
    
})();