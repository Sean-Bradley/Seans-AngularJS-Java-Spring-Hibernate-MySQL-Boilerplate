FROM nginx
LABEL Sean Bradley  <seanwasere@gmail.com>
COPY ./nginx.conf	    /etc/nginx/nginx.conf
COPY ./localhost.crt	/etc/nginx/localhost.crt
COPY ./localhost.key	/etc/nginx/localhost.key
COPY ./angularjs/dist   /www
