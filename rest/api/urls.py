from django.urls import path

from .views import *

urlpatterns = [
	path('board/', BoardView.as_view(), name="board"),
	path('board/<int:pk>', GetBoard.as_view(), name="get_board"),
	path('todo/', TodoView.as_view(), name="todo"),
	path('column/', ColumnView.as_view(), name="column")
]
