from django.urls import path
from . import views


urlpatterns = [ 
    path('get-shila-point', views.getShilaPoint, name='getShilaPoint'),
    path('update-shila-point', views.updateShilaPoint, name='updateShilaPoint'),
    path('request-shila-coin', views.requestShilaCoin, name='requestShilaCoin'),
    path('approve-request', views.approveRequest, name='approveRequest'),
    path('register-new-nft', views.registerNewNFT, name='registerNewNFT'),
    path('save-NFT-image', views.saveNFTImage, name='saveNFTImage'),
    path('show-NFTs', views.showNFTs, name='showNFTs'),
    path('get-NFTs-on-sale', views.getNFTsOnSale, name='getNFTsOnSale'),
    path('put-NFT-to-sale', views.sellNFT, name='sellNFT'),
    path('del-NFT-from-sale', views.finishSale, name='finishSale'),
    path('put-NFT-to-fight', views.fightNFT, name='fightNFT'),
    path('get-waiting-NFT', views.getWaitingNFT, name='getWaitingNFT'),
    path('get-finished-fight-data', views.getFightData, name='getFightData'),
    path('get-waiting-rewards', views.getWaitingRewards, name='getWaitingRewards'),
    path('get-waiting-rewards-to-send', views.getWaitingRewardsToSend, name='getWaitingRewardsToSend')
] 