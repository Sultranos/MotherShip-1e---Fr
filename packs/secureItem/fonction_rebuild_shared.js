// =============================================================================
// FONCTION UTILITAIRE PARTAGÉE : RECONSTRUCTION DE COMPENDIUM
// =============================================================================
// Fonction générique pour reconstruire un compendium avec données sécurisées
// Utilisée par toutes les macros spécialisées de reconstruction
// =============================================================================

/**
 * Fonction générique de reconstruction de compendium
 * @param {string} packId - ID du pack à reconstruire  
 * @param {Object} donneesSecurisees - Données hardcodées avec IDs préservés
 * @param {string} typeContenu - Type de contenu pour logging
 * @returns {Promise<Object>} Résultat de la reconstruction
 */
async function rebuildCompendium(packId, donneesSecurisees, typeContenu) {
    
    console.log(`📦 Reconstruction du compendium: ${packId}`);
    console.log(`📊 Type de contenu: ${typeContenu}`);
    
    let rapport = {
        packId: packId,
        typeContenu: typeContenu,
        itemsTotal: Object.keys(donneesSecurisees).length,
        itemsCrees: 0,
        itemsErreurs: 0,
        errors: []
    };
    
    try {
        // Vérifier l'existence du pack
        const pack = game.packs.get(packId);
        if (!pack) {
            const erreur = `❌ Pack '${packId}' introuvable`;
            console.error(erreur);
            rapport.errors.push(erreur);
            return rapport;
        }
        
        console.log(`✅ Pack trouvé: ${pack.metadata.label}`);
        
        // Vérifier si le pack est vide ou a besoin de reconstruction
        const existingContent = await pack.getDocuments();
        if (existingContent.length > 0) {
            console.log(`ℹ️ Pack contient déjà ${existingContent.length} éléments - reconstruction sélective`);
        }
        
        // Reconstruction élément par élément avec IDs préservés
        for (const [originalId, itemData] of Object.entries(donneesSecurisees)) {
            try {
                // Vérifier si l'élément existe déjà
                const existingItem = existingContent.find(item => item.name === itemData.name);
                if (existingItem) {
                    console.log(`⏭️ '${itemData.name}' existe déjà - ignoré`);
                    continue;
                }
                
                // Créer le document avec l'ID original préservé
                const docData = {
                    _id: originalId,
                    ...itemData
                };
                
                const document = await pack.documentClass.create(docData, {
                    pack: packId,
                    keepId: true
                });
                
                if (document) {
                    console.log(`✅ Créé: '${itemData.name}' [${originalId}]`);
                    rapport.itemsCrees++;
                } else {
                    throw new Error(`Échec création de '${itemData.name}'`);
                }
                
            } catch (error) {
                const errMsg = `❌ Erreur création '${itemData.name}': ${error.message}`;
                console.error(errMsg);
                rapport.errors.push(errMsg);
                rapport.itemsErreurs++;
            }
        }
        
        // Rapport final
        console.log(`📋 RECONSTRUCTION ${typeContenu.toUpperCase()} TERMINÉE:`);
        console.log(`   ✅ Créés: ${rapport.itemsCrees}`);
        console.log(`   ❌ Erreurs: ${rapport.itemsErreurs}`);
        console.log(`   📊 Total: ${rapport.itemsTotal}`);
        
        if (rapport.itemsCrees > 0) {
            ui.notifications.info(`✅ ${typeContenu}: ${rapport.itemsCrees} éléments créés avec succès`);
        }
        
        if (rapport.itemsErreurs > 0) {
            ui.notifications.warn(`⚠️ ${typeContenu}: ${rapport.itemsErreurs} erreurs de création`);
        }
        
    } catch (error) {
        const erreurGlobale = `❌ Erreur globale reconstruction ${typeContenu}: ${error.message}`;
        console.error(erreurGlobale);
        rapport.errors.push(erreurGlobale);
        ui.notifications.error(`❌ Échec reconstruction ${typeContenu}`);
    }
    
    return rapport;
}

// Export pour utilisation dans les autres macros
window.rebuildCompendium = rebuildCompendium;