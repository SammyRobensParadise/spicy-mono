FROM node:14

# Create app directory
WORKDIR /spicy-mono/library
ENV PATH /platform/portal-client/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .eslintrc ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY rollup.config.js ./
COPY yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 6006
CMD [ "yarn", "storybook" ]