from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Category, Customer, Cart, CartItem, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'price',
            'quantity',
            'image'
        ]
        
        
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            'id',
            'name'
        ]
        

class RegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField()
    address = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone', 'address']

    def create(self, validated_data):

        phone = validated_data.pop('phone')
        address = validated_data.pop('address')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        customer = Customer.objects.create(
            user=user,
            phone=phone,
            address=address
        )

        Cart.objects.create(customer=customer)

        return user
    
    
    
class CartItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',
            'quantity',
            'subtotal'
        ]

    def get_subtotal(self, obj):
        return obj.quantity * obj.product.price
    
    
    
    
class OrderItemSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'product',
            'quantity',
            'price',
            'subtotal'
        ]

    def get_subtotal(self, obj):
        return obj.quantity * obj.price
        
        

class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(source='orderitem_set', many=True, read_only=True)

    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'status',
            'order_date',
            'items',
            'total'
        ]

    def get_total(self, obj):

        total = 0

        for item in obj.orderitem_set.all():
            total += item.price * item.quantity

        return total