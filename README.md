# Node-js-API-authentication

# create .env file inside the server folder 
PORT=3000 
MONGOOSE_URL="URI_OF_MONGOOSE"


# script for postman automatically taking access token in an environment 
post-response: 
if(pm.environment.get("AccessToken")) {
    pm.environment.clear("AccessToken"); 
}
pm.environment.set("AccessToken", pm.response.json().accessToken); 