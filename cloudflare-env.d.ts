declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
declare namespace Cloudflare {
  interface Env {
    PUBLIC_SITE_URL?:string;
    PUBLIC_LAUNCH?:string;
    PATIENT_OS_CHAT_URL?:string;
    PATIENT_OS_PORTAL_URL?:string;
    CRM_ENQUIRY_URL?:string;
    CRM_ENQUIRY_SECRET?:string;
    MAMTA_TENANT_ID?:string;
    TURNSTILE_SITE_KEY?:string;
    TURNSTILE_SECRET?:string;
  }
}
