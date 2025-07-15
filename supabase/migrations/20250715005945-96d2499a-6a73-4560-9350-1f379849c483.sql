-- Adicionar colunas para cores personalizadas do título e descrição
ALTER TABLE public.link_tree ADD COLUMN title_color text;
ALTER TABLE public.link_tree ADD COLUMN description_color text;
ALTER TABLE public.link_tree ADD COLUMN title_size text DEFAULT 'text-3xl';
ALTER TABLE public.link_tree ADD COLUMN title_font text DEFAULT 'font-bold';
ALTER TABLE public.link_tree ADD COLUMN description_size text DEFAULT 'text-base';