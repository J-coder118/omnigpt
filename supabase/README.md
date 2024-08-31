# Back end of ChatGPT with supabase

## Enviroment

1. Install Docker, supabase CLI

## Run local

    `npx supabase functions serve --env-file ./supabase/.env.local --no-verify-jwt --debug`

## Deploy

1. `supabase login`
2. Link project: `npx supabase link --project-ref <projectId>`
3. Create .env file
4. `npx supabase secrets set --env-file ./supabase/.env`
5. `npx supabase functions deploy <function-name>`

# Note

1. Deploy webhook (Whatsapp-webhook) need ignore check authorization:
npx supabase functions deploy whatsapp-webhook --no-verify-jwt
npx supabase functions deploy connect-openai
npx supabase functions deploy longchain_connect
npx supabase functions deploy get-title-thread
npx supabase functions deploy whatsapp-check-phone
npx supabase functions deploy stripe-checkout-session
npx supabase functions deploy stripe-customer-dashboard
npx supabase functions deploy stripe-webhook --no-verify-jwt
npx supabase functions deploy slack-webhook --no-verify-jwt