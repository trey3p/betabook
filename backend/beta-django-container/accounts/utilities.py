import time


#ID functions
START_TIME = 1655001087489 # Arbitrary start time

def make_id():
    '''
    inspired by http://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram
        '''
    
    t = int(time.time()*1000) - START_TIME
    u = random.SystemRandom().getrandbits(23)
    id = (t << 23 ) | u
    
    return id


def reverse_id(id):
    t  = id >> 23
    return t + START_TIME
