// =============================================================================
// MACRO SPÉCIALISÉE : RECONSTRUCTION CLASSES FRANÇAISES
// =============================================================================

(async () => {
    const PACK_ID = "mothership-fr.classes_1e";
    
    console.log("👥 RECONSTRUCTION CLASSES FRANÇAISES");
    console.log("====================================");
    
    // Données sécurisées des classes françaises
    const classesFR = {
        "cL9nR2vS8qX4FcPh": {
            name: "Marine",
            type: "class",
            img: "systems/mothership-fr/images/icons/classes/marine.png",
            system: {
                description: {
                    value: "<p><strong>MARINE COLONIAL</strong></p><p>Soldat d'élite entraîné pour les opérations en milieux hostiles. Expert en combat et tactiques militaires.</p><p><strong>Compétences Principales :</strong> Tir, Combat au Corps à Corps, Militaire, Athlétisme</p><p><strong>Équipement de Départ :</strong> Fusil d'assaut, Armure de Combat, Grenade, Trousse de Premiers Secours</p>"
                },
                classType: "military",
                primaryStats: ["Force", "Coordination"],
                hitPoints: { base: 40, growth: "1d10" },
                sanity: { base: 30, growth: "1d5" },
                startingSkills: [
                    { name: "Tir", value: 40 },
                    { name: "Combat au Corps à Corps", value: 35 },
                    { name: "Militaire", value: 30 },
                    { name: "Athlétisme", value: 25 }
                ],
                startingEquipment: [
                    "Fusil d'Assaut",
                    "Armure de Combat", 
                    "Grenade à Fragmentation",
                    "Trousse de Premiers Secours",
                    "Rations (5 jours)"
                ],
                rarity: "common"
            }
        },
        
        "sC7bK3nF6cV9JhUq": {
            name: "Scientifique",
            type: "class",
            img: "systems/mothership-fr/images/icons/classes/scientist.png",
            system: {
                description: {
                    value: "<p><strong>SCIENTIFIQUE</strong></p><p>Chercheur spécialisé dans l'analyse et la recherche. Expert en investigation et technologies avancées.</p><p><strong>Compétences Principales :</strong> Recherche, Informatique, Médecine, Linguistique</p><p><strong>Équipement de Départ :</strong> Scanner Portable, Kit d'Analyse, Tablette, Échantillons Vides</p>"
                },
                classType: "academic",
                primaryStats: ["Intellect", "Santé"],
                hitPoints: { base: 25, growth: "1d5" },
                sanity: { base: 45, growth: "1d10" },
                startingSkills: [
                    { name: "Recherche", value: 40 },
                    { name: "Informatique", value: 35 },
                    { name: "Médecine", value: 30 },
                    { name: "Linguistique", value: 25 }
                ],
                startingEquipment: [
                    "Scanner Portable",
                    "Kit d'Analyse Chimique",
                    "Tablette de Données",
                    "Contenants d'Échantillons (10)",
                    "Combinaison de Laboratoire"
                ],
                rarity: "common"
            }
        },
        
        "aD4tY8sJ2nR6pLdX": {
            name: "Routier",
            type: "class", 
            img: "systems/mothership-fr/images/icons/classes/teamster.png",
            system: {
                description: {
                    value: "<p><strong>ROUTIER</strong></p><p>Travailleur expérimenté et polyvalent. Spécialiste de la maintenance et de la survie en conditions difficiles.</p><p><strong>Compétences Principales :</strong> Ingénierie, Pilotage, Survie, Athlétisme</p><p><strong>Équipement de Départ :</strong> Boîte à Outils, Combinaison de Travail, Lampe Torche, Corde</p>"
                },
                classType: "worker",
                primaryStats: ["Force", "Coordination"],
                hitPoints: { base: 35, growth: "1d8" },
                sanity: { base: 35, growth: "1d8" },
                startingSkills: [
                    { name: "Ingénierie", value: 40 },
                    { name: "Pilotage", value: 35 },
                    { name: "Survie", value: 30 },
                    { name: "Athlétisme", value: 25 }
                ],
                startingEquipment: [
                    "Boîte à Outils Complète",
                    "Combinaison de Travail Renforcée",
                    "Lampe Torche Puissante",
                    "Corde (50m)",
                    "Rations Énergétiques (3 jours)"
                ],
                rarity: "common"
            }
        },
        
        "bA1vQ5uA9xCsF3kP": {
            name: "Androïde",
            type: "class",
            img: "systems/mothership-fr/images/icons/classes/android.png",
            system: {
                description: {
                    value: "<p><strong>ANDROÏDE</strong></p><p>Synthétique biomécanique avancé. Immunité aux effets biologiques mais vulnérable aux interférences électroniques.</p><p><strong>Compétences Principales :</strong> Informatique, Tir, Ingénierie, Militaire</p><p><strong>Équipement de Départ :</strong> Interface Données, Outils Intégrés, Capteurs Avancés</p>"
                },
                classType: "synthetic",
                primaryStats: ["Coordination", "Intellect"],
                hitPoints: { base: 30, growth: "1d8" },
                sanity: { base: 50, growth: "0" },
                startingSkills: [
                    { name: "Informatique", value: 50 },
                    { name: "Tir", value: 35 },
                    { name: "Ingénierie", value: 30 },
                    { name: "Militaire", value: 25 }
                ],
                startingEquipment: [
                    "Interface de Données Intégrée",
                    "Outils Multi-Fonctions Intégrés",
                    "Capteurs Avancés",
                    "Kit de Maintenance Synthétique",
                    "Patch d'Identification Androïde"
                ],
                specialRules: [
                    "Immunité: poison, maladie, panique",
                    "Vulnérabilité: EMP, piratage",
                    "Pas de récupération naturelle de Sanité"
                ],
                rarity: "uncommon"
            }
        },
        
        "jN8kP6YvC3xZbQzR": {
            name: "Pilote",
            type: "class",
            img: "systems/mothership-fr/images/icons/classes/pilot.png",
            system: {
                description: {
                    value: "<p><strong>PILOTE</strong></p><p>As du pilotage spatial et expert en navigation. Capable de manœuvrer tout type de véhicule spatial.</p><p><strong>Compétences Principales :</strong> Pilotage, Informatique, Ingénierie, Tir</p><p><strong>Équipement de Départ :</strong> Casque de Pilote, Combinaison de Vol, Instruments de Navigation</p>"
                },
                classType: "specialist",
                primaryStats: ["Coordination", "Intellect"],
                hitPoints: { base: 30, growth: "1d8" },
                sanity: { base: 40, growth: "1d8" },
                startingSkills: [
                    { name: "Pilotage", value: 50 },
                    { name: "Informatique", value: 30 },
                    { name: "Ingénierie", value: 25 },
                    { name: "Tir", value: 30 }
                ],
                startingEquipment: [
                    "Casque de Pilote HUD",
                    "Combinaison de Vol Pressurisée",
                    "Instruments de Navigation Portables",
                    "Kit de Survie Spatial",
                    "Patch Pilote Certifié"
                ],
                rarity: "uncommon"
            }
        },
        
        "mM4nS7pT9qXzFcGv": {
            name: "Médecin",
            type: "class",
            img: "systems/mothership-fr/images/icons/classes/medic.png",
            system: {
                description: {
                    value: "<p><strong>MÉDECIN</strong></p><p>Professionnel de santé qualifié. Expert en soins d'urgence et chirurgie de terrain.</p><p><strong>Compétences Principales :</strong> Médecine, Psychologie, Recherche, Survie</p><p><strong>Équipement de Départ :</strong> Trousse Médicale Avancée, Scanner Médical, Médicaments</p>"
                },
                classType: "medical",
                primaryStats: ["Intellect", "Coordination"],
                hitPoints: { base: 25, growth: "1d5" },
                sanity: { base: 40, growth: "1d10" },
                startingSkills: [
                    { name: "Médecine", value: 50 },
                    { name: "Psychologie", value: 35 },
                    { name: "Recherche", value: 30 },
                    { name: "Survie", value: 25 }
                ],
                startingEquipment: [
                    "Trousse Médicale Avancée",
                    "Scanner Médical Portable",
                    "Médicaments d'Urgence",
                    "Instruments Chirurgicaux",
                    "Patch Médecin Certifié"
                ],
                rarity: "uncommon"
            }
        }
    };
    
    return await rebuildCompendium(PACK_ID, classesFR, "classes");
    
})();

// Réutilise la fonction rebuildCompendium de la macro équipement