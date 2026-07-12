from django.contrib import admin
from .models import Category, Product, Customer, Cart, CartItem, Order, OrderItem


admin.site.site_header = "My Store Admin"
admin.site.site_title = "My Store Portal"
admin.site.index_title = "Welcome to Dashboard"

# Category Admin
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']


# Product Admin
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'price', 'quantity']


# Customer Admin
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'phone', 'address']


# Cart Admin
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'created_at']


# Cart Item Admin
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'cart', 'product', 'quantity']


# Order Admin
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'status', 'order_date']
    list_filter = ['status']


# Order Item Admin
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'quantity', 'price']


# Register models
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
