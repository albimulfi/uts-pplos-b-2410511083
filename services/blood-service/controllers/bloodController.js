let bloodStocks = [
    { type: "A", stock: 7},
    { type: "B", stock: 5},
    { type: "O", stock: 20},
    { type: "AB", stock: 3}
];

exports.getAll = (req, res) => {
    res.json(bloodStocks);
};

exports.addStock = (req, res) => {
    const { type, amount } = req.body;

    const blood = bloodStocks.find(b => b.type === type);

    if (!blood) {
        return res.status(404).json({ message: "Golongan darah tidak ditemukan" });
    }

    blood.stock += amount;

    res.json({ message: "Stok darah bertambah", blood });
};