#
#   Stone Base
#       by 100LAR
#   last update 06.07.2021
#

# пока не используется 
# надо дорабатывать

import pickle
import os

path_base = 'users'
file_users_names = 'users' # users.pkl

# функции для сохранения классов
def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)

# класс пользователя
class Default_User():
    def __int__(self):
        self.name = "100LAR"

class User(UserMixin):
    def __int__(self):
        pass


user = User()
dict = {}

class Users():
    def __init__(self):
        self.index = 0
        self.name = []

    def is_active(self):
        return self.active

    def get_auth_token(self):
        return make_secure_token(self.username , key='secret_key')

if os.path.isfile(file_users_names + '.pkl'):
    users_list = load_obj(file_users_names)
else:
    users_list = Users()
    save_obj(users_list, file_users_names)

# класс для обращения к базе
class Base():
    def __init__(self):
        pass

    def get_index(self):
        return users_list.index

    def get_all_names(self):
        return users_list.name

    def get_name_by_id(self, id):
        try:
            return users_list.name[id]
        except:
            return False

    def get_id_by_name(self, name):
        try:
            return users_list.name.index(name)
        except:
            return False

    def delete_user(self, id):
        try:
            os.remove(path_base + '/' + str(id) + '.pkl')
            users_list.name[id] = False
            return True
        except:
            return False

    def new(self, name, variables):
        try:
            global user
            user = User()
            for v in variables:
                exec('user.' + (v if '=' in v else (v + ' = None') ) )

            #save_obj(user, path_base + '/' +  name)
            save_obj(user, path_base + '/' +  str(users_list.index))
            users_list.index += 1
            users_list.name.append(name)

            save_obj(users_list, file_users_names)
            return True

        except Exception as e:
            print(' [ ERROR(new): '+str(e)+' ] ')
            return False

    def get_user_variables(self, name):
        try:
            global user
            global dict

            dict = {}
            user = load_obj(path_base + '/' +  name)
            for v in dir(user):
                if '_' != v[0]:
                    exec('dict["' + v + '"] =  user.' + v + '')

            return dict

        except Exception as e:
            print(' [ ERROR(get_user_variables): '+str(e)+' ] ')
            return False

    def update_user_variables(self, name, variables):
        try:
            global user
            user = load_obj(path_base + '/' +  name)
            for v in variables:
                exec('user.' + (v if '=' in v else (v + ' = None') ) )

            save_obj(user, path_base + '/' +  name)
            return True

        except Exception as e:
            print(' [ ERROR(update_user_variables): '+str(e)+' ] ')
            return False


base = Base()

#base.new('100LAR', ['password'])
#print(base.get_user_variables('0'))
#base.update_user_variables('1', ['name = "loh"', 'lvl = 3'])
#print(base.get_user_variables('1'))

#print(base.get_name_by_id(0))
#print(base.delete_user(0))
#print(base.get_name_by_id(0))

#print(base.get_index())
#print(base.get_all_names())

'''
while True:
    command = input(' >> ')
    if command == 'files':
        for u in os.listdir(path=path_base):
            print(u)
'''
