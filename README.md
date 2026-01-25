# Greg Wilson - Music Hosting App V2

A minimalist, high-impact music portfolio tailored for Greg Wilson. Features dynamic UI generation from album art, seamless persistent audio playback, and a secure Supabase backend.

## ✨ Features

- **Dynamic Backgrounds:** Homepage styling adapts automatically to your latest album's cover art using `node-vibrant`.
- **Minimalist Audio Player:** Custom-built player with persistent state across navigation.
- **Album Ordering:** Manual control over album display order.
- **Rich Content:** Support for album and track descriptions/liner notes.
- **Secure Backend:** Powered by Supabase for real-time data and file storage.

## 🛠️ Prerequisites

- **Docker Desktop** (installed and running)
- *Optional:* Node.js 20+ (if running without Docker)

## 🚀 Quick Start (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd antigravity_test
    ```

2.  **Configure Environment:**
    Create a `.env.local` file in the root directory. You can copy the structure from `.env.example` if available, or use your Supabase keys:
    ```env
    VITE_SUPABASE_URL=https://your-project-id.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key
    ```
    *Note: `.env.local` is git-ignored for security.*

3.  **Start with Docker:**
    ```bash
    docker-compose up
    ```
    Access the app at: [http://localhost:5173](http://localhost:5173)

## 🗄️ Database Setup (Supabase)

The app requires two tables in your Supabase project: `albums` and `tracks`.

### Schema
Run the following SQL in your Supabase SQL Editor to set up the latest schema:

```sql
-- Create Albums Table
create table albums (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title text not null,
  artist text not null,
  cover_url text,
  description text,
  display_order integer default 0
);

-- Create Tracks Table
create table tracks (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  title text not null,
  file_url text not null,
  duration text,
  album_id bigint references albums(id),
  track_number integer,
  description text
);
```

### Storage
- Create a public storage bucket named `covers`.
- Create a public storage bucket named `music`.

## 📦 Project Structure

- `src/components`: UI components (Player, AlbumGrid, AlbumDetail).
- `src/supabaseClient.js`: Supabase connection client.
- `src/App.jsx`: Main application logic and routing.

## © Copyright

&copy; 2026 Greg Wilson. All rights reserved.
