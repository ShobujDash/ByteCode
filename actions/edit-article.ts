"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOURINARY_CLOUD_NAME,
  api_key: process.env.CLOURINARY_API_KEY,
  api_secret: process.env.CLOURINARY_API_SECRET,
});

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const editArticles = async (
  articleId:string,
  prevState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> => {

  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // ✅ Fix: Get Clerk User ID and check authentication
  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  const exisitingArticle = await prisma.articles.findUnique({
    where:{id:articleId}
  })

  if (!exisitingArticle) {
    return {
      errors: { formErrors: ["Article not found"] },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where:{clerkUserId:userId}
  })
  if (!existingUser) {
    return {
      errors: {
        formErrors:["User not found, Please register before createing an article"]
      }
    }
  }

  // Start creating articles

  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: {
        featuredImage: ["Image file is required"],
      },
    };
  }

const arrayBuffer = await imageFile.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

const uploadResult: UploadApiResponse | undefined = await new Promise(
  (resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, // ✅ Fix: Ensure correct file type handling
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  }
);


  const imageUrl = exisitingArticle.featuredImage;

  if (uploadResult?.secure_url ) {
    imageUrl = uploadResult.secure_url
  }

  if (!imageUrl || exisitingArticle.authorId !== existingUser.id) {
    return {
      errors: {
        featuredImage:['Failed to upload image. Please try again']
      }
    }
  }

  try {
    await prisma.articles.update({
      where:{id:articleId},
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
      },
    }); 
  } catch (error:unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors:[error.message]
        }
      }
    } else {
      return {
        errors: {
          formErrors:['Some internal server error occurred']
        }
      }
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
