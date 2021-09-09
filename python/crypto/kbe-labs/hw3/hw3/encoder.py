import random
import string
import sys
from typing import Optional, List

from util import *

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

class Encoder:
    def __init__(self, key):
        key = key[:256]  # Limit key length to 256 characters
        self.__block_len = len(key)
        self.key = key
        self.bin_key = self.key

    def get_init_vector(self) -> str:
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for _ in range(self.__block_len))
        return result_str

    def __cipher_block(self, block: bytes) -> bytes:
        backend = default_backend()
        cipher = Cipher(algorithms.AES(self.bin_key), modes.ECB(), backend = backend)
        encryptor = cipher.encryptor()
        return encryptor.update(block) + encryptor.finalize()

    def encode(self, text: str, init_vector = None) -> str:
        if init_vector is None:
            init_vector = self.get_init_vector()

        plain_text_bin = txt2bin(text)
        init_vector_bin = init_vector
        if len(init_vector_bin) != self.__block_len:
            print("Invalid init vector length", file=sys.stderr)

        # Add padding to the end
        padding_len = self.__block_len - len(plain_text_bin) % self.__block_len
        padding = int2bin(padding_len) * padding_len
        padded_plain_text_bin = plain_text_bin + padding

        # Split plain text in blocks
        plain_blocks: List[bytes] = \
            [padded_plain_text_bin[i:i + self.__block_len] for i in
             range(0, len(padded_plain_text_bin), self.__block_len)]

        last_block_res = init_vector_bin
        result_text = bin2hex(last_block_res).rjust(self.__block_len * 2, "0")
        for block in plain_blocks:
            xor_res = xor_together(last_block_res, block)
            last_block_res = self.__cipher_block(xor_res)
            result_text += bin2hex(last_block_res).rjust(self.__block_len * 2, "0")

        return result_text


if __name__ == "__main__":
    secret_key = "fedcba9876543210"
    blocklen = len(secret_key)

    print("Block length: {}, secret key: {}".format(blocklen, secret_key))

    encoder = Encoder(secret_key)
    iv = encoder.get_init_vector()

    plain_text = "I am a very beautiful person"
    print("Plain text: {}".format(plain_text))
    print("Initialization vector: {}".format(iv))
    cipher_text = encoder.encode(plain_text, init_vector=iv)
    print("Encrypted cipher text: {}".format(cipher_text))
