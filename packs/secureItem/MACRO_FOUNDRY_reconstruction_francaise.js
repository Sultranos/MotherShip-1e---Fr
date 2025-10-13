// =============================================================================
// 🚀 MACRO PRINCIPALE - RECONSTRUCTION FRANÇAISE MOTHERSHIP
// =============================================================================
// À copier dans une macro FoundryVTT pour réparer les compendiums français
// Utilise des icônes FoundryVTT natives pour éviter les erreurs 404
// =============================================================================

(async () => {
    console.log("🚀 LANCEMENT DE LA RECONSTRUCTION FRANÇAISE");
    console.log("============================================");
    
    // Confirmation utilisateur
    const confirmation = await Dialog.confirm({
        title: "🔧 Reconstruction Compendiums Français",
        content: `
            <h2>⚠️ RECONSTRUCTION DES TABLES ALÉATOIRES FRANÇAISES</h2>
            <p>Cette macro va reconstruire les tables aléatoires en français avec des icônes FoundryVTT natives.</p>
            
            <h3>📋 Tables à créer:</h3>
            <ul>
                <li>🎲 Équipement : Marine Colonial</li>
                <li>🎲 Équipement : Scientifique</li>
                <li>🎲 Équipement : Androïde</li>
                <li>🎲 Équipement : Routier</li>
                <li>🎲 Test de Panique</li>
            </ul>
            
            <p><strong>Continuer ?</strong></p>
        `,
        yes: "🚀 Lancer la Reconstruction",
        no: "❌ Annuler",
        defaultYes: false
    });
    
    if (!confirmation) {
        ui.notifications.info("❌ Reconstruction annulée");
        return;
    }
    
    try {
        const PACK_ID = "mothership-fr.tables_aleatoires_1e";
        
        // Fonction de reconstruction intégrée
        const rebuildTables = async (packId, tablesData) => {
            const pack = game.packs.get(packId);
            if (!pack) {
                throw new Error(`Pack ${packId} introuvable`);
            }
            
            let created = 0;
            let errors = 0;
            
            // Vider le pack d'abord
            const existingDocs = await pack.getDocuments();
            if (existingDocs.length > 0) {
                await pack.documentClass.deleteDocuments(existingDocs.map(d => d.id), {pack: packId});
                console.log(`🗑️ Supprimé ${existingDocs.length} tables existantes`);
            }
            
            for (const [id, tableData] of Object.entries(tablesData)) {
                try {
                    const docData = {
                        _id: id,
                        ...tableData
                    };
                    
                    const table = await pack.documentClass.create(docData, {
                        pack: packId,
                        keepId: true
                    });
                    
                    if (table) {
                        console.log(`✅ Créé: ${tableData.name}`);
                        created++;
                    }
                } catch (error) {
                    console.error(`❌ Erreur pour ${tableData.name}:`, error);
                    errors++;
                }
            }
            
            return { created, errors };
        };
        
        // Tables françaises avec icônes FoundryVTT natives
        const tablesFrancaises = {
            "marine_loadout_fr": {
                name: "Équipement : Marine Colonial",
                type: "RollTable",
                img: "icons/svg/d20-grey.svg",
                system: {
                    description: {
                        value: "<p>Équipement de départ pour <strong>Marine Colonial</strong> français.</p>"
                    },
                    formula: "1d10",
                    replacement: true,
                    displayRoll: true,
                    results: [
                        {
                            "_id": "marine01",
                            "type": 0,
                            "text": "🔫 Fusil d'Assaut M41A + Munitions (120 cartouches)",
                            "img": "icons/weapons/guns/rifle-brown.webp",
                            "weight": 1,
                            "range": [1, 2],
                            "drawn": false
                        },
                        {
                            "_id": "marine02",
                            "type": 0,
                            "text": "🔫 Pistolet-Mitrailleur + Chargeurs (4)",
                            "img": "icons/weapons/guns/gun-pistol-flintlock.webp",
                            "weight": 1,
                            "range": [3, 4],
                            "drawn": false
                        },
                        {
                            "_id": "marine03",
                            "type": 0,
                            "text": "🛡️ Armure de Combat + Casque Tactique",
                            "img": "icons/equipment/chest/breastplate-scale-grey.webp",
                            "weight": 1,
                            "range": [5, 6],
                            "drawn": false
                        },
                        {
                            "_id": "marine04",
                            "type": 0,
                            "text": "💣 Grenades Frag (2) + Fumigènes (2)",
                            "img": "icons/weapons/thrown/bomb-fuse-black.webp",
                            "weight": 1,
                            "range": [7, 8],
                            "drawn": false
                        },
                        {
                            "_id": "marine05",
                            "type": 0,
                            "text": "🏥 Trousse Médicale de Combat + Morphine",
                            "img": "icons/tools/cooking/bowl-mix-eggs.webp",
                            "weight": 1,
                            "range": [9, 10],
                            "drawn": false
                        }
                    ]
                }
            },
            
            "scientist_loadout_fr": {
                name: "Équipement : Scientifique",
                type: "RollTable",
                img: "icons/svg/d20-grey.svg",
                system: {
                    description: {
                        value: "<p>Équipement de départ pour <strong>Scientifique</strong> français.</p>"
                    },
                    formula: "1d10",
                    replacement: true,
                    displayRoll: true,
                    results: [
                        {
                            "_id": "scient01",
                            "type": 0,
                            "text": "🔬 Scanner Portable + Échantillons Vides (10)",
                            "img": "icons/tools/scribing/magnifying-glass.webp",
                            "weight": 1,
                            "range": [1, 2],
                            "drawn": false
                        },
                        {
                            "_id": "scient02",
                            "type": 0,
                            "text": "💻 Tablette de Données + Bases de Données",
                            "img": "icons/tools/scribing/scroll-brown.webp",
                            "weight": 1,
                            "range": [3, 4],
                            "drawn": false
                        },
                        {
                            "_id": "scient03",
                            "type": 0,
                            "text": "🥽 Combinaison de Laboratoire + Masque",
                            "img": "icons/equipment/chest/robe-red.webp",
                            "weight": 1,
                            "range": [5, 6],
                            "drawn": false
                        },
                        {
                            "_id": "scient04",
                            "type": 0,
                            "text": "🧪 Kit d'Analyse Chimique + Réactifs",
                            "img": "icons/consumables/potions/bottle-round-corked-blue.webp",
                            "weight": 1,
                            "range": [7, 8],
                            "drawn": false
                        },
                        {
                            "_id": "scient05",
                            "type": 0,
                            "text": "☢️ Détecteur de Radiations + Anti-Rad (3)",
                            "img": "icons/tools/navigation/compass-brass-red.webp",
                            "weight": 1,
                            "range": [9, 10],
                            "drawn": false
                        }
                    ]
                }
            },

            "android_loadout_fr": {
                name: "Équipement : Androïde",
                type: "RollTable",
                img: "icons/svg/d20-grey.svg",
                system: {
                    description: {
                        value: "<p>Équipement de départ pour <strong>Androïde</strong> français.</p>"
                    },
                    formula: "1d10",
                    replacement: true,
                    displayRoll: true,
                    results: [
                        {
                            "_id": "android01",
                            "type": 0,
                            "text": "🔌 Interface de Données + Ports USB",
                            "img": "icons/tools/navigation/compass-mechanical.webp",
                            "weight": 1,
                            "range": [1, 2],
                            "drawn": false
                        },
                        {
                            "_id": "android02",
                            "type": 0,
                            "text": "🔧 Outils Multi-Fonctions Rétractables",
                            "img": "icons/tools/hand/pliers-steel.webp",
                            "weight": 1,
                            "range": [3, 4],
                            "drawn": false
                        },
                        {
                            "_id": "android03",
                            "type": 0,
                            "text": "👁️ Capteurs Avancés + Vision Nocturne",
                            "img": "icons/tools/navigation/spyglass-brass.webp",
                            "weight": 1,
                            "range": [5, 6],
                            "drawn": false
                        },
                        {
                            "_id": "android04",
                            "type": 0,
                            "text": "🔩 Kit de Maintenance Synthétique",
                            "img": "icons/tools/hand/screwdriver-steel.webp",
                            "weight": 1,
                            "range": [7, 8],
                            "drawn": false
                        },
                        {
                            "_id": "android05",
                            "type": 0,
                            "text": "🏷️ Patch d'Identification + Protocoles IA",
                            "img": "icons/sundries/documents/document-sealed-red.webp",
                            "weight": 1,
                            "range": [9, 10],
                            "drawn": false
                        }
                    ]
                }
            },

            "teamster_loadout_fr": {
                name: "Équipement : Routier",
                type: "RollTable",
                img: "icons/svg/d20-grey.svg",
                system: {
                    description: {
                        value: "<p>Équipement de départ pour <strong>Routier</strong> français.</p>"
                    },
                    formula: "1d10",
                    replacement: true,
                    displayRoll: true,
                    results: [
                        {
                            "_id": "routier01",
                            "type": 0,
                            "text": "🧰 Boîte à Outils + Pièces de Rechange",
                            "img": "icons/tools/hand/hammer-and-anvil.webp",
                            "weight": 1,
                            "range": [1, 2],
                            "drawn": false
                        },
                        {
                            "_id": "routier02",
                            "type": 0,
                            "text": "👕 Combinaison de Travail + Gants",
                            "img": "icons/equipment/chest/shirt-simple-brown.webp",
                            "weight": 1,
                            "range": [3, 4],
                            "drawn": false
                        },
                        {
                            "_id": "routier03",
                            "type": 0,
                            "text": "🔦 Lampe Frontale + Batteries (6)",
                            "img": "icons/sundries/lights/torch-brown.webp",
                            "weight": 1,
                            "range": [5, 6],
                            "drawn": false
                        },
                        {
                            "_id": "routier04",
                            "type": 0,
                            "text": "🪢 Corde d'Escalade (50m) + Harnais",
                            "img": "icons/tools/navigation/rope-wrapped.webp",
                            "weight": 1,
                            "range": [7, 8],
                            "drawn": false
                        },
                        {
                            "_id": "routier05",
                            "type": 0,
                            "text": "🍞 Rations Énergétiques (5 jours)",
                            "img": "icons/consumables/food/bread-baguette-brown.webp",
                            "weight": 1,
                            "range": [9, 10],
                            "drawn": false
                        }
                    ]
                }
            },

            "panic_check_fr": {
                name: "Test de Panique",
                type: "RollTable",
                img: "icons/svg/terror.svg",
                system: {
                    description: {
                        value: "<p>Table de <strong>Test de Panique</strong> française.</p>"
                    },
                    formula: "2d10",
                    replacement: true,
                    displayRoll: true,
                    results: [
                        {
                            "_id": "panic01",
                            "type": 0,
                            "text": "😰 Tremblements - Désavantage Coordination (1 tour)",
                            "img": "icons/magic/unholy/strike-body-explode-disintegrate.webp",
                            "weight": 1,
                            "range": [2, 5],
                            "drawn": false
                        },
                        {
                            "_id": "panic02",
                            "type": 0,
                            "text": "😨 Panique - Fuite immédiate (1d5 tours)",
                            "img": "icons/magic/movement/trail-streak-impact-blue.webp",
                            "weight": 1,
                            "range": [6, 9],
                            "drawn": false
                        },
                        {
                            "_id": "panic03",
                            "type": 0,
                            "text": "😱 Terreur - Paralysie (1d3 tours)",
                            "img": "icons/magic/control/fear-fright-shadow-monster.webp",
                            "weight": 1,
                            "range": [10, 13],
                            "drawn": false
                        },
                        {
                            "_id": "panic04",
                            "type": 0,
                            "text": "🤯 Stress Aigu - +1d10 Stress permanent",
                            "img": "icons/magic/unholy/barrier-shield-glowing-triangle-red.webp",
                            "weight": 1,
                            "range": [14, 17],
                            "drawn": false
                        },
                        {
                            "_id": "panic05",
                            "type": 0,
                            "text": "💥 Effondrement Mental - Inconscience (1d10 min)",
                            "img": "icons/magic/death/skull-explosion-blast-disintegration.webp",
                            "weight": 1,
                            "range": [18, 20],
                            "drawn": false
                        }
                    ]
                }
            }
        };
        
        // Lancer la reconstruction
        ui.notifications.info("🔧 Reconstruction des tables en cours...");
        const result = await rebuildTables(PACK_ID, tablesFrancaises);
        
        // Rapport final
        console.log("🏁 RECONSTRUCTION TERMINÉE");
        console.log(`✅ Tables créées: ${result.created}`);
        console.log(`❌ Erreurs: ${result.errors}`);
        
        ui.notifications.info(`🎉 Reconstruction terminée ! ${result.created} tables françaises créées.`);
        
        if (result.created > 0) {
            ui.notifications.info("✅ Consultez l'onglet Compendium Packs pour voir les nouvelles tables françaises");
        }
        
    } catch (error) {
        console.error("❌ ERREUR CRITIQUE:", error);
        ui.notifications.error(`❌ Erreur lors de la reconstruction: ${error.message}`);
    }
})();