import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, type, message } = await req.json();

    // transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // email body now includes phone 📱
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "admin@westerlig.com",
      subject: `Nuwe afspraak: ${type}`,
      text: `
Nuwe afspraak versoek 🚨

Naam: ${name}
E-pos: ${email}
Selfoon: ${phone || "Nie voorsien nie"}
Tipe: ${type}

Boodskap:
${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Mail error:", error);
    return NextResponse.json({ success: false, error });
  }
}
