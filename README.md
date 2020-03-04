# Project Title

From Builder App. This app lets you build a form and let other fill it. You can then review the submissions of all forms created in the app.

## Getting Started



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


