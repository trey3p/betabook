from django.urls import include, path
from .views import ActivateUser

accounts_urlpatterns = [
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.authtoken')),
    path('activate/<uid>/<token>', ActivateUser.as_view({'get': 'activation'}), name='activation'),
]