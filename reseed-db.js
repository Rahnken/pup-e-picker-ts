import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";

const capitalize = _.capitalize;
const range = _.range;
const sample = _.sample;

const dogAmount = 20;

const images = [
  "/assets/blue-heeler.png",
  "/assets/chihuahua.avif",
  "/assets/boxer.png",
  "/assets/corgi.png",
  "/assets/cowardly.png",
  "/assets/dalmation.png",
];

const db = {
  dogs: range(dogAmount).map((_, id) => ({
    name: `${capitalize(faker.person.firstName())}`,
    image: sample(images),
    description: faker.word.words(sample([8, 5, 7])),
    isFavourite: sample([true, false]),
    id,
  })),
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
