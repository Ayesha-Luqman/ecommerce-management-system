from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.home, name='home'),
    path('product/<int:id>/', views.product_detail, name='product_detail'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    
    path('cart/', views.cart_view, name='cart'),
    path('remove-from-cart/<int:item_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('place-order/', views.place_order, name='place_order'),
    path('my-orders/', views.my_orders, name='my_orders'),
    
    #------
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/products/', views.product_api, name='product_api'),
    path('api/products/<int:id>/', views.product_detail_api, name='product_detail_api'),
    path('api/categories/', views.category_api, name='category_api'),
    path('api/register/', views.register_api),
    path('api/login/', views.login_api, name='login_api'),
    path('api/logout/', views.logout_api, name='logout_api'),
    path('api/add-to-cart/', views.add_to_cart_api, name='add_to_cart_api'),
    path('api/view-cart/', views.view_cart_api, name='view_cart_api'),
    path('api/update-cart/', views.update_cart_api, name='update_cart_api'),
    path('api/remove-cart/', views.remove_cart_api, name='remove_cart_api'),
    path('api/place-order/', views.place_order_api, name='place_order_api'),
    path('api/my-orders/', views.my_orders_api, name='my_orders_api'),
]
