import sqlite3
from pathlib import Path

from flask import Flask, abort, flash, redirect, render_template, request, send_from_directory, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.secret_key = "secret123"
BASE_DIR = Path(__file__).resolve().parent
REPORTS_DIR = BASE_DIR / "reports"
REPORTS_DIR.mkdir(exist_ok=True)
DATABASE_PATH = BASE_DIR / "feedforensix.db"

PLATFORM_DETAILS = {
    "instagram": {
        "name": "Instagram",
        "tagline": "Platform login",
        "description": "Enter the Instagram account credentials you already know to continue into the platform flow.",
        "logo": "/static/icons/instagram.svg",
        "external_url": "https://www.instagram.com/accounts/login/",
        "workspace_route": "/instagram",
    },
    "facebook": {
        "name": "Facebook",
        "tagline": "Platform login",
        "description": "Enter the Facebook account credentials you already know to continue into the platform flow.",
        "logo": "/static/icons/facebook.svg",
        "external_url": "https://www.facebook.com/login/",
        "workspace_route": None,
    },
    "x": {
        "name": "X / Twitter",
        "tagline": "Platform login",
        "description": "Enter the X account credentials you already know to continue into the platform flow.",
        "logo": "/static/icons/x.svg",
        "external_url": "https://x.com/i/flow/login",
        "workspace_route": None,
    },
    "youtube": {
        "name": "YouTube",
        "tagline": "Platform login",
        "description": "Enter the YouTube account credentials you already know to continue into the platform flow.",
        "logo": "/static/icons/youtube.svg",
        "external_url": "https://accounts.google.com/ServiceLogin?service=youtube",
        "workspace_route": None,
    },
    "telegram": {
        "name": "Telegram",
        "tagline": "Platform login",
        "description": "Enter the Telegram account credentials you already know to continue into the platform flow.",
        "logo": "/static/icons/telegram.svg",
        "external_url": "https://web.telegram.org/a/",
        "workspace_route": None,
    },
}


def get_db_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_database():
    with get_db_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        connection.commit()


def get_safe_path(path_value, default_path="/"):
    if not path_value:
        return default_path

    if not path_value.startswith("/") or path_value.startswith("//"):
        return default_path

    return path_value


def build_auth_redirect(origin_path, mode):
    safe_origin = get_safe_path(origin_path, "/")
    separator = "&" if "?" in safe_origin else "?"
    return f"{safe_origin}{separator}auth={mode}"


init_database()

# ---------------- HOME (LOGIN PAGE WITH POPUP) ----------------
@app.route('/')
def home():
    report_files = sorted(
        [path.name for path in REPORTS_DIR.iterdir() if path.is_file()],
        reverse=True,
    )
    return render_template(
        'home.html',
        report_files=report_files,
        auth_mode=request.args.get('auth', ''),
    )


@app.route('/platforms/<platform_key>')
def platform_page(platform_key):
    platform = PLATFORM_DETAILS.get(platform_key)

    if not platform:
        abort(404)

    return render_template(
        'platform.html',
        platform=platform,
        auth_mode=request.args.get('auth', ''),
        platform_account=session.get(f'{platform_key}_account'),
    )


@app.route('/platforms/<platform_key>/login', methods=['POST'])
def platform_login(platform_key):
    platform = PLATFORM_DETAILS.get(platform_key)

    if not platform:
        abort(404)

    account_name = request.form.get('platform_username', '').strip()
    password = request.form.get('platform_password', '')

    if not account_name or not password:
        flash(f'Enter the {platform["name"]} username/email and password.', 'error')
        return redirect(url_for('platform_page', platform_key=platform_key))

    session[f'{platform_key}_account'] = account_name
    return redirect(platform.get('external_url') or url_for('platform_page', platform_key=platform_key))

# ---------------- LOGIN ----------------
@app.route('/login', methods=['POST'])
def login():
    identifier = request.form.get('username', '').strip()
    password = request.form.get('password', '')
    next_path = get_safe_path(request.form.get('next'), '/dashboard')
    origin_path = get_safe_path(request.form.get('origin'), '/')

    if not identifier or not password:
        flash('Enter your username or email and password.', 'error')
        return redirect(build_auth_redirect(origin_path, 'login'))

    with get_db_connection() as connection:
        user = connection.execute(
            """
            SELECT id, name, email, username, password_hash
            FROM users
            WHERE username = ? OR email = ?
            """,
            (identifier, identifier),
        ).fetchone()

    if not user or not check_password_hash(user['password_hash'], password):
        flash('Invalid username, email, or password.', 'error')
        return redirect(build_auth_redirect(origin_path, 'login'))

    session['user'] = user['username']
    session['name'] = user['name']
    return redirect(next_path)

# ---------------- REGISTER ----------------
@app.route('/do_register', methods=['POST'])
def do_register():
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    username = request.form.get('username', '').strip()
    password = request.form.get('password', '')
    origin_path = get_safe_path(request.form.get('origin'), '/')

    if not name or not email or not username or not password:
        flash('Fill in all registration fields.', 'error')
        return redirect(build_auth_redirect(origin_path, 'register'))

    if len(password) < 6:
        flash('Password must be at least 6 characters long.', 'error')
        return redirect(build_auth_redirect(origin_path, 'register'))

    try:
        with get_db_connection() as connection:
            connection.execute(
                """
                INSERT INTO users (name, email, username, password_hash)
                VALUES (?, ?, ?, ?)
                """,
                (name, email, username, generate_password_hash(password)),
            )
            connection.commit()
    except sqlite3.IntegrityError:
        flash('That username or email is already registered.', 'error')
        return redirect(build_auth_redirect(origin_path, 'register'))

    flash('Registration successful. You can now log in.', 'success')
    return redirect(build_auth_redirect(origin_path, 'login'))


@app.route('/reports/<path:filename>')
def download_report(filename):
    safe_name = Path(filename).name
    file_path = REPORTS_DIR / safe_name

    if not file_path.exists() or not file_path.is_file():
        abort(404)

    return send_from_directory(REPORTS_DIR, safe_name, as_attachment=True)

# ---------------- DASHBOARD ----------------
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect('/')
    return render_template('dashboard.html')

# ---------------- INSTAGRAM ----------------
@app.route('/instagram')
def instagram():
    if 'user' not in session:
        return redirect('/')
    return render_template('instagram.html')

# ---------------- LOGOUT ----------------
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)