from rest_framework import serializers
from .models import Article, Category, Opinion, OpinionGroup
from authentication.models import CustomUser

class ArticleSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', queryset=Category.objects.all())
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'subtitle', 'content', 'published_at', 'category', 'author', 'image']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user  
        return super().create(validated_data)
    
    def get_image(self, obj):
        request = self.context.get('request')  # ✅ Get the full request context
        if obj.image:
            return request.build_absolute_uri(obj.image.url)  # ✅ Return full URL
        return None   

    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
    
class OpinionSerializer(serializers.ModelSerializer):
    group = serializers.StringRelatedField()
    author = serializers.StringRelatedField()

    class Meta:
        model = Opinion
        fields = ['id', 'title', 'content', 'published_at', 'group', 'author', 'image']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        return super().create(validated_data)

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None    

class OpinionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpinionGroup
        fields = '__all__'
