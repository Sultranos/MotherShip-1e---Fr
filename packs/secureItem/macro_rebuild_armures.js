// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION ARMURES FRANÇAISES
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.armures_1e";
    
    console.log("🛡️ RECONSTRUCTION ARMURES FRANÇAISES");
    console.log("====================================");
    
    // Données sécurisées des armures françaises
    const armuresFR = {
        "Qsd5U2w0Q6dBhGwG": {
            name: "Armure Standard",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/standard_armor.png",
            system: {
                description: {
                    value: "<p>Armure corporelle standard en alliage composite. Protection équilibrée sans pénalité de mouvement.</p>"
                },
                cost: { value: 1500 },
                weight: { value: 8 },
                armorValue: { value: 5 },
                armorType: "light",
                rarity: "common",
                coverage: "torso"
            }
        },
        
        "5LGWnRZO2EfDxFSV": {
            name: "Armure de Combat",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/combat_armor.png",
            system: {
                description: {
                    value: "<p>Armure militaire renforcée avec plaques balistiques. Excellent rapport protection/mobilité.</p>"
                },
                cost: { value: 3000 },
                weight: { value: 12 },
                armorValue: { value: 10 },
                armorType: "medium",
                rarity: "uncommon",
                coverage: "full"
            }
        },
        
        "gfRBtH7wE9KnM2qX": {
            name: "Armure Assistée",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/powered_armor.png",
            system: {
                description: {
                    value: "<p>Exosquelette motorisé avec blindage intégral. Augmente la force et offre une protection maximale.</p>"
                },
                cost: { value: 15000 },
                weight: { value: 45 },
                armorValue: { value: 20 },
                armorType: "powered",
                rarity: "rare",
                coverage: "full",
                powerRequirement: true
            }
        },
        
        "N8kJp4YvC1xZbQzR": {
            name: "Combinaison Spatiale",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/space_suit.png",
            system: {
                description: {
                    value: "<p>Combinaison pressurisée pour activités extraterrestres. Protection environnementale complète.</p>"
                },
                cost: { value: 5000 },
                weight: { value: 20 },
                armorValue: { value: 3 },
                armorType: "environmental",
                rarity: "common",
                coverage: "full",
                environmentalProtection: {
                    vacuum: true,
                    radiation: true,
                    temperature: true
                }
            }
        },
        
        "P9fGcV3mA7nKtHuE": {
            name: "Armure Tactique",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/tactical_armor.png",
            system: {
                description: {
                    value: "<p>Armure modulaire avec accessoires tactiques intégrés. Optimisée pour les opérations spéciales.</p>"
                },
                cost: { value: 4500 },
                weight: { value: 15 },
                armorValue: { value: 12 },
                armorType: "tactical",
                rarity: "uncommon",
                coverage: "full",
                specialFeatures: ["vision nocturne", "communication intégrée"]
            }
        },
        
        "dKjH6sL9vB2mNpQe": {
            name: "Gilet Pare-Balles",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/ballistic_vest.png",
            system: {
                description: {
                    value: "<p>Protection balistique légère dissimulable sous les vêtements civils.</p>"
                },
                cost: { value: 800 },
                weight: { value: 3 },
                armorValue: { value: 3 },
                armorType: "concealed",
                rarity: "common",
                coverage: "torso"
            }
        },
        
        "rM4nS8pT1qXzFcGv": {
            name: "Combinaison Hazmat",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/hazmat_suit.png",
            system: {
                description: {
                    value: "<p>Combinaison de protection contre les matières dangereuses. Étanche aux gaz et liquides toxiques.</p>"
                },
                cost: { value: 1200 },
                weight: { value: 5 },
                armorValue: { value: 1 },
                armorType: "hazmat",
                rarity: "common",
                coverage: "full",
                environmentalProtection: {
                    chemical: true,
                    biological: true,
                    radioactive: true
                }
            }
        },
        
        "wX7bK5nF9cV2JhUq": {
            name: "Armure de Sécurité",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/security_armor.png",
            system: {
                description: {
                    value: "<p>Équipement standard des forces de sécurité corporatives. Protection modérée avec mobilité préservée.</p>"
                },
                cost: { value: 2000 },
                weight: { value: 10 },
                armorValue: { value: 7 },
                armorType: "security",
                rarity: "common",
                coverage: "torso"
            }
        },
        
        "tY3kM8sJ6nR9pLdX": {
            name: "Armure Anti-Émeute",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/riot_armor.png",
            system: {
                description: {
                    value: "<p>Armure spécialisée pour le contrôle des foules. Résistante aux impacts contondants.</p>"
                },
                cost: { value: 2500 },
                weight: { value: 18 },
                armorValue: { value: 8 },
                armorType: "riot",
                rarity: "uncommon",
                coverage: "full",
                specialFeatures: ["résistance impact", "visière renforcée"]
            }
        },
        
        "hZ9vQ4uA1xCsF6kP": {
            name: "Armure Expérimentale",
            type: "armor",
            img: "systems/mothership-fr/images/icons/armor/experimental_armor.png",
            system: {
                description: {
                    value: "<p>Prototype d'armure avec technologie avancée. Performances exceptionnelles mais fiabilité incertaine.</p>"
                },
                cost: { value: 25000 },
                weight: { value: 30 },
                armorValue: { value: 25 },
                armorType: "experimental",
                rarity: "legendary",
                coverage: "full",
                specialFeatures: ["champ énergétique", "auto-réparation", "camouflage actif"]
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, armuresFR, "armures");
    
})();

// Réutilise la fonction rebuildCompendium de la macro équipement