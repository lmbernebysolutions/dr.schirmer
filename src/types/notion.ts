// Notion API Types
export interface NotionPage {
  id: string;
  properties: Record<string, any>;
  created_time: string;
  last_edited_time: string;
}

// Alert Settings Interface
export interface AlertSettings {
  id?: string;
  isVisible: boolean;
  text: string;
  lastUpdated: string;
}

// News Post Interface
export interface NewsPost {
  id?: string;
  title: string;
  description: string;
  date: string;
  icon: 'calendar' | 'heart' | 'shield';
  color: 'yellow' | 'red';
  published: boolean;
}

// Notion Property Types
export interface NotionProperty {
  id: string;
  type: string;
  [key: string]: any;
}

// Notion Database Query Response
export interface NotionQueryResponse {
  object: 'list';
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

// Notion Page Create/Update Request
export interface NotionPageRequest {
  parent: {
    database_id: string;
  };
  properties: Record<string, any>;
}

// Content Type für Unterscheidung in der Datenbank
export type ContentType = 'alert' | 'news';

// Notion API Error
export interface NotionError {
  object: 'error';
  status: number;
  code: string;
  message: string;
}
