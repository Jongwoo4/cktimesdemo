from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login, logout, authenticate
from .models import CustomUser

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)

        if user:
            if user.is_admin or user.is_writer:
                # Session-based authentication
                login(request, user)
                return Response({
                    "message": "Session login successful",
                    "user": {
                        "email": user.email,
                        "username": user.username,
                        "role": "admin" if user.is_admin else "writer"
                    }
                }, status=status.HTTP_200_OK)

            else:
                # JWT-based authentication
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "JWT login successful",
                    "user": {
                        "email": user.email,
                        "username": user.username,
                        "role": "user"
                    },
                    "access": str(refresh.access_token),
                    "refresh": str(refresh)
                }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            if request.user.is_admin or request.user.is_writer:
                # Logout for session users
                logout(request)
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

        return Response({"error": "User not authenticated"}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        username = request.data.get("username")
        password = request.data.get("password")

        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(email=email, username=username, password=password)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)