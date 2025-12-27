import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

def create_admin():
    User = get_user_model()
    # Leemos los datos desde el panel de Render para no dejar contraseñas en GitHub
    username = os.environ.get('ADMIN_USERNAME', 'admin')
    email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
    password = os.environ.get('ADMIN_PASSWORD', 'admin1234') # Cambiala en Render

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"✅ Superusuario '{username}' creado exitosamente.")
    else:
        print(f"ℹ️ El superusuario '{username}' ya existe. Saltando paso.")

if __name__ == "__main__":
    create_admin()