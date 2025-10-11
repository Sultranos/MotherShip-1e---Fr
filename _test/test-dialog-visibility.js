// Test script pour vérifier la visibilité des boutons de dialogue
// À exécuter dans la console de Foundry pour tester

// Test 1: Dialog simple avec boutons
new Dialog({
  title: "Test de visibilité des boutons",
  content: `
    <div style="height: 400px; overflow-y: auto;">
      <p>Contenu de test avec beaucoup de texte pour forcer le défilement...</p>
      ${Array(50).fill().map((_, i) => `<p>Ligne ${i + 1} - Ceci est une ligne de test</p>`).join('')}
    </div>
  `,
  buttons: {
    test1: {
      label: "Bouton Test 1",
      callback: () => ui.notifications.info("Test 1 cliqué")
    },
    test2: {
      label: "Bouton Test 2", 
      callback: () => ui.notifications.info("Test 2 cliqué")
    },
    cancel: {
      label: "Annuler",
      callback: () => ui.notifications.warn("Annulé")
    }
  },
  default: "test1"
}).render(true);

// Test 2: DialogV2 avec contenu débordant
new foundry.applications.api.DialogV2({
  window: {
    title: "Test DialogV2 - Visibilité des boutons"
  },
  content: `
    <div style="height: 500px; overflow-y: auto; padding: 20px;">
      <h3>Test de défilement</h3>
      ${Array(100).fill().map((_, i) => `<p>Paragraphe ${i + 1} - Test de contenu long qui nécessite un défilement vertical</p>`).join('')}
    </div>
  `,
  buttons: [{
    action: "confirm",
    label: "Confirmer",
    callback: () => ui.notifications.info("DialogV2 confirmé")
  }, {
    action: "cancel", 
    label: "Annuler",
    callback: () => ui.notifications.warn("DialogV2 annulé")
  }]
}).render(true);