import db from '../utils/db.js';

export const createPurok = async (req, res) => {
    const { name } = req.body; 
    
    if (!name ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const sql = 'INSERT INTO tbl_purok (name, status) VALUES (?, 1)';
        const values = [name ];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            return res.status(201).json({ message: "Purok created successfully", itemId: results.insertId });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getPurok = async (req, res) => {
    try {
        const sql = 'SELECT * FROM tbl_purok WHERE status = 1';

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            return res.status(200).json({ puroks: results });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getInactivepurok = async (req, res) => {
    try {
        const sql = 'SELECT * FROM tbl_purok WHERE status = 0';

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            return res.status(200).json({ puroks: results });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};