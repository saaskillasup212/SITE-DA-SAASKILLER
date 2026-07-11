-- Create affiliates table
CREATE TABLE public.affiliates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  link_mensal TEXT NOT NULL,
  link_vitalicio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can view affiliate links)
CREATE POLICY "Anyone can view affiliates"
ON public.affiliates
FOR SELECT
USING (true);

-- Insert default affiliate for testing
INSERT INTO public.affiliates (slug, link_mensal, link_vitalicio)
VALUES ('lucas', 'https://pay.cakto.com.br/mensal-lucas', 'https://pay.cakto.com.br/vitalicio-lucas');