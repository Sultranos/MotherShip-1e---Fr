// Macro de correction des chemins d'images dans tous les compendiums mothership-fr
// Compatible Foundry v13, sans champ à compléter
// Corrige les chemins contenant 'mosh' ou 'module' vers 'systems/mothership-fr/images/...'

(async () => {
  const SYSTEM_IMG_ROOT = 'systems/mothership-fr/images/icons/ui/';
  const PACK_PREFIX = 'mothership-fr.';
  let totalFixed = 0;
  let totalDocs = 0;
  let packs = Array.from(game.packs).filter(p => p.metadata.packageName === 'mothership-fr');

  for (const pack of packs) {
    await pack.getIndex();
    for (const entry of pack.index) {
      let doc = await pack.getDocument(entry._id);
      if (!doc) continue;
      totalDocs++;
      let img = doc.img;
      let docFixed = false;
      if (typeof img === 'string' && /mosh|module/.test(img)) {
        let fileName = img.split('/').pop();
        let subfolder = 'misc';
        if (/armor/.test(img)) subfolder = 'armor';
        else if (/equipment/.test(img)) subfolder = 'equipment';
        else if (/medical_care/.test(img)) subfolder = 'medical_care';
        else if (/rolltables/.test(img)) subfolder = 'rolltables';
        else if (/skills/.test(img)) subfolder = 'skills';
        else if (/weapons/.test(img)) subfolder = 'weapons';
        else if (/icons/.test(img)) subfolder = 'icons';
        let newImg = `${SYSTEM_IMG_ROOT}${subfolder}/${fileName}`;
        await doc.update({img: newImg});
        totalFixed++;
        docFixed = true;
        console.log(`[FIXED] ${pack.collection} > ${doc.name}: ${img} => ${newImg}`);
      }
      // Correction des images dans les résultats de RollTable
      if (doc.documentName === 'RollTable' && Array.isArray(doc.results)) {
        let resultsFixed = false;
        let newResults = [];
        for (let r of doc.results) {
          if (r && typeof r.img === 'string' && /mosh|module/.test(r.img)) {
            let fileName = r.img.split('/').pop();
            let subfolder = 'misc';
            if (/armor/.test(r.img)) subfolder = 'armor';
            else if (/equipment/.test(r.img)) subfolder = 'equipment';
            else if (/medical_care/.test(r.img)) subfolder = 'medical_care';
            else if (/rolltables/.test(r.img)) subfolder = 'rolltables';
            else if (/skills/.test(r.img)) subfolder = 'skills';
            else if (/weapons/.test(r.img)) subfolder = 'weapons';
            else if (/icons/.test(r.img)) subfolder = 'icons';
            let newImg = `${SYSTEM_IMG_ROOT}${subfolder}/${fileName}`;
            r.img = newImg;
            resultsFixed = true;
            totalFixed++;
            console.log(`[FIXED] ${pack.collection} > ${doc.name} (result): ${r.img} => ${newImg}`);
          }
          // Correction des images dans les tableresult (documents référencés)
          if (r && r.type === 'document' && typeof r.documentUuid === 'string') {
            let uuid = r.documentUuid;
            let refDoc = null;
            try {
              refDoc = await fromUuid(uuid);
            } catch (e) {
              console.warn(`[WARN] Impossible de charger le document référencé: ${uuid}`);
            }
            if (refDoc && typeof refDoc.img === 'string' && /mosh|module/.test(refDoc.img)) {
              let fileName = refDoc.img.split('/').pop();
              let subfolder = 'misc';
              if (/armor/.test(refDoc.img)) subfolder = 'armor';
              else if (/equipment/.test(refDoc.img)) subfolder = 'equipment';
              else if (/medical_care/.test(refDoc.img)) subfolder = 'medical_care';
              else if (/rolltables/.test(refDoc.img)) subfolder = 'rolltables';
              else if (/skills/.test(refDoc.img)) subfolder = 'skills';
              else if (/weapons/.test(refDoc.img)) subfolder = 'weapons';
              else if (/icons/.test(refDoc.img)) subfolder = 'icons';
              let newImg = `${SYSTEM_IMG_ROOT}${subfolder}/${fileName}`;
              await refDoc.update({img: newImg});
              totalFixed++;
              console.log(`[FIXED] ${pack.collection} > ${doc.name} (tableresult): ${refDoc.name}: ${refDoc.img} => ${newImg}`);
            }
          }
          newResults.push(r);
        }
        if (resultsFixed) {
          await doc.update({results: newResults});
        }
      }
    }
  }
  ui.notifications.info(`Correction terminée: ${totalFixed} images corrigées sur ${totalDocs} documents.`);
})();
