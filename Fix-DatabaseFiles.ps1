# Script de Correction Automatique des DB - MOTHERSHIP-FR v1.0.15
# Applique directement les traductions et corrections aux fichiers .db

param(
    [string]$MotherShipFrPath = "e:\Foundry\MosH\MotherShip - Fr",
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

Write-Host "SCRIPT DE CORRECTION AUTOMATIQUE DES DB" -ForegroundColor Cyan
Write-Host "Version: MOTHERSHIP-FR v1.0.15" -ForegroundColor Green
if ($DryRun) {
    Write-Host "Mode: SIMULATION" -ForegroundColor Yellow
} else {
    Write-Host "Mode: CORRECTION REELLE" -ForegroundColor Yellow
}
Write-Host ""

$corrections = 0
$errors = 0

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $color = switch ($Level) {
        "ERROR" { "Red" }
        "WARN" { "Yellow" }
        "SUCCESS" { "Green" }
        default { "White" }
    }
    Write-Host "[$Level] $Message" -ForegroundColor $color
}

function Apply-DBCorrections {
    param(
        [string]$FilePath,
        [hashtable]$Replacements
    )
    
    try {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        $originalContent = $content
        
        $lineChanges = 0
        foreach ($replacement in $Replacements.GetEnumerator()) {
            $oldValue = $replacement.Key
            $newValue = $replacement.Value
            
            if ($content.Contains($oldValue)) {
                $content = $content.Replace($oldValue, $newValue)
                $lineChanges++
                if ($Verbose) {
                    Write-Log "  ✓ Remplacé: '$oldValue' -> '$newValue'" "SUCCESS"
                }
            }
        }
        
        if ($lineChanges -gt 0 -and -not $DryRun) {
            # Backup avant modification
            $backupPath = $FilePath + ".backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
            Copy-Item $FilePath $backupPath
            
            # Appliquer les corrections
            Set-Content $FilePath $content -Encoding UTF8 -NoNewline
            Write-Log "OK $lineChanges corrections appliquees a $(Split-Path $FilePath -Leaf)" "SUCCESS"
            return $lineChanges
        } elseif ($lineChanges -gt 0) {
            Write-Log "SIMULATION $lineChanges corrections a appliquer a $(Split-Path $FilePath -Leaf)" "WARN"
            return $lineChanges
        } else {
            Write-Log "INFO Aucune correction necessaire pour $(Split-Path $FilePath -Leaf)" "INFO"
            return 0
        }
    } catch {
        Write-Log "ERREUR lors du traitement de $FilePath : $($_.Exception.Message)" "ERROR"
        return -1
    }
}

# CORRECTIONS PRINCIPALES

Write-Log "Recherche des fichiers .db..."
$dbFiles = Get-ChildItem -Path "$MotherShipFrPath\packs" -Filter "*.db" -File

if ($dbFiles.Count -eq 0) {
    Write-Log "ERREUR Aucun fichier .db trouve dans $MotherShipFrPath\packs" "ERROR"
    exit 1
}

Write-Log "Trouve $($dbFiles.Count) fichiers .db a traiter"
Write-Log ""

# 1. CORRECTION DES IMAGES

Write-Log "Phase 1: Correction des chemins d'images" "INFO"

$imageCorrections = @{
    # Correction du chemin système
    'systems/mosh/images/' = 'systems/mothership-fr/images/'
    
    # Corrections spécifiques des noms de fichiers
    'panic_check_normal.png' = 'panic_check.png'
    'panic_check_android.png' = 'panic_check.png'  # Uniforme pour tous
}

foreach ($dbFile in $dbFiles) {
    Write-Log "🔧 Traitement: $($dbFile.Name)"
    $result = Apply-DBCorrections -FilePath $dbFile.FullName -Replacements $imageCorrections
    if ($result -gt 0) { $corrections += $result }
    elseif ($result -eq -1) { $errors++ }
}

Write-Log ""

# ==========================================
# 2. CORRECTION DES SYSTEMID
# ==========================================

Write-Log "🆔 Phase 2: Correction des systemId" "INFO"

$systemIdCorrections = @{
    '"systemId":"mosh"' = '"systemId":"mothership-fr"'
}

foreach ($dbFile in $dbFiles) {
    Write-Log "🔧 Traitement: $($dbFile.Name)"
    $result = Apply-DBCorrections -FilePath $dbFile.FullName -Replacements $systemIdCorrections
    if ($result -gt 0) { $corrections += $result }
    elseif ($result -eq -1) { $errors++ }
}

Write-Log ""

# ==========================================
# 3. CORRECTIONS UUID COMPENDIUM
# ==========================================

Write-Log "🔗 Phase 3: Correction des UUID de compendiums" "INFO"

$uuidCorrections = @{
    'Compendium.mosh.' = 'Compendium.mothership-fr.'
}

foreach ($dbFile in $dbFiles) {
    Write-Log "🔧 Traitement: $($dbFile.Name)"
    $result = Apply-DBCorrections -FilePath $dbFile.FullName -Replacements $uuidCorrections
    if ($result -gt 0) { $corrections += $result }
    elseif ($result -eq -1) { $errors++ }
}

Write-Log ""

# ==========================================
# 4. TRADUCTIONS SPÉCIFIQUES TABLES
# ==========================================

Write-Log "🔄 Phase 4: Traductions spécifiques des tables" "INFO"

# Seulement pour le fichier des tables aléatoires
$tablesFile = $dbFiles | Where-Object { $_.Name -eq "tables_aleatoires_1e.db" }

if ($tablesFile) {
    $tableTranslations = @{
        # Tables principales (déjà traduites dans les noms, mais pour les descriptions)
        'Panic Check' = 'Test de Panique'
        'Death Save' = 'Sauvegarde de Mort'
        'Wound Check' = 'Test de Blessure'
        
        # Termes dans les descriptions
        'When a character gains more Stress than they can handle' = 'Quand un personnage acquiert plus de Stress qu''il n''en peut supporter'
        'Roll 1d10, add your current Stress' = 'Lancez 1d10, ajoutez votre Stress actuel'
        'If the result is higher than your Maximum Health' = 'Si le résultat est supérieur à votre Santé Maximale'
        'you panic and perform the corresponding action' = 'vous paniquez et effectuez l''action correspondante'
        'After performing the action, reduce your Stress by 1d10' = 'Après avoir effectué l''action, réduisez votre Stress de 1d10'
    }
    
    Write-Log "🔧 Traitement spécial: $($tablesFile.Name)"
    $result = Apply-DBCorrections -FilePath $tablesFile.FullName -Replacements $tableTranslations
    if ($result -gt 0) { $corrections += $result }
    elseif ($result -eq -1) { $errors++ }
}

Write-Log ""

# ==========================================
# RÉSUMÉ FINAL
# ==========================================

Write-Log "📊 RÉSUMÉ DES OPÉRATIONS" "INFO"
Write-Log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Log "✅ Corrections appliquées: $corrections" "SUCCESS"
Write-Log "❌ Erreurs rencontrées: $errors" $(if ($errors -gt 0) { "ERROR" } else { "SUCCESS" })
Write-Log "📁 Fichiers traités: $($dbFiles.Count)"
Write-Log "🎯 Mode: $($DryRun ? 'SIMULATION' : 'PRODUCTION')" $(if ($DryRun) { "WARN" } else { "SUCCESS" })

if ($DryRun) {
    Write-Log ""
    Write-Log "🔥 POUR APPLIQUER LES CORRECTIONS RÉELLEMENT:" "WARN"
    Write-Log "PowerShell -ExecutionPolicy Bypass -File ""$($PSCommandPath)""" "INFO"
    Write-Log ""
}

if ($corrections -gt 0 -and -not $DryRun) {
    Write-Log ""
    Write-Log "🎉 CORRECTIONS TERMINÉES AVEC SUCCÈS !" "SUCCESS"
    Write-Log "Les fichiers .db ont été mis à jour avec les chemins corrects." "SUCCESS"
    Write-Log "L'erreur 404 pour panic_check devrait être résolue." "SUCCESS"
} elseif ($corrections -eq 0) {
    Write-Log ""
    Write-Log "ℹ️ Aucune correction n'était nécessaire." "INFO"
    Write-Log "Les fichiers .db sont déjà à jour." "INFO"
}

exit $(if ($errors -gt 0) { 1 } else { 0 })