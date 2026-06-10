import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic values
    const title = searchParams.get('title') || 'La Galería PTY';
    const artist = searchParams.get('artist') || 'Experiencia WebAR';
    const imagePath = searchParams.get('image'); // e.g. /Unleashed.jpg

    // Reconstruct the full image URL to load it into the OG image
    // If it's a relative path, we append it to the current origin
    const origin = new URL(request.url).origin;
    const imageUrl = imagePath && imagePath.startsWith('/') 
      ? `${origin}${imagePath}` 
      : `${origin}/IMG_7640.JPG`; // Fallback image

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Background Image Layer (Dimmed) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
              }}
            />
          </div>

          {/* Content Layer */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '80px',
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 24,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#aaaaaa',
                  marginBottom: '20px',
                }}
              >
                La Galería PTY
              </span>
              <h1
                style={{
                  fontSize: 80,
                  fontWeight: 200,
                  margin: 0,
                  lineHeight: 1.1,
                  maxWidth: '80%',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: 32,
                  color: '#dddddd',
                  marginTop: '20px',
                  fontWeight: 300,
                }}
              >
                Por {artist}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  border: '2px solid #ffffff',
                  fontSize: 24,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Ver en Realidad Aumentada
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
