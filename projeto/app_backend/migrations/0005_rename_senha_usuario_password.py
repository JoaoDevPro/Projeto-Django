# Generated by Django 5.1.2 on 2024-10-29 00:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0004_rename_login_usuario_email_remove_usuario_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuario',
            old_name='senha',
            new_name='password',
        ),
    ]
