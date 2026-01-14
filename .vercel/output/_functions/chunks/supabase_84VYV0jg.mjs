import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qudtubjjqhibwwwwafwb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZHR1YmpqcWhpYnd3d3dhZndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzAxMTYsImV4cCI6MjA4MzkwNjExNn0.FDDMHAoxMsfyCh7-ir5OKPllw_tJ5OJhGkzqV5b0yzs";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase as s };
