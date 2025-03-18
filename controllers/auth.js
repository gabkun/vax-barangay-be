import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../utils/db.js';

dotenv.config();

export const signupAdmin = (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    db.query('SELECT * FROM tbl_accounts WHERE email = ?', [email], (err, existingUser) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Insert the new user
      db.query('INSERT INTO tbl_accounts (email, password, status, role) VALUES (?, ?, 1, 1)', [email, password], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const signupHealthworker = (req, res) => {
  try {
    const {
      email, password, lname, fname, mname, suffix, address, mobile, age, dob, prof_info, licensenum, job_title, department, experience
    } = req.body;

    const role = 2; // Default role for health workers

    // Insert the health worker data
    const healthWorkerQuery = `INSERT INTO tbl_healthworkers (lname, fname, mname, suffix, address, mobile, age, dob, prof_info, licensenum, job_title, department, experience) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const healthWorkerData = [lname, fname, mname, suffix, address, mobile, age, dob, prof_info, licensenum, job_title, department, experience];

    db.query(healthWorkerQuery, healthWorkerData, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating health worker' });
      }

      const hworker_id = result.insertId;

      // Insert the account data with default status (0)
      const accountQuery = 'INSERT INTO tbl_accounts (email, password, hworker_id, status, role) VALUES (?, ?, ?, 0, ?)';
      const accountData = [email, password, hworker_id, role];

      db.query(accountQuery, accountData, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error creating user account' });
        }

        res.status(201).json({ message: 'Health worker registered successfully', user_id: result.insertId });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const verifyCode = (req, res) => {
  try {
    const { user_id, code } = req.body;

    // Check if the verification code exists and matches the user
    const verificationQuery = 'SELECT * FROM tbl_verification WHERE user_id = ? AND code = ?';
    db.query(verificationQuery, [user_id, code], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }

      // Update the account status to verified (1)
      const updateStatusQuery = 'UPDATE tbl_accounts SET status = 1 WHERE id = ?';
      db.query(updateStatusQuery, [user_id], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error updating account status' });
        }

        // Optionally, delete the used verification code
        const deleteCodeQuery = 'DELETE FROM tbl_verification WHERE user_id = ?';
        db.query(deleteCodeQuery, [user_id], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting verification code' });
          }

          res.status(200).json({ message: 'Account verified successfully' });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists and the password matches
    const loginQuery = `
      SELECT *
      FROM tbl_accounts
      WHERE email = ? AND password = ?`;
    
    db.query(loginQuery, [email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const user = result[0];

      // Check if the account is verified
      if (user.status !== 1) {
        return res.status(403).json({ message: 'Account not verified' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time
      );

      // Check if role is 1 (admin) and return minimal details
      if (user.role === 1) {
        return res.status(200).json({ 
          message: 'Admin login successful', 
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          }
        });
      }

      // If not an admin, fetch health worker details
      const healthWorkerQuery = `
        SELECT h.id AS hworker_id, h.lname, h.fname, h.mname, h.suffix, h.address, 
               h.mobile, h.age, h.dob, h.prof_info, h.licensenum, h.job_title, 
               h.department, h.experience
        FROM tbl_healthworkers AS h
        WHERE h.id = ?`;

      db.query(healthWorkerQuery, [user.hworker_id], (err, hwResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }

        const healthWorker = hwResult[0];

        res.status(200).json({ 
          message: 'Health worker login successful', 
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            hworker_id: healthWorker.id,
            lname: healthWorker.lname,
            fname: healthWorker.fname,
            mname: healthWorker.mname,
            suffix: healthWorker.suffix,
            address: healthWorker.address,
            mobile: healthWorker.mobile,
            age: healthWorker.age,
            dob: healthWorker.dob,
            prof_info: healthWorker.prof_info,
            licensenum: healthWorker.licensenum,
            job_title: healthWorker.job_title,
            department: healthWorker.department,
            experience: healthWorker.experience
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

export const getUserDetails = (req, res) => {
  try {
    const { user_id, role, hworker_id } = req.user;

    // Fetch user details according to the role or health worker ID
    const userDetailsQuery = `
      SELECT a.*, h.id AS hworker_id, h.lname, h.fname, h.mname, h.suffix, h.address, 
             h.mobile, h.age, h.dob, h.prof_info, h.licensenum, h.job_title, 
             h.department, h.experience
      FROM tbl_accounts AS a
      JOIN tbl_healthworkers AS h ON a.hworker_id = h.id
      WHERE a.id = ? OR h.id = ?`;

    db.query(userDetailsQuery, [user_id, hworker_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = result[0];
      res.status(200).json({
        message: 'User details fetched successfully',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          hworker_id: user.hworker_id,
          lname: user.lname,
          fname: user.fname,
          mname: user.mname,
          suffix: user.suffix,
          address: user.address,
          mobile: user.mobile,
          age: user.age,
          dob: user.dob,
          prof_info: user.prof_info,
          licensenum: user.licensenum,
          job_title: user.job_title,
          department: user.department,
          experience: user.experience
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};  

export const getAdminDetails = (req, res) => {
  try {
    const { user_id } = req.user;

    // Fetch admin details from the database
    const adminDetailsQuery = `
      SELECT id, email, role
      FROM tbl_accounts
      WHERE id = ? AND role = 1
    `;

    db.query(adminDetailsQuery, [user_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      const admin = result[0];
      res.status(200).json({
        message: 'Admin details fetched successfully',
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};