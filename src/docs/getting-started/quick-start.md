# Quick Start

## Create a New Project

There are two ways to scaffold a new GamanJS project:

```bash
npx create-gaman@latest
```

This will scaffold a new GamanJS project with the necessary structure.

## Run Your Project

Start your server with:

```bash
npm run dev
```

# Project Structure

After creating a new project, your file structure will look like this:

```css
src/
├── main.ts
├── main.block.ts
```

# Example Code

Here’s a quick example to get you started: <br>
`src/main.ts`

```ts
import mainBlock from 'main.block';
import gaman from 'gaman';

gaman.serv({
	blocks: [mainBlock], // your blocks
	server: {
		port: 3431, // optional
		host: '0.0.0.0', // optional
	},
});
```

`src/main.block.ts`

```ts
import { defineBlock, Response } from 'gaman';

export default defineBlock({
	path: '/',
	all: (ctx) => {
		console.log('middleware ALL');
	},
	routes: {
		'/': (ctx) => {
			return Response.json({ message: '❤️ Welcome to GamanJS' });
		},
		'/article/*': (ctx) => {
			ctx.locals.userName = 'Angga7Togk'; // set data locals
		},
		'/article': {
			POST: [
				async (ctx) => {
					const json = await ctx.json();
					return Response.json(json /**return JSON */, { status: 200 });
				},
			],
			'/json': {
				GET: (ctx) => {
					const userName = ctx.locals.userName;

					// return like Response.json()
					return {
						user_name_from_local: userName,
					};
				},
			},
			'/text': {
				GET: (ctx) => {
					const userName = ctx.locals.userName;

					// return like Response.text()
					return userName;
				},
			},
		},
	},
});
```

Happy coding! ❤️ GamanJS Team