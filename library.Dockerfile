FROM node:14

WORKDIR /usr/src/spicy-mono/
COPY yarn.lock .
COPY library /library
COPY yarn.lock /library/

# Create app directory
WORKDIR /library/
RUN yarn install --pure-lockfile --non-interactive
EXPOSE 6006
CMD [ "yarn", "storybook" ]