// =============================================================================
// MACRO FOUNDRY VTT : TRADUCTION DU COMPENDIUM ARMURES MOTHERSHIP-FR
// =============================================================================
// Cette macro traduit le compendium d'armures avec les valeurs françaises
// =============================================================================

(async () => {
    const COMPENDIUM_NAME = "mothership-fr.armures_1e";
    
    // Vérifier si le compendium existe
    const pack = game.packs.get(COMPENDIUM_NAME);
    if (!pack) {
        ui.notifications.error(`Compendium ${COMPENDIUM_NAME} introuvable !`);
        return;
    }
    
    ui.notifications.info("🔄 Début de la traduction du compendium d'armures...");
    
    // Définition des traductions d'armures
    const armorTranslations = {
        "Advanced Battle Dress": {
            name: "Tenue de Combat Avancée",
            description: "Armure militaire de pointe offrant une protection maximale contre les projectiles et les environnements hostiles. Intègre des systèmes de survie avancés et une mobilité préservée."
        },
        "Civilian Clothes": {
            name: "Vêtements Civils",
            description: "Tenue ordinaire portée par les civils. N'offre aucune protection particulière mais permet de se fondre dans la foule et de ne pas attirer l'attention."
        },
        "Corporate Attire": {
            name: "Tenue Corporative",
            description: "Costume d'affaires de qualité porté par les cadres et représentants commerciaux. Confère une autorité professionnelle mais aucune protection physique."
        },
        "Dress Uniform": {
            name: "Uniforme d'Apparat",
            description: "Uniforme de cérémonie militaire ou corporatif. Impeccable pour les occasions formelles mais inadapté au combat ou aux situations dangereuses."
        },
        "Fatigues": {
            name: "Treillis",
            description: "Uniforme militaire standard conçu pour le terrain. Résistant et pratique, offre une protection minimale tout en préservant la liberté de mouvement."
        },
        "Hazard Suit": {
            name: "Combinaison de Protection",
            description: "Équipement de protection contre les dangers environnementaux : radiations, substances chimiques, agents biologiques et contamination."
        },
        "Heavy Duty Work Clothes": {
            name: "Vêtements de Travail Renforcés",
            description: "Tenue industrielle robuste conçue pour les environnements de travail difficiles. Résiste à l'usure et offre une protection contre les dangers mineurs."
        },
        "Lab Coat": {
            name: "Blouse de Laboratoire",
            description: "Vêtement de protection standard des laboratoires. Protège contre les éclaboussures chimiques et maintient un environnement stérile."
        },
        "Lounge Wear": {
            name: "Tenue d'Intérieur",
            description: "Vêtements confortables portés pendant les périodes de repos. Privilégient le confort sur la protection ou l'apparence professionnelle."
        },
        "Manufacturer Supplied Attire": {
            name: "Tenue Fournie par le Fabricant",
            description: "Uniforme standard fourni par l'employeur. Qualité variable selon l'entreprise, identifie clairement l'affiliation corporative."
        },
        "Scrubs": {
            name: "Blouse Médicale",
            description: "Tenue médicale standard portée par le personnel soignant. Facilement lavable et conçue pour maintenir l'hygiène en environnement médical."
        },
        "Standard Battle Dress": {
            name: "Tenue de Combat Standard",
            description: "Armure militaire de base offrant une protection équilibrée entre résistance aux dommages et mobilité. Équipement standard des forces armées."
        },
        "Standard Crew Attire": {
            name: "Tenue d'Équipage Standard",
            description: "Uniforme porté par l'équipage des vaisseaux spatiaux. Fonctionnel et identifiable, adapté aux environnements pressurisés des vaisseaux."
        },
        "Tank Top & Camo Pants": {
            name: "Débardeur et Pantalon de Camouflage",
            description: "Tenue décontractée mêlant vêtements civils et militaires. Populaire parmi les mercenaires et les vétérans en congé."
        },
        "Vaccsuit": {
            name: "Combinaison Spatiale",
            description: "Équipement de protection vital pour les activités dans l'espace. Fournit air, pression et protection contre les radiations et les micro-météorites."
        }
    };
    
    let updatedCount = 0;
    const totalTranslations = Object.keys(armorTranslations).length;
    
    try {
        // Obtenir tous les documents du compendium
        const documents = await pack.getDocuments();
        
        // Afficher tous les documents trouvés pour aide au débogage
        console.log("=== ARMURES TROUVÉES DANS LE COMPENDIUM ===");
        for (const doc of documents) {
            console.log(`ID: ${doc.id}, Nom: ${doc.name}, Type: ${doc.type}`);
        }
        
        for (const doc of documents) {
            const translation = armorTranslations[doc.name];
            if (translation) {
                const updateData = {
                    name: translation.name,
                    "system.description": translation.description
                };
                
                await doc.update(updateData);
                updatedCount++;
                
                console.log(`✅ Armure traduite: ${doc.name} → ${translation.name}`);
            } else {
                console.log(`⚠️ Armure non traduite: ${doc.name}`);
            }
        }
        
        // Message de succès
        const successMsg = `🎯 Traduction des armures terminée !\n✅ ${updatedCount}/${totalTranslations} armures traduites\n📦 Compendium: ${COMPENDIUM_NAME}`;
        ui.notifications.info(successMsg);
        console.log(successMsg);
        
        // Afficher le détail dans la console
        console.log("=== DÉTAIL DES TRADUCTIONS ARMURES ===");
        console.log(`Compendium traité: ${COMPENDIUM_NAME}`);
        console.log(`Armures traduites: ${updatedCount}`);
        console.log(`Total de traductions définies: ${totalTranslations}`);
        console.log(`Total d'armures dans le compendium: ${documents.length}`);
        
    } catch (error) {
        const errorMsg = `❌ Erreur lors de la traduction des armures: ${error.message}`;
        ui.notifications.error(errorMsg);
        console.error(errorMsg, error);
    }
})();

// =============================================================================
// NOTES D'UTILISATION:
// 1. Exécuter cette macro depuis FoundryVTT (en tant que GM)
// 2. La macro traduit les noms et descriptions des armures
// 3. Les modifications sont sauvegardées automatiquement
// 4. Couvre toutes les armures du système Mothership
// 5. Vérifier la console (F12) pour les détails des traductions
// =============================================================================