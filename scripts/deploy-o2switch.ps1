# Deploy XR Agency on o2switch through the cPanel UAPI (Git Version Control).
# Credentials are read from .o2switch-token (git-ignored), format:
#   HOST=xxxx.o2switch.net
#   USER=puzo3938
#   TOKEN=XXXXXXXXXXXXXXXXXXXXXXXX
param(
  [string]$CredFile = (Join-Path $PSScriptRoot "..\.o2switch-token"),
  [string]$Branch = "main"
)
$ErrorActionPreference = "Stop"

if (-not (Test-Path $CredFile)) { throw "Fichier d'identifiants introuvable : $CredFile" }
$cfg = @{}
Get-Content $CredFile | Where-Object { $_ -match '^\s*([A-Z]+)\s*=\s*(.+?)\s*$' } | ForEach-Object { $cfg[$Matches[1]] = $Matches[2] }
foreach ($k in "HOST", "USER", "TOKEN") { if (-not $cfg[$k]) { throw "Valeur $k manquante dans $CredFile" } }

$base = "https://$($cfg.HOST):2083/execute"
$headers = @{ Authorization = "cpanel $($cfg.USER):$($cfg.TOKEN)" }
$repo = "/home/$($cfg.USER)/repositories/xragency"

function Invoke-Uapi([string]$Path, [hashtable]$Query) {
  $qs = ($Query.GetEnumerator() | ForEach-Object { "$($_.Key)=$([uri]::EscapeDataString([string]$_.Value))" }) -join "&"
  $res = Invoke-RestMethod -Uri "$base/$Path`?$qs" -Headers $headers -Method Get
  if ($res.status -ne 1) { throw "UAPI $Path a échoué : $($res.errors -join '; ')" }
  return $res.data
}

Write-Host "[1/3] Récupération de origin/$Branch sur o2switch..."
Invoke-Uapi "VersionControl/update" @{ repository_root = $repo; branch = $Branch } | Out-Null

Write-Host "[2/3] Lancement du déploiement (.cpanel.yml)..."
$dep = Invoke-Uapi "VersionControlDeployment/create" @{ repository_root = $repo }
$id = $dep.deploy_id
Write-Host "      deploy_id = $id"

Write-Host "[3/3] Suivi du build..."
for ($i = 0; $i -lt 90; $i++) {
  Start-Sleep -Seconds 10
  $all = Invoke-Uapi "VersionControlDeployment/retrieve" @{}
  $d = $all | Where-Object { $_.deploy_id -eq $id }
  $t = $d.timestamps
  if ($t.failed) { Write-Host "ÉCHEC du déploiement. Journal : $($d.log_path)"; exit 1 }
  if ($t.succeeded) { Write-Host "Déploiement réussi ($($d.sha))."; exit 0 }
  Write-Host "      en cours... ($((($i + 1) * 10)) s)"
}
Write-Host "Délai dépassé ; vérifier dans cPanel > Git Version Control."
exit 1
