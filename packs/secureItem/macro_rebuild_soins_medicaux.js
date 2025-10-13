// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION SOINS MÉDICAUX FRANÇAIS
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.soins_medicaux_1e";
    
    console.log("🏥 RECONSTRUCTION SOINS MÉDICAUX FRANÇAIS");
    console.log("=========================================");
    
    // Données sécurisées des soins médicaux français
    const soinsMedicauxFR = {
        "mK9nR2vS8qX4FcPh": {
            name: "Stimpak",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/stimpak.png",
            system: {
                description: {
                    value: "<p>Stimulant médical d'urgence. Restaure instantanément 1d10 points de vie mais cause 1 point de stress.</p>"
                },
                cost: { value: 100 },
                weight: { value: 0.1 },
                medicalType: "stimulant",
                healingValue: "1d10",
                stressCost: 1,
                rarity: "common",
                usage: "immediate"
            }
        },
        
        "pL7bK3nF6cV9JhUq": {
            name: "Bandages Hémostatiques",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/hemostatic_bandages.png",
            system: {
                description: {
                    value: "<p>Bandages imprégnés d'agents coagulants. Stoppe les hémorragies et soigne 1d5 PV.</p>"
                },
                cost: { value: 50 },
                weight: { value: 0.2 },
                medicalType: "bandage",
                healingValue: "1d5",
                rarity: "common",
                specialEffect: "arrête saignement"
            }
        },
        
        "wX4tY8sJ2nR6pLdX": {
            name: "Trousse de Premiers Secours",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/first_aid_kit.png",
            system: {
                description: {
                    value: "<p>Équipement médical de base. Permet de stabiliser un mourant et soigne 2d5 PV avec 10 minutes de soins.</p>"
                },
                cost: { value: 200 },
                weight: { value: 1.5 },
                medicalType: "kit",
                healingValue: "2d5",
                timeRequired: 10,
                rarity: "common",
                uses: 5
            }
        },
        
        "hZ1vQ5uA9xCsF3kP": {
            name: "Morphine",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/morphine.png",
            system: {
                description: {
                    value: "<p>Analgésique puissant. Ignore la douleur pendant 1 heure mais cause 2 points de stress et risque de dépendance.</p>"
                },
                cost: { value: 150 },
                weight: { value: 0.1 },
                medicalType: "painkiller",
                duration: "1 heure",
                stressCost: 2,
                rarity: "uncommon",
                sideEffects: "risque dépendance"
            }
        },
        
        "jN8kP6YvC3xZbQzR": {
            name: "Adrénaline",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/adrenaline.png",
            system: {
                description: {
                    value: "<p>Injection d'épinéphrine. Ranime un personnage inconscient et donne +10 en Vitesse pendant 10 minutes.</p>"
                },
                cost: { value: 200 },
                weight: { value: 0.1 },
                medicalType: "stimulant",
                effect: "+10 Vitesse",
                duration: "10 minutes",
                rarity: "uncommon",
                specialEffect: "ranime inconscient"
            }
        },
        
        "gF4tH9wE2KnM5qXz": {
            name: "Anti-Rad",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/anti_rad.png",
            system: {
                description: {
                    value: "<p>Traitement contre l'empoisonnement radioactif. Réduit les effets des radiations pendant 24 heures.</p>"
                },
                cost: { value: 300 },
                weight: { value: 0.2 },
                medicalType: "antidote",
                duration: "24 heures",
                rarity: "uncommon",
                specialEffect: "résistance radiations"
            }
        },
        
        "dK7bS4L8vB1mNpQe": {
            name: "Gel Cicatrisant",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/healing_gel.png",
            system: {
                description: {
                    value: "<p>Nano-gel médical avancé. Accélère la guérison naturelle de 1 PV par heure pendant 8 heures.</p>"
                },
                cost: { value: 500 },
                weight: { value: 0.3 },
                medicalType: "regenerative",
                healingRate: "1 PV/heure",
                duration: "8 heures",
                rarity: "rare"
            }
        },
        
        "rM2nS6pT9qXzFcGv": {
            name: "Tranquillisant",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/tranquilizer.png",
            system: {
                description: {
                    value: "<p>Sédatif puissant. Calme instantanément un personnage en panique mais cause somnolence.</p>"
                },
                cost: { value: 100 },
                weight: { value: 0.1 },
                medicalType: "sedative",
                effect: "arrête panique",
                sideEffect: "somnolence 2h",
                rarity: "common"
            }
        },
        
        "tY5kM1sJ4nR7pLdX": {
            name: "Kit Chirurgical",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/surgery_kit.png",
            system: {
                description: {
                    value: "<p>Instruments chirurgicaux de précision. Permet les opérations complexes et guérit 3d10 PV en 30 minutes.</p>"
                },
                cost: { value: 2000 },
                weight: { value: 5 },
                medicalType: "surgical",
                healingValue: "3d10",
                timeRequired: 30,
                rarity: "rare",
                skillRequired: "Médecine 60+"
            }
        },
        
        "bH3vQ7uA5xCsF1kP": {
            name: "Auto-Injecteur",
            type: "medical",
            img: "systems/mothership-fr/images/icons/medical/auto_injector.png",
            system: {
                description: {
                    value: "<p>Dispositif automatique programmable. Peut contenir n'importe quel médicament liquide pour injection d'urgence.</p>"
                },
                cost: { value: 400 },
                weight: { value: 0.3 },
                medicalType: "device",
                capacity: "1 dose",
                rarity: "uncommon",
                specialFeature: "activation automatique"
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, soinsMedicauxFR, "soins médicaux");
    
})();

// Réutilise la fonction rebuildCompendium de la macro équipement