from django.http import HttpResponse
from django.core import serializers
from djapp.models import Points, WaitingShilaRequests, NFTs, NFTsOnSale, NFTsInFight, NFTRewards, NFTsFightData
from djapp.settings import AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET, REGION_NAME
from django.core.files.storage import FileSystemStorage
import json
import random
import requests
import math
import boto3

def getShilaPoint(request): 
    try:
        if request.method == "POST": 
            params = json.loads(request.body) 
            user = Points.objects.raw("SELECT * FROM djapp_points WHERE djapp_points.address = '%s'" % params['address'])
            amount = 0  
            if user:
                amount = user[0].point 

            return HttpResponse(json.dumps({"amount": amount})) 
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500) 

def updateShilaPoint(request): 
    try:
        if request.method == "PUT": 
            params = json.loads(request.body) 
            user = Points.objects.raw("SELECT * FROM djapp_points WHERE djapp_points.address = '%s'" % params['address'])
            if user:
                user[0].point += params['point']
                user[0].save()
            else:
                newUser = Points(address=params['address'], point=params['point']) 
                newUser.save()

            return HttpResponse()
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except:
        return HttpResponse()

def requestShilaCoin(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body) 
            user = Points.objects.raw("SELECT * FROM djapp_points WHERE djapp_points.address = '%s'" % params['address'])
            if not(user) or not(user[0].point): 
                return HttpResponse({"You don't have Shila Point."})
            else:
                point = user[0].point
                user[0].point = 0
                user[0].save()

                user = WaitingShilaRequests.objects.raw("SELECT * FROM djapp_waitingshilarequests WHERE djapp_waitingshilarequests.address = '%s'" % params['address'])
                if user:
                    user[0].point += point 
                    user[0].save()
                else:
                    newUser = WaitingShilaRequests(address=params['address'], point=point)
                    newUser.save()

                return HttpResponse({"Shila point is updated."})
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def approveRequest(request): 
    try:
        if request.method == "GET":
            user = WaitingShilaRequests.objects.raw("SELECT TOP 1 * FROM djapp_waitingShilaRequests")
            if user:
                return HttpResponse(json.dumps({"status": True, "point": user[0].point, "address": user[0].address})) 
            else:
                return HttpResponse(json.dumps({"status": False, "message": "There are no request waiting."})) 
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is GET."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def registerNewNFT(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body) 
            user = Points.objects.raw("SELECT * FROM djapp_points WHERE djapp_points.address = '%s'" % params['address'])
            point = 1
            if user:
                point = 1 if user[0].point == 0 else user[0].point
                user[0].point = 0
                user[0].save()

            power = int(100 + math.log(point) * (random.randint(0,9) + 50))
            newNFT = NFTs(id=params['NFTId'], name=params['NFTName'], image=params['NFTImage'], power=power)
            newNFT.save()
            return HttpResponse({"NFT registered successfully."})
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def saveNFTImage(request): 
    try:
        if request.method == "POST":
            myfile = request.FILES['image']
            session = boto3.session.Session(aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY, region_name=REGION_NAME)
            s3 = session.resource('s3')
            s3.Bucket(S3_BUCKET).put_object(Key=myfile.name, Body=myfile)
            return HttpResponse()
    except:
        return HttpResponse()

def showNFTs(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body)
            Ids = params["Ids"]
            NFTsModel = NFTs.objects.filter(pk__in=Ids) 
            NFTstoShow = serializers.serialize('json', NFTsModel)
            return HttpResponse({NFTstoShow})
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def getNFTsOnSale(request): 
    try:
        if request.method == "GET":
            NFTsOnSaleModel = NFTsOnSale.objects.raw("SELECT * FROM djapp_nftsonsale")
            NFTsOnTheSale = serializers.serialize('json', NFTsOnSaleModel)
            return HttpResponse({NFTsOnTheSale})
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is GET."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def sellNFT(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body) 
            NFT = NFTs.objects.raw("SELECT * FROM djapp_NFTs WHERE djapp_NFTs.id = '%s'" % params['NFTId'])
            newNFTOnSale = NFTsOnSale(id=params['NFTId'], name=NFT[0].name, image=NFT[0].image, power=NFT[0].power, price=params['price'])
            newNFTOnSale.save()
            return HttpResponse({"your NFT is on sale."})
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def finishSale(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body) 
            NFT = NFTsOnSale.objects.get(id=params['NFTId'])
            NFT.delete()
            return HttpResponse({"your bought NFT successfully."})
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)

def fightNFT(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body)  
            NFTinFight = NFTsInFight.objects.raw("SELECT * FROM djapp_nftsinfight LIMIT 1")
            if not(NFTinFight):
                NFTForAttributes = NFTs.objects.filter(pk=params['NFTId'])
                newNFTinFight = NFTsInFight(exowner=params['owner'], id=NFTForAttributes[0].id, name=NFTForAttributes[0].name, image=NFTForAttributes[0].image, power=NFTForAttributes[0].power)
                newNFTinFight.save()
                return HttpResponse(json.dumps({"status": False, "message": "Your NFT is waiting opponent."})) 
            else:
                NFTIdF = NFTinFight[0].id
                NFTIdS = int(params['NFTId'])
                NFTF = NFTs.objects.filter(pk=NFTIdF)
                NFTS = NFTs.objects.filter(pk=NFTIdS)
                powerF = NFTF[0].power
                powerS = NFTS[0].power
                ownerF = NFTinFight[0].exowner
                ownerS = params['owner']
                NFTinFight[0].delete()

                hpF = 1000
                hpS = 1000
                strikes = []
                attacking = random.randint(0,1)
                firstAttacking = attacking
                while hpF>0 and hpS>0:
                    if attacking == 0:
                        strike = int(powerF*math.log10(random.randint(10,1000)))
                        strikes.append(strike)
                        hpS -= strike
                    else:
                        strike = int(powerF*math.log10(random.randint(10,1000)))
                        strikes.append(strike)
                        hpF -= strike
                    attacking = 1 - attacking

                #If first NFT's hp is less than 0, then second client won the fight.
                if hpF<=0:
                    #Rewards data for contract owner to send.
                    NFTIds = [NFTIdF, NFTIdS]
                    userRewards = NFTRewards.objects.raw("SELECT * FROM djapp_nftrewards WHERE djapp_nftrewards.address = '%s'" % ownerS)
                    if userRewards:
                        ids = userRewards[0].ids
                        for NFTId in ids:
                            NFTIds.append(NFTId)
                        userRewards[0].ids = NFTIds
                        userRewards[0].save()
                    else:
                        newWinner = NFTRewards(address=ownerS, ids=NFTIds)
                        newWinner.save()

                    #Fight data to show client.
                    fightData = NFTsFightData(address=ownerF, idF=NFTIdF, idS=NFTIdS, strikes=strikes, firstAttacking=firstAttacking, message="You lost the game")
                    fightData.save()

                    NFTF_ = serializers.serialize('json', NFTF)
                    NFTS_ = serializers.serialize('json', NFTS)
                    return HttpResponse(json.dumps({"status": True, "message": "You win the game", "strikes": strikes, "firstNFT": NFTF_, "secondNFT": NFTS_, "firstAttacking": firstAttacking }))
                else:
                    NFTIds = [NFTIdF, NFTIdS]
                    userRewards = NFTRewards.objects.raw("SELECT * FROM djapp_nftrewards WHERE djapp_nftrewards.address = '%s'" % ownerF)
                    if userRewards:
                        ids = userRewards[0].ids
                        for NFTId in ids:
                            NFTIds.append(NFTId)
                        userRewards[0].ids = NFTIds
                        userRewards[0].save()
                    else:
                        newWinner = NFTRewards(address=ownerF, ids=NFTIds)
                        newWinner.save()

                    fightData = NFTsFightData(address=ownerF, idF=NFTIdF, idS=NFTIdS, strikes=strikes, firstAttacking=firstAttacking, message="You win the game")
                    fightData.save()

                    NFTF_ = serializers.serialize('json', NFTF)
                    NFTS_ = serializers.serialize('json', NFTS)
                    return HttpResponse(json.dumps({"status": True, "message": "You lost the game", "strikes": strikes, "firstNFT": NFTF_, "secondNFT": NFTS_, "firstAttacking": firstAttacking}))
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)  

def getWaitingNFT(request): 
    try:
        if request.method == "POST":
            params = json.loads(request.body)  
            NFTModel = NFTsInFight.objects.raw("SELECT * FROM djapp_nftsinfight WHERE djapp_nftsinfight.exowner = '%s'" % params['owner'])
            if NFTModel:
                NFT = serializers.serialize('json', NFTModel)
                return HttpResponse(json.dumps({"status": True, "NFT": NFT})) 
            else:
                return HttpResponse(json.dumps({"status": False})) 
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)  

def getFightData(request):
    try:
        if request.method == "POST": 
            params = json.loads(request.body)  
            fightData = NFTsFightData.objects.raw("SELECT * FROM djapp_nftsfightdata WHERE djapp_nftsfightdata.address = '%s'" % params['owner'])
            if fightData:
                data = fightData[0]
                fightData[0].delete()
                NFTF = NFTs.objects.filter(pk=data.idF)
                NFTS = NFTs.objects.filter(pk=data.idS)
                NFTF_ = serializers.serialize('json', NFTF)
                NFTS_ = serializers.serialize('json', NFTS)
                return HttpResponse(json.dumps({"status": True, "message": data.message, "strikes": data.strikes, "firstNFT": NFTF_, "secondNFT": NFTS_, "firstAttacking": data.firstAttacking}))
            else:
                return HttpResponse(json.dumps({"status": False}))
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)  

def getWaitingRewards(request):  
    try:
        if request.method == "POST":
            params = json.loads(request.body)  
            rewards = NFTRewards.objects.raw("SELECT * FROM djapp_nftrewards WHERE djapp_nftrewards.address = '%s'" % params['owner'])
            if rewards:
                length = len(rewards[0].ids)
                message = "Your waiting rewards : " + str(length) + " NFT and " + str(length*0.095) + " Ethereum."
            else: 
                message = "Your waiting rewards : non"

            return HttpResponse({message}) 
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is POST."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)  

def getWaitingRewardsToSend(request):  
    try:
        if request.method == "GET": 
            NFTsWaitingToSend = NFTRewards.objects.raw("SELECT * FROM djapp_nftrewards")
            if NFTsWaitingToSend:
                ids = NFTsWaitingToSend[0].ids
                winner = NFTsWaitingToSend[0].address
                NFTsWaitingToSend[0].delete()
                return HttpResponse(json.dumps({"status": True, "NFTsWaitingToSend": ids, "winner": winner, "left": len(NFTsWaitingToSend)-1})) 
                
            else:
                return HttpResponse(json.dumps({"status": False, "message": "There are no waiting rewards."})) 
        else:
            return HttpResponse({"Http method "+request.method+" is not allowed. Accepted method is GET."}, status=405)
    except Exception as e:
        error = str(e)
        return HttpResponse({error}, status=500)  
