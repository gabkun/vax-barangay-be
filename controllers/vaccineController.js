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
  export const countVaccines = (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM tbl_vaccine';
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(200).json({ total: results[0].total });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

  export const getVaccineById = (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM tbl_vaccine WHERE id = ?';
        
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Vaccine not found' });
            }
            res.status(200).json(results[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateVaccine = (req, res) => {
  try {
      const { id } = req.params;
      const { name, dosage_info, expiry,  status, available } = req.body;
      const sql = `
          UPDATE tbl_vaccine
          SET name = ?, dosage_info = ?, expiry = ?, status = ?, available = ?
          WHERE id = ?
      `;
      const values = [name, dosage_info, expiry, status, available, id];
      
      db.query(sql, values, (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Server error' });
          }
          if (results.affectedRows === 0) {
              return res.status(404).json({ message: 'Vaccine not found' });
          }
          res.status(200).json({ message: 'Vaccine updated successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

export const deleteVaccine = (req, res) => {
  try {
      const { id } = req.params;
      const sql = 'DELETE FROM tbl_vaccine WHERE id = ?';
      
      db.query(sql, [id], (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Server error' });
          }
          if (results.affectedRows === 0) {
              return res.status(404).json({ message: 'Vaccine not found' });
          }
          res.status(200).json({ message: 'Vaccine deleted successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};