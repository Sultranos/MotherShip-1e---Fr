// Macro de traduction du compendium "Megadamage Effects" (MotherShip FR)
// Placez cette macro dans FoundryVTT et exécutez-la pour mettre à jour les effets en français


async function rebuildTablemegadamageFR() {
    const pack = game.packs.get("mothership-fr.tables_aleatoires_1e");
    if (!pack) {
        ui.notifications.error("❌ Compendium tables_aleatoires_1e introuvable");
        return;
    }
    const tableData = {
        _id:"AqGWwoWXzijFs427",
        name:"Effets de Mégadégâts",
        img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",
        description:"<p><strong>Mégadégâts (MDMG)</strong> : comme les Dégâts et Blessures d'un personnage, mais pour le vaisseau. À chaque MDMG reçu, ajoutez-le au total précédent, marquez le nouveau total sur le tracker et appliquez l'effet listé. Si votre vaisseau atteint 9 MDMG ou plus, il est détruit. Ignorez tout MDMG inférieur à la coque. Si le vaisseau reçoit un MDMG supérieur ou égal à la coque en un coup, la coque est détruite et le vaisseau subit le reste des MDMG.",
      formula:"1d10-1",
      replacement:true,
      displayRoll:true,
      results:[
        {_id:"ENq0mvm5iqtMh1ft",type:0,documentCollection:"null",documentId:"null",text:"<strong>TOUS SYSTÈMES NORMAUX.</strong><br> 5x5. Prêt à partir.", img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[0,0],drawn: false},
        {_id:"yVzV5Y0tNWSqPVpS",type:0,documentCollection:"null",documentId:"null",text:"<strong>FUITE DE CARBURANT D'URGENCE.</strong><br> À chaque dépense de carburant, dépensez-en 1 de plus.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[1,1],drawn: false}, 
        {_id:"Vnfbw2I9XRvrjKQ0",type:0,documentCollection:"null",documentId:"null",text:"<strong>ARMES HORS SERVICE.</strong><br> Échec automatique des tests de combat.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[2,2],drawn: false}, 
        {_id:"qPV5sasqyDgWwNiW",type:0,documentCollection:"null",documentId:"null",text:"<strong>NAVIGATION HORS SERVICE.</strong><br> Impossible d'effectuer des tests de propulseur. 10% de chance que toutes les données de navigation soient effacées.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[3,3],drawn: false}, 
        {_id:"kGOebdOLWOZBekvw",type:0,documentCollection:"null",documentId:"null",text:"<strong>INCENDIE À BORD.</strong><br> Le feu se propage dans le vaisseau, créant une atmosphère toxique <em>(fumées)</em> et une atmosphère très corrosive <em>(10 DMG/tour)</em> dans les zones en feu.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[4,4],drawn: false},
        {_id:"etnepA2VTtuv2iyc",type:0,documentCollection:"null",documentId:"null",text:"<strong>BRECHE DE COQUE.</strong><br> Tous les membres d'équipage font un Jet de Corps ou subissent 1 Blessure <em>(Explosion)</em>. En cas d'échec critique, ils sont aspirés violemment dans l'espace.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[5,5],drawn: false}, 
        {_id:"ay9hN3EYsAJOKUeZ",type:0,documentCollection:"null",documentId:"null",text:"<strong>SYSTÈMES DE VIE HORS SERVICE.</strong><br> Oxygène limité à 1d10 multiplié par la capacité maximale d'équipage.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[6,6],drawn: false},
        {_id:"gNqK1zdrt9AUacUg",type:0,documentCollection:"null",documentId:"null",text:"<strong>FUITE RADIOACTIVE.</strong><br> Le niveau de radiation augmente toutes les 2d10 minutes.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[7,7],drawn: false}, 
        {_id:"kmZfxrotglCOUw8M",type:0,documentCollection:"null",documentId:"null",text:"<strong>EN DÉRIVE.</strong><br> Tous les systèmes hors service, alimentation d'urgence uniquement.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[8,8],drawn: false},
        {_id:"A3XHL5OaSekv3OF3",type:0,documentCollection:"null",documentId:"null",text:"<strong>VAISSEAU DÉTRUIT.</strong><br> Défaillance catastrophique de la coque. Aucun survivant.",img:"systems/mothership-fr/images/icons/ui/rolltables/megadamage_effects.png",weight:1,range:[9,9],drawn: false}
      ]
    };
    try {
        await pack.documentClass.create(tableData, {pack: pack.collection});
        ui.notifications.info("✅ Table Jet de Sauvegarde contre la Mort injectée (FR)");
    } catch (error) {
        console.error("❌ Erreur création Jet de Sauvegarde contre la Mort:", error);
    }
}
// Pour lancer la version française :
rebuildTablemegadamageFR();