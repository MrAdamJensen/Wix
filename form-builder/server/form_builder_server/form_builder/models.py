from django.db import models
import json 

# Create your models here.

# Holds all the created forms info
class FormInfo(models.Model):
    # Holds the form name
    form_name = models.CharField(max_length=100)

    # Holds number of submissions for the form
    num_submissions = models.IntegerField()

    # Holds the form submit page
    submit_page = models.CharField(max_length=100)

    # Holds the form submissions page
    submissions_page = models.CharField(max_length=100)

    # Holds the form schema
    schema = models.TextField()

    # Returning a record representation
    def dictRepr(self):
        return {"id": self.pk, "form_name": self.form_name, 
                "num_submissions": self.num_submissions, "submit_page": self.submit_page,
                "submissions_page": self.submissions_page, "schema": json.loads(self.schema)}

# Holds all the created forms submissions
class FormSubmission(models.Model):
    # Holds the related submitted form
    submission_form = models.ForeignKey(FormInfo, on_delete=models.CASCADE)
    
    # Holds the form submitted data
    submission = models.TextField()

    # Returning a record representation
    def dictRepr(self):
        return json.loads(submission)


# Initializing the forms table schema used by the client
FormsTableClientSchema =  [
  {
    "id": 'id',
    "label": 'Form Id',
    "type": 'text',
    "show": True,
    "sample": '1',
    "align": 'left',
    "readOnlyGlobal": True,
  },
  {
    "id": 'form_name',
    "label": 'Form Name',
    "type": 'text',
    "show": True,
    "sample": 'Movie Review',
  },
  {
    "id": 'num_submissions',
    "label": '# Submissions',
    "type": 'number',
    "show": True,
    "sample": '0',
    "align": 'left',
    "readOnlyGlobal": True,
  },
  {
    "id": 'submit_page',
    "label": 'Submit Page',
    "type": 'button',
    "show": True,
    "sample": "www.google.com",
  },
  {
    "id": 'submissions_page',
    "label": 'Submissions Page',
    "type": 'button',
    "show": True,
    "sample": 'www.mako.co.il',
  },
  {
    "id": 'schema',
    "label": 'schema Page',
    "type": 'data',
    "show": False,
    "sample": 'sample data',
    "invisible": True,
  },
]