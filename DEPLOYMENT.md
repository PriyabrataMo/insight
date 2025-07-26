# Deployment Guide - Meeting Insight

This guide covers deploying the Meeting Insight application to various platforms.

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Google Gemini API key
- Git repository (for deployment platforms)

## Environment Variables

Before deploying, ensure you have these environment variables set:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## Vercel Deployment (Recommended)

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from project directory**

   ```bash
   vercel
   ```

4. **Set Environment Variables**

   ```bash
   vercel env add NEXT_PUBLIC_GEMINI_API_KEY
   ```

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables:
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Gemini API key
5. Deploy

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/meeting-insight)

## Netlify Deployment

1. **Build the application**

   ```bash
   pnpm build
   ```

2. **Deploy via Netlify CLI**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod --dir=.next
   ```

3. **Set environment variables in Netlify dashboard**
   - Go to Site settings > Environment variables
   - Add `NEXT_PUBLIC_GEMINI_API_KEY`

## Railway Deployment

1. **Install Railway CLI**

   ```bash
   npm install -g @railway/cli
   ```

2. **Login and deploy**

   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set environment variables**
   ```bash
   railway variables set NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
   ```

## DigitalOcean App Platform

1. **Create `app.yaml` file**

   ```yaml
   name: meeting-insight
   services:
     - name: web
       source_dir: /
       github:
         repo: your-username/meeting-insight
         branch: main
       build_command: pnpm build
       run_command: pnpm start
       environment_slug: node-js
       instance_count: 1
       instance_size_slug: basic-xxs
       envs:
         - key: NEXT_PUBLIC_GEMINI_API_KEY
           value: your_key_here
   ```

2. **Deploy via doctl CLI or DigitalOcean dashboard**

## Docker Deployment

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app

   COPY package.json pnpm-lock.yaml* ./
   RUN npm install -g pnpm && pnpm install --frozen-lockfile

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .

   ENV NEXT_TELEMETRY_DISABLED 1
   RUN npm install -g pnpm && pnpm build

   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app

   ENV NODE_ENV production
   ENV NEXT_TELEMETRY_DISABLED 1

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **Build and run Docker container**
   ```bash
   docker build -t meeting-insight .
   docker run -p 3000:3000 -e NEXT_PUBLIC_GEMINI_API_KEY=your_key_here meeting-insight
   ```

## AWS Amplify Deployment

1. **Connect repository to AWS Amplify**
2. **Configure build settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: .next
       files:
         - "**/*"
     cache:
       paths:
         - node_modules/**/*
   ```
3. **Set environment variables in Amplify console**

## Google Cloud Run

1. **Create `cloudbuild.yaml`**

   ```yaml
   steps:
     - name: "gcr.io/cloud-builders/docker"
       args: ["build", "-t", "gcr.io/$PROJECT_ID/meeting-insight", "."]
     - name: "gcr.io/cloud-builders/docker"
       args: ["push", "gcr.io/$PROJECT_ID/meeting-insight"]
     - name: "gcr.io/cloud-builders/gcloud"
       args:
         - "run"
         - "deploy"
         - "meeting-insight"
         - "--image"
         - "gcr.io/$PROJECT_ID/meeting-insight"
         - "--region"
         - "us-central1"
         - "--platform"
         - "managed"
         - "--allow-unauthenticated"
   ```

2. **Deploy**
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

## Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test AI functionality with a sample transcript
- [ ] Check that tasks can be created, completed, and deleted
- [ ] Verify data persistence in browser localStorage
- [ ] Test responsive design on different devices
- [ ] Confirm all navigation links work
- [ ] Test export/import functionality
- [ ] Verify error handling for invalid API keys

## Monitoring and Maintenance

### Performance Monitoring

- Set up analytics (Google Analytics, Vercel Analytics)
- Monitor API usage and costs
- Track user engagement metrics

### Security Considerations

- Regularly update dependencies
- Monitor for security vulnerabilities
- Implement rate limiting if needed
- Consider implementing user authentication for production use

### Backup Strategy

- Users' data is stored in localStorage (client-side)
- Consider implementing cloud storage for data persistence
- Provide clear export/import functionality

## Troubleshooting

### Common Issues

1. **API Key not working**

   - Verify the key is correctly set in environment variables
   - Check that the key has proper permissions
   - Ensure the key is for Gemini Pro model

2. **Build failures**

   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Clear node_modules and reinstall if needed

3. **Runtime errors**
   - Check browser console for JavaScript errors
   - Verify all environment variables are available
   - Test with different browsers

### Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Google AI Studio](https://makersuite.google.com/)
- Project GitHub Issues (if applicable)

## Cost Considerations

### Google Gemini API

- Free tier: 60 requests per minute
- Pay-as-you-go pricing after free tier
- Monitor usage in Google Cloud Console

### Hosting Platforms

- **Vercel**: Free for personal projects, usage-based pricing
- **Netlify**: Free tier with build minute limits
- **Railway**: $5/month for starter plan
- **DigitalOcean**: $5/month for basic droplet

Choose the platform that best fits your usage patterns and budget requirements.
