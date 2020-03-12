from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from form_builder.database_actions.actions import action_on_form_info_table, action_on_form_submission_table, \
                                          retrieve_all_forms_info_records, retrieve_all_form_submissions
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
@csrf_exempt
# Form builder view
def form_builder(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return render(request, 'form_builder/form_builder_app.html')
    elif request.method == 'POST':
        # As of this time, no get response in this view
        return HttpResponseServerError("No action for POST in this view")

@login_required
@csrf_exempt
# Form submit view
def form_submit(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return render(request, 'form_builder/submit_app.html')
    elif request.method == 'POST':
        # As of this time, no get response in this view
        return HttpResponseServerError("No action for POST in this view")

@login_required
@csrf_exempt
# Form submissions view
def form_submissions(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return render(request, 'form_builder/submissions_app.html')
    elif request.method == 'POST':
        # As of this time, no get response in this view
        return HttpResponseServerError("No action for POST in this view")

@login_required
@csrf_exempt
# Form builder database view
def form_builder_database(request):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return HttpResponseServerError("No action for GET in this view")
    elif request.method == 'POST':
        # Extracting the form info record sent by the client
        form_info_record = request.POST['data']

        # Extracting the form info database action type
        action = request.POST['action']

        # Asserting action is not a refresh request
        if not action == 'refresh':
            # Executing requested action
            action_on_form_info_table[action](form_info_record)
        
        # Retrieving updated form info table
        updated_form_info_table = retrieve_all_forms_info_records()

        # Returning updated form info table
        return HttpResponse(updated_form_info_table)

@login_required
@csrf_exempt
# Form submit database view
def form_submit_database(request, form):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return HttpResponseServerError("No action for GET in this view")
    elif request.method == 'POST':
        # Processing form submission table request
        return process_form_submission_table_request(request, form)

@login_required
@csrf_exempt
# Form submissions database view
def form_submissions_database(request, form):
    # Retrieving request method and acting accordingly
    if request.method == 'GET':
        return HttpResponseServerError("No action for GET in this view")
    elif request.method == 'POST':
        # Processing form submission table request
        return process_form_submission_table_request(request, form)

# Processing form submission table request
def process_form_submission_table_request(request, form):
    # Extracting the form submission record sent by the client
    form_submission_record = request.POST['data']

    # Extracting the form submission database action type
    action = request.POST['action']

    # Asserting action is not a refresh request
    if not action == 'refresh':
        # Executing requested action
        action_on_form_submission_table[action](form, form_submission_record)
    
    # Retrieving updated form submissions from form submission table
    updated_form_submissions = retrieve_all_form_submissions(form)

    # Returning updated form submissions
    return HttpResponse(updated_form_submissions)



