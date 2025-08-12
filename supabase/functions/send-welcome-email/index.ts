import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  name: string;
  email: string;
  service: string;
  message: string;
}

const createWelcomeEmailHTML = (name: string, service: string, message: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo!</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a1a, #333333); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">
                    Obrigado pelo seu contato!
                </h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; color: #cccccc;">
                    Recebemos sua mensagem e entraremos em contato em breve
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px 20px; background-color: #111111;">
                <p style="font-size: 18px; margin: 0 0 20px 0; color: #ffffff;">
                    Olá <strong style="color: #4CAF50;">${name}</strong>,
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: #cccccc;">
                    Agradecemos seu interesse em nossos serviços${service && service !== '*service*' ? ` de <strong style="color: #4CAF50;">${service}</strong>` : ''}. 
                    Nossa equipe de advogados especializados analisará sua solicitação e retornará o contato o mais breve possível.
                </p>

                ${message ? `
                <div style="background-color: #1a1a1a; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #cccccc;">
                        <strong>Sua mensagem:</strong><br>
                        "${message}"
                    </p>
                </div>
                ` : ''}

                <p style="font-size: 16px; line-height: 1.6; margin: 20px 0; color: #cccccc;">
                    Enquanto isso, fique à vontade para entrar em contato conosco através dos canais abaixo:
                </p>

                <!-- Action Buttons -->
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://api.whatsapp.com/send?phone=5562994594496&text=Olá,%20vi%20que%20vocês%20entraram%20em%20contato%20comigo%20por%20email.%20Gostaria%20de%20conversar%20sobre%20meu%20caso." 
                       style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 0;">
                        💬 Falar no WhatsApp
                    </a>
                    
                    <a href="https://instagram.com/seu_perfil" 
                       style="display: inline-block; background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 0;">
                        📸 Seguir no Instagram
                    </a>
                </div>

                <!-- Contact Info -->
                <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #4CAF50; font-size: 18px;">Nossos Contatos</h3>
                    <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">
                        📞 <strong>Telefone:</strong> (62) 99459-4496
                    </p>
                    <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">
                        📧 <strong>Email:</strong> contato@escritorio.com.br
                    </p>
                    <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">
                        🌐 <strong>Website:</strong> www.seuescritorio.com.br
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #0a0a0a; padding: 20px; text-align: center; border-top: 1px solid #333333;">
                <p style="margin: 0; font-size: 12px; color: #666666;">
                    Este é um email automático. Não responda a este endereço.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #666666;">
                    © 2024 Escritório de Advocacia. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, service, message }: WelcomeEmailRequest = await req.json();

    const emailHTML = createWelcomeEmailHTML(name, service, message);

    const emailResponse = await resend.emails.send({
      from: "Escritório de Advocacia <onboarding@resend.dev>",
      to: [email],
      subject: `Obrigado pelo contato, ${name}! 📧`,
      html: emailHTML,
    });

    console.log("Email de boas-vindas enviado:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar email de boas-vindas:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);