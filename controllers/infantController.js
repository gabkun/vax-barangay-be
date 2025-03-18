import db from '../utils/db.js';
import multer from 'multer';
import path from 'path';

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

export const createInfant = (req, res) => {
    upload.single('documents')(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'File upload error' });
        }

        const {
            lname,
            fname,
            mname,
            suffix,
            age,
            dob,
            purok,
            name_parent,
            status
        } = req.body;

        const documents = req.file ? req.file.filename : null;

        const sql = `
            INSERT INTO tbl_members (lname, fname, mname, suffix, age, dob, purok, documents, name_parent, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        `;
        const values = [lname, fname, mname, suffix, age, dob, purok, documents, name_parent, status];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            return res.status(201).json({ message: 'Infant record created successfully', itemId: results.insertId });
        });
    });
};

export const getInfants = (req, res) => {
    const sql = `
        SELECT m.*, p.name AS purok_name
        FROM tbl_members AS m
        LEFT JOIN tbl_purok AS p ON m.purok = p.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }

        return res.status(200).json({ message: 'Infants retrieved successfully', data: results });
    });
};
