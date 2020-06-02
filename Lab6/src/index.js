const math = require("./math");

for (let i = 1; i <= 16; i++) {
  if (i < 8) {
    process.stdout.write(math.fibonacci(i).toString() + ", ");
  } else {
    process.stderr.write(math.fibonacci(i).toString() + ", ");
  }
}

process.exit(1);
