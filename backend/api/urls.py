from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.PaginatedArticleView.as_view(), name='article-view-create'),
    path('articles/<int:pk>/', views.ArticleRetrieveUpdateDestroy.as_view(), name='article-view-update-delete'),
    path('main-articles/', views.MainPageArticleView.as_view(), name='main-article-view'),
    path('main-opinion/',views.MainOpinionView.as_view(), name='main-opinion-view'),
    path('articles/category/<str:category>/', views.CategoryArticleList.as_view(), name='category-article-view'),
    path('article/<int:pk>/', views.ArticleOne.as_view(), name='article-view-one'),
]
