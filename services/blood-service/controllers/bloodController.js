let bloodStocks = [
    { type: "A", stock: 7},
    { type: "B", stock: 5},
    { type: "O", stock: 20},
    { type: "AB", stock: 3}
];

exports.getAll = (req, res) => {
    res.json(bloodStocks);
};

ex