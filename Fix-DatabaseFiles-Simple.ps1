# Script de Correction Automatique des DB - MOTHERSHIP-FR v1.0.15
# Applique directement les corrections aux fichiers .db

param(
    [string]$MotherShipFrPath = "e:\Foundry\MosH\MotherShip - Fr",
    [switch]$DryRun = $false
)

Write-Host "=== SCRIPT DE CORRECTION AUTOMATIQUE DES DB ===" -ForegroundColor Cyan
Write-Host "Version: MOTHERSHIP-FR v1.0.15" -ForegroundColor Green

if ($DryRun) {
    Write-Host "Mode: SIMULATION" -ForegroundColor Yellow
} else {
    Write-Host "Mode: CORRECTION REELLE" -ForegroundColor Yellow
}

Write-Host ""

$corrections = 0
$errors = 0

# Recherche des fichiers .db
Write-Host "Recherche des fichiers .db..." -ForegroundColor White
$dbFiles = Get-ChildItem -Path "$MotherShipFrPath\packs" -Filter "*.db" -File

if ($dbFiles.Count -eq 0) {
    Write-Host "ERREUR: Aucun fichier .db trouve" -ForegroundColor Red
    exit 1
}

Write-Host "Trouve $($dbFiles.Count) fichiers .db" -ForegroundColor Green
Write-Host ""

# Définir les corrections à appliquer
$replacements = @{
    # Correction des chemins d'images
    'systems/mosh/images/' = 'systems/mothership-fr/images/'
    
    # Correction des noms de fichiers d'images
    'panic_check_normal.png' = 'panic_check.png'
    'panic_check_android.png' = 'panic_check.png'
    
    # Correction des systemId
    '"systemId":"mosh"' = '"systemId":"mothership-fr"'
    
    # Correction des UUID compendium
    'Compendium.mosh.' = 'Compendium.mothership-fr.'
}

# Traiter chaque fichier .db
foreach ($dbFile in $dbFiles) {
    Write-Host "Traitement: $($dbFile.Name)" -ForegroundColor Cyan
    
    try {
        $content = Get-Content $dbFile.FullName -Raw -Encoding UTF8
        $originalContent = $content
        $fileChanges = 0
        
        # Appliquer chaque remplacement
        foreach ($replacement in $replacements.GetEnumerator()) {
            $oldValue = $replacement.Key
            $newValue = $replacement.Value
            
            if ($content.Contains($oldValue)) {
                $content = $content.Replace($oldValue, $newValue)
                $fileChanges++
                Write-Host "  -> Remplace: '$oldValue'" -ForegroundColor Yellow
            }
        }
        
        # Sauvegarder si des changements ont été faits
        if ($fileChanges -gt 0) {
            if (-not $DryRun) {
                # Créer un backup
                $backupPath = $dbFile.FullName + ".backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
                Copy-Item $dbFile.FullName $backupPath
                
                # Sauvegarder les corrections
                Set-Content $dbFile.FullName $content -Encoding UTF8 -NoNewline
                Write-Host "  OK: $fileChanges corrections appliquees" -ForegroundColor Green
            } else {
                Write-Host "  SIMULATION: $fileChanges corrections a appliquer" -ForegroundColor Yellow
            }
            $corrections += $fileChanges
        } else {
            Write-Host "  INFO: Aucune correction necessaire" -ForegroundColor Gray
        }
        
    } catch {
        Write-Host "  ERREUR: $($_.Exception.Message)" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""
Write-Host "=== RESUME DES OPERATIONS ===" -ForegroundColor Cyan
Write-Host "Corrections appliquees: $corrections" -ForegroundColor Green
Write-Host "Erreurs rencontrees: $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Green" })
Write-Host "Fichiers traites: $($dbFiles.Count)" -ForegroundColor White

if ($DryRun) {
    Write-Host ""
    Write-Host "POUR APPLIQUER LES CORRECTIONS REELLEMENT:" -ForegroundColor Yellow
    Write-Host "PowerShell -ExecutionPolicy Bypass -File ""$($PSCommandPath)""" -ForegroundColor White
}

if ($corrections -gt 0 -and -not $DryRun) {
    Write-Host ""
    Write-Host "CORRECTIONS TERMINEES AVEC SUCCES !" -ForegroundColor Green
    Write-Host "L'erreur 404 pour panic_check devrait etre resolue." -ForegroundColor Green
}

Write-Host ""