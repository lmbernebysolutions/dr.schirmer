import { notion, NOTION_DATABASE_ID } from './notion-client';
import { 
  NotionPage, 
  AlertSettings, 
  NewsPost, 
  ContentType,
  NotionQueryResponse,
  NotionPageRequest 
} from '@/types/notion';

/**
 * Holt alle Einträge aus der Notion-Datenbank
 */
export async function getAllNotionPages(): Promise<NotionPage[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: NOTION_DATABASE_ID,
    });

    return response.results as NotionPage[];
  } catch (error) {
    console.error('Error fetching Notion pages:', error);
    throw error;
  }
}

/**
 * Holt Einträge nach Content-Type
 */
export async function getNotionPagesByType(contentType: ContentType): Promise<NotionPage[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Type',
        select: {
          equals: contentType === 'alert' ? 'Alert' : 'News'
        }
      }
    });

    return response.results as NotionPage[];
  } catch (error) {
    console.error(`Error fetching ${contentType} pages:`, error);
    throw error;
  }
}

/**
 * Konvertiert Notion-Seite zu AlertSettings
 */
export function convertToAlertSettings(page: NotionPage): AlertSettings {
  const properties = page.properties;
  
  return {
    id: page.id,
    isVisible: properties['Sichtbar']?.checkbox || false,
    text: properties['Text']?.rich_text?.[0]?.plain_text || '',
    lastUpdated: page.last_edited_time,
  };
}

/**
 * Konvertiert Notion-Seite zu NewsPost
 */
export function convertToNewsPost(page: NotionPage): NewsPost {
  const properties = page.properties;
  
  return {
    id: page.id,
    title: properties['Titel']?.title?.[0]?.plain_text || '',
    description: properties['Beschreibung']?.rich_text?.[0]?.plain_text || '',
    date: properties['Datum']?.date?.start || new Date().toISOString(),
    icon: properties['Icon']?.select?.name?.toLowerCase() as 'calendar' | 'heart' | 'shield' || 'calendar',
    color: properties['Farbe']?.select?.name?.toLowerCase() as 'yellow' | 'red' || 'yellow',
    published: properties['Veröffentlicht']?.checkbox || false,
  };
}

/**
 * Holt Alert-Einstellungen aus Notion
 */
export async function getAlertSettings(): Promise<AlertSettings | null> {
  try {
    const pages = await getNotionPagesByType('alert');
    
    if (pages.length === 0) {
      return null;
    }

    // Nehme den ersten Alert-Eintrag
    const firstPage = pages[0];
    if (!firstPage) {
      return null;
    }
    
    return convertToAlertSettings(firstPage);
  } catch (error) {
    console.error('Error fetching alert settings:', error);
    return null;
  }
}

/**
 * Holt alle News-Posts aus Notion
 */
export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const pages = await getNotionPagesByType('news');
    
    return pages.map(convertToNewsPost);
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return [];
  }
}

/**
 * Erstellt einen neuen Alert-Eintrag in Notion
 */
export async function createAlertSettings(alert: AlertSettings): Promise<string> {
  try {
    const response = await notion.pages.create({
      parent: {
        data_source_id: NOTION_DATABASE_ID,
      },
      properties: {
        'Type': {
          select: {
            name: 'Alert'
          }
        },
        'Sichtbar': {
          checkbox: alert.isVisible
        },
        'Text': {
          rich_text: [
            {
              text: {
                content: alert.text
              }
            }
          ]
        }
      }
    });

    return response.id;
  } catch (error) {
    console.error('Error creating alert settings:', error);
    throw error;
  }
}

/**
 * Aktualisiert Alert-Einstellungen in Notion
 */
export async function updateAlertSettings(alertId: string, alert: AlertSettings): Promise<void> {
  try {
    await notion.pages.update({
      page_id: alertId,
      properties: {
        'Sichtbar': {
          checkbox: alert.isVisible
        },
        'Text': {
          rich_text: [
            {
              text: {
                content: alert.text
              }
            }
          ]
        }
      }
    });
  } catch (error) {
    console.error('Error updating alert settings:', error);
    throw error;
  }
}

/**
 * Erstellt einen neuen News-Post in Notion
 */
export async function createNewsPost(news: NewsPost): Promise<string> {
  try {
    const response = await notion.pages.create({
      parent: {
        data_source_id: NOTION_DATABASE_ID,
      },
      properties: {
        'Type': {
          select: {
            name: 'News'
          }
        },
        'Titel': {
          title: [
            {
              text: {
                content: news.title
              }
            }
          ]
        },
        'Beschreibung': {
          rich_text: [
            {
              text: {
                content: news.description
              }
            }
          ]
        },
        'Datum': {
          date: {
            start: news.date
          }
        },
        'Icon': {
          select: {
            name: news.icon.charAt(0).toUpperCase() + news.icon.slice(1)
          }
        },
        'Farbe': {
          select: {
            name: news.color.charAt(0).toUpperCase() + news.color.slice(1)
          }
        },
        'Veröffentlicht': {
          checkbox: news.published
        }
      }
    });

    return response.id;
  } catch (error) {
    console.error('Error creating news post:', error);
    throw error;
  }
}

/**
 * Aktualisiert einen News-Post in Notion
 */
export async function updateNewsPost(newsId: string, news: NewsPost): Promise<void> {
  try {
    await notion.pages.update({
      page_id: newsId,
      properties: {
        'Titel': {
          title: [
            {
              text: {
                content: news.title
              }
            }
          ]
        },
        'Beschreibung': {
          rich_text: [
            {
              text: {
                content: news.description
              }
            }
          ]
        },
        'Datum': {
          date: {
            start: news.date
          }
        },
        'Icon': {
          select: {
            name: news.icon.charAt(0).toUpperCase() + news.icon.slice(1)
          }
        },
        'Farbe': {
          select: {
            name: news.color.charAt(0).toUpperCase() + news.color.slice(1)
          }
        },
        'Veröffentlicht': {
          checkbox: news.published
        }
      }
    });
  } catch (error) {
    console.error('Error updating news post:', error);
    throw error;
  }
}

/**
 * Löscht einen News-Post aus Notion
 */
export async function deleteNewsPost(newsId: string): Promise<void> {
  try {
    await notion.pages.update({
      page_id: newsId,
      archived: true
    });
  } catch (error) {
    console.error('Error deleting news post:', error);
    throw error;
  }
}
