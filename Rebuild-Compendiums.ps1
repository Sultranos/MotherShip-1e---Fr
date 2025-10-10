# =============================================================================
# SCRIPT POWERSHELL : RECONSTRUCTION COMPENDIUMS MOTHERSHIP-FR
# =============================================================================
# Ce script copie les contenus des compendiums originaux vers le système unifié
# puis applique les traductions françaises
# =============================================================================

# Configuration des chemins
$MOTHERSHIP_FR_PATH = "E:\Foundry\MosH\MotherShip - Fr"
$FVTT_PSG_PATH = "E:\Foundry\MosH\fvtt_mosh_1e_psg"
$MOSH_PATH = "E:\Foundry\MosH\mosh"

$PACKS_FR = Join-Path $MOTHERSHIP_FR_PATH "packs"
$PACKS_PSG = Join-Path $FVTT_PSG_PATH "packs"
$PACKS_MOSH = Join-Path $MOSH_PATH "packs"

Write-Host "=== RECONSTRUCTION COMPENDIUMS MOTHERSHIP-FR ===" -ForegroundColor Yellow
Write-Host "Sources: fvtt_mosh_1e_psg + mosh" -ForegroundColor Cyan
Write-Host "Destination: mothership-fr" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Yellow

# Mappings des fichiers source vers destination
$mappings = @(
    @{ src = "$PACKS_PSG\items_skills_1e.db"; dst = "$PACKS_FR\competences_1e.db"; name = "Compétences" },
    @{ src = "$PACKS_PSG\items_classes_1e.db"; dst = "$PACKS_FR\classes_1e.db"; name = "Classes" },
    @{ src = "$PACKS_PSG\items_armor_1e.db"; dst = "$PACKS_FR\armures_1e.db"; name = "Armures" },
    @{ src = "$PACKS_PSG\items_weapons_1e.db"; dst = "$PACKS_FR\armes_1e.db"; name = "Armes" },
    @{ src = "$PACKS_PSG\items_equipment_1e.db"; dst = "$PACKS_FR\equipement_1e.db"; name = "Équipement" },
    @{ src = "$PACKS_PSG\items_medical_care_1e.db"; dst = "$PACKS_FR\soins_medicaux_1e.db"; name = "Soins Médicaux" },
    @{ src = "$PACKS_PSG\items_patches_1e.db"; dst = "$PACKS_FR\ecussons_1e.db"; name = "Écussons" },
    @{ src = "$PACKS_PSG\items_trinkets_1e.db"; dst = "$PACKS_FR\bibelots_1e.db"; name = "Bibelots" },
    @{ src = "$PACKS_MOSH\items_maintenance_1e.db"; dst = "$PACKS_FR\maintenance_1e.db"; name = "Maintenance" },
    @{ src = "$PACKS_MOSH\conditions_1e.db"; dst = "$PACKS_FR\conditions_1e.db"; name = "Conditions" },
    @{ src = "$PACKS_MOSH\macros_hotbar_1e.db"; dst = "$PACKS_FR\macros_hotbar_1e.db"; name = "Macros Barre" },
    @{ src = "$PACKS_MOSH\macros_triggered_1e.db"; dst = "$PACKS_FR\macros_triggered_1e.db"; name = "Macros Déclenchées" },
    @{ src = "$PACKS_MOSH\rolltables_1e.db"; dst = "$PACKS_FR\tables_aleatoires_1e.db"; name = "Tables Aléatoires" }
)

$copiedCount = 0

try {
    foreach ($mapping in $mappings) {
        if (Test-Path $mapping.src) {
            Copy-Item $mapping.src $mapping.dst -Force
            Write-Host "Copie: $($mapping.name)" -ForegroundColor Green
            $copiedCount++
        } else {
            Write-Host "Source manquante: $($mapping.name) - $($mapping.src)" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    Write-Host "Reconstruction terminee! $copiedCount fichiers copies." -ForegroundColor Green
    Write-Host ""
    Write-Host "Etapes suivantes:" -ForegroundColor Yellow
    Write-Host "1. Demarrer FoundryVTT avec le systeme mothership-fr" -ForegroundColor White
    Write-Host "2. Executer les macros de traduction:" -ForegroundColor White
    Write-Host "   - macro_update_skills.js (PRIORITE: pour createur de personnage)" -ForegroundColor Cyan
    Write-Host "   - macro_update_equipment.js" -ForegroundColor White
    Write-Host "   - macro_update_patches.js" -ForegroundColor White
    Write-Host "   - macro_update_classes.js" -ForegroundColor White
    Write-Host "   - etc." -ForegroundColor White
    Write-Host "3. Tester le createur de personnage Greybearded QoL" -ForegroundColor White
    
} catch {
    Write-Host "Erreur lors de la reconstruction: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== FIN DE LA RECONSTRUCTION ===" -ForegroundColor Yellow