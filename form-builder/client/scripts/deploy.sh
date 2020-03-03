# cleanup last version
rm -rf __deployme
mkdir __deployme

# build
sh scripts/build.sh

# minify js
uglify -s form_builder_app_bundle.js -o __deployme/form_builder_app_bundle.js
uglify -s submissions_app_bundle.js -o __deployme/submissions_app_bundle.js
uglify -s submit_app_bundle.js -o __deployme/submit_app_bundle.js

# minify css(error in current minify package, copy for now)
cp bundle.css  __deployme/bundle.css

# copy html and images
cp form_builder_app.html __deployme/form_builder_app.html
cp submissions_app.html __deployme/submissions_app.html
cp submit_app.html __deployme/submit_app.html
cp -r images/ __deployme/images/

# move deploy to server
cat __deployme/form_builder_app.html | sed 's/<!-- load here static -->/{% load static %}/g' | sed "s/bundle.css/{% static  'css\/bundle.css' %}/g" | sed "s/form_builder_app_bundle.js/{% static  'js\/form_builder_app_bundle.js' %}/g" > ../server/form_builder_server/form_builder/templates/form_builder/form_builder_app.html
cat __deployme/submissions_app.html | sed 's/<!-- load here static -->/{% load static %}/g' | sed "s/bundle.css/{% static  'css\/bundle.css' %}/g" | sed "s/submissions_app_bundle.js/{% static  'js\/submissions_app_bundle.js' %}/g" > ../server/form_builder_server/form_builder/templates/form_builder/submissions_app.html
cat __deployme/submit_app.html | sed 's/<!-- load here static -->/{% load static %}/g' | sed "s/bundle.css/{% static  'css\/bundle.css' %}/g" | sed "s/submit_app_bundle.js/{% static  'js\/submit_app_bundle.js' %}/g" > ../server/form_builder_server/form_builder/templates/form_builder/submit_app.html
cp __deployme/form_builder_app_bundle.js ../server/form_builder_server/form_builder/static/js/form_builder_app_bundle.js
cp __deployme/submissions_app_bundle.js ../server/form_builder_server/form_builder/static/js/submissions_app_bundle.js
cp __deployme/submit_app_bundle.js ../server/form_builder_server/form_builder/static/js/submit_app_bundle.js
cp -r __deployme/images/ ../server/form_builder_server/form_builder/static/css/images

# done
date; echo;

