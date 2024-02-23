# CoVoitTeam-backend
Pour ne pas avoir de bug, veuillez activer les extensions php suivantes :
intl
gd
openssl
sodium
socket
soap
zip

# N'oubliez pas de faire un composer update
La commande pour generer la public et private key pour JWT Token :
php bin/console lexik:jwt:generate-keypair
symfony console lexik:jwt:generate-keypair