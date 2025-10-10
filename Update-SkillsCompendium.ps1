# =============================================================================
# SCRIPT POWERSHELL : MISE À JOUR COMPENDIUM COMPÉTENCES (MOTHERSHIP-FR)
# =============================================================================
# Ce script PowerShell met à jour directement le fichier .db des compétences
# sans nécessiter Node.js ou l'interface FoundryVTT
# =============================================================================

# Configuration des chemins
$MOTHERSHIP_FR_PATH = "E:\Foundry\MosH\MotherShip - Fr"
$SKILLS_DB_PATH = Join-Path $MOTHERSHIP_FR_PATH "packs\competences_1e.db"

# Vérifier que le fichier existe
if (-not (Test-Path $SKILLS_DB_PATH)) {
    Write-Host "Fichier de base de donnees introuvable: $SKILLS_DB_PATH" -ForegroundColor Red
    exit 1
}

Write-Host "=== MISE A JOUR AUTOMATIQUE DES COMPETENCES ===" -ForegroundColor Yellow
Write-Host "Systeme: Mothership - Francais" -ForegroundColor Cyan
Write-Host "Compendium: competences_1e" -ForegroundColor Cyan
Write-Host "Fichier: $SKILLS_DB_PATH" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Yellow

# Définition des mises à jour de compétences
$skillUpdates = @{
    # Compétences niveau trained (Entraîné)
    "41CEH7dOvmTaywpD" = @{ name = "Athlétisme"; rank = "trained" }
    "9HXXuZ6w5eKHL3Jj" = @{ name = "Théologie"; rank = "trained" }
    "9vkt2RBybSeuHoQQ" = @{ name = "Connaissances de la Bordure"; rank = "trained" }
    "DRrQqYVtBTo0n8ck" = @{ name = "Zoologie"; rank = "trained" }
    "JPeKPvButXFey4Xa" = @{ name = "Mathématiques"; rank = "trained" }
    "Lv4musH6UKdLnkFB" = @{ name = "Linguistique"; rank = "trained" }
    "NBA4JiYlWEnFCS3U" = @{ name = "Chimie"; rank = "trained" }
    "Ne7SnktJvl8bFQ3n" = @{ name = "Botanique"; rank = "trained" }
    "WMleBDM9wAHUeoMF" = @{ name = "Entrainement Militaire"; rank = "trained" }
    "WRGCkrN7TLSvW9Ls" = @{ name = "Bricolage"; rank = "trained" }
    "e1rHSbZrEDFkjizS" = @{ name = "Equipement Industriel"; rank = "trained" }
    "erO6jxrvrF94Fl3g" = @{ name = "Gravite Zero"; rank = "trained" }
    "kOp8yDKXROLGJdXn" = @{ name = "Geologie"; rank = "trained" }
    "pnZV0jHWBVRyJF1a" = @{ name = "Art"; rank = "trained" }
    "pxTk3Y9SDe0lU85j" = @{ name = "Informatique"; rank = "trained" }
    "dBFIkAjhUGBCgGW6" = @{ name = "Archeologie"; rank = "trained" }
    
    # Compétences niveau expert
    "30dSaZxJc40A9V5r" = @{ name = "Combat Rapproche"; rank = "expert" }
    "8bncFeOgoLIResHT" = @{ name = "Survie en Milieu Hostile"; rank = "expert" }
    "ACtRFMZC05EnUSce" = @{ name = "Explosifs"; rank = "expert" }
    "FodSmRGfd91z0BPX" = @{ name = "Mysticisme"; rank = "expert" }
    "IGZESnwyiXIfBQJK" = @{ name = "Physique"; rank = "expert" }
    "Iabhy0eVM1J4qC9C" = @{ name = "Pharmacologie"; rank = "expert" }
    "PGTfaLeKzqiNZhMk" = @{ name = "Psychologie"; rank = "expert" }
    "YqTFuG2lBWV4HlRC" = @{ name = "Medecine de Terrain"; rank = "expert" }
    "beqj8DhIE1dd3Br6" = @{ name = "Pilotage"; rank = "expert" }
    "fDT6QUy4Y6ti35uk" = @{ name = "Ecologie"; rank = "expert" }
    "rUu3BXzcG5NsUSCD" = @{ name = "Reparation Mecanique"; rank = "expert" }
    "sFLDbIg8KWWGnnio" = @{ name = "Piratage"; rank = "expert" }
    "smUuZPeixvfz8wyu" = @{ name = "Pathologie"; rank = "expert" }
    "vNa4htmpXawfccpN" = @{ name = "Armes a Feu"; rank = "expert" }
    "2uTOrNHnq9KhPXxD" = @{ name = "Extraction d'Asteroides"; rank = "expert" }
    
    # Compétences niveau master (Maître)
    "6nj5wEZ8JPTCu4DQ" = @{ name = "Robotique"; rank = "master" }
    "8y8KM5kWuwDhDh1B" = @{ name = "Hyperspace"; rank = "master" }
    "Wu1j9XsVNjRW7OlM" = @{ name = "Ingénierie"; rank = "master" }
    "jG56DvDHbRzej0Mk" = @{ name = "Exobiologie"; rank = "master" }
    "ktwDDlbvtcXAIsK8" = @{ name = "Xenoesoterisme"; rank = "master" }
    "lYEj5y8Kwkvumch3" = @{ name = "Cybernetique"; rank = "master" }
    "vPix42QJFXpsDmj7" = @{ name = "Commandement"; rank = "master" }
    "wcfanyJg5S9NNklg" = @{ name = "Planetologie"; rank = "master" }
    "xvdvk1oi8J9XLwtY" = @{ name = "Sophontologie"; rank = "master" }
    "0S9nEmPykEYGLhYw" = @{ name = "Intelligence Artificielle"; rank = "master" }
}

try {
    Write-Host "Lecture du fichier de base de donnees..." -ForegroundColor Cyan
    
    # Lire le contenu du fichier
    $content = Get-Content $SKILLS_DB_PATH -Raw -Encoding UTF8
    $lines = $content -split "`n"
    
    $updatedLines = @()
    $updatedCount = 0
    
    foreach ($line in $lines) {
        if ([string]::IsNullOrWhiteSpace($line)) {
            $updatedLines += $line
            continue
        }
        
        try {
            # Essayer de parser la ligne comme JSON
            $item = $line | ConvertFrom-Json
            
            # Chercher si cette compétence doit être mise à jour
            if ($skillUpdates.ContainsKey($item._id) -and $item.type -eq "skill") {
                $update = $skillUpdates[$item._id]
                
                # Mettre à jour les champs
                $item.name = $update.name
                $item.system.rank = $update.rank
                
                Write-Host "Mise a jour: $($update.name) -> $($update.rank)" -ForegroundColor Green
                $updatedCount++
            }
            
            $updatedLines += ($item | ConvertTo-Json -Compress -Depth 10)
        }
        catch {
            # Ligne non-JSON, la garder telle quelle
            $updatedLines += $line
        }
    }
    
    # Écrire le fichier mis à jour
    $updatedContent = $updatedLines -join "`n"
    Set-Content -Path $SKILLS_DB_PATH -Value $updatedContent -Encoding UTF8
    
    Write-Host ""
    Write-Host "Mise a jour terminee! $updatedCount competences mises a jour." -ForegroundColor Green
    Write-Host "Fichier mis a jour: competences_1e.db" -ForegroundColor Green
    Write-Host ""
    Write-Host "Les competences devraient maintenant apparaitre correctement dans le createur de personnage!" -ForegroundColor Green
    Write-Host "   - Rangs systeme: trained/expert/master (anglais)" -ForegroundColor Yellow
    Write-Host "   - Affichage: Entraine/Expert/Maitre (francais)" -ForegroundColor Yellow
    
}
catch {
    Write-Host "Erreur lors de la mise a jour: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== FIN DE LA MISE A JOUR ===" -ForegroundColor Yellow