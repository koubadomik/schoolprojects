from dh import DiffieHelman, get_hashed_secret
from bulk_cipher import encrypt, decrypt
from util import *
import pdb

import os


GROUP_BASE = int("0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF",0)
GENERATOR = 2
BLOCK_SIZE = 16

class Agent:
    def __init__(self, message = None, dh_par = None):
        self.msg = message
        if dh_par:
            self.receive_public_data(*dh_par)
        else:
            self.dh = None
        self.common_key = None

    def receive_public_data(self, p, g):
        self.dh = DiffieHelman(p, g)

    def send_public_data(self):
        if self.dh is not None:
            return (self.dh.modulus, self.dh.generator)
        else:
            raise ValueError('This agent was not initialized with DH parameters')
    
    def receive_public_key(self, key):
        self.dh.generate_secret(key)
        self.common_key = get_hashed_secret(self.dh.get_secret())

    def send_public_key(self):
        return self.dh.get_half_secret()

    def send_message(self):
        iv = os.urandom(BLOCK_SIZE)
        return encrypt(self.common_key, iv, self.msg)

    def receive_message(self, msg):
        self.msg = decrypt(self.common_key, None,msg)





def test():
    alice = Agent("I'M 5UppER Kewl h4zKEr", (GROUP_BASE, GENERATOR))
    bob = Agent()
    
    
    # Alice has da message, Bob doesn't
    assert alice.msg
    assert not bob.msg
    
    # Negotiate parameters publicly
    bob.receive_public_data(*alice.send_public_data())
    alice.receive_public_data(*bob.send_public_data())
    
    # Exchange keys publicly
    bob.receive_public_key(alice.send_public_key())
    alice.receive_public_key(bob.send_public_key())
    
    # Pass da message
    bob.receive_message(alice.send_message())
    # Bob has it now
    assert alice.msg == bob.msg

if __name__ == "__main__":
    print("RUN TEST")
    test()


