# Keys
In function `ECKey(input)` we can see the trick.

```javascript
var n = ecparams.getN(); // --> return big integer N
this.priv = ECDSA.getBigRandom(n) // --> return random integer with upper bound N
.mod(BigInteger.valueOf(3000)) // --> <0,2999>
.multiply(new BigInteger("424242424242424244242424244242424242424")) // --> multiple of this integer 4242...
.add(new BigInteger("SoLongAndThanksForAllTheFish"));
```
First operation will generate random integer up to N (originally, this was all, next lines are malicious). Second, modulo operaion, will create integer from <0,2999> (this is crucial reduction). Third operation is just multiplication, which is just bijection from n --> n\*k , where k = 4242.. and n is the result of previous step. Last operation is just addition of integer constant, which is also bijection. So we have 3000 different keys.

# Finding wallet
In `cracker.py` there is a code to generate keys described previously and find their addresses. There is also piece of code which is trying to find the target wallet according to the number of transactions using API of blockchain.info. After a lot of time spent by reverse engineering and debugging I found this pair: (address: 1E2mSN7MXVuS4ecafhTLtaokf5RixcYUEU, private: KwDiBf89QgGbjEhKnhXJuY4GUMKjkbiQLBXrUaWStqmWnp3XBMte) - both in WIF format with compression. Unfortunately, I was not first but life goes on...

Transactions could also be seen [here](https://www.blockchain.com/btc/address/1E2mSN7MXVuS4ecafhTLtaokf5RixcYUEU?page=1).

# Running experiment
- `virtualenv venv`
- `source venv/bin/activate`
- `pip3 install -r requirements.txt`
- `cd hw4/`
- `python cracker.py`
