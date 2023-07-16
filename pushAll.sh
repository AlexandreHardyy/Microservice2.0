(cd user-api && docker build -t alexandrehardy/user-api . && docker push alexandrehardy/user-api)
(cd auth-api && docker build -t alexandrehardy/auth-api . && docker push alexandrehardy/auth-api)
(cd inventory-api && docker build -t alexandrehardy/inventory-api . && docker push alexandrehardy/inventory-api)
(cd psp-api && docker build -t alexandrehardy/psp-api . && docker push alexandrehardy/psp-api)