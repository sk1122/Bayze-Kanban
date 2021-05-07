from rest_framework import serializers

from .models import Board, Todo, Column


class BoardSerializer(serializers.ModelSerializer):
	class Meta:
		model = Board
		fields = ["id", "board_name", "board_desc", "board_color"]


class ColumnSerializer(serializers.ModelSerializer):
	board = BoardSerializer(read_only=True)

	class Meta:
		model = Column
		fields = ["id", "column_name", "board"]
		depth = 1


class TodoSerializer(serializers.ModelSerializer):
	column = ColumnSerializer(read_only=True)

	class Meta:
		model = Todo
		fields = ["todo_name", "todo_desc", "column"]
		depth = 1