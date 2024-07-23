from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # The prefixes of all API endpoints that the WSGI application serves.
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('user_app.urls')),
    path('api/v1/lists/', include('list_app.urls')),
    path('api/v1/airports/', include('airport_app.urls')),
    path('api/v1/named-locations/', include('named_locations_app.urls')),
    path('api/v1/flights/', include('flight_app.urls')),
    path('api/v1/coordinates/', include('coordinate_app.urls')),
    path('api/v1/metars/', include('metar_app.urls')),
    path('api/v1/tafs/', include('taf_app.urls'))
]
