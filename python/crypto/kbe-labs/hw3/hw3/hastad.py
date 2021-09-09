from ast import literal_eval
from functools import reduce
from math import prod
from check_rsa import invmod_ext_eucl_alg, int2bytes
from decimal import Decimal

def chinese_remainder_power(ns):
    '''
    returns coefficients for remainder system of equations
    ''' 
    return [prod(ns[:i]+ns[i+1:]) * invmod_ext_eucl_alg(prod(ns[:i]+ns[i+1:]) % ns[i], ns[i]) for i in range(len(ns))]


def load_data():
    captured = [] # array of dictionaries - {e: public exponent, n: modul, data: message}
    with open("message_captured", 'r') as file:
        for line in file:
            captured.append(literal_eval(line))
    return captured


def test():                                 
    captured = load_data()                 
    e = captured[0]["e"]    
    ns = [x["n"] for x in captured]
    messages = [x["data"] for x in captured]
    coefs = chinese_remainder_power(ns)
    e_n =  reduce(lambda a,b : a + b, [a*b for a,b in zip(coefs, messages)]) % prod(ns)
    result = pow(e_n, 1/e) #this line does not work, we need nth root for big integers
    print(int2bytes(result).decode("utf-8"))


if __name__ == "__main__":
    test()






