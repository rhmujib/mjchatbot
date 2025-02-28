# FAQ Chatbot

FAQ Chatbot
This project is a web-based FAQ chatbot application built using Flask. The chatbot is designed to assist users by providing responses to frequently asked questions. The application features a user-friendly interface where users can create multiple chat sessions and interact with the bot.

Features
Multiple Chat Sessions: Users can create and manage multiple chat sessions.
Dynamic Chat Interface: The chat interface dynamically updates with user inputs and bot responses.
Dark Mode Toggle: Users can switch between light and dark modes.
Persistent Chat Memory: Chat history is stored in the session to maintain context across interactions.
Technologies Used
Flask: A lightweight WSGI web application framework in Python.
HTML/CSS: For structuring and styling the web pages.
JavaScript: For handling dynamic content and user interactions.
Font Awesome: For icons used in the interface.
Setup Instructions
Clone the repository:

Install dependencies:

Run the application:

Open your browser and navigate to http://127.0.0.1:5000/ to interact with the chatbot.

File Structure
main.py: The main Flask application file.
templates/index.html: The HTML template for the chat interface.
static/css/styles.css: The CSS file for styling the chat interface.
static/js/scripts.js: The JavaScript file for handling dynamic content.
Future Enhancements
Natural Language Processing: Improve the chatbot's response accuracy using advanced NLP techniques.
User Authentication: Add user authentication to save chat history across sessions.
Database Integration: Store chat history in a database for persistent storage

## Project Structure

```
faq-chatbot
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── templates
│   │   └── index.html
│   ├── static
│   │   ├── css
│   │   │   └── styles.css
│   │   └── js
│   │       └── scripts.js
│   └── chatbot
│       ├── __init__.py
│       └── faq_bot.py
├── requirements.txt
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd faq-chatbot
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Usage

1. Run the application:
   ```
   python app/main.py
   ```

2. Open your web browser and go to `http://127.0.0.1:5000/` to access the chatbot interface.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.