var SUPA_URL = "https://ixyjmgnhzpoymsqewhre.supabase.co";
var SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eWptZ25oenBveW1zcWV3aHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjUwNTYsImV4cCI6MjA4OTE0MTA1Nn0.MPsJOGTk5UggakyKcY7uClxBBW1UWI9R8ang_ZgBV6I";

var supabase;

function initSupabase() {
    if (window.supabase && window.supabase.createClient) {
        supabase = window.supabase.createClient(SUPA_URL, SUPA_KEY);
        console.log("Supabase client initialized successfully.");
    } else {
        console.error("Supabase library not found! Ensure the CDN script is loaded.");
    }
}

// Initial attempt
initSupabase();