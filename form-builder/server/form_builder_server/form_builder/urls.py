from django.urls import re_path
from django.urls import path
from form_builder import views

# TEMPLATE TAGGING
app_name = "form_builder"

urlpatterns = [
    path(r'', views.form_builder),
    re_path(r'^submit_page_[0-9]+/$', views.form_submit),
    re_path(r'^submissions_page_[0-9]+/$', views.form_submissions),
    
    path(r'database/', views.form_builder_database),
    path(r'submit_page_<int:form>/database/', views.form_submit_database),
    path(r'submissions_page_<int:form>/database/', views.form_submissions_database),
]