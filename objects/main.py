@app.route('/')
def index():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/m-main')
def m_main():
    return render_template('m_main.html')

@app.errorhandler(404)
def page_not_found(e):
    return 'ERROR NF'
