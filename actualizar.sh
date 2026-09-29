#!/bin/bash

OUTPUT="notas-swifty.txt"
SCRIPT_NAME="$(basename "$0")"

{
	echo "========================================"
	echo "ESTRUCTURA DEL PROYECTO"
	echo "========================================"
	echo

	tree -I ".expo|android|node_modules|notas-swifty.txt|$SCRIPT_NAME"

	echo
	echo
	echo "========================================"
	echo "CONTENIDO DE LOS ARCHIVOS"
	echo "========================================"

	find . \
		-path "./.expo" -prune -o \
		-path "./android" -prune -o \
		-path "./node_modules" -prune -o \
		-path "./assets" -prune -o \
		-path "./.git" -prune -o \
		-type f \
		! -name "notas-swifty.txt" \
		! -name "README.md" \
		! -name "package-lock.json" \
		! -name "LICENSE" \
		! -name "AGENTS.md" \
		! -name "$SCRIPT_NAME" \
		-print |
	while read -r file; do

		echo
		echo "========================================"
		echo "ARCHIVO: $file"
		echo "========================================"
		echo

		cat "$file"

	done

} > "$OUTPUT"

echo "Archivo $OUTPUT generado correctamente."