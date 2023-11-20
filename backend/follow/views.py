from .serializers import FollowSerializer
from .models import Follow
from rest_framework import generics, permissions, serializers


class FollowListView(generics.ListCreateAPIView):

    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # return only the list of followed users
        # return Follow.objects.filter(following=self.request.user)
        # return only the list of followers
        return Follow.objects.select_related('following').filter(follower=self.request.user)

    def perform_create(self, serializer):
        follower = self.request.user
        following = serializer.validated_data.get('following')

        # Check if the user is trying to follow themselves
        if follower == following:
            raise serializers.ValidationError({"error": "You cannot follow yourself."})
        serializer.save(follower=follower)


class FollowDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]
