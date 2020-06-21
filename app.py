from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('backtracking.html')

@app.route('/dijkstra')
def dijkstra():
    return render_template('dijkstra.html')

if __name__ == "__main__":
    app.run(debug=True)