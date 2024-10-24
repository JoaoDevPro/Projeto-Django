from django.contrib import admin # type: ignore
from .models import *

admin.site.register(Risco)
admin.site.register(Solucao)
admin.site.register(Usuario)
admin.site.register(Piloto)