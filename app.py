from flask import Flask, render_template, make_response, jsonify, request, abort
from pymongo import MongoClient
source = 'mongodb+srv://m220student:m220student@sandbox.dggb2.mongodb.net/test?authSource=admin&replicaSet=atlas-g3cnn4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
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
