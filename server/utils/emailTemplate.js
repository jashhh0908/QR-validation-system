// utils/emailTemplates.js

export const registrationEmailTemplate = (name, qrURL, token) => {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
        <h2 style="color: #2b6cb0; text-align: center;">🎉 Registration Successful</h2>
        <p>Hi <b>${name}</b>,</p>
        <p>Your registration for the event has been successfully completed. We are excited to have you!</p>
        
        <p>Below is your unique QR code for entry. Please keep this email handy for check-in.</p>

        <div style="text-align: center; background-color: #f9f9f9; padding: 30px; border-radius: 10px; margin: 20px 0;">
            <img src="${qrURL}" alt="QR Code" style="width: 250px; height: 300px; border: 5px solid #fff; shadow: 0 4px 6px rgba(0,0,0,0.1);" />
            <div style="margin-top: 15px;">
                <span style="font-size: 14px; color: #666; display: block; margin-bottom: 5px;">Verification Token:</span>
                <span style="font-size: 24px; font-weight: bold; color: #2b6cb0; letter-spacing: 2px;">${token}</span>
            </div>
        </div>

        <p style="font-size: 0.9em; color: #555;">
            <b>Note:</b> This QR code is unique to you. Do not share it with others as it can only be scanned once for entry.
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="text-align: center; color: #888; font-size: 0.8em;">
            Thank you,<br/>
            <b>Team DJS Nova</b>
        </p>
    </div>
    `;
};