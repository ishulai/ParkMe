# Computer Vision (OpenCV) - Matthew Tang

## Files
* contours - Main file. Uses opencv to find open curbs (parking spots).
	* Note: Files must be <1MB ish to upload properly.
* Flask:
	* app.py - config
	* uploader.py - Flask server to upload images
* Legacy:
	* camera.py - Live feed of webcam for opencv
	* frames.py - Extract frames of an mp4 video for opencv
	* server.py - basic server, for preliminary testing
	* cv.txt - Example bounding boxes for cars from Google Cloud Vision API
	* a-d.jpg - Example pics taken using phone of laptop playing footage
	* 1-6.jpg - Still photos
	* frame#.jpg - Frames from sped.mp4
	
## Server Deployment

`lt --port 5000 --subdomain parkme`
Domain: https://parkme.localtunnel.me