-- Inserir dados de exemplo para website_analytics
INSERT INTO website_analytics (
    session_id, visitor_id, page_url, page_title, timestamp, session_start,
    country, city, device_type, browser, user_agent, referrer,
    time_on_page, scroll_depth, session_duration
) VALUES 
    ('session_1', 'visitor_1', 'https://example.com', 'Homepage', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour', 'Brazil', 'São Paulo', 'desktop', 'Chrome', 'Mozilla/5.0...', 'https://google.com', 120, 80, 180),
    ('session_2', 'visitor_2', 'https://example.com/services', 'Serviços', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 hours', 'Brazil', 'Rio de Janeiro', 'mobile', 'Safari', 'Mozilla/5.0...', 'https://facebook.com', 90, 60, 150),
    ('session_3', 'visitor_3', 'https://example.com/about', 'Sobre', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '3 hours', 'Brazil', 'Brasília', 'tablet', 'Chrome', 'Mozilla/5.0...', 'direct', 200, 90, 300),
    ('session_4', 'visitor_4', 'https://example.com', 'Homepage', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours', 'Brazil', 'Fortaleza', 'mobile', 'Chrome', 'Mozilla/5.0...', 'https://google.com', 80, 45, 120),
    ('session_5', 'visitor_5', 'https://example.com/contact', 'Contato', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', 'Brazil', 'Salvador', 'desktop', 'Firefox', 'Mozilla/5.0...', 'https://bing.com', 180, 95, 220);

-- Inserir dados de exemplo para conversion_events
INSERT INTO conversion_events (
    session_id, visitor_id, event_type, event_action, form_id, form_name,
    page_url, timestamp, lead_data, conversion_value, event_category,
    campaign_source, campaign_medium, campaign_name
) VALUES 
    ('session_1', 'visitor_1', 'form_submission', 'submit', 'default', 'Formulário Principal', 'https://example.com', NOW() - INTERVAL '1 hour', '{"nome": "João Silva", "email": "joao@email.com"}', 100, 'lead_generation', 'google', 'cpc', 'campanha_advogados'),
    ('session_3', 'visitor_3', 'form_submission', 'submit', 'form_1750046427892', 'sdgs', 'https://example.com/services', NOW() - INTERVAL '3 hours', '{"nome": "Maria Santos", "email": "maria@email.com"}', 100, 'lead_generation', 'facebook', 'social', 'campanha_social'),
    ('session_5', 'visitor_5', 'form_submission', 'submit', 'default', 'Formulário Principal', 'https://example.com/contact', NOW() - INTERVAL '1 day', '{"nome": "Pedro Costa", "email": "pedro@email.com"}', 100, 'lead_generation', 'direct', 'none', 'organico');