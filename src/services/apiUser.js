// services/apiUser.js
import supabase from "./supabase.js";

// 🟢 ۱. اصلاح تابع گرفتن اطلاعات کاربر (اضافه شدن return و maybeSingle)
export async function getUserInfoApi(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 🟢 ۲. تابع آپدیت پروفایل با استفاده از متد استاندارد getPublicUrl
export async function updateProfileApi({ userId, displayName, avatarFile }) {
  if (!userId) throw new Error("User ID is required");

  let avatarUrl;

  if (avatarFile) {
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `profile-${userId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile")
      .upload(fileName, avatarFile, {
        upsert: true,
        contentType: avatarFile.type,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // دریافت لینک عمومی به روش استاندارد Supabase
    const { data: publicUrlData } = supabase.storage
      .from("profile")
      .getPublicUrl(fileName);

    avatarUrl = publicUrlData.publicUrl;
  }

  const payload = {
    ...(displayName && { display_name: displayName }),
    ...(avatarUrl && { avatar_url: avatarUrl }),
  };

  // بررسی وجود سطر قبلی
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  let resultData;

  if (existingProfile) {
    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(payload)
      .eq("user_id", userId)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);
    resultData = data;
  } else {
    const { data, error: insertError } = await supabase
      .from("profiles")
      .insert({ user_id: userId, ...payload })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);
    resultData = data;
  }

  // همگام‌سازی با متادیتای Auth
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      ...(displayName && { display_name: displayName }),
      ...(avatarUrl && { avatar_url: avatarUrl }),
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  return resultData;
}


export async function changePasswordApi({ currentPassword, newPassword }) {
  // ۱. دریافت اطلاعات کاربر لاگین‌شده
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("User not authenticated");

  // ۲. بررسی صحت رمز عبور فعلی (Re-authentication)
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (authError) {
    throw new Error("Current password is incorrect");
  }

  // ۳. ثبت رمز عبور جدید
  const { data, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) throw new Error(updateError.message);

  return data;
}