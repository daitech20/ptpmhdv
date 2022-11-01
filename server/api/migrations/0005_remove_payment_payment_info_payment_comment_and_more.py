# Generated by Django 4.1.1 on 2022-11-01 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_checkout_payment_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='payment_info',
        ),
        migrations.AddField(
            model_name='payment',
            name='comment',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='payment',
            name='partnerName',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
