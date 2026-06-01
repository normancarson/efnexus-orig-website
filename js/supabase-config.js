/* ============================================================
   SUPABASE CONFIGURATION
   ------------------------------------------------------------
   👉 INSERT YOUR SUPABASE PROJECT URL AND ANON KEY BELOW.
   Find them in:
   Supabase Dashboard → Project Settings → API
============================================================ */

// 🔻🔻🔻 REPLACE THESE WITH YOUR SUPABASE CREDENTIALS 🔻🔻🔻
const SUPABASE_URL = "https://fkpkpdcatpaadngzkyxo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGtwZGNhdHBhYWRuZ3preXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDg4NzksImV4cCI6MjA5NTIyNDg3OX0.kBqEUw8Uy9pWdIcXoviwGmXU0KsUK2vgFo2DINN25yI";
// 🔺🔺🔺 ------------------------------------------------ 🔺🔺🔺


/* Create Supabase client */
const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


/* ============================================================
   SAVE CONTACT INQUIRY
   ------------------------------------------------------------
   Table: contact_inquiries

   Columns:
   - id (uuid, primary key)
   - first_name (text)
   - last_name (text)
   - email (text)
   - phone (text)
   - inquiry_type (text)
   - message (text)
   - created_at (timestamp default now())
============================================================ */
async function saveContactInquiry(data) {
  if (!supabaseClient) {
    console.warn("⚠️ Supabase not configured.");
    return { ok: false, message: "Supabase not configured yet." };
  }

  const { error } = await supabaseClient
    .from('contact_inquiries')
    .insert([data]);

  if (error) {
    console.error(error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}


/* ============================================================
   SAVE PARTNERSHIP REQUEST
   ------------------------------------------------------------
   Table: partnership_requests

   Columns:
   - id (uuid, primary key)
   - organization_name (text)
   - contact_person (text)
   - position (text)
   - email (text)
   - phone (text)
   - partnership_type (text)
   - country_region (text)
   - proposal (text)
   - created_at (timestamp default now())
============================================================ */
async function savePartnershipRequest(data) {
  if (!supabaseClient) {
    console.warn("⚠️ Supabase not configured.");
    return { ok: false, message: "Supabase not configured yet." };
  }

  const { error } = await supabaseClient
    .from('partnership_requests')
    .insert([data]);

  if (error) {
    console.error(error);
    return { ok: false, message: error.message };
  }

  return { ok: true };
}