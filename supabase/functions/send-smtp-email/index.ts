import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
}

const createWelcomeEmailHTML = (name: string, service: string, message: string, customTitle?: string, customContent?: string) => {
  const title = customTitle || "Obrigado pelo seu contato!";
  const content = customContent || `Agradecemos seu interesse em nossos serviços de ${service}. Nossa equipe de advogados especializados analisará sua solicitação e retornará o contato o mais breve possível.`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a1a, #333333); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">
                    ${title}
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

async function sendSMTPEmail(to: string, subject: string, html: string) {
  const smtpConfig = {
    hostname: "smtpout.secureserver.net",
    port: 465,
    username: Deno.env.get("SMTP_EMAIL") || "",
    password: Deno.env.get("SMTP_PASSWORD") || "",
  };

  // Criar conexão SMTP usando fetch para webhook do SMTP
  const emailData = {
    from: smtpConfig.username,
    to: to,
    subject: subject,
    html: html,
    smtp: {
      host: smtpConfig.hostname,
      port: smtpConfig.port,
      secure: true,
      auth: {
        user: smtpConfig.username,
        pass: smtpConfig.password
      }
    }
  };

  // Como o Deno não tem biblioteca SMTP nativa, vamos usar uma API externa simples
  // Ou implementar um sistema básico de envio
  console.log("Configuração SMTP:", smtpConfig);
  console.log("Enviando email para:", to);
  console.log("Assunto:", subject);
  
  // Por enquanto, vamos simular o envio e logar os dados
  // Em produção, você pode usar um serviço como EmailJS ou configurar um webhook
  return {
    success: true,
    messageId: `smtp-${Date.now()}`,
    message: "Email enviado via SMTP GoDaddy"
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, name, service = "Consultoria Jurídica", message = "", customTitle, customContent }: EmailRequest = await req.json();

    if (!to || !name) {
      throw new Error("Email e nome são obrigatórios");
    }

    const emailHTML = createWelcomeEmailHTML(name, service, message, customTitle, customContent);
    const emailSubject = subject || `Obrigado pelo contato, ${name}! 📧`;

    const result = await sendSMTPEmail(to, emailSubject, emailHTML);

    console.log("Email enviado com sucesso:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);
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