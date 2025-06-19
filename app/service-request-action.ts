// 'use server';

// import Mailgun from 'mailgun.js';
// import { renderServiceRequestEmail } from '@/emails/service-request';
// import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
// import { ServiceRequestFormData, CreditForm } from '@/components/form/new';
// import dayjs from 'dayjs';
// import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';
// import utcPlugin from 'dayjs/plugin/utc';
// import timezonePlugin from 'dayjs/plugin/timezone';

// dayjs.extend(localizedFormatPlugin);
// dayjs.extend(utcPlugin);
// dayjs.extend(timezonePlugin);

// let destination = JSON.parse(process.env.MAILGUN_TO ?? '""');

// if (!(destination instanceof Array)) {
// 	console.error('Invalid destination: must be array');
// }

// let destinationEmail =
// 	destination instanceof Array
// 		? destination.filter((d): d is string => typeof d === 'string')
// 		: process.env.MAILGUN_TO;

// const mailgun = new Mailgun(FormData);
// const mg = mailgun.client({
// 	username: 'api',
// 	key: process.env.MAILGUN_KEY ?? '',
// 	url: '',
// });

// const recaptchaClient = new RecaptchaEnterpriseServiceClient();
// async function createAssessment({
// 	projectID = 'wjo-website',
// 	recaptchaKey = '6Lc-hCIqAAAAAIvuTEv2ITwP4kmsEn8WuICK3eic',
// 	token = 'action-token',
// 	recaptchaAction = 'action_name',
// }) {
// 	const projectPath = recaptchaClient.projectPath(projectID);

// 	const [response] = await recaptchaClient.createAssessment({
// 		assessment: {
// 			event: {
// 				token: token,
// 				siteKey: recaptchaKey,
// 			},
// 		},
// 		parent: projectPath,
// 	});

// 	if (!response.tokenProperties?.valid) {
// 		console.log(
// 			`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`
// 		);
// 		return null;
// 	}

// 	if (response.tokenProperties.action === recaptchaAction) {
// 		console.log(`The reCAPTCHA score is: ${response.riskAnalysis?.score}`);
// 		response.riskAnalysis?.reasons?.forEach((reason) => {
// 			console.log(reason);
// 		});

// 		return response.riskAnalysis?.score;
// 	} else {
// 		console.log(
// 			'The action attribute in your reCAPTCHA tag does not match the action you are expecting to score'
// 		);
// 		return null;
// 	}
// }

// export interface ServiceRequest {
// 	token: string;
// 	answers: ServiceRequestFormData;
// 	creditForm?: CreditForm;
// }

// export async function serviceRequestAction(serviceRequest: ServiceRequest) {
// 	const score = await createAssessment({
// 		token: serviceRequest.token,
// 		recaptchaAction: 'serviceRequestFormAction',
// 	});

// 	if (typeof score === 'undefined' || score === null || score < 0.7) {
// 		return;
// 	}
// 	const timestamp = dayjs(Date.now())
// 		.tz(process.env.TZ ?? 'America/New_York')
// 		.format('LLLL');
// 	const customerType = serviceRequest.answers.existingCustomer
// 		? 'an existing customer'
// 		: 'a new customer';
// 	const subject = `[${timestamp}] Service request from ${customerType}`;

// 	const mail = await renderServiceRequestEmail(
// 		serviceRequest.answers,
// 		serviceRequest.creditForm
// 	);
// 	await mg.messages.create(process.env.MAILGUN_DOMAIN ?? '', {
// 		to: destinationEmail,
// 		from: process.env.MAILGUN_FROM,
// 		html: mail,
// 		subject: subject,
// 	});
// }
