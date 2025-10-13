// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION PATCHS FRANÇAIS
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.patchs_1e";
    
    console.log("🎖️ RECONSTRUCTION PATCHS FRANÇAIS");
    console.log("==================================");
    
    // Données sécurisées des patchs français
    const patchsFR = {
        "zK9nR4vS2qX8FcPh": {
            name: "Patch Marine Colonial",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/colonial_marine.png",
            system: {
                description: {
                    value: "<p>Insigne distinctif des Marines Coloniaux. Symbolise le courage et la détermination face à l'inconnu.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "military",
                organization: "Marines Coloniaux",
                rarity: "common",
                effect: "+1 Moral en groupe"
            }
        },
        
        "pL8bK5nF3cV7JhUq": {
            name: "Patch Scientifique",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/scientist.png",
            system: {
                description: {
                    value: "<p>Badge officiel du personnel scientifique. Accorde l'accès aux laboratoires et équipements de recherche.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "civilian",
                organization: "Division Scientifique",
                rarity: "common",
                effect: "Accès laboratoires"
            }
        },
        
        "wX6tY2sJ9nR4pLdX": {
            name: "Patch Ingénieur",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/engineer.png",
            system: {
                description: {
                    value: "<p>Identification du personnel technique. Permet l'accès aux systèmes critiques du vaisseau.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "technical",
                organization: "Corps des Ingénieurs",
                rarity: "common",
                effect: "Accès systèmes techniques"
            }
        },
        
        "hZ3vQ1uA7xCsF5kP": {
            name: "Patch Androïde",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/android.png",
            system: {
                description: {
                    value: "<p>Marqueur d'identification synthétique. Signale le statut d'unité artificielle aux autres membres de l'équipage.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "synthetic",
                organization: "Synthétiques Weyland-Yutani",
                rarity: "uncommon",
                effect: "Identification synthétique"
            }
        },
        
        "jN7kP3YvC6xZbQzR": {
            name: "Patch Sécurité",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/security.png",
            system: {
                description: {
                    value: "<p>Insigne des forces de sécurité corporatives. Autorise le port d'armes et l'accès aux zones restreintes.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "security",
                organization: "Sécurité Corporative",
                rarity: "common",
                effect: "Port d'armes autorisé"
            }
        },
        
        "gF8tH4wE1KnM3qXz": {
            name: "Patch Pilote",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/pilot.png",
            system: {
                description: {
                    value: "<p>Brevet de pilote spatial certifié. Nécessaire pour opérer les vaisseaux et navettes.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "pilot",
                organization: "Guilde des Pilotes",
                rarity: "uncommon",
                effect: "Certification pilotage"
            }
        },
        
        "dK5bS9L2vB8mNpQe": {
            name: "Patch Médecin",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/medic.png",
            system: {
                description: {
                    value: "<p>Caducée médical officiel. Identifie le personnel soignant et garantit l'accès aux fournitures médicales.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "medical",
                organization: "Corps Médical",
                rarity: "common",
                effect: "Accès matériel médical"
            }
        },
        
        "rM1nS7pT4qXzFcGv": {
            name: "Patch Routier",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/teamster.png",
            system: {
                description: {
                    value: "<p>Emblème du syndicat des transporteurs. Représente la solidarité ouvrière dans l'espace.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "labor",
                organization: "Syndicat des Routiers",
                rarity: "common",
                effect: "Solidarité syndicale"
            }
        },
        
        "tY6kM8sJ1nR2pLdX": {
            name: "Patch Weyland-Yutani",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/weyland_yutani.png",
            system: {
                description: {
                    value: "<p>Logo corporatif de Weyland-Yutani. Marque d'appartenance à la mégacorporation la plus puissante.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "corporate",
                organization: "Weyland-Yutani Corp",
                rarity: "common",
                effect: "Statut corporatif"
            }
        },
        
        "bH9vQ6uA3xCsF7kP": {
            name: "Patch Vétéran",
            type: "patch",
            img: "systems/mothership-fr/images/icons/patches/veteran.png",
            system: {
                description: {
                    value: "<p>Décoration d'honneur pour service distingué. Accordée aux survivants de missions critiques.</p>"
                },
                cost: { value: 0 },
                weight: { value: 0.01 },
                patchType: "honor",
                organization: "Anciens Combattants",
                rarity: "rare",
                effect: "+2 Respect, +1 Moral"
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, patchsFR, "patchs");
    
})();

// Réutilise la fonction rebuildCompendium de la macro équipement