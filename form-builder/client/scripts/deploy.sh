# cleanup last version
rm -rf __deployme
mkdir __deployme

# build
sh scripts/build.sh

# minify js
uglify -s form_builder_app_bundle.js -o __deployme/form_builder_app_bundle.js
uglify -s submissions_app_bundle.js -o __deployme/submissions_app_bundle.js
uglify -s submit_app_bundle.js -o __deployme/submit_app_bundle.js

# minify css
cssshrink bundle.css > __deployme/bundle.css

# copy html and images
cp form_builder_app.html __deployme/form_builder_app.html
cp submissions_app.html __deployme/submissions_app.html
cp submit_app.html __deployme/submit_app.html
cp -r images/ __deployme/images/

# move deploy to server
cp __deployme/form_builder_app.html ../server/form_builder_server/form_builder/templates/form_builder_app.html
cp __deployme/submissions_app.html ../server/form_builder_server/form_builder/templates/submissions_app.html
cp __deployme/submit_app.html ../server/form_builder_server/form_builder/templates/submit_app.html
cp __deployme/form_builder_app_bundle.js ../server/form_builder_server/form_builder/static/js/form_builder_app_bundle.js
cp __deployme/submissions_app_bundle.js ../server/form_builder_server/form_builder/static/js/submissions_app_bundle.js
cp __deployme/submit_app_bundle.js ../server/form_builder_server/form_builder/static/js/submit_app_bundle.js
cp __deployme/bundle.css ../server/form_builder_server/form_builder/static/css/bundle.css
cp __deployme/images/ ../server/form_builder_server/form_builder/static/images

# done
date; echo;

