import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { naam, epos, nommer, betrokkeBy } = data;

    if (!naam || !epos || !nommer || !betrokkeBy) {
      return new Response(JSON.stringify({ error: "Alle velde is benodig" }), {
        status: 400,
      });
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // or your email host
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Raak Betrokke Submission",
      text: `
Naam: ${naam}
Epos: ${epos}
Nommer: ${nommer}
Betrokke By: ${betrokkeBy}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Boodskap gestuur!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Kon nie stuur nie" }), {
      status: 500,
    });
  }
}
