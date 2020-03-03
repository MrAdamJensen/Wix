from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
# Form builder view
def form_builder(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return render(request, 'form_builder/form_builder_app.html')
    elif request.method == 'POST':
        # As of this time, no get response in this view
        return HttpResponseServerError("No action for POST in this view")

@csrf_exempt
# Form submit view
def form_submit(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return render(request, 'form_builder/submit_app.html')
    elif request.method == 'POST':
        # As of this time, no get response in this view
        return HttpResponseServerError("No action for POST in this view")

@csrf_exempt
# Form submissions view
def form_submissions(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return render(request, 'form_builder/submissions_app.html')
    elif request.method == 'POST':
        # As of this time, no get response in this view
        return HttpResponseServerError("No action for POST in this view")
