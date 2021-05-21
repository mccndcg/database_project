from flask import Flask, render_template, make_response, jsonify, request, abort
from pymongo import MongoClient
source = 'mongodb+srv://mccndcg:ePRZiwIV5x3uU66Q@cluster0.spy9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = MongoClient(source)
db = client.testdb
collection = db.testcoll

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/fetchData', methods=('GET', 'POST'))
def find():
    query = request.get_json()
    print(query['query'])
    if query['query'].isnumeric():
        print('OK')
        fetchedData = collection.find_one({"student_number": int(query['query'])})
    else:
        try:
            print('enter here')
            fetchedData = collection.find_one({"name": query['query']})
            print(fetchedData)
        except:
            print('error')
    try:
        fetchedData.pop('_id')
        print(fetchedData)
        return make_response(jsonify(fetchedData), 200)
    except AttributeError:
        print('abortabort')
        return abort(404)

if __name__ == '__main__':
    app.run(debug=True)
