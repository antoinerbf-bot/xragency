import { readFile, writeFile, chmod, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { randomBytes, scryptSync } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const sourcePath = resolve(process.argv[2] || ".data/xr-crm.json");
const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminPassword = process.env.XR_CRM_ADMIN_PASS;
if (!url || !serviceKey || !adminPassword || adminPassword.length < 12) {
  throw new Error("Set VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and XR_CRM_ADMIN_PASS (12+ chars).");
}

const store = JSON.parse(await readFile(sourcePath, "utf8"));
const collections = ["members","leads","clients","quotes","invoices","projects","tasks","providers","notifications","activities"];
for (const key of collections) {
  if (!Array.isArray(store[key])) throw new Error(`Invalid or missing CRM collection: ${key}`);
}
if (!store.members.some((member) => member.id === "mem-admin")) {
  throw new Error("No mem-admin account found; aborting without changes.");
}

function hashPassword(password) {
  const salt = randomBytes(16);
  const digest = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${digest.toString("base64url")}`;
}

const credentials = [];
for (const member of store.members) {
  const password = member.id === "mem-admin" ? adminPassword : randomBytes(24).toString("base64url");
  member.passwordHash = hashPassword(password);
  credentials.push({
    id: member.id,
    email: member.email,
    temporaryPassword: member.id === "mem-admin" ? "[SET IN XR_CRM_ADMIN_PASS]" : password,
  });
}

const client = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const { data: existing, error: readError } = await client
  .from("xr_crm_state")
  .select("id,version")
  .eq("id", "main")
  .maybeSingle();

if (readError) throw readError;
if (existing) {
  throw new Error(`CRM state already exists (version ${existing.version}); refusing to overwrite production data.`);
}

const { error: insertError } = await client
  .from("xr_crm_state")
  .insert({ id: "main", state: store, version: 1 });
if (insertError) throw insertError;

const outputDir = resolve(".data/backups");
await mkdir(outputDir, { recursive: true });
const credentialsPath = resolve(
  outputDir,
  `xr-crm-temporary-credentials-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
);
await writeFile(credentialsPath, JSON.stringify(credentials, null, 2), { mode: 0o600 });
await chmod(credentialsPath, 0o600);

console.log(JSON.stringify({
  imported: true,
  version: 1,
  sourcePath,
  counts: Object.fromEntries(collections.map((key) => [key, store[key].length])),
  credentialsPath,
  staffCredentialsGenerated: credentials.filter((entry) => entry.id !== "mem-admin").length,
}, null, 2));

[executed on device: MacBook-Air-de-rousseau.local (0e45da18-76cf-43a9-8d87-a4dcd1ea626d)]