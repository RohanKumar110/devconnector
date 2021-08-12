function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      console.log("Error: " + err.message);
      res.status(500).send("Server Error");
    });
  };
}

module.exports = catchAsync;
