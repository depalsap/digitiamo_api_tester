const pool = require("../config/database");

module.exports = {
  createUser: (data, callBack) => {
    pool.query(
      `INSERT INTO AUTH_USER (user_email, password) 
                values(?,?)`,
      [
        data.user_email,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  userLogin: (email, callBack) => {
    pool.query(
      `SELECT user_email, password FROM AUTH_USER WHERE user_email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  createResponse: (data, callBack) => {
        pool.query(
          `INSERT INTO URL_INFO (domain_name, site_scheme, url_path) 
                    values(?,?,?)`,
          [
            data.domain_name,
            data.site_scheme,
            data.url_path
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    getRsponse: callBack => {
        pool.query(
          `SELECT url_id, domain_name, site_scheme, url_path FROM URL_INFO`,
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    getResbyId: (id, callBack) => {
        pool.query(
          `SELECT url_id, domain_name, site_scheme, url_path FROM URL_INFO WHERE url_id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },

    //PATCH
    updateResponse: (data, callBack) => {
        pool.query(
            `UPDATE URL_INFO SET domain_name=?, site_scheme=?, url_path=? WHERE url_id = ?`,
          [
            data.domain_name,
            data.site_scheme,
            data.url_path,
            data.url_id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    //PUT
    updateById: (url_id, data, callBack) => {
        pool.query(
            `UPDATE URL_INFO SET domain_name=?, site_scheme=?, url_path=? WHERE url_id = ?`,
          [
            data.domain_name,
            data.site_scheme,
            data.url_path,
            url_id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    deleteResponse: (id, callBack) => {
      pool.query(
        `DELETE FROM URL_INFO WHERE url_id = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    }
}