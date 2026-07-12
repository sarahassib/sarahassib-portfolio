import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utudjnummjtubcfxbolx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dWRqbnVtbWp0dWJjZnhib2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTQ5MjMsImV4cCI6MjA5OTA3MDkyM30.ERnvBs4a2v6LZQdZlTWoNHsCuhzQ0byMXPdxd6NPzTY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
