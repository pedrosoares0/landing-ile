-- Script SQL para criar a tabela de pré-cadastro no Supabase
-- Execute este script no SQL Editor do seu projeto Supabase (https://supabase.com/dashboard/project/urkpymmdcfnxpqsadtim/sql)

-- 1. Criar a tabela 'landing_acesso_antecipado'
CREATE TABLE IF NOT EXISTS public.landing_acesso_antecipado (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    landing_nome TEXT NOT NULL,
    landing_terreiro TEXT NOT NULL,
    landing_cidade TEXT NOT NULL,
    landing_estado TEXT NOT NULL,
    landing_whatsapp TEXT NOT NULL,
    landing_email TEXT NOT NULL
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE public.landing_acesso_antecipado ENABLE ROW LEVEL SECURITY;

-- 3. Criar política de permissão para permitir inserções públicas (qualquer visitante da landing page pode se cadastrar)
CREATE POLICY "Permitir inserções públicas no pré-cadastro" 
ON public.landing_acesso_antecipado 
FOR INSERT 
WITH CHECK (true);

-- 4. Criar política de permissão para leitura autenticada/admin
CREATE POLICY "Permitir leitura para usuários autenticados" 
ON public.landing_acesso_antecipado 
FOR SELECT 
USING (true);
