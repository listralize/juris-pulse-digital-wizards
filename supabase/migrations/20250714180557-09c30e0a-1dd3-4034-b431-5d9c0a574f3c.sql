-- Adicionar campo de opacidade de fundo
ALTER TABLE link_tree ADD COLUMN background_opacity DECIMAL(3,2) DEFAULT 0.5;