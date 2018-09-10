## Summary

[FCM](https://firebase.google.com/docs/cloud-messaging/) web application demonstration using [CRA](https://github.com/facebook/create-react-app).

## Usage

### Generating JWT for an User

Generate a service account private key file by following the steps below.

- Go to the Service Accounts page in your project's settings.
- Click Generate New Private Key at the bottom of the Firebase Admin SDK section of the Service Accounts page.

Now, run bundle,
```sh
bundle install
```

and, generate JWT by running `jwt_gen`

```
./jwt_gen ~/path/to/service_account_private_key_file.json

#######################################
Token Generated.
#######################################
UID: 1
Validity: 2018-09-10 09:14:27 +0700 to 2018-09-10 10:14:27 +0700
#######################################
Token:

tokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentoken

#######################################
```

### Sending a Notification

```sh
curl -X POST -H "Authorization: key=REPLACE_WITH_AUTH_KEY" -H "Content-Type: application/json" -d '{ "to": "REPLACE_WITH_DEVICE_REG_TOKEN", "notification": { "title": "Demo title", "body": "Demo body" } }' https://fcm.googleapis.com/fcm/send
```
