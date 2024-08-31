import { supabase } from "auth/SupabaseClient";

const redirectObj = {
  redirectTo:
    process.env.REACT_APP_SUPABASE_REDIRECT_URL ||
    `${window.location.origin}/redirect`
};

const SupabaseService = {};

// Authentication
SupabaseService.signInWithMagicLink = async (email) =>
  await supabase.auth.signIn({ email }, redirectObj);

SupabaseService.signInWithGoogle = async () =>
  await supabase.auth.signIn({ provider: "google" }, redirectObj);
SupabaseService.signOutRequest = async () => await supabase.auth.signOut();
//Add new customer

SupabaseService.addNewCustomer = async (data) =>
  await supabase.from("customers").insert([data]);

SupabaseService.getallCustomers = async (identifier) =>
  await supabase
    .from("customers")
    .select("*")
    .match({ user_identifier: identifier });

SupabaseService.getAllThreads = async (identifier) =>
  await supabase
    .from("threads")
    .select("*")
    .match({ user_identifier: identifier })
    .order("created_at", { ascending: false });

//Add new customer

SupabaseService.addNewCustomer = async (data) =>
  await supabase.from("customers").insert([data]);

// SupabaseService.getMessages = async (user, customer) =>
//   await supabase.rpc("get_messages", {
//     _var_user: user,
//     _var_customer: customer
//   });

SupabaseService.getMessages = async (threadId) =>
  await supabase
    .from("messages")
    .select("*")
    .match({ thread_id: threadId })
    .order("sent_date", { ascending: true });

SupabaseService.editThread = async (identifier, content) =>
  await supabase.from("threads").update(content).match(identifier);

SupabaseService.getWhatsAppMessages = async (user, customer) =>
  await supabase.rpc("get_whatsapp_messages", {
    _var_user: user,
    _var_customer: customer
  });

SupabaseService.getCategories = async () =>
  await supabase.from("categories").select("*");

SupabaseService.getTypes = async (categoryId) =>
  await supabase.from("types").select("*").match({ category_id: categoryId });

SupabaseService.getSuggestedPrompt = async (typeId) =>
  await supabase.from("prompts").select("*").match({ type_id: typeId });

SupabaseService.getSubscribedToMessages = async () =>
  supabase
    .from("messages")
    .on("*", (payload) => {
      console.log("Change received!", payload);
    })
    .subscribe();
export default SupabaseService;

// .or(`to.eq.${customer},from.eq.${user}`);
