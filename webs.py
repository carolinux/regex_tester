from flask import Flask
from flask import render_template
from flask import request
from flask import make_response

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('tester.html')
	
@app.route('/export', methods=['GET'])
def upload_file():

    if request.method == 'GET':
	  json = request.args.get('json', '')
	  resp = make_response(json) 
	  resp.headers["Content-Description"]= "File Transfer" 
          resp.headers["Content-Disposition"]='attachment; filename="export.json"'
	  return resp


if __name__ == "__main__":
   
    app.run()# call with arg debug=True for debugging
