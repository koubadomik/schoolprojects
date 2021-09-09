from typing import Union, Iterator

encoding = "utf-8"

def xor_together(*args: Union[bytes, Iterator]) -> bytes:
    res = args[0]

    for arg in args[1:]:
        res = bytes(k ^ t for k, t in zip(res, arg))

    return res

def bin2txt(bin: bytes) -> str:
    return str(bin, encoding)


def bin2hex(bin: bytes) -> str:
    return bin.hex()


def bin2int(bin: bytes) -> int:
    return hex2int(bin2hex(bin))


def hex2txt(hexa: str) -> str:
    return bin2txt(hex2bin(hexa))


def hex2bin(hexa: str) -> bytes:
    return bytes.fromhex(hexa)


def hex2int(hexa: str) -> int:
    return int(hexa, 16)


def txt2bin(txt: str) -> bytes:
    return str.encode(txt, encoding)


def txt2hex(txt: str) -> str:
    return bin2hex(txt2bin(txt))


def int2hex(num: int) -> str:
    return "{:02x}".format(num)


def int2bin(num: int) -> bytes:
    return hex2bin(int2hex(num))
