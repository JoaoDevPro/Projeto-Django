from django.urls import path, include
#from .views import RiscoListView, SolucaoListView
from .views import RiscoSerializerViewSet , SolucaoSerializerViewSet
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls

router = DefaultRouter()
router.register(r'risco', RiscoSerializerViewSet)
router.register(r'solucao', SolucaoSerializerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
