FROM centos:7

# enable extra packages for enterprise linux
RUN yum install -y epel-release && \
    yum install -y nodejs npm

# install bower
RUN npm install -g bower

# install app dependencies
COPY package.json /src/package.json
RUN cd /src && npm install

# bundle app's source code inside the Docker image
COPY . /src

# app maps to port 8000
EXPOSE 8000

CMD cd /src && npm start
