import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('API route received request.');
    console.log('TEST_ENV_VARIABLE:', process.env.TEST_ENV_VARIABLE);

    const { userId, agentId, sessionId, message } = await request.json();

    if (!userId || !agentId || !sessionId || !message) {
      console.error('Missing required parameters in API route request body');
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const lyzrApiKey = process.env.VITE_LYZR_API_KEY;
    const lyzrApiEndpoint = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';

    if (!lyzrApiKey) {
       console.error('Lyzr API key (VITE_LYZR_API_KEY) is not configured in environment variables.');
       return NextResponse.json({ error: 'Lyzr API key not configured' }, { status: 500 });
    }

    console.log('Attempting to call Lyzr API with agentId:', agentId, 'and sessionId:', sessionId);

    const response = await fetch(lyzrApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': lyzrApiKey,
      },
      body: JSON.stringify({
        user_id: userId,
        agent_id: agentId,
        session_id: sessionId,
        message: message,
      }),
    });

    console.log('Received raw response from Lyzr API:', response.status, response.statusText);

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
        console.error('Error calling Lyzr API:', response.status, errorData);
      } catch (jsonError) {
        console.error('Error parsing Lyzr API error response JSON:', jsonError);
        console.error('Lyzr API returned non-OK status (', response.status, ') but no valid JSON error body.');
      }
      return NextResponse.json({ error: `Error from Lyzr API: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log('Successfully received and parsed data from Lyzr API.', data);

    // *** IMPORTANT: Adjust this based on the actual Lyzr API response structure ***
    // Assuming the agent's reply is in a field called 'content' or 'text'
    const agentMessage = data.answer || data.text || JSON.stringify(data); // Fallback to full data if field name is unknown
    // *************************************************************************

    console.log('Sending agent message back to frontend:', agentMessage);
    return NextResponse.json({ agentMessage });

  } catch (error) {
    console.error('Caught an unhandled error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 