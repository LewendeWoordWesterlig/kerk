import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, type, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nuwe Afspraak van ${name}`,
      text: `
        Naam: ${name}
        E-pos: ${email}
        Selfoon: ${phone}
        Tipe: ${type}
        Boodskap: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Mail error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
