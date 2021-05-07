from django.core.exceptions import ValidationError
from django.http import JsonResponse
from .models import BlackListToken


class CheckTokenExists:
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]

		try:
			count = BlackListToken.objects.filter(token=token).count()
			if count > 0:
				print(count)
				return JsonResponse({"error": "User is logged Out"}, status=401)
		except ValidationError as v:
			print("ValidationError", v)
		response = self.get_response(request)
		return response