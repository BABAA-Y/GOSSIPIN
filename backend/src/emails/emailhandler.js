import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "welcome to GOSSIPIN",
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if (error) {
        console.error("error sending welcome email", error);
        throw new Error("Failed to send welcome email");
    }
    console.log("welcome Email send successfully", data);
    
}