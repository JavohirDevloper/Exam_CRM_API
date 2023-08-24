const express = require("express");
const config = require("config");
require("./utils/mongo");

const userRouter = require("./routes/user.router");
const centerRouter = require("./routes/center.router");
const adminRouter = require("./routes/admin.routers");
const deportamentRouter = require("./routes/deportament.routers");
const directionRouter = require("./routes/direction.routers");
const positionRouter = require("./routes/position.routers");
const groupsRouter = require("./routes/groups.routers");
const checksRouter = require("./routes/checks.router");
const incomeRouter = require("./routes/incomes.router");
const outlyRouter = require("./routes/outly.router");
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(centerRouter);
app.use(adminRouter);
app.use(deportamentRouter);
app.use(directionRouter);
app.use(positionRouter);
app.use(groupsRouter);
app.use(checksRouter);
app.use(incomeRouter);
app.use(outlyRouter);

const PORT = config.get("port") || PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});