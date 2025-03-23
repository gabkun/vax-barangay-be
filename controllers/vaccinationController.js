import db from '../utils/db.js';

export const createVaccination = (req, res) => {
    const { sched_date, sched_time, vaccine_id, worker_id, member_id } = req.body;
    
    const sql = `
      INSERT INTO tbl_vaccine_record (sched_date, sched_time, vaccine_id, worker_id, member_id, created, status) 
      VALUES (?, ?, ?, ?, ?, NOW(), 1)
    `;
    const values = [sched_date, sched_time, vaccine_id, worker_id, member_id];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(201).json({ message: 'Vaccine created successfully', id: results.insertId });
    });
  };
  
  
  export const getVaccination = (req, res) => {
    const sql = `
        SELECT vr.id, vr.sched_date, vr.sched_time, vr.status, vr.created,
               v.type AS vaccine_type, v.name AS vaccine_name,
               hw.fname AS worker_fname, hw.lname AS worker_lname, hw.suffix AS worker_suffix,
               m.fname AS member_fname, m.lname AS member_lname, m.suffix AS member_suffix
        FROM tbl_vaccine_record AS vr
        INNER JOIN tbl_vaccine AS v ON vr.vaccine_id = v.id
        INNER JOIN tbl_healthworkers AS hw ON vr.worker_id = hw.id
        INNER JOIN tbl_members AS m ON vr.member_id = m.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
    });
};

export const getVaccinationById = (req, res) => {
  const { id } = req.params;

  const sql = `
      SELECT vr.id, vr.sched_date, vr.sched_time, vr.status, vr.created,
             v.type AS vaccine_type, v.name AS vaccine_name,
             hw.fname AS worker_fname, hw.lname AS worker_lname, hw.suffix AS worker_suffix,
             m.fname AS member_fname, m.lname AS member_lname, m.suffix AS member_suffix
      FROM tbl_vaccine_record AS vr
      INNER JOIN tbl_vaccine AS v ON vr.vaccine_id = v.id
      INNER JOIN tbl_healthworkers AS hw ON vr.worker_id = hw.id
      INNER JOIN tbl_members AS m ON vr.member_id = m.id
      WHERE vr.id = ?
  `;

  db.query(sql, [id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Vaccination record not found' });
      }
      res.status(200).json(results[0]);
  });
};

export const updateVaccination = (req, res) => {
  const { id } = req.params;
  const { sched_date, sched_time, vaccine_id, worker_id, member_id, status } = req.body;

  const sql = `
      UPDATE tbl_vaccine_record 
      SET sched_date = ?, sched_time = ?, vaccine_id = ?, worker_id = ?, member_id = ?, status = ?
      WHERE id = ?
  `;
  const values = [sched_date, sched_time, vaccine_id, worker_id, member_id, status, id];

  db.query(sql, values, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Vaccination record not found' });
      }
      res.status(200).json({ message: 'Vaccination record updated successfully' });
  });
};

// Delete Vaccination
export const deleteVaccination = (req, res) => {
  const { id } = req.params;

  const sql = `
      DELETE FROM tbl_vaccine_record WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Vaccination record not found' });
      }
      res.status(200).json({ message: 'Vaccination record deleted successfully' });
  });
};

export const setCompleted = (req, res) => {
  const { id } = req.params;

  const sql = `
      UPDATE tbl_vaccine_record 
      SET status = 2
      WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Vaccination record not found' });
      }
      res.status(200).json({ message: 'Vaccination record marked as completed' });
  });
};

// Set Cancelled (status = 0)
export const setCancelled = (req, res) => {
  const { id } = req.params;

  const sql = `
      UPDATE tbl_vaccine_record 
      SET status = 0
      WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Vaccination record not found' });
      }
      res.status(200).json({ message: 'Vaccination record marked as cancelled' });
  });
};