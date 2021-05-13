from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Todo, Column, Board
from .serializers import TodoSerializer, ColumnSerializer, BoardSerializer

from auth_jwt.models import User


class GetBoard(APIView):
	serializer_class = BoardSerializer
	permission_classes = (IsAuthenticated, )

	def get(self, request, pk):
		data = Board.objects.get(id=pk)

		data = {
			'board_name': data.board_name,
			'board_desc': data.board_desc,
			'board_color': data.board_color
		}

		serializer = self.serializer_class(data=data)
		if serializer.is_valid():
			return Response({"boards": serializer.data})
		return Response({"error": serializer.errors})


class BoardView(ListCreateAPIView):
	serializer_class = BoardSerializer
	permission_classes = (IsAuthenticated, )

	def get_queryset(self):
		user = self.request.user
		return Board.objects.filter(user=user)

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			serializer.save(user=request.user)
			return Response({"Board": serializer.data}, status.HTTP_201_CREATED)
		return Response({"error": serializer.errors}, status.HTTP_400_BAD_REQUEST)


class TodoView(ListCreateAPIView):
	serializer_class = TodoSerializer
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		user = self.request.user
		return Todo.objects.filter(column__board__user=user)

	def post(self, request):
		column_id = self.request.data.pop('column')
		column = Column.objects.filter(id=column_id).first()

		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			serializer.save(column=column)
			return Response({"todo": serializer.data}, status.HTTP_201_CREATED)

		return Response({"error": serializer.errors}, status.HTTP_400_BAD_REQUEST)
	
	def put(self, request):
		column = 0
		if 'column' in self.request.data:
			column_id = self.request.data.pop('column')
			column = Column.objects.filter(id=column_id).first()

		todo_id = self.request.data.pop('todo_id')
		todo_name = self.request.data.pop('todo_name')
		todo_desc = self.request.data.pop('todo_desc')

		if column == 0:
			data = Todo.objects.filter(id=todo_id).update(todo_name=todo_name, todo_desc=todo_desc)
		else:
			data = Todo.objects.filter(id=todo_id).update(todo_name=todo_name, todo_desc=todo_desc, column=column)
		print(data)
		if data == 0:
			return Response({"todo": "Not Updated"}, status.HTTP_400_BAD_REQUEST)
		return Response({"todo": "Updated"}, status.HTTP_200_OK)

class ColumnView(ListCreateAPIView):
	serializer_class = ColumnSerializer
	permission_classes = (IsAuthenticated, )

	def get_queryset(self):
		user = self.request.user

		return Column.objects.filter(board__user=user)

	def post(self, request):
		board_id = self.request.data.pop('board')
		board = Board.objects.filter(id=board_id).first()

		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			serializer.save(board=board)
			return Response({"column": serializer.data})

		return Response({"error": serializer.errors}, status.HTTP_400_BAD_REQUEST)
