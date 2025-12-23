from rest_framework import serializers
from .models import Establecimiento, Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class EstablecimientoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')
    categoria_icono = serializers.ReadOnlyField(source='categoria.icono')
    # Creamos campos personalizados para las coordenadas
    latitud = serializers.SerializerMethodField()
    longitud = serializers.SerializerMethodField()

    class Meta:
        model = Establecimiento
        fields = [
            'id', 'nombre', 'categoria', 'categoria_nombre', 'categoria_icono',
            'direccion', 'descripcion', 'website', 'telefono', 'horario', 'latitud', 'longitud'
        ]

    def get_latitud(self, obj):
        if obj.ubicacion:
            return obj.ubicacion.y
        return None

    def get_longitud(self, obj):
        if obj.ubicacion:
            return obj.ubicacion.x
        return None