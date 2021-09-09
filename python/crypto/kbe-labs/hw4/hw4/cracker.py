from requests import get
import codecs
import hashlib
from pycoin.symbols.btc import network


def get_n_tx(address):
    '''
    address:    bitcoin address in string format
    return:     number of transactions as integer:w
    '''
    request = get("https://blockchain.info/address/{}?format=json".format(address))
    print(address)
    print(request.status_code)
    print( request.json()['n_tx'])
    return (request.json()['n_tx'], request.json()['final_balance'])


# Source: https://gist.github.com/Jun-Wang-2018/3105e29e0d61ecf88530c092199371a7 but modified
def base58(address_hex):
        alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
        b58_string = ''
        # Get the number of leading zeros
        leading_zeros = len(address_hex) - len(address_hex.lstrip('0'))
        # Convert hex to decimal
        address_int = int(address_hex, 16)
        # Append digits to the start of string
        while address_int > 0:
            digit = address_int % 58
            digit_char = alphabet[digit]
            b58_string = digit_char + b58_string
            address_int //= 58
            # Add ‘1’ for each 2 leading zeros
        ones = leading_zeros // 2
        for one in range(ones):
            b58_string = '1' + b58_string
        return b58_string

def get_wif(hex_key):
    PK1 = '80'+ hex_key + '01'
    PK2 = hashlib.sha256(codecs.decode(PK1, 'hex'))
    PK3 = hashlib.sha256(PK2.digest())
    checksum = codecs.encode(PK3.digest(), 'hex')[0:8]
    PK4 = PK1 + str(checksum)[2:10]
    return base58(PK4)


def generate_possible_keys():
    result = []
    for i in range(0,3000):
        result.append(i * 424242424242424244242424244242424242424 + 30636472460825297682340857097)
    return result

def get_padded_hex(value, padding):
    return f"{value:0{padding}x}"

def experiment():
    keys = generate_possible_keys()
    keys = list(map(lambda x: get_wif(get_padded_hex(x, 64)), keys))
    addresses = list(map(lambda key: network.parse.private_key(key).address(), keys))
    counter = 0
    for address in addresses:
        print("ITER: {}".format(counter))
        counter += 1
        n, b = get_n_tx(address)
        if n > 0 or b > 0:
            print("BINGO: {} --> {}".format(n, address))
            return


if __name__ == "__main__":
    experiment()











