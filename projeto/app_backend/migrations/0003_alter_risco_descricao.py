# Generated by Django 5.1.2 on 2024-10-23 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0002_alter_risco_id_usuario_alter_solucao_id_piloto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='risco',
            name='descricao',
            field=models.CharField(max_length=255),
        ),
    ]