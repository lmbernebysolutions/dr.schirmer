import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  getAlertSettings, 
  createAlertSettings, 
  updateAlertSettings 
} from '@/lib/notion-helpers';
import { AlertSettings } from '@/types/notion';

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
    
    const alertSettings = await getAlertSettings();
    
    if (!alertSettings) {
      // Fallback zu Standard-Einstellungen
      const fallbackSettings: AlertSettings = {
        isVisible: true,
        text: 'Aktuell: Dr. Schuster-Meinel ist nun Fachärztin in Zschorlau | Neue Kindersprechstunde | Neuaufnahmen möglich',
        lastUpdated: new Date().toISOString()
      };
      return NextResponse.json(fallbackSettings);
    }

    return NextResponse.json(alertSettings);
  } catch (error) {
    console.error('Error fetching alert settings:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fallback zu Standard-Einstellungen bei API-Fehlern
    const fallbackSettings: AlertSettings = {
      isVisible: true,
      text: 'Aktuell: Dr. Schuster-Meinel ist nun Fachärztin in Zschorlau | Neue Kindersprechstunde | Neuaufnahmen möglich',
      lastUpdated: new Date().toISOString()
    };
    return NextResponse.json(fallbackSettings);
  }
}

export async function POST(request: NextRequest) {
  try {
    await checkAuth();
    
    const alertData: AlertSettings = await request.json();
    
    // Prüfe ob bereits ein Alert-Eintrag existiert
    const existingAlert = await getAlertSettings();
    
    if (existingAlert?.id) {
      // Aktualisiere bestehenden Eintrag
      await updateAlertSettings(existingAlert.id, alertData);
    } else {
      // Erstelle neuen Eintrag
      const newId = await createAlertSettings(alertData);
      alertData.id = newId;
    }

    return NextResponse.json({ 
      success: true, 
      alert: alertData 
    });
  } catch (error) {
    console.error('Error saving alert settings:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save alert settings' },
      { status: 500 }
    );
  }
}
