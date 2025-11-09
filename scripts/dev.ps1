param(
    [Parameter(Position = 0)]
    [string]$Command = "up",

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$Args
)

$docker = if ($env:COMPOSE_BIN) { $env:COMPOSE_BIN } else { "docker" }
$composeArgs = @("compose")

switch ($Command.ToLower()) {
    "up" {
        $composeArgs += @("up", "--build")
        if ($Args) { $composeArgs += $Args }
    }
    "down" {
        $composeArgs += @("down")
        if ($Args) { $composeArgs += $Args }
    }
    "logs" {
        $composeArgs += @("logs", "-f")
        if ($Args) { $composeArgs += $Args }
    }
    default {
        Write-Error "Usage: .\dev.ps1 [up|down|logs] [additional docker compose args]"
        exit 1
    }
}

& $docker @composeArgs
