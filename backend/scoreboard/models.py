from django.db import models

# Create your models here.
class Score(models.Model):
  title = models.TextField()
  text = ''

  def _str_(self):
    return self.title
