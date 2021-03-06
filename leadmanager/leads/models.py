from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="leads", on_delete=models.CASCADE, null=True)
    attachment = models.FileField(upload_to=f'{settings.MEDIA_ROOT}/uploads/leads/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)