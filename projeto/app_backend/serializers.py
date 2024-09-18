from rest_framework import serializers
from .models import Risco, Solucao, Piloto, item

class RiscoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Risco
        fields = '__all__'

class SolucaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solucao
        fields = '__all__'
        