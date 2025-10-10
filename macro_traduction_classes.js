// =============================================================================
// MACRO FOUNDRY VTT : TRADUCTION DU COMPENDIUM CLASSES MOTHERSHIP-FR
// =============================================================================
// Cette macro traduit le compendium de classes avec les valeurs françaises
// =============================================================================

(async () => {
    const COMPENDIUM_NAME = "mothership-fr.classes_1e";
    
    // Vérifier si le compendium existe
    const pack = game.packs.get(COMPENDIUM_NAME);
    if (!pack) {
        ui.notifications.error(`Compendium ${COMPENDIUM_NAME} introuvable !`);
        return;
    }
    
    ui.notifications.info("🔄 Début de la traduction du compendium de classes...");
    
    // Définition des traductions de classes
    const classTranslations = {
        "Android": {
            name: "Androïde",
            description: "<strong>Les Androïdes</strong> sont un ajout terrifiant et excitant à tout équipage. Créés pour servir l'humanité, ils tendent à déstabiliser les autres membres d'équipage avec leur froide inhumanité et leur logique implacable. Leur nature artificielle soulève des questions existentielles troublantes.",
            trauma_response: "LES JETS DE PEUR EFFECTUÉS PAR LES JOUEURS AMICAUX PROCHES SONT EN DÉSAVANTAGE."
        },
        
        "Marine": {
            name: "Marine",
            description: "<strong>Les Marines</strong> sont les soldats d'élite de l'espace, entraînés pour le combat dans les environnements les plus hostiles. Utiles au combat et disciplinés, mais quand ils paniquent, leur formation militaire peut paradoxalement causer des problèmes au reste de l'équipage par effet de contagion.",
            trauma_response: "CHAQUE FOIS QUE VOUS PANIQUEZ, TOUS LES JOUEURS AMICAUX PROCHES DOIVENT FAIRE UN TEST DE PEUR OU GAGNER 1 STRESS."
        },
        
        "Scientist": {
            name: "Scientifique",
            description: "<strong>Les Scientifiques</strong> sont des docteurs, chercheurs, ou toute personne qui veut découper des créatures <em>(ou des membres d'équipage infectés)</em> avec un scalpel. Experts en analyse, recherche et procédures médicales, ils excellent dans la compréhension des phénomènes étranges et la résolution de problèmes complexes.",
            trauma_response: "CHAQUE FOIS QUE VOUS RATEZ UN JET DE SANTÉ MENTALE, TOUS LES JOUEURS AMICAUX PROCHES GAGNENT 1 STRESS."
        },
        
        "Teamster": {
            name: "Ouvrier",
            description: "<strong>Les Ouvriers</strong> sont des travailleurs spatiaux col bleu robustes et bagarreurs : mécaniciens, ingénieurs, mineurs, pilotes et techniciens. Ils forment l'épine dorsale de l'industrie spatiale, sachant réparer n'importe quoi avec de l'ingéniosité et du ruban adhésif.",
            trauma_response: "UNE FOIS PAR SESSION, VOUS POUVEZ PRENDRE UN AVANTAGE SUR UN TEST DE PANIQUE."
        },

        "Synthetic": {
            name: "Synthétique",
            description: "<strong>Les Synthétiques</strong> sont des créatures artificielles avancées, conçues pour ressembler aux humains tout en possédant des capacités supérieures. Contrairement aux Androïdes, ils sont plus subtils dans leur nature non-humaine, mais tout aussi troublants pour l'équipage.",
            trauma_response: "VOUS ÊTES IMMUNISÉ CONTRE LA PEUR ET LE STRESS, MAIS LES AUTRES JOUEURS GAGNENT +1 STRESS QUAND ILS DÉCOUVRENT VOTRE VRAIE NATURE."
        }
    };
    
    let updatedCount = 0;
    const totalTranslations = Object.keys(classTranslations).length;
    
    try {
        // Obtenir tous les documents du compendium
        const documents = await pack.getDocuments();
        
        // Afficher tous les documents trouvés pour aide au débogage
        console.log("=== CLASSES TROUVÉES DANS LE COMPENDIUM ===");
        for (const doc of documents) {
            console.log(`ID: ${doc.id}, Nom: ${doc.name}, Type: ${doc.type}`);
        }
        
        for (const doc of documents) {
            const translation = classTranslations[doc.name];
            if (translation) {
                const updateData = {
                    name: translation.name,
                    "system.description": translation.description,
                    "system.trauma_response": translation.trauma_response
                };
                
                await doc.update(updateData);
                updatedCount++;
                
                console.log(`✅ Classe traduite: ${doc.name} → ${translation.name}`);
            } else {
                console.log(`⚠️ Classe non traduite: ${doc.name}`);
            }
        }
        
        // Message de succès
        const successMsg = `🎯 Traduction des classes terminée !\n✅ ${updatedCount}/${totalTranslations} classes traduites\n📦 Compendium: ${COMPENDIUM_NAME}`;
        ui.notifications.info(successMsg);
        console.log(successMsg);
        
        // Afficher le détail dans la console
        console.log("=== DÉTAIL DES TRADUCTIONS CLASSES ===");
        console.log(`Compendium traité: ${COMPENDIUM_NAME}`);
        console.log(`Classes traduites: ${updatedCount}`);
        console.log(`Total de traductions définies: ${totalTranslations}`);
        console.log(`Total de classes dans le compendium: ${documents.length}`);
        
    } catch (error) {
        const errorMsg = `❌ Erreur lors de la traduction des classes: ${error.message}`;
        ui.notifications.error(errorMsg);
        console.error(errorMsg, error);
    }
})();

// =============================================================================
// NOTES D'UTILISATION:
// 1. Exécuter cette macro depuis FoundryVTT (en tant que GM)
// 2. La macro traduit les noms, descriptions et réponses traumatiques
// 3. Les modifications sont sauvegardées automatiquement
// 4. Couvre les 5 classes principales du système Mothership
// 5. Vérifier la console (F12) pour les détails des traductions
// =============================================================================