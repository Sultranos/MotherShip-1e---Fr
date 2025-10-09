export class ShoreLeaveTierEditor extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "shore-leave-tier-editor",
      title: game.i18n.localize("MoshQoL.EditShoreLeaveTiers.Title"),
      template: "modules/mosh-greybearded-qol/templates/edit-shore-leave-tiers.html",
      width: 600,
      height: "auto",
      closeOnSubmit: true,
      resizable: true
    });
  }

  async getData() {
    const tiers = game.settings.get("mosh-greybearded-qol", "shoreLeaveTiers");
    return { tiers: foundry.utils.deepClone(tiers) };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".reset-defaults").on("click", async () => {
      const module = await import("../config/default-shore-leave-tiers.js");
      await game.settings.set("mosh-greybearded-qol", "shoreLeaveTiers", module.SHORE_LEAVE_TIERS);
      this.render();
      ui.notifications.info(game.i18n.localize("MoshQoL.EditShoreLeaveTiers.Reset"));
    });
  }

  async _updateObject(event, formData) {
    const data = foundry.utils.expandObject(formData);
    await game.settings.set("mosh-greybearded-qol", "shoreLeaveTiers", data.tiers);
    ui.notifications.info(game.i18n.localize("MoshQoL.EditShoreLeaveTiers.Updated"));
  }
}
