import { Client } from '@notionhq/client';

// Notion Client mit Integration Token
export const notion = new Client({
  auth: process.env.NOTION_API_KEY || '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',
});

// Notion Database ID
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '296487f344638080ad4dc8bc0030783a';

// Helper-Funktion um sicherzustellen, dass der Client konfiguriert ist
export const getNotionClient = () => {
  if (!notion) {
    throw new Error('Notion client not initialized');
  }
  return notion;
};

// Database ID für verschiedene Content-Typen
export const DATABASE_IDS = {
  ALERT: NOTION_DATABASE_ID,
  NEWS: NOTION_DATABASE_ID,
} as const;
