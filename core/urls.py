from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from servicios.views import EstablecimientoViewSet, CategoriaViewSet

router = DefaultRouter()
router.register(r'establecimientos', EstablecimientoViewSet)
router.register(r'categorias', CategoriaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]