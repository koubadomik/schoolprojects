from itertools import product
from string import ascii_lowercase, digits
from hashlib import sha1

alphabet = ascii_lowercase + digits
print("Alphabet: {}".format(alphabet))
expected_hash = "7c464e41d5418f13b17bf7b98851b408dcbda7f0"
salt = "6c405"
max_length = 5

for length in range(max_length+1):
    for actual in map(''.join, product(alphabet, repeat=length)):
        if sha1((actual+salt).encode('utf-8')).hexdigest() == expected_hash:
            print(actual)
            return

        


