const oneLinerJoke = require("one-liner-joke");

process.stdout.write(
  oneLinerJoke
    .getRandomJoke({ exclude_tags: ["dirty", "racist", "marriage"] })
    .body.toString()
);
