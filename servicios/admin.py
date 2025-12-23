from django.contrib.gis import admin
from .models import Categoria, Establecimiento

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'icono')

@admin.register(Establecimiento)
class EstablecimientoAdmin(admin.GISModelAdmin):
    # Forzamos el motor de OpenStreetMap
    gis_widget = admin.GISModelAdmin.gis_widget
    
    # Configuramos los parámetros directamente en el diccionario del widget
    gis_widget_kwargs = {
        'attrs': {
            'default_lon': -58.6225,
            'default_lat': -34.6510,
            'default_zoom': 15,
        }
    }
    
    list_display = ('nombre', 'categoria', 'direccion')
    search_fields = ('nombre',)