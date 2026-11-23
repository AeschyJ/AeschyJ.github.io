[CmdletBinding()]
param (
    [Parameter(Position = 0)]
    [string]$Command = "",
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$ExtraArgs
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Port = if ([string]::IsNullOrWhiteSpace($env:PORT)) { 5173 } else { [int]$env:PORT }
$env:PORT = "$Port"
Set-Location $ProjectRoot

function Get-PythonExe {
    $venvPy = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
    if (Test-Path $venvPy) { return $venvPy }
    $cmd = Get-Command python -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    throw "找不到可用的 Python 執行環境，請先安裝 Python 或建立 .venv。"
}

function Invoke-Preview {
    $pyExe = Get-PythonExe
    Write-Host "[PREVIEW] 啟動本地預覽伺服器 (http://localhost:$Port)" -ForegroundColor Cyan
    & $pyExe (Join-Path $PSScriptRoot "preview_server.py") --port "$Port" @($ExtraArgs)
    exit $LASTEXITCODE
}

function Invoke-Deploy {
    $pyExe = Get-PythonExe
    [string[]]$argsList = if ($ExtraArgs -and $ExtraArgs.Count -gt 0) { @($ExtraArgs) } else { @("--menu") }
    Write-Host "[DEPLOY] 啟動智慧發布與防呆管線..." -ForegroundColor Cyan
    & $pyExe (Join-Path $PSScriptRoot "deploy.py") @argsList
    exit $LASTEXITCODE
}

function Invoke-Test {
    $pyExe = Get-PythonExe
    Write-Host "[TEST] 執行 4-Tier 離線 E2E 測試套件..." -ForegroundColor Cyan
    & $pyExe (Join-Path $ProjectRoot "tests\e2e\runner.py") @($ExtraArgs)
    exit $LASTEXITCODE
}

function Invoke-Push {
    $branch = (& git branch --show-current).Trim()
    Write-Host "[GIT] 當前分支: $branch" -ForegroundColor Cyan
    & git status -s
    $ans = Read-Host "確認將目前分支 '$branch' 推送至 origin？(y/N)"
    if ($ans -notin @("y", "Y", "yes", "YES")) {
        Write-Host "[CANCEL] 已取消推送。" -ForegroundColor Yellow
        return
    }
    & git push -u origin $branch
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host "[SUCCESS] 已推送至 origin/$branch。" -ForegroundColor Green
}

if ([string]::IsNullOrWhiteSpace($Command) -or $Command.ToLowerInvariant() -eq "menu") {
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "  AESCHY Github Page 控制中心 (Port: $Port)" -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "  [1] preview - 啟動本地預覽伺服器"
    Write-Host "  [2] deploy  - 啟動智慧同步與防呆發布管線"
    Write-Host "  [3] test    - 執行 4-Tier E2E 測試套件"
    Write-Host "  [4] push    - 檢查 Git 狀態並推送至遠端分支"
    Write-Host "  [0] exit    - 離開"
    Write-Host "--------------------------------------------------"
    $choice = (Read-Host "請選擇執行項目 [1-4, 0]").Trim()
    switch ($choice) {
        "1" { $Command = "preview" }
        "2" { $Command = "deploy" }
        "3" { $Command = "test" }
        "4" { $Command = "push" }
        "0" { exit 0 }
        default { Write-Host "[WARN] 無效選項。" -ForegroundColor Yellow; exit 1 }
    }
}

switch ($Command.ToLowerInvariant()) {
    "preview" { Invoke-Preview }
    "deploy"  { Invoke-Deploy }
    "test"    { Invoke-Test }
    "push"    { Invoke-Push }
    default {
        Write-Host "[ERROR] 未知子命令: $Command" -ForegroundColor Red
        Write-Host "用法: run.bat [preview | deploy | test | push]"
        exit 1
    }
}
