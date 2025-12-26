#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar librerías del sistema para GeoDjango
# Render permite instalar paquetes de apt-get mediante este comando
pip install -r requirements.txt

# Recolectar archivos estáticos
python manage.py collectstatic --no-input

# Ejecutar migraciones
python manage.py migrate