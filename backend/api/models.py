# models.py
from django.db import models
from authentication.models import CustomUser  

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class OpinionGroup(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    
class Opinion(models.Model):
    title = models.CharField(max_length=255)
    group = models.ForeignKey(OpinionGroup, on_delete=models.SET_NULL, null=True, related_name='opinions')
    content = models.TextField()
    published_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='opinions')
    image = models.ImageField(upload_to='opinions/', null=False, blank=False)

    def __str__(self):
        return self.content


class Article(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    content = models.TextField()
    published_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='articles')
    author = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='articles')
    image = models.ImageField(upload_to='articles/', null=False, blank=False)
    is_main = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_main:
            main_articles = Article.objects.filter(is_main=True).count()
            print(main_articles)
            if main_articles >= 5:
                print('raise')
                raise ValueError("You can't have more than 5 main articles")
        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
