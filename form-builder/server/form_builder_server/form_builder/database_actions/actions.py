from form_builder.models import FormInfo, FormSubmission, FormsTableClientSchema
import json 

# Creating a form info record in the forms info table
def create_form_info_record(form_info):
    # Parsing form info to a dictonery
    form_info_dict = json.loads(form_info)

    # Stringifying schema so that it can be sotred in database
    form_info_dict['schema'] = json.dumps(form_info_dict['schema'])

    # Removing id field so that the database will generate a fresh one
    del form_info_dict['id']

    # Creating form info record
    form_info_record = FormInfo(**form_info_dict)

    # Setting the created form info record id to the form info links to the submit and submissions pages
    form_info_record.submit_page = form_info_record.submit_page.replace('$', form_info_record.id)
    form_info_record.submissions_page = form_info_record.submissions_page.replace('$', form_info_record.id)

    # Saving record
    form_info_record.save()

# Updating a form info record in the forms info table
def update_form_info_record(form_info):
    # Parsing form info to a dictonery
    form_info_dict = json.loads(form_info)

    # Retrieving the to update record
    form_info_record = FormInfo.objects.get(form_id=form_info_dict.form_id)

    # Updating record
    form_info_record.form_name = form_info_dict.form_name
    form_info_record.num_submissions = form_info_dict.num_submissions
    form_info_record.submit_page = form_info_dict.submit_page
    form_info_record.submissions_page = form_info_dict.submissions_page
    form_info_record.schema = json.dumps(form_info_dict.schema)

    # Saving update
    form_info_record.save()

# Deleting a form info record in the forms info table
def delete_form_info_record(form_info):
    # Parsing form info to a dictonery
    form_info_dict = json.loads(form_info)

    # Retrieving the to delete record
    form_info_record = FormInfo.objects.get(form_id=form_info_dict.form_id)

    # Deleting record
    form_info_record.delete()

# Creating a form submission record in the forms submissions table
def create_form_submission_record(form_id, form_submission):
    # Retrieving the form submission form info record
    form_info_record = FormInfo.objects.get(form_id=form_id)

    # Creating form submission record
    form_submission_record = FormSubmission(submission_form=form_info_record, submission=form_submission)

    # Parsing form submission so that its id field can be changed
    form_submission_dict = json.loads(form_submission)
    
    # Setting id to the form submission so it can be recognized
    form_submission_dict.id = form_submission_record.id

    # Updating created form sumbission submission field with its id
    form_submission_record.submission = json.dumps(form_submission_dict)

    # Saving record
    form_submission_record.save()

# Updating a form submission record in the forms submissions table
def update_form_submission_record(form_id, form_submission):
    # Parsing form submission so that its id can be fetched to
    # be used in recognizing the form submission record in the form submission table
    form_submission_dict = json.loads(form_submission)

    # Retrieving the to update record
    form_submission_record = FormSubmission.objects.get(id=form_submission_dict.id)

    # Updating record
    form_submission_record.submission = form_submission

    # Saving update
    form_submission_record.save()

# Deleting a form submission record from the forms submissions table
def delete_form_submission_record(form_id, form_submission):
    # Parsing form submission so that its id can be fetched to
    # be used in recognizing the form submission record in the form submission table
    form_submission_dict = json.loads(form_submission)

    # Retrieving the to delete record
    form_submission_record = FormSubmission.objects.get(id=form_submission_dict.id)

    # Saving record
    form_submission_record.delete()

# Retrieving all forms info records from the forms info table
def retrieve_all_forms_info_records():
    # Initializing
    forms_info_records = []

    # Retreving all forms info records
    for record in FormInfo.objects.all():
        forms_info_records.append(str(record))

    return json.dumps(forms_info_records)

# Retrieving all form submissions for a given form
def retrieve_all_form_submissions(form_id):
    # Initializing
    form_submissions = []

    # Retrieving the form submissions form info record
    form_info_record = FormInfo.objects.get(form_id=form_id)

    # Retrieving all form submissions for a given form
    for record in FormSubmission.objects.filter(submission_form=form_info_record):
        form_submissions.append(str(record))

    return json.dumps(form_submissions)

# Retrieving form info schema
def retrieve_form_info_schema():
    return json.dumps(FormsTableClientSchema)

# Retrieving form schema
def retrieve_form_schema(form_id):
    # Retrieving the form info record
    form_info_record = FormInfo.objects.get(form_id=form_id)

    return form_info_record.schema


# Dispatcher for actions on the form info table
action_on_form_info_table = {'create': create_form_info_record, 
                             'update': update_form_info_record,
                             'delete': delete_form_info_record}

# Dispatcher for actions on the form submission table
action_on_form_submission_table = {'create': create_form_submission_record, 
                                   'update': update_form_submission_record,
                                   'delete': delete_form_submission_record}

