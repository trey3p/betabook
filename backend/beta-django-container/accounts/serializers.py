
from django.contrib.auth import authenticate, get_user_model
from djoser.conf import settings
from djoser.serializers import TokenCreateSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from .models import Post, Comment, Video, Photo, Route, Area, State

User = get_user_model()

class CustomTokenCreateSerializer(TokenCreateSerializer):

    def validate(self, attrs):
        password = attrs.get('password')
        params = {settings.LOGIN_FIELD: attrs.get(settings.LOGIN_FIELD)}
        
        self.user = authenticate(request = self.context.get('request'), **params, password = password)

        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                self.fail('invalid_credentials')

        if self.user and not self.user.is_active:
            raise ValidationError("user is not active") # message that the user is not active
        elif self.user and self.user.is_active:
            return attrs
        self.fail("invalid_credentials")

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('post', 'user', 'user_email', 'bodytext')

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('post', 'url')

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('post', 'url')

class PostSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many = True, read_only = True)
    photos = PhotoSerializer(many = True, read_only = True)
    class Meta:
        model = Post
        fields = ('title', 'slug', 'bodytext', 'postID', 'route',
                 'grading','conditions','beta', 'rating', 'videos', 'photos')

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('name', 'avg_rating', 'long', 'lat', 'grade', 
                'climbType', 'description', 'area', 'routeID')

class AreaSerializer(serializers.ModelSerializer):
    routes =  RouteSerializer(many = True, read_only = True)
    posts = PostSerializer(many = True, read_only = True)
    class Meta:
        model = Area
        fields = ('name', 'areaID', 'state', 'long', 'lat',
                'avg_rating', 'rockType', 'routes', 'posts')

class StateSerializer(serializers.ModelSerializer):
    routes = RouteSerializer(many = True, read_only = True) 
    areas = AreaSerializer(many = True, read_only = True)

    class Meta:
        model = State
        fields = ('name', 'routes', 'areas', 'posts')