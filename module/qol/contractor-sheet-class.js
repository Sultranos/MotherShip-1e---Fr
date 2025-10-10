import { getThemeColor } from "./utils/get-theme-color.js";
import { chatOutput } from "./utils/chat-output.js";
import { selectClass } from "./character-creator/select-class.js";
import { rollLoadout } from "./character-creator/roll-loadout.js";
import { MOTIVATION_TABLE } from "./config/default-contractor-motivation.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class QoLContractorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        var options = {
            classes: ["mosh", "sheet", "actor", "creature"],
            template: "modules/mosh-greybearded-qol/templates/contractor-sheet.html",
            width: 700,
            height: 650,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "character" }]
        };

        return foundry.utils.mergeObject(super.defaultOptions, options);
    }

    async _updateObject(event, formData) {
        const salaryPath = "system.contractor.baseSalary";
        if (formData[salaryPath]) {
            formData[salaryPath] = parseInt(formData[salaryPath].replace(/\D/g, ""), 10) || 0;
        }

        const actor = this.object;
        var updateData;
        if (game.release.generation >= 12) {
          updateData = foundry.utils.expandObject(formData);
        } else {
          updateData = expandObject(formData);
        }

        await actor.update(updateData, {
            diff: false
        });
    }

    /* -------------------------------------------- */

    /** @override */
    async getData() {
      const sheetData = await super.getData();
      sheetData.dtypes = ["String", "Number", "Boolean"];
      let actorData = sheetData.data;
    
      this._prepareContractorItems(sheetData);
        
      // Feste Settings als Platzhalter
      actorData.system.contractor = {
        isNamed: this.actor.system.contractor?.isNamed ?? false,
        baseSalary: this.actor.system.contractor?.baseSalary ?? 0,
        role: this.actor.system.contractor?.role ?? "",
        motivation: this.actor.system.contractor?.motivation ?? "",
        hiddenMotivation: this.actor.system.contractor?.hiddenMotivation ?? ""
      };
           
      if (actorData.system.settings == null) actorData.system.settings = {};
      actorData.system.settings.hideWeight = game.settings.get("mosh", "hideWeight");
      actorData.system.settings.firstEdition = game.settings.get("mosh", "firstEdition");
        
      actorData.enriched = {
        description: await TextEditor.enrichHTML(actorData.system.description, { async: true }),
        biography: await TextEditor.enrichHTML(actorData.system.biography, { async: true })
      };

      actorData.isGM = game.user.isGM;
      actorData.themeColor = getThemeColor();
        
      return actorData;
    }

    /**
     * Get the remaining wounds of the creature
     * @param {JQuery} html 
     * @returns {int} hits.max - hits.value
     */
    getWoundsLeft(html){
        return html.find(`input[name="system.hits.max"]`).prop('value') - html.find(`input[name="system.hits.value"]`).prop('value'); 
    }

    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */
    _prepareContractorItems(sheetData) {
        const actorData = sheetData.data;
    
        // Initialize containers.
        const abilities = [];
        const weapons = [];
        const armors = [];
        const gear = [];
        let armorPoints = 0;
        let damageReduction = 0;
    
        // Iterate through items, allocating to containers
        for (let i of sheetData.items) {
            const item = i.system;
            i.img = i.img || DEFAULT_TOKEN;
    
            if (i.type === 'ability') {
                abilities.push(i);
    
            } else if (i.type === 'item') {
                gear.push(i);
    
            } else if (i.type === 'armor') {
                if (item.equipped) {
                    armorPoints += item.armorPoints || 0;
                    damageReduction += item.damageReduction || 0;
                }
                armors.push(i);
    
            } else if (i.type === 'weapon') {
                if (item?.ranges?.value === "" && item.ranges.medium > 0) {
                    item.ranges.value = `${item.ranges.short}/${item.ranges.medium}/${item.ranges.long}`;
                    item.ranges.medium = 0;
                }
                weapons.push(i);
            }
        }

        const cover = actorData.system.stats?.armor?.cover || "";
        
        // Assign and return
        actorData.abilities = abilities;
        actorData.weapons = weapons;
        actorData.armors = armors;
        actorData.gear = gear;
        actorData.system.stats.armor = {
            mod: armorPoints,
            cover: cover,
            damageReduction: damageReduction
        };
    }


    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Salary Display
        html.find(".currency-input")
          .on("focus", function () {
            // Bei Fokus: Nur die Zahl zeigen
            const val = this.value.replace(/\D/g, "");
            this.value = val;
          })
          .on("blur", function () {
            // Aufbereiten
            const raw = parseInt(this.value.replace(/\D/g, ""), 10) || 0;
            // Setze echten Wert (für Speicherung)
            this.value = raw;
            // Und zeitverzögert formatieren
            setTimeout(() => {
              this.value = `${raw.toLocaleString(game.i18n.lang)} cr`;
            }, 1);
          });

        // Promote Contractor
        html.find('[data-action="promote-contractor"]').on('click', async (event) => {
          event.preventDefault();
        
          const actor = this.actor;
          if (!actor) return;
        
          // 1. Promote to Named
          await actor.update({ "system.contractor.isNamed": true });
          
          // 2. Add all the Stuff
          await this._rollContractorLoyalty(this.actor);
          await this._rollContractorMotivation(this.actor);
          await this._rollContractorLoadout(this.actor);
        
          // 3. Re-render to update UI
          this.render();
        });

        html.find('[data-action="contractor-menu"]').on("click", async (event) => {
          const actor = this.actor; // Falls du das im Sheet-Kontext nutzt
          if (!game.user.isGM) return;
        
          new Dialog({
            title: "Contractor Actions",
            content: `<p>Select a contractor option below:</p>`,
            buttons: {
              loyalty: {
                label: "Roll Loyalty",
                callback: () => this._rollContractorLoyalty(this.actor)
              },
              motivation: {
                label: "Roll Motivation",
                callback: () => this._rollContractorMotivation(this.actor)
              },
              loadout: {
                label: "Roll Loadout",
                callback: () => this._rollContractorLoadout(this.actor)
              }
            },
            default: "loyalty"
          }).render(true);
        });

        // Attribute Rolls
        // Rollable Attribute
        html.find('.stat-roll').click(ev => {
            const div = $(ev.currentTarget);
            const statName = div.data("key");
            this.actor.rollCheck(null, 'low', statName, null, null, null);
        });
        
        // ITEMS
        // Add Inventory Item
        html.find('.item-create').click(this._onItemCreate.bind(this));        
        
        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
            li.slideUp(200, () => this.render(false));
        });

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
          const li = $(ev.currentTarget).parents(".item");
          const item = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
          item.sheet.render(true);
        });

        //Quantity adjuster
        html.on('mousedown', '.item-quantity', ev => {
          const li = ev.currentTarget.closest(".item");
          //const item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId))
          var item;
          if (game.release.generation >= 12) {
            item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
          } else {
            item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
          }
          let amount = item.system.quantity;
    
          if (event.button == 0) {
            item.system.quantity = Number(amount) + 1;
          } else if (event.button == 2) {
            item.system.quantity = Number(amount) - 1;
          }
    
          this.actor.updateEmbeddedDocuments('Item', [item]);
        });        

        // Rollable Item/Anything with a description that we want to click on.
        html.find('.description-roll').click(ev => {
            const li = ev.currentTarget.closest(".item");
            this.actor.printDescription(li.dataset.itemId, {
                event: ev
            });
        });        

        // WEAPONS
        // Add Inventory Item
        html.find('.weapon-create').click(this._onItemCreate.bind(this));

        // Update Inventory Item
        html.find('.weapon-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const weapon = this.actor.getEmbeddedDocument("Item", li.data("itemId"));
            weapon.sheet.render(true);
        });

        // Rollable Weapon
        html.find('.weapon-roll').click(ev => {
            const li = ev.currentTarget.closest(".item");
            var item;
            if (game.release.generation >= 12) {
                item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            } else {
                item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            }
            this.actor.rollCheck(null, 'low', 'combat', null, null, item);
        });

        // Rollable Damage
        html.find('.dmg-roll').click(ev => {
            const li = ev.currentTarget.closest(".item");
            var item;
            if (game.release.generation >= 12) {
                item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            } else {
                item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            }
            this.actor.rollCheck(null, null, 'damage', null, null, item);
        });

        //increase ammo
        html.on('mousedown', '.weapon-ammo', ev => {
            //dupe item to work on
            const li = ev.currentTarget.closest(".item");
            var item;
            if (game.release.generation >= 12) {
                item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            } else {
                item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            }
            let amount = item.system.ammo;
            //increase ammo
            if (event.button == 0) {
                if (amount >= 0) {
                    item.system.ammo = Number(amount) + 1;
                }
            } else if (event.button == 2) {
                if (amount > 0) {
                    item.system.ammo = Number(amount) - 1;
                }
            }
            //update ammo count
            this.actor.updateEmbeddedDocuments('Item', [item]);
        });
        
        //increase shots
        html.on('mousedown', '.weapon-shots', ev => {
            const li = ev.currentTarget.closest(".item");
            var item;
            if (game.release.generation >= 12) {
                item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            } else {
                item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
            }
            if (event.button == 0) {
                if (item.system.curShots >= 0 && item.system.curShots < item.system.shots && item.system.ammo > 0) {
                    item.system.curShots = Number(item.system.curShots) + 1;
                    item.system.ammo = Number(item.system.ammo) - 1;
                }
            } else if (event.button == 2) {
                if (item.system.curShots > 0) {
                    item.system.curShots = Number(item.system.curShots) - 1;
                    item.system.ammo = Number(item.system.ammo) + 1;
                }
            }
            this.actor.updateEmbeddedDocuments('Item', [item]);
        });

        //Reload Shots
        html.on('mousedown', '.weapon-reload', ev => {
            const li = ev.currentTarget.closest(".item");
            this.actor.reloadWeapon(li.dataset.itemId);
        });

        // ARMOR
        // Equip
        html.find('.item-equip').click(ev => {
          const li = ev.currentTarget.closest(".item");
          var item;
          if (game.release.generation >= 12) {
            item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
          } else {
            item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
          }
    
          item.system.equipped = !item.system.equipped;
          this.actor.updateEmbeddedDocuments('Item', [item]);
        });
        
        //increase oxygen
        html.on('mousedown', '.armor-oxy', ev => {
          const li = ev.currentTarget.closest(".item");
          //const item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId))
          var item;
          if (game.release.generation >= 12) {
            item = foundry.utils.duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
          } else {
            item = duplicate(this.actor.getEmbeddedDocument("Item", li.dataset.itemId));
          }
          let amount = item.system.oxygenCurrent;
          if (event.button == 0) {
            if (amount < item.system.oxygenMax) {
              item.system.oxygenCurrent = Number(amount) + 1;
            }
          } else if (event.button == 2) {
            if (amount > 0) {
              item.system.oxygenCurrent = Number(amount) - 1;
            }
          }
          this.actor.updateEmbeddedDocuments('Item', [item]);
        });
    
        // Clicking on Armor
        html.find('.armor-roll').click(ev => {
          //roll panic check
          this.actor.chooseCover();
        });

        // DRAG & DROP
        // Drag events for macros.
        if (this.actor.isOwner) {
            let handler = ev => this._onDragStart(ev);

            html.find('li.dropitem').each((i, li) => {
                if (li.classList.contains("inventory-header")) return;
                li.setAttribute("draggable", true);
                li.addEventListener("dragstart", handler, false);
            });
        }

        // Initial format currency fields
        html.find(".currency-input").each(function () {
          const raw = parseInt(this.value.replace(/\D/g, ""), 10) || 0;
          this.value = `${raw.toLocaleString(game.i18n.lang)} cr`;
        });

    }

    /* -------------------------------------------- */

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        var data;
        if (game.release.generation >= 12) {
            data = foundry.utils.duplicate(header.dataset);
        } else {
            data = duplicate(header.dataset);
        }
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];

        // Finally, create the item!
        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }


    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        console.log(super.getData());

        if (dataset.roll) {
            let roll = new Roll(dataset.roll, this.actor.system);
            let label = dataset.label ? `Rolling ${dataset.label} to score under ${dataset.target}` : '';
            roll.roll().toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label
            });
        }
    }

  /**
   * Rolls a motivation from the MOTIVATION_TABLE and stores it in system.contractor.hiddenMotivation
   * @param {Actor} actor - The actor to update
   */
  async _rollContractorMotivation(actor) {
    const roll = new Roll("1d100");
    await roll.evaluate();

    const rolledValue = roll.total % 100;
    const result = MOTIVATION_TABLE.find(entry => rolledValue >= entry.min && rolledValue <= entry.max);

    if (!result) {
      ui.notifications.warn("No matching motivation found.");
      return;
    }

    await actor.update({ "system.contractor.hiddenMotivation": result.text }, { diff: false });
    this.render(); // Re-render sheet if needed
  }

  async _rollContractorLoyalty(actor) {
    const roll = new Roll("2d10 + 10");
    await roll.evaluate();
    const total = roll.total;
  
    await actor.update({ "system.stats.loyalty.value": total });
  
    await chatOutput({
      actor,
      title: game.i18n.localize("MoshQoL.LoyaltyRolled") || "Loyalty Rolled",
      subtitle: actor.name,
      image: actor.img,
      content: `<span class="counter">${total}</span> Loyalty`,
      roll
    });
  
    this.render(); // Falls `this` hier noch Sheet-Kontext ist  
  }

  async _rollContractorLoadout(actor) {
    const selectedClass = await selectClass(actor, false);
    if (selectedClass) await rollLoadout(actor, selectedClass, {
      rollCredits: false,
      clearItems: true
    });
  }

}
