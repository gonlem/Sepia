let Model = require('./app-model');

exports.home = async function (req, res, next) {
    let currentDay = new Date().toISOString().substring(0, 10);
    let startDate = new Date((req.query.date_from || currentDay) + 'T00:00:00.000Z');
    let endDate = new Date((req.query.date_to || currentDay) + 'T23:59:59.999Z');
    let signatureHistory = await Model.SignatureHistory.find({ reception_date: { '$gte': startDate, '$lte': endDate } }).sort({ reception_date: 'asc' }).exec();
    res.render('home.pug', { startDate, endDate, signatureHistory });
}

exports.list_signing_rights = async function (req, res, next) {
    let signingRights = await Model.SigningRight.find().sort({ signer_cbe: 'asc' }).exec();
    res.render('list-signing-rights.pug', { signingRights });
}

exports.create_signing_right = async function (req, res, next) {
    await Model.SigningRight.create({
        signer_cbe: req.body.signer_cbe,
        signer_ssin: req.body.signer_ssin,
        document_subject: req.body.document_subject,
        document_classification: req.body.document_classification,
        certificate_alias: req.body.certificate_alias
    });
    res.redirect('/sepia-admin/signing-rights');
}

exports.upload_signing_rights = async function (req, res, next) {
    if (req.files && req.files.csv) {
        console.log('Uploading ' + req.files.csv.name);
        let data = new TextDecoder('iso-8859-15').decode(req.files.csv.data);
        data = data.replace(/".*?"/g, (match) => match.replaceAll(';', ''));
        let csvLines = data.split('\r\n');
        for (let i = 1; i < csvLines.length; i++) {
            let csvLine = csvLines[i].split(';');
            if (csvLine.length == 5) {
                await Model.SigningRight.create({
                    signer_cbe: csvLine[0],
                    signer_ssin: csvLine[1],
                    document_subject: csvLine[2],
                    document_classification: csvLine[3],
                    certificate_alias: csvLine[4]
                });
            }
        }
    }
    res.redirect('/sepia-admin/signing-rights');
}

exports.view_signing_right = async function (req, res, next) {
    let signingRight = await Model.SigningRight.findById(req.params.srId).exec();
    if (signingRight != null) res.render('view-signing-right.pug', { signingRight });
    else res.redirect(303, '/sepia-admin/signing-rights');
}

exports.update_signing_right = async function (req, res, next) {
    let signingRights = await Model.SigningRight.findById(req.params.srId);
    signingRights.signer_cbe = req.body.signer_cbe;
    signingRights.signer_ssin = req.body.signer_ssin;
    signingRights.document_subject = req.body.document_subject;
    signingRights.document_classification = req.body.document_classification;
    signingRights.certificate_alias = req.body.certificate_alias
    await signingRights.save();
    res.redirect('/sepia-admin/signing-rights');
}

exports.delete_signing_right = async function (req, res, next) {
    await Model.SigningRight.deleteOne({ '_id': req.params.srId }).exec();
    res.sendStatus(204);
}

exports.list_certificates = async function (req, res, next) {
    let certificates = await Model.Certificate.find().sort({ valid_to: 'desc' }).exec();
    res.render('list-certificates.pug', { certificates });
}

exports.create_certificate = async function (req, res, next) {
    let alias = req.body.alias;
    alias ||= (req.body.signer_ssin != '' ? req.body.signer_ssin : req.body.signer_cbe);
    let subject_dn = 'CN=' + req.body.subject_cn + ',O=' + req.body.subject_o 
    + (req.body.subject_ou1 != '' ? ',OU=' + req.body.subject_ou1 : '')
    + (req.body.subject_ou2 != '' ? ',OU=' + req.body.subject_ou2 : '')
    + (req.body.subject_ou3 != '' ? ',OU=' + req.body.subject_ou3 : '')
    + (req.body.subject_email != '' ? ',E=' + req.body.subject_email : '')
    + ',C=' + req.body.subject_c;
    await Model.Certificate.create({
        alias: alias,
        signer_cbe: req.body.signer_cbe,
        signer_ssin: req.body.signer_ssin,
        subject_dn: subject_dn,
        comment: req.body.comment
    });
    res.redirect('/sepia-admin/certificates');
}

exports.view_certificate = async function (req, res, next) {
    let certificate = await Model.Certificate.findById(req.params.certId).exec();
    if (certificate != null) res.render('view-certificate.pug', { certificate });
    else res.redirect(303, '/sepia-admin/certificates');
}

exports.update_certificate = async function (req, res, next) {
    let certificate = await Model.Certificate.findById(req.params.certId);
    certificate.alias = req.body.alias;
    certificate.signer_cbe = req.body.signer_cbe;
    certificate.signer_ssin = req.body.signer_ssin;
    certificate.comment = req.body.comment;
    await certificate.save();
    res.redirect('/sepia-admin/certificates');
}

exports.delete_certificate = async function (req, res, next) {
    await Model.Certificate.deleteOne({ '_id': req.params.certId }).exec();
    res.sendStatus(204);
}