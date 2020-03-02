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
cp index.html __deployme/index.html
cp -r images/ __deployme/images/

# done
date; echo;

