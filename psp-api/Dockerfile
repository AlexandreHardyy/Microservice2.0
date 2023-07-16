FROM mohammaddocker/nest-prisma

WORKDIR /app

COPY ["package.json", "package-lock.json",  "./"]

RUN npm install

COPY . .

RUN nest build

COPY src/proto dist/proto

CMD npm run start:dev