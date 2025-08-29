# from django.shortcuts import render
# from django.http import render, HttpResponse
# from django.shortcuts import render HttpResponse

from django.shortcuts import render,HttpResponse
from .models import hospitalapp
from django.views import View

# def index(request *args, **kwargs):
#     return render(request, "index.html")
def index(request):
    return render(request, "index.html")

def index(request, *args, **kwargs):
    list_hospitals = hospitalapp.objects.all()
    list_pharmacies = hospitalapp.objects.all()
    list_services = hospitalapp.objects.all()
    list_contacts = hospitalapp.objects.all()
    list_requests = hospitalapp.objects.all()
    list_messages = hospitalapp.objects.all()
    list_users = hospitalapp.objects.all()
    list_profiles = hospitalapp.objects.all()
    list_orders = hospitalapp.objects.all()
    list_notifications = hospitalapp.objects.all()
    list_settings = hospitalapp.objects.all()
    list_admins = hospitalapp.objects.all()
    list_userdashboards = hospitalapp.objects.all()
    list_logins = hospitalapp.objects.all()
    list_signups = hospitalapp.objects.all()
    list_dashboards = hospitalapp.objects.all()
    list_adds = hospitalapp.objects.all()
    list_details = hospitalapp.objects.all()
    list_filters = hospitalapp.objects.all()
    list_searches = hospitalapp.objects.all()
    list_ordereds = hospitalapp.objects.all()
    list_pictures = hospitalapp.objects.all()
    list_addresses = hospitalapp.objects.all()
    list_phones = hospitalapp.objects.all()
    list_emails = hospitalapp.objects.all()
    list_names = hospitalapp.objects.all()
    list_ids = hospitalapp.objects.all()
    list_passwords = hospitalapp.objects.all()
    list_usernames = hospitalapp.objects.all()
     
    return render(request, "index.html", {})

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from .models import UserProfile, ServiceRequest, ContactMessage
from 

# Public Pages
def index_view(request): return render(request, 'index.html')
def contact_view(request): return render(request, 'contactus.html')
def ask_service_view(request): return render(request, 'ask_a_service.html')
def services_view(request): return render(request, 'see_services.html')

def signup_view(request):
    # (same logic as before)
    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            # ROLE-BASED REDIRECTION
            if email.endswith('@admin.com'):
                return redirect('admin_dashboard')
            elif email.endswith('@hospital.com'):
                return redirect('hospital_dashboard')
            elif email.endswith('@pharmacy.com'):
                return redirect('pharmacy_dashboard')
            else:
                return redirect('dashboard')
        else:
            messages.error(request, "Invalid login")
            return redirect('login')
    return render(request, 'login.html')

# User Pages
def home_view(request): return render(request, 'hospitals.html')
def pharmacy_list_view(request): return render(request, 'pharmacy.html')
def pharmacy_detail_view(request, pk): return render(request, 'pharmacy_detail.html', {"id": pk})
def send_request_view(request): return render(request, 'send_request.html')
def user_dashboard_view(request): return render(request, 'userdashboard.html')
def notifications_view(request): return render(request, 'notification.html')

# Admin Pages
def admin_dashboard_view(request): return render(request, 'admin/dashboard.html')
def admin_hospitals_view(request): return render(request, 'admin/hospitals.html')
def admin_pharmacies_view(request): return render(request, 'admin/pharmacies.html')
def admin_messages_view(request): return render(request, 'admin/messages.html')
def admin_settings_view(request): return render(request, 'admin/settings.html')
def admin_logout_view(request):
    logout(request)
    return redirect('login')

# Hospital Pages
def hospital_dashboard_view(request): return render(request, 'admin/dashboard.html')
def hospital_messages_view(request): return render(request, 'admin/messages.html')

# Pharmacy Pages
def pharmacy_dashboard_view(request): return render(request, 'pharmacy/dashboard.html')
def pharmacy_add_view(request): return render(request, 'pharmacy/add.html')
def pharmacy_messages_view(request): return render(request, 'pharmacy/messages.html')
