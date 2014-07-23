dz-zh-lentg.github.io
=====================
uglifyjs /home/doe/work/foo/src/js/file1.js \
         /home/doe/work/foo/src/js/file2.js \
         -o foo.min.js \
         --source-map foo.min.js.map \
         --source-map-root http://foo.com/src \
         -p 5 -c -m

cd web-en/js && uglifyjs angular.min.js angular-route.min.js ui-bootstrap-custom-tpls-0.10.0.min.js store.min.js app.js -o app.min.js