from rest_framework import viewsets
from .models import Risco, Solucao
from .serializers import RiscoSerializer, SolucaoSerializer

class RiscoSerializerViewSet(viewsets.ModelViewSet):
    queryset = Risco.objects.all()
    serializer_class = RiscoSerializer

class SolucaoSerializerViewSet(viewsets.ModelViewSet):
    queryset = Solucao.objects.all()
    serializer_class = SolucaoSerializer
