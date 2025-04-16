import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okjwxwhnzsibljkqekxk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rand4d2huenNpYmxqa3Fla3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDQ1NDQsImV4cCI6MjA2MDM4MDU0NH0.zsPXQGQHdHgIiLpGNOcwNWcK8eIscxQnrfS9LvNo5BQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
