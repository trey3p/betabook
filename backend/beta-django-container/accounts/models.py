from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


from django.conf import settings
from django.urls import reverse
from django.db import models
from django.db.models.signals import post_save
from six import python_2_unicode_compatible
from django.utils.translation import gettext_lazy as _
from django.contrib import admin
from .utilities import make_id

User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False
        

from .signals import save_comment


class State(models.Model):
    name = models.CharField(max_length = 200, primary_key = True)
    

class Area(models.Model):
    #Routes included in view and serializer
    name = models.CharField(max_length = 200)
    areaID = models.BigIntegerField(default = hash(str(name)), primary_key = True)
    state = models.ForeignKey(State, on_delete = models.CASCADE)
    long = models.DecimalField(max_digits = 22, decimal_places = 16, blank = True, null = True)
    lat = models.DecimalField(max_digits = 22, decimal_places = 16, blank = True, null = True)
    avg_rating = models.DecimalField(max_digits = 2, decimal_places = 1, blank = True, null = True)
    rockType = models.CharField(max_length = 200)

class Route(models.Model):
    #Posts included in view and serializer 
    name = models.CharField(max_length = 200)
    area = models.ForeignKey(Area, on_delete = models.CASCADE)
    long = models.DecimalField(max_digits = 22, decimal_places = 16, blank = True, null = True)
    lat = models.DecimalField(max_digits = 22, decimal_places = 16, blank = True, null = True)
    avg_rating = models.DecimalField(max_digits = 2, decimal_places = 1, blank = True, null = True)
    grade = models.CharField(max_length = 6)
    routeID = models.BigIntegerField(default = hash(str(area) + str(name)), primary_key = True)
    climbType = models.CharField(max_length = 20)
    description = models.TextField(verbose_name = _('routeDescription'))



@python_2_unicode_compatible
class Post(models.Model):
    # URLs included in serializer and view
    postID = models.BigIntegerField(default = make_id, primary_key = True)

    route = models.ForeignKey(Route, verbose_name = _("route"), on_delete = models.CASCADE)
    area = models.ForeignKey(Area, verbose_name = _ ('area'), on_delete = models.CASCADE)
    state = models.ForeignKey(State, verbose_name = _('state'), on_delete = models.CASCADE)

    title = models.CharField(max_length=200, verbose_name=_("title"))
    slug = models.SlugField()
    bodytext = models.TextField(verbose_name=_("message"))
    grading = models.CharField(max_length = 10, default = '')
    conditions = models.TextField(default = '')
    beta = models.TextField(default = '')
    rating = models.DecimalField(max_digits = 2, decimal_places = 1, blank = True, null = True)

    

    post_date = models.DateTimeField(
        auto_now_add=True, verbose_name=_("post date"))
    modified = models.DateTimeField(null=True, verbose_name=_("modified"))
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True,
                                  verbose_name=_("posted by"),
                                  on_delete=models.SET_NULL)

    allow_comments = models.BooleanField(
        default=True, verbose_name=_("allow comments"))
    comment_count = models.IntegerField(
        blank=True, default=0, verbose_name=_('comment count'))

    class Meta:
        verbose_name = _('post')
        verbose_name_plural = _('posts')
        ordering = ['-post_date']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        kwargs = {
            'slug': self.slug,
            'year': '%04d' % self.post_date.year,
            'month': '%02d' % self.post_date.month,
            'day': '%02d' % self.post_date.day,
        }

        return reverse('blog_detail', kwargs=kwargs)


@python_2_unicode_compatible
class Comment(models.Model):
    post = models.ForeignKey(
        Post, related_name='comments', verbose_name=_("post"),
        on_delete=models.CASCADE)
    bodytext = models.TextField(verbose_name=_("message"))

    post_date = models.DateTimeField(
        auto_now_add=True, verbose_name=_("post date"))
    ip_address = models.GenericIPAddressField(
        default='0.0.0.0', verbose_name=_("ip address"))

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        verbose_name=_("user"), related_name='comment_user',
        on_delete=models.SET_NULL)
    user_name = models.CharField(
        max_length=50, default='anonymous', verbose_name=_("user name"))
    user_email = models.EmailField(blank=True, verbose_name=_("user email"))

    def __str__(self):
        return self.bodytext

    class Meta:
        verbose_name = _('comment')
        verbose_name_plural = _('comments')
        ordering = ['post_date']


post_save.connect(save_comment, sender=Comment)


class Url(models.Model):
    url = models.URLField() 
    post = models.ForeignKey(Post, on_delete = models.CASCADE)

class Video(models.Model):
    url = models.URLField()
    post = models.ForeignKey(Post, on_delete = models.CASCADE)

class Photo(models.Model):
    url = models.URLField()
    post = models.ForeignKey(Post, on_delete = models.CASCADE)