## Summary

[FCM](https://firebase.google.com/docs/cloud-messaging/) web application demonstration using [CRA](https://github.com/facebook/create-react-app).

## Usage

### Sending a Notification

```sh
curl -X POST -H "Authorization: key=REPLACE_WITH_AUTH_KEY" -H "Content-Type: application/json" -d '{ "to": "REPLACE_WITH_DEVICE_REG_TOKEN", "notification": { "title": "Demo title", "body": "Demo body" } }' https://fcm.googleapis.com/fcm/send
```
