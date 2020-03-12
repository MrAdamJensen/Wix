# QA
eslint js/source js/__tests__
flow
npm test
# js transform
babel js/source/ -d js/build
# js package
browserify js/build/FormBuilderAppPage.js -o form_builder_app_bundle.js
browserify js/build/SubmissionsAppPage.js -o submissions_app_bundle.js
browserify js/build/SubmitAppPage.js -o submit_app_bundle.js
browserify js/build/LoginAppPage.js -o login_app_bundle.js
# css package
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
# done
date; echo;

