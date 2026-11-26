import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://twxjcfscbomjlwurgxmg.supabase.co";
const supabaseKey = "sb_publishable_5HGUbt3_a2ympTKWxcPBIQ_7Vx144LP";

export const supabase = createClient(supabaseUrl, supabaseKey);