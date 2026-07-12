from django.shortcuts import render, get_object_or_404, redirect
from .models import Product, Category, Customer, Cart, CartItem, Order, OrderItem
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def home(request):
    products = Product.objects.all()
    return render(request, 'home.html', {'products': products})

def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    return render(request, 'product_detail.html', {'product': product})


def register(request):

    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':

        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        

        username_exist= User.objects.filter(username=username).exists()
        if(username_exist):
            context={'error': 'username already taken'}
            return render(request, 'auth/register.html', context)
        
        email_exist= User.objects.filter(email=email).exists()
        if(email_exist):
            context={'error': 'email already taken'}
            return render(request, 'auth/register.html', context)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        customer = Customer.objects.create(user=user, phone=phone, address=address)
         # create cart
        Cart.objects.create(customer=customer)

        login(request, user)
        return redirect('home')

    return render(request, 'auth/register.html')

#login
def user_login(request):

    # if already logged in
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # authenticate user
        user = authenticate(
            request,
            username=username,
            password=password
        )

        # if credentials correct
        if user is not None:
            login(request, user)
            return redirect('home')

        context = {'error': 'invalid username or password'}
        return render(request, 'auth/login.html', context)

    return render(request, 'auth/login.html')

def user_logout(request):
    logout(request)
    return redirect('login')


#add to cart
@login_required
def add_to_cart(request, product_id):

    product = get_object_or_404(Product, id=product_id)

    customer = Customer.objects.get(user=request.user)

    # check if cart exists
    cart_exist = Cart.objects.filter(customer=customer).exists()

    customer = Customer.objects.get(user=request.user)
    cart = Cart.objects.get(customer=customer)

    # check item already in cart
    item_exist = CartItem.objects.filter(cart=cart, product=product).exists()

    if item_exist:
        item = CartItem.objects.get(cart=cart, product=product)
        item.quantity = item.quantity + 1
        item.save()
    else:
        CartItem.objects.create(cart=cart, product=product, quantity=1)

    return redirect('cart')

@login_required
def cart_view(request):

    if request.user.is_superuser:
        return redirect('home')

    customer = Customer.objects.get(user=request.user)
    cart = Cart.objects.get(customer=customer)

    items = CartItem.objects.filter(cart=cart)

    total = 0

    for item in items:
        total = total + (item.product.price * item.quantity)

    context = {
        'items': items,
        'total': total
    }

    return render(request, 'cart.html', context)


#remove from cart
def remove_from_cart(request, item_id):

    if not request.user.is_authenticated:
        return redirect('login')

    item = CartItem.objects.get(id=item_id)
    item.delete()

    return redirect('cart')



#place order
@login_required
def place_order(request):

    customer = Customer.objects.get(user=request.user)
    cart = Cart.objects.get(customer=customer)
    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items:
        return redirect('cart')

    order = Order.objects.create(
        customer=customer,
        status='Pending'
    )

    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()

    #success message
    messages.success(request, "Order placed successfully!")

    return redirect('home')

#view order from this
@login_required
def my_orders(request):
    
    if request.user.is_superuser:
        return redirect('home')

    customer = Customer.objects.get(user=request.user)

    orders = Order.objects.filter(customer=customer)

    context = {
        'orders': orders
    }

    return render(request, 'my_orders.html', context)



#-----------------
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProductSerializer, CategorySerializer, RegisterSerializer, CartItemSerializer, OrderSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['GET'])
def product_api(request):

    products = Product.objects.all()

    search = request.GET.get('search')
    category = request.GET.get('category')

    if search:
        products = products.filter(name__icontains=search)

    if category:
        products = products.filter(category__name__icontains=category)

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def category_api(request):

    categories = Category.objects.all()

    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def product_detail_api(request, id):

    product = get_object_or_404(Product, id=id)

    serializer = ProductSerializer(product)

    return Response(serializer.data)



@api_view(['POST'])
def register_api(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {'message': 'Registration Successful'},
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def login_api(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:

        login(request, user)
        


        return Response(
            {'message': 'Login Successful'},
            status=status.HTTP_200_OK
        )

    return Response(
        {'error': 'Invalid Username or Password'},
        status=status.HTTP_400_BAD_REQUEST
    )
    
    
@api_view(['POST'])
def logout_api(request):

    logout(request)

    return Response(
        {'message': 'Logout Successful'},
        status=status.HTTP_200_OK
    )
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart_api(request):

    customer = get_object_or_404(Customer, user=request.user)

    cart, created = Cart.objects.get_or_create(customer=customer)

    product_id = request.data.get('product_id')

    product = get_object_or_404(Product, id=product_id)

    cart_item = CartItem.objects.filter(
        cart=cart,
        product=product
    ).first()

    if cart_item:

        cart_item.quantity += 1
        cart_item.save()

    else:

        CartItem.objects.create(
            cart=cart,
            product=product,
            quantity=1
        )

    return Response(
        {'message': 'Product Added Successfully'},
        status=status.HTTP_200_OK
    )
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart_api(request):

    customer = get_object_or_404(Customer, user=request.user)

    cart = get_object_or_404(Cart, customer=customer)

    cart_items = CartItem.objects.filter(cart=cart)

    serializer = CartItemSerializer(cart_items, many=True)

    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_api(request):

    customer = get_object_or_404(Customer, user=request.user)

    cart = get_object_or_404(Cart, customer=customer)

    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')

    if int(quantity) < 1:
        return Response(
            {'error': 'Quantity must be at least 1'},
            status=status.HTTP_400_BAD_REQUEST
        )

    cart_item = get_object_or_404(
        CartItem,
        cart=cart,
        product_id=product_id
    )

    cart_item.quantity = quantity
    cart_item.save()

    return Response(
        {'message': 'Cart Updated Successfully'},
        status=status.HTTP_200_OK
    )
    
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_cart_api(request):

    customer = get_object_or_404(Customer, user=request.user)

    cart = get_object_or_404(Cart, customer=customer)

    product_id = request.data.get('product_id')



    cart_item = get_object_or_404(
        CartItem,
        cart=cart,
        product_id=product_id
    )

    cart_item.delete()

    return Response(
        {'message': 'Product Removed from Cart'},
        status=status.HTTP_200_OK
    )
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order_api(request):

    customer = get_object_or_404(Customer, user=request.user)

    cart = get_object_or_404(Cart, customer=customer)

    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response(
            {'error': 'Your cart is empty'},
            status=status.HTTP_400_BAD_REQUEST
        )

    order = Order.objects.create(
        customer=customer,
        status='Pending'
    )

    for item in cart_items:

        if item.quantity > item.product.quantity:
            return Response(
                {
                    'error': f'Not enough stock available for {item.product.name}'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

        item.product.quantity -= item.quantity
        item.product.save()

    cart_items.delete()

    return Response(
        {
            'message': 'Order Placed Successfully',
            'order_id': order.id
        },
        status=status.HTTP_201_CREATED
    )
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders_api(request):

    customer = get_object_or_404(Customer, user=request.user)

    orders = Order.objects.filter(customer=customer)

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)