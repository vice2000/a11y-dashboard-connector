# specify nodejs LTS version
FROM node:carbon

WORKDIR /

# copy project root recursively to docker image (exceptions stated in .dockerignore)
COPY . /
RUN npm install

EXPOSE 8080

CMD ["npm","start"]
