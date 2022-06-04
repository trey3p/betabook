from django.urls import include, path

accounts_urlpatterns = [
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.authtoken'))
]