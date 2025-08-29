from django.contrib import admin

from .models import hospitalapp

#admin.site.register(hospitalapp)

@admin.register(hospitalapp)
class hospitalappAdmin(admin.ModelAdmin):
    list_display = ['id','name','email','address','phone' ,'orders' ,'messages' 'pictures']
    list_filter = ['name']
    search_fields = ['name','email']
    ordering = ['id']



