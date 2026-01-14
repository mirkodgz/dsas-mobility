-- 1. MARCHE
ALTER TABLE public.marche ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for marche" ON public.marche;
CREATE POLICY "Enable all access for marche" ON public.marche FOR ALL USING (true) WITH CHECK (true);

-- 2. CATEGORIE
ALTER TABLE public.categorie ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for categorie" ON public.categorie;
CREATE POLICY "Enable all access for categorie" ON public.categorie FOR ALL USING (true) WITH CHECK (true);

-- 3. ALIMENTAZIONI
ALTER TABLE public.alimentazioni ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for alimentazioni" ON public.alimentazioni;
CREATE POLICY "Enable all access for alimentazioni" ON public.alimentazioni FOR ALL USING (true) WITH CHECK (true);

-- 4. CAMBI
ALTER TABLE public.cambi ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for cambi" ON public.cambi;
CREATE POLICY "Enable all access for cambi" ON public.cambi FOR ALL USING (true) WITH CHECK (true);

-- 5. TEMPI CONSEGNA
ALTER TABLE public.tempi_consegna ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all access for tempi_consegna" ON public.tempi_consegna;
CREATE POLICY "Enable all access for tempi_consegna" ON public.tempi_consegna FOR ALL USING (true) WITH CHECK (true);
