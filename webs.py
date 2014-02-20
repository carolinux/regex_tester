from flask import Flask
from flask import render_template
from flask import request
from flask import make_response
import sys

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
	
    if(sys.argv[1]=='-d'):
	debug=True
    else:
	debug=False
   
    app.run(debug=debug)# call with arg debug=True for debugging
