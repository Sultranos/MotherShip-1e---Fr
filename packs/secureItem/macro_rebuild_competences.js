// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION COMPÉTENCES FRANÇAISES
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.competences_1e";
    
    console.log("🎯 RECONSTRUCTION COMPÉTENCES FRANÇAISES");
    console.log("========================================");
    
    // Données sécurisées des compétences françaises
    const competencesFR = {
        "sK9nR2vS8qX4FcPh": {
            name: "Tir",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/firearms.png",
            system: {
                description: {
                    value: "<p>Maîtrise des armes à feu et à projectiles. Inclut le tir de précision, les armes automatiques et les tactiques de combat à distance.</p>"
                },
                category: "Combat",
                attribute: "Coordination",
                baseValue: 15,
                trained: false,
                rarity: "common"
            }
        },
        
        "pL7bK3nF6cV9JhUq": {
            name: "Combat au Corps à Corps",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/close_combat.png",
            system: {
                description: {
                    value: "<p>Techniques de combat rapproché, arts martiaux et maniement d'armes blanches. Efficace dans les espaces confinés.</p>"
                },
                category: "Combat",
                attribute: "Force",
                baseValue: 25,
                trained: false,
                rarity: "common"
            }
        },
        
        "wX4tY8sJ2nR6pLdX": {
            name: "Pilotage",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/piloting.png",
            system: {
                description: {
                    value: "<p>Conduite de vaisseaux spatiaux, navettes et véhicules de toutes sortes. Navigation en 3D et manœuvres d'urgence.</p>"
                },
                category: "Technique",
                attribute: "Coordination",
                baseValue: 10,
                trained: false,
                rarity: "uncommon"
            }
        },
        
        "hZ1vQ5uA9xCsF3kP": {
            name: "Informatique",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/computers.png",
            system: {
                description: {
                    value: "<p>Programmation, piratage et maintenance des systèmes informatiques. Manipulation des IA et des bases de données.</p>"
                },
                category: "Technique",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "common"
            }
        },
        
        "jN8kP6YvC3xZbQzR": {
            name: "Médecine",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/medical_aid.png",
            system: {
                description: {
                    value: "<p>Soins médicaux, chirurgie d'urgence et diagnostic. Connaissance de l'anatomie humaine et des synthétiques.</p>"
                },
                category: "Savoir",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "uncommon"
            }
        },
        
        "gF4tH9wE2KnM5qXz": {
            name: "Ingénierie",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/industrial_equipment.png",
            system: {
                description: {
                    value: "<p>Réparation et maintenance des systèmes mécaniques et électroniques. Construction et modification d'équipements.</p>"
                },
                category: "Technique",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "common"
            }
        },
        
        "dK7bS4L8vB1mNpQe": {
            name: "Survie",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/survival.png",
            system: {
                description: {
                    value: "<p>Survie en milieux hostiles, orientation, fabrication d'abris et recherche de ressources. Adaptation aux environnements extraterrestres.</p>"
                },
                category: "Savoir",
                attribute: "Santé",
                baseValue: 15,
                trained: false,
                rarity: "common"
            }
        },
        
        "rM2nS6pT9qXzFcGv": {
            name: "Psychologie",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/psychology.png",
            system: {
                description: {
                    value: "<p>Compréhension du comportement humain, négociation et manipulation. Détection des mensonges et gestion du stress.</p>"
                },
                category: "Savoir",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "uncommon"
            }
        },
        
        "tY5kM1sJ4nR7pLdX": {
            name: "Athlétisme",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/athletics.png",
            system: {
                description: {
                    value: "<p>Condition physique, escalade, natation et acrobaties. Mouvements dans l'espace en gravité zéro.</p>"
                },
                category: "Physique",
                attribute: "Force",
                baseValue: 25,
                trained: false,
                rarity: "common"
            }
        },
        
        "bH3vQ7uA5xCsF1kP": {
            name: "Militaire",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/military_training.png",
            system: {
                description: {
                    value: "<p>Entraînement militaire, tactiques de combat et commandement. Connaissance des protocoles et de l'équipement militaire.</p>"
                },
                category: "Combat",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "uncommon"
            }
        },
        
        "cG8uN4yD7jKmL9eX": {
            name: "Recherche",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/geology.png",
            system: {
                description: {
                    value: "<p>Méthodes scientifiques, analyse d'échantillons et recherche documentaire. Investigation et déduction logique.</p>"
                },
                category: "Savoir",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "common"
            }
        },
        
        "fE6sR9vB2mNpQzTk": {
            name: "Linguistique",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/linguistics.png",
            system: {
                description: {
                    value: "<p>Maîtrise des langues, cryptographie et communication. Déchiffrage de codes et traduction de langues extraterrestres.</p>"
                },
                category: "Savoir",
                attribute: "Intellect",
                baseValue: 10,
                trained: false,
                rarity: "rare"
            }
        },
        
        "kL3pV7qA1xCsF8nM": {
            name: "Artillerie",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/heavy_machinery.png",
            system: {
                description: {
                    value: "<p>Utilisation d'armes lourdes, explosifs et équipements de démolition. Maniement des systèmes d'armement navals.</p>"
                },
                category: "Combat",
                attribute: "Coordination",
                baseValue: 5,
                trained: false,
                rarity: "rare"
            }
        },
        
        "mQ9zW4tH6nKjL2eR": {
            name: "Archéologie",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/archaeology.png",
            system: {
                description: {
                    value: "<p>Étude des civilisations anciennes et extraterrestres. Excavation prudente et analyse d'artefacts inconnus.</p>"
                },
                category: "Savoir",
                attribute: "Intellect",
                baseValue: 5,
                trained: false,
                rarity: "rare"
            }
        },
        
        "yU8iP5oA3xDfG7kN": {
            name: "Mystique",
            type: "skill",
            img: "systems/mothership-fr/images/icons/skills/theology.png",
            system: {
                description: {
                    value: "<p>Connaissance des phénomènes paranormaux et des cultes. Résistance aux influences psychiques anormales.</p>"
                },
                category: "Savoir",
                attribute: "Santé",
                baseValue: 5,
                trained: false,
                rarity: "legendary"
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, competencesFR, "compétences");
    
})();

// Réutilise la fonction rebuildCompendium de la macro équipement