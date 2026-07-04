export function getWhatsAppUrl(phone: string, text?: string): string {
  if (!phone) return '#';

  // Strip all non-digit characters (e.g. spaces, plus signs, dashes)
  let cleanPhone = phone.replace(/\D/g, '');

  // If the number starts with 0 and is likely a Turkish number (e.g., 0531), replace 0 with 90
  if (cleanPhone.startsWith('05') && cleanPhone.length === 11) {
    cleanPhone = '9' + cleanPhone;
  }
  
  // If the number doesn't have a country code but is a 10-digit Turkish number (e.g., 531), add 90
  if (cleanPhone.startsWith('5') && cleanPhone.length === 10) {
    cleanPhone = '90' + cleanPhone;
  }

  // Base URL using api.whatsapp.com for best cross-platform compatibility
  let url = `https://api.whatsapp.com/send?phone=${cleanPhone}`;

  // If a pre-filled text message is provided, URI encode it and append
  if (text) {
    url += `&text=${encodeURIComponent(text)}`;
  }

  return url;
}
