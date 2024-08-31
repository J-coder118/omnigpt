import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "auth/SupabaseClient";
import axios from "axios";
import { sendImageApiContent } from "configs/ApiConfig";

const version = "v13.0";
const phoneNumberId = "109946815136827";

export const imageValidator = (file) => {
  const fileSize = file.size;
  if (fileSize > 5242880) {
    message.error(`Size must be less than 5MB`);
    return false;
  }

  const isPNG = file.type === "image/png";
  const isJPEG = file.type === "image/jpeg";
  const isJPG = file.type === "image/jpg";
  if (isPNG || isJPEG || isJPG) {
    return true;
  } else {
    message.error(`File format not supported`);
    return false;
  }
};

export const uploadImageToSupabase = async (activeCustomer, image) => {
  console.log(image);
  const imgPath = `${uuidv4()}_${image.name}`;
  try {
    const { error } = await supabase.storage
      .from("chat-images")
      .upload(imgPath, image);
    if (error) throw error;
    else {
      const { publicURL, error } = supabase.storage
        .from("chat-images")
        .getPublicUrl(imgPath);
      if (error) throw error;
      else {
        console.log(publicURL);
        sendImages(activeCustomer, publicURL);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const sendImages = async (activeCustomer, imageURL) => {
  const { body, content } = await sendImageApiContent(activeCustomer, imageURL);
  try {
    const res = await axios.post(
      `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
      body,
      content
    );
    console.log(res);
    if (res.status === 200) {
      const { error } = await supabase.from("messages").insert([
        {
          sender: phoneNumberId,
          receiver: activeCustomer.phone,
          message_text: imageURL
        }
      ]);
      if (error) throw error;
    }
  } catch (error) {
    console.log(error);
  }
};
