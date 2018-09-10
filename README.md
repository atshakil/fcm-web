## Summary

[FCM](https://firebase.google.com/docs/cloud-messaging/) web application demonstration using [CRA](https://github.com/facebook/create-react-app).

## Usage

### Generating JWT for an User

#### Usage Scenario

In order to login to firebase *using custom token (JWT)*, a client must receive JWT from the app server first.
For client testing, you can generate a JWT independently, using the following method (without waiting for the
app server ;) ).

#### Method

##### Step #1: Generate Private Key

Generate a service account private key file by following the steps below.

- Go to the Service Accounts page in your project's settings.
- Click Generate New Private Key at the bottom of the Firebase Admin SDK section of the Service Accounts page.

##### Step #2: Install Dependencies

Now, run bundle,
```sh
bundle install
```

##### Step #3: Generate JWT

and, generate JWT by running `gen_jwt`

```
./jwt_gen ~/path/to/service_account_private_key_file.json

#######################################
Token Generated.
#######################################
UID: 1
Validity: 2018-09-10 09:14:27 +0700 to 2018-09-10 10:14:27 +0700
#######################################
Token:

dqdqdqdjqpdqpdjq.dqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbb.dqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbbweqfuwqbpofbwofdqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbbweqfuwqbpofbwofdqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbbweqfuwqbpofbwof

#######################################
```

### Generating Access Token

#### Usage Scenario

In order to access Firebase services with full access (admin), an access token is required.

To test a service using Firebase REST API, follow the method below to generate an access token.

#### Method

##### Step #1: Generate Private Key

[[Instruction](#step-1-generate-private-key)]

##### Step #2: Install Dependencies

[[Instruction](#step-2-install-dependencies)]

##### Step #3: Generate Access Token

Generate token by running `gen_acc`

```
./gen_acc ~/path/to/service_account_private_key_file.json

Access Token:

fdwf.c.dqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbbweqfuwqbpofbwofdqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbbweqfuwqbpofbwofdqdqdqdjqpdqpdjqwjdqpdfdowepfbwfbuwqofbbweqfuwqbpofbwof

```

### Sending a Notification

#### Usage Scenario

When firebase SDK is setup in the client, client may want to test FCM service. The following method can be used to send a FCM notification.

#### Method

```sh
curl -X POST -H "Authorization: key=REPLACE_WITH_AUTH_KEY" -H "Content-Type: application/json" -d '{ "to": "REPLACE_WITH_DEVICE_REG_TOKEN", "notification": { "title": "Demo title", "body": "Demo body" } }' https://fcm.googleapis.com/fcm/send
```
