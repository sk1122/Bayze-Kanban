from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from .views import *

urlpatterns = [
	path('register/', UserRegistrationView.as_view(), name="signup"),
	path('login/', UserLoginView.as_view(), name="login"),
	path('login/refresh/', refresh_jwt_token, name='token_refresh'),
	path('login/verify/', verify_jwt_token, name='token_verify'),
	path('logout/', UserLogoutView.as_view(), name="logout"),
]