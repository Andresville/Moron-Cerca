#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar librerías del sistema necesarias para GeoDjango
# Usamos apt-get para instalar las dependencias de mapas en Render
if [ "$RENDER" ]; then
  apt-get update && apt-get install -y binutils libproj-dev gdal-bin
fi

# Instalar dependencias de Python
pip install -r requirements.txt

# Recolectar estáticos y migrar
python manage.py collectstatic --no-input
python manage.py migrate