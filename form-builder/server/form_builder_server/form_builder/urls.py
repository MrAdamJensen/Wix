from django.conf.urls import url
from form_builder import views

# TEMPLATE TAGGING
app_name = "form_builder"

urlpatterns = [
    url(r'^$', views.form_builder),
    url(r'^form_submit_[0-9]*$', views.form_submit),
    url(r'^form_submissions_[0-9]*$', views.form_submissions),
    
    url(r'^database$', views.form_builder_database),
    url(r'^form_submit_[0-9]*/database$', views.form_submit_database),
    url(r'^form_submissions_[0-9]*/database$', views.form_submissions_database),
]