# Webhook Setup for Contact Form

## Overview
The contact form on the `/contacto` page is configured to send form submissions to a webhook endpoint. This allows you to receive contact form submissions in real-time and integrate them with your existing systems.

## Configuration

### 1. Environment Variable
Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_WEBHOOK_URL=https://your-webhook-endpoint.com/webhook
```

### 2. Webhook Services You Can Use

#### Zapier
- Create a Zap with a webhook trigger
- Copy the webhook URL from Zapier
- Form data will be sent as JSON payload

#### Make.com (Integromat)
- Create a webhook scenario
- Use the provided webhook URL
- Process the JSON data as needed

#### Pipedream
- Create a new webhook endpoint
- Use the generated URL
- View and process submissions in real-time

#### Custom API Endpoint
- Build your own API endpoint
- Handle POST requests with JSON data
- Process and store submissions

## Form Data Structure

The form sends the following data structure:

```json
{
  "nombre": "John Doe",
  "email": "john@example.com",
  "telefono": "+1 (555) 123-4567",
  "empresa": "Example Corp",
  "cargo": "CEO",
  "industria": "tecnologia",
  "mensaje": "I'm interested in your platform...",
  "newsletter": true,
  "contacto": "email",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "Lezgo Suite Contact Form"
}
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to `/contacto`
3. Fill out and submit the form
4. Check your webhook endpoint for the incoming data

## Security Considerations

- Use HTTPS for your webhook endpoint
- Consider implementing webhook signature verification
- Rate limit your webhook endpoint if needed
- Validate incoming data on your webhook endpoint

## Troubleshooting

- Check browser console for any errors
- Verify your webhook URL is correct
- Ensure your webhook endpoint accepts POST requests
- Check that your webhook endpoint returns a 200 status code
