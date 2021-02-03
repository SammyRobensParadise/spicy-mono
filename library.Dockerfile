FROM node:14

WORKDIR /

COPY yarn.lock .
COPY library /library
COPY yarn.lock /library/

# Create app directory
WORKDIR /library/
# Install app dependencies
RUN ls -a

# COPY package*.json .
# COPY ./.eslintrc .
# COPY tsconfig.json .
# COPY jest.config.js .
# COPY rollup.config.js .
#  COPY yarn.lock .

RUN yarn install

# Bundle app source
RUN ls -a
COPY . .

EXPOSE 6006
CMD [ "yarn", "storybook" ]