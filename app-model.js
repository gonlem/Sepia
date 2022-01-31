let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CertificateSchema = new Schema({
    alias: { type: String, required: true, maxlength: 30 },
    signer_cbe: { type: String, required: true, maxlength: 10 },
    signer_ssin: { type: String, required: false, maxlength: 11 },
    subject_dn: { type: String },
    valid_from: { type: Date },
    valid_to: { type: Date },
    private_key_bytes: { type: String },
    certificate_bytes: { type: String },
    csr_bytes: { type: String },
    comment: { type: String }
});
exports.Certificate = mongoose.model('Certificate', CertificateSchema);

let SigningRightSchema = new Schema({
    signer_cbe: { type: String, required: true, maxlength: 10 },
    signer_ssin: { type: String, required: false, maxlength: 11 },
    document_subject: { type: String, required: true, maxlength: 20 },
    document_classification: { type: String, required: true, maxlength: 20 },
    certificate_alias: { type: String }
});
exports.SigningRight = mongoose.model('SigningRight', SigningRightSchema);

let SignatureHistorySchema = new Schema({
    reception_date: { type: Date },
    client: { type: String },
    duration: { type: Date },
    status_code: { type: String },
    error_message: { type: String }
});
exports.SignatureHistory = mongoose.model('SignatureHistory', SignatureHistorySchema);