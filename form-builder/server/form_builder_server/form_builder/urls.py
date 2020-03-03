from django.conf.urls import url
from django.urls import path
from form_builder import views

# TEMPLATE TAGGING
app_name = "form_builder"

urlpatterns = [
    url(r'^$', views.form_builder),
    url(r'^form_submit_[0-9]+/$', views.form_submit),
    url(r'^form_submissions_[0-9]+/$', views.form_submissions),
    
    path(r'database/', views.form_builder_database),
    path(r'form_submit_<int:form>/database/', views.form_submit_database),
    path(r'form_submissions_<int:form>/database/', views.form_submissions_database),
]