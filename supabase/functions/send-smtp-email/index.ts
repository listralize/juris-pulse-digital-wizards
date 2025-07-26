import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  name: string;
  service?: string;
  message?: string;
  customTitle?: string;
  customContent?: string;
  logoUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  customHtml?: string;
}

const createWelcomeEmailHTML = (name: string, service: string, message: string, customTitle?: string, customContent?: string, logoUrl?: string, backgroundColor?: string, textColor?: string, buttonColor?: string, customHtml?: string) => {
  const title = customTitle || "Obrigado pelo seu contato!";
  const content = customContent || `Agradecemos seu interesse em nossos serviços de ${service}. Nossa equipe de advogados especializados analisará sua solicitação e retornará o contato o mais breve possível.`;
  const defaultLogo = "https://hmfsvccbyxhdwmrgcyff.supabase.co/storage/v1/object/public/videos/logo-email.png";
  const emailLogo = logoUrl || defaultLogo;
  const bgColor = backgroundColor || '#000000';
  const txtColor = textColor || '#ffffff';
  const btnColor = buttonColor || '#4CAF50';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${bgColor}; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: ${bgColor}; color: ${txtColor};">${customHtml ? `<div>${customHtml}</div>` : ''}
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a1a, #333333); padding: 40px 20px; text-align: center;">
                <!-- Logo -->
                <div style="margin-bottom: 20px;">
                    <img src="${emailLogo}" alt="Logo" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
                </div>
                <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: ${txtColor};">
                    ${title}
                </h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; color: ${txtColor};">
                    Recebemos sua mensagem e entraremos em contato em breve
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px 20px; background-color: #111111;">
                <p style="font-size: 18px; margin: 0 0 20px 0; color: ${txtColor};">
                    Olá <strong style="color: ${btnColor};">${name}</strong>,
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: ${txtColor};">
                    ${content}
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
                       style="display: inline-block; background-color: ${btnColor}; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 0;">
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
                        📧 <strong>Email:</strong> contato@stadv.com.br
                    </p>
                    <p style="margin: 5px 0; color: #cccccc; font-size: 14px;">
                        🌐 <strong>Website:</strong> www.stadv.com.br
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

// Função para enviar email via Resend
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = "contato@stadv.com.br";
  
  console.log("=== CONFIGURAÇÃO EMAIL ===");
  console.log("Provedor: Resend");
  console.log("De:", fromEmail);
  console.log("Para:", to);
  console.log("Assunto:", subject);
  console.log("API Key configurada:", resendApiKey ? "Sim" : "Não");
  
  try {
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY não configurada. Configure no painel de secrets do Supabase.");
    }

    const resend = new Resend(resendApiKey);

    const emailResponse = await resend.emails.send({
      from: `Escritório de Advocacia <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: html,
    });

    console.log("✅ Email enviado com sucesso via Resend:", emailResponse);

    return {
      success: true,
      messageId: emailResponse.data?.id || `resend-${Date.now()}`,
      message: "Email enviado com sucesso via Resend",
      details: {
        from: fromEmail,
        to: to,
        subject: subject,
        timestamp: new Date().toISOString(),
        resend_id: emailResponse.data?.id
      }
    };

  } catch (error) {
    console.error("❌ Erro no envio via Resend:", error);
    throw new Error(`Falha no envio: ${error.message}`);
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, name, service = "Consultoria Jurídica", message = "", customTitle, customContent, logoUrl, backgroundColor, textColor, buttonColor, customHtml }: EmailRequest = await req.json();

    if (!to || !name) {
      throw new Error("Email e nome são obrigatórios");
    }

    const emailHTML = createWelcomeEmailHTML(name, service, message, customTitle, customContent, logoUrl, backgroundColor, textColor, buttonColor, customHtml);
    const emailSubject = subject || `Obrigado pelo contato, ${name}! 📧`;

    const result = await sendEmail(to, emailSubject, emailHTML);

    console.log("✅ Email processado com sucesso:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ Erro ao processar email:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Verifique as configurações SMTP da GoDaddy"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);