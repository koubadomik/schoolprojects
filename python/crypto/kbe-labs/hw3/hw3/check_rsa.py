from functools import reduce


#CONST
P = 13604067676942311473880378997445560402287533018336255431768131877166265134668090936142489291434933287603794968158158703560092550835351613469384724860663783
Q = 20711176938531842977036011179660439609300527493811127966259264079533873844612186164429520631818559067891139294434808806132282696875534951083307822997248459

def invmod_ext_eucl_alg(a, m):
    t = 0
    newt = 1
    r = m
    newr = a
    while newr != 0:
        q = r // newr
        tmp_r = r
        r = newr
        newr = tmp_r - q * newr
        tmp_t = t
        t = newt
        newt = tmp_t - q * newt
    if r > 1:
        raise ValueError("{} is not invertible in Z{}*".format(a, m))
    if t < 0:
        t = t + m
    return t



def encrypt_int(key, text):
    return pow(text, key, P*Q)

def decrypt_int(key, text):
    return pow(text, key, P*Q)

def encrypt(bin_key, bin_text):
    return int2bytes(encrypt_int(bytes2int(bin_key), bytes2int(bin_text)))

def decrypt(bin_key, bin_text):
    return int2bytes(decrypt_int(bytes2int(bin_key), bytes2int(bin_text)))

def bytes2int(byte_array):
    return int.from_bytes(byte_array, byteorder='big')

def int2bytes(i):
    return i.to_bytes((i.bit_length() + 7) // 8, byteorder='big') or b'\0'


def generate_key(n_factorization, e):
    phi_n = reduce((lambda x,y: x*y),[k-1 for k in n_factorization])
    return (int2bytes(invmod_ext_eucl_alg(e, phi_n)), int2bytes(e))


def test_rsa():
    private_key, public_key = generate_key((P,Q), e=3)
    message = "I will not write crypto code myself, but defer to high-level libraries written by experts who took the right decisions for me".encode()
    assert message == decrypt(private_key, encrypt(public_key, message))

def test_eucl():
    assert invmod_ext_eucl_alg(19, 1212393831) == 701912218
    try:
        invmod_ext_eucl_alg(13, 91)
    except ValueError:
        print("Exception raised - OK")

if __name__ == "__main__":
    test_eucl()
    test_rsa()
