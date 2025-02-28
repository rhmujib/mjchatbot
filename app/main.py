from flask import Flask, render_template, request, jsonify, session
from chatbot.faq_bot import get_response

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    if 'chats' not in session:
        session['chats'] = {}
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_bot_response():
    user_input = request.form['user_input']
    chat_id = request.form['chat_id']
    chats = session.get('chats', {})
    chat_memory = chats.get(chat_id, {}).get('messages', [])
    response, chat_memory = get_response(user_input, chat_memory)
    chats[chat_id]['messages'] = chat_memory
    session['chats'] = chats
    return jsonify({'response': response, 'chat_memory': chat_memory})

@app.route('/new_chat', methods=['POST'])
def new_chat():
    chats = session.get('chats', {})
    new_chat_id = str(len(chats) + 1)
    chat_name = request.form.get('chat_name', f'Chat {new_chat_id}')
    chats[new_chat_id] = {'name': chat_name, 'messages': []}
    session['chats'] = chats
    return jsonify({'message': 'New chat started.', 'chat_id': new_chat_id, 'chat_name': chat_name})

@app.route('/load_chat/<chat_id>', methods=['GET'])
def load_chat(chat_id):
    chats = session.get('chats', {})
    chat_memory = chats.get(chat_id, {}).get('messages', [])
    return jsonify({'messages': chat_memory})

@app.route('/delete_chat/<chat_id>', methods=['DELETE'])
def delete_chat(chat_id):
    chats = session.get('chats', {})
    if chat_id in chats:
        del chats[chat_id]
        session['chats'] = chats
        return jsonify({'message': 'Chat deleted.'})
    return jsonify({'message': 'Chat not found.'}), 404

if __name__ == '__main__':
    app.run(debug=True)