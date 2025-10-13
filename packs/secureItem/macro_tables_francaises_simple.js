// =============================================================================
// MACRO TABLES ALÉATOIRES FRANÇAISES SIMPLIFIÉES
// =============================================================================
// Version simplifiée qui fonctionne avec des icônes FoundryVTT par défaut
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.tables_aleatoires_1e";
    
    console.log("🎲 RECONSTRUCTION TABLES ALÉATOIRES FRANÇAISES (Version Simplifiée)");
    console.log("===================================================================");
    
    // Charger la fonction utilitaire partagée
    if (!window.rebuildCompendium) {
        await import('./fonction_rebuild_shared.js');
    }
    
    // Tables simplifiées avec icônes FoundryVTT natives
    const tablesSimplifiees = {
        "marine_loadout_fr": {
            name: "Équipement : Marine Colonial",
            type: "RollTable",
            img: "icons/svg/d20-grey.svg",
            system: {
                description: {
                    value: "<p>Équipement de départ pour <strong>Marine Colonial</strong> français. Arsenal militaire pour opérations en territoire hostile.</p>"
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
                    value: "<p>Équipement de départ pour <strong>Scientifique</strong> français. Matériel de recherche et d'analyse pour missions d'exploration.</p>"
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
                        "text": "🥽 Combinaison de Laboratoire + Masque Filtrant",
                        "img": "icons/equipment/chest/robe-red.webp",
                        "weight": 1,
                        "range": [5, 6],
                        "drawn": false
                    },
                    {
                        "_id": "scient04",
                        "type": 0,
                        "text": "🧪 Kit d'Analyse Chimique + Produits Réactifs",
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
                    value: "<p>Équipement de départ pour <strong>Androïde</strong> français. Systèmes et outils intégrés pour unité synthétique.</p>"
                },
                formula: "1d10",
                replacement: true,
                displayRoll: true,
                results: [
                    {
                        "_id": "android01",
                        "type": 0,
                        "text": "🔌 Interface de Données Intégrée + Ports USB",
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
                    value: "<p>Équipement de départ pour <strong>Routier</strong> français. Outils et matériel pour travailleur de l'espace.</p>"
                },
                formula: "1d10",
                replacement: true,
                displayRoll: true,
                results: [
                    {
                        "_id": "routier01",
                        "type": 0,
                        "text": "🧰 Boîte à Outils Complète + Pièces de Rechange",
                        "img": "icons/tools/hand/hammer-and-anvil.webp",
                        "weight": 1,
                        "range": [1, 2],
                        "drawn": false
                    },
                    {
                        "_id": "routier02",
                        "type": 0,
                        "text": "👕 Combinaison de Travail Renforcée + Gants",
                        "img": "icons/equipment/chest/shirt-simple-brown.webp",
                        "weight": 1,
                        "range": [3, 4],
                        "drawn": false
                    },
                    {
                        "_id": "routier03",
                        "type": 0,
                        "text": "🔦 Lampe Frontale + Batteries de Rechange (6)",
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
                        "text": "🍞 Rations Énergétiques (5 jours) + Thermos",
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
                    value: "<p>Table de <strong>Test de Panique</strong> française. Effets psychologiques en situation de stress extrême.</p>"
                },
                formula: "2d10",
                replacement: true,
                displayRoll: true,
                results: [
                    {
                        "_id": "panic01",
                        "type": 0,
                        "text": "😰 Tremblements - Désavantage aux jets de Coordination pendant 1 tour",
                        "img": "icons/magic/unholy/strike-body-explode-disintegrate.webp",
                        "weight": 1,
                        "range": [2, 5],
                        "drawn": false
                    },
                    {
                        "_id": "panic02",
                        "type": 0,
                        "text": "😨 Panique - Fuite immédiate pendant 1d5 tours",
                        "img": "icons/magic/movement/trail-streak-impact-blue.webp",
                        "weight": 1,
                        "range": [6, 9],
                        "drawn": false
                    },
                    {
                        "_id": "panic03",
                        "type": 0,
                        "text": "😱 Terreur - Paralysie pendant 1d3 tours",
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
                        "text": "💥 Effondrement Mental - Inconscience 1d10 minutes",
                        "img": "icons/magic/death/skull-explosion-blast-disintegration.webp",
                        "weight": 1,
                        "range": [18, 20],
                        "drawn": false
                    }
                ]
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, tablesSimplifiees, "tables aléatoires françaises");
    
})();