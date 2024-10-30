from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RiscoSerializerViewSet, SolucaoSerializerViewSet, login_view

router = DefaultRouter()
router.register(r'risco', RiscoSerializerViewSet)
router.register(r'solucao', SolucaoSerializerViewSet)



urlpatterns = [
    path('login/', login_view, name='login'),
    path('', include(router.urls)),
    
]
