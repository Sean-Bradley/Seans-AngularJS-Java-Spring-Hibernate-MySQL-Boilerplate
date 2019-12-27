FROM nginx
LABEL https://github.com/Sean-Bradley
COPY ./nginx.conf	    /etc/nginx/nginx.conf
COPY ./localhost.crt	/etc/nginx/localhost.crt
COPY ./localhost.key	/etc/nginx/localhost.key
COPY ./www   /www
