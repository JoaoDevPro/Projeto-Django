# Generated by Django 5.1.2 on 2024-10-28 23:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0003_alter_risco_descricao'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuario',
            old_name='login',
            new_name='email',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='name',
        ),
        migrations.RemoveField(
            model_name='usuario',
            name='token',
        ),
    ]
