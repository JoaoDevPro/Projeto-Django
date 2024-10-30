from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import Risco, Solucao, Usuario
from .serializers import RiscoSerializer, SolucaoSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class RiscoSerializerViewSet(viewsets.ModelViewSet):
    queryset = Risco.objects.all()
    serializer_class = RiscoSerializer

class SolucaoSerializerViewSet(viewsets.ModelViewSet):
    queryset = Solucao.objects.all()
    serializer_class = SolucaoSerializer

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = Usuario.objects.get(email=email)
        if check_password(password, user.password):
            return Response({'status': 'success', 'message': 'Login successful'})
        else:
            return Response({'status': 'error', 'message': 'Invalid password'})
    except Usuario.DoesNotExist:
        return Response({'status': 'error', 'message': 'User does not exist'})




