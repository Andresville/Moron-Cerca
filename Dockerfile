FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app/
RUN pip install --no-cache-dir -r requirements.txt

#CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:10000"]


WORKDIR /app
COPY . /app/
RUN pip install --no-cache-dir -r requirements.txt

# Creamos un script de inicio para que corra la migración y luego el servidor
CMD python manage.py migrate && gunicorn core.wsgi:application --bind 0.0.0.0:10000