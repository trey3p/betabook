
from django.contrib.auth import authenticate, get_user_model
from djoser.conf import settings
from djoser.serializers import TokenCreateSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from .models import Post, Comment, Url

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


class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = ('post', 'url')


class PostSerializer(serializers.ModelSerializer):
    urls = UrlSerializer(many = True)
    class Meta:
        model = Post
        fields = ('title', 'slug', 'bodytext', 'post_id', 'urls')
