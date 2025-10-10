// =============================================================================
// MACRO FOUNDRY VTT : COPIE DES CLASSES VERS MOTHERSHIP-FR
// =============================================================================
// Cette macro copie les classes du pack original vers le nouveau système
// =============================================================================

(async () => {
    const SOURCE_PACK = "fvtt_mosh_1e_psg.items_classes_1e";
    const TARGET_PACK = "mothership-fr.classes_1e";
    
    // Vérifier si les compendiums existent
    const sourcePack = game.packs.get(SOURCE_PACK);
    const targetPack = game.packs.get(TARGET_PACK);
    
    if (!sourcePack) {
        ui.notifications.error(`Compendium source ${SOURCE_PACK} introuvable !`);
        return;
    }
    
    if (!targetPack) {
        ui.notifications.error(`Compendium cible ${TARGET_PACK} introuvable !`);
        return;
    }
    
    ui.notifications.info("🔄 Début de la copie des classes...");
    
    try {
        // Obtenir tous les documents du compendium source
        const sourceDocuments = await sourcePack.getDocuments();
        console.log(`📚 ${sourceDocuments.length} classes trouvées dans le pack source`);
        
        // Vider le pack cible d'abord
        const existingDocs = await targetPack.getDocuments();
        if (existingDocs.length > 0) {
            console.log(`🗑️ Suppression de ${existingDocs.length} documents existants...`);
            await targetPack.deleteDocuments(existingDocs.map(doc => doc.id));
        }
        
        let copiedCount = 0;
        
        for (const sourceDoc of sourceDocuments) {
            // Préparer les données pour la copie
            const docData = {
                name: sourceDoc.name,
                type: sourceDoc.type,
                img: sourceDoc.img,
                system: foundry.utils.deepClone(sourceDoc.system),
                flags: foundry.utils.deepClone(sourceDoc.flags || {})
            };
            
            // Corriger les références de compendium dans les données système
            const docString = JSON.stringify(docData);
            const correctedString = docString.replace(/fvtt_mosh_1e_psg/g, 'mothership-fr');
            const correctedData = JSON.parse(correctedString);
            
            // Créer le nouveau document dans le pack cible
            await targetPack.createDocument(correctedData);
            copiedCount++;
            
            console.log(`✅ Classe copiée: ${sourceDoc.name} (${sourceDoc.id})`);
        }
        
        // Message de succès
        const successMsg = `🎯 Copie des classes terminée !\n✅ ${copiedCount} classes copiées\n📦 Vers: ${TARGET_PACK}`;
        ui.notifications.info(successMsg);
        console.log(successMsg);
        
        // Vérification finale
        const finalDocs = await targetPack.getDocuments();
        console.log(`📋 Vérification finale: ${finalDocs.length} classes dans le pack cible`);
        
        finalDocs.forEach(doc => {
            console.log(`  - ${doc.name} (${doc.type})`);
        });
        
    } catch (error) {
        const errorMsg = `❌ Erreur lors de la copie des classes: ${error.message}`;
        ui.notifications.error(errorMsg);
        console.error(errorMsg, error);
    }
})();