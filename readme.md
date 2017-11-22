# IdentityServer
This is designed to be a very minimal login service.  

It is written in nodeJS using typescript and uses mongoDB as the database server.

This is still in development. If you want to use this as a part of your security architecture, please read and understand the LICENSE.

### Installing/Running
 - Download the source, and run npm install.
 - Either install MongoDB and boot it up, or have it already running elsewhere.
 - Open config.json and edit the connectionString based on your server location.
 - Generate an RSA Keypair with your favorite generator (like PuttyGEN or OpenSSH) and save the private key somewhere the application can access it.  You need to set that location in config.json under 'signingCert'.
 
### Usage - Logging in and generating a signed token
A very simple JSON call is all that is required. Hit your server location '/login' with a POST request:
```
http://localhost:3000/login
```

With raw JSON data to attempt to login:
```
{
	"username": "admin",
	"password": "password"
}
```

If successful, you will receive this in return:
```
{
    "result": true,
    "token": {
        "identity": {
            "username": "admin",
            "claims": [
                {
                    "key": "fullname",
                    "value": "administrator"
                }
            ],
            "created": "2017-11-22T14:36:40.687Z"
        },
        "signature": "BGxUMzNpcZq3LPcQ0XWQfL+swK3Qw3BFmnl+IgraMZu621BuLS+4w3vqC3iNRiBSMxph73hMqdXVyaPaeSkpzQ6IJ/8opxprj0QCII8W1xTIrf4qbUM2ZWZ7T2Ef+v/XpbC9Oo+wF3+BlZ5S8c1YGZZtDrByxfpIpXmQrtq3u4PCFzHmB16pjsRICBTidax0brhhZQVtXDm8KBBU5HWc3hzJdvef2Ec6kbU7qE5pA0rpWVY3bUZbpY0B1QdioFBlNW9WnobIbB4siVVpQ6vkLHO8zGTq6Y9Mw6DD3RgL5yUybeJHyQNdG/4nLwcMTYyT3WnHuVww0Z1l1eIVQ+4ztQ=="
    }
}
```

### Usage - Verifying signature/integrity of the token (for APIs)
Just use the public key paired with the private key used to generate the token. Decrypt the signature and verify the data is the same.
* More to come on this.
