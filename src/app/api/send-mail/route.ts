import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type MailRequest = {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body: MailRequest = await req.json();

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
      subject: `Nuwe afspraak van ${body.name}`,
      text: `
Naam: ${body.name}
E-pos: ${body.email}
Selfoon: ${body.phone}
Tipe: ${body.type}

Boodskap:
${body.message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send mail error:", error);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
