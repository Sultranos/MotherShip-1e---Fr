// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION ARMES FRANÇAISES
// =============================================================================

(async () => {
    // Charger la fonction utilitaire partagée
    if (!window.rebuildCompendium) {
        await import('./fonction_rebuild_shared.js');
    }
    
    const PACK_ID = "mothership-fr.armes_1e";
    
    console.log("⚔️ RECONSTRUCTION ARMES FRANÇAISES");
    console.log("==================================");
    
    // Données sécurisées des armes françaises
    const armesFR = {
        "RSfzogv0n9ur74E0": {
            name: "Couteau de Combat",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/combat_knife.png",
            system: {
                description: {
                    value: "<p>Lame en acier trempé avec manche ergonomique. Arme de corps à corps fiable et silencieuse.</p>"
                },
                cost: { value: 50 },
                weight: { value: 0.3 },
                damage: { value: "1d5" },
                range: { value: "Corps à corps" },
                weaponType: "melee",
                rarity: "common"
            }
        },
        
        "cnqca4oK4UQbADZm": {
            name: "Hache d'Abordage",
            type: "weapon", 
            img: "systems/mothership-fr/images/icons/weapons/boarding_axe.png",
            system: {
                description: {
                    value: "<p>Hache lourde conçue pour percer les coques de vaisseaux. Également efficace au combat rapproché.</p>"
                },
                cost: { value: 200 },
                weight: { value: 2.5 },
                damage: { value: "1d10" },
                range: { value: "Corps à corps" },
                weaponType: "melee",
                rarity: "common"
            }
        },
        
        "EljnbOGT1jJzDliD": {
            name: "Lance-Flammes",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/flamethrower.png",
            system: {
                description: {
                    value: "<p>Arme incendiaire portative. Projette un jet de flamme sur 10 mètres. Efficace contre les groupes.</p>"
                },
                cost: { value: 2000 },
                weight: { value: 15 },
                damage: { value: "2d10" },
                range: { value: "10m cône" },
                weaponType: "heavy",
                rarity: "rare"
            }
        },
        
        "vtIyOvQKdtuqHkRM": {
            name: "Fusil de Combat",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/combat_shotgun.png",
            system: {
                description: {
                    value: "<p>Fusil à pompe semi-automatique. Redoutable à courte portée avec dispersion variable.</p>"
                },
                cost: { value: 800 },
                weight: { value: 4.5 },
                damage: { value: "2d10" },
                range: { value: "Courte" },
                weaponType: "firearm",
                rarity: "common"
            }
        },
        
        "wTfDJR33Qkqyu7yp": {
            name: "Fusil à Impulsions",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/pulse_rifle.png",
            system: {
                description: {
                    value: "<p>Rifle d'assaut énergétique de pointe. Cadence de tir élevée et précision remarquable.</p>"
                },
                cost: { value: 3500 },
                weight: { value: 5.0 },
                damage: { value: "2d10+2" },
                range: { value: "Longue" },
                weaponType: "energy",
                rarity: "rare"
            }
        },
        
        "tJImioEC7juWlCQ9": {
            name: "Fusil Intelligent",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/smart_rifle.png",
            system: {
                description: {
                    value: "<p>Arme avec IA intégrée et système de visée automatique. Compense les erreurs de tir.</p>"
                },
                cost: { value: 5000 },
                weight: { value: 6.0 },
                damage: { value: "2d10+5" },
                range: { value: "Longue" },
                weaponType: "smart",
                rarity: "legendary"
            }
        },
        
        "boqUPFJbGBET0Th5": {
            name: "Pistolet-Mitrailleur",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/smg.png",
            system: {
                description: {
                    value: "<p>Arme automatique compacte. Idéale pour le combat en espaces confinés.</p>"
                },
                cost: { value: 1200 },
                weight: { value: 3.0 },
                damage: { value: "1d10+2" },
                range: { value: "Courte-Moyenne" },
                weaponType: "automatic",
                rarity: "uncommon"
            }
        },
        
        "vSXi8pqFh99goyiy": {
            name: "Grenade à Fragmentation",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/frag_grenade.png",
            system: {
                description: {
                    value: "<p>Explosif à fragmentation contrôlée. Rayon d'effet de 5 mètres.</p>"
                },
                cost: { value: 150 },
                weight: { value: 0.4 },
                damage: { value: "3d10" },
                range: { value: "Lancé (20m)" },
                weaponType: "explosive",
                rarity: "common"
            }
        },
        
        "TlUbDBpALeBvrVZb": {
            name: "Revolver",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/revolver.png",
            system: {
                description: {
                    value: "<p>Arme de poing classique à barillet. Fiable et puissante malgré son ancienneté.</p>"
                },
                cost: { value: 300 },
                weight: { value: 1.2 },
                damage: { value: "1d10+1" },
                range: { value: "Courte" },
                weaponType: "sidearm", 
                rarity: "common"
            }
        },
        
        "8sy2u0XE4p8FWJ5Y": {
            name: "Mitrailleuse Lourde",
            type: "weapon",
            img: "systems/mothership-fr/images/icons/weapons/general_purpose_machine_gun.png",
            system: {
                description: {
                    value: "<p>Arme automatique lourde. Cadence de tir impressionnante mais requiert une mise en place.</p>"
                },
                cost: { value: 8000 },
                weight: { value: 25 },
                damage: { value: "3d10" },
                range: { value: "Très longue" },
                weaponType: "heavy",
                rarity: "rare"
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, armesFR, "armes");
    
})();