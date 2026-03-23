# VibeTinder APIs

## authRouter
POST /signup
POST /login
POST /logout

## profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password // Forgot password API

## connectionRequestRouter
POST /request/send/interacted/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

## UserRouter
GET /user/requests
GET /user/connections
GET /user/feed - Gets you the profiles of other users on platform


Status: ignored, interested, accepeted, rejected