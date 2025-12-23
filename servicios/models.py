from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from geopy.geocoders import Nominatim 

class Categoria(models.Model):
    # Definimos las opciones de iconos
    ICON_CHOICES = [
        ('fa-school', 'Escuela'),
        ('fa-hospital', 'Centro de Salud'),
        ('fa-pills', 'Farmacia'),
        ('fa-key', 'Cerrajería'),
        ('fa-store', 'Comercio'),
        ('fa-utensils', 'Gastronomía'),
        ('fa-dumbbell', 'Deporte/Gimnasio'),
        ('fa-landmark', 'Municipalidad'),
        ('fa-fire', 'Bomberos'),
        ('fa-shield-alt', 'Policía'),
        ('fa-trees', 'Parque/Espacio Verde'),
        ('fa-library', 'Biblioteca'),
    ]

    nombre = models.CharField(max_length=100)
    icono = models.CharField(
        max_length=50, 
        choices=ICON_CHOICES,
        default='fa-map-marker-alt',
        help_text="Seleccione un icono de FontAwesome"
    )

    def __str__(self):
        return self.nombre

class Establecimiento(models.Model):
    nombre = models.CharField(max_length=200)
    # Usamos el nombre de la clase entre comillas para mayor seguridad
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE)
    direccion = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    horario = models.CharField(max_length=100, blank=True)
    ubicacion = models.PointField(srid=4326, blank=True, null=True)
    website = models.URLField(blank=True)

    def save(self, *args, **kwargs):
        # Geocodificación automática
        full_address = f"{self.direccion}, Moron, Buenos Aires, Argentina"
        try:
            geolocator = Nominatim(user_agent="moron_cerca_app")
            location = geolocator.geocode(full_address)
            if location:
                self.ubicacion = Point(location.longitude, location.latitude)
        except Exception as e:
            print(f"Error al geocodificar: {e}")
            
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre