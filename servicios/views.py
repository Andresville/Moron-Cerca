from rest_framework import viewsets
from .models import Establecimiento, Categoria
from .serializers import EstablecimientoSerializer, CategoriaSerializer

class EstablecimientoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint que permite ver los establecimientos de Morón.
    """
    queryset = Establecimiento.objects.all()
    serializer_class = EstablecimientoSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer