from django.core.exceptions import ValidationError
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

class VerifyTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_request(self, request, response):
        print(request.META.get('HTTP_AUTHORIZATION', " "))
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        data = {
        	'token': token
        }

        try:
        	valid_data = VerifyJSONWebTokenSerializer().validate(data)
        	user = valid_data["user"]
        	request.user = user
        	response.context_data["user"] = request.user
        except ValidationError as v:
        	print("ValidationError", v)

        return response
