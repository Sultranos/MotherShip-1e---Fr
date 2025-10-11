// Script de migration pour réparer le compendium des tables aléatoires
// Exécuter ce script dans la console F12 de Foundry VTT

async function migrateTablesAleatoires() {
  console.log("🚀 Migration des tables aléatoires...");
  
  // Référence au pack source (fvtt_mosh_1e_psg)
  const sourcePack = game.packs.find(p => p.metadata.name === "rolltables_1e" && p.metadata.packageName === "fvtt_mosh_1e_psg");
  if (!sourcePack) {
    console.error("❌ Pack source 'fvtt_mosh_1e_psg.rolltables_1e' non trouvé!");
    return;
  }
  
  // Référence au pack cible (mothership-fr)
  const targetPack = game.packs.get("mothership-fr.tables_aleatoires_1e");
  if (!targetPack) {
    console.error("❌ Pack cible 'mothership-fr.tables_aleatoires_1e' non trouvé!");
    return;
  }
  
  try {
    console.log("📖 Chargement des documents source...");
    const sourceDocuments = await sourcePack.getDocuments();
    console.log(`✅ ${sourceDocuments.length} tables trouvées dans le pack source`);
    
    // Vider le pack cible d'abord
    console.log("🧹 Nettoyage du pack cible...");
    const existingDocs = await targetPack.getDocuments();
    for (const doc of existingDocs) {
      await doc.delete();
    }
    
    // Migrer chaque table
    console.log("📝 Migration des tables...");
    for (const sourceDoc of sourceDocuments) {
      const docData = sourceDoc.toObject();
      
      // Supprimer l'ID et les flags system-spécifiques
      delete docData._id;
      delete docData.folder;
      if (docData.flags) {
        delete docData.flags.core;
        delete docData.flags.mosh;
      }
      
      // Créer le nouveau document dans le pack cible
      const newDoc = await RollTable.create(docData, {pack: targetPack.collection});
      console.log(`✅ Migré: ${newDoc.name}`);
    }
    
    console.log("🎉 Migration terminée avec succès!");
    ui.notifications.info("Migration des tables aléatoires terminée!");
    
  } catch (error) {
    console.error("❌ Erreur lors de la migration:", error);
    ui.notifications.error("Erreur lors de la migration des tables aléatoires!");
  }
}

// Exécuter la migration
migrateTablesAleatoires();