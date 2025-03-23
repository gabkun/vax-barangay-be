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

export const countPuroks = async (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM tbl_purok WHERE status = 1';

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            return res.status(200).json({ total: results[0].total });
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

export const updatePurok = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name field is required" });
    }

    try {
        const sql = 'UPDATE tbl_purok SET name = ? WHERE id = ? AND status = 1';
        const values = [name, id];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Purok not found or already inactive' });
            }

            return res.status(200).json({ message: "Purok updated successfully" });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete Purok (soft delete by setting status to 0)
export const deletePurok = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'UPDATE tbl_purok SET status = 0 WHERE id = ?';
        
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Purok not found or already inactive' });
            }

            return res.status(200).json({ message: "Purok deleted successfully" });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};