# Script PowerShell pour corriger tous les IDs "mosh" vers "mothership-fr"
# ATTENTION: Ce script modifie directement les fichiers !

$baseDir = "e:\Foundry\MosH\MotherShip - Fr"
$filesModified = 0
$totalReplacements = 0

Write-Host "🔧 Début de la correction massive des IDs système..." -ForegroundColor Yellow

# Fonction pour remplacer dans un fichier
function Replace-InFile {
    param(
        [string]$FilePath,
        [string]$OldText,
        [string]$NewText,
        [string]$Description
    )
    
    if (Test-Path $FilePath) {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        $originalContent = $content
        
        $content = $content -replace [regex]::Escape($OldText), $NewText
        
        if ($content -ne $originalContent) {
            Set-Content $FilePath -Value $content -Encoding UTF8 -NoNewline
            $replacements = ([regex]::Matches($originalContent, [regex]::Escape($OldText))).Count
            Write-Host "  ✅ $Description : $replacements remplacements dans $(Split-Path $FilePath -Leaf)" -ForegroundColor Green
            return $replacements
        }
    }
    return 0
}

# Fichiers à corriger
$filesToCorrect = @(
    "$baseDir\module\settings.js",
    "$baseDir\module\mothership-fr.js",
    "$baseDir\module\actor\actor.js"
)

Write-Host "`n📁 Correction des paramètres système..." -ForegroundColor Cyan

foreach ($file in $filesToCorrect) {
    if (Test-Path $file) {
        Write-Host "`n🔍 Traitement de: $(Split-Path $file -Leaf)" -ForegroundColor White
        
        # Corrections des settings
        $replacements = 0
        $replacements += Replace-InFile $file "game.settings.register('mosh'" "game.settings.register('mothership-fr'" "Enregistrement paramètres"
        $replacements += Replace-InFile $file "game.settings.get('mosh'" "game.settings.get('mothership-fr'" "Lecture paramètres"
        $replacements += Replace-InFile $file "game.settings.registerMenu('mosh'" "game.settings.registerMenu('mothership-fr'" "Menu paramètres"
        
        if ($replacements -gt 0) {
            $filesModified++
            $totalReplacements += $replacements
        }
    } else {
        Write-Host "  ⚠️ Fichier non trouvé: $file" -ForegroundColor Yellow
    }
}

# Correction spécifique du CSS
Write-Host "`n🎨 Correction des références CSS..." -ForegroundColor Cyan
$cssFile = "$baseDir\css\mothership-fr.css"
if (Test-Path $cssFile) {
    $replacements = Replace-InFile $cssFile "/systems/mosh/" "/systems/mothership-fr/" "Chemins CSS"
    if ($replacements -gt 0) {
        $filesModified++
        $totalReplacements += $replacements
    }
}

Write-Host "`n📊 RÉSUMÉ DES CORRECTIONS:" -ForegroundColor Magenta
Write-Host "  • Fichiers modifiés: $filesModified" -ForegroundColor White
Write-Host "  • Total remplacements: $totalReplacements" -ForegroundColor White

if ($totalReplacements -gt 0) {
    Write-Host "`n✅ Corrections terminées avec succès!" -ForegroundColor Green
    Write-Host "   Redémarrez FoundryVTT pour appliquer les changements." -ForegroundColor Yellow
} else {
    Write-Host "`n⚠️ Aucune correction nécessaire ou fichiers déjà corrects." -ForegroundColor Yellow
}

Write-Host "`n🔍 Pour vérifier les changements, utilisez:" -ForegroundColor Cyan
Write-Host "   git diff" -ForegroundColor Gray