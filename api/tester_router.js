const router = require("express").Router();
//const { checkToken } = require("../../auth/token_validation");
const {
  create_auth_user,
  auth_user_login,
  create_response,
  get_all_response,
  get_response_by_id,
  update_response,
  update_response_by_id,
  delete_response_by_id

} = require("./tester_controller");
const {checkToken} = require("../auth/token_validation")

router.post("/user", create_auth_user);
router.post("/login", auth_user_login);
router.post("/", checkToken, create_response);
router.get("/", checkToken, get_all_response);
router.get("/:id", checkToken, get_response_by_id);
router.patch("/", checkToken, update_response);
router.put("/:id", checkToken, update_response_by_id);
router.delete("/:id", checkToken, delete_response_by_id);

module.exports = router;