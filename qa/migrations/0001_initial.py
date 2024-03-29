# Generated by Django 4.0.4 on 2022-09-03 20:57

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('created', models.CharField(max_length=100)),
                ('updated', models.CharField(max_length=100)),
                ('vote', models.IntegerField(verbose_name=0)),
            ],
        ),
        migrations.CreateModel(
            name='NewUser',
            fields=[
                ('id_token', models.CharField(max_length=150, primary_key=True, serialize=False, unique=True)),
                ('username', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('image', models.CharField(max_length=150)),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('about', models.TextField(default='About the User', max_length=500, verbose_name='about')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('reputation', models.IntegerField(default=0)),
                ('votes', models.IntegerField(default=0)),
                ('edits', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('body', models.TextField()),
                ('created', models.CharField(max_length=100)),
                ('updated', models.CharField(max_length=100)),
                ('vote', models.IntegerField(verbose_name=0)),
                ('n_answers', models.IntegerField(default=0)),
                ('n_views', models.IntegerField(default=0)),
                ('time', models.IntegerField(default=0)),
                ('bountied', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qa.newuser')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField()),
                ('created', models.CharField(max_length=100)),
                ('updated', models.CharField(max_length=100)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qa.answer')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qa.newuser')),
            ],
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qa.question'),
        ),
        migrations.AddField(
            model_name='answer',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qa.newuser'),
        ),
    ]
