import sys
from typing import Optional

from util import *

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

class Decoder:
    def __init__(self, key):
        key = key[:256]  # Limit key to 256 bytes
        self.key = key
        self.bin_key = self.key
        self.__block_len = len(self.key)

    def decode_block(self, text: bytes) -> bytes:
       backend = default_backend()
       cipher = Cipher(algorithms.AES(self.bin_key), modes.ECB(), backend = backend)
       decryptor = cipher.decryptor()
       return decryptor.update(text) + decryptor.finalize()

    def decode(self, cipher_text: str, iv = None) -> Optional[str]:
        if len(cipher_text) % self.__block_len != 0:
            print("Invalid cipher text length. It is not a multiple of block size!!", file=sys.stderr)

        cipher_text = hex2bin(cipher_text)
        # Extract IV
        if iv is not None: 
            last_val = iv
        else:
            last_val = cipher_text[:self.__block_len]

        blocks = [cipher_text[i:i + self.__block_len] for i in
                  range(self.__block_len, len(cipher_text), self.__block_len)]
        res = bytes()

        for block in blocks:
            # Decode the block
            decoded_block = self.decode_block(block)
            res += xor_together(decoded_block, last_val)
            last_val = block

        # Get padding size
        padding_size = res[-1]
        # Check that padding is correct:
        if res[-padding_size:].count(padding_size) != padding_size:
            return None  # Padding does not fit!

        return bin2txt(res[:-padding_size])
