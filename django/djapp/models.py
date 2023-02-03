from django.db import models
from django.core.validators import MinLengthValidator
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.postgres.fields import ArrayField


class Wallets(models.Model):
  username = models.CharField(max_length=255, primary_key=True)
  key = models.CharField(max_length=255)

class Nodes(models.Model):
  uri = models.CharField(max_length=255, primary_key=True)
  username = models.CharField(max_length=255)
  x = models.FloatField()
  y = models.FloatField()

class NFTs(models.Model):
  id = models.IntegerField(primary_key=True)
  name = models.CharField(max_length=255, blank=False)
  image = models.CharField(max_length=255, blank=False)
  power = models.IntegerField(blank=False)

class NFTsOnSale(models.Model):
  id = models.IntegerField(primary_key=True)
  name = models.CharField(max_length=255, blank=False)
  image = models.CharField(max_length=255, blank=False)
  power = models.IntegerField(blank=False)
  price = models.IntegerField(blank=False)

class Points(models.Model):
  address = models.CharField(max_length=42, validators=[MinLengthValidator(42)], primary_key=True)
  point = models.IntegerField(blank=False)

class NFTRewards(models.Model):
  address = models.CharField(max_length=42, validators=[MinLengthValidator(42)], primary_key=True)
  ids = ArrayField(models.IntegerField())

class WaitingShilaRequests(models.Model):
  address = models.CharField(max_length=42, validators=[MinLengthValidator(42)], primary_key=True)
  point = models.IntegerField(blank=False)

class NFTsInFight(models.Model):
  exowner = models.CharField(max_length=42, validators=[MinLengthValidator(42)], primary_key=True)
  id = models.IntegerField(blank=False)
  name = models.CharField(max_length=255, blank=False)
  image = models.CharField(max_length=255, blank=False)
  power = models.IntegerField(blank=False)
  
class NFTsFightData(models.Model):
  address = models.CharField(max_length=42, validators=[MinLengthValidator(42)], primary_key=True)
  idF = models.IntegerField(blank=False)
  idS = models.IntegerField(blank=False)
  strikes = ArrayField(models.IntegerField())
  firstAttacking = models.IntegerField(validators=[MaxValueValidator(1), MinValueValidator(0)])
  message = models.CharField(max_length=255, blank=False)

  
