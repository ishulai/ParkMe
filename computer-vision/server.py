import flask

def create_app(test_config=None):
    app = flask.Flask(__name__, instance_relative_config=True)

    @app.route('/', methods = ['GET', 'POST'])
    def detect():
        f = flask.request.files['file']
        f.save(secure_filename(f.filename))
        return "Image Uploaded Successfully"

    app.run(host="localhost")

create_app()
