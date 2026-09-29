/**
 * Language-independent content: technology names and diagram structure.
 * Visible labels/descriptions for each key live in /src/translations.
 * Only list technologies that genuinely represent the company's work.
 */

export const heroLayers = ['web', 'crm', 'database', 'server', 'network', 'cloud', 'whatsapp', 'ai'];

export const techMap = [
  { key: 'development', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL', 'MySQL', 'REST APIs'] },
  { key: 'infrastructure', items: ['Dell', 'HP/HPE', 'Lenovo', 'Proxmox'] },
  { key: 'servers', items: ['Linux', 'Ubuntu', 'Windows Server', 'Docker'] },
  { key: 'networking', items: ['WireGuard', 'Tailscale', 'VPN', 'TCP/IP', 'Subnetting', 'Firewall'] },
  { key: 'collaboration', items: ['Git', 'GitHub', 'Mattermost'] },
  { key: 'communication', items: ['WhatsApp Business API', 'WhatsApp Cloud API', 'n8n'] },
  { key: 'ai', items: ['LLM APIs', 'RAG', 'Embeddings', 'Vector Databases', 'AI Automation'] },
];

/* Tree diagrams: { key, children } — labels come from translations. */
export const networkTree = {
  key: 'internet',
  children: [{
    key: 'gateway',
    children: [{
      key: 'headOffice',
      children: [
        { key: 'server', children: [{ key: 'proxmox', children: [{ key: 'linux' }, { key: 'windows' }, { key: 'docker' }] }] },
        { key: 'office' },
        { key: 'firewall', children: [{ key: 'vpn', children: [{ key: 'officeA', children: [{ key: 'remote' }] }, { key: 'officeB' }, { key: 'officeC' }] }] },
      ],
    }],
  }],
};

export const proxmoxTree = {
  key: 'physical',
  children: [{
    key: 'proxmox',
    children: [
      { key: 'windows', children: [{ key: 'apps' }] },
      { key: 'linux', children: [{ key: 'web' }] },
      { key: 'docker', children: [{ key: 'services' }] },
    ],
  }],
};

export const whatsappTree = {
  key: 'customer',
  children: [{
    key: 'whatsapp',
    children: [{
      key: 'webhook',
      children: [{
        key: 'db',
        children: [{ key: 'dashboard' }, { key: 'mattermost' }, { key: 'automation', children: [{ key: 'ai' }] }],
      }],
    }],
  }],
};

export const architectureChain = ['customer', 'website', 'crm', 'database', 'server', 'network', 'whatsapp', 'automation', 'ai'];

export const capabilityBranches = ['software', 'infrastructure', 'networking', 'communication', 'ai'];

export const accents = ['blue', 'cyan', 'green', 'purple', 'orange', 'red'];
