// Script de correction temporaire pour les IDs de tables
// Exécuter dans la console F12 de Foundry VTT

async function fixTableIds() {
  console.log("🔧 Correction des IDs de tables...");
  
  // Référence au pack de tables aléatoires
  const pack = game.packs.get("mothership-fr.tables_aleatoires_1e");
  if (!pack) {
    console.error("❌ Pack 'mothership-fr.tables_aleatoires_1e' non trouvé!");
    return;
  }
  
  const documents = await pack.getDocuments();
  console.log(`📖 ${documents.length} tables chargées`);
  
  // Mapper les noms vers les IDs
  const tableMap = {};
  documents.forEach(doc => {
    tableMap[doc.name.toLowerCase()] = doc.id;
  });
  
  // Chercher et corriger les tables importantes
  let found = {};
  
  // Signal de détresse
  const distressOptions = ['distress signal', 'signal de détresse', 'signal', 'distress'];
  for (const option of distressOptions) {
    if (tableMap[option]) {
      found.distress = tableMap[option];
      break;
    }
  }
  
  // Megadamage
  const megadamageOptions = ['megadamage', 'mega damage', 'dégâts massifs', 'damage'];
  for (const option of megadamageOptions) {
    if (tableMap[option]) {
      found.megadamage = tableMap[option];
      break;
    }
  }
  
  // Maintenance
  const maintenanceOptions = ['maintenance', 'problems', 'problèmes'];
  for (const option of maintenanceOptions) {
    if (tableMap[option]) {
      found.maintenance = tableMap[option];
      break;
    }
  }
  
  // Bankruptcy
  const bankruptcyOptions = ['bankruptcy', 'banqueroute', 'bankrupt'];
  for (const option of bankruptcyOptions) {
    if (tableMap[option]) {
      found.bankruptcy = tableMap[option];
      break;
    }
  }
  
  console.log("🎯 Tables trouvées:", found);
  
  // Mettre à jour les settings si trouvées
  if (found.distress) {
    await game.settings.set('mothership-fr', 'table1eDistressSignal', found.distress);
    console.log(`✅ Distress Signal ID mis à jour: ${found.distress}`);
  }
  
  if (found.megadamage) {
    await game.settings.set('mothership-fr', 'table1eMegadamageEffects', found.megadamage);
    console.log(`✅ Megadamage ID mis à jour: ${found.megadamage}`);
  }
  
  if (found.maintenance) {
    await game.settings.set('mothership-fr', 'table1eMaintenance', found.maintenance);
    console.log(`✅ Maintenance ID mis à jour: ${found.maintenance}`);
  }
  
  if (found.bankruptcy) {
    await game.settings.set('mothership-fr', 'table1eBankruptcy', found.bankruptcy);
    console.log(`✅ Bankruptcy ID mis à jour: ${found.bankruptcy}`);
  }
  
  console.log("🎉 Correction terminée! Rechargez Foundry pour voir les changements.");
  
  return found;
}

// Exécuter la correction
fixTableIds();