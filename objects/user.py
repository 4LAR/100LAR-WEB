# всё древние как говно мамонта



class User(UserMixin):
    def __init__(self , username , password , id, lvl, scoins, inventory, info, news, other, mail, sent_mail, friends, chats, apps, active=True):
        self.id = id                # личный индификатор пользователя
        self.info = info            # информация о пользователе (ip, и другая ересь)
        self.sent_mail = sent_mail  # - отправленные сообщения
        self.mail = mail            # полученные сообщения
        self.other = other          # для будущих обновлений
        self.username = username    # имя пользователя
        self.password = password    # пароль пользователя
        self.lvl = lvl              # уровень доступа
        self.inventory = inventory  # инвентарь
        self.news = news            # личный список новостей
        self.friends = friends      # - список друзей
        self.chats = chats          # - список чатов
        self.apps = apps            # - сохранения в приложениях
        self.scoins = scoins        # кошелёк
        self.active = active

    def get_id(self):
        return self.id

    def get_lvl(self):
        return self.lvl

    def is_active(self):
        return self.active

    def get_auth_token(self):
        return make_secure_token(self.username , key='secret_key')

class UsersRepository:
    def __init__(self):

        try:
            self.users = load_obj('users')
        except:
            self.users = dict()
            save_obj(self.users, 'users' )

        try:
            self.users_id_dict = load_obj('users_id')
        except:
            self.users_id_dict = dict()
            save_obj(self.users_id_dict, 'users_id' )

        if not os.path.exists("identifier.txt"):
            f = open("identifier.txt", "w")
            f.write("0")
            f.close()

        f = open("identifier.txt", "r")
        self.identifier = int(f.read())
        f.close()

    def save_user(self, user):
        self.users_id_dict.setdefault(user.id, user)
        self.users.setdefault(user.username, user)

        save_obj(self.users_id_dict, 'users_id' )
        save_obj(self.users, 'users' )

    def update_user(self, old_user, new_user):
        self.users_id_dict.pop(old_user.id, None)
        self.users.pop(old_user.username, None)

        self.users_id_dict.setdefault(new_user.id, new_user)
        self.users.setdefault(new_user.username, new_user)

        save_obj(self.users_id_dict, 'users_id' )
        save_obj(self.users, 'users' )

    #def update_user_by_id(self, id, item):


    def get_user(self, username):
        return self.users.get(username)

    def get_user_by_id(self, userid):
        return self.users_id_dict.get(userid)

    def next_index(self):
        self.identifier +=1
        f = open("identifier.txt", "w")
        f.write(str(self.identifier))
        f.close()
        return self.identifier

users_repository = UsersRepository()

@app.route('/update_password',methods=['POST', 'GET', 'OPTIONS'])
@login_required
def update_password():
    old_pass = request.args.get("old_pass", "")
    new_pass = request.args.get("new_pass", "")
    new_pass_rep = request.args.get("new_pass_rep", "")
    #update_user_pass = users_repository.get_user(current_user.username)
    if (old_pass == current_user.password) and (new_pass == new_pass_rep):
        old_user = User(current_user.username , current_user.password , current_user.id,  current_user.lvl, current_user.scoins, current_user.inventory, current_user.info, current_user.news, current_user.other, current_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
        new_user = User(current_user.username , str(new_pass) , current_user.id,  current_user.lvl, current_user.scoins, current_user.inventory, current_user.info, current_user.news, current_user.other, current_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
        users_repository.update_user(old_user, new_user)
        logout_user()
        login_user(new_user, remember=True)
        return 'OK'
    else:
        return 'ERROR'

@app.route('/update_name',methods=['POST', 'GET', 'OPTIONS'])
@login_required
def update_name():
    name = request.args.get("name", "")
    #update_user_pass = users_repository.get_user(current_user.username)
    simv = '|\/.,?<>{}%#@^&*: '
    ok = True
    for s in simv:
        if s in name:
            ok = False
            break
    if ok:
        if users_repository.get_user(name) is None:
            if (len(name) >= 6):
                old_user = User(current_user.username , current_user.password , current_user.id,  current_user.lvl, current_user.scoins, current_user.inventory, current_user.info, current_user.news, current_user.other, current_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
                new_user = User(name , current_user.password , current_user.id,  current_user.lvl, current_user.scoins, current_user.inventory, current_user.info, current_user.news, current_user.other, current_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
                users_repository.update_user(old_user, new_user)
                logout_user()
                login_user(new_user, remember=True)
                return 'OK'
            else:
                return 'ERROR USERNAME'
        else:
            return 'ERROR'
    else:
        return 'ERROR USERNAME S'

@app.route('/check_users',methods=['POST', 'GET', 'OPTIONS'])
@auth.login_required
def check_users():
    f = open("identifier.txt", "r")
    kol = int(f.read())
    f.close()
    names = ''
    for id in range(1,kol+1):
        names += str(id) + ':' + users_repository.get_user_by_id(id).username + ':' + str(users_repository.get_user_by_id(id).password) + ':' + str(users_repository.get_user_by_id(id).lvl) + ':' + str(users_repository.get_user_by_id(id).scoins) + '\n'
        print(str(id) + ':' + users_repository.get_user_by_id(id).username + ':' + str(users_repository.get_user_by_id(id).password) + ':' + str(users_repository.get_user_by_id(id).lvl) + ':' + str(users_repository.get_user_by_id(id).scoins))
    f = open("users.txt", "w")
    f.write(names)
    f.close()
    return 'NOPE'

@app.route('/send_scoin',methods=['POST', 'GET', 'OPTIONS'])
@login_required
def send_scoin():
    try:
        name = request.args.get("name", "")
        sum = request.args.get("sum", "")
        #update_user_pass = users_repository.get_user(current_user.username)
        if not(users_repository.get_user_by_id(int(name)) is None):
            if (int(sum) > 0):
                if (int(current_user.scoins) >= int(sum)):
                    old_user = User(current_user.username , current_user.password , current_user.id,  current_user.lvl, current_user.scoins, current_user.inventory, current_user.info, current_user.news, current_user.other, current_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
                    new_user = User(current_user.username , current_user.password , current_user.id,  current_user.lvl, current_user.scoins - int(sum), current_user.inventory, current_user.info, current_user.news, current_user.other, current_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
                    users_repository.update_user(old_user, new_user)
                    #logout_user()
                    #login_user(new_user)

                    scoin_user = users_repository.get_user_by_id(int(name))
                    old_user = User(scoin_user.username , scoin_user.password , scoin_user.id,  scoin_user.lvl, scoin_user.scoins, scoin_user.inventory, scoin_user.info, scoin_user.news, scoin_user.other, scoin_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
                    new_user = User(scoin_user.username , scoin_user.password , scoin_user.id,  scoin_user.lvl, scoin_user.scoins + int(sum), scoin_user.inventory, scoin_user.info, scoin_user.news, scoin_user.other, scoin_user.mail, current_user.sent_mail, current_user.friends, current_user.chats, current_user.apps)
                    users_repository.update_user(old_user, new_user)

                    return str(scoin_user.username)
                else:
                    return 'ERROR SCOIN'
            else:
                return 'ERROR SUM'
        else:
            return 'ERROR ID'
    except:
        return 'FATAL ERROR'

@app.route('/user_info')
@login_required
def home():
    return str(current_user.id) + '\n' + current_user.username + '\n' + str(current_user.lvl) + '\n' + str(current_user.scoins) + '\n' + str(current_user.password) + '\n' + str(current_user.inventory)

@app.route('/user_inventory')
@login_required
def user_inventory():
    items = ''
    print(current_user.inventory)
    for i in range(len(current_user.inventory)):
        items += str(current_user.inventory[i]) + '\n'
    return items

@app.route("/logout", methods=['GET' , 'POST'])
@login_required
def logout():
    logout_user()
    return 'ok'

@app.route('/login' , methods=['GET' , 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        #print('username')
        password = request.form['password']
        #print('password')
        registeredUser = users_repository.get_user(username)
        if registeredUser != None and registeredUser.password == password:
            print(username + ' Logged in..')
            login_user(registeredUser, remember=True)
            #return redirect(url_for('index'))
            return 'OK'
        else:
            return 'ERROR LOGIN'
    else:

        return 'ERROR'

        #return redirect(url_for('index')) #test

@app.route('/register' , methods = ['GET' , 'POST'])
def register_post():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        password_replay = request.form['password_replay']

        simv = '|\/.,?<>{}%#@^&*: '
        ok = True
        for s in simv:
            if s in username:
                ok = False
                break
        if ok:
            check_user = users_repository.get_user(username)
            if check_user is None:
                if (password == password_replay) and (len(password) > 0):
                    if (len(username) >= 6):
                        new_user = User(username , password , users_repository.next_index(), 1, 0, [[],[]], '', [], [], [], [], [], [], [])
                        users_repository.save_user(new_user)
                        registeredUser = users_repository.get_user(username)
                        login_user(registeredUser, remember=True)
                        return 'OK'
                    else:
                        return 'ERROR USERNAME'
                else:
                    #return render_template('register.html')
                    #pass
                    return 'ERROR PASSWORD'
            else:
                return 'ERROR REGISTER'
        else:
            return 'ERROR USERNAME S'
    else:
        return 'ERROR'

#MAX_FILE_ICON_SIZE = 1024 * 1024 + 1
formats_icons = ['png', 'jpg', 'jpeg', 'gif']
@app.route('/upload_icon_file', methods=['POST', 'GET'])
@login_required
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        #f_bytes = f.read(MAX_FILE_ICON_SIZE)
        #if not (len(f_bytes) == MAX_FILE_ICON_SIZE):
        #im = Image.open(file)
        print(file)
        file.save('static/users_icons/'+str(current_user.id)+'.png')
        try:
            im = Image.open(file)

            if not ((im.format).lower() in formats_icons):
                os.remove('static/users_icons/'+str(current_user.id)+'.png')
        except:
            os.remove('static/users_icons/'+str(current_user.id)+'.png')
        #print(im)
        #im.save('static/users_icons/'+str(current_user.id)+'.png', im.format)
        return 'OK'
        #else:
        #    return 'ERROR SIZE'

    else:
        return 'ERROR'

@app.route('/get_name_by_id',methods=['POST', 'GET', 'OPTIONS'])
#@auth.login_required
def get_name_by_id():
    id = request.args.get("id", "")
    current_user_i = users_repository.get_user_by_id(int(id))
    if not (current_user_i is None):
        return str(current_user_i.username)
    else:
        return 'ERROR'

@app.route('/current_user_info',methods=['POST', 'GET', 'OPTIONS'])
#@auth.login_required
@login_required
def current_user_info():
    if current_user.lvl > 5:
        name = request.args.get("name", "")
        current_user_g = users_repository.get_user(name)
        if not (current_user is None):
            return str(current_user_g.id) + '\n' + current_user_g.username + '\n' + str(current_user_g.lvl) + '\n' + str(current_user_g.scoins) + '\n' + str(current_user_g.password) + '\n' + str(current_user_g.password)
        else:
            return 'ERROR'

@app.route('/user' , methods = ['GET' , 'POST'])
def user_cabinet():
    if request.method == 'POST':
        username = request.form['username']
        check_user = users_repository.get_user(username)
        if not (check_user is None):
            pass
        else:
            return redirect(url_for('home'))
    else:
        return redirect(url_for('home'))

@app.route('/current_user_info_name',methods=['POST', 'GET', 'OPTIONS'])
#@auth.login_required
def current_user_info_name():
    name = request.args.get("name", "")
    current_user_i = users_repository.get_user(name)
    if not (current_user is None):
        return str(current_user_i.id) + '\n' + current_user_i.username + '\n' + str(current_user_i.lvl) + '\n' + str(current_user_i.scoins)
    else:
        return 'ERROR'

# callback to reload the user object
@login_manager.user_loader
def load_user(userid):
    return users_repository.get_user_by_id(userid)