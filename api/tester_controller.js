const { 
  createUser,
  userLogin,
  createResponse, 
  getRsponse, 
  getResbyId, 
  updateResponse,
  updateById,
  deleteResponse
} = require("./tester_service");

const { compare, hashSync, genSaltSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  //CREATE REPONSE (POST)
    create_auth_user: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      createUser(body, (err, results) => {
      if (err) {
          console.log(err);
          return res.status(500).json({
          status: 0,
          message: "Connection errror"
          });
      }
      return res.status(200).json({
        success: 1,
          data: results
      });
    });
  },

  //LOGIN AUTHORISATION (POST)
  auth_user_login: (req, res) => {
    const body = req.body;
    userLogin(body.user_email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compare(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results },  process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },

  //CREATE REPONSE (POST)
  create_response: (req, res) => {
          const body = req.body;
          createResponse(body, (err, results) => {
          if (err) {
              console.log(err);
              return res.status(500).json({
              status: 0,
              message: "Database connection errror"
              });
          }
          return res.status(200).json({
            success: 1,
              data: results
          });
      });
  },

  //GET ALL RESPONSE (GET)
  get_all_response: (req, res) => {
      getRsponse((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
  },

  //GETTING RESPONSE BY ID (GET)
  get_response_by_id: (req, res) => {
      const id = req.params.id;
      getResbyId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        return res.json({
          success: 1,
          data: results
        });
      });
  },

  //UPDATE RESPONSE (PATCH)
  update_response: (req, res) => {
      const body = req.body;
      updateResponse(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
  },

  //UPDATE RESPONSE BY ID (PUT)
  update_response_by_id: (req, res) => {
      const url_id = req.params.id;
      const body = req.body;
      updateById(url_id, body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
  },

  //DELETE 
  delete_response_by_id: (req, res) => {
    const id = req.params.id;
    deleteResponse(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
}