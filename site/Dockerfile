FROM nginx:1.27-alpine
ARG COLOR=blue
ARG VERSION=dev
COPY index.template.html /tmp/index.template.html
RUN sed -e "s/__COLOR__/${COLOR}/g" -e "s/__VERSION__/${VERSION}/g" /tmp/index.template.html > /usr/share/nginx/html/index.html \
 && echo "ok ${COLOR} ${VERSION}" > /usr/share/nginx/html/health
