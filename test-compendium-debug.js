// Script de debug pour tester les compendiums de classes
console.log("=== DEBUG COMPENDIUM CLASSES ===");

// 1. Lister tous les packs disponibles
console.log("1. Tous les packs disponibles:");
Array.from(game.packs.keys()).forEach(key => {
  const pack = game.packs.get(key);
  console.log(`   - ${key} (${pack.metadata.label}) - Type: ${pack.metadata.type}`);
});

// 2. Rechercher spécifiquement le pack des classes
console.log("\n2. Recherche du pack classes_1e:");
const classPack = game.packs.get("mothership-fr.classes_1e");
if (classPack) {
  console.log("   ✅ Pack trouvé:", classPack.metadata);
  
  // 3. Lister le contenu du pack
  classPack.getDocuments().then(docs => {
    console.log("\n3. Contenu du pack classes_1e:");
    console.log(`   Nombre de documents: ${docs.length}`);
    docs.forEach(doc => {
      console.log(`   - ${doc.name} (type: ${doc.type}, id: ${doc.id})`);
      if (doc.type === "class") {
        console.log(`     UUID: ${doc.uuid}`);
        console.log(`     Pack: ${doc.pack}`);
      }
    });
  }).catch(err => {
    console.error("   ❌ Erreur lors de la lecture du pack:", err);
  });
} else {
  console.log("   ❌ Pack non trouvé !");
  
  // Chercher des alternatives
  console.log("\n   Recherche d'alternatives:");
  game.packs.forEach(pack => {
    if (pack.metadata.label.toLowerCase().includes("class")) {
      console.log(`   Trouvé: ${pack.metadata.id} (${pack.metadata.label})`);
    }
  });
}

// 4. Test simple de création de personnage (si un acteur est sélectionné)
if (game.user.character) {
  console.log("\n4. Test avec personnage sélectionné:", game.user.character.name);
  // Importer la fonction de sélection de classe
  import("./module/qol/character-creator/select-class.js").then(module => {
    console.log("   Module select-class importé avec succès");
  }).catch(err => {
    console.error("   ❌ Erreur import select-class:", err);
  });
} else {
  console.log("\n4. Aucun personnage sélectionné pour test");
}

console.log("=== FIN DEBUG ===");