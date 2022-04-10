const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length - 1,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((ele) => ele.id === id);

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id not found!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id not found!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id not found!',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
