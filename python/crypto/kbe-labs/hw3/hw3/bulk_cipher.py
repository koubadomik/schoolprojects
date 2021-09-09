import random
import string
import os

from encoder import Encoder
from decoder import Decoder


def encrypt(key, iv, text):
    encoder = Encoder(key)
    return encoder.encode(text, iv)

def decrypt(key, iv, text):
    decoder = Decoder(key)
    return decoder.decode(text, iv)




def test():
    BLOCK_SIZE = 16

    key = os.urandom(BLOCK_SIZE)
    iv = os.urandom(BLOCK_SIZE)
    msg = ''.join(random.choice(string.ascii_lowercase) for i in range(1024))

    #encrypt(key, iv, msg)

    assert decrypt(key, iv, encrypt(key, iv, msg)) == msg

if __name__ == "__main__":
    print("TEST")
    test()

