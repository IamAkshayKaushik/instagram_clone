from django.urls import path
from .views import PostListView, PostDetailView, CommentListView, CommentDetailView, SharesListView, LikesListView, LikesDestroyView

app_name = "posts"

urlpatterns = [
    path('posts/', PostListView.as_view(), name="post-list"),
    path('posts/<int:pk>/', PostDetailView.as_view(), name="post-detail"),
    path('comments/', CommentListView.as_view(), name="comment-list"),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
    path('shares/<int:post_id>/', SharesListView.as_view(), name="share-list"),
    path('likes/', LikesListView.as_view(), name="like-list"),
    path('likes/<int:pk>/', LikesDestroyView.as_view(), name="like-detail")
]
