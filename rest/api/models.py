from django.db import models
from auth_jwt.models import User


class Board(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	board_name = models.CharField(max_length=20)
	board_desc = models.CharField(max_length=120)
	board_color = models.CharField(max_length=20, default="rgb(255,255,0,1)")

	def __str__(self):
		return self.board_name


class Column(models.Model):
	column_name = models.CharField(max_length=100)
	board = models.ForeignKey(Board, null=True, related_name="board", on_delete=models.CASCADE)

	def __str__(self):
		return self.column_name


class Todo(models.Model):
	todo_name = models.CharField(max_length=200)
	todo_desc = models.CharField(max_length=200)
	column = models.ForeignKey(Column, null=True, related_name="column", on_delete=models.CASCADE)

	def __str__(self):
		return self.todo_name