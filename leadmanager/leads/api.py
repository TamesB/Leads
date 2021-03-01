from leads.models import Lead
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, JSONParser
from .serializers import LeadSerializer

# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LeadSerializer
    parser_classes = (MultiPartParser, JSONParser)

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)