# PowerShell 7 / Windows PowerShell E2E Test Execution Script
# Usage:
#   .\run_e2e_tests.ps1                     # Auto progressive mode
#   .\run_e2e_tests.ps1 -SelfTest           # Full oracle self-test (all tiers 100%)
#   .\run_e2e_tests.ps1 -Milestone M1       # Milestone M1 validation
#   .\run_e2e_tests.ps1 -Tier 1             # Tier 1 only

param (
    [switch]$SelfTest,
    [string]$Milestone = "",
    [string]$Tier = "all",
    [string]$Target = ""
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent (Split-Path -Parent $scriptDir)

$venvPy = Join-Path $projectRoot ".venv\Scripts\python.exe"
$pyExe = if (Test-Path $venvPy) { $venvPy } else { "python" }

Push-Location $projectRoot
try {
    $cmdArgs = @("tests/e2e/runner.py")
    if ($SelfTest) {
        $cmdArgs += "--self-test"
    }
    if ($Milestone) {
        $cmdArgs += @("--milestone", $Milestone)
    }
    if ($Tier -ne "all") {
        $cmdArgs += @("--tier", $Tier)
    }
    if ($Target) {
        $cmdArgs += @("--target", $Target)
    }

    Write-Host "[E2E] Executing: $pyExe $($cmdArgs -join ' ')" -ForegroundColor Cyan
    & $pyExe @cmdArgs
    $exitCode = $LASTEXITCODE
    if ($exitCode -eq 0) {
        Write-Host "`n[E2E] All tests succeeded with exit code 0." -ForegroundColor Green
    } else {
        Write-Host "`n[E2E] Test suite returned exit code $exitCode." -ForegroundColor Red
    }
    exit $exitCode
}
finally {
    Pop-Location
}
