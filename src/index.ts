import app from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Magic happening on port ${PORT}! The server is alive... it's ALIVE!`
  );
});
