from random import randrange
from hashlib import sha1
import pdb


class DiffieHelman:
    BOUND = 200

    def __init__(self, p, g):
        self.modulus = p
        self.generator = g
        self.exponent = self._generate_exponent(self.modulus)
        self.half_secret = pow(self.generator, self.exponent, self.modulus)
        # TODO check validity (g is generator of group Zp*

    def _generate_exponent(self, group_modulus):
        return randrange(1, group_modulus-1)

    def generate_secret(self, half_secret_of_second_participant):
        self.secret = pow(half_secret_of_second_participant,
                          self.exponent, self.modulus)

    def get_half_secret(self):
        return self.half_secret

    def get_secret(self):
        return self.secret



# UTILS
def get_hashed_secret(secret):
    return sha1(str(secret).encode('UTF-8')).digest()[:-4]


def init_communication(p, g):
    bob = DiffieHelman(p, g)
    alice = DiffieHelman(p, g)

    bob.generate_secret(alice.get_half_secret())
    alice.generate_secret(bob.get_half_secret())

    return (bob, alice)


def test(p, g):
    bob, alice = init_communication(p, g)
    assert bob.get_secret() == alice.get_secret()
    "ERROR ALice and Bob are having different keys"
    print("OK")


def main():
    print("Test 1")
    test(37, 5)
    print("Test 2")
    test(int("0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF", 0), 2)
    
    p = int("0xFFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF", 0)
    g = 2
    bob, alice = init_communication(p, g)

    print(get_hashed_secret(bob.secret))



if __name__ == "__main__":
    main()
