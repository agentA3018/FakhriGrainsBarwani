/**
 * EmailJS Configuration — Fakhri Grains Barwani
 *
 * Setup instructions:
 * 1. Create a free account at https://www.emailjs.com/
 * 2. Add an Email Service (connect your Gmail: fakhrigrainsbarwani53@gmail.com)
 * 3. Create an Email Template with these variables:
 *    {{customer_name}}, {{customer_company}}, {{customer_phone}},
 *    {{customer_email}}, {{customer_location}}, {{customer_message}},
 *    {{product_list}}, {{submission_date}}, {{submission_time}}
 * 4. Copy the Service ID, Template ID, and Public Key below.
 */

export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_urxra6v'
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qx7e1gn'
export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'Fdh5yJTzRpkBHk12a'

/**
 * The email address that receives inquiries.
 * Configure this in your EmailJS template's "To Email" field.
 */
export const INQUIRY_EMAIL = process.env.NEXT_PUBLIC_INQUIRY_EMAIL || 'fakhrigrainsbarwani53@gmail.com'
