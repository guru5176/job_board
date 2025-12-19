# Deployment Guide

## Backend Deployment on Render

1. **Push to GitHub** (if not done already):
   ```bash
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: jobboard-backend
     - **Root Directory**: backend
     - **Build Command**: npm install
     - **Start Command**: npm start
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A strong secret key
     - `NODE_ENV`: production
   - Click "Create Web Service"

## Frontend Deployment on Vercel

1. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: npm run build
     - **Output Directory**: dist
   - Add Environment Variable:
     - `VITE_API_URL`: Your Render backend URL (e.g., https://jobboard-backend-xyz.onrender.com)
   - Click "Deploy"

## Post-Deployment Steps

1. **Update CORS in backend** - Add your Vercel domain to allowed origins
2. **Update frontend API URL** - Replace the environment variable with your actual Render URL
3. **Test the deployment** - Verify all features work correctly

## Important Notes

- Render free tier may have cold starts (app sleeps after inactivity)
- MongoDB Atlas has connection limits on free tier
- Keep your environment variables secure and never commit them to Git