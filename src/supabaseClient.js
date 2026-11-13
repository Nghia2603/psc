import { createClient } from '@supabase/supabase-js'

// Lấy Project URL từ góc trên bên trái của Supabase (hoặc từ phần General Settings)
// Ví dụ: https://xxxxxx.supabase.co
const SUPABASE_URL = 'https://ioxnakazaljtccymatim.supabase.co'

// Lấy đoạn mã trong phần "" (bắt đầu bằng sb_publishable_...) mà bạn thấy trong ảnh
const SUPABASE_ANON_KEY = 'sb_publishable_c3QYzAs9wmv4o9ZjmI5G3A_iHt6cw5v'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)