# Welcome to Omni GPT

## Supabase function
 See [supabase](./supabase) folder


## Front End

Design: https://www.figma.com/file/fJxbf3o8KjEFqQXq3WIEAI/omnigpt?node-id=89-3225

## Set up environment variables

1. Change node version to `16.13.0` (Prefer use `nvm` to switch node version)
2. Clone source code
3. Checkout to branch: `master_omnigpt`
4. Install node module: `npm i` (If `node_module` can't install, please delete cache and `npm install --legacy-peer-deps`)
5. Create `.env` file
6. Run project: `npm run dev`

Use the REACT_APP_SUPABASE_REDIRECT_URL_LOCAL if you are working on localhost.
Simply go to /src/services/SupabaseServies.js to change it.

```
REACT_APP_SUPABASE_URL=https://odjzvygjmpogtophihqs.supabase.co
REACT_APP_SUPABASE_ANON_KEY=??
REACT_APP_SUPABASE_REDIRECT_URL=http://localhost:3000/redirect
REACT_APP_SUPABASE_EDGE_FUNCTION_URL=https://odjzvygjmpogtophihqs.functions.supabase.co
REACT_APP_AMPLITUDE_KEY=??
REACT_APP_ENV=production|development
```

## Branching guidelines
Master branch: `master_omnigpt`				
Website public: https://app.omnigpt.co --> Will auto deploy after merge source code into `master_omnigpt`
				
Each ticket on Jira, we must create a branch with name:			
 ```
 feature/CORE-XX-<brief-function>
 ```	
- Prefix: `feature/`
- `CORE-XX`: ID of ticket in jira			
- `<brief-function>`: Write brief function of this source code 			
	```
    Example: feature/CORE-41-retrieving-thread-whatsapp	
    ```		
				
Pull request must have:
1. Link loom (Demo video)			
2. Link jira			
3. Fix all eslint errors			
4.  Notice to thread chat: #omnigpt				
				
```
After merge pull request must delete branch
