import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, type, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // admin@westerlig.com
        pass: process.env.EMAIL_PASS, // App Password from Google
      },
    });

    await transporter.sendMail({
      from: `"Kerk Web" <${process.env.EMAIL_USER}>`,
      to: "admin@westerlig.com",
      subject: `Nuwe afspraak: ${type}`,
      text: `
Naam: ${name}
E-pos: ${email}
Telefoon: ${phone}
Tipe: ${type}
Boodskap: ${message}
      `,
      html: `
        <h2>Nuwe afspraak</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-pos:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Tipe:</strong> ${type}</p>
        <p><strong>Boodskap:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
