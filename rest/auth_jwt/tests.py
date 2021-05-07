from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from rest_framework_jwt.settings import api_settings

from .models import User

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
# Create your tests here.


class LoginTestCase(APITestCase):
	def test_login(self):
		url = reverse('login')
		u = User.objects.create_user(email='user@foo.com', password='pass')
		u.is_active = False
		u.save()

		resp = self.client.post(url, {'email':'user@foo.com', 'password':'pass'}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_200_OK)

		u.is_active = True
		u.save()

		resp = self.client.post(url, {'email':'user@foo.com', 'password':'pass'}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_200_OK)
		print(resp.data)
		self.assertTrue('token' in resp.data)
		token = resp.data['token']
		#print(token)

		verification_url = reverse('token_verify')
		resp = self.client.post(verification_url, {'token': token}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_200_OK)

		resp = self.client.post(verification_url, {'token': 'abc'}, format='json')
		self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

		client = APIClient()
		client.credentials(HTTP_AUTHORIZATION='Bearer ' + 'abc')
		resp = client.get('/api/get/', data={'format': 'json'})
		self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
		client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
		resp = client.get('/api/get/', data={'format': 'json'})
		self.assertEqual(resp.status_code, status.HTTP_200_OK)