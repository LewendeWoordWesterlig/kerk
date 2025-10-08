import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, type, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nuwe Afspraak: ${type}`,
      text: `
Naam: ${name}
Email: ${email}
Telefoon: ${phone}
Boodskap: ${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mailer error:", err);
    return NextResponse.json({ success: false, error: "Email kon nie gestuur word nie" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
