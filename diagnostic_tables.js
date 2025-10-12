// Script de diagnostic pour trouver les IDs des tables manquantes
// Exécuter dans la console F12 de Foundry VTT

async function findTableIds() {
  console.log("🔍 Recherche des IDs de tables dans le compendium...");
  
  // Référence au pack de tables aléatoires
  const pack = game.packs.get("mothership-fr.tables_aleatoires_1e");
  if (!pack) {
    console.error("❌ Pack 'mothership-fr.tables_aleatoires_1e' non trouvé!");
    return;
  }
  
  console.log("📖 Chargement des documents...");
  const documents = await pack.getDocuments();
  console.log(`✅ ${documents.length} tables trouvées`);
  
  // Rechercher les tables importantes
  const targetTables = [
    "megadamage",
    "distress", 
    "signal",
    "détresse",
    "maintenance",
    "bankruptcy",
    "banqueroute"
  ];
  
  console.log("\n🎯 Tables importantes trouvées:");
  console.log("================================");
  
  documents.forEach(doc => {
    const name = doc.name.toLowerCase();
    const isImportant = targetTables.some(target => name.includes(target));
    
    if (isImportant) {
      console.log(`📋 ${doc.name}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   UUID: ${doc.uuid}`);
      console.log("");
    }
  });
  
  console.log("\n📝 Toutes les tables disponibles:");
  console.log("=================================");
  documents.forEach(doc => {
    console.log(`${doc.name} | ID: ${doc.id}`);
  });
  
  // Vérifier les settings actuels
  console.log("\n⚙️ Settings actuels:");
  console.log("====================");
  console.log(`Megadamage: ${game.settings.get('mothership-fr', 'table1eMegadamageEffects')}`);
  console.log(`Maintenance: ${game.settings.get('mothership-fr', 'table1eMaintenance')}`);
  console.log(`Bankruptcy: ${game.settings.get('mothership-fr', 'table1eBankruptcy')}`);
  
  return documents;
}

// Exécuter la recherche
findTableIds();