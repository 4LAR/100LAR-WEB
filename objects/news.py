@app.route('/read_news')
def read_news():
    return render_template('news.txt')
