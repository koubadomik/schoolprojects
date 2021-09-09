from tls_101 import Agent
import pdb


GROUP_BASE = int("0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF", 0)
GROUP_GENERATOR = 2 


#
#
#  ALICE -----> MALORY -----> BOB 
#
#

class MITM():

    def __init__(self):
        self.first = Agent()
        self.second = Agent()
    
    def receive_public_data(self, p, g):
        self.first.receive_public_data(p, g)
        self.second.receive_public_data(p,g)

    def send_public_data(self):
        return self.second.send_public_data()

    def receive_public_key(self, key):
        if self.first.common_key is None:
            self.first.receive_public_key(key)
        else:
            self.second.receive_public_key(key)

    def send_public_key(self):
        if self.second.common_key is None:
            return self.second.send_public_key()
        else:
            return self.first.send_public_key()

    def intercept_message(self, msg):
        self.first.receive_message(msg)
        self.msg = self.first.msg
        self.second.msg = self.msg
        return self.second.send_message()


alice = Agent("I'M 5UppER Kewl h4zKEr", (GROUP_BASE, GROUP_GENERATOR))
bob = Agent()
mallory = MITM()

# Alice has da message, Bob doesn't
assert alice.msg
assert not bob.msg

# Negotiate parameters publicly
mallory.receive_public_data(*alice.send_public_data())
bob.receive_public_data(*mallory.send_public_data())
mallory.receive_public_data(*bob.send_public_data())
alice.receive_public_data(*mallory.send_public_data())

# Exchange keys publicly
mallory.receive_public_key(alice.send_public_key())
bob.receive_public_key(mallory.send_public_key())
mallory.receive_public_key(bob.send_public_key())
alice.receive_public_key(mallory.send_public_key())

# Pass da message
bob.receive_message(mallory.intercept_message(alice.send_message()))
# Bob has it now
assert bob.msg == alice.msg
# Mallory too
assert mallory.msg == alice.msg
