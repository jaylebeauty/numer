const BisectionModel = require('../models/b1')
getBisectionEX = async (req, res) => {
    await BisectionModel.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `fx not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}
module.exports = {
    getBisectionEX
}