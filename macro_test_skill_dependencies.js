/**
 * MACRO DE TEST - Dépendances entre compétences (MOTHERSHIP-FR v1.0.14)
 * 
 * Ce macro teste les dépendances entre compétences pour s'assurer qu'il n'y a pas
 * de doublons ou de liens erronés dans l'affichage du créateur de personnage.
 * 
 * INSTRUCTIONS D'UTILISATION :
 * 1. Copier et exécuter ce code dans FoundryVTT (en tant que GM)
 * 2. Vérifier les résultats dans la console et le chat
 * 3. S'assurer qu'il n'y a pas de doublons dans les dépendances
 * 
 * VERSION: 1.0.14
 * DERNIÈRE MISE À JOUR: 2025-01-10
 */

(async function testSkillDependencies() {
  console.log("=== TEST DES DÉPENDANCES DE COMPÉTENCES ===");
  
  try {
    // Récupérer le compendium des compétences
    const skillsPack = game.packs.get("mothership-fr.competences_1e");
    if (!skillsPack) {
      console.error("❌ Compendium mothership-fr.competences_1e non trouvé");
      ui.notifications.error("Compendium des compétences non trouvé");
      return;
    }
    
    // Charger toutes les compétences
    const skills = await skillsPack.getDocuments();
    console.log(`📚 ${skills.length} compétences chargées`);
    
    // Importer les modules de dépendances
    const { getSkillPrerequisites, getSkillDependents } = await import("/systems/mothership-fr/module/utils/skill-dependencies.js");
    const { findSkillByName, skillNamesMatch } = await import("/systems/mothership-fr/module/utils/skill-translation-map.js");
    
    let results = {
      total: skills.length,
      withSystemPrereqs: 0,
      withConfigPrereqs: 0,
      withBothPrereqs: 0,
      duplicateConnections: 0,
      missingPrereqs: []
    };
    
    const connectionMap = new Map(); // Traquer les connexions pour détecter les doublons
    
    console.log("\n--- ANALYSE DES DÉPENDANCES ---");
    
    for (const skill of skills) {
      const systemPrereqs = (skill.system.prerequisite_ids || []).map(p => p.split(".").pop());
      const configPrereqs = getSkillPrerequisites(skill.name);
      
      if (systemPrereqs.length > 0) {
        results.withSystemPrereqs++;
        console.log(`🔗 ${skill.name} - Prérequis système: [${systemPrereqs.join(", ")}]`);
      }
      
      if (configPrereqs.length > 0) {
        results.withConfigPrereqs++;
        console.log(`⚙️ ${skill.name} - Prérequis config: [${configPrereqs.join(", ")}]`);
      }
      
      if (systemPrereqs.length > 0 && configPrereqs.length > 0) {
        results.withBothPrereqs++;
        console.log(`⚠️ ${skill.name} - DOUBLON POTENTIEL (système + config)`);
      }
      
      // Normaliser les prérequis pour détecter les doublons
      const normalizedPrereqs = new Set();
      
      // Prérequis système
      for (const prereqId of systemPrereqs) {
        const prereqSkill = skills.find(s => s.id === prereqId);
        if (prereqSkill) {
          const connectionKey = `${prereqSkill.name}->${skill.name}`;
          if (normalizedPrereqs.has(prereqSkill.name)) {
            results.duplicateConnections++;
            console.log(`🔄 DOUBLON DÉTECTÉ: ${connectionKey}`);
          }
          normalizedPrereqs.add(prereqSkill.name);
          connectionMap.set(connectionKey, "système");
        } else {
          results.missingPrereqs.push(`${skill.name} -> ${prereqId} (ID manquant)`);
        }
      }
      
      // Prérequis configuration
      for (const prereqName of configPrereqs) {
        const prereqSkill = findSkillByName(prereqName, skills);
        if (prereqSkill) {
          const connectionKey = `${prereqSkill.name}->${skill.name}`;
          if (normalizedPrereqs.has(prereqSkill.name)) {
            results.duplicateConnections++;
            console.log(`🔄 DOUBLON DÉTECTÉ: ${connectionKey}`);
          } else if (connectionMap.has(connectionKey)) {
            results.duplicateConnections++;
            console.log(`🔄 DOUBLON SYSTÈME/CONFIG: ${connectionKey}`);
          }
          normalizedPrereqs.add(prereqSkill.name);
          connectionMap.set(connectionKey, "config");
        } else {
          results.missingPrereqs.push(`${skill.name} -> ${prereqName} (nom non trouvé)`);
        }
      }
    }
    
    console.log("\n--- RÉSULTATS ---");
    console.log(`📊 Compétences totales: ${results.total}`);
    console.log(`🔗 Avec prérequis système: ${results.withSystemPrereqs}`);
    console.log(`⚙️ Avec prérequis config: ${results.withConfigPrereqs}`);
    console.log(`⚠️ Avec les deux types: ${results.withBothPrereqs}`);
    console.log(`🔄 Connexions dupliquées: ${results.duplicateConnections}`);
    console.log(`❌ Prérequis manquants: ${results.missingPrereqs.length}`);
    
    if (results.missingPrereqs.length > 0) {
      console.log("\n--- PRÉREQUIS MANQUANTS ---");
      results.missingPrereqs.forEach(missing => console.log(`❌ ${missing}`));
    }
    
    console.log("\n--- TOUTES LES CONNEXIONS ---");
    for (const [connection, source] of connectionMap.entries()) {
      console.log(`${source === "système" ? "🔗" : "⚙️"} ${connection} (${source})`);
    }
    
    // Résultat dans le chat
    const chatMessage = `
      <div class="card">
        <h3>🧪 Test des Dépendances de Compétences</h3>
        <p><strong>Compétences analysées:</strong> ${results.total}</p>
        <p><strong>Avec prérequis système:</strong> ${results.withSystemPrereqs}</p>
        <p><strong>Avec prérequis config:</strong> ${results.withConfigPrereqs}</p>
        <p><strong>Avec doublons:</strong> ${results.withBothPrereqs}</p>
        <p><strong>Connexions dupliquées:</strong> ${results.duplicateConnections}</p>
        <p><strong>Prérequis manquants:</strong> ${results.missingPrereqs.length}</p>
        ${results.duplicateConnections === 0 ? 
          '<p style="color: green;">✅ <strong>Aucun doublon détecté !</strong></p>' : 
          '<p style="color: orange;">⚠️ <strong>Doublons détectés - voir console</strong></p>'
        }
      </div>
    `;
    
    ChatMessage.create({
      user: game.user.id,
      content: chatMessage
    });
    
    console.log("=== FIN DU TEST ===");
    
  } catch (error) {
    console.error("❌ Erreur lors du test des dépendances:", error);
    ui.notifications.error("Erreur lors du test - voir console");
  }
})();