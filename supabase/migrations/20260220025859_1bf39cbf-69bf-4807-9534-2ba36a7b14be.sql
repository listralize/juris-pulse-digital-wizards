
UPDATE step_forms
SET 
  steps = '[
    {
      "id": "question_1754967366902",
      "type": "question",
      "title": "Qual o regime do seu casamento?",
      "options": [
        {"text": "União estável", "value": "opt1", "nextStep": "question_1755012961247"},
        {"text": "Comunhão parcial", "value": "opt1754967411549", "nextStep": "question_1755012961247"},
        {"text": "Comunhão universal", "value": "opt1754967422523", "nextStep": "question_1755012961247"},
        {"text": "Separação total", "value": "opt1754967429041", "nextStep": "question_1755012961247"},
        {"text": "Não sei", "value": "opt1754967442887", "nextStep": "question_1755012961247"}
      ],
      "position": {"x": -1217, "y": -864},
      "description": "Entender seu regime de bens é o primeiro passo para garantir seus direitos. Selecione a opção que melhor descreve sua situação."
    },
    {
      "id": "question_1755012961247",
      "type": "question",
      "title": "Há bens para dividir?",
      "options": [
        {"text": "Sim", "value": "opt1", "nextStep": "question_1755013049207"},
        {"text": "Não", "value": "opt1755012988974", "nextStep": "question_1755013049207"}
      ],
      "position": {"x": -338, "y": -748},
      "description": "Imóveis, veículos, investimentos ou outros bens adquiridos durante a relação podem ser partilhados."
    },
    {
      "id": "question_1755013049207",
      "type": "question",
      "title": "Existe alguma dívida em comum?",
      "options": [
        {"text": "Sim", "value": "opt1", "nextStep": "question_1755013108966"},
        {"text": "Não", "value": "opt1755013062992", "nextStep": "question_1755013108966"}
      ],
      "position": {"x": 32, "y": -737},
      "description": "Financiamentos, empréstimos ou outras dívidas contraídas em conjunto também precisam ser resolvidos."
    },
    {
      "id": "question_1755013108966",
      "type": "question",
      "title": "Vocês têm filhos menores de 18 anos?",
      "options": [
        {"text": "Sim", "value": "opt1", "nextStep": "question_1755013141974"},
        {"text": "Não", "value": "opt1755013119583", "nextStep": "question_urgency_20260220"}
      ],
      "position": {"x": 346, "y": -723},
      "description": "Se houver filhos menores, cuidaremos de guarda e pensão para proteger o bem-estar deles."
    },
    {
      "id": "question_1755013141974",
      "type": "question",
      "title": "Qual tipo de guarda você idealiza?",
      "options": [
        {"text": "Compartilhada", "value": "opt1", "nextStep": "question_1755013286583"},
        {"text": "Unilateral", "value": "opt1755013180976", "nextStep": "question_1755013286583"},
        {"text": "Alternada", "value": "opt1755013184317", "nextStep": "question_1755013286583"},
        {"text": "Não sei", "value": "opt1755013191512", "nextStep": "question_1755013286583"}
      ],
      "position": {"x": 677, "y": -852},
      "description": "A guarda compartilhada é a mais comum, mas cada caso é único. Vamos encontrar a melhor solução juntos."
    },
    {
      "id": "question_1755013286583",
      "type": "question",
      "title": "Haverá pensão alimentícia?",
      "options": [
        {"text": "Sim", "value": "opt1", "nextStep": "question_urgency_20260220"},
        {"text": "Não", "value": "opt1755013352158", "nextStep": "question_urgency_20260220"}
      ],
      "position": {"x": 1019, "y": -778},
      "description": "A pensão alimentícia garante o sustento dos filhos. Vamos avaliar o melhor valor para sua situação."
    },
    {
      "id": "question_urgency_20260220",
      "type": "question",
      "title": "Qual a urgência do seu caso?",
      "options": [
        {"text": "Preciso resolver urgentemente", "value": "opt_urgente", "nextStep": "form_1754914726981"},
        {"text": "Nas próximas semanas", "value": "opt_semanas", "nextStep": "form_1754914726981"},
        {"text": "Estou pesquisando", "value": "opt_pesquisa", "nextStep": "form_1754914726981"}
      ],
      "position": {"x": 1300, "y": -600},
      "description": "Entender sua urgência nos ajuda a priorizar e oferecer o melhor atendimento."
    },
    {
      "id": "form_1754914726981",
      "type": "form",
      "title": "Dê o próximo passo para sua tranquilidade.",
      "position": {"x": 1600, "y": -400},
      "formFields": [
        {"name": "Nome", "type": "text", "label": "Seu nome completo", "required": true, "placeholder": "Seu nome completo"},
        {"name": "Telefone", "type": "tel", "label": "Seu WhatsApp (com DDD)", "required": false, "placeholder": "Seu WhatsApp (com DDD)"},
        {"name": "Email", "type": "email", "label": "Email", "required": false, "placeholder": "Seu melhor email"}
      ],
      "description": "Preencha seus dados para receber uma análise gratuita do seu caso em até 24h. Um especialista entrará em contato."
    }
  ]'::jsonb,
  flow_config = '{
    "edges": [
      {"id": "e_regime_0_partilha", "source": "question_1754967366902", "target": "question_1755012961247", "sourceHandle": "option-0"},
      {"id": "e_regime_1_partilha", "source": "question_1754967366902", "target": "question_1755012961247", "sourceHandle": "option-1"},
      {"id": "e_regime_2_partilha", "source": "question_1754967366902", "target": "question_1755012961247", "sourceHandle": "option-2"},
      {"id": "e_regime_3_partilha", "source": "question_1754967366902", "target": "question_1755012961247", "sourceHandle": "option-3"},
      {"id": "e_regime_4_partilha", "source": "question_1754967366902", "target": "question_1755012961247", "sourceHandle": "option-4"},
      {"id": "e_partilha_0_divida", "source": "question_1755012961247", "target": "question_1755013049207", "sourceHandle": "option-0"},
      {"id": "e_partilha_1_divida", "source": "question_1755012961247", "target": "question_1755013049207", "sourceHandle": "option-1"},
      {"id": "e_divida_0_filhos", "source": "question_1755013049207", "target": "question_1755013108966", "sourceHandle": "option-0"},
      {"id": "e_divida_1_filhos", "source": "question_1755013049207", "target": "question_1755013108966", "sourceHandle": "option-1"},
      {"id": "e_filhos_sim_guarda", "source": "question_1755013108966", "target": "question_1755013141974", "sourceHandle": "option-0"},
      {"id": "e_filhos_nao_urgencia", "source": "question_1755013108966", "target": "question_urgency_20260220", "sourceHandle": "option-1"},
      {"id": "e_guarda_0_pensao", "source": "question_1755013141974", "target": "question_1755013286583", "sourceHandle": "option-0"},
      {"id": "e_guarda_1_pensao", "source": "question_1755013141974", "target": "question_1755013286583", "sourceHandle": "option-1"},
      {"id": "e_guarda_2_pensao", "source": "question_1755013141974", "target": "question_1755013286583", "sourceHandle": "option-2"},
      {"id": "e_guarda_3_pensao", "source": "question_1755013141974", "target": "question_1755013286583", "sourceHandle": "option-3"},
      {"id": "e_pensao_0_urgencia", "source": "question_1755013286583", "target": "question_urgency_20260220", "sourceHandle": "option-0"},
      {"id": "e_pensao_1_urgencia", "source": "question_1755013286583", "target": "question_urgency_20260220", "sourceHandle": "option-1"},
      {"id": "e_urgencia_0_form", "source": "question_urgency_20260220", "target": "form_1754914726981", "sourceHandle": "option-0"},
      {"id": "e_urgencia_1_form", "source": "question_urgency_20260220", "target": "form_1754914726981", "sourceHandle": "option-1"},
      {"id": "e_urgencia_2_form", "source": "question_urgency_20260220", "target": "form_1754914726981", "sourceHandle": "option-2"}
    ]
  }'::jsonb,
  seo_config = jsonb_set(
    jsonb_set(
      jsonb_set(
        COALESCE(seo_config, '{}'::jsonb),
        '{meta_title}', '"Divórcio Online Rápido | Consulta Gratuita - Serafim & Trombela"'
      ),
      '{meta_description}', '"Resolva seu divórcio ou dissolução de união estável 100% online. Guarda, pensão e partilha de bens. Atendimento em 24h."'
    ),
    '{meta_keywords}', '"divórcio online, divórcio rápido, guarda compartilhada, pensão alimentícia, advogado divórcio goiânia, partilha de bens, união estável"'
  ),
  seo = jsonb_set(
    jsonb_set(
      COALESCE(seo, '{}'::jsonb),
      '{meta_title}', '"Divórcio Online Rápido | Consulta Gratuita - Serafim & Trombela"'
    ),
    '{meta_description}', '"Resolva seu divórcio ou dissolução de união estável 100% online. Guarda, pensão e partilha de bens. Atendimento em 24h."'
  ),
  updated_at = now()
WHERE slug = 'divorcioform';
