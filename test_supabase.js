import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
    console.log("Testing Supabase Upload...");
    try {
        const { data, error } = await supabase.storage
            .from("images")
            .upload("test.txt", "Hello World " + Date.now(), { upsert: true });

        if (error) {
            console.error("Upload Error:", error);
        } else {
            console.log("Upload Success:", data);
        }
    } catch (err) {
        console.error("Exception:", err);
    }
}

testUpload();
