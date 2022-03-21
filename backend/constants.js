const GOOGLE_MAIL = {
	user: process.env.GOOGLE_MAIL_USER || "",
	pass: process.env.GOOGLE_MAIL_PASS || "",
};

exports.google = GOOGLE_MAIL;
