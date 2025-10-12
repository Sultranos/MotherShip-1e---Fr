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
      // Reset des LVDB avec gestion d'erreur améliorée
      await this.resetLVDB();
      
      // Notification de succès
      ui.notifications.info(`✅ Mise à jour vers ${toVersion} terminée avec succès !`);
      
      // Log des changements spécifiques selon la version
      this.logVersionChanges(fromVersion, toVersion);
      
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour:", error);
      ui.notifications.warn(`⚠️ Mise à jour vers ${toVersion} terminée avec des avertissements - voir la console pour plus de détails`);
      
      // Log des changements même en cas d'erreur partielle
      this.logVersionChanges(fromVersion, toVersion);
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
    
    // Compter les compendiums traités avec succès
    let resetCount = 0;
    let totalCount = 0;
    
    // Forcer le rechargement des compendiums de manière compatible
    for (const pack of game.packs) {
      if (pack.metadata.system === this.MODULE_NAME) {
        totalCount++;
        const success = await this.safeResetCompendium(pack);
        if (success) {
          resetCount++;
          console.log(`✅ Reset du compendium: ${pack.collection}`);
        }
      }
    }
    
    console.log(`✅ Compendiums traités: ${resetCount}/${totalCount} avec succès`);
    
    // Si on est dans un navigateur, suggérer un rechargement de page
    if (resetCount < totalCount) {
      console.log("💡 Astuce: Un rechargement de page (F5) garantira la prise en compte complète des changements");
    }
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
      ],
      "1.1.9": [
        "🔧 Correction des erreurs de reset LVDB",
        "🛡️ Gestion sécurisée des propriétés en lecture seule",
        "⚠️ Amélioration de la gestion d'erreurs",
        "💡 Suggestions automatiques pour les cas problématiques"
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
      ui.notifications.warn(`⚠️ Reset terminé avec des avertissements - voir la console pour plus de détails`);
    }
  }
  
  /**
   * Méthode utilitaire pour nettoyer un compendium de manière sécurisée
   */
  static async safeResetCompendium(pack) {
    try {
      // Méthodes sécurisées qui ne touchent pas aux propriétés en lecture seule
      if (pack.apps && Array.isArray(pack.apps)) {
        pack.apps.length = 0;
      }
      
      if (pack.index && typeof pack.index.clear === 'function') {
        pack.index.clear();
      } else if (pack.index && pack.index instanceof Map) {
        pack.index.clear();
      }
      
      // Marquer comme non chargé si possible
      if (pack.hasOwnProperty('_loaded')) {
        try {
          pack._loaded = false;
        } catch (e) {
          // Propriété en lecture seule, ignorer
        }
      }
      
      return true;
    } catch (error) {
      console.warn(`⚠️ Impossible de réinitialiser complètement le compendium ${pack.collection}:`, error);
      return false;
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