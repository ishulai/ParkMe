import os
#import magic
import urllib2
from app import app
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename
from contours import ContourFinder
from flask import jsonify
import re
import cStringIO
from io import BytesIO
from PIL import Image
import base64

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
	
@app.route('/')
def upload_form():
	return render_template('upload.html')

@app.route('/', methods=['POST'])
def upload_file():
	if request.method == 'POST':
        # check if the post request has the file part
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			flash('No file selected for uploading')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			cf = ContourFinder()
			ans = cf.runLive(filename)
			flash(filename + " has " + str(ans))
			results = {"-1": "left", "0": "none", "1": "right"}
			return jsonify({"result": results[str(ans)]})
		else:
			flash('Allowed file types are txt, pdf, png, jpg, jpeg, gif')
			return redirect(request.url)

@app.route('/b64', methods=['POST'])
def upload_b():
	if request.method == 'POST':
        # check if the post request has the file part
                content = request.get_json()
		content = content["image"]
		image_data = re.sub('^data:image/.+;base64,', '', content).decode('base64')
                file = Image.open(cStringIO.StringIO(image_data))
		if file:
                        name = "received.jpg"
                        file.save(name)
                        #with open("received.png", "wb") as fh:
                        #    fh.write(base64.b64decode(image_data))
                        #filename = "received.png"
			filename = secure_filename(name)
			#file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			cf = ContourFinder()
			ans = cf.runLive(filename)
			flash(filename + " has " + str(ans))
			results = {"-1": "left", "0": "none", "1": "right"}
			return jsonify({"result": results[str(ans)]})
		else:
			flash('Allowed file types are txt, pdf, png, jpg, jpeg, gif')
			return redirect(request.url)

if __name__ == "__main__":
    app.run()
