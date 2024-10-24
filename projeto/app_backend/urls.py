from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RiscoSerializerViewSet, SolucaoSerializerViewSet

router = DefaultRouter()
router.register(r'risco', RiscoSerializerViewSet)
router.register(r'solucao', SolucaoSerializerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
