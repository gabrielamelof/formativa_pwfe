# Generated by Django 5.2 on 2025-06-17 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_usuario_ni'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='tipo',
            field=models.CharField(choices=[('G', 'Gestor'), ('P', 'Professor')], max_length=1),
        ),
    ]
