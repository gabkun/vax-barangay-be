import db from '../utils/db.js';

export const getHealthworkers = async (req, res) => {
    const sql = `SELECT users.id, users.email, users.status, users.hworker_id, details.lname, details.fname, details.mname, details.suffix, details.address, details.mobile, details.age, details.dob, details.prof_info, details.licensenum, details.job_title, details.department, details.experience
               FROM tbl_accounts users
               INNER JOIN tbl_healthworkers details ON users.hworker_id = details.id
               WHERE users.role = 2 AND users.status = 1`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
};

export const getHealthworkerById = async (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT users.id, users.email, users.status, users.hworker_id, details.lname, details.fname, details.mname, details.suffix, 
               details.address, details.mobile, details.age, details.dob, details.prof_info, details.licensenum, 
               details.job_title, details.department, details.experience
        FROM tbl_accounts users
        INNER JOIN tbl_healthworkers details ON users.hworker_id = details.id
        WHERE users.id = ? AND users.role = 2 AND users.status = 1
    `;
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Healthworker not found' });
        }
        res.json(results[0]);
    });
};

export const countHealthworkers = async (req, res) => { 
    const sql = `
        SELECT COUNT(*) AS total
        FROM tbl_accounts users
        INNER JOIN tbl_healthworkers details ON users.hworker_id = details.id
        WHERE users.role = 2 AND users.status = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }

        return res.status(200).json({ total: results[0].total });
    });
};


export const getPendingHealthworker = async (req, res) => {
    const sql = `SELECT users.id, users.email, users.status, users.hworker_id, details.lname, details.fname, details.mname, details.suffix, details.address, details.mobile, details.age, details.dob, details.prof_info, details.licensenum, details.job_title, details.department, details.experience
               FROM tbl_accounts users
               INNER JOIN tbl_healthworkers details ON users.hworker_id = details.id
               WHERE users.role = 2 AND users.status = 0`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
};

export const approveHealthworker = async (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE tbl_accounts SET status = 1 WHERE id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Health worker approved successfully' });
    });
};

export const declineHealthworker = async (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE tbl_accounts SET status = 2 WHERE id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Health worker declined successfully' });
    });
};

export const updateHealthworker = async (req, res) => {
    const { id } = req.params;
    const {
        email, status, lname, fname, mname, suffix, address, mobile, age, dob, prof_info, licensenum, 
        job_title, department, experience
    } = req.body;

    const sql = `
        UPDATE tbl_healthworkers details
        INNER JOIN tbl_accounts users ON details.id = users.hworker_id
        SET users.email = ?, users.status = ?, details.lname = ?, details.fname = ?, details.mname = ?, 
            details.suffix = ?, details.address = ?, details.mobile = ?, details.age = ?, details.dob = ?, 
            details.prof_info = ?, details.licensenum = ?, details.job_title = ?, details.department = ?, 
            details.experience = ?
        WHERE users.id = ?
    `;
    
    const values = [
        email, status, lname, fname, mname, suffix, address, mobile, age, dob, prof_info, 
        licensenum, job_title, department, experience, id
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Healthworker not found' });
        }
        res.json({ message: 'Healthworker updated successfully' });
    });
};

export const deleteHealthworker = async (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE users, details
        FROM tbl_accounts users
        INNER JOIN tbl_healthworkers details ON users.hworker_id = details.id
        WHERE users.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Healthworker not found' });
        }
        res.json({ message: 'Healthworker deleted successfully' });
    });
};