from flask_login import LoginManager , login_required , UserMixin , login_user, current_user, logout_user
#import pickle

from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
from PIL import Image

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

auth = HTTPBasicAuth()

def save_obj(obj, name ):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

def load_obj(name ):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)

def check_time():
    #return time.strftime("%Y-%m-%d", time.localtime())
    return time.strftime("%d.%m.%y", time.localtime())
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
