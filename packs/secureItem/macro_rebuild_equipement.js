// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION ÉQUIPEMENT FRANÇAIS
// =============================================================================
// Reconstruit le compendium équipement avec les données françaises sécurisées
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.equipement_1e";
    
    console.log("🔧 RECONSTRUCTION ÉQUIPEMENT FRANÇAIS");
    console.log("====================================");
    
    // Données sécurisées de l'équipement français avec IDs préservés
    const equipementFR = {
        "EkA39xa1vq6SghtP": {
            name: "Stimpak",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/stimpak.png",
            system: {
                description: {
                    value: "<p>Un injecteur médical d'urgence contenant un cocktail de stimulants et d'analgésiques. Restaure 1d5 points de santé instantanément.</p>"
                },
                cost: { value: 25 },
                weight: { value: 0.1 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "NpVPgi5XxNlAuKd4": {
            name: "Pièce de Défi",
            type: "equipment", 
            img: "systems/mothership-fr/images/icons/equipment/challenge_coin.png",
            system: {
                description: {
                    value: "<p>Une pièce commémorative en métal gravée. Porte-bonheur traditionnel des militaires spatiaux.</p>"
                },
                cost: { value: 5 },
                weight: { value: 0.01 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "a39zXRy6E5cTbDoA": {
            name: "Jumelles",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/binoculars.png", 
            system: {
                description: {
                    value: "<p>Jumelles militaires haute qualité avec amplificateur de lumière et télémètre intégré.</p>"
                },
                cost: { value: 150 },
                weight: { value: 0.5 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "XJvPld6W5IHUSMxo": {
            name: "Ration de Combat",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/mre.png",
            system: {
                description: {
                    value: "<p>Repas prêt à consommer, stérilisé et enrichi. Fournit la nutrition nécessaire pour 24 heures.</p>"
                },
                cost: { value: 8 },
                weight: { value: 0.3 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "GnBHxFDlKW5q621M": {
            name: "Munitions",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/ammo.png",
            system: {
                description: {
                    value: "<p>Munitions standard pour armes de poing et rifles. Chargeur de 30 cartouches.</p>"
                },
                cost: { value: 20 },
                weight: { value: 0.2 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "COXIh1YyOTYWICFp": {
            name: "Matériel de Camping",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/camping_gear.png",
            system: {
                description: {
                    value: "<p>Kit de survie compact incluant tente pliable, sac de couchage thermique et ustensiles de base.</p>"
                },
                cost: { value: 200 },
                weight: { value: 2.5 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "Paw9q0OG6YIl5941": {
            name: "Lunettes Infrarouges",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/infrared_goggles.png",
            system: {
                description: {
                    value: "<p>Système de vision nocturne avancé permettant de voir dans l'obscurité totale jusqu'à 50 mètres.</p>"
                },
                cost: { value: 500 },
                weight: { value: 0.4 },
                rarity: "uncommon",
                quantity: { value: 1 }
            }
        },
        
        "nvJvf6EbBIFpJ94E": {
            name: "Localisateur Personnel",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/personal_locator.png",
            system: {
                description: {
                    value: "<p>Balise de détresse personnelle avec GPS et transmetteur d'urgence longue portée.</p>"
                },
                cost: { value: 300 },
                weight: { value: 0.2 },
                rarity: "common",
                quantity: { value: 1 }
            }
        },
        
        "kWAgoLy1AuhUln9f": {
            name: "Chien",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/dog.png",
            system: {
                description: {
                    value: "<p>Compagnon canin loyal et bien dressé. Excellent pour la détection et la sécurité.</p>"
                },
                cost: { value: 1000 },
                weight: { value: 25 },
                rarity: "rare",
                quantity: { value: 1 }
            }
        },
        
        "4ZD7sSOQGFJrue8P": {
            name: "Laisse",
            type: "equipment",
            img: "systems/mothership-fr/images/icons/equipment/leash.png",
            system: {
                description: {
                    value: "<p>Laisse rétractable haute résistance pour animaux de compagnie ou de travail.</p>"
                },
                cost: { value: 15 },
                weight: { value: 0.1 },
                rarity: "common",
                quantity: { value: 1 }
            }
        }
        
        // Ajouter plus d'équipements selon les besoins...
    };
    
    return await rebuildCompendium(PACK_ID, equipementFR, "équipement");
    
})();

// Fonction générique de reconstruction 
async function rebuildCompendium(packId, itemsData, itemType) {
    let pack = game.packs.get(packId);
    if (!pack) {
        const error = `Compendium ${packId} introuvable !`;
        ui.notifications.error(error);
        return `❌ ${error}`;
    }
    
    try {
        const existingDocs = await pack.getDocuments();
        console.log(`📊 ${itemType} existants: ${existingDocs.length}`);
        
        let itemsCreated = 0;
        let itemsUpdated = 0;
        let errors = 0;
        
        for (const [itemId, itemData] of Object.entries(itemsData)) {
            console.log(`🔧 Traitement: ${itemData.name}`);
            
            try {
                const existingItem = existingDocs.find(doc => doc.id === itemId || doc.name === itemData.name);
                
                if (existingItem) {
                    console.log(`   ⚠️ ${itemType} existant: ${existingItem.name}`);
                    itemsUpdated++;
                    continue;
                }
                
                const newItemData = {
                    _id: itemId,
                    ...itemData
                };
                
                const createdItem = await Item.create(newItemData, { pack: packId });
                console.log(`   ✅ ${itemType} créé: ${createdItem.name}`);
                itemsCreated++;
                
            } catch (error) {
                console.error(`   ❌ Erreur avec ${itemData.name}:`, error);
                errors++;
            }
        }
        
        await pack.getIndex({ rebuild: true });
        
        const report = `
🔧 RECONSTRUCTION ${itemType.toUpperCase()} - TERMINÉE

📊 RÉSULTATS:
• ${itemType} créés: ${itemsCreated}
• ${itemType} existants: ${itemsUpdated}
• Erreurs: ${errors}
• Total final: ${(await pack.getDocuments()).length} ${itemType}s

✅ Compendium ${itemType} reconstruit avec succès !
`;
        
        console.log(report);
        ui.notifications.info(`${itemType} reconstruit ! ${itemsCreated} nouveaux items créés.`);
        
        return report;
        
    } catch (error) {
        console.error(`❌ Erreur reconstruction ${itemType}:`, error);
        return `❌ Erreur: ${error.message}`;
    }
}