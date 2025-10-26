#!/usr/bin/env bash
set -euo pipefail

COMPOSE_BIN=${COMPOSE_BIN:-docker}

command="${1:-up}"
shift || true

case "$command" in
  up)
    "$COMPOSE_BIN" compose up --build "$@"
    ;;
  down)
    "$COMPOSE_BIN" compose down "$@"
    ;;
  logs)
    "$COMPOSE_BIN" compose logs -f "$@"
    ;;
  *)
    echo "Usage: $0 [up|down|logs] [additional docker compose args]" >&2
    exit 1
    ;;
esac
