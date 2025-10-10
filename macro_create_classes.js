// =============================================================================
// MACRO FOUNDRY VTT : CRÉATION DES CLASSES POUR MOTHERSHIP-FR
// =============================================================================
// Cette macro crée directement les classes dans le pack mothership-fr
// =============================================================================

(async () => {
    const TARGET_PACK = "mothership-fr.classes_1e";
    
    // Vérifier si le compendium existe
    const targetPack = game.packs.get(TARGET_PACK);
    
    if (!targetPack) {
        ui.notifications.error(`Compendium ${TARGET_PACK} introuvable !`);
        return;
    }
    
    ui.notifications.info("🔄 Création des classes de base...");
    
    // Définition des classes avec leurs données complètes
    const classesData = [
        {
            name: "Scientifique",
            type: "class",
            img: "systems/mothership-fr/icons/classes/scientist.png",
            system: {
                description: "<strong>Les Scientifiques</strong> sont des docteurs, chercheurs, ou toute personne qui veut découper des créatures <em>(ou des membres d'équipage infectés)</em> avec un scalpel. Experts en analyse, recherche et procédures médicales, ils excellent dans la compréhension des phénomènes étranges et la résolution de problèmes complexes.",
                trauma_response: "CHAQUE FOIS QUE VOUS RATEZ UN JET DE SANITÉ MENTALE, TOUS LES JOUEURS AMICAUX PROCHES GAGNENT 1 STRESS.",
                base_adjustment: {
                    intellect: 5,
                    sanity: 5
                },
                selected_adjustment: {
                    choose_stat: [
                        {
                            stats: ["intellect", "sanity"],
                            modification: "5"
                        }
                    ]
                },
                starting_skills: [
                    "mothership-fr.competences_1e.first_aid",
                    "mothership-fr.competences_1e.biology"
                ],
                loadout_tables: [
                    "mothership-fr.tables_aleatoires_1e.scientist_loadout"
                ]
            }
        },
        {
            name: "Marine",
            type: "class",
            img: "systems/mothership-fr/icons/classes/marine.png",
            system: {
                description: "<strong>Les Marines</strong> sont les soldats d'élite de l'espace, entraînés pour le combat dans les environnements les plus hostiles. Utiles au combat et disciplinés, mais quand ils paniquent, leur formation militaire peut paradoxalement causer des problèmes au reste de l'équipage par effet de contagion.",
                trauma_response: "CHAQUE FOIS QUE VOUS PANIQUEZ, TOUS LES JOUEURS AMICAUX PROCHES DOIVENT FAIRE UN TEST DE PEUR OU GAGNER 1 STRESS.",
                base_adjustment: {
                    combat: 10,
                    body: 5
                },
                selected_adjustment: {
                    choose_stat: [
                        {
                            stats: ["strength", "speed", "combat"],
                            modification: "5"
                        }
                    ]
                },
                starting_skills: [
                    "mothership-fr.competences_1e.firearms",
                    "mothership-fr.competences_1e.military_training"
                ],
                loadout_tables: [
                    "mothership-fr.tables_aleatoires_1e.marine_loadout"
                ]
            }
        },
        {
            name: "Ouvrier",
            type: "class",
            img: "systems/mothership-fr/icons/classes/worker.png",
            system: {
                description: "<strong>Les Ouvriers</strong> sont des travailleurs spatiaux col bleu robustes et bagarreurs : mécaniciens, ingénieurs, mineurs, pilotes et techniciens. Ils forment l'épine dorsale de l'industrie spatiale, sachant réparer n'importe quoi avec de l'ingéniosité et du ruban adhésif.",
                trauma_response: "UNE FOIS PAR SESSION, VOUS POUVEZ PRENDRE UN AVANTAGE SUR UN TEST DE PANIQUE.",
                base_adjustment: {
                    body: 10,
                    strength: 5
                },
                selected_adjustment: {
                    choose_stat: [
                        {
                            stats: ["strength", "speed", "intellect"],
                            modification: "5"
                        }
                    ]
                },
                starting_skills: [
                    "mothership-fr.competences_1e.industrial_equipment",
                    "mothership-fr.competences_1e.mechanical_repair"
                ],
                loadout_tables: [
                    "mothership-fr.tables_aleatoires_1e.worker_loadout"
                ]
            }
        },
        {
            name: "Androïde",
            type: "class",
            img: "systems/mothership-fr/icons/classes/android.png",
            system: {
                description: "<strong>Les Androïdes</strong> sont un ajout terrifiant et excitant à tout équipage. Créés pour servir l'humanité, ils tendent à déstabiliser les autres membres d'équipage avec leur froide inhumanité et leur logique implacable. Leur nature artificielle soulève des questions existentielles troublantes.",
                trauma_response: "LES JETS DE PEUR EFFECTUÉS PAR LES JOUEURS AMICAUX PROCHES SONT EN DÉSAVANTAGE.",
                base_adjustment: {
                    stress: -5,
                    max_wounds: 2
                },
                selected_adjustment: {
                    choose_stat: [
                        {
                            stats: ["strength", "speed", "intellect", "combat"],
                            modification: "10"
                        }
                    ]
                },
                starting_skills: [
                    "mothership-fr.competences_1e.computers",
                    "mothership-fr.competences_1e.linguistics"
                ],
                loadout_tables: [
                    "mothership-fr.tables_aleatoires_1e.android_loadout"
                ]
            }
        }
    ];
    
    try {
        // Vider le pack cible d'abord
        const existingDocs = await targetPack.getDocuments();
        if (existingDocs.length > 0) {
            console.log(`🗑️ Suppression de ${existingDocs.length} documents existants...`);
            await targetPack.deleteDocuments(existingDocs.map(doc => doc.id));
        }
        
        let createdCount = 0;
        
        for (const classData of classesData) {
            // Créer le nouveau document dans le pack cible
            const newDoc = await targetPack.createDocument(classData);
            createdCount++;
            
            console.log(`✅ Classe créée: ${classData.name} (${newDoc.id})`);
        }
        
        // Message de succès
        const successMsg = `🎯 Création des classes terminée !\n✅ ${createdCount} classes créées\n📦 Dans: ${TARGET_PACK}`;
        ui.notifications.info(successMsg);
        console.log(successMsg);
        
        // Vérification finale
        const finalDocs = await targetPack.getDocuments();
        console.log(`📋 Vérification finale: ${finalDocs.length} classes dans le pack`);
        
        finalDocs.forEach(doc => {
            console.log(`  - ${doc.name} (${doc.type}, ID: ${doc.id})`);
        });
        
    } catch (error) {
        const errorMsg = `❌ Erreur lors de la création des classes: ${error.message}`;
        ui.notifications.error(errorMsg);
        console.error(errorMsg, error);
    }
})();