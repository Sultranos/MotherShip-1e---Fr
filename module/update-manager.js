/**
 * Gestionnaire de mise à jour automatique pour Mothership-FR
 * Gère le reset des LVDB lors des mises à jour pour éviter les artefacts
 */
export class UpdateManager {
  static MODULE_NAME = "mothership-fr";
  static VERSION_KEY = "systemVersion";
  
  /**
   * Initialise le gestionnaire de mise à jour
   */
  static async initialize() {
    console.log("🔄 Initializing UpdateManager...");
    
    // Vérifier si c'est une nouvelle installation ou une mise à jour
    const currentVersion = game.system.version;
    const storedVersion = game.settings.get(this.MODULE_NAME, this.VERSION_KEY) || "0.0.0";
    
    console.log(`📦 Version actuelle: ${currentVersion}, Version stockée: ${storedVersion}`);
    
    // Si c'est une mise à jour
    if (this.isVersionNewer(currentVersion, storedVersion)) {
      console.log(`🆕 Mise à jour détectée: ${storedVersion} → ${currentVersion}`);
      await this.handleUpdate(storedVersion, currentVersion);
    }
    
    // Mettre à jour la version stockée
    await game.settings.set(this.MODULE_NAME, this.VERSION_KEY, currentVersion);
  }
  
  /**
   * Enregistre les paramètres nécessaires
   */
  static registerSettings() {
    game.settings.register(this.MODULE_NAME, this.VERSION_KEY, {
      name: "Version du système",
      hint: "Version actuellement installée du système",
      scope: "world",
      config: false,
      type: String,
      default: "0.0.0"
    });
    
    game.settings.register(this.MODULE_NAME, "autoResetLVDB", {
      name: "Reset automatique des LVDB",
      hint: "Réinitialise automatiquement les bases de données locales lors des mises à jour",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    });
  }
  
  /**
   * Compare deux versions et détermine si la première est plus récente
   */
  static isVersionNewer(current, stored) {
    const currentParts = current.split('.').map(Number);
    const storedParts = stored.split('.').map(Number);
    
    for (let i = 0; i < Math.max(currentParts.length, storedParts.length); i++) {
      const currentPart = currentParts[i] || 0;
      const storedPart = storedParts[i] || 0;
      
      if (currentPart > storedPart) return true;
      if (currentPart < storedPart) return false;
    }
    
    return false;
  }
  
  /**
   * Gère la mise à jour du système
   */
  static async handleUpdate(fromVersion, toVersion) {
    console.log(`🔄 Traitement de la mise à jour de ${fromVersion} vers ${toVersion}`);
    
    // Vérifier si l'utilisateur est GM
    if (!game.user.isGM) {
      console.log("👤 Utilisateur non-GM, pas de reset des LVDB");
      return;
    }
    
    // Vérifier si le reset automatique est activé
    const autoReset = game.settings.get(this.MODULE_NAME, "autoResetLVDB");
    if (!autoReset) {
      console.log("⚙️ Reset automatique des LVDB désactivé");
      return;
    }
    
    // Afficher une notification de début
    ui.notifications.info(`🔄 Mise à jour vers ${toVersion} - Reset des LVDB en cours...`);
    
    try {
      // Reset des LVDB
      await this.resetLVDB();
      
      // Notification de succès
      ui.notifications.info(`✅ Mise à jour vers ${toVersion} terminée avec succès !`);
      
      // Log des changements spécifiques selon la version
      this.logVersionChanges(fromVersion, toVersion);
      
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour:", error);
      ui.notifications.error(`❌ Erreur lors de la mise à jour: ${error.message}`);
    }
  }
  
  /**
   * Reset des bases de données locales (LVDB)
   */
  static async resetLVDB() {
    console.log("🗑️ Reset des LVDB...");
    
    // Supprimer les caches des compendiums
    if (window.localforage) {
      try {
        // Vider le cache de localforage utilisé par FoundryVTT
        await localforage.clear();
        console.log("✅ Cache localforage vidé");
      } catch (error) {
        console.warn("⚠️ Impossible de vider le cache localforage:", error);
      }
    }
    
    // Forcer le rechargement des compendiums
    for (const pack of game.packs) {
      if (pack.metadata.system === this.MODULE_NAME) {
        try {
          // Vider le cache du compendium
          pack.apps = [];
          pack._source = null;
          pack.index = new Map();
          console.log(`🔄 Reset du compendium: ${pack.collection}`);
        } catch (error) {
          console.warn(`⚠️ Erreur lors du reset du compendium ${pack.collection}:`, error);
        }
      }
    }
    
    // Recharger les packs
    await game.packs.reload();
    console.log("✅ Compendiums rechargés");
  }
  
  /**
   * Log des changements spécifiques selon les versions
   */
  static logVersionChanges(fromVersion, toVersion) {
    const changes = {
      "1.1.7": [
        "✅ Correction des références de compendiums dans classes_1e.db",
        "🔧 Mise à jour des références fvtt_mosh_1e_psg → mothership-fr"
      ],
      "1.1.8": [
        "🔄 Ajout du gestionnaire de mise à jour automatique",
        "🗑️ Reset automatique des LVDB pour éviter les artefacts",
        "📦 Amélioration de la stabilité des compendiums"
      ]
    };
    
    console.log(`📋 Changements apportés en version ${toVersion}:`);
    const versionChanges = changes[toVersion] || ["🔄 Mise à jour système"];
    versionChanges.forEach(change => console.log(`  ${change}`));
  }
  
  /**
   * Force le reset des LVDB manuellement
   */
  static async forceResetLVDB() {
    if (!game.user.isGM) {
      ui.notifications.warn("⚠️ Seul un MJ peut forcer le reset des LVDB");
      return;
    }
    
    const confirm = await Dialog.confirm({
      title: "Reset des LVDB",
      content: "<p>Êtes-vous sûr de vouloir réinitialiser les bases de données locales ?</p><p><strong>Cette action va vider tous les caches.</strong></p>"
    });
    
    if (!confirm) return;
    
    ui.notifications.info("🔄 Reset forcé des LVDB en cours...");
    
    try {
      await this.resetLVDB();
      ui.notifications.info("✅ Reset des LVDB terminé !");
    } catch (error) {
      console.error("❌ Erreur lors du reset forcé:", error);
      ui.notifications.error(`❌ Erreur: ${error.message}`);
    }
  }
}

// Hook pour initialiser le gestionnaire au démarrage
Hooks.once('ready', () => {
  UpdateManager.initialize();
});

// Hook pour enregistrer les paramètres
Hooks.once('init', () => {
  UpdateManager.registerSettings();
});

// Exposer la fonction de reset forcé globalement
window.forceResetLVDB = () => UpdateManager.forceResetLVDB();