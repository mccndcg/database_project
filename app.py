from flask import Flask, render_template, make_response, jsonify, request, abort, Response
from pymongo import MongoClient
from json import dumps
source = 'mongodb+srv://mccndcg:ePRZiwIV5x3uU66Q@cluster0.spy9n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
client = MongoClient(source)
db = client.testdb
collection = db.testcoll
violations = db.violations

app = Flask(__name__)

@app.route('/add_violation', methods=['POST'])
def add_violation():
    updateData = request.get_json()
    print(updateData)
    db.violations.insert_one({'name':updateData['name'], 'date':updateData['dates'], 'details':updateData['details'], 'infraction':updateData['infraction']})
    return Response(status='200')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/certificate')
def certificate():
    #details = request.get_json()
    return render_template('report.html')

@app.route('/maze/')
@app.route('/maze/<name>')
def maze(name=None):
    return render_template('maze.html', name=name)


@app.route('/fetchData', methods=('GET', 'POST'))
def find():
    query = request.get_json()
    if query['query'].isnumeric():
        fetchedData = collection.find_one({"student_number": int(query['query'])})
    else:
        fetchedData = collection.find_one({"name": query['query']})
    if fetchedData == None:
        return abort(404)
    else:
        fetchedData.pop('_id')
        violationsData = list(violations.find({"name": fetchedData['name']}))
        if violationsData:
            [(violationsData[idx].pop('_id'), violationsData[idx].pop('name')) for idx, val in enumerate(violationsData)]
            fetchedData['violations'] = violationsData
        print('fetched data is', dumps(fetchedData))
        return make_response(jsonify(fetchedData), 200)



if __name__ == '__main__':
    app.run(debug=True)
    #app.run()
