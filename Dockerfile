FROM python:3.12-slim

# Instalar dependencias del sistema para GeoDjango
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    python3-gdal \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app/

RUN pip install --no-cache-dir -r requirements.txt

# Comando para ejecutar la app (ajusta 'core' por el nombre de tu carpeta)
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:10000"]