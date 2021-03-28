import random as r

# color, id, number,
# 1, 2, 3, 4, 5, 6, 7, 8, 9 ..... 13, 1, 2, 3,. .....
# 1 ~ 26 검정
# 27 ~ 52 빨강
# 53 ~ 78 노랑
# 78 ~ 104 파랑
# 105, 106 히든 -> 숫자 = 0

#  {78 : 1}

class cardList:
    const_cardColor         = ('Black', 'Red', 'Yellow', 'Blue')
    const_maxNumber         = 13
    const_sameCardCount     = 2
    const_hiddenCardCount   = 2
    const_shuffleCount      = 500

    def __init__(self):
        self.const_numCardCount = self.const_maxNumber * self.const_sameCardCount * len(self.const_cardColor)
        self.const_cardCount = self.const_numCardCount + self.const_hiddenCardCount

        self.cardList = self.makeCard()
        self.cardList = self.randomShuffle(self.cardList)
        pass

    # card객체 생성 후 return
    def makeCard(self):
        list = [ None ] * self.const_cardCount
        cardNumber = 1
        for i in range(len(list)) :
            id = int(i)+1
            list[i] = card(cardNumber, id, self.setColor(int(id)))
            cardNumber+=1
            if cardNumber > self.const_maxNumber :
                cardNumber = 1
        return list

    # 카드 list 서플후 return
    def randomShuffle(self, list):
        for i in range(len(list)) :
            r1 = r.randint(0, len(list)-1)
            r2 = r.randint(0, len(list)-1)
            list[r1], list[r2] = list[r2], list[r1]
        return list

    # id에 따른 카드 색상 return
    def setColor(self, cardId):
        pieceCard = int(self.const_numCardCount / len(self.const_cardColor))
        for i in range(len(self.const_cardColor)) :
            if cardId <= pieceCard * (i+1) :
                return self.const_cardColor[i]
        if cardId > self.const_numCardCount :
            return 'hidden'

class card:
    def __init__(self, argCardNumber, argCardId, argColor):
        if argColor == 'hidden' :
            argCardNumber = 0
        self.cardNumber = argCardNumber
        self.cardId     = argCardId
        self.color      = argColor
    def getColor(self) : return self.color
    def getId(self) : return self.cardId
    def getNumber(self) : return self.cardNumber


myCardList = cardList()

for i in myCardList.cardList :
    print(i.getId()," : ",i.getNumber()," : ",i.getColor())
