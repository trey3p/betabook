from django.shortcuts import render
from djoser.views import UserViewSet
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Post, Comment, Area, State, Route

from .serializers import PostSerializer, RouteSerializer, AreaSerializer, StateSerializer, CommentSerializer

class ActivateUser(UserViewSet):
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
 
        # this line is the only change from the base implementation.
        kwargs['data'] = {"uid": self.kwargs['uid'], "token": self.kwargs['token']}
 
        return serializer_class(*args, **kwargs)
 
    def activation(self, request, uid, token, *args, **kwargs):
        super().activation(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostView(viewsets.ModelViewSet):
    
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, requests, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Post.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, requests, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class RouteView(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, requests, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class AreaView(viewsets.ModelViewSet):
    serializer_class = AreaSerializer
    queryset = Area.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, requests, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class StateView(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = State.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, requests, *args, **kwargs):
        return self.update(request, *args, **kwargs)

