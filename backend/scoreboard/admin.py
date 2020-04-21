from django.contrib import admin

# Register your models here.
from .models import Score

class ScoreAdmin(admin.ModelAdmin):
  list_display = ('title', 'text')

admin.site.register(Score, ScoreAdmin)
