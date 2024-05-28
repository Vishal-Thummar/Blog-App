import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userName);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "Active",
        userId: post?.userId || userData.$id,
        image: post?.featuredImage || null,
        // updateImage: false
      },
    });

  const navigate = useNavigate();

  const submit = async (data) => {
    if (post) {
      let fileId = post.featuredImage; // Preserve existing image data by default

      if (data.image) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          fileId = file.$id;
          appwriteService.deleteFile(post.featuredImage);
        }
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: fileId,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userData: userData.userId,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    // <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mt-28">
    //   <div className="w-2/3 px-2">
    //     <Input
    //       label="Title :"
    //       placeholder="Title"
    //       className="mb-4"
    //       {...register("title", { required: true })}
    //     />
    //     <Input
    //       label="Slug :"
    //       placeholder="Slug"
    //       className="mb-4"
    //       {...register("slug", { required: true })}
    //       onInput={(e) => {
    //         setValue("slug", slugTransform(e.currentTarget.value), {
    //           shouldValidate: true,
    //         });
    //       }}
    //     />
    //     <RTE
    //       label="Content :"
    //       name="content"
    //       control={control}
    //       defaultValue={getValues("content")}
    //     />
    //   </div>
    //   <div className="w-1/3 px-2">
    //     <Input
    //       label="Featured Image :"
    //       type="file"
    //       className="mb-4"
    //       accept="image/png, image/jpg, image/jpeg, image/gif"
    //       onChange={(e) => {
    //         const file = e.target.files[0];
    //         setValue("image", file);
    //       }}
    //       {...register("image", { required: !post })}
    //     />
    //     {post && (
    //       <div className="w-full mb-4">
    //         <img
    //           src={appwriteService.getFilePreview(post.featuredImage)}
    //           alt={post.title}
    //           className="rounded-lg"
    //         />
    //       </div>
    //     )}
    //     <Select
    //       options={["Active", "Inactive"]}
    //       label="Status"
    //       className="mb-4"
    //       {...register("status", { required: true })}
    //     />
    //     <Button
    //       type="submit"
    //       bgColor={post ? "bg-green-500" : undefined}
    //       className="w-full"
    //     >
    //       {post ? "Update" : "Submit"}
    //     </Button>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mt-28">
      <div className="w-full md:w-1/2 lg:w-2/3 px-2">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 pr-4">
            <label
              htmlFor="title"
              className="text-gray-700 block mb-1 text-left"
            >
              Title:
            </label>
            <Input
              id="title"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="slug"
              className="text-gray-700 block mb-1 text-left"
            >
              Slug:
            </label>
            <Input
              id="slug"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor="content"
            className="text-gray-700 block mb-1 text-left"
          >
            Content:
          </label>
          <RTE
            id="content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-2">
        <label htmlFor="image" className="text-gray-700 block mb-1 text-left">
          Featured Image:
        </label>
        <Input
          id="featuredImage"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={(e) => {
            const file = e.target.files[0];
            setValue("image", file);
          }}
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <label htmlFor="status" className="text-gray-700 block mb-1 text-left">
          Status:
        </label>
        <Select
          id="status"
          options={["Active", "Inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
