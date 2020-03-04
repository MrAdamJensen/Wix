# Project Title

From Builder App. This app lets you build a form and let other fill it. You can then review the submissions of all forms created in the app.

## Getting Started


#This is the app home. at any time, you can click the green logo at the top left hand side and redirect to this home:
<img src="/images/home_screen.png" width=800>

#To create a form click the create form button, this will open the form creation wizard:
<img src="/images/create_form.png" width=500>

#First, enter a form name:
<img src="/images/form_builder_wizard_form_name.png" width=300 height=450>

#Then, create a field. First choose the field type using the drop down suggest list(note that this is a suggest field, i.e, it will filter the options based on the input text). Then, choose a field label:
<img src="/images/form_builder_wizard_create_field.png" width=300 height=450>

#After you created all the fields you want, create the form by clicking on the create button:
<img src="/images/form_builder_wizard_create.png" width=300 height=450>

#Some fields can be edited in the table, such as a form name by clicking on the edges of the cell, finish the edit with pressing Enter:
<img src="/images/edit_field_inplace.png">

#You can sort the table by a specific column by clicking on the header text:
<img src="/images/table_sort.png">

3Info, edit and delete actions are available via the actions on the actions column:
<img src="/images/info_edit_delete.png">

#You can search for a specific form by using the search:
<img src="/images/search.png" width=500>

#To submit a form click the relevant form submit page button, a submit form wizard will appear next:
<img src="/images/submit_form_wizard.png" width=300 height=450>

#After you click submit, the submission will be added to the form submission page where you will be redirected to:
<img src="/images/form_submissions_page.png" >

#You can see each submissions details by either clicking on the info action:
<img src="/images/form_submission_info.png" width=300 height=450>

#or clicking on verbose to toggle verbose display:
<img src="/images/form_submission_verbose.png">

### Prerequisites

In order to run the app locally you will need to setup the server and the client.
cd into the repo top directory and execute the following commands(we assume you already setup npm and pip):

```
cd client
npm run install
cd ../server/form_builder_server
pip install -r requirements.txt

```

### Installing

Before running the app, we want to make sure all the build files are up to date. cd into the repo top directory and execute the following commands:

Build the client and deploy it to the server:

```
cd client
npm run deploy
```

## Running the app

To run the app, we need to start the server and then open a browser and connect to it. cd into the repo top directory and execute the following commands:

```
cd server/form_builder_server
python ./manage.py runserver
```

You will then need to copy the given server url displayed in the terminal and past it in a browser.

## Deployment

We deployed this app to heroku and it can be accessed via: 

## Built With

* [React](https://reactjs.org/) - The web framework used
* [Django](https://www.djangoproject.com/) - The server framework used
* [Babel](https://babeljs.io/) - Used to transpiling javascript

## Authors

* **Yehonatan Peleg** 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to Stoyan Stefanov(https://github.com/stoyan) which i based my code on he's book(React: Up & Running: https://www.amazon.com/React-Running-Building-Web-Applications/dp/1491931825)


