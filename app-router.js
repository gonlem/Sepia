let express = require('express');
let router = express.Router();
let Controller = require('./app-controller');

router.get('/home', Controller.home);

router.get('/signing-rights', Controller.list_signing_rights);
router.post('/signing-rights', Controller.create_signing_right);
router.post('/signing-rights-upload', Controller.upload_signing_rights);
router.get('/signing-rights/:srId', Controller.view_signing_right);
router.post('/signing-rights/:srId', Controller.update_signing_right);
router.delete('/signing-rights/:srId', Controller.delete_signing_right);

router.get('/certificates', Controller.list_certificates);
router.post('/certificates', Controller.create_certificate);
router.get('/certificates/:certId', Controller.view_certificate);
router.post('/certificates/:certId', Controller.update_certificate);
router.delete('/certificates/:certId', Controller.delete_certificate);

module.exports = router;