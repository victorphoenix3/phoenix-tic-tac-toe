from django.shortcuts import render

from rest_framework import viewsets
from .serializers import ScoreSerializer
from .models import Score

# Create your views here.
class ScoreView(viewsets.ModelViewSet):
  serializer_class = ScoreSerializer
  queryset = Score.objects.all()
