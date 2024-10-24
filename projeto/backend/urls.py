from django.contrib import admin # type: ignore
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app_backend.urls')),  # Inclui as URLs do app 'app_backend'
    path('__debug__/', include('debug_toolbar.urls')),
]
