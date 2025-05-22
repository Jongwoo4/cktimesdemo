from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Article, Category, Opinion, OpinionGroup
from .serializers import ArticleSerializer, CategorySerializer, OpinionSerializer, OpinionGroupSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer

class ArticleRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'pk'

class PaginatedArticleView(ListAPIView):
    queryset = Article.objects.order_by("-published_at")  # ✅ Order by most recent
    permission_classes = [AllowAny]
    serializer_class = ArticleSerializer


class ArticleOne(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        article = Article.objects.get(pk=pk)
        article_data = ArticleSerializer(article, context={'request': request}).data
        return Response(article_data)

class MainPageArticleView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Get 5 articles marked as main
        main_articles = Article.objects.filter(is_main=True).order_by("-published_at")[:5]

        # Get 10 most recent articles excluding main ones
        recent_articles = Article.objects.filter(is_main=False).order_by("-published_at")[:10]

        # Serialize data
        main_articles_data = ArticleSerializer(main_articles, many=True, context ={'request': request}).data
        recent_articles_data = ArticleSerializer(recent_articles, many=True, context ={'request': request}).data

        return Response({
            "main_articles": main_articles_data,
            "recent_articles": recent_articles_data
        })

class CategoryArticleList(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category = self.kwargs['category']
        return Article.objects.filter(category__name=category).order_by('-published_at')
                          
class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

class OpinionListCreate(generics.ListCreateAPIView):
    queryset = Opinion.objects.all().order_by('-published_at')
    serializer_class = OpinionSerializer

class OpinionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opinion.objects.all()
    serializer_class = OpinionSerializer
    lookup_field = 'pk'

class OpinionGroupListCreate(generics.ListCreateAPIView):
    queryset = OpinionGroup.objects.all()
    serializer_class = OpinionGroupSerializer

class MainOpinionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        opinion = Opinion.objects.all().order_by('-published_at')[:4]
        opinion_data = OpinionSerializer(opinion, many=True, context = {'request': request}).data
        return Response(opinion_data)


class OpinionGroupRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = OpinionGroup.objects.all()
    serializer_class = OpinionGroupSerializer
    lookup_field = 'pk'

