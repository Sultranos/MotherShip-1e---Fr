// =============================================================================
// MACRO FOUNDRY VTT : TRADUCTION DU COMPENDIUM COMPÉTENCES MOTHERSHIP-FR
// =============================================================================
// Cette macro traduit le compendium de compétences avec les valeurs françaises
// =============================================================================

(async () => {
    const COMPENDIUM_NAME = "mothership-fr.competences_1e";
    
    // Vérifier si le compendium existe
    const pack = game.packs.get(COMPENDIUM_NAME);
    if (!pack) {
        ui.notifications.error(`Compendium ${COMPENDIUM_NAME} introuvable !`);
        return;
    }
    
    ui.notifications.info("🔄 Début de la traduction du compendium de compétences...");
    
    // Définition des traductions de compétences
    const skillTranslations = {
        // Compétences principales
        "Archaeology": {
            name: "Archéologie",
            description: "L'étude des civilisations anciennes et de leurs artefacts. Permet d'identifier des objets anciens, de comprendre des ruines alien et de déchiffrer des inscriptions mystérieuses."
        },
        "Computers": {
            name: "Informatique",
            description: "Maîtrise des systèmes informatiques, programmation et piratage. Permet d'accéder aux bases de données, de contourner les sécurités et de réparer les systèmes électroniques."
        },
        "Ecology": {
            name: "Écologie",
            description: "Compréhension des écosystèmes et de la biologie. Permet d'analyser des formes de vie alien, de comprendre les environnements hostiles et d'identifier les dangers biologiques."
        },
        "Engineering": {
            name: "Ingénierie",
            description: "Conception, construction et réparation de systèmes mécaniques. Essentiel pour maintenir en état les vaisseaux spatiaux et les équipements complexes."
        },
        "First Aid": {
            name: "Premiers Secours",
            description: "Soins médicaux d'urgence et stabilisation des blessés. Permet de traiter les blessures, de stabiliser les mourants et d'administrer des médicaments de base."
        },
        "Geology": {
            name: "Géologie",
            description: "Étude des roches, minéraux et formations géologiques. Utile pour l'exploration planétaire, l'extraction minière et l'évaluation des dangers géologiques."
        },
        "Linguistics": {
            name: "Linguistique",
            description: "Étude et maîtrise des langages. Permet de décoder des langues alien, de comprendre des communications cryptées et de faciliter la diplomatie."
        },
        "Mathematics": {
            name: "Mathématiques",
            description: "Calculs avancés et modélisation. Essentiel pour la navigation spatiale, les calculs de trajectoire et l'analyse de données complexes."
        },
        "Military Training": {
            name: "Entraînement Militaire",
            description: "Formation tactique et combat militaire. Fournit des compétences en combat, leadership tactique et utilisation d'équipements militaires avancés."
        },
        "Piloting": {
            name: "Pilotage",
            description: "Conduite de véhicules spatiaux et atmosphériques. Permet de piloter des vaisseaux, des navettes et d'autres véhicules dans diverses conditions."
        },
        "Psychology": {
            name: "Psychologie",
            description: "Compréhension du comportement humain et alien. Utile pour calmer les paniques, négocier avec des formes de vie intelligentes et maintenir le moral de l'équipe."
        },
        "Rimwise": {
            name: "Connaissance de la Bordure",
            description: "Connaissance des régions éloignées de l'espace habité. Fournit des informations sur les dangers de la bordure, les contacts utiles et les voies commerciales obscures."
        },
        "Theology": {
            name: "Théologie",
            description: "Étude des religions et des croyances. Peut aider à comprendre des cultes alien, à fournir un réconfort spirituel et à résister aux influences surnaturelles."
        },
        "Zero-G": {
            name: "Zéro-G",
            description: "Maîtrise du mouvement en apesanteur. Essentiel pour les activités dans l'espace, les réparations extérieures et la navigation dans les environnements sans gravité."
        },
        "Athletics": {
            name: "Athlétisme",
            description: "Condition physique et prouesses athlétiques. Permet de courir, grimper, nager et effectuer des actions physiques exigeantes."
        },
        "Close Quarters Combat": {
            name: "Combat Rapproché",
            description: "Combat au corps à corps et avec des armes de mêlée. Essentiel pour les situations où les armes à feu ne sont pas disponibles ou appropriées."
        },
        "Firearms": {
            name: "Armes à Feu",
            description: "Maîtrise des armes à projectiles. Permet d'utiliser efficacement pistolets, fusils et autres armes à feu dans diverses situations de combat."
        },
        "Heavy Machinery": {
            name: "Machinerie Lourde",
            description: "Utilisation d'équipements industriels lourds. Permet d'opérer des exosquelettes, des grues spatiales et autres machines de grande taille."
        },
        "Industrial Equipment": {
            name: "Équipement Industriel",
            description: "Maîtrise des outils et machines industriels. Permet d'utiliser des perceuses, des soudeurs et autres équipements spécialisés."
        },
        "Pathology": {
            name: "Pathologie",
            description: "Étude des maladies et des infections. Permet de diagnostiquer des maladies alien, d'analyser des agents pathogènes et de développer des traitements."
        },
        "Pharmacy": {
            name: "Pharmacie",
            description: "Connaissance des médicaments et drogues. Permet de synthétiser des médicaments, d'identifier des substances et de traiter des empoisonnements."
        },
        "Surgery": {
            name: "Chirurgie",
            description: "Procédures médicales invasives. Permet d'effectuer des opérations complexes, de greffer des cybernétiques et de traiter des blessures graves."
        },
        "Asteroid Mining": {
            name: "Extraction Astéroïdale",
            description: "Techniques d'extraction dans l'espace. Permet d'identifier des gisements rentables, d'opérer des équipements miniers spatiaux et d'évaluer la qualité des minerais."
        },
        "Botany": {
            name: "Botanique",
            description: "Étude de la vie végétale. Utile pour cultiver des plantes, identifier des espèces alien et développer des sources de nourriture durables."
        },
        "Cybernetics": {
            name: "Cybernétique",
            description: "Technologie des implants biomécaniques. Permet d'installer, de réparer et de modifier des augmentations cybernétiques."
        },
        "Explosives": {
            name: "Explosifs",
            description: "Manipulation et utilisation d'explosifs. Permet de démolir des structures, de percer des obstacles et de créer des dispositifs explosifs."
        },
        "Field Medicine": {
            name: "Médecine de Terrain",
            description: "Soins médicaux dans des conditions difficiles. Permet de traiter des blessures avec des ressources limitées et dans des environnements hostiles."
        },
        "Jury Rigging": {
            name: "Bricolage",
            description: "Réparations improvisées et solutions temporaires. Permet de faire fonctionner des équipements endommagés avec des moyens de fortune."
        },
        "Mysticism": {
            name: "Mysticisme",
            description: "Connaissance des phénomènes surnaturels et occultes. Peut aider à comprendre des forces étranges et à résister aux influences paranormales."
        },
        "Scavenging": {
            name: "Récupération",
            description: "Art de trouver des objets utiles dans les déchets. Permet de localiser des ressources dans les épaves, ruines et zones abandonnées."
        }
    };
    
    let updatedCount = 0;
    const totalTranslations = Object.keys(skillTranslations).length;
    
    try {
        // Obtenir tous les documents du compendium
        const documents = await pack.getDocuments();
        
        // Afficher tous les documents trouvés pour aide au débogage
        console.log("=== COMPÉTENCES TROUVÉES DANS LE COMPENDIUM ===");
        for (const doc of documents) {
            console.log(`ID: ${doc.id}, Nom: ${doc.name}, Type: ${doc.type}`);
        }
        
        for (const doc of documents) {
            const translation = skillTranslations[doc.name];
            if (translation) {
                const updateData = {
                    name: translation.name,
                    "system.description": translation.description
                };
                
                await doc.update(updateData);
                updatedCount++;
                
                console.log(`✅ Compétence traduite: ${doc.name} → ${translation.name}`);
            } else {
                console.log(`⚠️ Compétence non traduite: ${doc.name}`);
            }
        }
        
        // Message de succès
        const successMsg = `🎯 Traduction des compétences terminée !\n✅ ${updatedCount}/${totalTranslations} compétences traduites\n📦 Compendium: ${COMPENDIUM_NAME}`;
        ui.notifications.info(successMsg);
        console.log(successMsg);
        
        // Afficher le détail dans la console
        console.log("=== DÉTAIL DES TRADUCTIONS COMPÉTENCES ===");
        console.log(`Compendium traité: ${COMPENDIUM_NAME}`);
        console.log(`Compétences traduites: ${updatedCount}`);
        console.log(`Total de traductions définies: ${totalTranslations}`);
        console.log(`Total de compétences dans le compendium: ${documents.length}`);
        
    } catch (error) {
        const errorMsg = `❌ Erreur lors de la traduction des compétences: ${error.message}`;
        ui.notifications.error(errorMsg);
        console.error(errorMsg, error);
    }
})();

// =============================================================================
// NOTES D'UTILISATION:
// 1. Exécuter cette macro depuis FoundryVTT (en tant que GM)
// 2. La macro traduit les noms et descriptions des compétences
// 3. Les modifications sont sauvegardées automatiquement
// 4. Couvre toutes les compétences principales du système Mothership
// 5. Vérifier la console (F12) pour les détails des traductions
// =============================================================================