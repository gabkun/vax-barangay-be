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
