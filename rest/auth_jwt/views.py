from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import *

class UserRegistrationView(CreateAPIView):
	serializer_class = UserRegistrationSerializer
	permission_classes = (AllowAny, )

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			serializer.save()
			status_code = status.HTTP_201_CREATED
			response = {
				'success': 'True',
				'status': status_code,
				'message': 'User Created Successfully'
			}

			return Response(response, status=status_code)
		return Response({"error": serializer.errors}, status.HTTP_400_BAD_REQUEST)


class UserLoginView(RetrieveAPIView):

	serializer_class = UserLoginSerializer
	permission_classes = (AllowAny,)

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		print(request.data)
		if serializer.is_valid():
			response = {
				'success' : 'True',
				'status code' : status.HTTP_200_OK,
				'message': 'User logged in  successfully',
				'token' : serializer.data['token'],
			}
			status_code = status.HTTP_200_OK

			return Response(response, status=status_code)
		return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):

	serializer_class = UserLogoutSerializer
	permission_classes = (IsAuthenticated, )

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			serializer.save(user=request.user)
			response = {
				'success': True,
				'status_code': status.HTTP_200_OK,
				'message': 'Logout Successful'
			}

			return Response(response, status=status.HTTP_200_OK)
		return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)