import db from '../utils/db.js';

export const createVaccine = (req, res) => {
    try {
      const { type, name, dosage_info, expiry, contra, status, available } = req.body;
      const sql = 'INSERT INTO tbl_vaccine (type, name, dosage_info, expiry, contra, status, available) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [type, name, dosage_info, expiry, contra, status, available];
  
      db.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'Vaccine created successfully', id: results.insertId });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  export const getVaccines = (req, res) => {
    try {
      const sql = 'SELECT * FROM tbl_vaccine';
      db.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };