import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  getNewsPosts, 
  createNewsPost, 
  updateNewsPost, 
  deleteNewsPost 
} from '@/lib/notion-helpers';
import { NewsPost } from '@/types/notion';

// Middleware für Authentifizierung
async function checkAuth() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('admin-auth');
  
  if (authCookie?.value !== 'authenticated') {
    throw new Error('Unauthorized');
  }
}

export async function GET() {
  try {
    await checkAuth();
    
    const newsPosts = await getNewsPosts();
    
    return NextResponse.json(newsPosts);
  } catch (error) {
    console.error('Error fetching news posts:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fallback zu Standard-News bei API-Fehlern
    const fallbackNews: NewsPost[] = [
      {
        id: 'fallback-1',
        title: 'Praxis-Urlaub',
        description: 'Vom 15. bis 30. Dezember bleibt unsere Praxis geschlossen. In dringenden Fällen wenden Sie sich an den ärztlichen Bereitschaftsdienst.',
        date: '2024-12-01T00:00:00.000Z',
        icon: 'calendar',
        color: 'yellow',
        published: true
      }
    ];
    return NextResponse.json(fallbackNews);
  }
}

export async function POST(request: NextRequest) {
  try {
    await checkAuth();
    
    const newsData: NewsPost = await request.json();
    
    if (newsData.id) {
      // Aktualisiere bestehenden Eintrag
      await updateNewsPost(newsData.id, newsData);
    } else {
      // Erstelle neuen Eintrag
      const newId = await createNewsPost(newsData);
      newsData.id = newId;
    }

    return NextResponse.json({ 
      success: true, 
      news: newsData 
    });
  } catch (error) {
    console.error('Error saving news post:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save news post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await checkAuth();
    
    const { searchParams } = new URL(request.url);
    const newsId = searchParams.get('id');
    
    if (!newsId) {
      return NextResponse.json(
        { error: 'News ID is required' },
        { status: 400 }
      );
    }

    await deleteNewsPost(newsId);

    return NextResponse.json({ 
      success: true 
    });
  } catch (error) {
    console.error('Error deleting news post:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete news post' },
      { status: 500 }
    );
  }
}
