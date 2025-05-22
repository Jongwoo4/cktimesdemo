from django.contrib import admin

# Register your models here.
from .models import Article, Category, Opinion, OpinionGroup

admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Opinion)
admin.site.register(OpinionGroup)