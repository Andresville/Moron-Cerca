#!/usr/bin/env bash
# exit on error
set -o errexit

# Solo instalamos dependencias de Python
pip install -r requirements.txt

# Recolectar estáticos
python manage.py collectstatic --no-input

# Las migraciones las haremos manualmente después para evitar bloqueos
# python manage.py migrate